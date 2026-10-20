# Upstream provenance / 上游来源

This repository redistributes Vicon's Python SDK next to documentation written here.
This file records exactly what came from where, and what the licence situation is.

本仓库把 Vicon 官方的 Python SDK 与自行编写的文档放在一起。本文件说明哪些内容来自上游、
哪些是本仓库新增，以及许可证的判定依据。

## What is upstream / 上游内容

| Item | Value |
|---|---|
| SDK | Vicon Nexus **2.12** Python SDK |
| Packages | `viconnexusapi` **1.0.3**, `viconnexusutils` **1.0.0** |
| Origin | Vicon Nexus 2.12 installation media / vendor SDK folder (`ViconNexus2.12_PythonSDK/`) |
| Directories | `viconnexusapi/`, `viconnexusutils/`, `example_scripts/`, `install_*.bat`, `uninstall_*.bat` |
| Modified? | **No.** Files are copied as-is, including the `.pyd` / `.dll` binaries and the per-package `LICENSE`, `VERSION`, `CHANGES.rst` |
| Vendored on | 2026-10-20 |

## What was added here / 本仓库新增

| Path | Content |
|---|---|
| `docs/` | API reference site, English (root) + Chinese (`docs/zh/`), hand-written HTML |
| `scripts/publish.ps1`, `scripts/publish.bat` | Tooling that copies the upstream SDK into this repo |
| `.github/workflows/pages.yml` | GitHub Pages deployment |
| `README.md`, `CHANGELOG.md`, `UPSTREAM.md` | Project documentation |
| `LICENSE-DOCS` | Licence for the items above |

## Licence / 许可证

Upstream material is under the terms reproduced verbatim in [`LICENSE`](LICENSE).

Note the detail that matters when republishing:

- That file contains the **MIT (Expat) licence text**, but it carries **no title line**
  and does **not contain the string "MIT"** anywhere. Calling it "MIT" is an identification
  of the text, not a statement present in the file itself.
- The name is nonetheless Vicon's own declaration, in machine-readable package metadata:
  `viconnexusapi/setup.py` → `classifiers = ('License :: OSI Approved :: MIT License', …)`,
  and likewise in `viconnexusutils/PKG-INFO`.
- MIT permits redistribution in source or binary form, provided the copyright notice and
  permission notice travel with it. `LICENSE` is that notice, unmodified; each package also
  carries its own copy (`viconnexusapi/LICENSE`, `viconnexusutils/LICENSE`).

Therefore: **the SDK is MIT-licensed**, and `LICENSE` must stay byte-for-byte as received.
Do not append anything to it — additions to this repository belong in
[`LICENSE-DOCS`](LICENSE-DOCS), which is exactly why that file exists.

新增内容（`docs/`、脚本、README 等）由本仓库以 MIT 发布，见 [`LICENSE-DOCS`](LICENSE-DOCS)。
上游 `LICENSE` 必须保持原样，不要在上面追加条款——要加东西请写进 `LICENSE-DOCS`。

## Upgrading upstream / 升级上游

1. Replace `viconnexusapi/` and/or `viconnexusutils/` wholesale from the new SDK release
   (do not merge file by file — the SWIG bindings and binaries must stay consistent).
2. Update the version numbers in this file and in `README.md` (compatibility table).
3. Re-check `docs/` against the changed docstrings; the pages that list known upstream
   defects (`docs/faq.html#known-issues`, `docs/zh/faq.html#known-issues`) will need review.
4. Keep `LICENSE` and the per-package `LICENSE` files as they ship in the new release.

## Disclaimer / 免责

Not an official Vicon project. The API reference was written by reading the SDK source
(docstrings plus implementation); where it disagrees with Vicon's own documentation, treat
Vicon's as authoritative.
