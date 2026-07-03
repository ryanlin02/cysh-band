/* 最新消息渲染（資料來源 data/news.js）
   - #news-list：完整列表（校友聯演頁）
   - #news-home：最新 2 則（首頁） */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.NEWS) return;
  function item(n) {
    var tail = n.thumb
      ? '<img class="news-thumb" src="' + n.thumb + '" alt="" loading="lazy">'
      : '<span class="news-arrow">→</span>';
    return '<a class="news-item" href="' + n.url + '">' +
      '<span class="news-date">' + n.date + '</span>' +
      '<span class="news-body"><b>' + n.title + '</b><span class="news-summary">' + n.summary + '</span></span>' +
      tail + '</a>';
  }
  var list = document.getElementById('news-list');
  if (list) list.innerHTML = window.NEWS.map(item).join('') || '<p class="muted">目前沒有新消息。</p>';
  var home = document.getElementById('news-home');
  if (home) home.innerHTML = window.NEWS.slice(0, 2).map(item).join('');
});
