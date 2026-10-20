/* ---------------------------------------------------------------------------
 * Sidebar navigation + language switch.
 *
 * The docs ship in two mirrored trees:
 *   /            English (default)
 *   /zh/         Chinese
 *
 * Each tree uses identical file names, so navigation hrefs are the same for
 * both languages; only the labels differ. Language is detected from
 * <html lang="…">, and the switch button points at the same page in the
 * other tree, so it works from any page (including deep links).
 *
 * Plain ES5, no modules: works straight from file://.
 * ------------------------------------------------------------------------- */
(function () {
  'use strict';

  var LANG = (document.documentElement.lang || 'en')
    .toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';

  var NAV = {
    en: [
      {
        label: 'Getting started',
        items: [
          { t: 'Overview', href: 'index.html' },
          { t: 'Quick start', href: 'getting-started.html' },
          { t: 'Architecture', href: 'architecture.html' }
        ]
      },
      {
        label: 'API reference',
        items: [
          { t: 'ViconNexus', href: 'api-viconnexus.html', badge: '69' },
          { t: 'ViconUtils', href: 'api-viconutils.html', badge: '9' },
          { t: 'Data types', href: 'api-datatypes.html' },
          { t: 'viconnexusutils', href: 'api-viconnexusutils.html', badge: '34' },
          { t: 'Low-level client', href: 'api-lowlevel.html', badge: '72' }
        ]
      },
      {
        label: 'Usage',
        items: [
          { t: 'Example scripts', href: 'examples.html' },
          { t: 'FAQ', href: 'faq.html' },
          { t: 'Errors & methods', href: 'faq.html#errors' }
        ]
      }
    ],
    zh: [
      {
        label: '开始',
        items: [
          { t: '概览', href: 'index.html' },
          { t: '快速开始', href: 'getting-started.html' },
          { t: '架构与分层', href: 'architecture.html' }
        ]
      },
      {
        label: 'API 参考',
        items: [
          { t: 'ViconNexus', href: 'api-viconnexus.html', badge: '69' },
          { t: 'ViconUtils', href: 'api-viconutils.html', badge: '9' },
          { t: '数据类型', href: 'api-datatypes.html' },
          { t: 'viconnexusutils', href: 'api-viconnexusutils.html', badge: '34' },
          { t: '底层客户端', href: 'api-lowlevel.html', badge: '72' }
        ]
      },
      {
        label: '使用',
        items: [
          { t: '示例脚本', href: 'examples.html' },
          { t: '常见问题', href: 'faq.html' },
          { t: '方法与错误码', href: 'faq.html#errors' }
        ]
      }
    ]
  };

  function currentPage() {
    var path = window.location.pathname.replace(/\\/g, '/');
    var file = path.substring(path.lastIndexOf('/') + 1);
    return file || 'index.html';
  }

  function render() {
    var host = document.getElementById('side-nav');
    if (!host) { return; }

    var here = currentPage();
    var groups = NAV[LANG] || NAV.en;
    var html = '';

    groups.forEach(function (group) {
      html += '<div class="nav-group"><div class="nav-label">' + group.label + '</div>';
      group.items.forEach(function (item) {
        var file = item.href.split('#')[0];
        var cls = (file === here) ? ' class="active"' : '';
        var badge = item.badge ? '<span class="badge">' + item.badge + '</span>' : '';
        html += '<a href="' + item.href + '"' + cls + '>' + badge + item.t + '</a>';
      });
      html += '</div>';
    });

    host.className = 'side-nav';
    host.innerHTML = html;
  }

  /* Language switch: same file name, other tree. */
  function initLangSwitch() {
    var themeBtn = document.getElementById('theme-btn');
    if (!themeBtn || document.getElementById('lang-switch')) { return; }

    var file = currentPage();
    var a = document.createElement('a');
    a.className = 'icon-btn lang-switch';
    a.id = 'lang-switch';

    if (LANG === 'zh') {
      a.href = '../' + file;
      a.textContent = 'EN';
      a.title = 'Switch to English';
      a.setAttribute('aria-label', 'Switch to English');
      a.setAttribute('hreflang', 'en');
    } else {
      a.href = 'zh/' + file;
      a.textContent = '中文';
      a.title = '切换到中文';
      a.setAttribute('aria-label', '切换到中文');
      a.setAttribute('hreflang', 'zh-CN');
    }

    themeBtn.parentNode.insertBefore(a, themeBtn);
  }

  function boot() {
    render();
    initLangSwitch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
