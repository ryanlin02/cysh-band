/* 官網文章頁底下的「社員的討論」。
   數字由會員平台提供：https://members.cysh.band/api/public/article-social?slug=…
   只拿數字，不拿留言內容——留言是社員在「只有社員看得到」的前提下寫的。
   拿不到（這篇不是從會員平台發布的、或會員平台暫時連不上）就整塊不顯示，
   官網照樣看得到文章，不會留一個空框或錯誤訊息。

   2026-09-04 修：
   · 還沒有人按讚留言時不顯示「0 個讚 0 則留言」——一排零看起來像壞掉，
     也像在說「沒人理這篇」。改成只留邀請那一句。
   · 邀請的文字要說清楚「為什麼要登入」，不是只給一個箭頭。 */
(function () {
  var block = document.querySelector('[data-news-social]');
  var cta = document.querySelector('[data-social-cta]');
  var note = document.querySelector('[data-social-note]');
  if (!block) return;
  var slug = block.getAttribute('data-slug');
  if (!slug) return;

  var API = 'https://members.cysh.band/api/public/article-social?slug=' + encodeURIComponent(slug);

  fetch(API, { credentials: 'include' })
    .then(function (response) { return response.ok ? response.json() : null; })
    .then(function (data) {
      if (!data || !data.ok) return;
      var likes = Number(data.likes) || 0;
      var comments = Number(data.comments) || 0;
      var likesNode = block.querySelector('[data-social-likes]');
      var commentsNode = block.querySelector('[data-social-comments]');
      if (likesNode) likesNode.textContent = likes;
      if (commentsNode) commentsNode.textContent = comments;
      // 一個讚一則留言都沒有的時候就別顯示那一排零，只留下邀請
      block.hidden = likes === 0 && comments === 0;

      if (!cta) return;
      if (data.signedIn) {
        cta.textContent = '看留言與按讚 →';
        cta.href = data.href;
        if (note) {
          note.textContent = '你已經登入，點上面可以看留言、留言與按讚。';
          note.hidden = false;
        }
      } else {
        cta.textContent = '登入後可以留言與按讚 →';
        cta.href = 'https://members.cysh.band/login?next=' + encodeURIComponent(String(data.href || '').replace('https://members.cysh.band', ''));
        if (note) {
          note.textContent = '留言與按讚是社員專屬的，留言內容也只有社員看得到。還沒有帳號的校友可以在會員平台申請。';
          note.hidden = false;
        }
      }
      cta.hidden = false;
    })
    .catch(function () { /* 連不上就不顯示，不影響閱讀文章 */ });
})();
