# Vicon Nexus Python SDK — Documentation & Repo Kit

完整的 **Vicon Nexus 2.12 Python SDK** 中文 API 参考文档，以及把官方 SDK 打包成可发布 GitHub 仓库的工具链。

Complete, offline-capable Chinese API reference for the **Vicon Nexus 2.12 Python SDK**, plus the tooling to publish the vendor SDK as a proper GitHub repository with a docs site.

---

## 这是什么 / What's inside

文档站点提供**英文与中文两个版本**，右上角按钮一键切换；打开默认为英文版。
The site ships in **English and Chinese**; use the button in the top-right corner to switch. English is the default.

| 目录 | 内容 |
|---|---|
| [`docs/`](docs/index.html) | 完整 API 参考站点 · **English (default)** |
| [`docs/zh/`](docs/zh/index.html) | 同一站点的中文版 · Chinese mirror |
| [`scripts/publish.ps1`](scripts/publish.ps1) | 一键把本地 SDK 目录装配成本仓库内容并初始化 git / 创建远程仓库 |
| [`scripts/publish.bat`](scripts/publish.bat) | 同上，纯 cmd 实现：不受 PowerShell 执行策略限制 |
| [`.github/workflows/pages.yml`](.github/workflows/pages.yml) | 推送到 `main` 后自动发布文档站点 |

**仓库形态 / Repo layout.** 目标形态是**单仓库**：SDK 源码（`viconnexusapi/`、`viconnexusutils/`、
`example_scripts/`、`*.bat`）与 `docs/` 同处仓库根目录——这是 SDK 项目的通行做法（numpy、pandas、
pytest 都是 `docs/` 与包源码并列）。

本目录当前**只含文档与工具链**：SDK 的源码和二进制（`.pyd` / `.dll`）由
[`scripts/publish.ps1`](scripts/publish.ps1) 从本地 `ViconNexus2.12_PythonSDK/` 装配进来。
运行过该脚本后才是标准单仓库布局；在装配之前，本 README 里提到的
`install_vicon_nexus_api.bat`、`pip install .\viconnexusapi` 等路径尚不存在。

The repo is meant to be a **single repository** with the SDK sources and `docs/` side by side.
Right now only the docs and tooling are here; `scripts/publish.ps1` copies the vendor SDK
(sources plus `.pyd` / `.dll` binaries) in from your local `ViconNexus2.12_PythonSDK/`, and only
after running it do the paths mentioned below exist.

SDK 本体由两个包组成（Vicon 官方发布，MIT License）：

| 包 | 版本 | 说明 |
|---|---|---|
| `viconnexusapi` | 1.0.3 | 核心 API：`ViconNexus` 门面、`ViconUtils` 数学工具、SWIG 绑定的底层客户端 |
| `viconnexusutils` | 1.0.0 | 可选的 numpy 封装：`NexusTrajectory` / `NexusAngles` / `NexusSegment`（依赖 `numpy`、`six`） |

## 快速开始 / Quick start

```python
from viconnexusapi import ViconNexus

vicon = ViconNexus.ViconNexus()            # connects to Nexus on localhost
print(vicon.GetTrialName(), vicon.GetFrameCount(), vicon.GetFrameRate())

x, y, z, e = vicon.GetTrajectory('Colin', 'C7')
print(x[0], y[0], z[0], e[0])

vicon.Disconnect()
```

安装：

```bat
install_vicon_nexus_api.bat          :: 或 pip install .\viconnexusapi
install_vicon_nexus_utils.bat        :: 或 pip install .\viconnexusutils
```

要求：Windows x64、Nexus 2.12 正在运行、Python 2.7 或 3.x（64 位）。

## 文档 / Docs

直接用浏览器打开 [`docs/index.html`](docs/index.html) —— 不需要任何构建工具或网络连接。
Open [`docs/index.html`](docs/index.html) in a browser — no build step, no network access required.

两个语言版本是**镜像目录**（`docs/` = English，`docs/zh/` = 中文），文件名一一对应，因此切换按钮只需换目录即可保持在同一页面。

| 页面 / Page | 内容 / Content |
| --- | --- |
| [概览](docs/index.html) | 能力矩阵、模块一览、已知限制 |
| [快速开始](docs/getting-started.html) | 安装、连接、第一个脚本、数据模型速记 |
| [架构与分层](docs/architecture.html) | Python 封装 → SWIG → `.pyd` → DLL → Nexus 的调用链 |
| [ViconNexus](docs/api-viconnexus.html) | 69 个方法的签名、参数、返回值、示例 |
| [ViconUtils](docs/api-viconutils.html) | 坐标变换与旋转表示换算 |
| [数据类型](docs/api-datatypes.html) | `NexusForcePlate` / `NexusEyeTracker` |
| [viconnexusutils](docs/api-viconnexusutils.html) | 轨迹 / 角度 / 骨骼段对象 |
| [底层客户端](docs/api-lowlevel.html) | `ViconNexusClient`、`Output_*`、容器类型 |
| [示例脚本](docs/examples.html) | 官方 8 个示例的解析 |
| [常见问题](docs/faq.html) | 连接、版本、numpy 兼容、已知缺陷 |

### 为什么是静态 HTML / Why static HTML

Sphinx / Doxygen 需要额外安装 Python 包或二进制工具链，与“不下载任何软件”的前提冲突。
本仓库改为手写语义化 HTML + 约 650 行原生 CSS/JS：

- 无 CDN、无构建步骤、无框架；
- `file://` 直接打开可用（离线分发方便）；
- GitHub Pages 部署后提供同样的侧边导航、全站搜索（`Ctrl K`）、深色模式。

### 发布到 GitHub Pages

**方式一（推荐）**：仓库 Settings → Pages → Source 选 *Deploy from a branch*，
分支 `main`、目录 `/docs`。

**方式二**：启用仓库 Actions，[`.github/workflows/pages.yml`](.github/workflows/pages.yml)
会在每次推送到 `main` 时自动发布。

## 仓库装配 / Bootstrapping this repo

`scripts/publish.ps1` 会把本地 `ViconNexus2.12_PythonSDK/` 下的官方源码（含 `.pyd` / `.dll`）、
示例脚本和安装批处理复制进本仓库，然后可选地初始化 git 并创建远程仓库。

```powershell
# 仅装配文件 + 本地 git 提交
.\scripts\publish.ps1 -SdkPath "..\ViconNexus2.12_PythonSDK"

# 装配 + 创建 GitHub 公开仓库并推送（需要已登录 GitHub CLI：gh auth login）
.\scripts\publish.ps1 -SdkPath "..\ViconNexus2.12_PythonSDK" -CreateRemote -RepoName vicon-nexus-python-sdk
```

### 如果 PowerShell 拒绝运行脚本（PSSecurityException）

Windows 客户端默认执行策略是 `Restricted`，**任何 `.ps1` 都会被拒绝**，与脚本内容无关：

```
无法加载文件 ...\publish.ps1，因为在此系统上禁止运行脚本。
+ FullyQualifiedErrorId : UnauthorizedAccess
```

三种解法，按侵入程度排序：

| 做法 | 命令 | 影响范围 |
|---|---|---|
| **用批处理版**（推荐） | `scripts\publish.bat` | 批处理不受执行策略约束，零配置 |
| 单次绕过 | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\publish.ps1` | 仅该进程 |
| 改当前用户策略 | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` | 长期生效，无需管理员 |

先确认是哪一层策略在生效：`Get-ExecutionPolicy -List`（若 `MachinePolicy` 为 `Restricted`，说明是域策略，前两种命令行绕过会被覆盖，只能用 `publish.bat`）。

`publish.bat` 用 `robocopy` 完成同样的事（跳过 `build` / `*.egg-info` / `__pycache__`），
然后 `git init` + 首次提交；它不含创建远程仓库的步骤，需要时用：

```
gh repo create vicon-nexus-python-sdk --public --source . --remote origin --push
```

## 兼容性 / Compatibility

| 项目 | 支持范围 |
|---|---|
| 操作系统 | Windows x64 only（预编译 `.pyd` / `.dll`） |
| Python | 2.7 / 3.x，64 位 |
| Nexus | 2.12 |
| numpy（仅 utils） | `< 1.24`（源码使用了已移除的 `np.long` / `np.bool`） |

## 已知问题

见 [文档 · 常见问题](docs/faq.html#known-issues)。要点：

- SDK 多数方法失败时**不抛异常**，只把原因打印到 `stderr`，必须读回校验；
- `viconnexusutils` 1.0.0 有若干实现缺陷（`NexusAngles.Read`、`Scale()`、`mean()` 等）；
- 部分 docstring 与真实返回值不一致，文档中已逐条标注勘误。

## 许可 / License

分两层，不要混为一谈：

| 范围 | 许可 | 文件 |
|---|---|---|
| 上游 SDK（`viconnexusapi/`、`viconnexusutils/`、`example_scripts/`、`*.bat`） | **MIT** · © 2020 Vicon Motion Systems Ltd | [`LICENSE`](LICENSE)（上游原文，未改动） |
| 本仓库新增（`docs/`、脚本、README 等） | **MIT** · © 2026 文档作者 | [`LICENSE-DOCS`](LICENSE-DOCS) |

关于"MIT"这个名字，有一点值得说清楚：上游 `LICENSE` 里是 **MIT（Expat）正文，但没有标题行、
也没出现 "MIT" 字样**。判它是 MIT 的依据是文本逐字一致，加上 Vicon 自己在
`viconnexusapi/setup.py` 里声明的 `classifiers = 'License :: OSI Approved :: MIT License'`。
因此 `LICENSE` 必须保持原样逐字不变——新增条款请写进 `LICENSE-DOCS`。
来源与核对细节见 [`UPSTREAM.md`](UPSTREAM.md)。

> 本项目非 Vicon 官方项目，API 参考由源码反向整理，如与官方文档冲突以官方为准。
