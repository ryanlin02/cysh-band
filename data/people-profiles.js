/* 人物個人頁資料檔
   定位：管理已模板化的 people/{編號}.html 個人頁 metadata。
   正文放在 content/people/{編號}.html；本檔放標題、SEO、頁首資料、相關連結與資料來源。

   產生正式人物頁：
   node scripts/generate-people-pages.js
*/
window.PEOPLE_PROFILES = [
  {
    num: "6301",
    name: "陳錫仁",
    source: "content/people/6301.html",
    output: "people/6301.html",
    title: "陳錫仁（6301）｜人物誌｜嘉義高中管樂隊",
    description: "讓小號響過四十年——陳錫仁（編號 6301）是小號演奏家、教育者與作者，台灣銅管五重奏團創辦人，長年回到嘉中校友團擔任指揮與獨奏。",
    ogTitle: "陳錫仁（6301）｜讓小號響過四十年的演奏、教育與傳承",
    ogDescription: "小號演奏家、中臺科技大學教師、台灣銅管五重奏團創辦人，編號 6301 從嘉中走向專業舞台，也持續回到嘉中。",
    headlineHtml: "陳錫仁：讓小號<br>響過四十年",
    photo: "../assets/img/members/6301.webp",
    facts: [
      ["編號", "<b>6301</b>（民國 63 年入學．小號聲部、當屆社長）"],
      ["主修", "小號"],
      ["學歷", "美國聖保羅大學音樂學院小號演奏碩士"],
      ["樂團角色", "校友聯演指揮、小號獨奏"]
    ],
    peopleLink: "../people.html#p-6301",
    rosterLink: "../roster.html#p-6301",
    relatedLinks: [
      { label: "嘉義市管樂團〈藝術總監曾膺安〉", url: "https://cywo1994.com/%E8%97%9D%E8%A1%93%E7%B8%BD%E7%9B%A3-%E6%9B%BE%E8%86%BA%E5%AE%89/", type: "關聯人物資料" }
    ],
    sourceHtml: "本文整理自以下公開資料：臺中國家歌劇院演奏家資料、嘉義市政府第 29 屆聯合音樂會新聞、NOWnews 第 35 屆《正八音》報導、逢甲大學通識教育中心演出介紹、<a href=\"https://cywo1994.com/%E8%97%9D%E8%A1%93%E7%B8%BD%E7%9B%A3-%E6%9B%BE%E8%86%BA%E5%AE%89/\" target=\"_blank\" rel=\"noopener\">嘉義市管樂團〈藝術總監曾膺安〉</a>，以及小號著作出版資料。部分早期年份如有出入以正式紀錄為準；如需補充或更正，歡迎透過粉絲專頁與我們聯繫。"
  },
  {
    num: "6401",
    name: "馮朝君",
    source: "content/people/6401.html",
    output: "people/6401.html",
    title: "馮朝君（6401）｜人物誌｜嘉義高中管樂隊",
    description: "從嘉中管樂隊到嘉義城市管樂的組織者——馮朝君（編號 6401）的管樂人生：返校指導、嘉義市管樂節、嘉義市管樂團與校友團傳承。",
    ogTitle: "馮朝君（6401）｜從嘉中管樂隊到嘉義城市管樂的組織者",
    ogDescription: "返校指導、嘉義市管樂節、嘉義市管樂團、校友團立案與傳承——編號 6401 的嘉義管樂人生。",
    headlineHtml: "馮朝君：從嘉中管樂隊<br>到嘉義城市管樂的組織者",
    photo: "../assets/img/members/6401.webp",
    facts: [
      ["編號", "<b>6401</b>（民國 64 年入學．名冊登錄為打擊聲部、當屆社長）"],
      ["嘉中角色", "嘉中管樂隊校友、曾返校指導管樂隊"],
      ["校友團角色", "曾任嘉義高中校友管樂團團長，協助校友團制度化與立案"],
      ["地方角色", "嘉義市管樂節早期籌辦者、嘉義市管樂團創團執行祕書與行政總監"]
    ],
    peopleLink: "../people.html#p-6401",
    rosterLink: "../roster.html#p-6401",
    relatedLinks: [],
    sourceHtml: "本文整理自以下公開資料與校友社群紀錄：<a href=\"https://www.peopo.org/news/45150\" target=\"_blank\" rel=\"noopener\">PeoPo 公民新聞〈馮朝君熱愛管樂 管樂節幕後推手〉</a>、<a href=\"https://www.chiayi.gov.tw/News_Content.aspx?n=455&amp;s=351712\" target=\"_blank\" rel=\"noopener\">嘉義市政府《管不住的樂音》紀錄片介紹</a>、<a href=\"https://cywo1994.com/%E6%A8%82%E5%9C%98%E6%B2%BF%E9%9D%A9/\" target=\"_blank\" rel=\"noopener\">嘉義市管樂團〈樂團沿革〉</a>、<a href=\"https://www.ptt.cc/bbs/CYHSBAND/M.1220528613.A.26A.html\" target=\"_blank\" rel=\"noopener\">嘉中管樂隊校友社群 2008 年立案紀錄</a>、<a href=\"https://www.ptt.cc/bbs/CYHSBAND/M.1247496670.A.13A.html\" target=\"_blank\" rel=\"noopener\">嘉中管樂隊校友社群 2009 年團長紀錄</a>、<a href=\"https://www.ptt.cc/bbs/CYHSBAND/M.1405925977.A.169.html\" target=\"_blank\" rel=\"noopener\">校友回憶資料</a>、<a href=\"https://www.nownews.com/news/3604655\" target=\"_blank\" rel=\"noopener\">NOWnews 2019 年校友團演出報導</a>。校友回憶與早期資料如有出入，以正式節目冊、團方名冊或本人補充為準；如需補充或更正，歡迎透過粉絲專頁與我們聯繫。"
  },
  {
    num: "6951",
    name: "曾膺安",
    source: "content/people/6951.html",
    output: "people/6951.html",
    title: "曾膺安（6951）｜人物誌｜嘉義高中管樂隊",
    description: "從嘉中小號手到嘉義市管樂團藝術總監——曾膺安（編號 6951）自 1994 年創團掌舵逾三十年，帶領一座城市走過管樂歲月。",
    ogTitle: "曾膺安（6951）｜從嘉中小號手到嘉義市管樂團藝術總監",
    ogDescription: "自 1994 年嘉義市管樂團創團即擔任藝術總監迄今逾三十年，編號 6951 的管樂人生。",
    headlineHtml: "曾膺安：從嘉中小號手<br>到陪伴一座城市三十年的管樂總監",
    photo: "../assets/img/members/6951.webp",
    facts: [
      ["編號", "<b>6951</b>（民國 69 年入學．小號聲部）"],
      ["出身", "嘉義縣梅山"],
      ["現職", "嘉義市管樂團藝術總監暨常任指揮"],
      ["樂團角色", "嘉中校友暨在校生聯合音樂會指揮"]
    ],
    peopleLink: "../people.html#p-6951",
    rosterLink: "../roster.html#p-6951",
    relatedLinks: [],
    sourceHtml: "本文整理自以下公開資料：<a href=\"https://cywo1994.com/%E8%97%9D%E8%A1%93%E7%B8%BD%E7%9B%A3-%E6%9B%BE%E8%86%BA%E5%AE%89/\" target=\"_blank\" rel=\"noopener\">嘉義市管樂團官方網站〈藝術總監曾膺安〉</a>、嘉義市政府與國家表演藝術中心（衛武營、OPENTIX）演出資料、<a href=\"https://artistic.finearts.ntnu.edu.tw/school/detail/366\" target=\"_blank\" rel=\"noopener\">教育部藝術教育推動資源中心〈北興國中音樂班〉</a>，以及嘉義高中校友管樂團公開演出紀錄。歷史資料以當年紀錄為準；如需補充或更正，歡迎透過粉絲專頁與我們聯繫。"
  },
  {
    num: "7111",
    name: "盧宓承",
    source: "content/people/7111.html",
    output: "people/7111.html",
    title: "盧宓承（7111）｜人物誌｜嘉義高中管樂隊",
    description: "資訊管理博士，也是嘉義高中校友管樂團團長——盧宓承（編號 7111）跨越資訊科技與管樂教育，長年守護校友聯演的傳承。",
    ogTitle: "盧宓承（7111）｜跨越資訊科技與管樂教育的校友團團長",
    ogDescription: "中正大學資訊管理博士、大學教師，也是嘉義高中校友管樂團團長與長期指揮，編號 7111 的跨領域人生。",
    headlineHtml: "盧宓承：在資訊科技與管樂之間<br>守護校友團的傳承",
    photo: "../assets/img/members/7111.webp",
    facts: [
      ["編號", "<b>7111</b>（民國 71 年入學．長笛聲部）"],
      ["綽號", "咪咪學長"],
      ["學歷", "國立中正大學資訊管理博士"],
      ["現職", "嘉義高中校友管樂團團長；雲林縣立蔦松藝術高中教師"],
      ["樂團角色", "校友聯演核心指揮之一"]
    ],
    peopleLink: "../people.html#p-7111",
    rosterLink: "../roster.html#p-7111",
    relatedLinks: [],
    sourceHtml: "本文整理自以下公開資料：國家圖書館臺灣博碩士論文知識加值系統、嘉義高中校友暨在校生聯合音樂會歷年公開報導（含中央社、自由時報、聯合報）、嘉義縣嘉新國中與大埔國中小公開資訊，以及嘉義高中校友管樂團團務資料。個人現職與任教單位以校友團登錄資料為準；歷史資料以當年紀錄為準，如需補充或更正，歡迎透過粉絲專頁與我們聯繫。"
  },
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
    num: "8301",
    name: "高崇文",
    source: "content/people/8301.html",
    output: "people/8301.html",
    title: "高崇文（8301）｜人物誌｜嘉義高中管樂隊",
    description: "阿里山鄒族出身，從嘉中管樂隊找到長號——高崇文（編號 8301）曾任高雄市交響樂團長號專任團員，是長號演奏家、音樂班教師與指揮。",
    ogTitle: "高崇文（8301）｜從嘉中管樂隊走向專業舞台的長號演奏家",
    ogDescription: "阿里山鄒族出身，曾任高雄市交響樂團長號專任團員，編號 8301 在演奏、教育與指揮之間持續前行。",
    headlineHtml: "高崇文：從一支長號<br>找到人生方向",
    photo: "../assets/img/members/8301.webp",
    facts: [
      ["編號", "<b>8301</b>（民國 83 年入學．長號聲部、當屆社長）"],
      ["出身", "嘉義阿里山鄒族"],
      ["學歷", "國立臺北藝術大學音樂碩士"],
      ["現職", "長號演奏家、音樂班教師；台灣獨奏家交響樂團、高雄市管樂團、台南市交響樂團長號演奏員"]
    ],
    peopleLink: "../people.html#p-8301",
    rosterLink: "../roster.html#p-8301",
    relatedLinks: [
      { label: "台灣獨奏家交響樂團〈高崇文〉", url: "https://www.taiwansoloists.org/member/ins.php?index_id=84", type: "公開人物資料" },
      { label: "高雄市管樂團團員名單", url: "https://kcwo2012.com/members", type: "公開團員資料" }
    ],
    sourceHtml: "本文整理自以下公開資料：<a href=\"https://www.taiwansoloists.org/member/ins.php?index_id=84\" target=\"_blank\" rel=\"noopener\">台灣獨奏家交響樂團〈高崇文〉</a>、<a href=\"https://kcwo2012.com/members\" target=\"_blank\" rel=\"noopener\">高雄市管樂團團員名單</a>、OPENTIX 兩廳院文化生活演出簡介、臺中國家歌劇院演奏家資料、嘉義市管樂團團史，以及本人 2009 年發表之校友回憶。歷史資料以當年紀錄為準；如需補充或更正，歡迎透過粉絲專頁與我們聯繫。"
  },
  {
    num: "8302",
    name: "鄧杰翔",
    source: "content/people/8302.html",
    output: "people/8302.html",
    title: "鄧杰翔（8302）｜人物誌｜嘉義高中管樂隊",
    description: "從嘉中打擊聲部到嘉義市管樂團行政總監——鄧杰翔（編號 8302）橫跨打擊演奏、軍樂指揮、樂團行政與偏鄉管樂教育的管樂人生。",
    ogTitle: "鄧杰翔（8302）｜從嘉中打擊手到城市管樂行政總監",
    ogDescription: "橫跨打擊演奏、軍樂指揮、樂團行政與偏鄉教育，編號 8302 的管樂人生。",
    headlineHtml: "鄧杰翔：從嘉中打擊聲部<br>到城市管樂行政總監",
    photo: "../assets/img/members/8302.webp",
    facts: [
      ["編號", "<b>8302</b>（民國 83 年入學．打擊聲部、當屆副社長）"],
      ["主修", "打擊樂．爵士鼓"],
      ["學歷", "國立中正大學物理學系；國立高雄應用科技大學資訊管理相關碩士"],
      ["現職", "嘉義市管樂團行政總監．嘉義縣大埔國中小管樂團指揮"]
    ],
    peopleLink: "../people.html#p-8302",
    rosterLink: "../roster.html#p-8302",
    relatedLinks: [],
    sourceHtml: "本文整理自嘉義市管樂團官方網站人物介紹、中央社相關報導，以及嘉中校友社群保存之歷年聯合音樂會演出名單；部分經歷（如入學與畢業確切年份、幹部任期細節）尚待本人進一步確認與補充。歷史資料以當年紀錄為準；如需更正或補充，歡迎透過粉絲專頁與我們聯繫。"
  },
  {
    num: "8431",
    name: "鄭鈞元",
    source: "content/people/8431.html",
    output: "people/8431.html",
    title: "鄭鈞元（8431）｜人物誌｜嘉義高中管樂隊",
    description: "從嘉中管樂社走向法國——鄭鈞元（編號 8431）取得馬爾梅松音樂院演奏文憑，返臺後任教南華大學、擔任嘉義市管樂團薩克斯風首席。",
    ogTitle: "鄭鈞元（8431）｜把世界的聲音帶回嘉義的薩克斯風演奏家",
    ogDescription: "馬爾梅松音樂院演奏文憑，南華大學講師、嘉義市管樂團薩克斯風首席，編號 8431 的演奏與傳承之路。",
    headlineHtml: "鄭鈞元：把世界的聲音<br>帶回嘉義的薩克斯風",
    photo: "../assets/img/members/8431.webp",
    facts: [
      ["編號", "<b>8431</b>（民國 84 年入學．薩克斯風聲部）"],
      ["出身", "嘉義市"],
      ["學歷", "法國國立馬爾梅松音樂院薩克斯風及室內樂高級演奏班第一獎文憑"],
      ["現職", "南華大學講師、嘉義市管樂團薩克斯風首席"]
    ],
    peopleLink: "../people.html#p-8431",
    rosterLink: "../roster.html#p-8431",
    relatedLinks: [
      { label: "嘉頌重奏團官方人物頁", url: "https://www.chiasong.com/team-2/%E9%84%AD%E9%88%9E%E5%85%83", type: "公開人物資料" }
    ],
    sourceHtml: "本文整理自以下公開資料：<a href=\"https://www.chiasong.com/team-2/%E9%84%AD%E9%88%9E%E5%85%83\" target=\"_blank\" rel=\"noopener\">嘉頌重奏團官方人物頁</a>、南華大學官方師資資料、嘉義市政府與嘉義市立博物館公開演出資料、嘉義市教育網路中心存檔資料，以及嘉義高中校友暨在校生聯合音樂會歷年公開報導。歷史資料以當年紀錄為準；如需補充或更正，歡迎透過粉絲專頁與我們聯繫。"
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
  },
  {
    num: "9101",
    name: "謝介豪",
    source: "content/people/9101.html",
    output: "people/9101.html",
    title: "謝介豪（9101）｜人物誌｜嘉義高中管樂隊",
    description: "從嘉中單簧管手到室內樂團長與劇場策畫者——謝介豪（編號 9101）的音樂之路：臺藝大、北藝大指揮組、世界管樂年會、BON 單簧管重奏團與富瑜室內樂團。",
    ogTitle: "謝介豪（9101）｜從嘉中單簧管手到室內樂團長與劇場策畫者",
    ogDescription: "臺藝大、北藝大指揮組、世界管樂年會、BON 單簧管重奏團與富瑜室內樂團——編號 9101 的單簧管之路。",
    headlineHtml: "謝介豪：從嘉中單簧管手<br>到室內樂團長與劇場策畫者",
    photo: "../assets/img/members/9101.webp",
    facts: [
      ["編號", "<b>9101</b>（民國 91 年入學．當屆社長．豎笛／單簧管聲部）"],
      ["主修", "單簧管、低音單簧管"],
      ["學歷", "國立臺灣藝術大學音樂系；國立臺北藝術大學管絃與擊樂研究所"],
      ["樂團角色", "BON 單簧管重奏團團長．富瑜室內樂團單簧管首席"]
    ],
    peopleLink: "../people.html#p-9101",
    rosterLink: "../roster.html#p-9101",
    relatedLinks: [],
    sourceHtml: "本文整理自國家圖書館臺灣博碩士論文知識加值系統、DKE笛咖兒／BON單簧管重奏團公開簡介與活動紀錄、國立臺灣藝術大學與國立臺北藝術大學公開資料，以及本人自述；嘉中入學與畢業確切年份、部分任教學校現況等細節，仍待本人進一步確認與補充。歷史資料以當年紀錄為準；如需更正或補充，歡迎透過粉絲專頁與我們聯繫。"
  }
];
