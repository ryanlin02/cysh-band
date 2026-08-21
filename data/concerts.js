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
    isCurrent: false,
    archiveComplete: true,
    subtitle: "Keep Company",
    date: "2026-08-08",
    time: "14:30",
    venue: "嘉義市政府文化局音樂廳",
    venueNote: "嘉義市東區忠孝路 275 號；睽違六年重返文化局音樂廳",
    hostHead: "五字頭",
    metaDescription: "2026 年第 41 屆嘉義高中校友暨在校生聯合音樂會《為伍》典藏資料：8 月 8 日於嘉義市政府文化局音樂廳演出，由盧宓承、翁啟榮、丁肇賢擔任樂團指揮，黃鈺芠擔任小號獨奏。",
    lede: "「為伍」代表相聚、陪伴與同行。第 41 屆嘉義高中校友暨在校生聯合音樂會於 2026 年 8 月 8 日睽違六年重返嘉義市政府文化局音樂廳，不同世代的校友與在校生再次同台。",
    conductors: [
      { name: "盧宓承", num: "7111", role: "樂團指揮" },
      { name: "翁啟榮", num: "7581", role: "樂團指揮" },
      {
        name: "丁肇賢",
        num: "8501",
        role: "樂團指揮",
        concertBio: "丁肇賢出生於臺東，民國 85 年入學嘉義高中，主修低音號。大學就讀淡江大學期間開始接觸指揮，曾師從陳一夫老師與 Rodney Winther 教授，後畢業於國立臺灣師範大學音樂學系研究所碩士班指揮組，師事廖嘉弘教授。他曾任多所學校管樂團指導及低音銅管分部老師；現任享響樂集藝術總監、臺北音樂家管弦樂團音樂總監、陝西省音樂家協會理事及瀧音音樂工坊特約編曲家，並以「尚水堂」為筆名從事編曲。"
      }
    ],
    peopleTitle: "指揮與獨奏",
    soloists: [
      {
        name: "黃鈺芠",
        num: "1051",
        instrument: "小號",
        work: "Philip Sparke《Manhattan》",
        concertBio: "黃鈺芠學習小號 12 年，目前就讀臺北市立大學音樂系大三，師從聶中興老師。她畢業於嘉義高中音樂班、北興國中管樂班及世賢國小，曾師從張介凡老師、高士根老師。本次《為伍》，黃鈺芠擔任 Philip Sparke《Manhattan》小號獨奏。"
      }
    ],
    program: [
      {
        section: "上半場",
        localTitle: "閃耀的管樂",
        foreignTitle: "Flashing Winds",
        composer: "Jan Van der Roost／楊・范德魯斯特",
        conductor: "丁肇賢",
        duration: "約 4 分 07 秒",
        description: "這首 1989 年創作的管樂合奏作品以簡短莊嚴的信號曲風格開場，隨後以穩定快速的節奏一路推進；開頭的和弦音塊在結尾再次出現，使熱烈而色彩豐富的音樂形成完整呼應。",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "邦妮杜恩的美麗河畔",
        foreignTitle: "Ye Banks and Braes o' Bonnie Doon",
        composer: "Percy Grainger／帕西・葛人傑",
        conductor: "丁肇賢",
        duration: "約 2 分 00 秒",
        description: "葛人傑以蘇格蘭傳統民謠為核心，運用豐富和聲、溫柔對位與速度變化，描繪杜恩河畔的寧靜景色與失落愛情的感慨。",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "七夕",
        foreignTitle: "たなばた／The Seventh Night of July",
        composer: "Itaru Sakai／酒井格",
        conductor: "盧宓承",
        duration: "約 8 分 38 秒",
        description: "酒井格以日本七夕傳說為靈感，中段由中音薩克斯風與上低音號二重奏代表故事中的男女主角，在慶典熱鬧、銀河夢幻與相會喜悅之間展開鮮明的音樂敘事。",
        status: "confirmed"
      },
      {
        section: "上半場",
        title: "Novena to Seagate Overture",
        composer: "James Swearingen／詹姆士・史威林金",
        conductor: "翁啟榮",
        duration: "約 7 分 30 秒",
        description: "本次演出將 James Swearingen 兩首風格不同的作品串聯，從《Novena》過渡至《Seagate Overture》，在熟悉的管樂語彙中呈現不同情緒與色彩。",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "曼哈頓",
        foreignTitle: "Manhattan",
        composer: "Philip Sparke／菲利浦・史巴克",
        conductor: "丁肇賢",
        soloist: "黃鈺芠（1051）",
        duration: "約 9 分 00 秒",
        description: "這首小號與管樂團作品以「紐約的一個週末」為主題：第一樂章描繪星期六夜晚帶有藍調色彩的爵士酒吧，第二樂章則以鮮明節奏呈現星期日清晨在中央公園慢跑的活力。",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "銀河交響組曲（選自《超級瑪利歐銀河》）",
        foreignTitle: "Symphonic Suite of Galaxy (from Super Mario Galaxy)",
        composer: "Koji Kondo、Mahito Yokota／近藤浩治、橫田真人",
        arranger: "尚水堂",
        conductor: "丁肇賢",
        duration: "約 8 分 30 秒",
        description: "《超級瑪利歐銀河》配樂以管弦樂為主軸並結合電子音色，在宏大宇宙感與親切旋律之間取得平衡；本次由尚水堂編為管樂團交響組曲。",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "治癒世界",
        foreignTitle: "Heal the World",
        composer: "Michael Jackson／麥可・傑克森",
        arranger: "Ron Sebregts",
        conductor: "丁肇賢",
        duration: "約 4 分 44 秒",
        description: "作品收錄於 Michael Jackson 1991 年專輯《Dangerous》，以愛、和平與對下一代的關懷為主題，本次演出採 Ron Sebregts 的管樂團編曲版本。",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "酒與玫瑰的日子",
        foreignTitle: "Days of Wine and Roses",
        composer: "Henry Mancini／亨利・曼西尼",
        arranger: "Naohiro Iwai／岩井直溥",
        conductor: "盧宓承",
        duration: "約 5 分 05 秒",
        description: "Henry Mancini 為 1962 年電影創作的主題曲，以優美而略帶憂傷的旋律描寫美好時光的短暫；岩井直溥的管樂編曲保留原曲的優雅與溫暖層次。",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "日本風情畫 XXII：City Pop 組曲",
        foreignTitle: "ジャパニーズ・グラフィティXXII シティー・ポップ・メドレー",
        arranger: "Tohru Kanayama／金山徹",
        conductor: "丁肇賢",
        duration: "約 7 分 55 秒",
        note: "〈SPARKLE〉、〈プラスティック・ラヴ〉、〈君は天然色〉、〈フライディ・チャイナタウン〉、〈真夜中のドア～stay with me〉",
        description: "金山徹編曲的《New Sounds in Brass 2024》作品，串連五首 1970 至 1980 年代日本 City Pop 名曲，保留洗練的都會感、懷舊氛圍與鮮明節奏律動。",
        status: "confirmed"
      }
    ],
    ticket: {
      type: "ticketed",
      price: "200",
      channels: ["OPENTIX 兩廳院文化生活"],
      note: "14:00 開放入場；憑票入場，自由入座；售票已結束"
    },
    poster: "assets/img/poster_weiwu_2026.webp",
    page: "concerts/2026-41st.html",
    onlineProgramBook: {
      url: "concerts/2026-41st-program/",
      label: "開啟第 41 屆《為伍》線上節目冊",
      note: "線上節目冊保留第 41 屆《為伍》演出當日的完整內容與閱讀介面。"
    },
    programBookSource: "concerts/2026-41st-program/data/concert-41st.js",
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
    sources: [
      "第 41 屆《為伍》線上節目冊（2026-08-06 校正版）",
      "丁肇賢指揮提供之曲序、各曲指揮分配、曲目介紹與個人介紹資料",
      "黃鈺芠本人提供之個人介紹資料",
      "OPENTIX 售票頁（2026-07-18）"
    ],
    status: "confirmed",
    intro: [
      "「為伍」代表相聚、陪伴與同行。睽違六年，嘉義高中校友管樂團與在校生重新回到嘉義市政府文化局音樂廳，讓不同世代的嘉中管樂人再次在同一座舞台相遇。",
      "上半場由經典管樂原創與民謠作品展開，並由黃鈺芠擔任 Philip Sparke《Manhattan》小號獨奏；下半場則橫跨電玩交響組曲、流行音樂、電影音樂與日本 City Pop，呈現管樂團多元的聲音面貌。"
    ],
    notes: "基本演出資訊、三位樂團指揮、小號獨奏與正式曲序已依目前可確認資料更新；完整演出人員、幕後工作人員及贊助致謝仍待確認。"
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
    archiveComplete: true,
    date: "2006-08-26",
    time: "19:30",
    venue: "嘉義市文化中心音樂廳",
    venueNote: "今嘉義市政府文化局音樂廳",
    hostHead: "",
    metaDescription: "2006 年第 22 屆國立嘉義高中管樂團校友暨在校生聯合音樂會完整紀錄：8 月 26 日於嘉義市文化中心音樂廳演出，由顏崇勝指揮、8301 高崇文客席指揮，8861 簡晟軒擔任長號獨奏。",
    lede: "2006國立嘉義高中管樂團校友暨在校生聯合音樂會",
    introTitle: "演出的話",
    intro: [
      "嘉義高中管樂隊歷史悠久，可以說是與嘉義高中一同成長與茁壯。七十五年來，樂隊的學生經歷過無數次的表演活動及完成了各項勤務，近年來由於各項管樂節慶活動的實行，使得嘉中樂隊有機會得到更多發展的空間，而樂隊也漸漸地提昇水準，邁向專業化及制度化，成為雲嘉地區數一數二的管樂隊。",
      "本校舉辦校友聯合音樂會已經二十二年了，每年都會有許多校友積極主動地參與，重溫過去在學校的生活以及在樂隊練習的快樂時光，而校友聯合音樂會更代表著嘉義高中樂隊七十五年來的縮影。",
      "嘉中已獲教育部核准，自今年（95年）8月新生報到後立即成立管樂班，以配合嘉義市政府的國際管樂節，希望有興趣的新生參加遴選，以使嘉中的管樂素質能更為提升。",
      "願這場音樂會，能夠帶給您另類的感動！",
      "嘉義高中校長　何經",
      "2006年8月26日"
    ],
    archiveSections: [
      {
        title: "嘉義高中管樂隊簡介",
        content: [
          "嘉義高中管樂隊成立於民國二十年，七十五年來培育了無數的音樂人才。自民國六十五年台灣區音樂比賽高中職組比賽優等之後，迭有佳績、得獎無數。2001年三月更受日本濱松市國際管樂節邀請赴日，參與活動演出；此外，本隊在校生也常受邀出席各項活動演出，且每次皆能圓滿達成、廣受好評，實為本團隊員們不斷努力所得到的成果。",
          "自1974年起，每年暑假舉辦校友暨在校生聯合演奏會，本隊隊員特別犧牲假期來參加集訓，為的是以音樂來回饋社會，使愛好音樂的朋友們能有高尚正當的休閒活動。當然還有其他各界的菁英，如行政院長、主任醫師、新聞記者、廣播節目製作人、職業歌手、法界人士等，顯示嘉義高中管樂隊校友團多年持續不墬的的素質與水準。",
          "我們用管樂刻寫歷史，我們用管樂璀璨青春，我們用管樂豐富生命；把「演奏好的音樂、並將音樂演好」作為努力的起點與終點，顯然這是一段漫長的道路。"
        ]
      }
    ],
    conductors: [
      {
        name: "顏崇勝",
        showProfileLink: false,
        role: "指揮",
        concertRole: "指揮",
        concertPhoto: "assets/img/concerts/2006-program/person-yan-chong-sheng.webp",
        concertBio: [
          "顏崇勝（1974-）",
          "最高學歷：國立台灣師範大學音樂系理論作曲碩士、國立台灣師範大學音樂系",
          "現任：國立嘉義高中音樂專任教師、國立嘉義高中管樂隊指導",
          "出生於嘉義市，畢業於嘉義高中、國立台灣師範大學音樂系以及國立台灣師範大學音樂系研究所。主修理論作曲，啟蒙於黃燕忠教授，先後師事於盧炎、曾興魁與柯芳隆等教授；副修鋼琴，啟蒙於黃娟娟老師，先後師事侯宜彣、詹興東與盧昭洋教授。現任教於國立嘉義高中音樂資優班並擔任召集人，並擔任國立嘉義高中管樂隊指導。。",
          "就讀嘉義高中期間，多次獲得作曲比賽首獎並代表嘉義市參加省賽，成績優異。高中畢業後，以唯一志願錄取國立台灣師範大學音樂系，在校期間擔任國樂社指揮，擔任指揮期間並赴新加坡與馬來西亞等地巡迴，並演出為介紹國樂器編寫之《台灣民謠組曲》，深獲好評。1995年並指揮國樂社參加全國國樂合奏大賽，並於全國十六支大專隊伍中脫穎而出，榮獲優等第一名。1996年於國立台灣師範大學音樂系演藝廳舉辦作品發表會，發表《雙大提琴幻想曲》、《低吟》、《弦樂四重奏第一號》、《室內樂-悠游》、《聲樂作品-卜算子》、《弦樂四重奏第二號》…等作品。",
          "1999年起受聘於國立嘉義高級中學，並擔任音樂資優班樂理、和聲、視唱、聽寫與理論作曲之專任教師至今，並連續六年指揮嘉義高中管樂隊參加嘉義市國際管樂節以及校友暨在校生聯合音樂會。2000年擔任由國內知名作曲家黃婉真之台語文歌劇作品－《奪金記》首演之音樂總監。2001年3月指揮嘉義高中管樂隊代表台灣赴日本參加第五屆濱松國際管樂節演出，同年4月以雙料榜首之極優異成績同時錄取國立台灣師範大學音樂研究所理論作曲組與輔仁大學樂團指揮組。同年12月，於嘉義國際管樂節之管樂觀摩會中，指揮嘉義高中管樂隊，榮獲「最佳表演藝術獎」殊榮。2003年5月，與黃燕忠教授等人於嘉義市文化中心音樂廳舉辦作品發表會，發表《鋼琴三重奏－嘉義民謠幻想曲》與《五重奏－台灣壬午年》。2004年6月於國立台灣師範大學音樂系舉辦作品發表會，發表《隨機》、《電視八重奏》、《創世紀》等作品。2005年4月受日本天理教邀請編寫大型管絃樂曲《望春風》；同年5月，受國內知名室內樂團賞音室內樂集邀請，編寫一系列台灣民謠組曲，並於高雄文化中心至德堂以及台南成功大學成功廳演出，皆深獲好評。"
        ]
      },
      {
        name: "高崇文",
        num: "8301",
        showProfileLink: false,
        role: "客席指揮",
        concertRole: "客席指揮",
        concertPhoto: "assets/img/concerts/2006-program/person-gao-chong-wen.webp",
        concertBio: [
          "台灣嘉義縣鄒族原住民，17歲時由黃仲浩老師啟蒙學習長號。",
          "1997年通過甄試保送國立藝術學院音樂系〔今國立台北藝術大學音樂學院〕，主修長號師事John van Deursen樊德生老師，1999年獲台灣區音樂比賽長號獨奏成人組優等第一，並分別於2001、2002及2003年舉辦三場個人音樂會，皆頗受好評。",
          "在校期間除與管樂團、管絃樂團及長號重奏團排練演出外，於校外更積極參與如台灣銅管五重奏、深藍銅管五重奏等活耀的室內樂團體演出，亦曾多次隨國家交響樂團、台北市交、台北愛樂、天使之翼管樂團及台北青年管樂團等出國巡迴或於國家音樂廳演出。",
          "2002年進入國防部示範樂隊服役擔任長號首席，曾獲選為國軍93年度績優士兵，並獲部長頒獎表揚，於2004年3月退伍。",
          "2004年9月通過高雄市交響樂團甄選擔任長號專任演奏員至今；同時擔任屏東女中音樂班、高雄縣瑞興國小、高雄市大義國中、中正、前金、陽明、國小管樂團長號教師。"
        ]
      }
    ],
    soloists: [
      {
        name: "簡晟軒",
        num: "8861",
        showProfileLink: false,
        instrument: "長號",
        work: "Concerto Trombone and Band",
        concertRole: "長號獨奏",
        concertPhoto: "assets/img/concerts/2006-program/person-jian-cheng-xuan.webp",
        concertBio: [
          "1984　出生於嘉義縣新港鄉。",
          "1999　進入嘉義高中，加入管樂社始學長號，由宋光清老師啟蒙。",
          "2000　89學年度獲嘉義市音樂比賽長號獨奏第一名。",
          "2002　進入高雄師範大學就讀，主修長號，師事蔡佳融老師。",
          "2004　93學年度獲得高雄市音樂比賽長號獨奏第一名。",
          "2005　12月14日與黃雅琳、紀乃元舉辦長號、聲樂、小提琴聯合音樂會。12月18日於高雄師範大學藝術大樓中庭舉辦個人第一場獨奏會Sing with Trombone。",
          "2006　5月6日於高雄師範大學藝術大樓舉辦個人畢業音樂會。"
        ]
      }
    ],
    programTitle: "曲目介紹",
    program: [
      {
        section: "上半場",
        localTitle: "波斯序曲",
        foreignTitle: "Persis Overture",
        composer: "James L. Hosay",
        description: "本曲是由ABA（快、慢、快）型式所構成。曲子一開始即以寬廣華麗的齊奏，描繪出波斯帝國的雄偉壯觀。接著，在雙簧管和法國號的交叉旋律中，緩緩地道出一段淒美的故事。最後，作者巧妙了運用「卡農」的形式，由法國號引入，接著，小號、木管陸續加入，在木管與銅管等數條不同的旋律線交錯演奏中，強而有力的結束。（洪敏睿）",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "第二組曲",
        foreignTitle: "Second Suite For Band",
        composer: "Alfred Reed",
        note: "I. Son Montuno／II. Tango／III. Guaracha／IV. Paso Doble",
        description: "作曲家根據拉丁美洲的傳統音樂所創作，一共可分為四個樂章。在第一樂章中，作者在豎笛、長笛及小號的輕快旋律中，為這首組曲揭開了序幕。第二樂章探戈是一種優雅嫵媚，動作輕柔，具有紳士風度的舞蹈，作曲家以豐富的強弱變化與各聲部間的和諧和聲，充分的展現出探戈的神韻。第三樂章瓜拉恰源自古巴，曲風俏皮而輕快，作者巧妙的運用各種樂器的特性，描繪出獨特的古巴風情。第四樂章Paso Doble意即鬥牛舞，作者使用五拍子，在複雜的拍號變換中，交織出一條條充滿動態感的旋律。（洪敏睿）",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "長號協奏曲",
        foreignTitle: "Concerto Trombone and Band",
        composer: "Launy Grondahl／arr. by Paul Ivan Moller",
        soloist: "8861 簡晟軒（長號）",
        description: "丹麥指揮家及作曲家Launy Grondahl（1886-1960）於1924年寫下這首長號協奏曲，第一樂章作曲家要求必須有相同的脈動，此樂章由一下行F小調音階的四個音展開，這四個音為整首協奏曲的個性特徵，並有許多類似裝飾奏（Cadenza）的樂段表現長號極有張力的力度。第二樂章Quasi una leggenda，時而莊嚴，時而夢幻，端看於獨奏者對於主題的想法與詮釋，在其中的一個樂段中，長號僅由持續的長音及流動而反覆的鋼琴高音聲部伴奏，聽眾們不妨想像身處在綠油油的嘉南平原風景畫中翱翔。第三樂章的開頭是由第一樂章的主題再現而成，在這個樂章終長號由連續跳音的和弦伴奏，引領聽眾在一個輪旋曲式的末章，不斷的前進到強烈的終點作結束。（簡晟軒）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "廟埕",
        foreignTitle: "The Temple Square",
        composer: "李哲藝",
        description: "作者將許多台灣廟會之獨特的音樂元素，融合入現代古典樂，充分表現出台灣民間社會中強大的包容性與世界觀。聽眾可以在樂曲中聽到許多存在於廟程市集中的音樂素材包括：歌仔戲、南管、北管、布袋戲、五聲音階、臺灣民謠，甚至有攤販的叫賣聲、民眾互相叫囂。迎神賽會的熱鬧景象一一的浮現於樂曲當中。（洪敏睿）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "小組曲",
        foreignTitle: "A Little Concerto Suite",
        composer: "Alfred Reed",
        note: "i. Intrada／ii. Siciliana／iii. Scherzo／iv. Gigue",
        description: "這首小組曲是由四部樂章所組成，開場曲INTRADA是首莊嚴的導入曲。第二首呈現出神秘且閑靜的小夜曲風，又帶有憂鬱的情調。第三首SCHERZO全首的旋律及節拍以木管為中心而分成3部，是一首輕快的演奏曲。第四首GIGUE舞曲具有法國和英國風的舞曲。（洪敏睿）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "シング シング シング",
        foreignTitle: "Sing-Sing-Sing",
        composer: "Louis Prima／arr. by Naohiro Iwai",
        description: "Sing Sing Sing 自1936年出版以來，一直以標準的經典爵士樂名曲之名而備受歡迎，現在在日本已有相當的名氣。本曲以Swing（搖擺）的風格貫串全曲，在既定的節奏上，變化出多種的旋律。強烈而持續的Bass、高度技巧的Solo演出、捉摸不定的旋律走向和令人亢奮的曲風，就是爵士樂迷人的地方。今夜爵士，絕世樂音=Tonight Is A Swing Night !!!=（洪敏睿）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "日本風情畫六",
        foreignTitle: "ジャパニーズ・グラフィティ VI",
        composer: "Takuto Yoshida／arr. by Takashi Hoshide",
        description: "本曲是由四首日本早期的流行曲子集合改編而成，全曲充滿了懷舊的70年代風味。「UFO」是當時兩位日本歌手團體，因獨特的舞蹈而風靡一世的代表作。UFO般的特異曲風，為現代樂中之少有。「魅せられて」則是由台灣歌手翁倩玉，以異國情調之風演唱，而大紅的曲子。「シクラメンのかほリ」曲風猶如送別故人一般，穩重而哀傷。而最後的「襟裳岬」則以小號與薩氏管的獨奏來詮釋。在最後樂團的齊奏中，將這首曲子完美的結束。（洪敏睿）",
        status: "confirmed"
      }
    ],
    programNote: "曲目順序、曲名、作曲／編曲者、各樂章與曲目介紹均依 2006 年正式節目冊原文呈現；節目冊以「中場休息」分為上下半場。",
    performersTitle: "演出成員",
    performerNote: "演出成員姓名依節目冊原文呈現；校友編號經校友名錄比對後，僅為姓名唯一吻合者加註。",
    performerGroups: [
      { role: "指揮", people: ["顏崇勝"] },
      { role: "客席指揮", people: ["高崇文"] },
      { role: "樂團首席", people: ["尹威群"] },
      { role: "短笛", people: ["許景斌"] },
      { role: "長笛", people: ["蔡沛霖", "李子沛", "方千碩"] },
      { role: "雙簧管", people: ["黃耀瑩"] },
      { role: "單簧管", people: ["李吉峰", "賴俊甫", "江俊漢", "張馨勻", "黃信又", "陳正龍", "謝介豪", "吳治先", "吳瑩娟", "尹威群", "吳宜靜"] },
      { role: "薩克管", people: ["鄭鈞元", "江嘉榮", "陳鈺涵", "陳韋志", "林建碩", "許竣榮"] },
      { role: "低音管", people: ["劉怡汝"] },
      { role: "法國號", people: ["王駿傑", "魏仕杰", "張世明", "洪敏睿", "陳雍璿"] },
      { role: "小號", people: ["陳明陽", "楊秉驊", "古峻錡", "劉全盛", "王嘉欣", "朱翊嘉"] },
      { role: "長號", people: ["呂冠穎", "簡晟軒", "鄭嘉緯", "蔡秉璋", "方崇任"] },
      { role: "上低音號", people: ["張傑銘", "何志新"] },
      { role: "低音號", people: ["翁啟榮", "丁肇賢", "劉嘉欣"] },
      { role: "低音提琴", people: ["柳瑞宗", "林唐禾"] },
      { role: "打擊", people: ["詹舒閔", "葉祈政", "陳英杰", "蕭彥廷", "唐懿成", "張中銘", "林祐成", "游茗偉"] }
    ],
    adminTitle: "演出單位",
    adminRows: [
      { role: "主辦單位", people: ["國立嘉義高級中學"] },
      { role: "協辦單位", people: ["嘉義市文化局", "嘉義市管樂團"] },
      { role: "演出單位", people: ["國立嘉義高中校友暨在校生聯合管樂團"] },
      { role: "特別贊助", people: ["城隍廟", "光正萬教殿", "財團法人天主教聖馬爾定醫院", "嘉義高中校友會", "嘉義高中家長會"] }
    ],
    sponsorsTitle: "贊助單位與特別感謝",
    sponsorParagraphs: [
      "贊助單位（依筆劃順序）",
      "二丫頭麻辣涼麵、尹碧瑤小姐、日雅御田火鍋、北港伯、功學社樂器、名牌機車行、吉安旅行社、光正萬教殿、吳惠香小姐、吳阿姨、尚學書局、林岳數學、阿米咯餐飲連鎖企業、金象國術館、咕咕雞、金超群電子專賣店、軍友商社、故鄉牛排館、紀裕庭先生、皇冠租書城（中山店）、美小舖、春來自助餐、宸舫樂器、紐約投注站、高正川牙醫診所、陳嘉琳小姐、陳彩緞小姐、陳慧珍小姐、張家祥先生、理想牙科、陳俊雄婦產科、勝元進出口商、黃阿蘭小姐、黃炳中、黃偉洲先生、黃宏祥先生、琇麗花坊、陽明補習班、陽明補習班、聖馬爾定醫院、嘉義高中家長會、嘉義高中校友會、嘉義城隍廟、趙祥凱先生、臺北大碗麵、錦鴻免洗餐俱行、簡單雞肉飯、蘇明忠先生",
      "特別感謝",
      "何經校長、學務處李嘉彰主任、社團活動組葉國宗組長、黃璇璇老師、馮朝君學長、嘉義高中音樂資優班、嘉義市管樂團、施淵文先生、朱志群先生、周俊男先生"
    ],
    ticket: { type: "free", price: "", channels: [], note: "免費入場" },
    poster: "assets/img/concerts/2006-program/page-01.webp",
    page: "concerts/2006-22nd.html",
    gallery: [],
    news: [],
    programBookIntro: "原始節目冊共 10 張掃描檔；可左右滑動瀏覽，點開圖片後可用左右鍵切換頁面。",
    programBook: [
      { src: "assets/img/concerts/2006-program/page-01.webp", caption: "2006 年第 22 屆聯合音樂會節目冊封面" },
      { src: "assets/img/concerts/2006-program/page-02.webp", caption: "節目冊：嘉義高中管樂隊簡介與嘉義高中校長何經〈演出的話〉" },
      { src: "assets/img/concerts/2006-program/page-03.webp", caption: "節目冊：演出曲目" },
      { src: "assets/img/concerts/2006-program/page-04.webp", caption: "節目冊：指揮顏崇勝" },
      { src: "assets/img/concerts/2006-program/page-05.webp", caption: "節目冊：〈波斯序曲〉、〈第二組曲〉、〈長號協奏曲〉曲目介紹" },
      { src: "assets/img/concerts/2006-program/page-06.webp", caption: "節目冊：〈廟埕〉、〈小組曲〉、〈Sing-Sing-Sing〉、〈日本風情畫六〉曲目介紹" },
      { src: "assets/img/concerts/2006-program/page-07.webp", caption: "節目冊：客席指揮 8301 高崇文與長號獨奏 8861 簡晟軒" },
      { src: "assets/img/concerts/2006-program/page-08.webp", caption: "節目冊：演出成員" },
      { src: "assets/img/concerts/2006-program/page-09.webp", caption: "節目冊：贊助單位與特別感謝" },
      { src: "assets/img/concerts/2006-program/page-10.webp", caption: "節目冊：財團法人天主教聖馬爾定醫院廣告" }
    ],
    supplementTitle: "網站補充資訊",
    supplementNotes: [
      "以上演出介紹、團隊簡介、人物介紹、曲目與解說、演出成員、贊助與致謝，均按 2006 年紙本節目冊原文轉錄；僅移除紙本分行並調整網站顯示空格，未以今日狀態改寫。",
      "節目冊曲目頁印作「Concerto Trombone and Band」，曲目介紹頁印作「Concerto for trombone」；網站曲目標題依曲目頁呈現，介紹則保留介紹頁原文。",
      "節目冊原文保留「不墬的的」、「巧妙了運用」、「廟程市集中」、「活耀的室內樂團體」、「Takuto Yoshida」與「シクラメンのかほリ」等當年印刷文字，不逕行改寫。",
      "節目冊所列「嘉義市文化中心音樂廳」，現為嘉義市政府文化局音樂廳。"
    ],
    sources: [
      "2006 年第 22 屆國立嘉義高中管樂團校友暨在校生聯合音樂會節目冊（全 10 張掃描檔，2026-08-20 掃描）"
    ],
    sourceNote: "本頁日期、時間、場地、票務、校長序文、團隊簡介、人物介紹、曲目與解說、演出成員、演出單位、贊助致謝及節目冊影像，均來自 2006 年第 22 屆紙本節目冊。正文按原文轉錄，僅移除紙本分行並調整網站顯示空格；當年用語、人物狀態與節目冊內部異文均予保留。",
    status: "confirmed",
    notes: "2006 年正式節目冊已確認屆次、日期、時間、場地、免費入場、指揮、客席指揮、長號獨奏、曲目、演出成員、人物介紹、演出單位、贊助與致謝；節目冊未另列主題名稱。"
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
    id: "2004-20th",
    nth: 20,
    year: 2004,
    rocYear: 93,
    title: "迴響．回想",
    subtitle: "慶祝嘉義高中80週年校慶",
    archiveComplete: true,
    date: "2004-07-15",
    endDate: "2004-07-18",
    time: "",
    venue: "彰化高中雨賢館演奏廳／台南縣立文化中心音樂廳／嘉義市文化中心音樂廳",
    venueNote: "三場巡迴演出",
    hostHead: "",
    sessions: [
      { label: "彰化場", date: "2004-07-15", time: "19:30", venue: "彰化高中雨賢館演奏廳", conductor: { name: "顏崇勝" } },
      { label: "台南場", date: "2004-07-17", time: "19:30", venue: "台南縣立文化中心音樂廳", conductor: { name: "顏崇勝" } },
      { label: "嘉義場", date: "2004-07-18", time: "15:00", venue: "嘉義市文化中心音樂廳", conductor: { name: "顏崇勝" } }
    ],
    metaDescription: "2004 年第 20 屆國立嘉義高中管樂團校友暨在校生聯合音樂會《迴響．回想》完整紀錄：7 月 15、17、18 日於彰化、台南、嘉義巡迴演出，由顏崇勝指揮，8811 吳昭男擔任長笛獨奏。",
    lede: "2004國立嘉義高中管樂團校友暨在校生聯合音樂會巡迴演出",
    summary: "慶祝嘉義高中80週年校慶",
    introTitle: "演出的話",
    intro: [
      "嘉義高中管樂隊歷史悠久，幾乎是與嘉義高中一同成長與茁壯。七十三年來，樂隊的學生完成了無數次的表演活動及各種勤務，近年來，更由於政府的大力推廣，及各項管樂節慶活動的實行，使得嘉中樂隊得以有更多發展的空間，而樂隊也漸漸地提昇水準，邁向專業化及制度化，成為雲嘉地區數一數二的管樂隊。",
      "音樂可以帶給人們心靈上的喜樂與平安，透過曼妙的音符，洗滌了生活中的煩悶與憂傷，使人類的生活更加祥和，心靈也更加平靜。樂隊七十三年來帶給嘉義高中無數的音樂饗宴及豐富的精神生活，當然我們也希望這樣美好的音樂能夠回饋給社會。今年是嘉義高中走入八十週年歷史的一個里程碑，樂隊舉辦校友聯合音樂會也進入第二十週年，今年除了在熟悉的嘉義場地演出之外，我們也在彰化高中及新營文化中心各辦了一場音樂會，這是樂隊第一次的巡迴演出，一方面是慶祝學校及樂隊走向新的里程碑，另一方面也希望我們的音樂可以走出嘉義，讓其他地方的人也可以聽到我們用心演奏的音樂。每年的校友聯合音樂會都會有許多校友積極主動的參與，今年更是有校友組成了「校友後援會」，不但給在校生許多幫助，也重溫了他們以前在學校生活以及在樂隊練習的快樂時光，而校友聯合音樂會更代表著嘉義高中樂隊七十三年來的縮影，除了帶給社會更豐富的精神生活，更傳承著嘉義高中「質實剛健」的精神。",
      "願這場音樂會，能夠帶給您一些感動！",
      "嘉義高中校長　何經",
      "2004年7月"
    ],
    archiveSections: [
      {
        title: "嘉義高中管樂隊簡介",
        content: [
          "嘉義高中管樂隊成立於民國二十年，七十三年來培育了無數的音樂人才。自民國六十五年台灣區音樂比賽高中職組比賽優等之後，迭有佳績、得獎無數。",
          "2001年三月更受日本濱松市國際管樂節邀請赴日，參與活動演出；此外，本隊在校生也常受邀出席各項活動演出，且每次皆能圓滿達成、廣受好評，實為本團隊員們不斷努力所得到的成果。",
          "嘉義高中管樂隊的同學們，平日忙於功課、承擔升學的壓力外，在參與樂隊的過程中接受嚴格的要求。學長制度的運作下，學長們學習著如何愛護、指導、管理學弟妹，學弟妹們學習如何尊敬、服從學長；行政管理方面，由於學校方面的充分授權，制度的建立、修正與貫徹，樂隊幹部的職權分配與事務推動，甚至龐大的開支經費，皆由同學們自行統籌辦理；音樂方面則由指導老師從基本教材的選擇、音樂會的規劃、演奏曲目的合奏指導無不竭盡心力仔細教導，祈使同學們在音樂素養上能夠獲得助益，並在生活中能有正當的活動提供調劑和紓解。如此，期許嘉義高中管樂隊的各位同學們藉由參加樂隊，在做人處世與品行修養上皆有足堪傲人的典範。",
          "自民國七十四年起，每年暑假舉辦校友暨在校生聯合演奏會，一來聯絡感情、二來校友們將個人在各大專院校樂團所吸收的演奏技巧，利用暑假返回母校，指導學弟妹們並參加校友聯合演奏會的演出，使得本隊隊員之演奏技巧有長足的進步。本隊隊員特別犧牲假期來參加集訓，為的是以音樂來回饋社會，使愛好音樂的朋友們能有高尚正當的休閒活動。",
          "當然還有其他各界的菁英，如行政院長、主任醫師、新聞記者、廣播節目製作人、職業歌手、法界人士等，顯示嘉義高中管樂隊校友團多年持續不墜的的素質與水準。",
          "我們用管樂刻寫歷史，我們用管樂璀璨青春，我們用管樂豐富生命；把「演奏好的音樂、並將音樂演好」作為努力的起點與終點，顯然這是一段漫長的道路。"
        ]
      },
      {
        title: "心靈手記",
        content: [
          "靜靜地聽，我的心呀，聽那世界的低語，這是它對你求愛的表示呀。",
          "Listen, my heart, to the whispers of the world with which it makes love to you.",
          "水裡的游魚是沉默的，陸地上的獸類是喧鬧的，空中的飛鳥是歌唱著的。但是，人類卻兼有海裡的沉默，地上的喧鬧與空中的音樂。",
          "The fish in the water is silent, the animal on the earth is noisy, the bird in the air is singing. But Man has in him the silence of the sea, the noise of the earth and the music of the air.",
          "瞬刻的喧聲，譏笑著永恆的音樂。",
          "The noise of the moment scoffs at the music of the Eternal."
        ]
      }
    ],
    conductors: [
      {
        name: "顏崇勝",
        showProfileLink: false,
        role: "指揮",
        concertRole: "指揮",
        concertPhoto: "assets/img/concerts/2004-program/person-yan-chong-sheng.webp",
        concertBio: [
          "出生於嘉義市，畢業於嘉義高中、國立台灣師範大學音樂系以及國立台灣師範大學音樂系研究所。主修理論作曲，啟蒙於黃燕忠教授，先後師事於盧炎、曾興魁與柯芳隆等教授，副修鋼琴，啟蒙於黃娟娟老師，並先後師事侯宜彣、詹興東與盧昭洋教授。現任教於國立嘉義高中音樂資優班，並擔任國立嘉義高中管樂隊指導。",
          "就讀嘉義高中期間，多次獲得作曲比賽首獎並代表嘉義市參加省賽，成績優異。高中畢業後，以唯一志願錄取國立台灣師範大學音樂系，在校期間擔任國樂社指揮，擔任指揮期間並赴新加坡與馬來西亞等地巡迴，並演出為介紹國樂器編寫之《台灣民謠組曲》，深獲好評。1995年並指揮國樂社參加全國國樂合奏大賽，並於全國十六支大專隊伍中脫穎而出，榮獲優等第一名。1996年於國立台灣師範大學音樂系演藝廳舉辦作品發表會，發表《雙大提琴幻想曲》、《低吟》、《弦樂四重奏第一號》、《室內樂－悠游》、《聲樂作品－卜算子》、《弦樂四重奏第二號》⋯等作品。",
          "1999年受聘於國立嘉義高級中學，並擔任音樂資優班樂理、和聲、視唱、聽寫與理論作曲之專任教師，並連續五年指揮嘉義高中管樂隊參加嘉義市國際管樂節以及校友暨在校生聯合音樂會。2000年擔任由國內知名作曲家黃婉真之台語文歌劇作品－《奪金記》首演之音樂總監。2001年3月指揮嘉義高中管樂隊代表台灣赴日本參加第五屆濱松國際管樂節演出，同年4月以雙料榜首之極優異成績同時錄取國立台灣師範大學音樂研究所理論作曲組與輔仁大學樂團指揮組。同年12月，於嘉義國際管樂節之管樂觀摩會中，指揮嘉義高中管樂隊，榮獲「最佳表演藝術獎」殊榮。2003年5月，與黃燕忠教授等人於嘉義市文化中心音樂廳舉辦作品發表會，發表《鋼琴三重奏－嘉義民謠幻想曲》與《五重奏－台灣壬午年》。2004年6月於國立台灣師範大學音樂系舉辦作品發表會，發表《隨機》、《電視八重奏》、《創世紀》等作品。"
        ]
      }
    ],
    soloists: [
      {
        name: "吳昭男",
        num: "8811",
        showProfileLink: false,
        instrument: "長笛",
        work: "Concertino for Flute Op.107",
        concertRole: "長笛獨奏",
        concertPhoto: "assets/img/concerts/2004-program/person-wu-zhao-nan.webp",
        concertBio: [
          "吳昭男－個人簡介",
          "嘉義市人",
          "生於1985年",
          "由殷瑞霙老師、林鈺惠老師啓蒙，從小學習長笛。",
          "國中就讀嘉義國中音樂班，13歲時參加嘉義市音樂比賽，獲少年組長笛甲等第二名。",
          "1999年進入嘉義高中音樂班就讀，並參加了嘉義高中管樂隊，在校期間也在嘉義市音樂比賽獲青少年組長笛優等第二名。",
          "2002年入東海大學音樂系就讀，主修長笛，師事戴念平老師。",
          "2003年舉辦長笛二重奏音樂會頗受好評。",
          "現為東海大學音樂系二年級學生。"
        ]
      }
    ],
    programTitle: "曲目介紹",
    program: [
      {
        section: "上半場",
        localTitle: "佛羅倫斯人進行曲",
        foreignTitle: "Florentiner March",
        composer: "Julius Fucik／Arr. by M. L. Lake",
        description: "樂曲首先以小號領奏，奏出後起拍的動機，隨後銜接長笛與短笛旋律，連續兩次之後進入第一段主題。主題是以十六分音符與八分音符構成的簡單而熱鬧非凡的旋律線，以木管為主要樂器，銅管為次要樂器，樂句結構單純，第二段主題由強烈低音銅管接手，木管則為節奏與和聲，展現出銅管的氣魄。中段主題顯現出與第一及第二主題截然不同的曲趣，音樂進入全曲最富旋律感的樂段，此時上低音號與木管聯合吹奏旋律，旋律以相當規律的四分音符與二分音符構成穩定的線條，為即將再現的第一主題預留力度與張力的空間。最後在兩小節的「極漸慢」之後，第三段以不同的速度變化再次反覆，並隨著速度的加快以及音樂織度的豐富變化，音樂進入最後高潮，結束在兩個強烈的十六分音符。（顏崇勝）",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "神曲",
        foreignTitle: "The Divine Comedy",
        composer: "Robert W. Smith",
        description: [
          "這組管樂曲是以但丁的名著“神曲”為底本所寫成的，在原著中，神曲共分為地獄、煉獄及天堂三個部分，敘述著作者在這三界中旅行的經過，故事的內容在描寫作者自身迷失於一座黑暗的森林中，他想跑出森林，跑上那象徵道德的光輝中的山丘，可是卻遇到很多的阻礙，在惶恐中，有一位詩人前來將他救出，且領他去遊地獄、煉獄和天堂。而在改編成管樂曲的時候，又在煉獄跟天堂之間加了一首“昇天”，是描寫從煉獄到天堂的過渡地帶，這四首曲子中用了很多樂器的獨奏及打擊特殊的音色來做效果，其中更有好幾段用人聲唱的聖詠旋律，為曲子添加了更多豐富的色彩。",
          "I 地獄：地獄用雙簧管的獨奏拉開序幕，在定音鼓的氣氛助長下，地獄之門終於打開，法國號的旋律正象徵著地獄中慘不忍睹的各種酷刑，給人一種陰森的感覺，接著銅管一連串的點音，似乎宣告著什麼冤屈，為整首曲子添加了緊張的氣氛，沉寂之後，出現了鐵鍊的聲音，地獄中的靈魂正在接受審判，此時強而有力的銅管聲出現，又回到一開始的景象，在定音鼓精采的過門中劃下句點。",
          "II 煉獄：地獄承接在地獄之後，煉獄裡住的只是一些犯小過錯的人，刑罰較不慘重，整曲用法國號當主軸，也有高音薩克管和長笛的獨奏，製造懸疑的氣氛，雖然還是有鐵鍊的束縛，但已不像地獄般沉重，除了呻吟聲外，也可以聽到祈禱式的歌唱，在低音鼓的襯托下，銅管的旋律顯的堅定，而木管的快速音符就像是煉獄中的岩漿，暗中波濤洶湧，在喧鬧之後又恢復寂靜，由高音薩克管緩緩唱出尾奏。",
          "III 昇天：相較於在地獄及煉獄中的灰暗，這首曲子充滿了祥和的感覺，一開始小號溫柔的吹出旋律，象徵受到了天神的指示及淨化，在木管快速音符的帶領下，仰視著太陽，準備前往天堂，在美妙的長笛及聖詠合唱的伴隨下，彷彿獲得了昇華，小號用響亮的高音帶領著其他銅管，奏出莊嚴的旋律，在強烈的音響中，以極高速飛向天堂，到達了聖地。",
          "IV 天堂：天堂一開始清脆的鐵琴搭配著美妙的風鈴聲，營造出一片安詳，有天使降臨的感覺。從地獄的殘酷走到天堂的莊嚴肅穆，在這首曲子中特別用了很多明亮的和聲，除了讓聲音聽起來飽滿，也讓人聽起來有耳目一新的感覺，擺脫了之前的灰暗與沉重，這首曲子聽起來沒有前幾首的緊張與困難，但每個音符都需要用心的感受及體會。我們用心演奏了這首組曲，希望能帶給您一些感動。（王聖安、林建碩）"
        ],
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "D大調長笛小協奏曲 作品107",
        foreignTitle: "Concertino for Flute Op.107",
        composer: "Cecile Chaminade／Arr. by Clayton Wilson",
        soloist: "吳昭男",
        description: "長笛此首小協奏曲乃是出自於法國作曲家C. Chaminade之手，在長笛的曲子中算是一首常被演奏的曲子，旋律十分好聽，耳熟能詳。一開始即由一段中板且富有感情的旋律為此曲拉開序幕，樂隊在後以豐富的和聲作為伴奏，中間部分漸漸由抒情的樂句轉變成生動、輕快的樂段，原本厚重的樂團和聲也逐漸隨著獨奏者而活潑起來，接著是一段裝飾奏（Cadenza），此時樂團完全停止，是獨奏者最能表現自己特色的部分，在演奏者精湛的演出之後，樂團又隨即跟出，回到一開始的主題，轉為更輕快、快速的樂句，最後華麗的結束此曲。（吳昭男）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "消失的加勒比人",
        foreignTitle: "Caribbean Hideaway",
        composer: "James Barnes",
        description: "這是一首極富色彩、韻律及節奏的曲子，在這首曲子中打擊樂器佔了很重要的地位，像響板、牛鈴、沙鈴⋯等，營造出熱鬧非凡的感覺，雖然整曲只有三分多鐘，但是卻富有多樣的變化，木管活潑的音符快速的跳動著，時而輕快，時而悠揚，最後幾個漸弱消失的音符，不但富有神秘感，也給人一種餘音繞樑的感覺，值得細細品味。（王聖安）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "賽爾特民謠組曲",
        foreignTitle: "Suite on Celtic Folk Songs",
        composer: "Tomohiro Tatebe",
        description: "這首組曲是三首古愛爾蘭的民謠所組成的，中世紀時，賽爾特族人征服了歐洲的土地，並移居到北邊的愛爾蘭，與當地的原住民文化融合，產生了新的文化，而這首曲子就是文化融合之後所產生的。第一個曲子“March”一開始就由小鼓的重拍領導整曲，節奏鮮明，再來是銅管樂器強而有力的低音，給人一種剛正不阿的感覺。第二首“Air”是一首旋律優美且充滿鄉愁的曲子，原本是由提琴類樂器及愛爾蘭傳統的樂器－風笛來演奏，但經過改編之後，由短笛的獨奏及法國號溫柔的音色來呈現。第三首“Reel”是一首典型的快板愛爾蘭舞曲，從頭到尾都維持著輕快的步伐，在激烈的舞步下搭配著豎笛不和諧的高音做出大膽的結尾。（王聖安）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "鐵達尼",
        foreignTitle: "Titanic",
        composer: "James Horner／Takashi Hoshide",
        description: "這部電影在幾年前可說是家喻戶曉，這次我們選擇吹的這個版本，將帶領大家重溫電影的每個動人情節。一開始由法國號奏出柔美的旋律，導出整個故事的開端，輕快的旋律緊接在後，描述著鐵達尼初航的熱鬧及搭乘的民眾興高采烈的神情，在愉快的出航後不久，曲風一轉，加入了沉重的撞擊聲，形容看到冰山的危急情況，其中穿插著一句變調的旋律，似乎預警著什麼不祥的事將要發生，在惶恐不安的心情中，終於船還是沉了，隨即接出的是一段哀弔式的悲痛旋律，最後是大家最耳熟能詳的鐵達尼主題曲，溫柔中也帶著些許的不捨與遺憾，這段旋律、這個故事，將會一直留在你我的心中。（王聖安）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "依帕內瑪姑娘",
        foreignTitle: "The Girl form Ipanema",
        composer: "A. C. Jobim & V. De Moraes／Arr. by Naohiro Iwai",
        description: "這首曲子是日本作曲家所寫的，依帕內瑪是一個熱鬧的海邊，作曲者用輕鬆的風格描寫海邊女孩撩人的姿態，整曲充滿了拉丁風味慵懶的感覺，不像恰恰或搖滾樂中使用了強烈的重音，此曲想呈現的是溫柔及舒服的氣氛，長笛及薩克管即興的獨奏顯的輕快明亮，而其他樂器沉穩的節奏在後面襯托著，形成鮮明的對比，仔細聆聽，不難想像出在蔚藍的海邊渡假的感覺喔！（王聖安）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "日本風情畫五",
        foreignTitle: "Japanese Graphity V",
        composer: "Arr. by Atsuhiro Isozaki",
        description: "自昭和三十四年起（1959），日本開始一系列的「日本歌謠唱歌大賽」，當時這項比賽被定位為「促進日本歌謠的發展與進步」。在昭和四十、五十年代，這個比賽也達到最顛峰。這一首由磯崎敦博（Atsuhiro Isozaki）編曲的日本風情畫五便是集昭和五十年代那些比賽中的著名歌曲而成。此曲一開始就是薩克管優美的旋律，接著轉為銅管，從這些耳熟能詳的旋律中，也可以感受到樂團節奏上的默契，因此我們特地將這首富有親和力的曲子放在最後，希望能引起大家熱烈的共鳴喔！（顏崇勝、王聖安）",
        status: "confirmed"
      }
    ],
    performersTitle: "演出成員",
    performerNote: "演出成員姓名依節目冊原文呈現；校友編號經校友名錄比對後，僅為姓名唯一吻合者加註。節目冊作「翁啓榮」，並於同冊校友捐款名單明列編號 7581，故以原姓名字形加註該編號。",
    performerGroups: [
      { role: "指揮", people: ["顏崇勝"] },
      { role: "長笛", people: ["吳昭男", "許景斌", "吳承洺", "張育嘉", "郭晉維"] },
      { role: "雙簧管", people: ["黃耀瑩"] },
      { role: "低音管", people: ["劉怡汝", "孫潤庭"] },
      { role: "豎笛", people: ["李吉峰", "涂靖育", "張馨勻", "黃信又", "陳正龍", "謝介豪", "吳治先", "吳瑩娟", "陳佩君", "蕭宇成", "王景銘"] },
      { role: "薩克管", people: ["陳達章", "鄭鈞元", "陳鈺涵", "陳韋志", "楊舜斌", "許竣榮", "陳韋希"] },
      { role: "法國號", people: ["劉議謙", "魏仕杰", "洪伯欣", "張世明", "吳翰萬", "阮怡嘉"] },
      { role: "小號", people: ["陳明陽", "陳奕享", "楊宗臻", "古峻錡", "劉全盛", "王嘉欣", "蔡淳任"] },
      { role: "長號", people: ["高健雄", "曾芮欣", "范國恩", "高崇文", "何宗穎", "簡晟軒", "鄭嘉緯", "蔡秉璋", "王聖安", "方崇任"] },
      { role: "上低音號", people: ["吳仁庭", "莊勝雄", "王騰寬"] },
      { role: "低音號", people: [{ name: "翁啓榮", num: "7581" }, "黃智豐", "丁肇賢", "廖時賢"] },
      { role: "打擊", people: ["馬郡隆", "黃忠琦", "詹舒閔", "陳英杰", "黃楷澍", "唐懿成", "蕭彥廷"] },
      { role: "鋼琴", people: ["王聖安"] },
      { role: "豎琴", people: ["吳瑩娟"] }
    ],
    adminTitle: "主辦、協辦與演出單位",
    adminRows: [
      { role: "主辦單位", people: ["國立嘉義高級中學", "國立彰化高級中學"] },
      { role: "協辦單位", people: ["台南縣立文化中心", "嘉義市文化局", "嘉義市管樂團"] },
      { role: "演出單位", people: ["國立嘉義高中校友暨在校生聯合管樂團", "國立彰化高中管樂社（彰化場次聯合演出）"] }
    ],
    sponsorsTitle: "感謝下列贊助單位",
    sponsors: [
      "李鐘林", "陳守道", "戴政岳", "郭汶修", "林居翰", "殷銘良", "邱建發", "咕咕雞", "大帥鍋", "尋衣園", "吉圃園", "理想牙醫",
      "阿嫂簡餐", "經典名床", "聖心藥局", "廣元藥局", "邱胃腸科", "華生診所", "奇美冰品", "崇中投注站", "鐘易晉診所", "松韻企業社", "故鄉牛排館", "學明影印店",
      "王正旭醫師", "邱碩堯醫師", "張文輝醫師", "林永祥老師", "玉味麵包店", "正宗蔘藥行", "種杏蔘藥行", "莊小寬數學", "儒林補習班", "黃曜春律師", "趙善楷先生", "順發鐵板行",
      "嘉邑城隍廟", "優格牙醫診所", "佑群牙醫診所", "安麗牙醫診所", "JUST個性商品", "運成中醫診所", "上純泡沫紅茶", "嘉義光正萬教宮", "嘉義高中校友會", "嘉義高中家長會", "中埔鄉光正萬教殿", "天主教聖馬爾定醫院"
    ],
    thanks: [
      "6401 馮朝君", "6801 游宗仁", "7502 陳志鳴", "7503 蔡文立", "7581 翁啓榮", "7593 王全福", "7654 林明峰", "7951 楊順欽", "7971 方捷立", "7981 黃智豐", "8101 陳明陽"
    ],
    sponsorParagraphs: [
      "李鐘林、陳守道、戴政岳、郭汶修、林居翰、殷銘良、邱建發、咕咕雞、大帥鍋、尋衣園、吉圃園、理想牙醫、阿嫂簡餐、經典名床、聖心藥局、廣元藥局、邱胃腸科、華生診所、奇美冰品、崇中投注站、鐘易晉診所、松韻企業社、故鄉牛排館、學明影印店、王正旭醫師、邱碩堯醫師、張文輝醫師、林永祥老師、玉味麵包店、正宗蔘藥行、種杏蔘藥行、莊小寬數學、儒林補習班、黃曜春律師、趙善楷先生、順發鐵板行、嘉邑城隍廟、優格牙醫診所、佑群牙醫診所、安麗牙醫診所、JUST個性商品、運成中醫診所、上純泡沫紅茶、嘉義光正萬教宮、嘉義高中校友會、嘉義高中家長會、中埔鄉光正萬教殿、天主教聖馬爾定醫院",
      "特別感謝校友捐款",
      "6401馮朝君、6801游宗仁、7502陳志鳴、7503蔡文立、7581翁啓榮、7593王全福、7654林明峰、7951楊順欽、7971方捷立、7981黃智豐、8101陳明陽",
      "感謝的話",
      "今晚的音樂會對我們來說有很大的意義，不只是將我們幾個月來辛苦的成果呈現給大家，也讓我們在樂隊的日子有更多美好的回憶，如今我們即將升上三年級，或許能再來樂隊練樂器的時間不多，但這場音樂會卻為我們的社團生活畫下美好的句點。在籌備音樂會的過程中，我們經歷了很多一般高中生無法體驗的事情：頂著大太陽跑遍大街小巷的募款、貼海報，規劃整個音樂會的練習時間及演出過程，這一切的經驗都給了我們一個很好的學習機會。這一路上，很感謝顏崇勝老師給我們音樂方面的指導，也作為我們與學校溝通的橋樑。也感謝許多畢業的校友學長學姐們，雖然平時學長、姐都忙於自己的工作，但只要一聽到樂隊要辦音樂會，大家總是不遺餘力的幫忙，給了我們莫大的鼓勵。最要感謝的，是那些捐款贊助我們的人，也許素未謀面，也許他們對樂隊沒有很深的了解，但我們去募款時，他們的慷慨解囊，無疑是為我們打了一劑強心針。沒有他們，這場音樂會或許無法這麼完美的呈現在大家面前，這一路上的辛苦及汗水，在今夜都將化為一顆顆音符，願這些美妙的音符能感動今晚的每一個你。",
      "管樂社91級全體敬上"
    ],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/2004-program/page-01.webp",
    page: "concerts/2004-20th.html",
    gallery: [],
    news: [],
    programBookIntro: "原始節目冊共 16 張掃描檔；可左右滑動瀏覽，點開圖片後可用左右鍵切換頁面。",
    programBook: [
      { src: "assets/img/concerts/2004-program/page-01.webp", caption: "2004 年第 20 屆《迴響．回想》節目冊封面" },
      { src: "assets/img/concerts/2004-program/page-02.webp", caption: "節目冊：嘉義高中校長何經〈演出的話〉" },
      { src: "assets/img/concerts/2004-program/page-03.webp", caption: "節目冊：嘉義高中管樂隊簡介" },
      { src: "assets/img/concerts/2004-program/page-04.webp", caption: "節目冊：指揮顏崇勝" },
      { src: "assets/img/concerts/2004-program/page-05.webp", caption: "節目冊：長笛獨奏吳昭男" },
      { src: "assets/img/concerts/2004-program/page-06.webp", caption: "節目冊：演出成員" },
      { src: "assets/img/concerts/2004-program/page-07.webp", caption: "節目冊：節目表" },
      { src: "assets/img/concerts/2004-program/page-08.webp", caption: "節目冊：〈佛羅倫斯人進行曲〉與〈神曲〉曲目介紹" },
      { src: "assets/img/concerts/2004-program/page-09.webp", caption: "節目冊：〈神曲〉、〈長笛協奏曲〉與〈消失的加勒比人〉曲目介紹" },
      { src: "assets/img/concerts/2004-program/page-10.webp", caption: "節目冊：下半場曲目介紹" },
      { src: "assets/img/concerts/2004-program/page-11.webp", caption: "節目冊：社團回憶、迴憶" },
      { src: "assets/img/concerts/2004-program/page-12.webp", caption: "節目冊：心靈手記（一）" },
      { src: "assets/img/concerts/2004-program/page-13.webp", caption: "節目冊：心靈手記（二）" },
      { src: "assets/img/concerts/2004-program/page-14.webp", caption: "節目冊：心靈手記（三）" },
      { src: "assets/img/concerts/2004-program/page-15.webp", caption: "節目冊：贊助單位、校友捐款與感謝的話" },
      { src: "assets/img/concerts/2004-program/page-16.webp", caption: "節目冊：封底廣告" }
    ],
    supplementTitle: "網站補充資訊",
    supplementNotes: [
      "以上校長序文、團隊簡介、人物介紹、曲目與解說、演出成員、贊助與致謝，均按 2004 年紙本節目冊原文轉錄；僅移除紙本分行並調整網站顯示空格，未以今日狀態改寫。",
      "節目冊節目表原印「The Girl form Ipanema」及「Japanese Graphity V」，網站依原印文字保留；一般通行曲名分別為「The Girl from Ipanema」及「Japanese Graffiti V」。",
      "〈神曲〉的〈煉獄〉解說首句原印「地獄承接在地獄之後」，網站忠實保留，不逕行改寫。",
      "〈演出的話〉稱台南場地為「新營文化中心」，封面則印作「台南縣立文化中心音樂廳」；網站分別保留兩處原文。",
      "校友捐款名單原已列校友編號；演出成員名單則依網站校友名錄補入唯一可確認之編號，未能唯一確認者不推測。"
    ],
    sources: [
      "2004 年第 20 屆國立嘉義高中管樂團校友暨在校生聯合音樂會巡迴演出《迴響．回想》節目冊（全 16 張掃描檔，2026-08-20 掃描）"
    ],
    sourceNote: "本頁演出資訊、主題、校長序文、團隊簡介、人物介紹、曲目與解說、演出成員、贊助致謝及節目冊影像，均來自 2004 年第 20 屆《迴響．回想》紙本節目冊。正文按原文轉錄，僅移除紙本分行並調整網站顯示空格；當年用語、人物狀態與節目冊內部異文均予保留。",
    status: "confirmed",
    notes: "2004 年正式節目冊已確認屆次、主題、三場巡演日期時間與場地、指揮、長笛獨奏、曲目、演出成員、人物介紹、主協辦與演出單位、贊助及致謝。"
  },
  {
    id: "2003-19th",
    nth: 19,
    year: 2003,
    rocYear: 92,
    title: "管樂．王者．夢",
    subtitle: "",
    archiveComplete: true,
    date: "2003-08-24",
    time: "15:30",
    venue: "嘉義市文化局音樂廳",
    venueNote: "",
    hostHead: "",
    metaDescription: "2003 年第 19 屆國立嘉義高中管樂團校友暨在校生聯合音樂會《管樂．王者．夢》完整紀錄：8 月 24 日於嘉義市文化局音樂廳演出，由曾膺安客席指揮、顏崇勝指揮，蕭芳照擔任豎笛獨奏。",
    lede: "2003國立嘉義高中管樂團校友暨在校生聯合音樂會",
    summary: "11種樂器的組合 68個人的努力　157小時的加練 4個人的夢想　只為了帶給您5400秒的感動",
    introTitle: "演出的話",
    intro: [
      "嘉義高中管樂隊歷史悠久，幾乎是與嘉義高中一同成長與茁壯。七十二年來，樂隊的學生完成了無數次校內外各種勤務以及表演活動，近年來，在政府積極倡導「心靈改革」與「藝術生活」以及嘉義市政府積極推動「藝術社區化、社區藝術化」與大力支持各項管樂節慶的推波助瀾之下，嘉義高中管樂隊有幸成為政策的直接受惠者，而樂隊水準的提昇更隨著管樂隊朝制度化與專業化的發展而成為雲嘉地區屬一屬二之管樂隊。",
      "音樂帶給人們心靈上的喜樂與平安，能夠洗滌凡事的憂愁與哀傷，透過曼妙的音符，使人類的生活更加祥和，人心更加平靜。樂隊七十二年來帶給嘉義高中無數的音樂饗宴與豐富的精神生活，也回饋給社會相同悠揚與美好的音樂生活。舉辦校友聯合音樂會已經十九年了，每年都會有許多校友積極主動地參與，重溫從前在學校生活以及在樂隊練習的快樂時光，而校友聯合音樂會是嘉義高中管樂隊七十二年來的縮影，不但帶給社會更豐富的精神生活，也傳承著嘉義高中「質實剛健」的精神。",
      "願這場音樂會，能夠帶給您一些感動！",
      "嘉義高中校長　何經",
      "2003年8月24日"
    ],
    archiveSections: [
      {
        title: "管樂．王者．夢",
        content: [
          "11種樂器的組合68個人的努力",
          "157小時的加練4個人的夢想",
          "只為了帶給您5400秒的感動"
        ]
      },
      {
        title: "嘉義高中管樂隊簡介",
        content: [
          "嘉義高中管樂隊成立於民國二十年，七十一年來培育了無數的音樂人才。自民國六十五年台灣區音樂比賽高中職組比賽優等之後，迭有佳績、得獎無數。",
          "2001年三月更受日本濱松市國際管樂節邀請赴日，參與活動演出；此外，本隊在校生也常受邀出席各項活動演出，且每次皆能圓滿達成、廣受好評，實為本團隊員們不斷努力所得到的成果。",
          "嘉義高中管樂隊的同學們，平日忙於功課、承擔升學的壓力外，在參與樂隊的過程中接受嚴格的要求。學長制度的運作下，學長們學習著如何愛護、指導、管理學弟妹，學弟妹們學習如何尊敬、服從學長；行政管理方面，由於學校方面的充分授權，制度的建立、修正與貫徹，隊直幹部的職權分配與事務推動，甚至龐大的開支經費，皆由同學們自行統籌辦理；音樂方面則由指導老師從基本教材的選擇、音樂會的規劃、演奏曲目的合奏指導無不竭盡心力仔細教導，祈使同學們在音樂素養上能夠獲得助益，並在生活中能有正當的活動提供調劑和紓解。如此，期許嘉義高中管樂隊的各位同學們藉由參加樂隊，在做人處世與品行修養上皆有足堪傲人的典範。",
          "自民國四十年起，每年暑假舉辦校友暨在校生聯合演奏會，一來聯絡感情、二來校友們將個人在各大專院校樂團所吸收的演奏技巧，利用暑假返回母校，指導學弟妹們並參加校友聯合演奏會的演出，使得本隊隊員之演奏技巧有長足的進步。本隊隊員特別犧牲假期來參加集訓，為的是以音樂來回饋社會，使愛好音樂的朋友們能有高尚正當的休閒活動。",
          "當然還有其他各界的菁英，如行政院長、主任、醫師、新聞記者、廣播節目製作人、職業歌手、法界人士等，顯示嘉義高中管樂隊校友團多年持續不墜的的素質與水準。",
          "我們用管樂刻寫歷史，我們用管樂璀璨青春，我們用管樂豐富生命；把「演奏好的音樂、並將音樂演好」作為努力的起點與終點，顯然這是一段漫長的道路。"
        ]
      }
    ],
    conductors: [
      {
        name: "曾膺安",
        num: "6951",
        showProfileLink: false,
        role: "客席指揮",
        concertRole: "客席指揮",
        concertPhoto: "assets/img/concerts/2003-program/person-zeng-ying-an.webp",
        concertBio: [
          "曾膺安　嘉義縣梅山鄉人",
          "1977～1983年就學於嘉義市蘭潭國中、嘉義高中，加入管樂隊學習小號。",
          "1984年迄今十餘次參與嘉中校友聯合演奏會，擔任小號演奏及合奏指揮。",
          "1985～1988年就學於實踐專校社會工作科（現實踐大學社會工作系），同時進幼獅管樂團擔任小號演奏。",
          "1988～1990年服役於國防部示範樂隊擔任小號演奏。",
          "1991～1995年進東海大學音樂系，主修小號，師事 Tom Shorthouse（加拿大籍）、彭國良、陳錫仁等三位老師，指揮課程受教於華裔指揮家麥家樂老師。",
          "1994年任職嘉義市管樂團，擔任樂團指揮及藝術總監。其間多次指揮嘉義市管樂團於國內各縣市音樂廳演出；亦常於海外如香港（第九屆亞太管樂節與管樂繽紛98）、澳門（第二屆國際管樂節）、日本濱淞（第三屆泛太平洋管樂節）等知名的管樂節慶中演出。",
          "1997～2000年多次前往美國（Mid West音樂節、WASBE管樂節）、日本（泛太平洋管樂節）、澳洲（第十屆亞太管樂節）、中國大陸（西安管樂節）等地觀摩考察音樂發展。",
          "2000～2002年兩度受邀擔任來訪之日本靜岡大學管樂團客席指揮，演出本土風格曲目。",
          "2000年擔任嘉義高中音樂班兼任教師。",
          "2000年擔任嘉義市北興國中管樂班合奏指導老師，並於2002與2003年指揮北興國中管樂團榮獲嘉義市及臺灣區音樂比賽國中A組優等第一名。",
          "2001年擔任雲林國中音樂班兼任教師。",
          "2002年指揮嘉義市管樂團與法國禁衛軍管樂團豎笛首席席維斯．航小姐合作演出韋伯豎笛協奏曲。",
          "2003年以指揮組第一名成績進入輔仁大學音樂研究所在職專班，師承郭聯昌教授，主修管弦樂指揮。"
        ]
      },
      {
        name: "顏崇勝",
        showProfileLink: false,
        role: "指揮",
        concertRole: "指揮",
        concertPhoto: "assets/img/concerts/2003-program/person-yan-chong-sheng.webp",
        concertBio: [
          "顏崇勝，1974年出生於嘉義市，畢業於崇文國小、大業國中、嘉義高中及國立台灣師範大學音樂系及音樂研究所碩士班，主修理論與作曲，啟蒙於黃燕忠教授，並先後師事於盧炎、曾興魁與柯芳隆等教授，副修鋼琴啟蒙於黃娟娟老師，並先後師事侯宜彣、詹興東與盧昭洋教授。現任教於國立嘉義高中音樂資優班，並擔任國立嘉義高中管樂隊指導。",
          "就讀嘉義高中期間，多次獲得作曲比賽首獎並代表嘉義市參加省賽，成績優異。高中畢業後，以唯一志願錄取國立台灣師範大學音樂系，在校期間擔任國樂社指揮，擔任指揮期間並赴新加坡與馬來西亞等地巡迴，並演出為介紹國樂器編寫之「台灣民謠組曲」，深獲好評。同年並指揮國樂社參加全國國樂合奏大賽，並於全國十六支大專隊伍中脫穎而出，榮獲優等第一名。",
          "1996年於國立台灣師範大學音樂系演藝廳舉辦作品發表會，發表《雙大提琴幻想曲》、《低吟》、《弦樂四重奏第一號》、《室內樂－悠游》、《聲樂作品－卜算子》、《弦樂四重奏第二號》⋯⋯等作品。",
          "1999年受聘於國立嘉義高級中學，並擔任音樂資優班樂理、和聲、視唱、聽寫與理論作曲之專任教師，並於2000年擔任由國內知名作曲家黃婉真之台語文歌劇作品－「奪金記」首演之音樂總監。2001年3月指揮嘉義高中管樂隊赴日本參加第五屆濱松國際管樂節演出，同年4月以雙料榜首之極優異成績同時錄取國立台灣師範大學音樂研究所理論作曲組與輔仁大學樂團指揮組。同年12月，於嘉義國際管樂節之管樂觀摩會中，指揮嘉義高中管樂隊，榮獲「最佳表演藝術獎」殊榮。",
          "2003年5月，與黃燕忠教授等人於嘉義市文化中心音樂廳舉辦作品發表會，發表《鋼琴三重奏－嘉義民謠幻想曲》與《五重奏－台灣壬午年》。"
        ]
      }
    ],
    soloists: [
      {
        name: "蕭芳照",
        num: "7423",
        showProfileLink: false,
        instrument: "豎笛",
        work: "Concertino for Clarinet Op.26",
        concertRole: "豎笛獨奏",
        concertPhoto: "assets/img/concerts/2003-program/person-xiao-fang-zhao.webp",
        concertBio: [
          "蕭芳照，嘉義縣民雄鄉人，民國五十九年生。",
          "自七十四年進入嘉義高中就學時參加該校管樂隊，學習豎笛演奏；在隊期間，由於學長們的熱心指導，使個人對豎笛吹奏產生濃厚的興趣，七十七年進入高雄醫學院醫學系就讀之後，亦參與高雄醫學院管樂社練習，延續對豎笛之吹奏興趣；然而因課業與工作繁忙，曾中斷豎笛吹奏數年。",
          "八十五年回到嘉義基督教醫院服務，得知當年於嘉中求學時的學長馮朝君先生、曾膺安先生、盧宓承先生與李吉峰先生等人創立嘉義市管樂團，即利用閒暇時間參與該樂團的練習，重溫管樂合奏樂趣，即便於八十八年回民雄鄉開立蕭芳照診所，工作繁忙仍不改其志，現擔任嘉義市管樂團豎笛首席。",
          "此次，感謝陳怡君老師撥冗指導，令吾在豎笛的吹奏上有莫大的進步。"
        ]
      }
    ],
    programTitle: "演出曲目與曲目介紹",
    program: [
      {
        section: "上半場",
        localTitle: "瑪土撒拉II",
        foreignTitle: "Mathuselah II",
        composer: "田中賢",
        description: "瑪土撒拉（Methuselah）是舊約聖經創世紀篇中的一位傳說活到九百六十九歲的長壽者，引申為「長壽的人」。作曲家以三種不同的手法呈現時空穿越的情境－現代、祭典、古聖歌，採用電影中常見的「倒敘法」，將整個時間扭轉過來。全曲共分三段，第一段以現代音樂的語法展現不同於傳統的管樂色彩，第二段以打擊為主，並有強烈的日本傳統祭祀的磅礡氣勢，第三段則採中世紀「葛利果聖歌」（Gregorian Chant）式的旋律。作曲家特別強調，在音樂中的管樂與打擊的協奏模式，代表著理性與感性的對抗，也代表了在人類藝術的軌跡中，古典與浪漫精神相互的消長所呈現出來多元的藝術風貌。（顏崇勝）",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "\"哈比人\"選自交響曲第一號\"魔戒\"",
        foreignTitle: "\"Hobbits\" from Symphony No.1 \"The Lord of the Rings\"",
        composer: "Johan de Meji／約翰．德．梅吉",
        description: "原曲共分五大段，其中“哈比人”是最後一段，音樂表現劇中“哈比人”謹慎樸實且樂觀的性格。為了表現劇中末章節「灰港岸」（The Grey Havens）中，在收復「夏爾」（Shar）之後，「佛羅多」（Frodo）與「甘道夫」（Gandalf）乘著帆船消失在地平線上的氣氛，作者以一種祥和幾近是寧靜的方式而非大多數的曲子所用的壯闊的聲勢結束。（顏崇勝）",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "神隱少女",
        composer: "久石讓、木村弓 作曲／小島里美 編曲",
        description: "這是由日本動畫大師「宮崎駿」在2001年所製作的經典作品，編曲者從中擷取六段具有代表性的音樂結合成一曲，這六首分別是「在某日的河川」、「在某日的夏天」、「鍋爐蟲」、「辛勤的工作」、「再次」與「永恆」，而末段的永恆，原曲即是輕快的6/8拍子樂曲。（顏崇勝）",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "巴西節慶",
        foreignTitle: "Brasiliana",
        composer: "Jan Van der Roost／珍凡．德．盧斯特",
        description: "Jan Van der Roost 是一位廣受歡迎的現代作曲家，他的作品十分廣泛，包括銅管樂隊、鋼琴與交響樂團，而他的管樂作品受到許多人讚賞。這首「巴西節慶」便是其中之一，樂曲由三段拉丁風格的舞曲組成，分別是「恰恰舞」、「加力騷舞」、「森巴舞」。曲風輕鬆自然，配器生動且有活力，是一首值得回味的小品。（王騰寬）",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "c小調豎笛小協奏曲作品26",
        foreignTitle: "Concertino for Clarinet Op.26",
        composer: "Carl Maria von Weber／Arr. By M.L. Lake／卡爾．馬利亞．馮．韋伯／雷克 編曲",
        soloist: "蕭芳照",
        description: "這一首豎笛小協奏曲於1811年首演於慕尼黑，前往聆賞的巴伐利亞國王，聆聽後大受感動，委託韋伯寫兩首新的豎笛協奏曲。這一首C小調的小協奏曲，有三個樂章，第一樂章具有引子功能，屬短小樂章，自由寫成，不停止直接進入第二樂章。第二樂章行板，降E大調2/2拍子，採主題與四個變奏的型式，一開始豎笛吹出主題後，開始第一變奏，豎笛將主旋律給予裝飾變奏，第二變奏，豎笛的音樂律動更為細膩，最後出現管絃樂的間奏，音樂力度削弱，速度減慢，以後由豎笛與法國號、定音鼓單獨自由地返回主題，靜靜地結束此樂章。第三樂章是華麗的快板，豎笛與樂團彼此競奏，充分展現出豎笛炫麗的演奏技巧，全曲結束在高昂的樂音。",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "嶄新的一日",
        foreignTitle: "Dawn of a New Day",
        composer: "James Swearingen／詹姆士．史威林金",
        description: "作者史威林金於1991年受美國第三特區樂隊指導之委託創作，1992年首演。作者在音樂中描寫都市生活的一天，第一聲強烈的信號代表著旭日東昇的瞬間，而其後持續的和聲轉換與節奏變化，不僅帶領聽眾進入作者的想像世界，也與作者一同感受在都市叢林中每一日繁忙卻充實的生活。（顏崇勝）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "交響舞曲第三號\"節慶\"",
        foreignTitle: "Symphonic Dance No.3 \"Fiesta\"",
        composer: "Clifton Williams／克里夫頓．威廉士",
        description: "\"Fiesta\"是拉丁美洲一種熱鬧非凡的慶典，在這個慶典中，大街小巷充滿熱鬧的人群，也有街頭樂隊、奇裝異服的各式各樣的人，甚至還有鬥牛。作曲家「克里夫頓．威廉士」（Clifton Williams）描寫此種景象的手法也相當新穎，他以交迭出現的五拍與四拍、快板與慢板、強奏與弱音以及現代的管樂語法，成功地營造出拉丁美洲特有的慶典氣氛。（顏崇勝）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "美國風情畫第七號",
        foreignTitle: "American Graffiti VII",
        composer: "岩井直博",
        description: "岩井直博向來擅長於改編各國著名的旋律或是民謠，這首「美國風情畫第七號」裡，他採用了以下幾首美國著名的電影主題曲～Jambalaya, Someone Else's boy, Live Young, Tennessee Waltz, Just Walking inThe Rain, The End of The World，在每一首曲子的串連上，作去加極為用心的安排了過渡樂段，使得六首琅琅上口的主題曲一氣呵成，可說是仲夏午后一帖清涼消暑的良方。（顏崇勝）",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "王者之道（拉丁幻想曲）",
        foreignTitle: "El Camino Real (A Latin Fantasy)",
        composer: "Afred Reed／阿佛瑞．呂德",
        description: "一首西班牙幻想曲，作曲家「呂德」（Afred Reed）採用了西班牙最著名的「佛朗明哥舞」（Flanmenco）為基本音樂型態，持續以熱情且跳動的和聲來展現西班牙特殊的音樂節奏感。音樂中第一段的舞曲稱為「鳩塔」（Jota）是快速且熱情如火的快板；中段的舞曲稱為「仿探戈」（Fandango），是一種中庸且溫文高雅的行板，兩種性質迥異的舞蹈結合所產生的戲劇效果，呈現在音樂上，使本曲成為最耳熟能詳的管樂曲之一。（顏崇勝）",
        status: "confirmed"
      }
    ],
    performersTitle: "演出成員",
    performerNote: "演出成員姓名依節目冊原文呈現；校友編號經校友名錄比對後，僅為姓名唯一吻合者加註。",
    performerGroups: [
      { role: "客席指揮", people: ["曾膺安"] },
      { role: "指揮", people: ["顏崇勝"] },
      { role: "長笛", people: ["盧宓承", "吳昭男", "蔡幸芝", "江扶聰", "吳承洺", "許景斌", "張育嘉"] },
      { role: "雙簧管", people: ["黃耀瑩"] },
      { role: "低音管", people: ["孫潤庭"] },
      { role: "豎笛", people: ["李吉峰", "蕭芳照", "涂靖育", "黃尹俊", "江俊漢", "張馨勻", "黃信又", "陳正龍", "洪瑄憶", "吳治先", "吳瑩娟", "謝介豪"] },
      { role: "薩克管", people: ["陳達章", "宋政虔", "鄭鈞元", "陳韋志", "楊舜斌", "林建碩", "陳韋希", "許竣榮"] },
      { role: "法國號", people: ["賴宜含", "劉議謙", "魏仕杰", "黃乙晃", "張世明", "吳翰萬", "李怡潔"] },
      { role: "小號", people: ["陳志榮", "楊舜欽", "陳明陽", "翁文祥", "陳奕享", "古峻錡", "劉全盛", "林佳宏", "王嘉欣", "周俊廷"] },
      { role: "長號", people: ["何宗穎", "詹三賢", "呂冠穎", "簡晟軒", "王聖安"] },
      { role: "上低音號", people: ["游宗仁", "蔡智明", "林青彥", "吳仁庭", "倪載信"] },
      { role: "低音號", people: ["翁啟榮", "黃智豐", "丁肇賢", "李佳宇"] },
      { role: "打擊", people: ["陳志鳴", "謝詠鎗", "詹舒閔", "林彥佑", "葉祈政", "蔡侑恬", "陳英杰", "林唐禾", "黃楷澍", "陳佩君", "唐懿成", "蕭彥延"] },
      { role: "低音大提琴", people: ["王騰寬"] }
    ],
    adminTitle: "演出單位",
    adminRows: [
      { role: "演出單位", people: ["國立嘉義高中校友暨在校生聯合管樂團"] }
    ],
    sponsorsTitle: "贊助單位與特別感謝",
    sponsors: [
      "Just個性商品", "王威仁先生", "方俊元先生", "文新企業社", "元信藥局", "印象工作坊", "四川香舖", "安麗牙醫", "咕咕雞", "金永發藥局", "林尚賢先生", "金玉美珠寶銀樓", "林國峯中醫師", "亞產中醫診所", "阿嫂簡餐", "阿里山體育用品", "洪鳳鳴中醫師", "涂啓文醫師", "家州電器行", "展藝花苑", "陳秋茂先生", "許博儒先生", "陳丕修牙醫", "陳仁德醫師",
      "尋衣園", "斌德中醫診所", "黃炳中診所", "新太藥局", "趙炎洲中醫師", "趙祥凱皮膚科", "鈺展銀樓", "種杏蔘藥行", "醉音影音生活", "勵進補習班", "獨立線相", "龍德中醫診所", "簡單雞肉飯"
    ],
    thanks: [
      "新營市文華婦產科醫院", "陳達章校友", "顏漢軍校友", "嘉義城隍廟", "嘉義縣中埔鄉光正萬教殿", "嘉義高中家長會", "嘉義中學校友會"
    ],
    sponsorParagraphs: [
      "特別感謝",
      "新營市文華婦產科醫院、陳達章校友、顏漢軍校友、嘉義城隍廟、嘉義縣中埔鄉光正萬教殿、嘉義高中家長會、嘉義中學校友會",
      "贊助單位",
      "Just個性商品、王威仁先生、方俊元先生、文新企業社、元信藥局、印象工作坊、四川香舖、安麗牙醫、咕咕雞、金永發藥局、林尚賢先生、金玉美珠寶銀樓、林國峯中醫師、亞產中醫診所、阿嫂簡餐、阿里山體育用品、洪鳳鳴中醫師、涂啓文醫師、家州電器行、展藝花苑、陳秋茂先生、許博儒先生、陳丕修牙醫、陳仁德醫師、尋衣園、斌德中醫診所、黃炳中診所、新太藥局、趙炎洲中醫師、趙祥凱皮膚科、鈺展銀樓、種杏蔘藥行、醉音影音生活、勵進補習班、獨立線相、龍德中醫診所、簡單雞肉飯"
    ],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/2003-program/page-01.webp",
    page: "concerts/2003-19th.html",
    gallery: [],
    news: [],
    programBookIntro: "原始節目冊共 21 張掃描檔；可左右滑動瀏覽，點開圖片後可用左右鍵切換頁面。",
    programBook: [
      { src: "assets/img/concerts/2003-program/page-01.webp", caption: "2003 年第 19 屆《管樂．王者．夢》節目冊封面" },
      { src: "assets/img/concerts/2003-program/page-02.webp", caption: "節目冊：嘉義高中校長何經〈演出的話〉" },
      { src: "assets/img/concerts/2003-program/page-03.webp", caption: "節目冊：嘉義高中管樂隊簡介" },
      { src: "assets/img/concerts/2003-program/page-04.webp", caption: "節目冊：客席指揮曾膺安" },
      { src: "assets/img/concerts/2003-program/page-05.webp", caption: "節目冊：指揮顏崇勝" },
      { src: "assets/img/concerts/2003-program/page-06.webp", caption: "節目冊：豎笛獨奏蕭芳照" },
      { src: "assets/img/concerts/2003-program/page-07.webp", caption: "節目冊：演出成員" },
      { src: "assets/img/concerts/2003-program/page-08.webp", caption: "節目冊：演出曲目" },
      { src: "assets/img/concerts/2003-program/page-09.webp", caption: "節目冊：〈瑪土撒拉II〉、〈哈比人〉、〈神隱少女〉曲目介紹" },
      { src: "assets/img/concerts/2003-program/page-10.webp", caption: "節目冊：第 4 至第 9 首曲目介紹左頁" },
      { src: "assets/img/concerts/2003-program/page-11.webp", caption: "節目冊：第 4 至第 9 首曲目介紹右頁" },
      { src: "assets/img/concerts/2003-program/page-12.webp", caption: "節目冊：第 4 至第 9 首曲目介紹跨頁全覽" },
      { src: "assets/img/concerts/2003-program/page-13.webp", caption: "節目冊：樂器影像跨頁左頁" },
      { src: "assets/img/concerts/2003-program/page-14.webp", caption: "節目冊：樂器影像跨頁右頁" },
      { src: "assets/img/concerts/2003-program/page-15.webp", caption: "節目冊：特別感謝" },
      { src: "assets/img/concerts/2003-program/page-16.webp", caption: "節目冊：贊助單位" },
      { src: "assets/img/concerts/2003-program/page-17.webp", caption: "節目冊：廣告贊助頁（一）" },
      { src: "assets/img/concerts/2003-program/page-18.webp", caption: "節目冊：廣告贊助頁（二）" },
      { src: "assets/img/concerts/2003-program/page-19.webp", caption: "節目冊：廣告贊助頁（三）" },
      { src: "assets/img/concerts/2003-program/page-20.webp", caption: "節目冊：廣告贊助頁（四）" },
      { src: "assets/img/concerts/2003-program/page-21.webp", caption: "節目冊：封底廣告" }
    ],
    supplementTitle: "網站補充資訊",
    supplementNotes: [
      "以上演出介紹、團隊簡介、人物介紹、曲目與解說、演出成員、贊助與致謝，均按 2003 年紙本節目冊原文轉錄；僅移除紙本分行並調整網站顯示空格，未以今日狀態改寫。",
      "節目冊內部保留當年的用字與異文：第一首曲目在曲目頁印作「Mathuselah II」，曲目介紹頁印作「Methuselah II」；第二首在曲目頁印作「\"Hobbits\" from Symphony No.1 \"The Lord of the Rings\"／\"哈比人\"選自交響曲第一號\"魔戒\"」，曲目介紹頁則印作「\"Hobbits\" from \"The Lord of the Rings\"／哈比人選自\"魔戒\"」。",
      "曲目頁印作「c小調豎笛小協奏曲作品26」與「王者之道（拉丁幻想曲）」，曲目介紹頁分別印作「豎笛小協奏曲編號26」與「王者之道」；另保留「Johan de Meji」、「岩井直博」、「Afred Reed」、「Flanmenco」、「作去加極為用心」等原印文字。",
      "團隊簡介印作「自民國四十年起，每年暑假舉辦校友暨在校生聯合演奏會」，但同冊封面與〈演出的話〉均標示本次為第十九屆；網站保留兩處原文，不逕行改寫。",
      "封面印作「68個人的努力」；演出成員頁連同客席指揮與指揮共列 75 個姓名。網站保留兩處原始數字與名單，不自行增刪。",
      "節目冊所列「嘉義市文化局音樂廳」，現為嘉義市政府文化局音樂廳。"
    ],
    sources: [
      "2003 年第 19 屆國立嘉義高中管樂團校友暨在校生聯合音樂會《管樂．王者．夢》節目冊（全 21 張掃描檔，2026-08-20 掃描）"
    ],
    sourceNote: "本頁演出資訊、主題、校長序文、團隊簡介、人物介紹、曲目與解說、演出成員、贊助致謝及節目冊影像，均來自 2003 年第 19 屆《管樂．王者．夢》紙本節目冊。正文按原文轉錄，僅移除紙本分行並調整網站顯示空格；當年用語、人物狀態與節目冊內部異文均予保留。",
    status: "confirmed",
    notes: "2003 年正式節目冊已確認屆次、主題、時間、場地、客席指揮、指揮、豎笛獨奏、曲目、演出成員、人物介紹、演出單位、贊助與致謝。"
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
  {
    id: "1999-15th",
    nth: 15,
    year: 1999,
    rocYear: 88,
    title: "水手與海洋之歌",
    subtitle: "Songs of Sailor and Sea",
    archiveComplete: true,
    date: "1999-08-28",
    time: "19:30",
    venue: "嘉義市立文化中心音樂廳",
    hostHead: "",
    metaDescription: "1999 年第 15 屆嘉義高中校友暨在校生聯合演奏會《水手與海洋之歌》完整紀錄：8 月 28 日於嘉義市立文化中心音樂廳演出，由羅家駒、高健雄、陳錫仁指揮，陳錫仁與高崇文分別擔任小號、長號獨奏。",
    lede: "1999（第十五屆）嘉義高中管樂團校友暨在校生聯合演奏會",
    summary: "本次演奏會即以一曲「水手與海洋之歌」為主軸，闡釋嘉義高中管樂隊歷屆校友們齊心戮力、乘風破浪，為管樂發展勇往直前的熱情。",
    introTitle: "演出的話",
    intro: [
      "音樂是亘古不朽的美麗詩句，是天使和原子的語言，是生命、夢想、靈魂和星辰融合一起的結合體。從出生到死亡，從心跳到想像力的馳騁，生命的每一刻都籠罩在音樂的聲音和節奏中。音樂提供一個神聖的空間，一個領略宇宙奧祕的神聖殿堂；或者也可以是我們心中一個簡單隱沒的角落，一個深沈無人窺伺的方隅。音樂提升我們的靈魂，喚醒我們心中的良知、同情和摯愛，洗滌我們的心靈，還原人性初始的善良與純真。",
      "嘉義高中管樂隊歷年來傑出人才倍出，難能可貴的是，有許多校友對音樂的熱忱未曾稍減。最近十五年來，歷經數位校友不捨舊情、熱心奉獻的在校經營與指導管樂隊，更於每年暑期結合校友們返校從事加強指導，並舉辦演奏會作為示範。尤以最近，嘉義高中管樂隊在學長的指導下，連續三年榮獲嘉義市與全國音樂比賽優等佳績，並在諸多演奏場合深獲讚譽，「校友暨在校生聯合演奏會」更在去年走出校園、深入社會群眾，於文化中心音樂廳演出，在地方上造成震撼並獲致佳評如湧。本次演奏會即以一曲「水手與海洋之歌」為主軸，闡釋嘉義高中管樂隊歷屆校友們齊心戮力、乘風破浪，為管樂發展勇往直前的熱情。於此衷心感謝各界的支持與鼓勵，並懇祈先進不吝賜教。",
      "嘉義高中校長　陳金進"
    ],
    archiveSections: [
      {
        title: "團隊簡介",
        content: [
          "藝術的經營是無怨無悔的投注，音樂的推廣更是百年樹人的耕耘。一群出身嘉高中管樂隊的校友們，基於對音樂藝術的熱愛、及管樂發展的眷情，自民國七十四年起遂有將學之所得貢獻後進，使管樂之發展得以承先啟後，並藉由音樂演奏會的舉辦，讓地方藝文界和學校了解管樂發展趨勢之緣起。嘉義高中管樂隊校友團於是焉組合而成。十五年來，披荊斬棘、蓽路藍縷默默地耕耘，不僅作育英才無數，每年皆造就一些人才投入音樂藝術工作，影響所及成就了學校熱絡的管樂風氣，與嘉義市管樂音樂的蓬勃發展。",
          "成員中許多校友早期經歷過國內一些優秀管樂團隊的洗禮，如幼獅管樂團、國防部示範樂隊等；目前也仍有許多成員活躍在音樂界，有演奏家、樂團行政總監、藝術總監、音樂老師、學校樂隊指導老師、各著名樂團所屬團員等，皆有出色的成績與表現。當然還有其他各界的菁英，如主任醫師、新聞記者、廣播節目製作人、職業歌手、警官及法界人士等，顯示嘉義高中管樂隊校友團多年來持續不墜的素質與水準。我們用管樂刻寫歷史，我們用管樂璀璨青春，我們用管樂豐富生命；把「演奏好的音樂、並將音樂演好」作為起點與終點，顯然這仍是一段漫長的路。"
        ]
      },
      {
        title: "來自學長的鼓勵與祝福",
        content: [
          "行政院院長電子信箱信件回覆　第 88014880 號",
          "七月二十七日電子信函已收到。雖然離校多年，但只要聽到嘉中的消息，總是倍感親切，因為那兒有我許多美好的回憶。嘉中演奏會歷史悠久，向極倍受好評，謝謝你們的邀請，我很想回去聆賞母校的樂音，可惜八月二十八日當天必須接見外賓，無法回鄉共襄盛舉，分享你們辛苦的成果。但我相信你們屆時一定能秉持樂隊優良傳統，發揚嘉中精神，表現不同凡響。最後祝演奏會成功，同學們健康愉快",
          "蕭萬長　TUE, 27 JUL 1999"
        ]
      }
    ],
    conductors: [
      {
        name: "羅家駒",
        num: "6392",
        showProfileLink: false,
        role: "指揮",
        concertRole: "指揮",
        concertPhoto: "assets/img/concerts/1999-program/person-luo-jia-ju.webp",
        concertBio: [
          "國中參加鼓號樂隊學習打擊樂器，六十三年進入嘉義高中學習小號，其後曾跟隨陳功雄教授、林茂雄教授學習音樂理論與作曲，另私淑廖年賦教授學習指揮，並由管樂大師 Frederick Fennell 與 Prof. Rodney Winther 親炙指揮技巧。",
          "現任職嘉義技術學院、虎尾技術學院、嘉義高商、華南高商、立仁女子工商、嘉南家商、嘉義高中等校管樂合奏指導，宏仁女中古典吉他指導，教會詩班合唱指導；尤以最近三年指導嘉義高中管樂隊其間，無論各次大小型演奏會的演出，及參加各項比賽，皆將其演奏水準提升至煇煌的成就，且獲致優異的成績，頗受地方各界注目與好評。"
        ]
      },
      {
        name: "高健雄",
        num: "7901",
        showProfileLink: false,
        role: "指揮",
        concertRole: "指揮",
        concertPhoto: "assets/img/concerts/1999-program/person-gao-jian-xiong.webp",
        concertBio: [
          "台灣省嘉義縣鄒族原住民，七十九年進入嘉義高中同時參加管樂隊學習長號，並曾擔任隊長一職。先後獲得八十一學年度音樂比賽長號獨奏優等，及省賽青少年組第三名，畢業後考入國立中山大學音樂系主修長號並鑽研指揮法，在學期間先後師事劉玄詠老師、張禮宗老師、以及黃仲浩老師。並曾隨嘉義市管樂團赴香港參加一九九六年亞太管樂節的演出。中山大學畢業後，在台南縣從事兒童音樂教育方面的工作。歷任嘉義高中管樂隊指導老師、中山大學管絃樂團長號、及嘉義市管樂團長號並兼任客席指揮。"
        ]
      },
      {
        name: "陳錫仁",
        num: "6301",
        showProfileLink: false,
        role: "指揮／小號獨奏",
        concertRole: "指揮／小號獨奏",
        concertPhoto: "assets/img/concerts/1999-program/person-chen-xi-ren.webp",
        concertBio: [
          "六十三年進入嘉義高中參加樂隊學習小號，六十四年擔任樂隊隊長。師大音樂系畢業後，於八十年以優異成績獲得美國聖保羅大學音樂學院小號演奏碩士學位，為國人首位獲得此項樂器演奏碩士文憑者。",
          "赴美前曾師事謝北光老師、隆超教授、Prof. Mark Lord。赴美期間則受教於 Prof. Ross Beacraft、Prof. Arnold Jacobs、Prof. Vincent Cichowitz，及 Dr. Kurt Westerberg，在小號演奏技巧、表現及呼吸法、指揮、作曲學等方面皆有精深的研究。",
          "曾任美國聖保羅大學交響樂團首席小號，並在美國舉辦過三場個人獨奏會。返國後在各地文化中心、各級學校校園等地巡迴演出數十場、並受邀於各節慶場合演出，皆深獲好評。八十一年創立台灣銅管五重奏團兼任團長，各場演出亦獲各界熱烈的讚譽與迴響。",
          "曾任教於嘉義師範學院、輔仁大學、東海大學音樂系，並任台北醫學院管弦樂團、中原大學管弦樂團指揮。現專任於中台醫護學院，兼任國立師範大學、台中師範學院音樂系，及朝陽科技大學管樂團。"
        ]
      }
    ],
    soloists: [
      {
        name: "陳錫仁",
        num: "6301",
        showProfileLink: false,
        instrument: "小號",
        work: "A. Arutiunian: Concerto for Trumpet and Symphonic Band",
        concertRole: "小號獨奏",
        concertPhoto: "assets/img/concerts/1999-program/person-chen-xi-ren.webp",
        concertBio: [
          "六十三年進入嘉義高中參加樂隊學習小號，六十四年擔任樂隊隊長。師大音樂系畢業後，於八十年以優異成績獲得美國聖保羅大學音樂學院小號演奏碩士學位，為國人首位獲得此項樂器演奏碩士文憑者。",
          "赴美前曾師事謝北光老師、隆超教授、Prof. Mark Lord。赴美期間則受教於 Prof. Ross Beacraft、Prof. Arnold Jacobs、Prof. Vincent Cichowitz，及 Dr. Kurt Westerberg，在小號演奏技巧、表現及呼吸法、指揮、作曲學等方面皆有精深的研究。",
          "曾任美國聖保羅大學交響樂團首席小號，並在美國舉辦過三場個人獨奏會。返國後在各地文化中心、各級學校校園等地巡迴演出數十場、並受邀於各節慶場合演出，皆深獲好評。八十一年創立台灣銅管五重奏團兼任團長，各場演出亦獲各界熱烈的讚譽與迴響。",
          "曾任教於嘉義師範學院、輔仁大學、東海大學音樂系，並任台北醫學院管弦樂團、中原大學管弦樂團指揮。現專任於中台醫護學院，兼任國立師範大學、台中師範學院音樂系，及朝陽科技大學管樂團。"
        ]
      },
      {
        name: "高崇文",
        num: "8301",
        showProfileLink: false,
        instrument: "長號",
        work: "N. Rimsky-Korsakov: Concerto for Trombone and Military Band",
        concertRole: "長號獨奏",
        concertPhoto: "assets/img/concerts/1999-program/person-gao-chong-wen.webp",
        concertBio: [
          "台灣省嘉義縣鄒族原住民，八十三年進入嘉義高中同時參加管樂隊學習長號，並曾擔任隊長一職。由黃仲浩老師啟蒙長號吹奏，並先後獲得八十五學年度嘉義市音樂比賽青少年組長號獨奏甲等，八十六學年度嘉義市音樂比賽青少年組長號獨奏優等，省賽青少年組優等第二名，並於八十六學年度下學期通過甄試保送國立藝術學院音樂系主修長號，師事梵德生老師（John van Deursen），八十七學年度獲得全國音樂比賽成人組長號獨奏優等第一。在國立藝術學院兩年期間，曾隨嘉義市管樂團赴港、澳，愚韻室內管絃樂團赴美，以及台灣青年管絃樂團赴德國與捷克斯洛伐克演出。現為藝術學院三年級學生並在嘉義市管樂團、藝術學院管絃樂團、愚韻室內管絃樂團及台灣青年管絃樂團擔任長號吹奏部分。"
        ]
      }
    ],
    program: [
      {
        section: "上半場",
        localTitle: "大道",
        foreignTitle: "Prado",
        composer: "Victor Lopez／羅培茲",
        description: "一首現代感十足的管樂作品，全曲旋律簡要、節奏鮮明而富於奇特的變化，彷彿在一條寬闊而一望無垠的大道上，意氣風發、暢意馳騁，充分顯露出青春奔放的豪情。首段是 6/8 拍的中庸快板，由長笛、豎笛支撐整個節奏，而由銅管部與薩克管輪替串出綿延悠揚的簡單曲調。第二段小行板，由豎笛簡短的獨奏將曲子引入 3/4 拍木管部尋幽探險、充滿神秘感的氣氛中。第三段是 4/4 拍快板，由打擊部和中低音聲部樂器釋放驚爆的能量，加入高音聲部後，將曲子推向最高峰。",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "水手與海洋之歌",
        foreignTitle: "Songs of Sailor and Sea",
        composer: "Robert W. Smith／史密斯",
        description: "作曲者 Robert W. Smith 應美國海軍樂隊之邀而寫的力作，描繪水手與海洋之間糾結而密不可分的生活情境，背景則是雄偉的多桅帆船。全曲分為五段：序奏部分，寧靜深夜的靠泊港口，隱約中傳來海浪輕拍、船鐘搖響的聲音，接著曙光乍現，水手們精神抖擻地蓄勢待發。第二段船歌（Sea Chanty），是水手們為了協力作業而吆喝唱和的節奏，揚帆出海的船甲板上穿梭往來繁忙的景象生動而鮮活。第三段「鯨魚之歌」，汪洋中船桅嘎嘎咋響，與海中鯨魚啼叫聲遙相呼應，獨奏的部份優雅卻略帶鄉思的寂寞，也似乎在傾訴滅種的哀戚。第四段乘風破浪的「洋基快艇」，英姿雄偉挺拔，滿載懷抱雄心壯志的水手們，縱橫四海、勇往直前。第五段重現船歌的樂段，音樂更加劇烈狂暴，水手們正與狂風暴雨、驚濤駭浪展開搏鬥，最後終於齊心協力克服嚴峻考驗，陽光再現、蓄勢再發，以不屈不撓的精神。迎向另一個航程與挑戰。謹以此曲獻給嘉義高中管樂隊歷屆校友們以為共勉。",
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "觸技曲",
        foreignTitle: "Toccata",
        composer: "G. Frescobaldi／弗瑞斯寇巴第",
        description: [
          "觸技曲原為一種自由而獨特的鍵盤樂作品，包含許多和絃與快速的經過音，由於需要高超的技巧，並有著華麗的要素，因此咸認它們為高尚卓越的的作品。觸技曲的速度自由，所以經過音的速度皆由音樂表情來決定，弗瑞斯寇巴第（G. Frescobaldi）的作品係由一組簡短的樂節，用快速的連續音來表現不同的調式，改編成管樂演奏的版本後，更顯得繽紛炫麗，張力十足，充分展現出巴洛克風格的特色。",
          "首段是以 C minor 和絃推展開來的甚緩板樂段，莊嚴中仍透析出一股祥和溫暖的情緒。第二段轉入降 E 大調，為一適中的快板樂段，銅管樂器與木管樂器交替出現，織構成一幅輕鬆愉快的對話；接著木管樂器快速的音群恣意揮灑，銅管樂器則強頑負重，形成另一個強烈的對比。第三段甚緩板樂段再現，從激情峰頂直轉而下，由豎笛與長笛描繪出一條綿延不墜、優美而堅定的線條。第四段適中的快板樂段，將第二段的主題樂節再現，以一個歡愉的尾奏作為結束。"
        ],
        status: "confirmed"
      },
      {
        section: "上半場",
        localTitle: "小號協奏曲",
        foreignTitle: "Concerto for Trumpet and Symphonic Band",
        composer: "A. Arutiunian／阿魯提尼安",
        soloist: "陳錫仁",
        description: [
          "著名的前蘇聯作曲家阿魯提尼安所寫的小號協奏曲，經由小號演奏大師多西哲（Dokshitser）的詮釋演出後，廣受世人的喜愛，其極富戲劇性的音樂，更是小號演奏者表現的最佳曲選。本曲原為一齣歌劇，描述中亞地區某國家中一對背景懸殊的戀人，為愛情不顧一切的反對，至終卻淒美悲劇收場的故事。演出後未受歡迎，而在多西哲先生的建議下改編成小號協奏曲，竟然一鳴驚人頗受大眾的喜愛。",
          "全曲分為六個段落：（1）序樂部份 Andante maestoso 莊嚴的行板，小號激昂開闊的音響和嘹亮悠揚的音色，使人宛如置身於一望無際的俄羅斯大草原中，音樂抑揚頓挫、迂迴曲折，極為自由靈活，讓我們的想像空間盡情伸展，並充滿繽紛的色彩。（2）快板樂段，有如萬馬奔騰，雄偉壯觀，其中運用了許多快速的雙吐音運舌技巧，聽來令人熱血沸騰。（3）如歌的行板樂段，小調的旋律彷彿在描述星光下互訴衷曲的一對戀人，依依難捨的心情。（4）快板樂段，是第二段的發展及變奏，且更富活力。（5）慢板樂段，加上弱音器的演奏，不僅壓低了音量，並且完全改變了音色，陰暗的音效如泣如訴，令人盪氣迴腸、唏噓不已。（6）快板樂段，再度重現第一樂段的活力與精神，將全曲帶到最高潮，並在結束前加入了一段裝飾奏（Cadenza），在無伴奏下由小號擔綱獨奏，無論是技巧性或音樂性均須極高的要求，對演奏者是嚴峻的考驗。"
        ],
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "長號協奏曲",
        foreignTitle: "Concerto for Trombone and Military Band",
        composer: "N. Rimsky-Korsakov／林姆斯基-高沙可夫",
        soloist: "高崇文",
        description: [
          "本曲是林姆斯基－高沙可夫最著名的協奏曲之一，更是長號演奏家必備的曲目。全曲為傳統俄羅斯民族風格，無論旋律或伴奏，均流露出俄國人民含蓄純樸、卻又熱情奔放的性格。",
          "三樂章形式：第一樂章極快板，為 A-B-A 三段體，木管樂器以輕快的三連音傾瀉而出，長號隨即以渾厚的音色唱出雄壯的第一主題，雖然旋律結構並不複雜，藉由其他樂器的協奏襯托，依然不掩其君王風範；第二主題則在長號與樂團的對唱中展現其多情柔和的一面，曲子再次回到 A 段的第一主題後結束第一樂章。",
          "第二樂章如歌的慢板，作者巧妙地駕馭長號樂器的技巧和音色，描述隱藏於內心不為人知的款款深情。本樂章實為曲子最難詮釋的段落，過輕則易流於浮佻，過重卻又濫情而有失德儀；內心暗潮洶湧、幾經波折後逐漸平復，祇留下男主角自省似的獨白；隨即曲風一轉，直接進入方塊舞曲形式的第三樂章。",
          "第三樂章小快板，樂團洋溢著節慶般的氣氛伴隨著輕快的主題，將整曲帶到歡樂的最高潮。中段俄羅斯方塊舞的節奏，輕快悠揚而充滿活力；當曲子進入尾聲，再加入一段無伴奏的裝飾奏（Cadenza），以展現高度的技巧，最後在愉快的歡樂中結束全曲。"
        ],
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "威儀勝景",
        foreignTitle: "A Vision of Majesty",
        composer: "James Swearingen／史威林根",
        description: "作者 James Sweringen 根據第一次到日本訪問旅行時，縈繞在印象中的人地事物所寫的擬景作品，由幾個簡短的段落，紀錄當日的行程。序奏「甦醒的城市」，由一個慢板樂段描述東京大都會區，天將亮未亮時人們即開始活動的生活。第二段「旭日東昇的大地」，由略帶莊嚴的中板讚賞著燦爛而美麗的旭陽。第三段「子彈列車」，急促的快板有壓軌切切作響的節奏聲，有如匹綢緞帶般平穩快捷的速度感。逐漸地，目光被車窗外的景象所吸引，節奏也緩和下來而進入第四段「富士山」行板樂。雄偉壯觀的威儀勝景穿插著鄉野的情趣，當列車行經山腳，更顯得山勢俊秀，引人入勝。最後一段，子彈列車的行程再度推進，尾奏則急促的將激動的心情渲瀉而出，完成了難忘的旅程。",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "恐怖岬見聞錄",
        foreignTitle: "Cape Fear Chronicles",
        composer: "Robert Sheldon／雪爾登",
        description: "以急促的快板開始一段愉快的假日搜秘之旅，木管樂器與銅管樂器彼此交替演出簡單反覆的旋律和爽朗的節奏，興奮的心情溢於言表。接著慢板的樂段由豎笛與薩克管帶出陰鬱而神秘的氣氛，彷彿正在傾聽一個古老的傳說。音色忽而幽暗、忽而明朗，故事的委婉曲折、起伏糾結，令人盪氣迴腸、唏噓不已。歸程的路途，第一段的快板再現，得到滿足的好奇心令人忘記疲憊，輕鬆愉快地計劃著下一個搜秘之旅。",
        status: "confirmed"
      },
      {
        section: "下半場",
        localTitle: "松田聖子集錦",
        composer: "岩井直博",
        description: "由四首流行歌曲組合而成的集錦，包括「心的耳環」、「紅色香豌豆」、「Rock 'n Rouge」、「Sweet Memories」等。編曲的特色包含有夜總會式、華麗超炫的舞台聲光效果，由亮麗的序奏展開有如豪景揭幕的張力，隨即曲風一轉，進入一段輕鬆曼妙的 Bossa nova 舞曲中，「心的耳環」帶著歡悅愉快地進行；緊接著換上優美的 Blues，由薩克管獨奏「紅色香豌豆」的主旋律，再由銅管樂器接續吹奏，清新而悠長，令人心曠神怡。經過一段重節奏的過門，搖滾的「Rock 'n Rouge」登場，激昂高亢，飆舞的細胞不禁蠢蠢欲動，後段再加上熱情奔放的 Samba 舞曲，更是令人 Hight 到最高點。最後，「Sweet Memories」輕輕的響起，由小號獨奏引導，讓 Slow Blues 的節奏流曳著，有種慵懶鬆弛的心情，逐漸擴大、逐漸蔓延。",
        status: "confirmed"
      }
    ],
    programTitle: "演出曲目與樂曲介紹",
    performersTitle: "演出成員",
    performerNote: "演出成員姓名依節目冊原文呈現；校友編號經校友名錄比對後，僅為姓名唯一吻合者加註。",
    performerGroups: [
      { role: "指揮", people: ["羅家駒", "高健雄", "陳錫仁"] },
      { role: "小號獨奏", people: ["陳錫仁"] },
      { role: "長號獨奏", people: ["高崇文"] },
      { role: "樂團首席", people: ["邱碩堯"] },
      { role: "長笛", people: ["何明憲", "施俊明", "蔡明君", "陳依蘋", "李俞臻"] },
      { role: "豎笛", people: ["邱碩堯", "賴威志", "賴俊甫", "廖淑卿", "江俊漢", "蔡嘉偉", "郭耿宏", "張哲銘", "黃尹俊", "林美華", "周奇廷", "張馨勻", "林詩晏", "洪明中", "陳杰生"] },
      { role: "低音管", people: ["劉怡汝", "孫潤庭"] },
      { role: "薩克管", people: ["陳達章", "張修凱", "宋政虔", "鄭鈞元", "江耿男", "藺心皓", "江嘉榮", "莊俊傑", "陳鈺涵", "簡明瑞"] },
      { role: "法國號", people: ["蔡文立", "余迅", "張嘉宏", "許呈安"] },
      { role: "小號", people: ["楊順欽", "陳明陽", "陳奕享", "沈澤祈", "楊宗臻", "古峻錡", "劉全盛", "許鈞棠", "謝明凱"] },
      { role: "長號", people: ["曾芮欣", "范國恩", "賴聰育", "林宜勇", "李瑾碩", "賴思詠", "呂冠穎", "詹三賢"] },
      { role: "上低音號", people: ["游宗仁", "林青彥", "李俊毅", "吳仁庭", "倪載信", "吳育德"] },
      { role: "低音號", people: ["張誌鴻", "羅碩文", "丁肇賢", "廖啟良"] },
      { role: "打擊樂器", people: ["張志鳴", "陳仲一", "徐振華", "鄧杰翔", "蔡謹隆", "鍾信傑", "楊智傑", "李東昇", "黃忠琦", "詹舒閔", "陳羿岑", "蔡侑怡", "林彥佑", "葉祈政"] }
    ],
    adminTitle: "主辦、協辦、承辦與演出單位",
    adminRows: [
      { role: "主辦單位", people: ["嘉義市立文化中心"] },
      { role: "協辦單位", people: ["嘉義高中", "國川美妙文教基金會"] },
      { role: "承辦單位", people: ["嘉義市音樂協進會"] },
      { role: "演出單位", people: ["嘉義高中校友管樂團"] }
    ],
    sponsorsTitle: "贊助與特別感謝",
    sponsors: [
      "丁媽媽早餐店", "朱志群老師數學家教班", "谷泰印廣告有限公司", "林岳老師數學家教班", "故鄉樂器行", "愛因斯坦電腦公司", "賓歐汽車許博銘總經理", "盧阿巡女士",
      "中興補習班", "吳盈璋醫師", "佩康超速印刷", "金冠文化廣場", "海風冰果室", "嘉義儒林升大學補習班", "醉財神", "韓仁孝老師"
    ],
    thanks: [
      "天主教聖馬爾定醫院", "行政院農業委員會嘉義林區管理處森林鐵路", "國川美妙文教基金會", "宸舫樂器公司", "道成補習班", "遠東機械公司", "嘉義基督教醫院"
    ],
    sponsorParagraphs: [
      "感謝下列單位或個人熱情贊助（依筆劃順序）",
      "丁媽媽早餐店、朱志群老師數學家教班、谷泰印廣告有限公司、林岳老師數學家教班、故鄉樂器行、愛因斯坦電腦公司、賓歐汽車許博銘總經理、盧阿巡女士、中興補習班、吳盈璋醫師、佩康超速印刷、金冠文化廣場、海風冰果室、嘉義儒林升大學補習班、醉財神、韓仁孝老師",
      "特別感謝",
      "天主教聖馬爾定醫院、行政院農業委員會嘉義林區管理處森林鐵路、國川美妙文教基金會、宸舫樂器公司、道成補習班、遠東機械公司、嘉義基督教醫院",
      "由於您的支持，演奏會方得圓滿成功！"
    ],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/1999-program/page-01.webp",
    page: "concerts/1999-15th.html",
    gallery: [],
    news: [],
    programBookIntro: "原始節目冊共 17 頁；可左右滑動瀏覽，點開圖片後可用左右鍵切換頁面。",
    programBook: [
      { src: "assets/img/concerts/1999-program/page-01.webp", caption: "1999 年第 15 屆《水手與海洋之歌》節目冊封面" },
      { src: "assets/img/concerts/1999-program/page-02.webp", caption: "節目冊：團隊簡介" },
      { src: "assets/img/concerts/1999-program/page-03.webp", caption: "節目冊：來自學長的鼓勵與祝福" },
      { src: "assets/img/concerts/1999-program/page-04.webp", caption: "節目冊：演出的話" },
      { src: "assets/img/concerts/1999-program/page-05.webp", caption: "節目冊：指揮羅家駒、指揮暨小號獨奏陳錫仁" },
      { src: "assets/img/concerts/1999-program/page-06.webp", caption: "節目冊：指揮高健雄、長號獨奏高崇文" },
      { src: "assets/img/concerts/1999-program/page-07.webp", caption: "節目冊：演出成員" },
      { src: "assets/img/concerts/1999-program/page-08.webp", caption: "節目冊：演出曲目" },
      { src: "assets/img/concerts/1999-program/page-09.webp", caption: "節目冊：〈大道〉、〈水手與海洋之歌〉、〈觸技曲〉樂曲介紹" },
      { src: "assets/img/concerts/1999-program/page-10.webp", caption: "節目冊：小號協奏曲、長號協奏曲樂曲介紹" },
      { src: "assets/img/concerts/1999-program/page-11.webp", caption: "節目冊：〈威儀勝景〉、〈恐怖岬見聞錄〉、〈松田聖子集錦〉樂曲介紹" },
      { src: "assets/img/concerts/1999-program/page-12.webp", caption: "節目冊：贊助與特別感謝" },
      { src: "assets/img/concerts/1999-program/page-13.webp", caption: "節目冊：金冠文化廣場、林岳數學、朱志群數學贊助頁" },
      { src: "assets/img/concerts/1999-program/page-14.webp", caption: "節目冊：嘉義儒林、谷泰印刷廣告贊助頁" },
      { src: "assets/img/concerts/1999-program/page-15.webp", caption: "節目冊：阿里山森林鐵路贊助頁" },
      { src: "assets/img/concerts/1999-program/page-16.webp", caption: "節目冊：天主教聖馬爾定醫院贊助頁" },
      { src: "assets/img/concerts/1999-program/page-17.webp", caption: "節目冊：嘉義基督教醫院公益頁" }
    ],
    supplementTitle: "網站補充資訊",
    supplementNotes: [
      "以上演出介紹、團隊簡介、祝福函、人物介紹、樂曲介紹、演出成員與致謝，均按 1999 年紙本節目冊原文轉錄；僅移除紙本分行並調整網站顯示空格，未以今日狀態改寫。",
      "節目冊內部保留當年的用字與異文：「演出曲目」頁題作「恐怖岬見聞錄」，「樂曲介紹」頁題作「恐怖角見聞錄」；「水手與海洋之歌」在樂曲介紹頁的英文題名印作「Songs of Salior and Sea」。",
      "節目冊所列「嘉義市立文化中心音樂廳」，現為嘉義市政府文化局音樂廳。網站另以既有公開人物資料加入人物誌連結。"
    ],
    sources: [
      "1999 年第 15 屆嘉義高中校友暨在校生聯合演奏會《水手與海洋之歌》節目冊（全 17 頁，2026-08-20 掃描）"
    ],
    sourceNote: "本頁演出資訊、主題、團隊與校長序文、蕭萬長回函、人物介紹、曲目及解說、演出成員、相關單位、贊助致謝與節目冊影像，均來自 1999 年第 15 屆《水手與海洋之歌》紙本節目冊。正文按原文轉錄，僅移除紙本分行並調整網站顯示空格；當年用語、人物狀態與節目冊內部異文均予保留。",
    status: "confirmed",
    notes: "1999 年正式節目冊已確認屆次、主題、時間、場地、指揮、獨奏、曲目、演出成員、人物介紹、相關單位與致謝。"
  },
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
