/* 最新消息渲染與篩選（資料來源 data/news.js）
   - #news-pinned：重要公告（首頁）
   - #news-home：最新 2 則（首頁）
   - #news-list-pinned：重要公告（校友聯演頁）
   - #news-list：最新 2 則（校友聯演頁）
   - #news-all：全部文章（news/index.html，靜態列表由產生器輸出，JS 只做篩選） */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.NEWS) return;

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalize(n) {
    return {
      id: n.id || String(n.url || '').replace(/^news\//, '').replace(/\.html$/, ''),
      date: n.date || '',
      category: n.category || '最新消息',
      tags: Array.isArray(n.tags) ? n.tags : [],
      title: n.title || '',
      summary: n.summary || '',
      url: n.output || n.url || '',
      thumb: n.thumb || '',
      pinned: Boolean(n.pinned),
      priority: n.priority || (n.pinned ? 'important' : 'normal')
    };
  }

  var news = window.NEWS.map(normalize);

  function tagHtml(tags) {
    return tags.slice(0, 4).map(function (tag) {
      return '<span>#' + escapeHtml(tag) + '</span>';
    }).join('');
  }

  function item(n, base) {
    base = base || '';
    var classes = 'news-item' + (n.pinned ? ' is-pinned' : '') + (n.priority === 'urgent' ? ' is-urgent' : '');
    var tail = n.thumb
      ? '<img class="news-thumb" src="' + escapeHtml(base + n.thumb) + '" alt="" loading="lazy">'
      : '<span class="news-arrow">→</span>';
    var tags = tagHtml(n.tags);
    return '<a class="' + classes + '" href="' + escapeHtml(base + n.url) + '" data-category="' + escapeHtml(n.category) + '" data-tags="' + escapeHtml(n.tags.join('|')) + '" data-news-id="' + escapeHtml(n.id) + '">' +
      '<span class="news-date"><span>' + escapeHtml(n.category) + '</span><time datetime="' + escapeHtml(n.date) + '">' + escapeHtml(n.date) + '</time></span>' +
      '<span class="news-body">' +
        '<span class="news-title-line">' + (n.pinned ? '<em>重要</em>' : '') + '<b>' + escapeHtml(n.title) + '</b></span>' +
        '<span class="news-summary">' + escapeHtml(n.summary) + '</span>' +
        (tags ? '<span class="news-tags">' + tags + '</span>' : '') +
      '</span>' +
      tail +
    '</a>';
  }

  function latestItems(limit) {
    var pinnedIds = new Set(news.filter(function (n) { return n.pinned; }).map(function (n) { return n.id; }));
    return news.filter(function (n) { return !pinnedIds.has(n.id); }).slice(0, limit);
  }

  function renderPinned(container, base) {
    var pinned = news.filter(function (n) { return n.pinned; }).slice(0, 1);
    if (!pinned.length) {
      container.hidden = true;
      return;
    }
    container.hidden = false;
    container.innerHTML = pinned.map(function (n) { return item(n, base); }).join('');
  }

  var homePinned = document.getElementById('news-pinned');
  if (homePinned) renderPinned(homePinned, '');

  var home = document.getElementById('news-home');
  if (home) home.innerHTML = latestItems(2).map(function (n) { return item(n, ''); }).join('');

  var listPinned = document.getElementById('news-list-pinned');
  if (listPinned) renderPinned(listPinned, '');

  var list = document.getElementById('news-list');
  if (list) {
    var LIMIT = 2;
    list.innerHTML = latestItems(LIMIT).map(function (n) { return item(n, ''); }).join('') || '<p class="muted">目前沒有新消息。</p>';
    if (news.length > LIMIT) {
      list.insertAdjacentHTML('afterend',
        '<p class="news-more"><a href="news/index.html">前往最新消息總覽（共 ' + news.length + ' 則）→</a></p>');
    }
  }

  var all = document.getElementById('news-all');
  if (!all) return;

  var base = all.getAttribute('data-base') || '';
  if (all.getAttribute('data-static') !== 'true') {
    all.innerHTML = news.map(function (n) { return item(n, base); }).join('') || '<p class="muted">目前沒有消息。</p>';
  }

  var items = Array.prototype.slice.call(all.querySelectorAll('.news-item'));
  var count = document.getElementById('news-result-count');
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('[data-news-filter]'));
  var tagLinks = Array.prototype.slice.call(document.querySelectorAll('[data-news-tag]'));
  var clearButton = document.getElementById('news-clear-filter');
  var emptyState = document.getElementById('news-empty-state');
  var activeCategory = 'all';
  var activeTag = '';

  function setActiveControls() {
    filterButtons.forEach(function (button) {
      var isActive = button.getAttribute('data-news-filter') === activeCategory;
      button.classList.toggle('active', isActive);
      if (button.tagName === 'BUTTON') {
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      } else if (isActive) {
        button.setAttribute('aria-current', 'true');
      } else {
        button.removeAttribute('aria-current');
      }
    });
    tagLinks.forEach(function (link) {
      var isActive = link.getAttribute('data-news-tag') === activeTag;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    if (clearButton) clearButton.hidden = activeCategory === 'all' && !activeTag;
  }

  function updateUrl() {
    if (!window.history || !window.history.replaceState) return;
    var url = new URL(window.location.href);
    url.searchParams.delete('category');
    url.searchParams.delete('tag');
    if (activeTag) {
      url.searchParams.set('tag', activeTag);
    } else if (activeCategory !== 'all') {
      url.searchParams.set('category', activeCategory);
    }
    window.history.replaceState({}, '', url.pathname + url.search + url.hash);
  }

  function applyFilters(options) {
    options = options || {};
    var visible = 0;
    items.forEach(function (entry) {
      var category = entry.getAttribute('data-category') || '';
      var tags = (entry.getAttribute('data-tags') || '').split('|').filter(Boolean);
      var matchCategory = activeCategory === 'all' || category === activeCategory;
      var matchTag = !activeTag || tags.indexOf(activeTag) >= 0;
      var show = matchCategory && matchTag;
      entry.hidden = !show;
      if (show) visible += 1;
    });
    if (count) {
      var label = activeTag ? ('#' + activeTag) : (activeCategory === 'all' ? '全部' : activeCategory);
      count.textContent = '目前顯示 ' + label + ' ' + visible + ' 則消息';
    }
    if (emptyState) emptyState.hidden = visible > 0;
    setActiveControls();
    if (options.updateUrl !== false) updateUrl();
  }

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      activeCategory = button.getAttribute('data-news-filter') || 'all';
      activeTag = '';
      applyFilters();
    });
  });

  tagLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      activeTag = link.getAttribute('data-news-tag') || '';
      activeCategory = 'all';
      applyFilters();
    });
  });

  if (clearButton) {
    clearButton.addEventListener('click', function () {
      activeCategory = 'all';
      activeTag = '';
      applyFilters();
    });
  }

  var params = new URLSearchParams(window.location.search);
  if (params.get('category')) activeCategory = params.get('category');
  if (params.get('tag')) {
    activeTag = params.get('tag');
    activeCategory = 'all';
  }
  applyFilters({ updateUrl: false });
});
