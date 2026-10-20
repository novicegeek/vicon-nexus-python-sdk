<#
.SYNOPSIS
    把官方 Vicon Nexus Python SDK 装配进本仓库，并可选地初始化 git 仓库 / 创建 GitHub 远程仓库。

.DESCRIPTION
    本脚本做三件事：
      1. 从 -SdkPath 复制 SDK 源码、示例脚本与安装批处理到仓库根目录（跳过 build/ 与 *.egg-info）；
      2. 若仓库尚未初始化 git，则 git init 并切到 main 分支，然后提交；
      3. 若指定 -CreateRemote，则调用 GitHub CLI 创建仓库并推送，随后提示启用 Pages。

    文档站点（docs/）不会被改动，因此可以安全地重复运行。

.PARAMETER SdkPath
    官方 SDK 根目录，需包含 viconnexusapi\ 与 viconnexusutils\。
    默认取仓库上一级目录中的 ViconNexus2.12_PythonSDK。

.PARAMETER RepoName
    远程仓库名。默认取仓库目录名。

.PARAMETER Visibility
    远程仓库可见性：public 或 private。

.PARAMETER CreateRemote
    调用 gh 创建远程仓库并推送。

.PARAMETER Force
    目标文件已存在时仍然覆盖。

.PARAMETER SkipCommit
    只复制文件，不执行 git 提交。

.EXAMPLE
    .\scripts\publish.ps1 -SdkPath "..\ViconNexus2.12_PythonSDK"

.EXAMPLE
    .\scripts\publish.ps1 -SdkPath "..\ViconNexus2.12_PythonSDK" -CreateRemote -RepoName vicon-nexus-python-sdk
#>
[CmdletBinding()]
param(
    [string]$SdkPath = (Join-Path (Split-Path $PSScriptRoot -Parent) '..\ViconNexus2.12_PythonSDK'),
    [string]$RepoName = '',
    [ValidateSet('public', 'private')]
    [string]$Visibility = 'public',
    [switch]$CreateRemote,
    [switch]$Force,
    [switch]$SkipCommit
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Write-Step([string]$Text) {
    Write-Host ''
    Write-Host "==> $Text" -ForegroundColor Cyan
}

function Write-Ok([string]$Text) {
    Write-Host "    $Text" -ForegroundColor Green
}

function Write-Warn2([string]$Text) {
    Write-Host "    $Text" -ForegroundColor Yellow
}

# ---------------------------------------------------------------- 路径校验

$repoRoot = Split-Path $PSScriptRoot -Parent
$repoRoot = (Resolve-Path -LiteralPath $repoRoot).Path

if (-not (Test-Path -LiteralPath $SdkPath)) {
    throw "找不到 SDK 目录：$SdkPath（用 -SdkPath 指定 ViconNexus2.12_PythonSDK 的位置）"
}

$sdkRoot = (Resolve-Path -LiteralPath $SdkPath).Path
$probe = Join-Path $sdkRoot 'viconnexusapi\viconnexusapi\ViconNexus.py'
if (-not (Test-Path -LiteralPath $probe)) {
    throw "该目录看起来不是 SDK 根目录（缺少 viconnexusapi\viconnexusapi\ViconNexus.py）：$sdkRoot"
}

Write-Step "仓库根目录：$repoRoot"
Write-Ok "SDK 目录：$sdkRoot"

# ---------------------------------------------------------------- 复制内容

$items = @(
    'viconnexusapi',
    'viconnexusutils',
    'example_scripts',
    'install_vicon_nexus_api.bat',
    'install_vicon_nexus_utils.bat',
    'uninstall_vicon_nexus_api.bat',
    'uninstall_vicon_nexus_utils.bat'
)

Write-Step '复制 SDK 文件'

foreach ($item in $items) {
    $src = Join-Path $sdkRoot $item
    if (-not (Test-Path -LiteralPath $src)) {
        Write-Warn2 "跳过（源不存在）：$item"
        continue
    }

    $dst = Join-Path $repoRoot $item
    if ((Test-Path -LiteralPath $dst) -and (-not $Force)) {
        Write-Warn2 "跳过（已存在，用 -Force 覆盖）：$item"
        continue
    }

    if (Test-Path -LiteralPath $dst) {
        Remove-Item -LiteralPath $dst -Recurse -Force
    }

    Copy-Item -LiteralPath $src -Destination $dst -Recurse -Force
    Write-Ok "已复制：$item"
}

# 清理构建中间产物（只处理本脚本复制进来的两个包目录）
Write-Step '清理 build/ 与 *.egg-info'

$cleanupRoots = @('viconnexusapi', 'viconnexusutils') | ForEach-Object {
    Join-Path $repoRoot $_
} | Where-Object { Test-Path -LiteralPath $_ }

foreach ($root in $cleanupRoots) {
    $found = Get-ChildItem -LiteralPath $root -Directory -Recurse -Force -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -in @('build', '__pycache__') -or $_.Name -like '*.egg-info' }

    foreach ($dir in $found) {
        $full = $dir.FullName
        if (-not $full.StartsWith($repoRoot, [StringComparison]::OrdinalIgnoreCase)) {
            continue
        }
        Remove-Item -LiteralPath $full -Recurse -Force -ErrorAction SilentlyContinue
        Write-Ok "已删除：$($full.Substring($repoRoot.Length).TrimStart('\'))"
    }
}

# ---------------------------------------------------------------- git

if ($SkipCommit) {
    Write-Step '已跳过 git（-SkipCommit）'
    exit 0
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Warn2 '未找到 git，跳过版本控制步骤。'
    exit 0
}

Write-Step 'git'

Push-Location -LiteralPath $repoRoot
try {
    if (-not (Test-Path -LiteralPath (Join-Path $repoRoot '.git'))) {
        git init | Out-Null
        git symbolic-ref HEAD refs/heads/main
        Write-Ok '已初始化仓库（分支 main）'
    } else {
        Write-Ok '仓库已存在，沿用当前分支'
    }

    git add -A

    $staged = git diff --cached --name-only
    if ([string]::IsNullOrWhiteSpace($staged)) {
        Write-Ok '没有需要提交的改动'
    } else {
        $count = ($staged -split "`n" | Where-Object { $_.Trim() }).Count
        git commit -m "Add Vicon Nexus Python SDK sources and API documentation" | Out-Null
        Write-Ok "已提交 $count 个文件"
    }

    # ------------------------------------------------------------ 远程

    $name = if ($RepoName) { $RepoName } else { Split-Path $repoRoot -Leaf }

    if (-not $CreateRemote) {
        Write-Step '下一步（手动创建远程仓库）'
        Write-Host @"
    gh repo create $name --$Visibility --source . --remote origin --push
    # 或先建空仓库，然后：
    git remote add origin https://github.com/<user>/$name.git
    git push -u origin main
"@ -ForegroundColor Gray
        return
    }

    if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
        throw '未找到 GitHub CLI（gh）。安装并执行 gh auth login 后重试，或手动推送。'
    }

    Write-Step "创建远程仓库：$name（$Visibility）"
    gh repo create $name "--$Visibility" --source . --remote origin --push
    Write-Ok '已推送'

    Write-Step '启用 GitHub Pages'
    Write-Host @'
    1) 仓库 Settings → Pages → Source: Deploy from a branch
    2) Branch: main, 目录: /docs  → Save
    3) 或启用仓库 Actions，由 .github/workflows/pages.yml 自动发布
'@ -ForegroundColor Gray
}
finally {
    Pop-Location
}
