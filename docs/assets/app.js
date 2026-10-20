/* ---------------------------------------------------------------------------
 * Site behaviour: theme toggle / mobile nav / on-page TOC / scrollspy / search
 * No third-party dependencies.
 *
 * UI strings are picked from <html lang="…"> so one file serves both the
 * English tree (/) and the Chinese tree (/zh/).
 * ------------------------------------------------------------------------- */
(function () {
  'use strict';

  var IS_ZH = (document.documentElement.lang || 'en')
    .toLowerCase().indexOf('zh') === 0;

  var STR = IS_ZH ? {
    toc: '本页目录',
    noResult: '没有匹配的结果',
    themeToLight: '切换到浅色主题',
    themeToDark: '切换到深色主题',
    results: '个结果'
  } : {
    toc: 'On this page',
    noResult: 'No results for',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    results: 'results'
  };

  var THEME_KEY = 'vicon-docs-theme';

  /* ---------------- Theme ---------------- */

  function applyTheme(theme) {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    var btn = document.getElementById('theme-btn');
    if (btn) {
      var dark = theme === 'dark' ||
        (!theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      btn.textContent = dark ? '☀' : '☾';
      btn.setAttribute('aria-label', dark ? STR.themeToLight : STR.themeToDark);
    }
  }

  function initTheme() {
    var saved = null;
    try { saved = window.localStorage.getItem(THEME_KEY); } catch (e) { /* file:// may block */ }
    applyTheme(saved);

    var btn = document.getElementById('theme-btn');
    if (!btn) { return; }
    btn.addEventListener('click', function () {
      var now = document.documentElement.getAttribute('data-theme');
      var isDark = now === 'dark' || (!now && window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      try { window.localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------------- Mobile menu ---------------- */

  function initMenu() {
    var btn = document.getElementById('menu-btn');
    if (!btn) { return; }
    btn.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
    document.addEventListener('click', function (ev) {
      if (!document.body.classList.contains('nav-open')) { return; }
      if (ev.target.closest('.sidebar') || ev.target.closest('#menu-btn')) { return; }
      document.body.classList.remove('nav-open');
    });
  }

  /* ---------------- Heading anchors + on-page TOC ---------------- */

  function slugify(text) {
    return text.replace(/[()（）,，:：/\\]/g, '').replace(/\s+/g, '-').toLowerCase();
  }

  function initHeadings() {
    var main = document.querySelector('main');
    if (!main) { return; }
    var heads = main.querySelectorAll('h2, h3');

    Array.prototype.forEach.call(heads, function (h) {
      if (!h.id) { h.id = slugify(h.textContent.trim()); }
      var a = document.createElement('a');
      a.className = 'anchor';
      a.href = '#' + h.id;
      a.textContent = '¶';
      a.setAttribute('aria-hidden', 'true');
      h.appendChild(a);
    });

    var toc = document.getElementById('toc');
    if (!toc || !heads.length) { return; }

    var list = document.createElement('div');
    list.innerHTML = '<div class="toc-title">' + STR.toc + '</div>';

    Array.prototype.forEach.call(heads, function (h) {
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent.replace('¶', '').trim();
      a.className = h.tagName === 'H3' ? 'lvl3' : 'lvl2';
      a.dataset.target = h.id;
      list.appendChild(a);
    });

    toc.appendChild(list);

    var links = toc.querySelectorAll('a');
    var targets = Array.prototype.map.call(links, function (a) {
      return document.getElementById(a.dataset.target);
    });

    function onScroll() {
      var offset = 120;
      var idx = -1;
      for (var i = 0; i < targets.length; i++) {
        if (targets[i] && targets[i].getBoundingClientRect().top <= offset) { idx = i; }
      }
      Array.prototype.forEach.call(links, function (a, i) {
        a.classList.toggle('active', i === idx);
      });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) { return; }
      ticking = true;
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
    });
    onScroll();
  }

  /* ---------------- Site search ---------------- */

  function initSearch() {
    var input = document.getElementById('search-input');
    var box = document.getElementById('search-results');
    var data = window.SEARCH_INDEX || [];
    if (!input || !box) { return; }

    var sel = -1;

    function escapeHtml(s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
    }

    function search(q) {
      var needle = q.toLowerCase().trim();
      if (!needle) { return []; }
      var out = [];
      for (var i = 0; i < data.length; i++) {
        var entry = data[i];              // [title, url, description]
        var title = String(entry[0]);
        var desc = String(entry[2] || '');
        var hay = (title + ' ' + desc).toLowerCase();
        var at = hay.indexOf(needle);
        if (at === -1) { continue; }
        var rank = title.toLowerCase().indexOf(needle) === 0 ? 0 : (at < 40 ? 1 : 2);
        out.push({ rank: rank, entry: entry });
      }
      out.sort(function (a, b) { return a.rank - b.rank; });
      return out.slice(0, 18).map(function (x) { return x.entry; });
    }

    function render(results, q) {
      sel = -1;
      if (!results.length) {
        box.innerHTML = '<div class="empty">' + escapeHtml(STR.noResult) +
          ' “' + escapeHtml(q) + '”</div>';
      } else {
        box.innerHTML = results.map(function (r) {
          return '<a href="' + r[1] + '">' + escapeHtml(r[0]) +
            '<span class="d">' + escapeHtml(r[2] || '') + '</span></a>';
        }).join('');
      }
      box.classList.add('open');
    }

    input.addEventListener('input', function () {
      var q = input.value;
      if (!q.trim()) { box.classList.remove('open'); box.innerHTML = ''; return; }
      render(search(q), q);
    });

    input.addEventListener('focus', function () {
      if (input.value.trim() && box.innerHTML) { box.classList.add('open'); }
    });

    input.addEventListener('keydown', function (ev) {
      var links = box.querySelectorAll('a');
      if (ev.key === 'ArrowDown' && links.length) {
        ev.preventDefault();
        sel = Math.min(sel + 1, links.length - 1);
      } else if (ev.key === 'ArrowUp' && links.length) {
        ev.preventDefault();
        sel = Math.max(sel - 1, 0);
      } else if (ev.key === 'Enter') {
        var pick = links[sel >= 0 ? sel : 0];
        if (pick) { window.location.href = pick.getAttribute('href'); }
        return;
      } else if (ev.key === 'Escape') {
        box.classList.remove('open');
        input.blur();
        return;
      } else {
        return;
      }
      Array.prototype.forEach.call(links, function (a, i) {
        a.classList.toggle('sel', i === sel);
      });
      if (links[sel]) { links[sel].scrollIntoView({ block: 'nearest' }); }
    });

    document.addEventListener('click', function (ev) {
      if (!ev.target.closest('.search-box')) { box.classList.remove('open'); }
    });

    // Shortcut: Ctrl/Cmd + K
    document.addEventListener('keydown', function (ev) {
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') {
        ev.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  function boot() {
    initTheme();
    initMenu();
    initHeadings();
    initSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
