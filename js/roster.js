/* 校友名錄：雙檢視分組（依字頭／依入學年代）＋聲部篩選（資料來源 data/alumni.js）
   字頭定義：編號第二碼＝入學民國年的個位數。例：7581、8501、9502 皆為「五字頭」。 */
document.addEventListener('DOMContentLoaded', function () {
  var root = document.getElementById('roster');
  if (!root || !window.ALUMNI) return;

  var PARTS = ['全部', '幹部', '長笛', '豎笛', '薩克斯風', '小號', '法國號', '長號', '上低音號', '低音號', '打擊'];
  var STATUS_FILTERS = [
    { key: 'all', label: '全部狀態' },
    { key: 'profile', label: '有個人頁' },
    { key: 'photo', label: '有照片' },
    { key: 'missing-photo', label: '待補照片' },
    { key: 'leader', label: '幹部' }
  ];
  var DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var currentPart = '全部';
  var currentStatus = 'all';
  var mode = 'head'; /* head=依字頭, decade=依入學年代 */
  var view = 'card'; /* card=卡片, list=精簡列表 */
  var query = '';
  var groupOpenState = {};
  var filterPanel = document.querySelector('.roster-filter-panel');
  var filterSummary = document.getElementById('roster-filter-summary');
  var activeFilters = document.getElementById('roster-active-filters');
  var stickyCount = document.getElementById('roster-sticky-count');
  var stickySummary = document.getElementById('roster-sticky-summary');
  var isMobileRoster = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
  if (filterPanel && isMobileRoster) filterPanel.removeAttribute('open');
  readStateFromUrl();

  function isValidPart(value) {
    return PARTS.indexOf(value) >= 0;
  }

  function isValidStatus(value) {
    return STATUS_FILTERS.some(function (item) { return item.key === value; });
  }

  function readStateFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var nextMode = params.get('mode');
    var nextView = params.get('view');
    var nextPart = params.get('part');
    var nextStatus = params.get('status');
    var nextQuery = params.get('q');

    if (nextMode === 'head' || nextMode === 'decade') mode = nextMode;
    if (nextView === 'card' || nextView === 'list') view = nextView;
    if (nextPart && isValidPart(nextPart)) currentPart = nextPart;
    if (nextStatus && isValidStatus(nextStatus)) currentStatus = nextStatus;
    if (nextQuery) query = nextQuery.trim();
  }

  function updateUrlState() {
    var params = new URLSearchParams();
    if (query) params.set('q', query);
    if (currentPart !== '全部') params.set('part', currentPart);
    if (currentStatus !== 'all') params.set('status', currentStatus);
    if (mode !== 'head') params.set('mode', mode);
    if (view !== 'card') params.set('view', view);

    var nextUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '') + window.location.hash;
    if (nextUrl !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.replaceState(null, '', nextUrl);
    }
  }

  function syncButtonGroup(container, value) {
    if (!container) return;
    container.querySelectorAll('.filter-btn').forEach(function (button) {
      button.classList.toggle('on', button.dataset.value === value);
    });
  }

  function syncControls() {
    syncButtonGroup(modeBar, mode);
    syncButtonGroup(stickyModeBar, mode);
    syncButtonGroup(viewBar, view);
    syncButtonGroup(stickyViewBar, view);
    syncButtonGroup(statusBar, currentStatus);
    syncButtonGroup(stickyStatusBar, currentStatus);
    syncButtonGroup(bar, currentPart);
    syncButtonGroup(stickyBar, currentPart);
    if (search && search.value.trim() !== query) search.value = query;
    if (stickySearch && stickySearch.value.trim() !== query) stickySearch.value = query;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function hasActiveFilterState() {
    return !!query || currentPart !== '全部' || currentStatus !== 'all' || mode !== 'head' || view !== 'card';
  }

  function resetAllFilters() {
    query = '';
    currentPart = '全部';
    currentStatus = 'all';
    mode = 'head';
    view = 'card';
  }

  function resultCountText(resultCount) {
    return '共 ' + resultCount + ' 位';
  }

  function renderActiveFilters(resultCount) {
    if (!activeFilters) return;
    if (!hasActiveFilterState()) {
      activeFilters.classList.remove('has-filters');
      activeFilters.innerHTML = '';
      return;
    }

    var chips = ['<span class="roster-active-title">已套用（' + resultCountText(resultCount) + '）</span>'];
    if (query) chips.push('<button type="button" class="roster-active-chip" data-reset="query">搜尋：' + escapeHtml(query) + '</button>');
    if (currentPart !== '全部') chips.push('<button type="button" class="roster-active-chip" data-reset="part">聲部：' + escapeHtml(currentPart) + '</button>');
    if (currentStatus !== 'all') chips.push('<button type="button" class="roster-active-chip" data-reset="status">狀態：' + escapeHtml(currentStatusLabel()) + '</button>');
    if (mode !== 'head') chips.push('<button type="button" class="roster-active-chip" data-reset="mode">分組：' + escapeHtml(currentModeLabel()) + '</button>');
    if (view !== 'card') chips.push('<button type="button" class="roster-active-chip" data-reset="view">檢視：列表</button>');
    chips.push('<button type="button" class="roster-clear-filters" data-reset="all">清除全部</button>');

    activeFilters.innerHTML = chips.join('');
    activeFilters.classList.add('has-filters');
  }

  function updateStickyTools(resultCount) {
    if (stickyCount) stickyCount.textContent = resultCountText(resultCount);
    if (stickySummary) {
      stickySummary.textContent = [
        currentModeLabel(),
        currentPart === '全部' ? '全部聲部' : currentPart,
        currentStatusLabel(),
        view === 'list' ? '列表' : '卡片'
      ].join('．');
    }
  }

  function bindSearchInput(input) {
    if (!input) return;
    input.value = query;
    input.addEventListener('input', function () {
      query = input.value.trim();
      updateUrlState();
      render();
    });
  }

  function addFilterButton(container, value, label, isActive, onClick) {
    if (!container) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.dataset.value = value;
    b.className = 'filter-btn' + (isActive ? ' on' : '');
    b.textContent = label;
    b.addEventListener('click', onClick);
    container.appendChild(b);
  }

  function groupStateId(groupInfo) {
    return mode + ':' + groupInfo.key;
  }

  function isGroupOpen(groupInfo, index) {
    var id = groupStateId(groupInfo);
    if (Object.prototype.hasOwnProperty.call(groupOpenState, id)) return groupOpenState[id];
    return hasActiveFilterState() || index === 0;
  }

  function setAllGroups(open) {
    root.querySelectorAll('.roster-group').forEach(function (group) {
      group.open = open;
      groupOpenState[group.dataset.groupId] = open;
    });
  }

  function headGroup(p) {
    /* 字頭＝編號第二碼（入學民國年的個位數） */
    if (!p.num) return { key: 99, label: '編號待考', sub: '編號制度前的資深前輩與資料待補者' };
    var d = parseInt(p.num.charAt(1), 10);
    return { key: d, label: DIGITS[d] + '字頭', sub: '編號第二碼 ' + d + '．入學民國年尾數 ' + d + '，每十年一輪' };
  }

  function decadeGroup(p) {
    if (p.year == null) return { key: 999, label: '編號待補', sub: '資料整理中，歡迎校友提供' };
    if (p.year >= 100) return { key: 10, label: '民國一〇〇年後', sub: '入學民國 100 年之後' };
    var dec = Math.floor(p.year / 10);
    var names = { 4: '四〇', 5: '五〇', 6: '六〇', 7: '七〇', 8: '八〇', 9: '九〇' };
    return { key: dec, label: '民國' + (names[dec] || dec + '〇') + '年代', sub: '入學民國 ' + dec + '0–' + dec + '9 年' };
  }

  function normalizedTerms(value) {
    return value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  }

  function searchText(p) {
    return [
      p.num || '',
      p.name || '',
      p.year == null ? '' : '民國 ' + p.year + ' ' + p.year,
      p.part || '',
      (p.tags || []).join(' '),
      p.role || '',
      p.desc || ''
    ].join(' ').toLowerCase();
  }

  function matchesQuery(p) {
    var terms = normalizedTerms(query);
    if (!terms.length) return true;
    var text = searchText(p);
    return terms.every(function (term) { return text.indexOf(term) >= 0; });
  }

  function hasProfile(p) {
    return !!(p.link && p.link.indexOf('people/') === 0);
  }

  function hasPhoto(p) {
    return !!(p.photo && p.photo !== 'blank');
  }

  function matchesStatus(p) {
    if (currentStatus === 'profile') return hasProfile(p);
    if (currentStatus === 'photo') return hasPhoto(p);
    if (currentStatus === 'missing-photo') return !hasPhoto(p);
    if (currentStatus === 'leader') return (p.tags || []).indexOf('幹部') >= 0;
    return true;
  }

  function currentModeLabel() {
    return mode === 'head' ? '依字頭' : '依入學年代';
  }

  function currentStatusLabel() {
    var statusInfo = STATUS_FILTERS.find(function (item) { return item.key === currentStatus; });
    return statusInfo ? statusInfo.label : '全部狀態';
  }

  function updateFilterSummary() {
    if (!filterSummary) return;
    filterSummary.textContent = [
      currentModeLabel(),
      currentPart === '全部' ? '全部聲部' : currentPart,
      currentStatusLabel()
    ].join('．');
  }

  function personMeta(p) {
    var parts = [];
    if (p.year != null) parts.push('民國 ' + p.year + ' 年入學');
    if (p.part) parts.push(p.part);
    return parts.join('．');
  }

  function renderCard(p) {
    var anchorId = 'p-' + (p.num || p.photo);
    var hasProfileLink = hasProfile(p);
    var html = '<div class="card roster-card" id="' + anchorId + '">';
    html += hasProfileLink
      ? '<a class="card-head" href="' + p.link + '" aria-label="查看' + p.name + '完整介紹 →">'
      : '<div class="card-head">';
    html += '<img class="avatar" src="assets/img/members/' + (p.photo || 'blank') + '.webp" alt="' + p.name + '" loading="lazy">';
    html += '<div>';
    html += '<p class="num">' + (p.num || '—') + (p.part ? ' <small>' + (p.year != null ? '民國 ' + p.year + ' 年入學．' : '') + p.part + '</small>' : (p.year != null ? ' <small>民國 ' + p.year + ' 年入學</small>' : '')) + '</p>';
    html += '<h3>' + p.name + '</h3>';
    html += hasProfileLink ? '</div></a>' : '</div></div>';
    if (p.role) html += '<p class="role">' + p.role + '</p>';
    if (p.desc) html += '<p>' + p.desc + '</p>';
    if (hasProfileLink) html += '<p class="more"><a href="' + p.link + '">詳細介紹 →</a></p>';
    html += '</div>';
    return html;
  }

  function renderRow(p) {
    var anchorId = 'p-' + (p.num || p.photo);
    var hasProfileLink = hasProfile(p);
    var tag = hasProfileLink ? 'a' : 'div';
    var html = '<' + tag + ' class="roster-row' + (hasProfileLink ? ' linked' : '') + '" id="' + anchorId + '"' + (hasProfileLink ? ' href="' + p.link + '" aria-label="查看' + p.name + '完整介紹 →"' : '') + '>';
    html += '<img class="roster-row-avatar" src="assets/img/members/' + (p.photo || 'blank') + '.webp" alt="' + p.name + '" loading="lazy">';
    html += '<span class="roster-row-num">' + (p.num || '—') + '</span>';
    html += '<span class="roster-row-main"><b>' + p.name + '</b>';
    if (p.role || p.desc) html += '<small>' + (p.role || p.desc) + '</small>';
    html += '</span>';
    html += '<span class="roster-row-meta">' + personMeta(p) + '</span>';
    html += '</' + tag + '>';
    return html;
  }

  function render() {
    var list = window.ALUMNI.filter(function (p) {
      return (currentPart === '全部' || (p.tags || []).indexOf(currentPart) >= 0) && matchesStatus(p) && matchesQuery(p);
    }).sort(function (a, b) {
      var ya = a.year == null ? 9999 : a.year, yb = b.year == null ? 9999 : b.year;
      return ya - yb || ((a.num || '9999') < (b.num || '9999') ? -1 : 1);
    });

    var groupFn = mode === 'head' ? headGroup : decadeGroup;
    var groups = [], map = {};
    list.forEach(function (p) {
      var g = groupFn(p);
      if (!map[g.key]) { map[g.key] = { info: g, people: [] }; groups.push(map[g.key]); }
      map[g.key].people.push(p);
    });
    groups.sort(function (a, b) { return a.info.key - b.info.key; });

    var html = '';
    if (!list.length) html = '<p class="muted">沒有符合目前搜尋與篩選條件的校友，請調整關鍵字或篩選條件。</p>';
    if (groups.length) {
      html += '<div class="roster-group-actions" id="roster-group-actions">';
      html += '<button type="button" data-group-action="open">全部展開</button>';
      html += '<button type="button" data-group-action="close">全部收合</button>';
      html += '</div>';
    }
    groups.forEach(function (g, index) {
      var groupId = groupStateId(g.info);
      var open = isGroupOpen(g.info, index);
      html += '<details class="section roster-group" data-group-id="' + groupId + '"' + (open ? ' open' : '') + '>';
      html += '<summary class="roster-group-summary">';
      html += '<h2>' + g.info.label + ' <span class="group-sub">' + g.info.sub + '．' + g.people.length + ' 位</span></h2>';
      html += '<span class="roster-group-state" aria-hidden="true"></span>';
      html += '</summary>';
      html += view === 'card' ? '<div class="cards roster-cards">' : '<div class="roster-list">';
      g.people.forEach(function (p) {
        html += view === 'card' ? renderCard(p) : renderRow(p);
      });
      html += '</div></details>';
    });
    root.innerHTML = html;
    root.querySelectorAll('.roster-group').forEach(function (group) {
      group.addEventListener('toggle', function () {
        groupOpenState[group.dataset.groupId] = group.open;
      });
    });
    var groupActions = document.getElementById('roster-group-actions');
    if (groupActions) {
      groupActions.addEventListener('click', function (event) {
        var button = event.target.closest('button[data-group-action]');
        if (!button) return;
        setAllGroups(button.dataset.groupAction === 'open');
      });
    }
    root.querySelectorAll('.roster-card, .roster-row').forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--d', Math.min((i % 6) * 0.06, 0.3) + 's');
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('in'); }); });
    });
    var count = document.getElementById('roster-count');
    if (count) {
      var status = [];
      if (currentPart !== '全部') status.push('篩選「' + currentPart + '」');
      var statusInfo = STATUS_FILTERS.find(function (item) { return item.key === currentStatus; });
      if (currentStatus !== 'all' && statusInfo) status.push('狀態「' + statusInfo.label + '」');
      if (query) status.push('搜尋「' + query + '」');
      count.textContent = '目前收錄 ' + window.ALUMNI.length + ' 位校友' + (status.length ? '，' + status.join('、') + '共 ' + list.length + ' 位' : '') + '，持續增補中。';
    }
    updateFilterSummary();
    renderActiveFilters(list.length);
    updateStickyTools(list.length);
    syncControls();
  }

  /* 分組方式切換 */
  var modeBar = document.getElementById('roster-mode');
  var stickyModeBar = document.getElementById('roster-sticky-mode');
  [modeBar, stickyModeBar].forEach(function (container) {
    [['head', '依字頭'], ['decade', '依入學年代']].forEach(function (m) {
      addFilterButton(container, m[0], m[1], m[0] === mode, function () {
        mode = m[0];
        updateUrlState();
        render();
      });
    });
  });

  /* 檢視模式切換 */
  var viewBar = document.getElementById('roster-view');
  var stickyViewBar = document.getElementById('roster-sticky-view');
  [viewBar, stickyViewBar].forEach(function (container) {
    [['card', '卡片'], ['list', '列表']].forEach(function (m) {
      addFilterButton(container, m[0], m[1], m[0] === view, function () {
        view = m[0];
        updateUrlState();
        render();
      });
    });
  });

  /* 關鍵字搜尋 */
  var search = document.getElementById('roster-search');
  var stickySearch = document.getElementById('roster-sticky-search');
  bindSearchInput(search);
  bindSearchInput(stickySearch);

  /* 資料狀態篩選 */
  var statusBar = document.getElementById('roster-status');
  var stickyStatusBar = document.getElementById('roster-sticky-status');
  [statusBar, stickyStatusBar].forEach(function (container) {
    STATUS_FILTERS.forEach(function (item) {
      addFilterButton(container, item.key, item.label, item.key === currentStatus, function () {
        currentStatus = item.key;
        updateUrlState();
        render();
      });
    });
  });

  /* 聲部篩選 */
  var bar = document.getElementById('roster-filter');
  var stickyBar = document.getElementById('roster-sticky-filter');
  [bar, stickyBar].forEach(function (container) {
    PARTS.forEach(function (p) {
      addFilterButton(container, p, p, p === currentPart, function () {
        currentPart = p;
        updateUrlState();
        render();
      });
    });
  });
  if (activeFilters) {
    activeFilters.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-reset]');
      if (!button) return;
      var reset = button.dataset.reset;
      if (reset === 'query') query = '';
      if (reset === 'part') currentPart = '全部';
      if (reset === 'status') currentStatus = 'all';
      if (reset === 'mode') mode = 'head';
      if (reset === 'view') view = 'card';
      if (reset === 'all') resetAllFilters();
      updateUrlState();
      render();
    });
  }
  render();

  /* 從其他頁面帶錨點過來（如 people/{編號}.html 的「校友名錄 →」）：
     名錄卡是 render() 後才動態產生，瀏覽器原生錨點跳轉抓不到，需要手動捲動並跳過淡入動畫 */
  if (location.hash) {
    var jumpTarget = document.querySelector(location.hash);
    if (jumpTarget) {
      jumpTarget.classList.add('in');
      jumpTarget.scrollIntoView({ block: 'center' });
    }
  }
});
