/* 最新消息渲染（資料來源 data/news.js）
   - #news-home：最新 2 則（首頁）
   - #news-list：最新 2 則（校友聯演頁），超過時顯示「查看全部」
   - #news-all：全部文章（news/index.html 總覽頁，容器需設 data-base="../"） */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.NEWS) return;
  function item(n, base) {
    base = base || '';
    var tail = n.thumb
      ? '<img class="news-thumb" src="' + base + n.thumb + '" alt="" loading="lazy">'
      : '<span class="news-arrow">→</span>';
    return '<a class="news-item" href="' + base + n.url + '">' +
      '<span class="news-date">' + n.date + '</span>' +
      '<span class="news-body"><b>' + n.title + '</b><span class="news-summary">' + n.summary + '</span></span>' +
      tail + '</a>';
  }
  var home = document.getElementById('news-home');
  if (home) home.innerHTML = window.NEWS.slice(0, 2).map(function (n) { return item(n); }).join('');

  var list = document.getElementById('news-list');
  if (list) {
    var LIMIT = 2;
    list.innerHTML = window.NEWS.slice(0, LIMIT).map(function (n) { return item(n); }).join('') || '<p class="muted">目前沒有新消息。</p>';
    if (window.NEWS.length > LIMIT) {
      list.insertAdjacentHTML('afterend',
        '<p class="news-more"><a href="news/index.html">查看全部 ' + window.NEWS.length + ' 則消息 →</a></p>');
    }
  }

  var all = document.getElementById('news-all');
  if (all) {
    var base = all.getAttribute('data-base') || '';
    all.innerHTML = window.NEWS.map(function (n) { return item(n, base); }).join('') || '<p class="muted">目前沒有消息。</p>';
  }
});
