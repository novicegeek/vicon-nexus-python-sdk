# Changelog

本文件记录**本文档仓库**的变化。SDK 本身的变更见上游 `viconnexusapi/CHANGES.rst`
与 `viconnexusutils/CHANGES.rst`。

## [1.1.0] — 2026-10-20

### 新增

- 文档站点改为**双语镜像结构**：`docs/` 为英文版（默认打开），`docs/zh/` 为中文版；
  两棵树文件名一一对应，右上角语言按钮在任意页面（含深链接）都能切换到对应页面。
- 导航、页内目录、搜索占位文案、空结果提示、主题按钮 aria 文案均按 `<html lang>` 自动切换。
- 独立的英文搜索索引 `docs/assets/search-index.en.js`（中文仍用 `docs/assets/search-index.js`）。

## [1.0.0] — 2026-10-20

### 新增

- 完整的静态文档站点 `docs/`，覆盖 SDK 全部四个 Python 层：
  - `ViconNexus`：69 个方法（签名、参数表、返回值、示例）
  - `ViconUtils`：9 个公开函数 + 坐标/旋转约定
  - `NexusForcePlate` / `NexusEyeTracker`：字段级说明
  - `viconnexusutils`：4 个类的完整方法表
  - `NexusClient3` / `NexusClient`：72 个底层方法与 `Output_*` 返回值类型
- 侧边导航、全站搜索（`Ctrl K`）、深色模式、响应式布局，零外部依赖。
- 架构文档：Python → SWIG → `.pyd` → DLL → Nexus 的调用链，含源码目录树。
- 8 个官方示例脚本的逐节解析与注意事项。
- 常见问题：连接失败、位数/版本、numpy 兼容性、性能、保存语义、并发。
- `scripts/publish.ps1`：从本地 SDK 目录装配仓库并初始化 git / 创建 GitHub 仓库。
- GitHub Pages 自动部署工作流。

### 记录的上游问题

- `GetSubjectParamDetails` 返回 5 值、`GetAnalysisParamDetails` 返回 3 值，docstring 示例解包数量错误。
- `CreateAnEvent` docstring 中 `context` 与 `event` 顺序颠倒。
- `GetSplineResults` docstring 参数表复制自 `SubmitSplineTrajectory`。
- `GetDeviceIDFromName` docstring 称返回 string，实际为整型 ID。
- `viconnexusutils` 1.0.0：`NexusAngles.Read` 掩码维度错误、`NexusAngles.mean` 写错属性、
  `NexusSegment.Scale` 返回朝向、`NexusSegment.mean`/`__rmul__` 返回 `None`、
  `SetPosition/SetOrientation/SetScale` 帧索引未减 1、`Write` 补帧切片跳帧。
- `viconnexusutils` 使用 `np.long` / `np.bool`，与 numpy ≥ 1.24 不兼容。
- 官方示例脚本均为 Python 2 语法，且 `DetectFootEvents.py` 存在索引基与整除假设问题。
