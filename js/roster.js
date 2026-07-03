/* 校友名錄：字頭分組＋聲部篩選（資料來源 data/alumni.js） */
document.addEventListener('DOMContentLoaded', function () {
  var root = document.getElementById('roster');
  if (!root || !window.ALUMNI) return;

  var PARTS = ['全部', '幹部', '長笛', '豎笛', '薩克斯風', '小號', '法國號', '長號', '上低音號', '低音號', '打擊'];
  var current = '全部';

  function groupLabel(y) {
    if (y == null) return { key: 999, label: '編號待補', sub: '資料整理中，歡迎校友提供' };
    if (y < 50) return { key: 4, label: '編號制度前', sub: '民國 40 年代入學' };
    var d = Math.floor(y / 10) % 10;
    var names = { 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 0: '零' };
    var dec = y >= 100 ? 10 : Math.floor(y / 10);
    return { key: dec, label: (names[d] || d) + '字頭', sub: '民國 ' + Math.floor(y / 10) * 10 + ' 年代入學' };
  }

  function sortKey(a) { return [a.year == null ? 9999 : a.year, a.num || '9999']; }

  function render() {
    var list = window.ALUMNI.filter(function (p) {
      return current === '全部' || (p.tags || []).indexOf(current) >= 0;
    }).sort(function (a, b) {
      var ka = sortKey(a), kb = sortKey(b);
      return ka[0] - kb[0] || (ka[1] < kb[1] ? -1 : ka[1] > kb[1] ? 1 : 0);
    });

    var groups = [], map = {};
    list.forEach(function (p) {
      var g = groupLabel(p.year);
      if (!map[g.key]) { map[g.key] = { info: g, people: [] }; groups.push(map[g.key]); }
      map[g.key].people.push(p);
    });
    groups.sort(function (a, b) { return a.info.key - b.info.key; });

    var html = '';
    if (!list.length) {
      html = '<p class="muted">此聲部目前沒有已收錄的校友，資料持續增補中。</p>';
    }
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
    if (count) count.textContent = '目前收錄 ' + window.ALUMNI.length + ' 位校友' + (current !== '全部' ? '，篩選「' + current + '」共 ' + list.length + ' 位' : '') + '，持續增補中。';
  }

  /* 篩選按鈕 */
  var bar = document.getElementById('roster-filter');
  if (bar) {
    PARTS.forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter-btn' + (p === current ? ' on' : '');
      b.textContent = p;
      b.addEventListener('click', function () {
        current = p;
        bar.querySelectorAll('.filter-btn').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        render();
      });
      bar.appendChild(b);
    });
  }
  render();
});
