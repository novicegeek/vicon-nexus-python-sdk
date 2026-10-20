@echo off
rem ===========================================================================
rem  publish.bat - assemble the single-repo layout and make the first commit.
rem
rem  Pure cmd on purpose: Windows' PowerShell execution policy (default
rem  "Restricted") blocks .ps1 files, and batch files are not affected by it.
rem  Equivalent to scripts\publish.ps1, minus the GitHub CLI step.
rem
rem  Usage:
rem      scripts\publish.bat
rem      scripts\publish.bat "D:\path\to\ViconNexus2.12_PythonSDK"
rem ===========================================================================
setlocal EnableExtensions
set "KIT=%~dp0.."
set "SDK=%~1"
if "%SDK%"=="" set "SDK=%~dp0..\..\ViconNexus2.12_PythonSDK"

pushd "%KIT%" 2>nul
if errorlevel 1 (
    echo [ERROR] cannot enter "%KIT%"
    exit /b 1
)

echo.
echo === checking SDK ===
if not exist "%SDK%\viconnexusapi\viconnexusapi\ViconNexus.py" (
    echo [ERROR] SDK not found at:
    echo         %SDK%
    echo.
    echo         Pass it explicitly, e.g.
    echo         scripts\publish.bat "D:\path\to\ViconNexus2.12_PythonSDK"
    popd
    exit /b 1
)
echo     %SDK%

echo.
echo === copying SDK files ===
rem /XD skips build artefacts so no compiled duplicates reach the repo.
robocopy "%SDK%\viconnexusapi"   "viconnexusapi"   /E /XD build *.egg-info __pycache__ /NFL /NDL /NJH /NJS /NP >nul
robocopy "%SDK%\viconnexusutils" "viconnexusutils" /E /XD build *.egg-info __pycache__ /NFL /NDL /NJH /NJS /NP >nul
robocopy "%SDK%\example_scripts" "example_scripts" /E /XD __pycache__ /NFL /NDL /NJH /NJS /NP >nul
copy /Y "%SDK%\*.bat" "." >nul 2>&1
echo     viconnexusapi, viconnexusutils, example_scripts, install/uninstall *.bat

echo.
echo === git ===
where git >nul 2>&1
if errorlevel 1 (
    echo     [WARN] git not found in PATH - files are copied, no commit made.
    popd
    exit /b 0
)

if not exist ".git" (
    git init >nul
    git symbolic-ref HEAD refs/heads/main
    echo     initialised repository on branch main
) else (
    echo     repository already initialised
)

git config user.email >nul 2>&1
if errorlevel 1 (
    echo     [WARN] git user.name / user.email are not configured - skipping commit.
    echo            Run:  git config user.name "Your Name"
    echo                  git config user.email "you@example.com"
    echo            then rerun this script.
    popd
    exit /b 0
)

git add -A
git diff --cached --quiet
if errorlevel 1 (
    git commit -m "Add Vicon Nexus Python SDK sources and API documentation" >nul
    echo     committed staged changes
) else (
    echo     nothing to commit
)

echo.
echo === done ===
echo     Next: enable GitHub Pages (Settings -^> Pages -^> branch main, folder /docs)
popd
exit /b 0
