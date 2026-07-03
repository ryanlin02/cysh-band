/* 校友名錄：雙檢視分組（依字頭／依入學年代）＋聲部篩選（資料來源 data/alumni.js）
   字頭定義：編號第二碼＝入學民國年的個位數。例：7581、8501、9502 皆為「五字頭」。 */
document.addEventListener('DOMContentLoaded', function () {
  var root = document.getElementById('roster');
  if (!root || !window.ALUMNI) return;

  var PARTS = ['全部', '幹部', '長笛', '豎笛', '薩克斯風', '小號', '法國號', '長號', '上低音號', '低音號', '打擊'];
  var DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var currentPart = '全部';
  var mode = 'head'; /* head=依字頭, decade=依入學年代 */

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

  function render() {
    var list = window.ALUMNI.filter(function (p) {
      return currentPart === '全部' || (p.tags || []).indexOf(currentPart) >= 0;
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
    if (!list.length) html = '<p class="muted">此聲部目前沒有已收錄的校友，資料持續增補中。</p>';
    groups.forEach(function (g) {
      html += '<section class="section roster-group">';
      html += '<h2>' + g.info.label + ' <span class="group-sub">' + g.info.sub + '．' + g.people.length + ' 位</span></h2>';
      html += '<div class="cards roster-cards">';
      g.people.forEach(function (p) {
        html += '<div class="card roster-card">';
        html += '<div class="card-head">';
        html += '<img class="avatar" src="assets/img/members/' + (p.photo || 'blank') + '.webp" alt="' + p.name + '" loading="lazy">';
        html += '<div>';
        html += '<p class="num">' + (p.num || '—') + (p.part ? ' <small>' + (p.year != null ? '民國 ' + p.year + ' 年入學．' : '') + p.part + '</small>' : (p.year != null ? ' <small>民國 ' + p.year + ' 年入學</small>' : '')) + '</p>';
        html += '<h3>' + p.name + '</h3>';
        html += '</div></div>';
        if (p.role) html += '<p class="role">' + p.role + '</p>';
        if (p.desc) html += '<p>' + p.desc + '</p>';
        if (p.link) html += '<p class="more"><a href="' + p.link + '">人物誌詳細介紹 →</a></p>';
        html += '</div>';
      });
      html += '</div></section>';
    });
    root.innerHTML = html;
    root.querySelectorAll('.roster-card').forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--d', Math.min((i % 6) * 0.06, 0.3) + 's');
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('in'); }); });
    });
    var count = document.getElementById('roster-count');
    if (count) count.textContent = '目前收錄 ' + window.ALUMNI.length + ' 位校友' + (currentPart !== '全部' ? '，篩選「' + currentPart + '」共 ' + list.length + ' 位' : '') + '，持續增補中。';
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
});
