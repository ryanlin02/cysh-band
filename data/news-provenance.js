/* 每一篇文章「是誰寫的、誰核准的」——由發布者自己聲明，不是程式猜的。
 *
 * 為什麼要另外一個檔：
 *   data/news.js 的會員發布區塊由 sync-member-publishing.js 整段重寫，
 *   手動改上去下次同步就沒了。這個檔是手寫的，同步不會動到它。
 *
 * 怎麼改：
 *   byArticle  單獨指定某一篇（優先權最高）。key 是文章網址代號（news/ 後面、.html 前面那一段）
 *   byAuthor   某個人的文章預設算哪一種。key 是校友編號
 *   值只有兩種：
 *     'ai_assisted' AI 小編協助整理，由人核准後發布
 *     'member'      本人自己撰寫
 *
 * 2026-09-03 由林俊余聲明：他發布的文章都是 AI 小編協助整理後由他核准的；
 * 翁啟榮〈嘉頌拉拉頌長號重奏團｜市民BAR《銀河之夜》〉是本人自己撰寫。
 */
window.NEWS_PROVENANCE = {
  byAuthor: {
    '9502': 'ai_assisted'
  },
  byArticle: {
    '2026-08-21-trombone-ensemble-galaxy-night': 'member'
  }
};
