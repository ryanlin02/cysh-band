/* 官網文章頁底下的「社員的討論」。
   數字由會員平台提供：https://members.cysh.band/api/public/article-social?slug=…
   只拿數字，不拿留言內容——留言是社員在「只有社員看得到」的前提下寫的。
   拿不到（這篇不是從會員平台發布的、或會員平台暫時連不上）就整塊不顯示，
   官網照樣看得到文章，不會留一個空框或錯誤訊息。 */
(function () {
  var block = document.querySelector('[data-news-social]');
  if (!block) return;
  var slug = block.getAttribute('data-slug');
  if (!slug) return;

  var API = 'https://members.cysh.band/api/public/article-social?slug=' + encodeURIComponent(slug);

  fetch(API, { credentials: 'include' })
    .then(function (response) { return response.ok ? response.json() : null; })
    .then(function (data) {
      if (!data || !data.ok) return;
      var likes = block.querySelector('[data-social-likes]');
      var comments = block.querySelector('[data-social-comments]');
      if (likes) likes.textContent = data.likes;
      if (comments) comments.textContent = data.comments;

      var cta = block.querySelector('[data-social-cta]');
      var note = block.querySelector('[data-social-note]');
      if (data.signedIn) {
        // 已經是社員：直接帶到會員平台的那一篇，留言與按讚都在那裡
        if (cta) { cta.textContent = '看留言與按讚 →'; cta.href = data.href; }
        if (note) note.textContent = '你已經登入，點上面可以看留言、留言與按讚。';
      } else {
        if (cta) { cta.href = 'https://members.cysh.band/login?next=' + encodeURIComponent(data.href.replace('https://members.cysh.band', '')); }
      }
      block.hidden = false;
    })
    .catch(function () { /* 連不上就不顯示，不影響閱讀文章 */ });
})();
