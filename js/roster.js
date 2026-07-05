/* 校友名錄：雙檢視分組（依字頭／依入學年代）＋聲部篩選（資料來源 data/alumni.js）
   字頭定義：編號第二碼＝入學民國年的個位數。例：7581、8501、9502 皆為「五字頭」。 */
document.addEventListener('DOMContentLoaded', function () {
  var root = document.getElementById('roster');
  if (!root || !window.ALUMNI) return;

  var PARTS = ['全部', '幹部', '長笛', '豎笛', '薩克斯風', '小號', '法國號', '長號', '上低音號', '低音號', '打擊'];
  var DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var currentPart = '全部';
  var mode = 'head'; /* head=依字頭, decade=依入學年代 */
  var view = 'card'; /* card=卡片, list=精簡列表 */
  var query = '';

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

  function personMeta(p) {
    var parts = [];
    if (p.year != null) parts.push('民國 ' + p.year + ' 年入學');
    if (p.part) parts.push(p.part);
    return parts.join('．');
  }

  function renderCard(p) {
    var anchorId = 'p-' + (p.num || p.photo);
    var hasProfileLink = p.link && p.link.indexOf('people/') === 0;
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
    var hasProfileLink = p.link && p.link.indexOf('people/') === 0;
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
      return (currentPart === '全部' || (p.tags || []).indexOf(currentPart) >= 0) && matchesQuery(p);
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
    groups.forEach(function (g) {
      html += '<section class="section roster-group">';
      html += '<h2>' + g.info.label + ' <span class="group-sub">' + g.info.sub + '．' + g.people.length + ' 位</span></h2>';
      html += view === 'card' ? '<div class="cards roster-cards">' : '<div class="roster-list">';
      g.people.forEach(function (p) {
        html += view === 'card' ? renderCard(p) : renderRow(p);
      });
      html += '</div></section>';
    });
    root.innerHTML = html;
    root.querySelectorAll('.roster-card, .roster-row').forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--d', Math.min((i % 6) * 0.06, 0.3) + 's');
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('in'); }); });
    });
    var count = document.getElementById('roster-count');
    if (count) {
      var status = [];
      if (currentPart !== '全部') status.push('篩選「' + currentPart + '」');
      if (query) status.push('搜尋「' + query + '」');
      count.textContent = '目前收錄 ' + window.ALUMNI.length + ' 位校友' + (status.length ? '，' + status.join('、') + '共 ' + list.length + ' 位' : '') + '，持續增補中。';
    }
  }

  /* 分組方式切換 */
  var modeBar = document.getElementById('roster-mode');
  if (modeBar) {
    [['head', '依字頭'], ['decade', '依入學年代']].forEach(function (m) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter-btn' + (m[0] === mode ? ' on' : '');
      b.textContent = m[1];
      b.addEventListener('click', function () {
        mode = m[0];
        modeBar.querySelectorAll('.filter-btn').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        render();
      });
      modeBar.appendChild(b);
    });
  }

  /* 檢視模式切換 */
  var viewBar = document.getElementById('roster-view');
  if (viewBar) {
    [['card', '卡片'], ['list', '列表']].forEach(function (m) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter-btn' + (m[0] === view ? ' on' : '');
      b.textContent = m[1];
      b.addEventListener('click', function () {
        view = m[0];
        viewBar.querySelectorAll('.filter-btn').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        render();
      });
      viewBar.appendChild(b);
    });
  }

  /* 關鍵字搜尋 */
  var search = document.getElementById('roster-search');
  if (search) {
    search.addEventListener('input', function () {
      query = search.value.trim();
      render();
    });
  }

  /* 聲部篩選 */
  var bar = document.getElementById('roster-filter');
  if (bar) {
    PARTS.forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter-btn' + (p === currentPart ? ' on' : '');
      b.textContent = p;
      b.addEventListener('click', function () {
        currentPart = p;
        bar.querySelectorAll('.filter-btn').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        render();
      });
      bar.appendChild(b);
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
