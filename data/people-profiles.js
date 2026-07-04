/* 人物個人頁資料檔
   定位：管理已模板化的 people/{編號}.html 個人頁 metadata。
   正文放在 content/people/{編號}.html；本檔放標題、SEO、頁首資料、相關連結與資料來源。

   產生正式人物頁：
   node scripts/generate-people-pages.js
*/
window.PEOPLE_PROFILES = [
  {
    num: "7581",
    name: "翁啟榮",
    source: "content/people/7581.html",
    output: "people/7581.html",
    title: "翁啟榮（7581）｜人物誌｜嘉義高中管樂隊",
    description: "從嘉中低音號手到嘉義管樂文化的長期守護者——翁啟榮（編號 7581）的管樂人生：入隊、帶隊、籌辦校友聯演、嘉義市管樂團與管樂家族。",
    ogTitle: "翁啟榮（7581）｜從嘉中低音號手到嘉義管樂文化的長期守護者",
    ogDescription: "入隊、帶隊、籌辦校友聯演、嘉義市管樂團與管樂家族——編號 7581 的管樂人生。",
    headlineHtml: "翁啟榮：從嘉中低音號手<br>到嘉義管樂文化的長期守護者",
    photo: "../assets/img/members/7581.webp",
    facts: [
      ["編號", "<b>7581</b>（民國 75 年入學．低音號聲部）"],
      ["綽號", "警伯、翁哥"],
      ["現職", "警務人員；嘉義市管樂團低音號團員"],
      ["樂團角色", "校友聯演長期統籌與召集人"]
    ],
    peopleLink: "../people.html#p-7581",
    rosterLink: "../roster.html#p-7581",
    relatedLinks: [
      { label: "嘉義市管樂團官方網站〈團員介紹〉", url: "https://cywo1994.com/member/", type: "公開團員資料" },
      { label: "中央社 2023 年報導", url: "https://www.cna.com.tw/news/ahel/202308240299.aspx", type: "新聞報導" },
      { label: "嘉義市政府《管不住的樂音》紀錄片介紹", url: "https://www.chiayi.gov.tw/News_Content.aspx?n=455&s=351712", type: "公開新聞資料" },
      { label: "亞太新聞網 2017 年第 33 屆校友演奏會報導", url: "https://www.atanews.net/?news=35122", type: "新聞報導" }
    ],
    sourceHtml: "本文整理自以下公開資料與本人自述：<a href=\"https://cywo1994.com/member/\" target=\"_blank\" rel=\"noopener\">嘉義市管樂團官方網站〈團員介紹〉</a>、<a href=\"https://www.cna.com.tw/news/ahel/202308240299.aspx\" target=\"_blank\" rel=\"noopener\">中央社 2023 年報導</a>、<a href=\"https://www.chiayi.gov.tw/News_Content.aspx?n=455&amp;s=351712\" target=\"_blank\" rel=\"noopener\">嘉義市政府《管不住的樂音》紀錄片介紹（2013）</a>、<a href=\"https://www.atanews.net/?news=35122\" target=\"_blank\" rel=\"noopener\">亞太新聞網 2017 年第 33 屆校友演奏會報導</a>，以及本人 2009 年發表之校友回憶與 2026 年校友資料登錄。歷史資料以當年紀錄為準；如需補充或更正，歡迎透過粉絲專頁與我們聯繫。"
  },
  {
    num: "8861",
    name: "簡晟軒",
    source: "content/people/8861.html",
    output: "people/8861.html",
    title: "簡晟軒（8861）｜人物誌｜嘉義高中管樂隊",
    description: "從嘉中管樂隊第一次拿起長號，到指揮東京佼成管樂團錄製臺灣作品——簡晟軒（編號 8861）在演奏、指揮與教育之間扎根嘉義。",
    ogTitle: "簡晟軒（8861）｜從嘉中出發，再把音樂帶回嘉義",
    ogDescription: "長號演奏家、嘉頌重奏團副團長、指揮，編號 8861 從嘉中管樂隊走向專業、再扎根地方的歷程。",
    headlineHtml: "簡晟軒：從嘉中出發，<br>再把音樂帶回嘉義",
    photo: "../assets/img/members/8861.webp",
    facts: [
      ["編號", "<b>8861</b>（民國 88 年入學．長號聲部）"],
      ["出身", "嘉義縣新港"],
      ["主要專業", "長號、低音長號、管樂團指揮"],
      ["現職", "嘉頌重奏團副團長、嘉頌管樂團常任指揮；高雄市管樂團團員"]
    ],
    peopleLink: "../people.html#p-8861",
    rosterLink: "../roster.html#p-8861",
    relatedLinks: [
      { label: "高雄市管樂團〈簡晟軒〉", url: "https://kcwo2012.com/zaq13J", type: "公開人物資料" },
      { label: "嘉頌重奏團官方人物頁", url: "https://www.chiasong.com/team-2/%E7%B0%A1%E6%99%9F%E8%BB%92", type: "公開人物資料" },
      { label: "衛武營國家藝術文化中心節目頁", url: "https://npac-weiwuying.org/programs/62a989418897870008243984", type: "演出節目頁" }
    ],
    sourceHtml: "本文整理自以下公開資料：<a href=\"https://kcwo2012.com/zaq13J\" target=\"_blank\" rel=\"noopener\">高雄市管樂團〈簡晟軒〉</a>、<a href=\"https://www.chiasong.com/team-2/%E7%B0%A1%E6%99%9F%E8%BB%92\" target=\"_blank\" rel=\"noopener\">嘉頌重奏團官方人物頁</a>、嘉義市管樂團官方資料、<a href=\"https://npac-weiwuying.org/programs/62a989418897870008243984\" target=\"_blank\" rel=\"noopener\">衛武營國家藝術文化中心節目頁</a>、嘉義市政府「樂脈計畫」新聞稿。歷史資料以當年紀錄為準；如需補充或更正，歡迎透過粉絲專頁與我們聯繫。"
  }
];
