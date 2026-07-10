/* 最新消息資料檔
   發布新消息的步驟：
   1. 複製 news/_template.html 改名為 news/YYYY-MM-DD-主題.html，編輯內容
   2. 在下方陣列「最前面」加一筆（新的在前，依日期排序）
   欄位：date 日期、title 標題、summary 一句摘要、url 文章路徑
        thumb 縮圖路徑（選填；正方形顯示，沒有就不放）
*/
window.NEWS = [
  {
    date: "2026-07-10",
    title: "嘉義市 7/11 停止上班上課，請留意巴威颱風動態",
    summary: "嘉義市政府已發布巴威颱風停班停課通知，7/11（六）全面停止上班上課；請團員與家長注意安全，7/12 團練將依後續天候另行通知。",
    url: "news/2026-07-10-chiayi-city-closure.html",
    thumb: "assets/img/news/2026-07-10-chiayi-city-closure-thumb.webp"
  },
  {
    date: "2026-07-10",
    title: "因巴威颱風影響，7/11 團練取消",
    summary: "受巴威颱風影響，7/11（六）團練取消；7/12（日）是否照常團練將依天候另行通知，後續團練時間表同步公告。",
    url: "news/2026-07-10-typhoon-bavi-rehearsal.html",
    thumb: "assets/img/news/2026-07-10-typhoon-bavi-cwa-thumb.webp"
  },
  {
    date: "2026-07-04",
    title: "7/4 團練日：火雞肉飯、團練室與一壺咖啡",
    summary: "《為伍》第二個週末團練日，翁啟榮學長從簡單火雞肉飯回到嘉中團練室，也煮起咖啡和大家一起喝。",
    url: "news/2026-07-04-rehearsal-coffee.html",
    thumb: "assets/img/news/2026-07-04-rehearsal-thumb.webp"
  },
  {
    date: "2026-07-02",
    title: "第 41 屆聯合音樂會《為伍》8/8 文化局音樂廳登場",
    summary: "睽違六年重返嘉義市政府文化局音樂廳，透過 OPENTIX 公開售票，售票資訊將於近期公布。",
    url: "news/2026-07-02-weiwu-announce.html",
    thumb: "assets/img/poster_weiwu_2026_thumb.webp"
  },
  {
    date: "2026-06-30",
    title: "期末考結束，肉趴開烤！在校生迎接《為伍》的暑假",
    summary: "指導老師簡晟軒帶著在校生舉辦期末烤肉聚會，暑假密集團練即將展開。",
    url: "news/2026-06-30-summer-bbq.html",
    thumb: "assets/img/news/2026-06-30-bbq.webp"
  },
  {
    date: "2026-06-27",
    title: "《為伍》第一次團練啟動！警伯依然是第一個到的人",
    summary: "第 41 屆校友聯演第一次團練展開，翁啟榮學長一如往常第一個到場開門，團練後再回味一碗嘉中人的火雞肉飯。",
    url: "news/2026-06-27-first-rehearsal.html",
    thumb: "assets/img/news/2026-06-27-turkeyrice.webp"
  },
  {
    date: "2026-06-12",
    title: "校友歸隊召集令：《為伍》團練時程公布",
    summary: "6/27 起每週六日下午團練、8/4–7 平日晚間衝刺，8/8 文化局音樂廳登台，歡迎校友歸隊、親友探班。",
    url: "news/2026-06-12-rehearsal-schedule.html"
  }
];
