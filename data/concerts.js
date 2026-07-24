/* 歷屆校友聯演資料檔（試作版）
   建立時間：2026-07-04
   定位：校友聯演的結構化資料來源，供 concerts.html 對照、人物頁相關演出表、
   以及 scripts/generate-concert-pages.js 產生歷屆獨立資料頁使用。

   狀態說明：
   - confirmed：已有海報、節目冊、獨立頁或可靠資料佐證
   - partial：部分資訊可考，仍缺曲目、名單或場地等欄位
   - inferred：依屆數或上下文推算
   - pending：待考
   - planning：籌備中，正式資訊尚未全部公告
   - cancelled：已知停辦
*/
const SOURCE_SOCIAL_VIDEO_LIST = "20260704_嘉中管樂社官網_校友提供資料/04_社群匯出資料/02_Facebook私密社團匯出_原始檔/社群匯出/社群匯出__社群匯出__a4de9dcc__校友聯演歷年錄影連結列表.md";
const SOURCE_2018_PROGRAM_NOTES = "20260704_嘉中管樂社官網_校友提供資料/04_社群匯出資料/02_Facebook私密社團匯出_原始檔/社群匯出/社群匯出__社群匯出__453ca74b__2018年校友聯演曲目介紹.md";
const SOURCE_2002_PLAN = "嘉中校聯-歷年時間前 言.doc（2002 年第 18 屆活動企劃書，校友提供）";

function earlyConcertRecord({ id, nth, year, rocYear, date, endDate = "", venue, venueNote = "", sessions = [] }) {
  const multiSessionNote = sessions.length > 1 ? `本屆依列表包含 ${sessions.length} 場演出；` : "";
  return {
    id,
    nth,
    year,
    rocYear,
    title: `第 ${nth} 屆聯合音樂會`,
    subtitle: "",
    date,
    endDate,
    time: "",
    venue,
    venueNote,
    hostHead: "",
    conductors: [],
    soloists: [],
    program: [],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "",
    page: `concerts/${id}.html`,
    gallery: [],
    sessions,
    news: [],
    sources: [SOURCE_2002_PLAN],
    status: "partial",
    notes: `${multiSessionNote}日期與場地依 2002 年第 18 屆活動企劃書「歷屆校友演奏會」列表補入；指揮、曲目、正式主題與完整團員名單仍待節目冊、海報或校友資料補齊。`
  };
}

window.CONCERTS = [
  {
    id: "2026-41st",
    nth: 41,
    year: 2026,
    rocYear: 115,
    title: "為伍",
    subtitle: "Keep Company",
    date: "2026-08-08",
    time: "14:30",
    venue: "嘉義市政府文化局音樂廳",
    venueNote: "嘉義市東區忠孝路 275 號；睽違六年重返文化局音樂廳",
    hostHead: "五字頭",
    conductors: [
      { name: "簡晟軒", num: "8861", role: "樂團指導" },
      { name: "丁肇賢", num: "8501", role: "樂團指導" }
    ],
    soloists: [
      { name: "黃鈺芠", num: "1051", instrument: "小號", work: "Philip Sparke: Manhattan" }
    ],
    program: [
      { section: "上半場", title: "Flashing Winds", composer: "Jan Van der Roost", status: "confirmed" },
      { section: "上半場", title: "Ye Banks and Braes o' Bonnie Doon", composer: "Percy A. Grainger", status: "confirmed" },
      { section: "上半場", title: "The Seventh Night of July", foreignTitle: "たなばた", composer: "酒井格", status: "confirmed" },
      { section: "上半場", title: "Manhattan", composer: "Philip A. Sparke", note: "小號獨奏：黃鈺芠", status: "confirmed" },
      { section: "下半場", title: "Novena + Seagate Overture", composer: "James Swearingen", status: "confirmed" },
      { section: "下半場", title: "The Days Of Wine And Roses", composer: "Henry Mancini", arranger: "岩井直溥", status: "confirmed" },
      { section: "下半場", title: "Heal The World", composer: "Michael Jackson", arranger: "Ron Sebregts", status: "confirmed" },
      { section: "下半場", title: "Japanese Graffiti XXII City Pop Medley", arranger: "金山徹", note: "〈SPARKLE〉、〈プラスティック・ラヴ〉、〈君は天然色〉、〈フライディ・チャイナタウン〉、〈真夜中のドア〜stay with me〉", status: "confirmed" },
      { section: "下半場", title: "Symphonic Suite of Galaxy (from Video Game Super Mario Galaxy)", composer: "橫田真人、近藤浩治", arranger: "尚水堂", status: "confirmed" }
    ],
    ticket: {
      type: "ticketed",
      price: "200",
      channels: ["OPENTIX 兩廳院文化生活"],
      url: "https://www.opentix.life/event/2072601690890530816",
      note: "憑票入場，自由入座"
    },
    poster: "assets/img/poster_weiwu_2026.webp",
    page: "concerts/2026-41st.html",
    onlineProgramBook: {
      url: "concerts/2026-41st-program/",
      label: "開啟第 41 屆《為伍》線上節目冊（第一版）",
      note: "目前為第一版，內容仍在持續校對中。"
    },
    gallery: ["gallery/2026-weiwu.html"],
    news: [
      "news/2026-07-23-sausage-grill-gathering.html",
      "news/2026-06-12-rehearsal-schedule.html",
      "news/2026-06-27-first-rehearsal.html",
      "news/2026-06-30-summer-bbq.html",
      "news/2026-07-02-weiwu-announce.html",
      "news/2026-07-04-rehearsal-coffee.html",
      "news/2026-07-18-weiwu-opentix-ticketing.html",
      "news/2026-07-18-rehearsal-sound-coming-together.html",
      "news/2026-07-19-rehearsal-stage-in-sight.html"
    ],
    sources: ["concerts.html", "data/news.js", "news/2026-07-02-weiwu-announce.html", "OPENTIX 售票頁（2026-07-18）"],
    status: "confirmed",
    intro: [
      "嘉義高中校友管樂團由各屆校友組成，秉持傳承、創新與熱情的理念，透過跨世代的音樂連結持續在舞台上相聚。",
      "本次節目以《Manhattan》小號協奏曲為重頭戲，由校友黃鈺芠獨奏；另橫跨經典管樂、電玩遊戲改編、電影音樂、City Pop 與流行改編，展現管樂團多元的聲音面貌。"
    ],
    programNote: "演出曲目依 OPENTIX 正式售票頁整理；主辦單位保留演出曲目異動之權利。",
    notes: "OPENTIX 購票連結已於 2026-07-18 上架；票價 200 元，憑票入場、自由入座。"
  },
  {
    id: "2025-40th",
    nth: 40,
    year: 2025,
    rocYear: 114,
    title: "四方之音",
    subtitle: "",
    date: "2025-08-16",
    time: "14:00",
    venue: "嘉義高中樹人堂",
    venueNote: "",
    hostHead: "四字頭",
    organizers: [{ name: "陳乃慎", role: "總召" }],
    conductors: [
      { name: "盧宓承", num: "7111", role: "指揮" },
      { name: "簡晟軒", num: "8861", role: "指揮" },
      { name: "陳乃慎", role: "指揮" }
    ],
    soloists: [],
    intro: [
      "第 40 屆《四方之音》於 2025 年 8 月 16 日 14:00 在嘉義高中樹人堂演出，13:30 開放觀眾進場。",
      "本屆由四字頭校友承接籌辦，104 年入學的陳乃慎擔任總召，並與盧宓承、簡晟軒共同擔任指揮。宣傳貼文指出，校友聯演自 1985 年開始，除 2021 年因防疫政策暫停外，至本屆邁入第 40 屆。",
      "曲目橫跨管樂原創、古典改編、爵士與流行曲風；正式曲目先依《四方之音》宣傳貼文與現場曲目表照片共同確認。參考錄音資料夾中另列部分曲目，是否為正式曲目、備用曲或安可仍待錄影或節目冊交叉確認。"
    ],
    program: [
      { section: "上半場", title: "杭汀頓慶典", foreignTitle: "A Huntingdon Celebration", status: "confirmed" },
      { section: "上半場", title: "羅馬慶典", foreignTitle: "Feste Romane", composer: "Ottorino Respighi", arranger: "Ton van Grevenbroek", note: "宣傳貼文標註 I. 節選 + IV. 全", status: "confirmed" },
      { section: "上半場", title: "王者之道", foreignTitle: "El Camino Real", composer: "Alfred Reed", status: "confirmed" },
      { section: "下半場", title: "快速音樂會", foreignTitle: "Instant Concert", composer: "Harold L. Walters", status: "confirmed" },
      { section: "下半場", title: "演歌集錦 第二輯", foreignTitle: "演歌メドレー Vol.2", note: "宣傳貼文標註曲目含〈津輕海峽冬景色〉〈与作〉〈浪花節人生〉", status: "confirmed" },
      { section: "下半場", title: "北門車站", foreignTitle: "Beimen Station", status: "confirmed" },
      { section: "下半場", title: "日本風情畫 14", foreignTitle: "Japanese Graffiti XIV", note: "宣傳貼文標註 ARASHI", status: "confirmed" },
      { section: "下半場", title: "Sing Sing Sing", status: "confirmed" }
    ],
    programNote: "曲目與順序以《四方之音》宣傳貼文及現場曲目表照片共同確認；參考錄音截圖另列〈安平追想曲〉、Chiikawa 與 Yesterday，是否正式演出或安可待節目冊、錄影或校友補充確認。",
    ticket: { type: "unknown", price: "", channels: [], note: "宣傳貼文記載 13:30 開放觀眾進場；票務方式待正式節目冊或公告補充" },
    poster: "assets/img/concerts/2025.webp",
    page: "concerts/2025-40th.html",
    gallery: [],
    photos: [
      { src: "assets/img/gallery/2025/0816-01t.webp", full: "assets/img/gallery/2025/0816-01.webp", caption: "現場曲目表與樹人堂演出現場，保留第 40 屆《四方之音》的曲序線索" },
      { src: "assets/img/gallery/2025/0816-02t.webp", full: "assets/img/gallery/2025/0816-02.webp", caption: "第 40 屆《四方之音》全團合影，團員以「40」標示本屆里程碑" },
      { src: "assets/img/gallery/2025/0816-03t.webp", full: "assets/img/gallery/2025/0816-03.webp", caption: "嘉義高中樹人堂正式演出，全團於校友指揮帶領下登台" }
    ],
    news: [],
    sources: [
      "concerts.html",
      "校友提供：《四方之音貼文-01.md》",
      "校友提供：第 40 屆演出照片與現場曲目表照片",
      "使用者提供：2025 嘉中校友管樂團參考錄音截圖",
      "校友提供：第 40 屆內部收支表（僅作公開範圍判斷，未公開明細）"
    ],
    sourceNote: "本頁日期、時間、開放入場時間、場地、指揮、總召、曲目與宣傳文字，主要依《四方之音貼文-01.md》整理；現場曲目表照片作曲序交叉驗證，參考錄音截圖保留為曲目待確認線索。收支表含捐款、匯款、購買、餐費與車牌等內部行政資料，本次僅用於判斷不宜公開個人金額與明細，未列入公開致謝名單。",
    status: "partial",
    notes: "總召陳乃慎；第 40 屆由盧宓承、簡晟軒與陳乃慎共同擔任指揮，曲目與三張演出照片已依校友提供貼文、照片與參考錄音線索補入。完整團員名單、正式節目冊與是否含安可曲仍待補。"
  },
  {
    id: "2024-39th",
    nth: 39,
    year: 2024,
    rocYear: 113,
    title: "三生有幸",
    subtitle: "嘉中百年慶典音樂會",
    date: "2024-04-20",
    time: "",
    venue: "嘉義高中校園中庭雨豆樹下",
    venueNote: "嘉義高中建校百年慶典",
    hostHead: "三字頭",
    conductors: [
      { name: "曾膺安", num: "6951", role: "指揮" },
      { name: "盧宓承", num: "7111", role: "指揮" },
      { name: "簡晟軒", num: "8861", role: "指揮" }
    ],
    soloists: [{ name: "鄭鈞元", num: "8431", instrument: "薩克斯風", work: "" }],
    program: [
      { title: "旭陵慶典", composer: "葉哲良", status: "confirmed" },
      { title: "A Brussels Requiem", status: "confirmed" },
      { title: "Carnival of Roses Overture", status: "confirmed" },
      { title: "Latin Sun", status: "confirmed" },
      { title: "Sing Sing Sing", status: "confirmed" },
      { title: "Yesterday", status: "confirmed" }
    ],
    ticket: { type: "ceremony", price: "", channels: [], note: "百年校慶活動" },
    poster: "assets/img/concerts/2024.webp",
    page: "concerts/2024-39th.html",
    gallery: [],
    videos: [
      { label: "第 39 屆《三生有幸》錄影清單（鄧杰翔學長錄影）", url: "https://youtube.com/playlist?list=PLc3LYZ21H4qmp7OAM5EYVdJc6TjsHSeEj&si=6-GILdAd7G5n2P0r", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", SOURCE_SOCIAL_VIDEO_LIST],
    status: "partial",
    notes: "前副總統蕭萬長等貴賓與 180 餘位嘉中人共襄盛舉。"
  },
  {
    id: "2023-38th",
    nth: 38,
    year: 2023,
    rocYear: 112,
    title: "一樹起響",
    subtitle: "Saeculum illuminate",
    date: "2023-08-27",
    time: "14:30",
    venue: "嘉義高中樹人堂",
    venueNote: "嘉中百年校慶前哨",
    hostHead: "一字頭",
    organizers: [
      { name: "蔡淳任", num: "9202", role: "總召" },
      { name: "翁啟榮", num: "7581", role: "籌備統籌" }
    ],
    conductors: [
      { name: "盧宓承", num: "7111", role: "指揮", concertRole: "指揮", concertBio: "盧宓承為嘉義高中校友管樂團團長及指揮，曾於南應大藝術學院音樂研究所修習管弦樂指揮，並長期擔任民雄國中音樂班管樂團指揮。過往也曾任嘉義市音樂協進會理事長、嘉義市青少年聯合管樂團常任指揮，以及多所學校管樂團指導老師；其所指導團隊多次於音樂比賽獲得優等與特優成績。" },
      { name: "丁肇賢", num: "8501", role: "指揮", concertRole: "指揮", concertBio: "丁肇賢畢業於國立臺灣師範大學音樂系研究所指揮組，曾受美國辛辛那提音樂學院 Rodney Winther 教授指導。除指導中正大學、淡江大學、金山高中、大有國中等各級學校管樂團外，也曾帶領臺北音樂家管弦樂團與享響樂集進行展演與公益演出，並與伊甸基金會合作，長期在附屬療養院演出，實踐音樂與社會關懷的連結。" },
      { name: "簡晟軒", num: "8861", role: "指揮", concertRole: "指揮", concertBio: "簡晟軒為嘉義縣新港人，1999 年就讀嘉義高中時開始學習長號，後就讀高雄師範大學音樂系，並曾於國防部示範樂隊服役。2009 年赴德國萊比錫音樂院深造，2010 年考取亞洲青年管弦樂團團員，2012 年取得長號演奏家文憑；回國後投入樂團演出與管樂教學，2019 年取得國立高雄師範大學音樂系研究所指揮組碩士文憑，當時任嘉義市管樂團、嘉頌重奏團及高雄市管樂團團員，並擔任多所學校管樂團與分部教師。" }
    ],
    soloists: [],
    performers: [
      { name: "劉炫廷", num: "9921", role: "雙簧管聲部" },
      { name: "謝介豪", num: "9101", role: "豎笛聲部" },
      { name: "葉哲良", num: "9721", role: "豎笛聲部／《旭陵慶典》作曲" },
      { name: "鄭鈞元", num: "8431", role: "薩克管聲部" },
      { name: "許哲誠", num: "0431", role: "薩克管聲部" },
      { name: "黃鈺芠", num: "1051", role: "小號聲部" },
      { name: "魏仕杰", num: "8841", role: "法國號聲部" },
      { name: "高健雄", num: "7901", role: "長號聲部" },
      { name: "方崇任", num: "9261", role: "長號聲部" },
      { name: "蔡政岳", num: "9701", role: "長號聲部" },
      { name: "張永澤", num: "9601", role: "長號聲部" },
      { name: "莊宗儒", num: "0271", role: "上低音號聲部" },
      { name: "陳英杰", num: "8991", role: "打擊聲部" },
      { name: "王聖安", num: "9161", role: "鋼琴" }
    ],
    summary: "《一樹起響》呼應嘉中校園老樹與樹人堂意象，也為隔年的百年校慶揭開序幕。第 38 屆由蔡淳任擔任總召、翁啟榮籌備統籌，盧宓承、丁肇賢、簡晟軒共同擔任指揮；曲目從《創世紀》出發，串連臺灣主題、古典戲劇配樂、慶典性作品、動畫與電影音樂，下半場首演葉哲良為嘉義高中百年校慶創作的《旭陵慶典》。",
    intro: [
      "第 38 屆《一樹起響》於 2023 年 8 月 27 日 14:30 在嘉義高中樹人堂演出。這一年距離嘉義高中百年校慶只剩一步，音樂不只是生活樂趣，也讓演出者、聆賞者與作曲者在同一個現場互相溝通；管樂合奏經過百年發展，從遊行與典禮角色中走向更精緻、多元而能感動人的音樂型態。",
      "嘉義高中管樂隊自 1931 年成立以來，培育了許多音樂人才。1976 年起在全國音樂比賽高中職組管樂比賽取得優等後，嘉中管樂隊持續累積佳績；2001 年代表臺灣參加日本濱松國際管樂節，2002 年在臺灣管樂協會盃大賽再獲優異成績。這些成果既是團員努力練習的結果，也回應了嘉義市各界長年對嘉中管樂的支持。",
      "作為年度聯演，第 38 屆延續自 1985 年開始的校友暨在校生聯合音樂會傳統。除了 2021 年受疫情影響停辦外，校友聯演已連續舉辦至第 38 屆；它不只聯繫校友與在校生，也成為嘉義表演藝術活動中具有嘉中特色的一道風景。",
      "本屆主題《一樹起響》與視覺意象，呼應嘉義高中「百年樹人」與樹人堂，也呼應一字頭主辦。「一」是主辦字頭，「起」可以理解為音樂生命的起點，也與「一」合成「一起」；「響」則把記憶、校園與音樂重新帶回舞台。英文副標 Saeculum illuminate 取「啟蒙的一百年」之意，讓這場聯演成為迎接百年校慶的前奏。",
      "節目安排從《創世紀》出發，以管樂學習者熟悉的合奏曲象徵下一個世紀的開端；接著經由臺灣主題、古典戲劇配樂、慶典性作品、動畫與電影音樂，展現校友聯演能容納的曲風幅度。下半場首演葉哲良為嘉中百年校慶創作的《旭陵慶典》，以校歌旋律為素材，將嘉中人的校園記憶與百年精神放入新的管樂作品。"
    ],
    program: [
      { section: "上半場", title: "創世紀", foreignTitle: "Centuria", composer: "James Swearingen", description: "James Swearingen 為美國當代作曲家、編曲家與指揮家，創作生涯超過 450 部作品，許多作品為不同年級與編制的學校管樂團而寫。《創世紀》是為紀念 C. L. Barnhouse 出版社創立 100 周年而創作，也是在臺灣管樂界許多學生初學合奏時熟悉的曲目；本屆以此曲開場，既呼應校友共同的學習記憶，也象徵嘉中邁向下一個世紀。", status: "confirmed" },
      { section: "上半場", title: "交響詩「臺灣」，湖－生命的起源", foreignTitle: "A Symphony Poem \"Taiwan\" - Dalubaling The Symbol of Originality", composer: "Toshio Mashima", description: "此曲由日本作曲家真島俊夫於 2011 年受臺北室內合奏團委託，為當年的臺灣國際音樂節創作。作曲家以臺灣原住民古調為素材，並將旋律轉化為兼具真島俊夫個人風格與臺灣色彩的作品；其中取材自魯凱族古謠「鬼湖之戀」，以充滿活力的段落、抒情而悠長的旋律與回歸性的主題，描繪臺灣山海、族群故事與臺日之間的深厚情誼。", status: "confirmed" },
      { section: "上半場", title: "艾格蒙序曲", foreignTitle: "Egmont Overture", composer: "Ludwig van Beethoven", arranger: "Frank Winterbottom", description: "貝多芬《艾格蒙序曲》創作於 1809 至 1810 年間，靈感來自歌德同名戲劇，描寫荷蘭獨立運動領袖艾格蒙伯爵反抗壓迫、最後殉難的故事。作品以沉重的 f 小調和弦開場，經過薩拉邦德式的段落、激烈而悲劇性的發展，以及木管如葬禮祈禱般的歌唱，最後在勝利音樂中宣告自由精神的勝利；本屆演出採 Frank Winterbottom 於 1924 年出版的管樂改編版本。", status: "confirmed" },
      { section: "上半場", title: "歡慶", foreignTitle: "Celebrate", composer: "Daisuke Shimizu", description: "《歡慶》由日本作曲家清水大輔於 2002 年創作，受日本上野之森銅管五重奏低音號手杉山純的自由演奏會企劃委託並首演。作品如其名，以快、慢、快的形式建立慶祝場景，音樂熱鬧、明亮而有活力，呈現自由演奏會不受年齡、樂器與程度限制的開放精神。", status: "confirmed" },
      { section: "下半場", title: "《機械巨神》動畫選粹", foreignTitle: "GR Selection", composer: "Masamichi Amano", description: "「GR」為 Giant Robot 的簡稱，源自橫山光輝 1967 年的科幻漫畫，臺灣譯作《機械巨神》或《鋼鐵巨神》。1992 年今川泰宏導演以《機械巨神－地球靜止之日》為題製作動畫電影，並由天野正道以全交響樂編制譜寫配樂；本屆演出的是作曲家自動畫配樂中選取主題、重新編寫給管樂團的版本。音樂從小聲樂段與三連音陰謀動機出發，經過多聲部對唱、衝突段落與凄美樂段，最後以溫暖旋律與勝利終點收束。", status: "confirmed" },
      { section: "下半場", title: "永遠的木匠兄妹", foreignTitle: "Carpenters Forever", arranger: "Toshio Mashima", description: "木匠兄妹由妹妹 Karen 與哥哥 Richard 組成，是 1970 至 1980 年代初期風靡一時的演唱組合。本曲由真島俊夫編曲，串連〈Sing〉、〈We've Only Just Begun〉、〈Top of the World〉、〈Close to You〉、〈Superstar〉與〈For All We Know〉等耳熟能詳的歌曲；編曲者依照樂器音色設計段落，例如以小號獨奏呈現抒情氣息、以長號唱出深沉情感，最後再將主題重新揉合，展現管樂編曲的功力與巧思。", status: "confirmed" },
      { section: "下半場", title: "《鈴芽之旅》電影音樂選粹", foreignTitle: "Suzume no Tojimari Collection", arranger: "Miyagawa Seiji", description: "《鈴芽之旅》為新海誠編劇並執導的日本動畫電影，於 2022 年在日本上映，並與《你的名字》、《天氣之子》並稱新海誠的「災難三部曲」。宮川成治將電影中與主角相關的主題歌改編為管樂曲，包含標誌性的主題、主角阿姨的主題、鈴芽的眼淚，以及片尾曲〈遙遠的彼方〉等素材，讓電影中的冒險旅程以管樂團聲響重新呈現。", status: "confirmed" },
      { section: "下半場", title: "旭陵慶典", composer: "葉哲良", note: "嘉義高中百年紀念作品，首演", description: "為迎接嘉義高中百年校慶，嘉中管樂隊特邀校友葉哲良以校歌旋律為素材創作《旭陵慶典》。作品由小號號角揭開序幕，木管製造明亮華麗的聲響，低音銅管以厚重三連音呈現嘉中人質實剛健的性格；經過拍號與轉調的變換後，樂曲進入沉穩鐘聲般的中段，將校歌旋律巧妙藏在不同聲部之間，最後以輕快三拍子象徵嘉義高中勇往前進，迎接下一個百年。", status: "confirmed" }
    ],
    programNote: "曲目、曲序與樂曲介紹以 2023 年正式節目冊為主；《旭陵慶典》另參考校友提供之單頁介紹簡報補充創作說明。",
    ticket: { type: "free-ticket", price: "0", channels: [], note: "免費索票入場；公開索票方式待節目冊外公告補充" },
    poster: "assets/img/concerts/2023.webp",
    page: "concerts/2023-38th.html",
    gallery: [],
    performerGroups: [
      { role: "雙簧管", people: ["劉炫廷"] },
      { role: "長笛", people: ["林信任", "盧宓承", "何權烈", "許景斌", "張容慈", "蔡緯宸", "湯喻絜", "王有涵"] },
      { role: "豎笛", people: ["李吉峰", "莊富益", "賴俊甫", "謝介豪", "吳瑩娟", "尹威群", "李亞璿", "葉哲良", "王顯銘"] },
      { role: "低音豎笛", people: ["林奕安"] },
      { role: "薩克管", people: ["鄭鈞元", "陳韋希", "許峻榮", "許哲誠", "邱瀚賢", "周知鈺", "呂裕翔", "陳思翰"] },
      { role: "小號", people: ["陳昌遠", "蔡淳任", "范宇安", "范尚華", "黃鈺芠", "郭鈴", "李威德"] },
      { role: "法國號", people: ["魏仕杰", "林庭凱"] },
      { role: "長號", people: ["高健雄", "范庭福", "曾裕圓", "簡晟軒", "方崇任", "蔡政岳", "張永澤", "董書菡", "林佑瑄", "吳侑珉"] },
      { role: "上低音號", people: ["游宗仁", "蔡智明", "莊宗儒", "李帛容", "郭宥均", "侯鈞瀚"] },
      { role: "低音號", people: ["翁啟榮", "丁肇賢", "葉韋廷", "葉思佑", "侯翔升", "徐麒舜"] },
      { role: "打擊", people: ["陳英杰", "許有恩", "許翔禹", "溫旻翔", "賴楚元", "李運昶", "蔡程弘", "張尚融"] },
      { role: "鋼琴", people: ["王聖安"] }
    ],
    performerNote: "演出人員依 2023 年正式節目冊第 7 頁整理；姓名與編號由網站公開名錄自動交叉比對，無法唯一確認者僅顯示節目冊姓名。",
    adminRows: [
      { role: "總召", people: ["9202 蔡淳任"], duty: "依魏仕杰演出宣傳貼文記載" },
      { role: "籌備統籌", people: ["7581 翁啟榮"], duty: "依網站既有資料與校友補充脈絡保留" }
    ],
    programBook: [
      { src: "assets/img/concerts/2023-program/page-01.webp", caption: "2023 正式節目冊：封面" },
      { src: "assets/img/concerts/2023-program/page-02.webp", caption: "2023 正式節目冊：緣起" },
      { src: "assets/img/concerts/2023-program/page-03.webp", caption: "2023 正式節目冊：團隊介紹" },
      { src: "assets/img/concerts/2023-program/page-04.webp", caption: "2023 正式節目冊：指揮盧宓承" },
      { src: "assets/img/concerts/2023-program/page-05.webp", caption: "2023 正式節目冊：指揮丁肇賢" },
      { src: "assets/img/concerts/2023-program/page-06.webp", caption: "2023 正式節目冊：指揮簡晟軒" },
      { src: "assets/img/concerts/2023-program/page-07.webp", caption: "2023 正式節目冊：演出人員" },
      { src: "assets/img/concerts/2023-program/page-08.webp", caption: "2023 正式節目冊：演出曲目" },
      { src: "assets/img/concerts/2023-program/page-09.webp", caption: "2023 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2023-program/page-10.webp", caption: "2023 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2023-program/page-11.webp", caption: "2023 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2023-program/page-12.webp", caption: "2023 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2023-program/page-13.webp", caption: "2023 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2023-program/page-14.webp", caption: "2023 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2023-program/page-15.webp", caption: "2023 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2023-program/page-16.webp", caption: "2023 正式節目冊：特別感謝" }
    ],
    sponsorParagraphs: [
      "節目冊公開特別感謝：國立嘉義高級中學、fotosian 映像記憶王家馨學長、嘉義高中管樂團與 2023 校友暨在校生第 38 屆聯合音樂會籌備團隊。"
    ],
    videos: [
      { label: "第 38 屆《一樹起響》錄影清單", url: "https://www.youtube.com/playlist?list=PLrgre0LUNSYDPJu7FjDyfow4dvdFImMTa", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: [
      "concerts.html",
      "校友提供：2023校友聯演 節目冊.pdf",
      "校友提供：20230820_演出發文_01_魏仕杰.md",
      "校友提供：翁啓榮-臉書發文.md",
      "校友提供：旭陵慶典介紹.pptx",
      "校友提供：第 38 屆內部收支表（僅作票務線索與公開範圍判斷）",
      SOURCE_SOCIAL_VIDEO_LIST
    ],
    sourceNote: "本頁演出日期、時間、場地、指揮、曲目、演出人員、緣起、團隊介紹、指揮介紹與曲目介紹，以 2023 年正式節目冊為主要依據；《旭陵慶典》創作說明另參考校友提供簡報，主題命名脈絡與總召資訊參考校友公開宣傳貼文。內部收支表僅用於判斷票務屬索票入場，不公開個人捐款或財務明細。",
    status: "partial",
    notes: "2023 年正式節目冊之緣起、團隊介紹、指揮介紹、曲目、曲目介紹、演出人員與節目冊影像已補入；蔡淳任為總召、翁啟榮為籌備統籌。《旭陵慶典》為葉哲良受託為嘉義高中百年校慶創作之首演作品。"
  },
  {
    id: "2022-37th",
    nth: 37,
    year: 2022,
    rocYear: 111,
    title: "從0開始",
    subtitle: "",
    aliases: ["從零開始"],
    date: "",
    time: "",
    venue: "嘉義高中樹人堂",
    venueNote: "2021 疫情停辦後重啟",
    hostHead: "零字頭",
    conductors: [
      { name: "簡晟軒", num: "8861", role: "樂團指導" },
      { name: "丁肇賢", num: "8501", role: "樂團指導" }
    ],
    soloists: [{ name: "莊宗儒", num: "0271", instrument: "上低音號", work: "" }],
    program: [],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/2022.webp",
    page: "concerts/2022-37th.html",
    gallery: [],
    videos: [
      { label: "第 37 屆《從零開始》錄影清單", url: "https://youtube.com/playlist?list=PLx4Z-dMoougSXkYYsdbDti1UTSIhj2-OY&si=-EIgy3jCjKxYo1cJ", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", SOURCE_SOCIAL_VIDEO_LIST],
    status: "partial",
    notes: "日期、曲目、完整名單待補。"
  },
  {
    id: "2021-cancelled",
    nth: null,
    year: 2021,
    rocYear: 110,
    title: "疫情停辦",
    subtitle: "",
    date: "",
    time: "",
    venue: "",
    venueNote: "",
    hostHead: "",
    conductors: [],
    soloists: [],
    program: [],
    ticket: { type: "none", price: "", channels: [], note: "疫情停辦" },
    poster: "",
    page: "",
    gallery: [],
    news: [],
    sources: ["網站製作規範.md", "concerts.html"],
    status: "cancelled",
    notes: "此筆用於屆數連續性與歷史註記，不是正式聯演屆次。"
  },
  {
    id: "2020-36th",
    nth: 36,
    year: 2020,
    rocYear: 109,
    title: "親子九九",
    subtitle: "Parent-Child 99",
    aliases: ["親子久久"],
    date: "2020-08-29",
    time: "14:30",
    venue: "嘉義市文化局音樂廳",
    venueNote: "疫情前最後一次音樂廳聯演",
    hostHead: "九字頭",
    conductors: [
      { name: "曾膺安", num: "6951", role: "指揮" },
      { name: "簡晟軒", num: "8861", role: "指揮" },
      { name: "林唐禾", num: "8993", role: "指揮" }
    ],
    soloists: [],
    program: [],
    ticket: { type: "ticketed", price: "100", channels: ["兩廳院售票系統", "ibon"], note: "" },
    poster: "assets/img/concerts/2020.webp",
    page: "concerts/2020-36th.html",
    gallery: [],
    videos: [
      { label: "第 36 屆《親子九九》錄影清單", url: "https://youtube.com/playlist?list=PLc3LYZ21H4qmmg5jrps8SSy2B1uukzSiu", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", SOURCE_SOCIAL_VIDEO_LIST],
    status: "partial",
    notes: "社群錄影清單作《親子九九》；籌備貼文另見《親子久久》用語，暫列別名待考。"
  },
  {
    id: "2019-35th",
    nth: 35,
    year: 2019,
    rocYear: 108,
    title: "正八音",
    subtitle: "",
    date: "2019-08-31",
    endDate: "2019-09-01",
    time: "",
    venue: "嘉義高中樹人堂／北港文化中心家湖廳",
    venueNote: "睽違十五年再度巡迴北港",
    hostHead: "八字頭",
    sessions: [
      { date: "2019-08-31", time: "16:00", venue: "嘉義高中樹人堂", conductor: { name: "盧宓承", num: "7111" } },
      { date: "2019-09-01", time: "14:30", venue: "北港文化中心家湖廳", conductor: { name: "簡晟軒", num: "8861" } }
    ],
    organizers: [{ name: "魏仕杰", num: "8841", role: "總召" }],
    conductors: [
      { name: "盧宓承", num: "7111", role: "8/31 指揮" },
      { name: "簡晟軒", num: "8861", role: "9/1 指揮" }
    ],
    soloists: [
      { name: "陳錫仁", num: "6301", instrument: "小號", work: "Arutiunian Trumpet Concerto" },
      { name: "洪筱涵", num: "9841", instrument: "法國號", work: "Richard Strauss: Horn Concerto No. 1, mvt. I" }
    ],
    performers: [
      { name: "蔡詠竹", num: "0611", role: "長笛聲部（8/31、9/1）" },
      { name: "葉哲良", num: "9721", role: "單簧管聲部（8/31、9/1）" },
      { name: "鄭鈞元", num: "8431", role: "薩克斯風聲部（8/31、9/1）" },
      { name: "許哲誠", num: "0431", role: "薩克斯風聲部（8/31、9/1）" },
      { name: "魏仕杰", num: "8841", role: "法國號聲部（8/31、9/1）" },
      { name: "楊秉驊", num: "8401", role: "小號聲部（8/31、9/1）" },
      { name: "蔡淳任", num: "9202", role: "小號聲部（8/31、9/1）" },
      { name: "林少凡", id: "linshaofan", role: "小號聲部（8/31、9/1）" },
      { name: "高健雄", num: "7901", role: "長號聲部（8/31）" },
      { name: "張永澤", num: "9601", role: "長號聲部（8/31）" },
      { name: "蔡政岳", num: "9701", role: "長號聲部（8/31、9/1）" },
      { name: "翁啟榮", num: "7581", role: "低音號聲部（8/31、9/1）" },
      { name: "王騰寬", num: "8982", role: "低音號聲部（8/31）" },
      { name: "鄧杰翔", num: "8302", role: "打擊聲部（8/31、9/1）" },
      { name: "陳英杰", num: "8991", role: "打擊聲部（8/31、9/1）" },
      { name: "林唐禾", num: "8993", role: "打擊聲部（8/31、9/1）" },
      { name: "陳羿弦", num: "0741", role: "法國號聲部（9/1）" }
    ],
    program: [
      { section: "8/31 嘉義高中樹人堂", title: "可愛的玫瑰花", foreignTitle: "お手やわらかに", composer: "川口真", arranger: "Tang Hong", status: "confirmed" },
      { section: "8/31 嘉義高中樹人堂", title: "龍貓", foreignTitle: "となりのトトロ・メドレー", composer: "久石讓", arranger: "磯崎敦博", status: "confirmed" },
      { section: "8/31 嘉義高中樹人堂", title: "貓的報恩 電影主題曲—幻化成風", foreignTitle: "風になる", composer: "辻亞彌乃", arranger: "小島里美", status: "confirmed" },
      { section: "8/31 嘉義高中樹人堂", title: "搖滾卡農", foreignTitle: "カノン／Brass Rock", composer: "Johann Pachelbel", arranger: "鄉間幹男", status: "confirmed" },
      { section: "8/31 嘉義高中樹人堂", title: "探戈組曲", foreignTitle: "Tango a la carte", arranger: "森田一浩", status: "confirmed" },
      { section: "8/31 嘉義高中樹人堂", title: "阿法瑪序曲", foreignTitle: "Alvamar Overture", composer: "James Barnes", status: "confirmed" },
      { section: "8/31 嘉義高中樹人堂", title: "崖上的波妞", foreignTitle: "崖の上のポニョ", composer: "久石讓", arranger: "三浦秀秋", status: "confirmed" },
      { section: "8/31 嘉義高中樹人堂", title: "無心的呢喃", foreignTitle: "Careless Whisper", composer: "George Michael and Andrew Ridgeley", arranger: "岩井直溥", status: "confirmed" },
      { section: "8/31 嘉義高中樹人堂", title: "永遠的星條旗進行曲", foreignTitle: "Stars and Stripes Forever", composer: "John Philip Sousa", arranger: "Brion/Shissel", status: "confirmed" },
      { section: "8/31 嘉義高中樹人堂", title: "日本風情畫五", foreignTitle: "Japanese Graffiti V", arranger: "磯崎敦博", status: "confirmed" },
      { section: "9/1 北港文化中心家湖廳", title: "光榮！", foreignTitle: "Slava!", composer: "Leonard Bernstein", arranger: "Clare Grundman", status: "confirmed" },
      { section: "9/1 北港文化中心家湖廳", title: "動態", foreignTitle: "Dynamica", composer: "Jan Van der Roost", status: "confirmed" },
      { section: "9/1 北港文化中心家湖廳", title: "阿爾圖尼亞小號協奏曲", foreignTitle: "Trumpet Concerto", composer: "A. Arutiunian", arranger: "Guy M. Duker", soloist: "陳錫仁", status: "confirmed" },
      { section: "9/1 北港文化中心家湖廳", title: "杭亭頓慶典", foreignTitle: "A Huntingdon Celebration", composer: "Philip Sparke", status: "confirmed" },
      { section: "9/1 北港文化中心家湖廳", title: "阿帕拉契序曲", foreignTitle: "Appalachian Overture", composer: "James Barnes", status: "confirmed" },
      { section: "9/1 北港文化中心家湖廳", title: "理查．史特勞斯第一號法國號協奏曲", foreignTitle: "Horn Concerto No. I, mvt. I", composer: "Richard Strauss", arranger: "Tim Laughlin", soloist: "洪筱涵", status: "confirmed" },
      { section: "9/1 北港文化中心家湖廳", title: "大河之舞", foreignTitle: "Riverdance", composer: "Bill Whelan", arranger: "Catl Strommen", status: "confirmed" },
      { section: "9/1 北港文化中心家湖廳", title: "亞美尼亞舞曲 第一部", foreignTitle: "Armenian Dances Part I", composer: "Alfred Reed", status: "confirmed" },
      { title: "Yesterday", status: "confirmed", note: "Encore" }
    ],
    ticket: { type: "free", price: "0", channels: [], note: "免票入場" },
    poster: "assets/img/concerts/2019.webp",
    page: "concerts/2019-35th.html",
    gallery: [],
    videos: [
      { label: "第 35 屆《正八音》樹人堂場錄影清單", url: "https://youtube.com/playlist?list=PLzUX_mdxEPjXYhGIosLIcPNW9DgrdXMmt", source: SOURCE_SOCIAL_VIDEO_LIST },
      { label: "第 35 屆《正八音》北港場錄影清單", url: "https://youtube.com/playlist?list=PLzUX_mdxEPjXYhGIosLIcPNW9DgrdXMmt", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: [
      "concerts.html",
      "concerts/2019-35th.html",
      "校友提供：20190831節目冊.pdf",
      "校友提供：20190901節目冊.pdf",
      "校友提供：指揮獨奏簡介.txt",
      "校友提供：2019嘉中校友聯演企劃書.pdf",
      "校友提供：第 35 屆文宣節目單圖檔",
      SOURCE_SOCIAL_VIDEO_LIST
    ],
    status: "confirmed",
    notes: "兩場合計約 550 名觀眾；動員 76 人、計 129 人次。"
  },
  {
    id: "2018-34th",
    nth: 34,
    year: 2018,
    rocYear: 107,
    title: "青春の極短篇",
    subtitle: "捌月季／當我的七仔好嗎？",
    date: "2018-08-05",
    time: "14:30",
    venue: "嘉義市文化局音樂廳",
    venueNote: "",
    hostHead: "七字頭",
    conductors: [
      { name: "曾膺安", num: "6951", role: "指揮" },
      { name: "簡晟軒", num: "8861", role: "指揮" }
    ],
    soloists: [],
    program: [
      {
        title: "稚鳥飛翔",
        foreignTitle: "Fanfare - Young Pheasants in the Sky",
        credit: "八木澤教司 Satoshi Yagisawa",
        status: "confirmed",
        description: "《稚鳥飛翔》是日本奈良縣立橿原高等學校為紀念創立 30 周年，委託八木澤教司創作的號角曲，2004 年由該校管樂團在年度音樂會首演。日文標題中的若雉子指年輕的雉鳥，也是橿原高等學校的吉祥物；作曲家以雉鳥比喻學生，將展翅高飛的祝福與期望寄託在作品中。全曲約兩分多鐘，兼具燦爛號角與富歌唱性的旋律線，適合作為音樂會開場曲。"
      },
      {
        title: "亞拉伯罕之追",
        foreignTitle: "Abram's Pursuit",
        credit: "大衛．霍爾辛格 David Holsinger",
        status: "confirmed",
        description: "曲名典故出自舊約聖經《創世記》第 14 章。亞伯蘭 Abram，也就是後來的亞伯拉罕，是基督教、伊斯蘭教與猶太教經典中共同的先知。當時統治當地的幾位王發生戰爭，使亞伯蘭居住在所多瑪城的姪子羅德 Lot 被擄走；亞伯蘭帶領家丁 318 名連夜追擊，擊敗軍隊，救回姪子、財物與被擄民眾。雖然典故來自聖經故事，音樂卻不是教會聖歌風格，而是以緊湊節奏、木管快速音群與豐富鍵盤打擊樂，創造出充滿速度與緊張感的作品。"
      },
      {
        title: "交響詩－斯巴達克斯",
        foreignTitle: "Spartacus",
        credit: "楊．樊．德．魯斯特 Jan van der Roost",
        status: "confirmed",
        description: "《交響詩－斯巴達克斯》是比利時作曲家楊．樊．德．魯斯特在安特衛普音樂院時，以義大利羅馬帝國歷史事件「斯巴達克斯起義」為背景創作的管樂團作品，也帶有向義大利作曲家雷史畢基對後世作曲家與電影配樂影響致敬的意圖。作品可分為三個大部分：第一樂章與開頭的異國風旋律描寫羅馬帝國的奴隸生涯，榮耀帝國與競技場建立在奴隸角鬥士的悲慘命運之上；第二樂章是作曲家想像斯巴達克斯與愛人邂逅的浪漫慢板；隨後音樂轉向起義角鬥士的悲劇命運，以不和諧和絃象徵壯烈戰鬥後戰敗投降、被釘上十字架的景象。最後音樂再現前兩個樂章的主題，回顧斯巴達克斯史詩般的一生。"
      },
      {
        title: "七座黃金城市",
        foreignTitle: "Seven Cities of Gold",
        credit: "大衛．洛維林 David Lovrien",
        status: "confirmed",
        description: "《七座黃金城市》是一首帶有西班牙特色的進行曲，描寫探險家為尋找傳說中的黃金城，企圖穿越各種自然障礙的雄心壯志與出發時的意氣風發。七座黃金城並非實際存在的城市，而是 16 世紀流傳於西班牙殖民者之間的傳說；當時傳言認為穿越北美洲西南邊沙漠後可以找到七座黃金城。這個傳說使殖民探險者弗朗西斯科．科羅納多 Francisco Coronado 組織兩次大規模探險隊，從西班牙已開拓的墨西哥北部往今日美國西南部探索。科羅納多最終並未找到黃金城，但他的探險成果，讓今日著名的大峽谷與科羅拉多河與他的名字產生關聯。"
      },
      {
        title: "七夕",
        foreignTitle: "The Seventh Night of July",
        credit: "酒井格 Itaru Sakai",
        status: "confirmed",
        description: "《七夕》是日本作曲家酒井格第一首管樂團作品，寫於作曲家高三時期，後由其就讀的大阪音樂大學首演。七夕除了紀念牛郎織女的愛情，古時候婦女也會在那天向織女祈求織布巧手；日本祈求巧手的習俗後來逐漸演變為在竹葉枝上掛各式祈願條。作曲家借用七夕典故，描寫高中參加樂團時的青春點滴。全曲採快慢快結構，在青春速度中夾入浪漫慢板旋律，並以薩克斯風與上低音號獨奏對唱，描寫當時樂團中演奏這兩樣樂器的情侶好友；隨後青春主題再度出現，音樂結束在輕快燦爛的旋律之中。"
      },
      {
        title: "豪勇七蛟龍",
        foreignTitle: "The Magnificent Seven",
        credit: "艾爾莫．伯恩斯坦曲，Scott Richards 編 Elmer Bernstein, arr. Scott Richards",
        status: "confirmed",
        description: "《豪勇七蛟龍》是 1960 年上映的西部電影，故事情節源於日本導演黑澤明作品《七武士》，敘述墨西哥鄉民為抵禦欺侮他們的盜匪，決定集資招募槍手一起對抗。鄉民與七名槍手在村莊建立防禦工事，對抗數百名盜匪，最後七名槍手中有四名在大戰中犧牲。本曲為配樂大師艾爾莫．伯恩斯坦為該片創作的主題曲，已成為美國西部片配樂經典；除了為劇情營造典型西部氣氛，主題曲也廣泛出現在影集、紀錄片、典禮與商業場合。本次演出為 Scott Richards 改編的管樂團版本。"
      },
      {
        title: "詹姆士龐德 007",
        foreignTitle: "Bond... James Bond",
        credit: "史蒂芬．布拉編 Stephen Bulla",
        status: "confirmed",
        description: "詹姆士龐德系列電影自 1962 年開始，至今已有多部系列電影。每部電影除了著名的詹姆士龐德主題，也會搭配電影主題邀請流行歌手製作主題歌曲；這些流行歌曲不只常登上當年流行音樂排行榜，也是各大電影獎項常客。本次演出的《詹姆士龐德 007》由史蒂芬．布拉改編給管樂團演出，除了著名的龐德間諜主題，也回顧系列中數首知名電影歌曲，包括 1964 年《金手指》Goldfinger、1977 年《海底城》A Spy Who Loved Me 主題曲 Nobody Does It Better、2012 年《空降危機》Skyfall，以及 1973 年由披頭四樂團團員保羅．麥卡尼操刀的《生死關頭》Live and Let Die。"
      },
      {
        title: "美國風情畫七",
        foreignTitle: "America Graffiti VII",
        credit: "岩井直溥編 Naohiro Iwai",
        status: "confirmed",
        description: "岩井直溥是日本著名編曲家，被尊稱為大眾管樂之父。1972 年起，他與當時日本多位編曲家以 New Sounds in Brass 為名，每年出版一輯由流行音樂改編的管樂作品 CD 與樂譜，包含演歌、流行歌、電影配樂與動漫配樂等，為日本流行樂改編管樂作品發展打下深厚基礎。《美國風情畫七》收錄於 1996 年出版的 New Sounds in Brass 第 24 輯，選用美國 1950 至 1960 年代流行歌曲，集結成輕鬆熱鬧的管樂作品；內容包含木匠兄妹《Jambalaya》、康妮．法蘭西斯 Someone Else's Boy、帕蒂．佩奇 Tennessee Waltz、強尼．瑞 Just Walking in the Rain，以及史琪特．戴維斯 The End of The World。"
      }
    ],
    programNote: "曲目與樂曲解說整理自校友提供之 2018 年校友聯演曲目介紹社群協作文件；附件未標明上下半場，曲序仍待正式節目冊或校友補充資料校對。",
    ticket: { type: "ticketed", price: "100", channels: [], note: "" },
    poster: "assets/img/concerts/2018.webp",
    page: "concerts/2018-34th.html",
    gallery: [],
    videos: [
      { label: "第 34 屆《當我的七仔好嗎》錄影與示範帶清單", url: "https://youtube.com/playlist?list=PLc3LYZ21H4qk-a2Ycs4OKFJr8FRU72K6V", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    performerGroups: [
      { role: "指揮", people: ["6951 曾膺安", "8861 簡晟軒"] },
      { role: "長笛", people: ["9611 張容慈", "0411 蔡宛蓉", "0511 翁書偉", "0611 蔡詠竹"] },
      { role: "豎笛", people: ["7002 顏聰文", "7221 李吉峰", "8521 賴俊甫", "8603 江俊漢", "8621 蔡嘉偉", "9721 葉哲良", "9802 李亞璿", "9921 劉炫廷", "0221 劉至遠", "0321 李承祐", "0323 董書菡", "0421 陳乃慎"] },
      { role: "低音豎笛", people: ["戴誠佐"] },
      { role: "中音薩克斯風", people: ["8431 鄭鈞元", "0431 許哲誠", "0301 顏駿", "0631 呂裕翔"] },
      { role: "次中音薩克斯風", people: ["8632 江嘉榮", "江旻祐"] },
      { role: "上低音薩克斯風", people: ["張又予"] },
      { role: "雙簧管", people: [] },
      { role: "低音管", people: [] },
      { role: "法國號", people: ["7941 黃亭雲", "8841 魏仕杰", "9302 洪敏睿", "9841 洪筱涵", "0302 李怡貝", "葉丞竣"] },
      { role: "小號", people: ["6851 周正倫", "7571 陳昌遠", "7751 李文慶", "8101 陳明陽", "8401 楊秉驊", "8601 古峻錡", "9202 蔡淳任", "9852 周宥騰", "0501 陳漢仲", "0651 林俞佑", "0652 陳浩維"] },
      { role: "長號", people: ["7962 范庭福", "9601 張永澤", "0002 王則旻", "0402 方文志", "0661 王聖薺", "0662 賴譽平", "李奕憲", "0563 林岱宇", "紀政良", "陳弘曆"] },
      { role: "上低音號", people: ["6801 游宗仁", "9871 陳韋龍", "0472 林郁凱", "林宗易"] },
      { role: "低音號", people: ["7581 翁啟榮", "0103 葉韋廷", "0381 張仁瀚", "0601 葉思佑"] },
      { role: "低音大提琴", people: ["陳映彤（原檔標註 04）", "蘇瑋彤"] },
      { role: "打擊", people: ["8302 鄧杰翔", "8991 陳英杰", "9392 林祐成", "0591 張子明", "0593 陳勇志", "0691 謝宗霖", "0692 徐杰逸", "0693 涂宇杰"] }
    ],
    performerNote: "名單依 2018 年 6 月 22 日「2018校聯名單」整理；原文提示「歡迎編輯、編號自行補上」，此處僅保留原檔可辨識編號，不推算缺漏編號。",
    sources: [
      "concerts.html",
      SOURCE_SOCIAL_VIDEO_LIST,
      SOURCE_2018_PROGRAM_NOTES,
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/2018年第34屆/2018校聯名單.md"
    ],
    sourceNote: "本頁曲目與樂曲解說整理自 2018 年校友聯演曲目介紹社群協作文件；演出人員名單依 2018 年 6 月 22 日「2018校聯名單」整理。曲序與完整正式節目冊影像仍待校友資料補齊。",
    status: "partial",
    notes: "曲目與樂曲解說已依社群協作曲目介紹補入；演出人員名單依 2018校聯名單整理。錄影清單註明因版權因素，YouTube 上傳後多有消音或版權宣告，現存清單多為示範帶。",
    intro: [
      "本屆曲目與樂曲解說已依校友提供的 2018 年校友聯演曲目介紹整理入頁，8 首曲目皆已補入中文曲名、外文曲名、作曲／編曲資訊與單曲介紹。",
      "2018 年 6 月 22 日的校聯名單也已補入演出人員區塊；附件未標明上下半場，曲序目前先依現存曲介順序呈現，後續若取得正式節目冊，可再校對曲序、職掌與名單缺漏編號。"
    ]
  },
  {
    id: "2017-33rd",
    nth: 33,
    year: 2017,
    rocYear: 106,
    title: "六馬仰秣 憶當年",
    subtitle: "",
    date: "2017-08-26",
    time: "16:00",
    venue: "嘉義高中樹人堂",
    venueNote: "",
    hostHead: "六字頭",
    organizers: [{ name: "翁啟榮", num: "7581", role: "召集人之一" }],
    conductors: [
      { name: "羅家駒", num: "6392", role: "指揮" },
      { name: "盧宓承", num: "7111", role: "指揮" },
      { name: "簡晟軒", num: "8861", role: "指揮" },
      { name: "王騰寬", num: "8982", role: "指揮" }
    ],
    soloists: [],
    program: [
      { title: "Lyrical March", status: "partial" },
      { title: "AIDA", status: "partial" },
      { title: "Songs of Sailor and Sea", status: "partial" },
      { title: "Sedona", status: "partial" },
      { title: "Beauty and the Beast", status: "partial" },
      { title: "Autumn Leaves", status: "partial" },
      { title: "Fiesta Tropical", status: "partial" },
      { title: "T.S.O.P.", status: "partial" }
    ],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/2017.webp",
    page: "concerts/2017-33rd.html",
    gallery: [],
    videos: [
      { label: "第 33 屆《六馬仰秣》錄影清單", url: "https://youtube.com/playlist?list=PLc3LYZ21H4ql68tkPdaF3lniP66sTedsW", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", SOURCE_SOCIAL_VIDEO_LIST],
    status: "partial",
    notes: "部分曲名取自海報小字，待節目冊佐證；屆數依規範列為推算值。"
  },
  {
    id: "2016-32nd",
    nth: 32,
    year: 2016,
    rocYear: 105,
    title: "五字頭！",
    subtitle: "",
    date: "2016-08-27",
    time: "17:00",
    venue: "嘉義市文化公園演奏台",
    venueNote: "",
    hostHead: "五字頭",
    organizers: [
      { name: "嘉義高中校友管樂團", role: "主辦單位" }
    ],
    conductors: [
      { name: "陳錫仁", num: "6301", role: "指揮" },
      { name: "翁啟榮", num: "7581", role: "指揮" },
      { name: "丁肇賢", num: "8501", role: "指揮" }
    ],
    soloists: [],
    program: [
      { title: "The Days of Wine and Roses", composer: "Henry Mancini", arranger: "Naohiro Iwai", status: "confirmed" },
      { title: "各種管樂重奏", status: "partial", note: "曲目 2-5 待節目冊補齊" },
      { title: "松田聖子歌曲選粹", arranger: "Naohiro Iwai", status: "partial" },
      { title: "On the Mall", composer: "Edwin Franko Goldman", status: "confirmed" },
      { title: "新天堂樂園", composer: "Andrea Morricone / Ennio Morricone", arranger: "M. Oshima", status: "partial" },
      { title: "晚霞", composer: "王福齡", arranger: "San Pedro", status: "confirmed" },
      { title: "My Way", composer: "Paul Anka", arranger: "Naohiro Iwai", status: "confirmed" }
    ],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/2016.webp",
    page: "concerts/2016-32nd.html",
    gallery: [],
    videos: [
      { label: "第 32 屆《五字頭》錄影清單", url: "https://youtube.com/playlist?list=PLAVnw2heYVvnEursVMqOMsCQ8z8knBFSF", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: [
      "concerts.html",
      SOURCE_SOCIAL_VIDEO_LIST,
      "20260704_嘉中管樂社官網_校友提供資料/01_校友聯演與歷史活動史料/2016_第32屆_校友聯演_待補/10_節目冊海報文宣_公開候選/節目冊海報文宣__7581翁啟榮提供__99de70c5__DM.jpg",
      "20260704_嘉中管樂社官網_校友提供資料/01_校友聯演與歷史活動史料/2016_第32屆_校友聯演_待補/10_節目冊海報文宣_公開候選/節目冊海報文宣__7581翁啟榮提供__84485060__演出曲目.docx"
    ],
    status: "partial",
    notes: "DM 確認主題、屆次、日期、時間、場地、指揮、指導與主辦單位；曲目檔確認部分曲目，室內樂重奏細目待補。"
  },
  {
    id: "2015-31st",
    nth: 31,
    year: 2015,
    rocYear: 104,
    title: "三生。一世樂",
    subtitle: "",
    date: "2015-09-05",
    time: "19:30",
    venue: "嘉義市政府文化局音樂廳",
    venueNote: "",
    hostHead: "",
    intro: [
      "依演出企劃書前言記載，嘉中管樂隊自民國 74 年（1985）起延續舉辦校友暨在校生聯合音樂會，至 2015 年已「連續舉辦整整三十屆從未中斷」。第 31 屆的三大宗旨為：讓畢業隊友重溫高中時代情誼；藉正式音樂會之演出及排練，提升在校生的演奏及行政能力；並首次將第三項宗旨由「免費索票」改為「以售票入場方式，倡導管樂欣賞與正當休閒之風氣」——這項措辭上的改變，正對應著本屆音樂會售票制度的正式啟動。",
      "依籌備會議紀錄，主辦校友於會中特別提及：「今年為三十屆以來第一次售票演出，意義重大，籌備上也需要比往年更加謹慎。」門票定價 100 元、以五折優惠（50 元）銷售，預計服務觀眾 800 人；同時，本屆也是校方「想要讓校聯恢復由在校生主導」的一屆，各股股長首度全數由在校生擔任，藉籌備過程完成新舊幹部交接與訓練。籌備期間每週日上午團練，演出前一週（8/31-9/4）晚間集訓，9 月 5 日當天下午裝台彩排、晚間正式演出。"
    ],
    organizers: [{ name: "蔡淳任", num: "9202", role: "舞台監督" }],
    conductors: [
      { name: "鄭鈞元", num: "8431", role: "指揮", concertRole: "常任指揮", concertBio: "民國 84 年（1995）進入嘉義高中管樂社開始接觸薩克斯風，大學就讀國立臺灣藝術大學音樂系，師事顏慶賢老師，畢業後進入國防部示範樂隊服役。退伍後赴法國就讀法國國立馬爾梅松音樂院及馮特內蘇布瓦市立音樂院，於 2009 年獲得薩克管、室內樂第一獎演奏文憑以及音樂教育文憑。依 2015 年演出企劃書記載，時任南華大學民族音樂學系講師、嘉義高中管樂社指導老師，並擔任雲嘉南多所國中小學管樂團薩克管分部老師。" },
      { name: "簡晟軒", num: "8861", role: "指揮", concertRole: "客席指揮", concertBio: "嘉義縣新港人，民國 88 年（1999）就讀嘉義高中學習長號，啟蒙於宋光清老師（國家交響樂團長號首席）及高崇文老師（高雄市立交響樂團長號演奏家）。2002 年就讀高雄師範大學音樂系，師事蔡佳融老師（臺北市立交響樂團長號演奏家）；2006 年進入國防部示範樂隊服役，2009 年赴德國萊比錫音樂院，師事 Helge von Niswandt 老師（柏林音樂廳交響樂團長號首席），2010 年考取亞洲青年管弦樂團（AYO），2012 年取得萊比錫音樂院長號演奏家文憑並回國，此後積極參與樂團演出及南部地區管樂教學。依 2015 年演出企劃書記載，時為嘉頌重奏團、嘉義市管樂團及高雄市管樂團團員，以及多所學校長號分部老師。" },
      { name: "陳錫仁", num: "6301", role: "指揮", concertRole: "樂團指揮", concertBio: "畢業於嘉義高中並曾任嘉中管樂隊隊長，1982 年畢業於國立臺灣師範大學音樂系，為該系首位主修小號者；1991 年獲得美國聖保羅大學音樂學院（DePaul University）小號演奏碩士學位，成為國人首位獲得此樂器演奏碩士文憑者。曾創立台灣銅管五重奏團、陳錫仁藝術工作室與陳錫仁銅管樂集，並出版多本小號演奏專業著作，長年任教於中臺科技大學等校。" },
      { name: "盧宓承", num: "7111", role: "指揮", concertRole: "樂團指揮", concertBio: "校友間暱稱「咪咪學長」，長笛聲部出身，國立中正大學資訊管理博士，長年任教於雲林縣立蔦松藝術高中，並非音樂科系出身的專職指揮，卻自 2010 年代中期起多次擔任校友聯演指揮，是校友團中兼跨資訊教育與管樂領域的代表人物。" }
    ],
    soloists: [{ name: "陳韋希", num: "9132", instrument: "薩克斯風", work: "Andre Waignein: Deux Mouvements", concertRole: "薩克斯風獨奏", concertBio: "依 2015 年演出企劃書記載，陳韋希取得法國國立聖康坦（Saint-Quentin）音樂院職業班薩克斯風演奏文憑，時為米特薩克斯風重奏團團員，本屆獨奏韋寧（Andre Waignein）薩克管協奏曲《兩個樂章》。" }],
    performers: [
      { name: "盧宓承", num: "7111", role: "長笛聲部" },
      { name: "黃耀瑩", num: "8912", role: "雙簧管聲部" },
      { name: "葉哲良", num: "9721", role: "單簧管聲部" },
      { name: "鄭鈞元", num: "8431", role: "薩克斯風聲部" },
      { name: "魏仕杰", num: "8841", role: "法國號聲部" },
      { name: "洪筱涵", num: "9841", role: "法國號聲部" },
      { name: "楊秉驊", num: "8401", role: "小號聲部" },
      { name: "蔡淳任", num: "9202", role: "小號聲部" },
      { name: "高健雄", num: "7901", role: "長號聲部" },
      { name: "高崇文", num: "8301", role: "長號聲部" },
      { name: "簡晟軒", num: "8861", role: "長號聲部" },
      { name: "方崇任", num: "9261", role: "長號聲部" },
      { name: "張永澤", num: "9601", role: "長號聲部" },
      { name: "蔡政岳", num: "9701", role: "長號聲部" },
      { name: "翁啟榮", num: "7581", role: "低音號聲部" },
      { name: "丁肇賢", num: "8501", role: "低音號聲部" },
      { name: "鄧杰翔", num: "8302", role: "打擊聲部" },
      { name: "陳英杰", num: "8991", role: "打擊聲部" },
      { name: "劉炫廷", num: "9921", role: "單簧管聲部" }
    ],
    performerGroups: [
      { role: "長笛", people: ["7111 盧宓承", "9311 蔡沛霖", "9611 張容慈", "0001 陳政宏", "0011 周億琳"] },
      { role: "雙簧管", people: ["8912 黃耀瑩"] },
      { role: "巴松管", people: ["8711 劉怡汝"] },
      { role: "單簧管", people: ["7222 李吉峯", "7921 莊富益", "8603 江俊漢", "8621 蔡嘉偉", "8722 張羽嫻", "8921 洪瑋辰", "8922 陳正龍", "9122 吳瑩娟", "9321 吳宜靜", "9721 葉哲良", "9802 李亞璿", "9902 趙耘浩", "9921 劉炫廷"] },
      { role: "薩克斯風", people: ["8431 鄭鈞元", "8632 江嘉榮", "8832 陳韋志", "9132 陳韋希（獨奏）", "9331 郭軒竑"] },
      { role: "法國號", people: ["7503 蔡文立", "8841 魏仕杰", "9302 洪敏睿", "9801 高士涵", "9841 洪筱涵"] },
      { role: "小號", people: ["7571 陳昌遠", "8401 楊秉驊", "8601 古峻錡", "8651 劉全盛", "9202 蔡淳任", "9451 蔡育修", "9903 陳信慈"] },
      { role: "長號", people: ["7901 高健雄", "8301 高崇文", "8861 簡晟軒", "9261 方崇任", "9601 張永澤", "9661 謝梓嫣", "9701 蔡政岳", "0002 王則旻"] },
      { role: "上低音號", people: ["6801 游宗仁", "8671 吳仁庭"] },
      { role: "低音號", people: ["7581 翁啟榮", "8501 丁肇賢", "9702 李旻其"] },
      { role: "打擊", people: ["8192 李瑾佑", "8302 鄧杰翔", "8991 陳英杰", "9392 林祐成", "9895 詹琬婷", "0091 王耀德"] }
    ],
    performerNote: "依 2015 年演出企劃書記載，全體演出人員（含編號）如下。企劃書原文註明「篇幅所限，以下僅列出部分團員」，全團演出規模約 70 人；本表為企劃書中留有編號紀錄之演出者，歡迎校友協助勘誤補充。",
    adminRows: [
      { role: "團長", people: ["6401 馮朝君"], duty: "統整團務與演出行政事務" },
      { role: "音樂會總籌", people: ["8841 魏仕杰"], duty: "專責籌劃本屆聯演所有相關事宜" },
      { role: "文書", people: ["8481 羅碩文"], duty: "節目單撰寫、文書庶務處理" },
      { role: "財務", people: ["8802 劉議謙"], duty: "處理各項收支、記帳並徵信" },
      { role: "譜務", people: ["7962 范庭福"], duty: "準備演出與排練所需之所有樂譜" },
      { role: "美宣", people: ["9721 葉哲良"], duty: "海報、節目單封面設計與宣傳" },
      { role: "舞台監督", people: ["9202 蔡淳任"], duty: "控制演出當天流程，與音樂廳館方接洽舞台事宜" }
    ],
    adminNote: "依籌備會議紀錄，本屆另設有在校生擔任的總籌、助理指揮、文書、財務、器管、譜務、宣傳票務、人事、公關等股，藉籌辦過程完成新舊幹部交接與訓練。",
    program: [
      { title: "1812 序曲", foreignTitle: "The Year 1812, Festival Overture in E-flat major, Op. 49", credit: "柴可夫斯基 Tchaikovsky", status: "confirmed", description: "柴可夫斯基應指揮家尼可萊．魯賓斯坦之邀，於 1880 年為紀念俄國擊退拿破崙入侵而作，樂曲中引用法國國歌《馬賽曲》代表入侵的法軍，並穿插俄羅斯民謠與聖詠《天佑沙皇》主題，管弦樂版本更以真實砲聲與鐘聲作結；是柴可夫斯基流傳最廣、最具戲劇張力的作品之一，管樂團版本以定音鼓與大鼓等打擊效果重現原曲的磅礡氣勢。" },
      { title: "兩個樂章（薩克管協奏曲）", foreignTitle: "Deux Mouvements", credit: "安德烈．韋寧 Andre Waignein（薩克斯風獨奏：陳韋希）", status: "confirmed", description: "比利時作曲家韋寧應布魯塞爾皇家音樂院院長讓．貝里之邀，於 1989 年為該院薩克斯風班創作，並受薩克斯風教師阿蘭．克雷賓鼓勵完成。全曲分兩個樂章：第一樂章為悲歌（Elegie），旋律開闊抒情，賦予獨奏者充分的音樂自由；第二樂章隨想曲（Capriccio）則節奏多變、樂團伴奏份量吃重，獨奏者須以高音域的燦爛技巧為全曲畫下句點。" },
      { title: "林肯郡花束", foreignTitle: "Lincolnshire Posy", credit: "葛人傑 Percy Grainger", status: "confirmed", description: "葛人傑應美國樂隊指揮協會之邀，於 1937 年完成這部管樂經典，全曲六個樂章均改編自他 1905-1906 年間親赴英格蘭林肯郡採集的民謠——葛人傑當年以愛迪生蠟筒錄音機記錄下每位民謠演唱者的原始唱腔，因此每個樂章都試圖呈現「歌者本人」的風格，而非單純的曲調改編。全曲於 1937 年由高德曼樂隊完整首演。" },
      { title: "非洲交響曲", foreignTitle: "African Symphony", credit: "范麥考伊曲，岩井直溥編 Van McCoy, arr. Naohiro Iwai", status: "confirmed", description: "原曲由美國作曲家范麥考伊創作於迪斯可音樂盛行的年代，經有「日本吹奏樂波普之父」之稱的岩井直溥改編後，成為日本學生管樂團最廣為演出的通俗曲目之一，也是《New Sounds in Brass》系列的代表作品。" },
      { title: "八木節", foreignTitle: "Yagibushi", credit: "日本民謠，岩井直溥編 arr. Naohiro Iwai", status: "confirmed", description: "源自日本栃木、群馬地區的傳統民謠，經岩井直溥改編為管樂團版本，節奏明快、帶有濃厚的日本鄉土色彩，是其改編之日本民謠代表作之一。" },
      { title: "真善美選粹", foreignTitle: "Selections from The Sound of Music", credit: "羅傑斯與漢默斯坦", status: "confirmed", description: "改編自 1959 年百老匯音樂劇《真善美》，由理查．羅傑斯作曲、奧斯卡．漢默斯坦二世作詞，1965 年電影版更由茱莉．安德魯絲主演並風靡全球；本曲選粹集結劇中多首膾炙人口的旋律，是管樂團音樂會的常見曲目。" },
      { title: "美國風情畫 15", foreignTitle: "American Graffiti XV", credit: "岩井直溥編 arr. Naohiro Iwai", status: "confirmed", description: "岩井直溥自 1970 年代起於《New Sounds in Brass》系列推出的長銷組曲，全系列共 23 部作品，以組曲形式串聯多首美國經典流行與電影歌曲；第 15 集取材自美國電影協會（AFI）於 2004 年紀念美國電影百年所公布的「百大電影歌曲」名單，是該系列中具代表性的一集。" },
      { title: "伊帕內馬女孩", foreignTitle: "The Girl from Ipanema", credit: "裘賓曲，岩井直溥編 Antonio Carlos Jobim, arr. Naohiro Iwai", status: "confirmed", description: "由巴西作曲家裘賓與詩人德莫拉埃斯創作於 1962 年，是巴薩諾瓦（Bossa Nova）曲風最具代表性的名曲之一，1964 年史坦．蓋茲與雅斯楚．吉爾貝托的錄音版本更使其風靡全球；經岩井直溥改編後，成為管樂團經典的拉丁抒情曲目。" },
      { title: "唱！唱！唱！", foreignTitle: "Sing Sing Sing", credit: "普利馬曲，岩井直溥編 Louis Prima, arr. Naohiro Iwai", status: "confirmed", description: "路易．普利馬創作於 1936 年的搖擺爵士名曲，因班尼．古德曼樂團 1937 年卡內基音樂廳的傳奇演出、鼓手金恩．克魯帕的招牌鼓點而聲名大噪；本屆演出岩井直溥改編的管樂團版本，作為下半場壓軸曲目。" }
    ],
    programNote: "曲目整理自 2015 年演出企劃書附件一與正式海報；下半場 4-9 曲為「岩井直溥特集」。主辦單位保留曲目更動之權利，樂曲背景資料另參考網路公開資料。",
    ticket: { type: "ticketed", price: "100", channels: ["兩廳院售票系統", "ibon"], note: "三十年來首度嘗試售票演出" },
    poster: "assets/img/concerts/2015.webp",
    page: "concerts/2015-31st.html",
    gallery: [],
    photos: [
      { src: "assets/img/gallery/2015/0905-01t.webp", full: "assets/img/gallery/2015/0905-01.webp", caption: "全團於嘉義市政府文化局音樂廳舞台合影" }
    ],
    sponsorParagraphs: [
      "指導單位為嘉義市政府文化局；協辦單位為國立嘉義高中、國立嘉義高中校友會、嘉義高中管樂隊、嘉義市管樂團；贊助單位為嘉義高中家長會、雙燕樂器、藝研樂器。"
    ],
    videos: [
      { label: "第 31 屆《三生情一世樂》錄影清單", url: "https://youtube.com/playlist?list=PLAVnw2heYVvlWoZvSn-QPXnABOTnjmDnY", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", "concerts/2015-31st.html", SOURCE_SOCIAL_VIDEO_LIST],
    sourceNote: "本頁場地、曲目與演出人員資訊整理自 2015 年演出企劃書、籌備會議記錄、正式海報與售票文件（校友留存資料）；樂曲背景另參考公開音樂資料。如需更正或補充演出照片，歡迎透過粉絲專頁與我們聯繫。",
    status: "confirmed",
    notes: "第 31 屆《三生。一世樂》由鄭鈞元、簡晟軒、陳錫仁、盧宓承四位校友共同執棒，並邀請旅法薩克斯風演奏家陳韋希擔任薩克斯風獨奏。依 2015 年演出企劃書與籌備會議紀錄，本屆是校友聯演三十年來首度嘗試售票演出，也是校方希望讓在校生重新承接籌備主體的一屆。不可因此誤寫 2026 為首度售票。"
  },
  {
    id: "2014-30th",
    nth: 30,
    year: 2014,
    rocYear: 103,
    title: "三十而樂",
    subtitle: "卅有其誓 × 出磊拔粹",
    aliases: ["３０而礫"],
    date: "",
    time: "",
    venue: "",
    venueNote: "",
    hostHead: "",
    conductors: [
      { name: "陳錫仁", num: "6301", role: "指揮", concertRole: "指揮《木犀草序曲》", concertBio: "嘉中小號部校友，曾任嘉中管樂隊隊長。1982 年畢業於國立臺灣師範大學音樂系，1991 年獲美國 DePaul University 小號演奏碩士。2014 節目單記載時任陳錫仁藝術工作室藝術總監、中臺科技大學專任副教授。" },
      { name: "曾膺安", num: "6951", role: "指揮", concertRole: "指揮《爺爺的大鐘》", concertBio: "1980 至 1983 年就讀嘉義高中並加入管樂隊學習小號，曾服役於國防部示範樂隊。東海大學音樂系主修小號，後於輔仁大學音樂研究所主修樂團指揮；1994 年起任職嘉義市管樂團，擔任指揮及藝術總監。" },
      { name: "盧宓承", num: "7111", role: "指揮", concertRole: "指揮《英雄的證明》", concertBio: "1982 年進入嘉中初習管樂。曾任嘉義高中管樂隊指揮、指導老師，並曾任嘉義市音樂協進會第五及第六屆理事長、嘉義市政府員工合唱團指導老師。2014 節目單記載時任稻江大學專任教職。" },
      { name: "朱慶展", num: "7321", role: "指揮", concertRole: "指揮《萬水千山縱橫》", concertBio: "嘉中豎笛部校友。2014 節目單以「1984 年當紅指揮」介紹，並記載當時在嘉義市文化路經營道地小吃「阿池魷魚肉羹」。" },
      { name: "林中伍", num: "7361", role: "指揮", concertRole: "指揮《那些年，我們一起玩的音樂》", concertBio: "1984 年進入嘉中管樂隊，隨學長開始學習長號。1988 年起參與學校管樂社團教學，1994 年參與建立嘉義市青少年聯合管樂團，曾任分部指導、團員、銅管首席、會計幹事與事務經理等職務。" },
      { name: "翁啟榮", num: "7581", role: "指揮", concertRole: "指揮《在菲利普布利斯的詩歌上》", concertBio: "1986 年進入嘉中管樂隊吹奏低音號，1990 年進入警大並擔任管樂隊室內指揮三年。1991 至 1997 年指導嘉中管樂隊，1994 年起參加嘉義市管樂團擔任低音號手。" },
      { name: "李瑾佑", num: "8192", role: "指揮", concertRole: "指揮《新一日的黎明》", concertBio: "嘉義市人，畢業於嘉義高中、輔仁大學音樂系。高中時期曾任嘉義高中管樂隊指揮，並考上嘉義市青少年管樂團擔任打擊部團員；大學主修小提琴，長期參與弦樂團、管樂團、合唱伴奏與多類型演出。" },
      { name: "鄭鈞元", num: "8431", role: "指揮", concertRole: "指揮《亞美尼亞舞曲（第一部分）》", concertBio: "1995 年進入嘉義高中參加管樂社開始接觸薩克斯風。大學就讀臺灣藝術大學音樂系，退伍後赴法國國立馬爾梅松音樂院及馮特內蘇布瓦市立音樂院深造，2009 年獲薩克管、室內樂第一獎演奏文憑及音樂教育文憑。" },
      { name: "丁肇賢", num: "8501", role: "指揮", concertRole: "指揮《天馬座的飛行》", concertBio: "就讀嘉義高中時期開始接觸管樂並學習低音號，曾任隊長並參加銅管五重奏比賽獲優等。就讀淡江大學時受陳一夫老師啟蒙學習指揮，後連續三年擔任學生指揮；2014 節目單記載時任台北校友管樂團藝術總監、藝研國際有限公司業務主任。" },
      { name: "簡晟軒", num: "8861", role: "指揮", concertRole: "指揮《阿巴金曲》", concertBio: "嘉義縣新港人，1999 年就讀嘉義高中學習長號。曾就讀高雄師範大學音樂系、德國萊比錫音樂院，並於 2012 年取得長號演奏家文憑；回國後積極參與樂團演出及南部地區管樂教學。" },
      { name: "林唐禾", num: "8993", role: "指揮", concertRole: "指揮《諸神的命運》", concertBio: "畢業於嘉義國中音樂班、嘉義高中音樂班、國立臺北教育大學音樂系，研究所畢業於國立臺灣師範大學音樂研究所指揮組。高中期間加入嘉義高中管樂隊學習打擊樂並擔任學生指揮，2014 節目單記載時任國立臺灣大學醫學院杏林管弦樂團指揮。" }
    ],
    soloists: [],
    program: [
      {
        title: "木犀草序曲",
        foreignTitle: "Mignonette Overture",
        credit: "J. Baumann",
        conductor: "陳錫仁",
        status: "confirmed",
        description: "節目單記載，鮑曼的《木犀草序曲》在 1960 年代臺灣南部管樂風氣尚在萌芽、樂譜資源缺乏的年代，是一首令人耳目一新的作品。它以正式編制、優美旋律、較複雜的結構節奏及變化性的速度與和聲進行，標誌著管樂隊不只服務升降旗與典禮，也能演奏具有藝術價值的作品；嘉中樂隊曾以此曲作為省賽自選曲並獲優等第一。"
      },
      {
        title: "爺爺的大鐘",
        foreignTitle: "Grandfather's Clock",
        credit: "Henry Clay Work, arr. 山下國俊",
        conductor: "曾膺安",
        status: "confirmed",
        description: "美國歌曲《Grandfather's Clock》由 Henry Clay Work 作詞作曲，1876 年發表，當時在美國境內發行超過百萬份樂譜。節目單轉述其創作典故：英國約克郡與達勒姆郡邊緣一間旅館大廳的擺鐘，在經營旅館的兄弟相繼離世後逐漸故障並停止運作；Work 於 1875 年旅行英國時聽聞此故事，據此創作此曲。"
      },
      {
        title: "英雄的證明",
        foreignTitle: "英雄の証",
        credit: "甲田雅人, arr. 森田一浩",
        conductor: "盧宓承",
        status: "confirmed",
        description: "本曲為 CAPCOM 動作遊戲《魔物獵人》系列配樂之一。節目單介紹，遊戲以狩獵各式怪物為主，場景涵蓋雪山、樹林、沙漠與火山等自然環境；配樂為呼應場景與戰鬥而具多變風格與高水準作曲演奏效果。CAPCOM 亦曾於 2009、2011、2012 年舉辦「狩獵音樂祭」巡迴音樂會，以管弦樂現場演奏遊戲配樂並搭配燈光與畫面。"
      },
      {
        title: "萬水千山縱橫",
        credit: "顧嘉煇曲，黃霑詞，馮朝君編",
        conductor: "朱慶展",
        status: "confirmed",
        description: "《萬水千山縱橫》為 1982 年香港電視劇《天龍八部之虛竹傳奇》主題曲。節目單介紹，該劇由香港電視廣播有限公司製作，改編自金庸小說《天龍八部》，臺灣台視於 1983 至 1984 年播出國語配音版本，也是臺灣老三台「港劇熱潮」中的重要作品；節目單並以幽默語氣記錄此曲當年在嘉中新生間的流行記憶。"
      },
      {
        title: "那些年，我們一起玩的音樂",
        credit: "進行曲組曲，林中伍編",
        conductor: "林中伍",
        status: "confirmed",
        description: "指揮林中伍親自編寫的進行曲組曲，回望嘉中軍樂隊時期大量吹奏進行曲的共同記憶。節目單描述，當年的隊員會從文音第一頁的〈國歌〉吹到最後一頁的〈印凡卡其爾〉，不同聲部的譜也互相拿來練；本曲將國徽、起錨、巡邏兵、陸戰隊、砲兵、中華、學生軍、拉黛斯基、雷神、威風凜凜等進行曲素材摻在一起。"
      },
      {
        title: "在菲利普布利斯的詩歌上",
        foreignTitle: "On a Hymnsong of Philip Bliss",
        credit: "David R. Holsinger",
        conductor: "翁啟榮",
        status: "confirmed",
        description: "Philip Paul Bliss 是美國基督教詩歌作家與福音音樂歌手。作曲家 David R. Holsinger 以 Bliss 所作〈It Is Well with My Soul〉旋律為基礎加以變奏與發展，完成這首使人心靈平靜的小品；節目單也指出，本曲同時考驗管樂團的音準、和聲與音色。"
      },
      {
        title: "新一日的黎明",
        foreignTitle: "Dawn of a New Day",
        credit: "James L. Swearingen",
        conductor: "李瑾佑",
        status: "confirmed",
        description: "James L. Swearingen 是美國當代音樂教育學者、作曲家和編曲家，曾任美國首都大學音樂教育系主任。節目單介紹，其作品廣泛出現在美國及世界各級學校管樂團中，多為長度不超過十分鐘、快慢快三段結構、旋律簡明且具教育訓練用途的作品；《新一日的黎明》為其創作風格代表之一。"
      },
      {
        title: "亞美尼亞舞曲（第一部分）",
        foreignTitle: "Armenian Dances (Part 1)",
        credit: "Alfred Reed",
        conductor: "鄭鈞元",
        status: "confirmed",
        description: "Alfred Reed 於 1972 年發表《Armenian Dances (Part 1)》，素材來自亞美尼亞傳教士兼音樂學者 Komitas Vardapet 採集的亞美尼亞民謠。節目單列出全曲五段：〈杏樹〉、〈鷓鴣之歌〉、〈嘿，我的娜桑〉、〈阿拉雅茲山〉與〈去吧！去吧！〉，並指出作曲家在不破壞民謠精神的前提下，發揮管樂團音響效果，是管樂經典作品。"
      },
      {
        title: "天馬座的飛行",
        foreignTitle: "Flight of Pegasus",
        credit: "David Shaffer",
        conductor: "丁肇賢",
        status: "confirmed",
        description: "David Shaffer 於 1994 年發表此曲，靈感來自希臘神話的飛馬 Pegasus。節目單介紹，Pegasus 從美杜莎頸腔噴出的血中誕生，後來被雅典娜馴服並贈給柏勒洛豐，最終成為天馬座。曲子前段以快速號角與旋律線象徵刺激的飛行，中段轉為慢板與三拍華爾茲，像在繆思之泉旁歇息，最後接回快速終段直衝天際。"
      },
      {
        title: "阿巴金曲",
        foreignTitle: "ABBA Gold",
        credit: "ABBA, arr. Ron Sebregts",
        conductor: "簡晟軒",
        status: "confirmed",
        description: "ABBA 是 1970 年代瑞典流行樂代表團體，1974 年以〈Waterloo〉獲歐洲歌唱大賽冠軍後風靡歐洲與世界樂壇。節目單介紹，本曲以 ABBA 四首名曲編成，依序為〈Dancing Queen〉、〈Mamma Mia〉、〈Fernando〉與〈The Winner Takes It All〉，並註明 2014 年正逢 ABBA 獲歐洲歌唱大賽冠軍 40 週年。"
      },
      {
        title: "諸神的命運",
        foreignTitle: "Fate of the Gods",
        credit: "Steven Reineke",
        conductor: "林唐禾",
        status: "confirmed",
        description: "Steven Reineke 以北歐神話中的「諸神的黃昏」為題材創作此曲。節目單介紹，Ragnarok 描寫諸神與巨人、洛基等勢力的大戰及隨之而來的自然浩劫，世界沉入水底後又復甦重建。音樂隨故事進行可分成四大段落：末日的預兆、戰爭前夕、末日之戰與新世界。"
      }
    ],
    programNote: "指揮、曲目、作曲／編曲資訊與曲目介紹依 2014 年《嘉中校聯節目單-指揮+曲介 V2.01》整理；原檔每位指揮對應一首曲目。",
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/2014.webp",
    page: "concerts/2014-30th.html",
    gallery: [],
    videos: [
      { label: "第 30 屆《３０而礫》錄影清單", url: "https://youtube.com/playlist?list=PLAVnw2heYVvn5-dmQCDPpVOIpMu5hdO5J", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: [
      "concerts.html",
      SOURCE_SOCIAL_VIDEO_LIST,
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/2014年第30屆/2014嘉中校聯節目單-指揮+曲介V2.01.doc"
    ],
    sourceNote: "本頁指揮介紹、曲目、指揮對應曲目與樂曲解說，整理自 2014 年《嘉中校聯節目單-指揮+曲介 V2.01》；日期、時間、場地與完整演出人員名單仍待海報、節目冊定稿或校友資料補齊。",
    status: "partial",
    notes: "社群錄影清單作《３０而礫》；現有主頁與海報替代文字作《三十而樂》。2014 年節目單草稿已可考 11 位指揮與各自對應曲目；日期、時間、場地與完整演出人員名單仍待補。"
  },
  {
    id: "2013-29th",
    nth: 29,
    year: 2013,
    rocYear: 102,
    title: "第 29 屆聯合音樂會",
    subtitle: "",
    aliases: ["２９"],
    date: "2013-08-23",
    time: "19:30",
    venue: "嘉義市政府文化局音樂廳",
    venueNote: "",
    hostHead: "",
    intro: [
      "嘉中管樂隊自民國 74 年（1985）起，每年暑假集合校友與在校生共同排練演出，「讓地方藝文界和學校更了解管樂發展趨勢」；至 2013 年已連續舉辦 28 年從未中斷，是嘉義表演藝術活動中深具特色的一道風景。第 29 屆的三大宗旨為：讓畢業隊友重溫高中時代情誼；藉正式音樂會之演出及排練，提升在校生的演奏及行政能力；以免票入場方式，倡導管樂欣賞與正當休閒之風氣。",
      "「嘉義高中校友管樂團」於民國 97 年（2008）9 月正式登記成立為嘉義市藝文團體，本屆是立案後第 5 年舉辦的聯演。籌備期間每週週末團練，演出前 8 月 20 日至 22 日連續三天集訓，8 月 23 日當天下午裝台彩排、晚間正式演出。",
      "新聞稿指出，本屆在曲目與演出形式上嘗試更多面向：上半場安排管樂經典、協奏曲、歌劇與古典改編作品；下半場則轉向音樂劇、電影配樂與流行歌曲，並交織管樂合奏與室內樂重奏。演出後進度報告記錄實際安可為《Yesterday》與《Do You Hear the People Sing?》，錄影清單於 2013 年 8 月 28 日公布。"
    ],
    planningNotes: [
      "《展望2013校聯之淺見》記錄了校聯作為「嘉義高中管樂隊校友暨在校生聯合音樂會」的核心精神：演出人員以嘉中管樂隊校友與在校生為主，透過集訓與正式演出讓在校生精進演奏與行政能力，也讓校友重溫合奏經驗。該文並整理總召、人事、譜務、財務、文書、舞監等行政分工，是理解 2013 前後校聯運作方式的重要文件。"
    ],
    planningRows: [
      { date: "2013.07.01-08.19", detail: "企劃書規劃每週週末於嘉義高中管樂隊團練室進行合奏練習，由指揮針對樂曲修潤；各聲部另自行約定分部練習。" },
      { date: "2013.07.20", detail: "進度報告記錄海報、DM、入場券送學明付印；設計費為 3,000 元。" },
      { date: "2013.07.21", detail: "進度報告公告曲目及曲順更新，並持續以 Google 雲端硬碟與學明 FTP 分享樂譜電子檔、示範錄音與 MIDI。" },
      { date: "2013.08.16", detail: "在校生募款截至本日共募得 15,400 元，並列出地方店家與補習班贊助單位。" },
      { date: "2013.08.20-08.22", detail: "企劃書規劃連續三天集訓；進度報告同日記錄線上節目單已完成上傳與校稿。" },
      { date: "2013.08.23", detail: "演出日：下午裝台、彩排，晚上 19:30 正式演出；進度報告記錄實際演出曲目與兩首安可曲。" },
      { date: "2013.08.28", detail: "進度報告記錄演出實況已上傳 YouTube，並取消置頂公告。" }
    ],
    conductors: [
      { name: "鄭鈞元", num: "8431", role: "指揮", concertRole: "樂團指揮", concertBio: "民國 84 年（1995）進入嘉義高中管樂社開始接觸薩克斯風，大學就讀國立臺灣藝術大學音樂系，師事顏慶賢老師，畢業後進入國防部示範樂隊服役。退伍後赴法國就讀法國國立馬爾梅松音樂院及馮特內蘇布瓦市立音樂院，師事丹尼爾．葛梅勒與克里斯丁．沃特二位大師，於 2009 年獲得薩克管、室內樂第一獎演奏文憑以及音樂教育文憑。2013 年時任南華大學民族音樂學系講師、嘉義高中管樂社指導老師，並擔任雲嘉南多所國中小學管樂團薩克管分部老師。" },
      { name: "陳錫仁", num: "6301", role: "客席指揮／小號獨奏", concertRole: "客席指揮／小號獨奏", concertBio: "畢業於嘉義高中並曾任嘉中管樂隊隊長，啟蒙於謝北光老師，1982 年畢業於國立臺灣師範大學音樂系，為該系首位主修小號者。1991 年以優異成績獲得美國聖保羅大學音樂學院（The School of Music at DePaul University）小號演奏碩士學位，成為國人首位獲得此樂器演奏碩士文憑者。1993 年創立台灣銅管五重奏團並任團長，2000 年創立陳錫仁藝術工作室並任藝術總監，2001 年創立陳錫仁銅管樂集（國內首創常設性銅管合奏樂團），2002 年創立爵品爵士樂團。曾率團赴加拿大溫哥華與多倫多（2003）、美國洛杉磯（2004）演出；2008 年出版《小號演奏藝術研究》，為華人世界第一本小號演奏專業著作，2012 年再出版《小號初學者入門研究》與《小號練習方法研究》。曾任教於國立臺灣師範大學、國立臺中教育大學、國立嘉義大學、輔仁大學、東海大學音樂系及各級學校音樂班，並任台北醫學大學管弦樂團、中原大學管樂團等多個樂團指揮，亦曾擔任多屆全國音樂比賽評審。2013 年時任陳錫仁藝術工作室藝術總監、中臺科技大學專任副教授。" },
      { name: "簡晟軒", num: "8861", role: "助理指揮", concertRole: "助理指揮", concertBio: "嘉義新港人，民國 88 年（1999）進入嘉中樂隊始習長號，啟蒙於宋光清老師，師事高崇文老師。2002 年於高師大音樂系師事蔡佳融老師，2009 年於德國萊比錫音樂院師事 Helge von Niswandt 教授，2012 年取得該院長號演奏家文憑。2013 年時任嘉義市嘉義高工、嘉義高中、嘉義家職、世賢國小、垂楊國小、博愛國小、嘉北國小等校管樂團，以及高雄市正興國中管弦樂團長號及銅管分部教師。" },
      { name: "蔡淳任", num: "9202", role: "助理指揮", concertRole: "助理指揮／執行秘書．舞台監督", concertBio: "第一屆北興國中管樂班校友，先後畢業於嘉義高中與臺灣大學政治系。自國中起受段正泰老師啟蒙學習小號，高中加入嘉義高中管樂社，曾任副社長。大學時期加入臺大管樂團與幻響管樂團，受臺大管樂團指導老師劉紹棟與幻響管樂團指揮張穎中影響，開始學習指揮，曾任北興國中管樂班校友團及北興國中管樂團指揮。本屆同時擔任助理指揮與執行秘書／舞台監督。" }
    ],
    soloists: [{ name: "陳錫仁", num: "6301", instrument: "小號", work: "Haydn Trumpet Concerto in E-flat" }],
    performers: [
      { name: "盧宓承", num: "7111", role: "長笛聲部" },
      { name: "黃耀瑩", num: "8912", role: "雙簧管聲部" },
      { name: "葉哲良", num: "9721", role: "單簧管聲部" },
      { name: "鄭鈞元", num: "8431", role: "薩克斯風聲部" },
      { name: "魏仕杰", num: "8841", role: "法國號聲部" },
      { name: "洪筱涵", num: "9841", role: "法國號聲部" },
      { name: "蔡淳任", num: "9202", role: "小號聲部" },
      { name: "高健雄", num: "7901", role: "長號聲部" },
      { name: "高崇文", num: "8301", role: "長號聲部" },
      { name: "簡晟軒", num: "8861", role: "長號聲部" },
      { name: "方崇任", num: "9261", role: "長號聲部" },
      { name: "張永澤", num: "9601", role: "長號聲部" },
      { name: "蔡政岳", num: "9701", role: "長號聲部" },
      { name: "王騰寬", num: "8982", role: "上低音號聲部" },
      { name: "翁啟榮", num: "7581", role: "低音號聲部" },
      { name: "丁肇賢", num: "8501", role: "低音號聲部" }
    ],
    performerGroups: [
      { role: "長笛", people: ["7111 盧宓承", "9311 蔡沛霖", "9312 李子沛", "9611 張容慈"] },
      { role: "雙簧管", people: ["8912 黃耀瑩"] },
      { role: "巴松管", people: ["8711 劉怡汝"] },
      { role: "單簧管", people: ["7921 莊富益", "8603 江俊漢", "8621 蔡嘉偉", "8722 張羽嫻", "8901 黃信又", "8922 陳正龍", "9122 吳瑩娟", "9321 吳宜靜", "9521 何寧賢", "9721 葉哲良"] },
      { role: "薩克斯風", people: ["7222 李吉峯", "8431 鄭鈞元", "8632 江嘉榮", "8832 陳韋志", "9331 郭軒竑"] },
      { role: "法國號", people: ["8841 魏仕杰", "9302 洪敏睿", "9741 廖恆毅", "9841 洪筱涵"] },
      { role: "小號", people: ["6951 曾膺安", "8101 陳明陽", "8401 楊宗臻", "8601 古峻錡", "8651 劉全盛", "9202 蔡淳任", "9451 蔡育修", "9751 黃柏叡"] },
      { role: "長號", people: ["7901 高健雄", "8301 高崇文", "8861 簡晟軒", "9261 方崇任", "9601 張永澤", "9701 蔡政岳"] },
      { role: "上低音號", people: ["6801 游宗仁", "8671 吳仁庭", "8982 王騰寬"] },
      { role: "低音號", people: ["7581 翁啟榮", "8501 丁肇賢", "9702 李旻其"] },
      { role: "打擊", people: ["8192 李瑾佑", "9392 林祐成", "9691 袁舴", "9791 陳建宇", "9792 蔣承哲"] }
    ],
    performerNote: "全體演出人員（含編號）如下。節目冊原文註明「篇幅所限，以上僅列出部分團員」，全團演出規模約 80 人；本表為節目冊中留有編號紀錄之演出者，如與其他頁面編號略有出入（節目冊內部亦偶見同一人在不同段落編號誤植，如上低音號王騰寬另處誤植為 8981），已忠實依原始文件轉錄，歡迎校友協助勘誤補充。",
    performerSupplementGroups: [
      { role: "指揮／獨奏", people: ["8431 鄭鈞元", "6301 陳錫仁（指揮／小號獨奏）", "8861 簡晟軒（助理指揮）", "9202 蔡淳任（助理指揮）"] },
      { role: "長笛", people: ["7111 盧宓承", "9001 許景斌", "9611 張容慈", "0001 陳政宏", "100-周億琳"] },
      { role: "雙簧管", people: ["8912 黃耀瑩"] },
      { role: "低音管", people: [] },
      { role: "單簧管", people: ["7222 李吉峰", "8921 洪瑋辰", "8922 陳正龍", "9122 吳瑩娟", "9321 吳宜靜", "9721 葉哲良", "9802 李亞璿", "9902 趙耘浩", "9921 劉炫廷", "101-楊承翰"] },
      { role: "薩克斯風", people: ["101-李旻珊", "101-蘇劭銘", "101-張信勳", "101-王家弦"] },
      { role: "法國號", people: ["7401 吳金河", "7503 蔡文立", "8841 魏仕杰", "9801 高士涵"] },
      { role: "小號", people: ["7571 陳昌遠", "8401 楊秉驊", "8601 古峻錡", "9202 蔡淳任", "9903 陳信慈", "101-閻冠雲", "101-林季陽", "101-吳唯嘉"] },
      { role: "長號", people: ["7901 高健雄", "7962 范庭福", "8861 簡晟軒", "9601 張永澤", "9661 謝梓嫣", "101-林宗穎"] },
      { role: "上低音號", people: ["6801 游宗仁", "8171 張傑銘", "8671 吳仁庭", "101-顏煌欽"] },
      { role: "低音號", people: ["7581 翁啟榮", "101-葉韋廷"] },
      { role: "打擊", people: ["8302 鄧杰翔", "8991 陳英杰", "899? 黃楷澍", "9392 林祐成", "9491 游茗偉", "0091 王耀德", "101-陳柏凱", "101-陳毓廸"] }
    ],
    performerSupplementNote: "社群協作名單補充依 2013 年 7 月 26 日「2013第29屆校聯演出人員名單」整理。此表屬演出前自填資料，含正式節目冊未列者、原檔作 100-/101- 的在校生標記，以及待確認之編號（如 899?）；因此不取代正式節目冊名單，僅作歷史資料留存與後續校對線索。",
    adminRows: [
      { role: "團長", people: ["6401 馮朝君"], duty: "統整團務與演出行政事務" },
      { role: "音樂會總籌", people: ["8841 魏仕杰"], duty: "專責籌劃本屆聯演所有相關事宜，並擔任節目冊編校" },
      { role: "文書", people: ["8481 羅碩文"], duty: "節目單撰寫、文書庶務處理" },
      { role: "財務", people: ["8802 劉議謙"], duty: "處理各項收支、記帳並徵信" },
      { role: "譜務", people: ["7962 范庭福"], duty: "準備演出與排練所需之所有樂譜" },
      { role: "美宣", people: ["9721 葉哲良"], duty: "海報、節目單封面設計與宣傳" },
      { role: "執行秘書／舞台監督", people: ["9202 蔡淳任"], duty: "兼任助理指揮" }
    ],
    program: [
      { section: "上半場", title: "春之獵犬", foreignTitle: "The Hounds of Spring", credit: "阿弗烈．呂德 Alfred Reed", status: "confirmed", description: "呂德（1912-2005）為美國著名管樂作曲家、編曲家及教育家，一生創作超過兩百五十首作品，涵蓋管樂、管弦樂、合唱及室內樂，並曾受臺灣小號演奏家葉樹涵教授委託創作小號協奏曲。《春之獵犬》完成於 1979 年冬，為加拿大約翰佛斯特高中（John L. Forster Secondary School）交響管樂團委託創作，靈感源自英國詩人 Algernon Charles Swinburne 據希臘悲劇寫成的長詩〈Atalanta in Calydon〉，開頭第一行「當春之獵犬沿著冬天的足跡來到」即為曲名由來。全曲以快-慢-快三段序曲形式，呈現青春的喜悅與愛的溫柔天真，最終兩段主題交融、光輝燦爛地劃下句點。" },
      { section: "上半場", title: "小號協奏曲，降 E 大調", foreignTitle: "Trumpet Concerto in E-flat major", credit: "海頓曲，藍波洛編 Haydn, arr. Rumbelow（小號獨奏：陳錫仁）", status: "confirmed", description: "海頓（1732-1809）被譽為交響樂之父、弦樂四重奏之父。這首協奏曲寫於 1796 年，海頓 64 歲時應安東．魏丁格之邀，為其新發明的按鍵小號所作，也是海頓最後的協奏曲作品，原由管弦樂團伴奏，今晚演出藍波洛改編給小編制管樂團伴奏的版本。全曲依快-慢-快佈局：第一樂章為典型奏鳴曲式，第二樂章絃樂先奏出西西里舞曲節奏主題再由小號重覆，第三樂章為輪旋曲式終樂章，最後接上小號裝飾奏，於樂團齊奏中結束全曲。" },
      { section: "上半場", title: "英國民謠組曲，第三樂章：薩默塞特民歌", foreignTitle: "English Folk Song Suite - III. Folk Songs from Somerset", credit: "佛漢．威廉斯 Vaughan Williams", status: "confirmed", description: "佛漢．威廉斯（1872-1958）為英國作曲家與民謠收集家。此曲 1923 年由作曲家根據英格蘭地方民謠改編，最初稱《民謠組曲》，1924 年其學生高登．雅科布再改編並經同意使用長名稱《英國民謠組曲》，由進行曲、間奏曲、進行曲三樂章組成。今晚僅演出第三樂章（同時也是 102 學年度學生音樂比賽指定曲之一），複合三段式結構融入〈吹走朝露〉〈高地德國〉〈口哨，女兒，口哨〉〈約翰．巴里空〉四首民謠，以 A-B-A→C-D-C-D→A-B-A 的形式串聯。" },
      { section: "上半場", title: "曼佐尼安魂曲選粹", foreignTitle: "Manzoni Requiem Excerpts", credit: "威爾第曲，莫倫豪爾編 Verdi, arr. Mollenhauer", status: "confirmed", description: "威爾第（1813-1901）今年（2013）適逢誕生兩百週年紀念。《安魂曲》作於 1873-1874 年間，為紀念摯友、19 世紀歐洲浪漫主義文學代表人物曼佐尼（Alessandro Manzoni, 1785-1873）而作，於曼佐尼逝世一周年（1874）在米蘭首演，原曲共七樂章。今晚演出的管樂版，由美國編曲家莫倫豪爾從第二樂章（續抒詠）中選出〈神怒之日〉〈號角之聲〉〈我的救主〉〈我罪極深〉〈威耀之王〉五個段落編成。" },
      { section: "下半場", title: "悲慘世界", foreignTitle: "Les Miserables", credit: "荀伯格曲，彼得斯編 Schonberg, arr. Peeters", status: "confirmed", description: "改編自法國作家雨果 1862 年發表的同名長篇小說，最著名的改編作品是法國音樂劇作曲家荀伯格與作詞家阿蘭．鮑伯利於 1980 年共同創作的同名音樂劇；2012 年翻拍為電影版，由休傑克曼、安海瑟薇、羅素克洛主演，於 2013 年春節檔期在臺上映。今晚演出版本由彼得斯挑選音樂劇中〈序曲〉〈一日將盡〉〈我曾有夢〉〈雲端城堡〉〈酒店主人〉〈與我共飲〉〈你可聽見人民在歌唱〉等名曲，依管弦樂版原調性改編而成。" },
      { section: "下半場", title: "當你向星星許願", foreignTitle: "When You Wish Upon a Star", credit: "哈林曲，小山恭弘編 Harline, arr. Koyama", status: "confirmed", description: "由長笛、豎笛、薩克管組成的木管室內樂，加上爵士鼓，重新演繹迪士尼動畫《木偶奇遇記》主題曲；此曲曾獲 1940 年第 13 屆奧斯卡金像獎最佳電影原創歌曲獎。" },
      { section: "下半場", title: "唱唱唱", foreignTitle: "Sing Sing Sing", credit: "普利馬曲，高橋宏樹編 Prima, arr. Takahashi", status: "confirmed", description: "經典搖擺（Swing）爵士樂名曲，自 1936 年問世後廣泛出現於爵士樂界、演出、廣告與電影等場合，今晚由小號、法國號、長號、上低音號、低音號組成的銅管家族，搭配經典爵士鼓節奏共同演出。" },
      { section: "下半場", title: "《那些年，我們一起追的女孩》歌曲集", foreignTitle: "Songs from You Are the Apple of My Eye", credit: "陳揚、胡夏曲，陳昶安編", status: "confirmed", description: "電影由九把刀原著、編劇、導演，2011 年臺北電影節首映並獲國際青年導演競賽觀眾票選獎，亦於港澳、新加坡、馬來西亞、中國大陸上映，成為香港華語電影史上最賣座電影，並於 2012 年第 31 屆香港電影金像獎獲選兩岸最佳華語電影，柯震東憑本片獲第 48 屆金馬獎最佳新演員。今晚演出電影中最紅的兩首歌曲：林育群翻唱殷正洋的〈人海中遇見你〉，以及胡夏主唱的主題曲〈那些年〉。" },
      { section: "下半場", title: "寶島", foreignTitle: "Takarajima", credit: "和泉宏隆曲，真島俊夫編 Izumi, arr. Mashima", status: "confirmed", description: "日本融合爵士（Fusion）天團 T-Square（方格子樂團）1976 年由吉他手安藤正容創團，1982 年鍵盤手和泉宏隆加入後成為當家鍵盤手，與安藤正容共同成為創作核心，樂團連續五年獲日本金唱片大賞 Fusion 爵士獎項年度最佳專輯，並四度拿下最佳爵士專輯獎。〈Takarajima〉發行於 1995 年，是和泉宏隆的代表作之一。" },
      { section: "安可", title: "Yesterday", credit: "進度報告記錄之安可曲", status: "confirmed" },
      { section: "安可", title: "Do You Hear the People Sing?", credit: "進度報告記錄之安可曲", status: "confirmed" }
    ],
    programNote: "曲目與樂曲解說整理自 2013 年正式節目冊（撰文／張婷婷，資料來源／維基百科與網路資料，編校／魏仕杰，時任音樂會總籌）。安可曲依 2013 年 8 月 23 日進度報告補入。籌備前期的企劃書與新聞稿曾預告華格納《唐懷瑟》選段、曼焦《桑契斯之子》等曲目，惟依正式節目冊與海報記載，最終定案曲目如上，主辦單位並保有曲目更動之權利。",
    ticket: { type: "free-ticket", price: "0", channels: ["嘉義市政府文化局服務台", "主辦單位"], note: "免費索票入場；19:00 開放入場" },
    poster: "assets/img/concerts/2013.webp",
    page: "concerts/2013-29th.html",
    gallery: [],
    photos: [
      { src: "assets/img/gallery/2013/0823-01t.webp", full: "assets/img/gallery/2013/0823-01.webp", caption: "全團於嘉義市政府文化局音樂廳舞台合影" }
    ],
    promoImages: [
      { src: "assets/img/concerts/2013-fb-banner.webp", caption: "第 29 屆校友暨在校生聯合音樂會 FB Banner" }
    ],
    programBook: [
      { src: "assets/img/concerts/2013-program/page-01.webp", caption: "2013 正式節目冊：封面" },
      { src: "assets/img/concerts/2013-program/page-02.webp", caption: "2013 正式節目冊：指導、主辦與節目資訊" },
      { src: "assets/img/concerts/2013-program/page-03.webp", caption: "2013 正式節目冊：前言" },
      { src: "assets/img/concerts/2013-program/page-04.webp", caption: "2013 正式節目冊：團員名單與簡介" },
      { src: "assets/img/concerts/2013-program/page-05.webp", caption: "2013 正式節目冊：團員名單與簡介" },
      { src: "assets/img/concerts/2013-program/page-06.webp", caption: "2013 正式節目冊：樂團指揮／客席指揮介紹" },
      { src: "assets/img/concerts/2013-program/page-07.webp", caption: "2013 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2013-program/page-08.webp", caption: "2013 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2013-program/page-09.webp", caption: "2013 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2013-program/page-10.webp", caption: "2013 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2013-program/page-11.webp", caption: "2013 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2013-program/page-12.webp", caption: "2013 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2013-program/page-13.webp", caption: "2013 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2013-program/page-14.webp", caption: "2013 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2013-program/page-15.webp", caption: "2013 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2013-program/page-16.webp", caption: "2013 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2013-program/page-17.webp", caption: "2013 正式節目冊：贊助與協力單位" },
      { src: "assets/img/concerts/2013-program/page-18.webp", caption: "2013 正式節目冊：贊助與協力單位" },
      { src: "assets/img/concerts/2013-program/page-19.webp", caption: "2013 正式節目冊：贊助與協力單位" },
      { src: "assets/img/concerts/2013-program/page-20.webp", caption: "2013 正式節目冊：封底" }
    ],
    sponsorParagraphs: [
      "特別感謝嘉義市政府文化局、國立嘉義高中之指導；協力廠商為學明影印、DRINK 雋可樂活茶飲新生店。",
      "本屆演出並獲得在地三十家店家與補習班贊助支持（依單位名稱筆劃順序排列）：二丫頭麻辣涼麵、力新補習班、小杜吉美術社、天才美術社、台北江麻辣臭豆腐、正義蚵仔麵線、立碁補習班、百鴻畫廊、利特髮廊、宏泰物理、李揚數學、味好麵食館、味鮮小吃、明興補習班、沱江小館、哈牛排、故鄉牛排館、洗鞋家、皇家豆花、食尚輕食生活餐飲、陳建宏化學、頂好麵食館、道成補習班、嘉興牙醫診所、舞醬館、諸羅山五金、羅文公民。",
      "進度報告另保存校友與在校生募款紀錄：在校生截至 2013 年 8 月 16 日共募得 15,400 元；6401、7782、8481、7951、7502、7401、7581、7981 等校友亦分別贊助不指定用途、樂譜費、慶功宴餐費、飲料或其他支出。此處依原始進度報告概述保存，詳細帳務仍以當年公開徵信資料為準。"
    ],
    videos: [
      { label: "第 29 屆《２９》錄影清單", url: "https://youtube.com/playlist?list=PLc3LYZ21H4qkLOi9_u0uwB7Q3EDJuOsv1", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: [
      "concerts.html",
      "concerts/2013-29th.html",
      SOURCE_SOCIAL_VIDEO_LIST,
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20130823｜29屆/行政資料/節目單/2013節目單.pdf",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20130823｜29屆/行政資料/2013嘉中校友聯演企劃書 for文化局.doc",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20130823｜29屆/行政資料/嘉中校友管樂團新聞稿.doc",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20130823｜29屆/~8:28更新~ 2013第29屆校友聯演進度報告.md",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20130823｜29屆/2013第29屆校聯演出人員名單(自行填寫，並請各聲部聯絡人協助更新).md",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20130823｜29屆/魏仕杰-展望2013校聯之淺見.docx"
    ],
    sourceNote: "本頁正式曲目、演出人員、指揮與場地資訊以 2013 年正式節目冊為主；活動宗旨、排練時程、工作執掌與預算脈絡參考演出企劃書；新聞稿補充對外宣傳說法；進度報告補入實際安可曲、募款與演出後錄影公告；社群自填名單僅作正式節目冊外的補充校對線索。如需更正或補充演出照片，歡迎透過粉絲專頁與我們聯繫。",
    status: "confirmed",
    notes: "全團約 80 人；正式節目冊資料完整，並已補入節目冊影像、FB Banner、進度報告與社群自填名單。"
  },
  {
    id: "2012-28th",
    nth: 28,
    year: 2012,
    rocYear: 101,
    title: "追憶-榮耀",
    subtitle: "",
    date: "2012-08-31",
    time: "19:30",
    venue: "嘉義市文化局音樂廳",
    venueNote: "今嘉義市政府文化局音樂廳",
    hostHead: "96 字頭",
    organizers: [{ name: "張永澤", num: "9601", role: "財務" }],
    conductors: [
      {
        name: "鄭鈞元",
        num: "8431",
        role: "樂團指揮",
        concertBio: "民國 84 年進入嘉義高中參加管樂社開始接觸薩克斯風，大學就讀於台灣藝術大學音樂系，師事顏慶賢老師。畢業後進入國防部示範樂隊，退伍後赴法國就讀法國國立馬爾梅松音樂院及馮特內蘇布瓦市立音樂院，於 2009 年獲得薩克管、室內樂第一獎演奏文憑以及音樂教育文憑。2012 年時任南華大學民族音樂學系講師、嘉義高中管樂社指導老師及雲嘉南多所國中小學管樂團薩克管分部老師。"
      },
      {
        name: "丁肇賢",
        num: "8501",
        role: "樂團指揮",
        concertBio: "民國 85 年進入嘉義高中參加管樂社開始接觸低音號，曾師事段富軒教授、何佶老師、湯志偉老師。就讀淡江大學期間加入該校管樂團，擔任低音號聲部負責人以及樂團助理指揮，指揮技巧啟蒙於陳一夫老師，並受多位中生代指揮影響。2010 年接受美國辛辛那提音樂院主任 Rodney Winther 教授指導。2012 年時任新北市立金山高級中學管樂團、桃園大有國中管樂團指導老師。"
      }
    ],
    soloists: [
      {
        name: "李子沛",
        num: "9312",
        instrument: "長笛",
        work: "Divertimento for Flute and Band",
        role: "長笛獨奏／留法青年長笛家",
        concertBio: "1988 年生於嘉義市，就讀嘉義市立嘉義國中音樂班、國立嘉義高中音樂班，畢業後赴法國巴黎深造。2012 年時就讀巴黎師範音樂院最高長笛獨奏家文憑，師事現代樂長笛大師 Pierre-Yves Arthaud 和巴黎高等音樂院助教 Couix Yoann；旅法期間多次參與音樂會，並通過長笛演奏、教育文憑等考試。"
      }
    ],
    performerGroups: [
      { role: "指揮", people: [{ name: "鄭鈞元", num: "8431" }, { name: "丁肇賢", num: "8501" }] },
      { role: "獨奏", people: [{ name: "李子沛", num: "9312", role: "長笛" }] },
      { role: "長笛", people: [{ name: "盧宓承", num: "7111" }, { name: "高健雄", num: "7901" }, { name: "李子沛", num: "9312" }, { name: "陳譽晨" }, { name: "陳政宏" }] },
      { role: "雙簧管", people: [{ name: "黃耀瑩", num: "8912" }] },
      { role: "低音管", people: [{ name: "劉怡汝" }, { name: "程旻稜" }] },
      { role: "單簧管", people: [{ name: "李吉峰" }, { name: "蔡嘉偉" }, { name: "吳瑩娟" }, { name: "葉哲良", num: "9721" }, { name: "李亞璿" }, { name: "趙耘浩" }, { name: "劉炫廷", num: "9921" }] },
      { role: "薩克管", people: [{ name: "鄭鈞元", num: "8431" }, { name: "江嘉榮" }, { name: "陳韋志" }, { name: "陳韋希" }, { name: "龔昱銘" }, { name: "詹凱婷" }] },
      { role: "法國號", people: [{ name: "吳金河" }, { name: "洪敏睿" }, { name: "高士涵" }, { name: "洪筱涵", num: "9841" }] },
      { role: "小號", people: [{ name: "楊秉驊", num: "8401" }, { name: "古峻錡" }, { name: "劉全盛" }, { name: "蔡淳任", num: "9202" }, { name: "蔡育修" }, { name: "陳信慈" }] },
      { role: "長號", people: [{ name: "簡晟軒", num: "8861" }, { name: "張永澤", num: "9601" }, { name: "蔡政岳", num: "9701" }, { name: "黃楷傑" }, { name: "方寓田" }, { name: "王則旻" }] },
      { role: "上低音號", people: [{ name: "游宗仁" }, { name: "吳仁庭" }, { name: "陳韋龍" }] },
      { role: "低音號", people: [{ name: "翁啟榮", num: "7581" }, { name: "丁肇賢", num: "8501" }] },
      { role: "大提琴", people: [{ name: "詹舒閔" }] },
      { role: "低音大提琴", people: [{ name: "羅介伶" }, { name: "陳映儒" }] },
      { role: "鋼琴", people: [{ name: "李姿瑩" }] },
      { role: "打擊", people: [{ name: "陳英杰", num: "8991" }, { name: "馬維寧" }, { name: "陳建宇" }, { name: "蔣承哲" }, { name: "許家誠" }, { name: "詹琬婷" }, { name: "徐儷慈" }, { name: "賴炫叡" }, { name: "陳立昱" }, { name: "王耀德" }] }
    ],
    performerNote: "演出人員名單依 2012 年正式節目冊轉錄；少數字形不易辨識者參考同資料夾「確定演出名單」校對，仍歡迎校友協助勘誤。",
    adminRows: [
      { role: "團長", people: [{ name: "馮朝君", num: "6401" }] },
      { role: "指揮", people: [{ name: "鄭鈞元", num: "8431" }, { name: "丁肇賢", num: "8501" }] },
      { role: "文書", people: [{ name: "羅碩文" }] },
      { role: "財務", people: [{ name: "張永澤", num: "9601" }] },
      { role: "譜務", people: [{ name: "翁啟榮", num: "7581" }] },
      { role: "美宣", people: [{ name: "朱翊嘉" }] }
    ],
    program: [
      {
        section: "上半場",
        title: "湯賽德序曲",
        foreignTitle: "Tameside Overture",
        composer: "Philip Sparke",
        note: "飛利浦・斯巴克",
        description: "Philip Sparke 生於英國倫敦，於皇家音樂院學習小號、作曲與鋼琴；畢業後因為紐西蘭銅管樂團比賽譜曲一舉成名。Tameside 是英格蘭西北部的一個自治型都市，此曲為作曲家受 Tameside 市委託，以該市為創作主題的作品。"
      },
      {
        section: "上半場",
        title: "長笛嬉遊曲",
        foreignTitle: "Divertimento for Flute and Band",
        composer: "Alfred Reed",
        note: "阿佛瑞・呂德／長笛獨奏：李子沛",
        description: "呂德是美國管樂作曲家、編曲家與教育家。此曲受 Band of Blue Club 委託，完成於 1996 年秋天，由 Cindy McNeal 與田納西州立大學樂隊首演；雖為單一樂章，音樂仍分為抒情與詼諧兩個部份，展現獨奏者抒情技巧。"
      },
      {
        section: "上半場",
        title: "威風凜凜搖滾版",
        foreignTitle: "威風堂々の歌 BRASS ROCK",
        composer: "Mikio Gohma",
        note: "鄉間幹雄",
        description: "艾爾加《威風凜凜》第一號因中段旋律後被譜入英王加冕頌歌而廣為人知。本次演出改編成 BRASS ROCK 版本，在保留原曲素材之下，以搖滾風格呈現。"
      },
      {
        section: "上半場",
        title: "天使之糧",
        foreignTitle: "Panis Angelicus",
        composer: "Alfred Reed",
        note: "阿佛瑞・呂德",
        description: "此曲拉丁文原名 Panis Angelicus，意為自天使得來的靈糧。潔淨的鋼琴前奏後接著單純而空靈的合音，彷彿以雙手捧著珍貴的天使之糧，述說恩典、潔淨與上主包容的愛。"
      },
      {
        section: "上半場",
        title: "航海王組曲",
        foreignTitle: "J-POP Stage Vol-3",
        composer: "山里佐和子",
        description: "J-pop 是 Japanese pop 的縮寫，泛指受到西方影響的日本流行音樂。第三彈 J-POP 系列收錄人氣動畫《航海王》ONE PIECE 的流行主題曲集合，曲風從搖滾到桑巴，共收錄 11 首歌曲。"
      },
      {
        section: "下半場",
        title: "第三號交響曲（第三樂章）",
        foreignTitle: "The Third Symphony Mov. III",
        composer: "James Barnes",
        note: "詹姆士・邦恩斯",
        description: "《第三交響曲》受美國空軍樂隊委託創作。James Barnes 在女兒 Natalie 夭折後開始寫作此曲，第三樂章是作曲家想像女兒若還在世的光景，也深刻表達「珍重再見」；本次只演出第三樂章。"
      },
      {
        section: "下半場",
        title: "皮克斯電影魔力",
        foreignTitle: "Pixar Movie Magic",
        composer: "Michael Brown",
        note: "尼可・伯朗",
        description: "皮克斯自 1995 年以來創造許多令人難忘的動畫角色，電影音樂亦是作品魅力的重要部分。本曲串連《玩具總動員》、《天外奇蹟》、《超人特攻隊》、《汽車總動員》與《料理鼠王》等熟悉旋律。"
      },
      {
        section: "下半場",
        title: "Saving all my Love for You",
        foreignTitle: "Saving all my Love for you",
        composer: "Katsuhiro Morita",
        note: "森田一浩",
        description: "惠妮休斯頓於 2012 年 2 月逝世，是 80、90 年代極具代表性的 R&B 歌手。節目冊以此曲回望她的深情歌曲與跨足電影的經典記憶。"
      },
      {
        section: "下半場",
        title: "追憶鳳飛飛－掌聲響起",
        foreignTitle: "Applause Raise Up",
        composer: "Louis Kihara",
        note: "木原塁",
        description: "鳳飛飛為台灣一代歌后，70 至 80 年代在華人歌壇與鄧麗君齊名，有「帽子歌后」美譽。本曲以《掌聲響起》追憶她溫暖而樸實的歌聲，以及歌曲帶給聽眾的人生記憶。"
      }
    ],
    programNote: "曲序、曲名、作曲者與曲目介紹以 2012 年正式節目冊為主；同資料夾社群曲介檔作為轉錄校對輔助。節目冊第 3 頁以中場休息分為上下半場。",
    ticket: { type: "free-ticket", price: "", channels: [], note: "免費索票入場" },
    poster: "assets/img/concerts/2012.webp",
    promoImages: [
      { src: "assets/img/concerts/2012-fb-cover.webp", caption: "2012 第 28 屆《追憶-榮耀》FB 封面宣傳圖" }
    ],
    programBook: [
      { src: "assets/img/concerts/2012-program/page-01.webp", caption: "2012 正式節目冊：封面" },
      { src: "assets/img/concerts/2012-program/page-02.webp", caption: "2012 正式節目冊：團隊簡介" },
      { src: "assets/img/concerts/2012-program/page-03.webp", caption: "2012 正式節目冊：演出曲目" },
      { src: "assets/img/concerts/2012-program/page-04.webp", caption: "2012 正式節目冊：樂團指揮介紹" },
      { src: "assets/img/concerts/2012-program/page-05.webp", caption: "2012 正式節目冊：長笛獨奏介紹" },
      { src: "assets/img/concerts/2012-program/page-06.webp", caption: "2012 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2012-program/page-07.webp", caption: "2012 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2012-program/page-08.webp", caption: "2012 正式節目冊：曲目介紹" },
      { src: "assets/img/concerts/2012-program/page-09.webp", caption: "2012 正式節目冊：特別感謝" },
      { src: "assets/img/concerts/2012-program/page-10.webp", caption: "2012 正式節目冊：行政團隊與演出人員名單" },
      { src: "assets/img/concerts/2012-program/page-11.webp", caption: "2012 正式節目冊：空白內頁" },
      { src: "assets/img/concerts/2012-program/page-12.webp", caption: "2012 正式節目冊：封底背景" }
    ],
    page: "concerts/2012-28th.html",
    gallery: [],
    videos: [
      { label: "第 28 屆錄影清單", url: "https://youtube.com/playlist?list=PL59A19BE790C3493A", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sponsorParagraphs: [
      "特別感謝：行政院青年輔導委員會、財團法人民生建設基金會、莊小寬數學、宏泰物理、李捷英文、趙祥凱皮膚科診所、元生堂蔘藥房、垂楊火雞肉飯、故鄉牛排館、哈牛排、火雞大王、舞醬館無國界料理。"
    ],
    sources: [
      "concerts.html",
      SOURCE_SOCIAL_VIDEO_LIST,
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20120831｜28屆/節目單01.pdf",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20120831｜28屆/3-團 隊 簡 介.docx",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20120831｜28屆/個人簡介-鄭鈞元(指揮sax).docx",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20120831｜28屆/個人簡介-丁肇賢(指揮).doc",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20120831｜28屆/確定演出名單.docx",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20120831｜28屆/2012年沒按照順序而且有點長的曲目介紹.md",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20120831｜28屆/第三交響曲-曲介.md",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/20120831｜28屆/校友連演fb封面.jpg"
    ],
    sourceNote: "本頁正式日期、時間、場地、主辦／協辦／指導單位、曲目、指揮、獨奏、行政團隊、特別感謝與演出人員名單，主要依 2012 年正式節目冊整理；Word 檔作為團隊簡介、指揮簡介與名單校對來源；社群曲介僅作節目冊曲目介紹轉錄輔助。現有主視覺海報已保留，另補入 FB 封面宣傳圖與完整節目冊影像。",
    status: "confirmed",
    notes: "2012 年第 28 屆《追憶-榮耀》由嘉義市文化局主辦、國立嘉義高中協辦，行政院青年輔導委員會與教育部指導，於 8 月 31 日晚間在嘉義市文化局音樂廳免費索票入場。節目包含 9 首曲目，由鄭鈞元、丁肇賢擔任指揮，李子沛擔任長笛獨奏，並保留行政團隊、特別感謝與演出人員名單。"
  },
  {
    id: "2011-27th",
    nth: 27,
    year: 2011,
    rocYear: 100,
    title: "第 27 屆聯合音樂會",
    subtitle: "",
    date: "2011-07-16",
    time: "13:30-15:30",
    venue: "嘉義市文化中心音樂廳",
    venueNote: "為嘉義市國際管樂節正式節目之一；今嘉義市政府文化局音樂廳",
    hostHead: "",
    intro: [
      "第 27 屆嘉義高中管樂隊校友暨在校生聯合音樂會於 2011 年 7 月 16 日 13:30 至 15:30 在嘉義市文化中心音樂廳演出，並列為嘉義市國際管樂節正式節目之一。",
      "本屆由鄭鈞元與丁肇賢共同擔任指揮，節目包含管樂原創、歌劇選粹、協奏曲與通俗改編作品；懶人包同時保存了正式演出人員名單、預定排練時程與樂譜進度，是第 27 屆目前可考的重要資料。"
    ],
    conductors: [
      { name: "鄭鈞元", num: "8431", role: "指揮", concertRole: "指揮（曲目 1、2、7、8）" },
      { name: "丁肇賢", num: "8501", role: "指揮", concertRole: "指揮（曲目 3、4、5、6）" }
    ],
    soloists: [
      { name: "黃耀瑩", num: "8912", instrument: "雙簧管", work: "Soliloquy and Dance for Oboe and Band" },
      { name: "鄭鈞元", num: "8431", instrument: "薩克斯風", work: "Carnival for Saxophone & Concert Band" },
      { name: "陳佩君", instrument: "鋼琴", work: "Rhapsody in Blue" },
      { name: "謝介豪", instrument: "單簧管", work: "Concerto for Clarinet" }
    ],
    performerGroups: [
      { role: "指揮", people: ["鄭鈞元", "丁肇賢"] },
      { role: "獨奏家", people: ["雙簧管：黃耀瑩", "薩克斯風：鄭鈞元", "鋼琴：陳佩君", "單簧管：謝介豪"] },
      { role: "長笛", people: ["盧宓承", "李子沛", "張容慈", "林宜增", "詹翔傑", "陳譽晨"] },
      { role: "雙簧管", people: ["黃耀瑩"] },
      { role: "低音管", people: ["劉怡汝"] },
      { role: "單簧管", people: ["李吉峰", "江俊漢", "蔡嘉偉", "謝介豪", "葉哲良", "鄭凱陽", "謝俊宇", "何奇穎", "李亞璿", "余彥寬", "趙耘浩", "蔡昀翰", "劉炫廷", "陳沛穎"] },
      { role: "薩克斯風", people: ["鄭鈞元", "陳韋志", "戴俊杉", "羅耿旻", "龔昱銘", "施丞彧", "陳映良"] },
      { role: "法國號", people: ["蔡文立", "魏仕杰", "洪敏睿", "廖恆毅", "高士涵"] },
      { role: "小號", people: ["陳明陽", "楊秉驊", "古峻錡", "劉全盛", "蔡育修", "周宥騰", "陳信慈"] },
      { role: "長號", people: ["高健雄", "范庭福", "方崇任", "張永澤", "謝梓嫣", "蔡政岳", "黃楷傑"] },
      { role: "上低音號", people: ["吳仁庭", "何志薪", "陳韋龍"] },
      { role: "低音號", people: ["翁啟榮", "李函濰", "李旻其", "侯柏辰"] },
      { role: "打擊", people: ["鄧杰翔", "陳建宇", "蔣承哲", "羅介伶", "許家誠", "詹琬婷", "徐儷慈", "徐立杰"] },
      { role: "鋼琴", people: ["王騰寬"] }
    ],
    performerNote: "名單依 2011 年 5 月 16 日「2011校友聯演懶人包」確定版整理；原檔各聲部後方人數統計未列入姓名欄。",
    program: [
      { section: "上半場", title: "英仙座", foreignTitle: "Perseus", credit: "八木澤教司 Satoshi Yagisawa", conductor: "鄭鈞元", status: "confirmed" },
      { section: "上半場", title: "為雙簧管與管樂團的獨白與舞曲", foreignTitle: "Soliloquy and Dance for Oboe and Band", credit: "Philip Parker", conductor: "鄭鈞元", soloist: "黃耀瑩（雙簧管）", status: "confirmed" },
      { section: "上半場", title: "艾爾莎向著大教堂而去的行列", foreignTitle: "Elsa's Procession to the Cathedral from Lohengrin", credit: "Richard Wagner", conductor: "丁肇賢", note: "選自歌劇《羅恩格林》", status: "confirmed" },
      { section: "上半場", title: "嘉年華", foreignTitle: "Carnival for Saxophone & Concert Band", credit: "Philip Sparke", conductor: "丁肇賢", soloist: "鄭鈞元（中音薩克斯風）", status: "confirmed" },
      { section: "下半場", title: "藍色狂想曲", foreignTitle: "Rhapsody in Blue", credit: "George Gershwin", conductor: "丁肇賢", soloist: "陳佩君（鋼琴）", note: "原檔標註 Piano Concerto", status: "confirmed" },
      { section: "下半場", title: "抒情的祭", foreignTitle: "Festal Scenes", credit: "伊藤康英 Yasuhide Ito", conductor: "丁肇賢", status: "confirmed" },
      { section: "下半場", title: "單簧管協奏曲", foreignTitle: "Concerto for Clarinet", credit: "Artie Shaw", conductor: "鄭鈞元", soloist: "謝介豪（單簧管）", status: "confirmed" },
      { section: "下半場", title: "美國風情畫 III", foreignTitle: "American Graffiti III", credit: "岩井直溥 Naohiro Iwai", conductor: "鄭鈞元", status: "confirmed" },
      { section: "Encore", title: "Tico Tico", status: "confirmed" },
      { section: "Encore", title: "Yesterday", status: "confirmed" }
    ],
    programNote: "曲目順序、指揮分配與獨奏者依「2011校友聯演懶人包」整理；此前活動指定曲 README 作為曲目交叉來源保留。",
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "",
    page: "concerts/2011-27th.html",
    gallery: [],
    videos: [
      { label: "第 27 屆錄影清單", url: "https://youtube.com/playlist?list=PLc3LYZ21H4qkJw6ZNI0hCR3rqHIjCS3zV", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: [
      "concerts.html",
      SOURCE_SOCIAL_VIDEO_LIST,
      "content/people/8302.html",
      "people/8302.html",
      "/Volumes/home-1/Drive/03【嘉義高中管樂社】/03_樂譜庫/04_活動指定曲/校聯指定曲/2011_第27屆/README.md",
      "/Users/linjiunyu/Desktop/【進行中專案】/20260707_嘉中校友團資料/03-校友聯演/2011年第27屆/2011校友聯演懶人包.md",
      "20260704_嘉中管樂社官網_校友提供資料/01_校友聯演與歷史活動史料/2011_校友演奏會_待考/20_照片影像_公開候選"
    ],
    sourceNote: "本頁日期、時間、場地、指揮、獨奏者、曲目順序與演出人員名單，主要依 2011 年 5 月 16 日「2011校友聯演懶人包」整理；曲目另與第 27 屆活動指定曲 README 交叉保留。正式節目冊影像與更完整曲目介紹仍待補。",
    status: "partial",
    notes: "2011 懶人包記載第 27 屆於 2011.07.16 13:30-15:30 在嘉義市文化中心音樂廳演出，為嘉義市國際管樂節正式節目之一；指揮、獨奏者、曲目順序與完整演出名單已可考，正式節目冊影像與曲目介紹仍待補。"
  },
  {
    id: "2010-26th",
    nth: 26,
    year: 2010,
    rocYear: 99,
    title: "Music à la Carte",
    subtitle: "",
    date: "2010-08-21",
    time: "19:30",
    venue: "嘉義高中校內",
    venueNote: "確切廳名待考",
    hostHead: "",
    intro: [
      "2010 年 8 月 21 日（六），第 26 屆嘉義高中校友暨在校生聯合音樂會登場，主題為《Music à la Carte》。校友保留的原始照片，記錄了午後烈日下的彩排，到晚間正式演出的完整過程。",
      "本屆場地全名、指揮與完整曲目資訊仍在考證中；照片中舞台布條清楚可見「第二十六屆國立嘉義高中校友暨在校生聯合演奏會」字樣，確認了屆數與活動性質。若您是當年參與的校友，歡迎透過粉絲專頁與我們聯繫，協助補齊細節。"
    ],
    conductors: [],
    soloists: [{ name: "方崇任", num: "9261", instrument: "長號", work: "Launy Grøndahl: Trombone Concerto" }],
    performers: [
      { name: "黃耀瑩", num: "8912", role: "雙簧管聲部" },
      { name: "蔡淳任", num: "9202", role: "小號聲部" },
      { name: "張永澤", num: "9601", role: "長號聲部" }
    ],
    program: [],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "",
    page: "concerts/2010-26th.html",
    gallery: [],
    photos: [
      { src: "assets/img/gallery/2010/0821-01t.webp", full: "assets/img/gallery/2010/0821-01.webp", caption: "午後彩排前，舞台上的 CYSH 字樣佈景" },
      { src: "assets/img/gallery/2010/0821-02t.webp", full: "assets/img/gallery/2010/0821-02.webp", caption: "八月午後的彩排，電風扇是舞台上的必需品" },
      { src: "assets/img/gallery/2010/0821-03t.webp", full: "assets/img/gallery/2010/0821-03.webp", caption: "舞台布條：「第二十六屆國立嘉義高中校友暨在校生聯合演奏會」" },
      { src: "assets/img/gallery/2010/0821-04t.webp", full: "assets/img/gallery/2010/0821-04.webp", caption: "晚間正式演出，指揮帶領全團" },
      { src: "assets/img/gallery/2010/0821-05t.webp", full: "assets/img/gallery/2010/0821-05.webp", caption: "銅管與木管聲部近景" }
    ],
    videos: [
      { label: "第 26 屆錄影清單（現存小牛仔片段）", url: "https://youtube.com/playlist?list=PLc3LYZ21H4qlvf60Z_F7TS6Ndv160NGTs", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", "concerts/2010-26th.html", SOURCE_SOCIAL_VIDEO_LIST],
    sourceNote: "本頁照片由校友提供之原始相簿整理而成，依影像保存脈絡排列；場地全名、指揮、曲目等文字資訊仍待進一步查證與校友補充，如需更正請透過粉絲專頁與我們聯繫。",
    status: "partial",
    notes: "指揮、曲目、正式場地名稱待考。"
  },
  {
    id: "2009-25th",
    nth: 25,
    year: 2009,
    rocYear: 98,
    title: "第 25 屆聯合音樂會",
    subtitle: "",
    date: "2009-08-23",
    time: "",
    venue: "嘉義市音樂廳",
    venueNote: "今嘉義市政府文化局音樂廳",
    hostHead: "",
    conductors: [],
    soloists: [
      { name: "王聖安", num: "9161", instrument: "雙鋼琴", work: "Francis Poulenc: Concerto for Two Pianos" },
      { name: "陳佩君", instrument: "雙鋼琴", work: "Francis Poulenc: Concerto for Two Pianos" }
    ],
    program: [
      { title: "Francis Poulenc: Concerto for Two Pianos", status: "partial", note: "由王聖安人物頁確認" }
    ],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "",
    page: "concerts/2009-25th.html",
    gallery: [],
    videos: [
      { label: "第 25 屆錄影清單", url: "https://youtube.com/playlist?list=PLc3LYZ21H4qkbJDaF7reo-eFQncSMNk63", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", SOURCE_SOCIAL_VIDEO_LIST, "content/people/9161.html", "people/9161.html", "20260704_嘉中管樂社官網_校友提供資料/01_校友聯演與歷史活動史料/2009_校友演奏會_待考/20_照片影像_公開候選"],
    status: "partial",
    notes: "場地由使用者確認為嘉義市音樂廳；日期由補充照片 EXIF 與演出影像檔名群組支持；指揮、主題與完整曲目待補。"
  },
  {
    id: "2008-24th",
    nth: 24,
    year: 2008,
    rocYear: 97,
    title: "管樂肖像",
    subtitle: "",
    date: "",
    time: "",
    venue: "嘉義",
    venueNote: "",
    hostHead: "",
    conductors: [
      { name: "丁肇賢", num: "8501", role: "指揮" },
      { name: "簡晟軒", num: "8861", role: "指揮" }
    ],
    soloists: [{ name: "黃耀瑩", num: "8912", instrument: "雙簧管", work: "James Barnes: Autumn Soliloquy" }],
    program: [],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "",
    page: "concerts/2008-24th.html",
    gallery: [],
    videos: [
      { label: "第 24 屆《管樂肖像》錄影清單", url: "https://youtube.com/playlist?list=PLc3LYZ21H4qnoQJNUaV01j98dwZn6_BFn", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", SOURCE_SOCIAL_VIDEO_LIST],
    status: "partial",
    notes: "曲目橫跨古典管樂、現代作品、臺灣歌曲與流行音樂改編；日期與場地待補。"
  },
  {
    id: "2007-23rd",
    nth: 23,
    year: 2007,
    rocYear: 96,
    title: "第 23 屆聯合音樂會",
    subtitle: "",
    date: "2007-08-18",
    time: "19:30",
    venue: "嘉義市政府文化局音樂廳",
    venueNote: "19:00 開放入場",
    hostHead: "",
    conductors: [
      { name: "丁肇賢", num: "8501", role: "指揮" },
      { name: "林唐禾", num: "8993", role: "指揮" }
    ],
    soloists: [{ name: "鄭鈞元", num: "8431", instrument: "薩克斯風", work: "Ballade" }],
    program: [
      { title: "鄉村騎士間奏曲", status: "confirmed" },
      { title: "亞美尼亞舞曲", status: "confirmed" },
      { title: "Lord Tullamore", status: "confirmed" },
      { title: "Greensleeves", status: "confirmed" },
      { title: "The Inn of the Sixth Happiness", status: "confirmed" },
      { title: "Pirates selections", status: "confirmed" }
    ],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "",
    page: "concerts/2007-23rd.html",
    gallery: [],
    news: [],
    sources: ["concerts.html"],
    status: "partial",
    notes: "嘉中管樂隊創隊 76 周年。"
  },
  {
    id: "2006-22nd",
    nth: 22,
    year: 2006,
    rocYear: 95,
    title: "第 22 屆聯合音樂會",
    subtitle: "",
    date: "",
    time: "",
    venue: "嘉義市音樂廳",
    venueNote: "今嘉義市政府文化局音樂廳",
    hostHead: "",
    conductors: [],
    soloists: [
      { name: "簡晟軒", num: "8861", instrument: "長號", work: "Launy Grøndahl: Trombone Concerto" }
    ],
    program: [
      { title: "Launy Grøndahl: Trombone Concerto", status: "partial", note: "由簡晟軒人物頁與公開履歷脈絡交叉確認" }
    ],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "",
    page: "concerts/2006-22nd.html",
    gallery: [],
    news: [],
    sources: ["concerts.html", "content/people/8861.html", "people/8861.html"],
    status: "partial",
    notes: "完整日期、指揮、主題與曲目仍待節目冊或海報補齊；校友提供影像仍需交叉確認，暫不作為公開頁主證據。"
  },
  {
    id: "2005-21st",
    nth: 21,
    year: 2005,
    rocYear: 94,
    title: "神話",
    subtitle: "",
    date: "2005-08-28",
    time: "",
    venue: "",
    venueNote: "場地待考",
    hostHead: "",
    conductors: [],
    soloists: [],
    program: [],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "",
    page: "concerts/2005-21st.html",
    gallery: [],
    photos: [
      { src: "assets/img/gallery/2005/0828-01t.webp", full: "assets/img/gallery/2005/0828-01.webp", caption: "演出前，更衣室裡的便當時光" },
      { src: "assets/img/gallery/2005/0828-02t.webp", full: "assets/img/gallery/2005/0828-02.webp", caption: "後台走廊的合影，輕鬆的賽前一刻" },
      { src: "assets/img/gallery/2005/0828-03t.webp", full: "assets/img/gallery/2005/0828-03.webp", caption: "指揮就位，準備開演" },
      { src: "assets/img/gallery/2005/0828-04t.webp", full: "assets/img/gallery/2005/0828-04.webp", caption: "全團大合照，前排是當晚的特別演出者" },
      { src: "assets/img/gallery/2005/0828-05t.webp", full: "assets/img/gallery/2005/0828-05.webp", caption: "指揮向團員鞠躬致意" },
      { src: "assets/img/gallery/2005/0828-06t.webp", full: "assets/img/gallery/2005/0828-06.webp", caption: "銅管與打擊聲部" },
      { src: "assets/img/gallery/2005/0828-07t.webp", full: "assets/img/gallery/2005/0828-07.webp", caption: "全團起立，接受觀眾掌聲" },
      { src: "assets/img/gallery/2005/0828-08t.webp", full: "assets/img/gallery/2005/0828-08.webp", caption: "指揮深深一鞠躬，《神話》圓滿落幕" }
    ],
    videos: [
      { label: "第 21 屆《神話》錄影清單", url: "https://youtube.com/playlist?list=PLc3LYZ21H4qnayc53KBzO3qEKPjQUqcae", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", "concerts/2005-21st.html", SOURCE_SOCIAL_VIDEO_LIST],
    sourceNote: "本頁照片由校友提供之原始相簿整理而成，依影像保存脈絡排列；場地、指揮、曲目等文字資訊仍待進一步查證與校友補充，如需更正請透過粉絲專頁與我們聯繫。",
    status: "partial",
    notes: "現存後台、正式演出、謝幕照片；場地、指揮、曲目待考。"
  },
  {
    id: "2002-18th",
    nth: 18,
    year: 2002,
    rocYear: 91,
    title: "第 18 屆聯合音樂會",
    subtitle: "",
    date: "2002-08-30",
    time: "19:30",
    venue: "嘉義市立文化中心音樂廳",
    venueNote: "今嘉義市政府文化局音樂廳",
    hostHead: "",
    conductors: [],
    soloists: [],
    program: [{ title: "Blue Midnight", status: "partial", note: "照片檔名留下之曲目線索" }],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/2002.webp",
    page: "concerts/2002-18th.html",
    gallery: ["gallery/2002-concert.html"],
    programBook: [
      { src: "assets/img/concerts/2002-program/preface.webp", caption: "2002 年活動企劃書：前言" },
      { src: "assets/img/concerts/2002-program/team-intro.webp", caption: "2002 年活動企劃書：團隊簡介" }
    ],
    adminRows: [
      { role: "指導單位", people: ["嘉義市政府"], duty: "活動企劃書之音樂演奏會相關單位" },
      { role: "主辦單位", people: ["國立嘉義高級中學", "嘉義市文化局"], duty: "活動企劃書之音樂演奏會相關單位" },
      { role: "協辦單位", people: ["國立嘉義高級中學校友會", "國立嘉義高級中學家長會", "嘉義市管樂團", "嘉義市愛樂學會"], duty: "活動企劃書之音樂演奏會相關單位" },
      { role: "演出單位", people: ["國立嘉義高中管樂隊"], duty: "活動企劃書之音樂演奏會相關單位" },
      { role: "長笛分部", people: ["7111 盧宓承"], duty: "暑期集訓分部負責" },
      { role: "豎笛分部", people: ["7222 李吉峰"], duty: "暑期集訓分部負責" },
      { role: "薩克斯風分部", people: ["8232 陳寬來"], duty: "暑期集訓分部負責" },
      { role: "小號分部", people: ["8101 陳明陽"], duty: "暑期集訓分部負責" },
      { role: "法國號分部", people: ["7503 蔡文立"], duty: "暑期集訓分部負責" },
      { role: "長號分部", people: ["7901 高健雄"], duty: "暑期集訓分部負責" },
      { role: "上低音號分部", people: ["6801 游宗仁"], duty: "暑期集訓分部負責" },
      { role: "低音號分部", people: ["7581 翁啟榮"], duty: "暑期集訓分部負責" },
      { role: "打擊分部", people: ["7502 陳志鳴"], duty: "暑期集訓分部負責" },
      { role: "合奏指導", people: ["顏崇勝"], duty: "暑期集訓合奏練習指導" }
    ],
    adminNote: "本表依 2002 年第 18 屆活動企劃書「活動企劃」整理，只摘錄音樂演奏會相關單位與暑期集訓分部負責人；企劃書原文長笛部負責人作「盧宓成」，此處依網站既有校友名錄校正為盧宓承。",
    news: [],
    sources: ["concerts.html", "gallery/2002-concert.html", SOURCE_2002_PLAN],
    sourceNote: "本頁日期、時間、場地、演出相關單位、集訓分部負責人與節目冊影像，整理自 2002 年第 18 屆活動企劃書；照片整理自校友提供之 2002 年演出相簿。曲目、指揮、完整團員名單仍待正式節目冊或校友資料補齊。",
    status: "partial",
    notes: "目前影像保存完整，且活動企劃書可考日期、時間、場地、演出相關單位與集訓分部負責；主題名稱、指揮與完整節目單仍待考。",
    intro: [
      "第 18 屆聯合音樂會依 2002 年活動企劃書記載，於 8 月 30 日 19:30 在嘉義市立文化中心音樂廳演出，該場地即今日嘉義市政府文化局音樂廳。",
      "本次補入的企劃書影像保留了當年「前言」與「團隊簡介」原貌；活動企劃中的演出日期、時間、場地、相關單位與暑期集訓分部負責人，則整理為本頁演出資訊與幕後行政團隊資料。",
      "目前仍待補齊本屆指揮、正式主題名稱、完整曲目與團員名單；既有照片與企劃書資料先共同保存第 18 屆的可考輪廓。"
    ]
  },
  earlyConcertRecord({
    id: "2001-17th",
    nth: 17,
    year: 2001,
    rocYear: 90,
    date: "2001-08-28",
    venue: "嘉義市立文化中心音樂廳",
    venueNote: "今嘉義市政府文化局音樂廳"
  }),
  earlyConcertRecord({
    id: "2000-16th",
    nth: 16,
    year: 2000,
    rocYear: 89,
    date: "2000-08-25",
    venue: "嘉義市文化中心音樂廳",
    venueNote: "今嘉義市政府文化局音樂廳"
  }),
  earlyConcertRecord({
    id: "1999-15th",
    nth: 15,
    year: 1999,
    rocYear: 88,
    date: "1999-08-28",
    venue: "嘉義市立文化中心音樂廳",
    venueNote: "今嘉義市政府文化局音樂廳"
  }),
  {
    id: "1998-14th",
    nth: 14,
    year: 1998,
    rocYear: 87,
    title: "情誼永固",
    subtitle: "How Firm Thy Friendship",
    date: "1998-08-29",
    time: "19:30",
    venue: "嘉義市立文化中心音樂廳",
    venueNote: "今嘉義市政府文化局音樂廳",
    hostHead: "",
    conductors: [
      { name: "羅家駒", num: "6392", role: "指揮" },
      { name: "陳錫仁", num: "6301", role: "指揮／小號獨奏" }
    ],
    soloists: [
      { name: "陳錫仁", num: "6301", instrument: "小號", work: "Hummel: Trumpet Concerto in E-flat" }
    ],
    program: [
      { title: "Viva! Italia!", arranger: "J. Bullock", status: "confirmed" },
      { title: "Andante from Symphony No. 5", composer: "L. V. Beethoven", arranger: "T. M.-Tobani", status: "confirmed" },
      { title: "Symphonic Portrait", composer: "S. Rachmaninoff", arranger: "A. Antonini", status: "confirmed" },
      { title: "Trumpet Concerto in E-flat", composer: "J. Hummel", arranger: "J. Corley", status: "confirmed" },
      { title: "Firm Thy Friendship", composer: "James Swearingen", status: "confirmed" },
      { title: "Springtime Celebration", composer: "Alfred Reed", status: "confirmed" },
      { title: "American Folk Fantasia", composer: "Ed Huckeby", status: "confirmed" },
      { title: "The Emerald Isle", composer: "Dave Black", status: "confirmed" },
      { title: "African Symphony", composer: "Van McCoy", arranger: "Naohiro Iwai", status: "confirmed" },
      { title: "Carpenters Forever", arranger: "Toshio Mashima", status: "confirmed" }
    ],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/1998.webp",
    page: "concerts/1998-14th.html",
    gallery: [],
    news: [],
    sources: [
      "concerts.html",
      SOURCE_2002_PLAN,
      "20260704_嘉中管樂社官網_校友提供資料/01_校友聯演與歷史活動史料/1990_早期校友演奏會_待考/10_節目冊海報文宣_公開候選/節目冊海報文宣__校友提供__6066c757__74568191_3528475503831025_8578050035239878656_n.jpg",
      "20260704_嘉中管樂社官網_校友提供資料/01_校友聯演與歷史活動史料/1990_早期校友演奏會_待考/10_節目冊海報文宣_公開候選/節目冊海報文宣__校友提供__267adef7__75279247_3528476053830970_5702877242284048384_n.jpg"
    ],
    status: "partial",
    notes: "節目冊封面與曲目頁完整度高；屆次依 1985 年第 1 屆推算為第 14 屆，待正式屆次文字佐證。日期與場地亦見 2002 年活動企劃書「歷屆校友演奏會」列表。補充資料中同時保存其他早期年份影像，已依節目冊封面文字辨識本筆為 1998 年。"
  },
  earlyConcertRecord({
    id: "1997-13th",
    nth: 13,
    year: 1997,
    rocYear: 86,
    date: "1997-08-23",
    venue: "嘉義高中樹人堂"
  }),
  earlyConcertRecord({
    id: "1996-12th",
    nth: 12,
    year: 1996,
    rocYear: 85,
    date: "1996-08-24",
    venue: "嘉義高中樹人堂"
  }),
  earlyConcertRecord({
    id: "1995-11th",
    nth: 11,
    year: 1995,
    rocYear: 84,
    date: "1995-08-19",
    venue: "嘉義高中樹人堂"
  }),
  earlyConcertRecord({
    id: "1994-10th",
    nth: 10,
    year: 1994,
    rocYear: 83,
    date: "1994-08-21",
    venue: "嘉義高中樹人堂"
  }),
  earlyConcertRecord({
    id: "1993-9th",
    nth: 9,
    year: 1993,
    rocYear: 82,
    date: "1993-08-22",
    venue: "嘉義高中樹人堂"
  }),
  earlyConcertRecord({
    id: "1992-8th",
    nth: 8,
    year: 1992,
    rocYear: 81,
    date: "1992-08-23",
    venue: "嘉義高中樹人堂"
  }),
  earlyConcertRecord({
    id: "1991-7th",
    nth: 7,
    year: 1991,
    rocYear: 80,
    date: "1991-08-22",
    endDate: "1991-08-24",
    venue: "台中市立文化中心中山堂、台南市立圖書館育樂堂、嘉義高中樹人堂",
    sessions: [
      { label: "台中場", date: "1991-08-22", venue: "台中市立文化中心中山堂" },
      { label: "台南場", date: "1991-08-23", venue: "台南市立圖書館育樂堂" },
      { label: "嘉義場", date: "1991-08-24", venue: "嘉義高中樹人堂" }
    ]
  }),
  {
    id: "1990-6th",
    nth: 6,
    year: 1990,
    rocYear: 79,
    title: "Popular Night",
    subtitle: "",
    date: "1990-08-23",
    time: "19:30",
    venue: "嘉中樹人堂",
    venueNote: "",
    hostHead: "",
    conductors: [],
    soloists: [],
    program: [],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/1990.webp",
    page: "concerts/1990-6th.html",
    gallery: [],
    news: [],
    sources: [
      "concerts.html",
      SOURCE_2002_PLAN,
      "20260704_嘉中管樂社官網_校友提供資料/01_校友聯演與歷史活動史料/1990_早期校友演奏會_待考/10_節目冊海報文宣_公開候選/節目冊海報文宣__校友提供__518498ed__74984677_3528475117164397_253369561129156608_n.jpg"
    ],
    status: "partial",
    notes: "封面寫作「七九年校友聯合演奏會」，日期 8 月 23 日星期四與 1990 年相符，故本頁以海報日期為主；2002 年活動企劃書「歷屆校友演奏會」列表則記為民國 79 年 8 月 21 日於嘉義高中樹人堂演出，兩者差異待後續佐證。屆次依 1985 年第 1 屆推算為第 6 屆，待正式屆次文字、指揮、曲目與團員名單佐證。"
  },
  earlyConcertRecord({
    id: "1989-5th",
    nth: 5,
    year: 1989,
    rocYear: 78,
    date: "1989-08-26",
    venue: "嘉義女中中正館"
  }),
  earlyConcertRecord({
    id: "1988-4th",
    nth: 4,
    year: 1988,
    rocYear: 77,
    date: "1988-08-21",
    venue: "嘉義女中中正館"
  }),
  earlyConcertRecord({
    id: "1987-3rd",
    nth: 3,
    year: 1987,
    rocYear: 76,
    date: "1987-08-22",
    endDate: "1987-08-23",
    venue: "四湖鄉參天宮、嘉義女中進德堂",
    sessions: [
      { label: "四湖場", date: "1987-08-22", venue: "四湖鄉參天宮" },
      { label: "嘉義場", date: "1987-08-23", venue: "嘉義女中進德堂" }
    ]
  }),
  earlyConcertRecord({
    id: "1986-2nd",
    nth: 2,
    year: 1986,
    rocYear: 75,
    date: "1986-08-23",
    venue: "嘉義女中進德堂"
  }),
  {
    id: "1985-1st",
    nth: 1,
    year: 1985,
    rocYear: 74,
    title: "傳統的起點",
    subtitle: "",
    date: "1985-08-21",
    time: "",
    venue: "嘉義高中樹人堂",
    venueNote: "",
    hostHead: "",
    conductors: [],
    soloists: [],
    program: [],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "",
    page: "concerts/1985-1st.html",
    gallery: [],
    news: [],
    sources: ["concerts.html", "history.html", SOURCE_2002_PLAN],
    status: "partial",
    notes: "2002 年活動企劃書「歷屆校友演奏會」列表記載，民國 74 年 8 月 21 日首次以嘉義高中校友聯合演奏會名義返校從事管樂指導，並於嘉義高中樹人堂首演；指揮、曲目、正式主題與完整團員名單仍待補。"
  }
];
