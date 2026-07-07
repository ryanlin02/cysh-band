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

window.CONCERTS = [
  {
    id: "2026-41st",
    nth: 41,
    year: 2026,
    rocYear: 115,
    title: "為伍",
    subtitle: "",
    date: "2026-08-08",
    time: "14:30",
    venue: "嘉義市政府文化局音樂廳",
    venueNote: "睽違六年重返文化局音樂廳",
    hostHead: "五字頭",
    conductors: [
      { name: "簡晟軒", num: "8861", role: "樂團指導" },
      { name: "丁肇賢", num: "8501", role: "樂團指導" }
    ],
    soloists: [
      { name: "黃鈺芠", num: "1051", instrument: "小號", work: "Philip Sparke: Manhattan" }
    ],
    program: [
      { title: "Seagate Overture", status: "planning" },
      { title: "The Seventh Night of July", status: "planning" },
      { title: "Flashing Winds", status: "planning" },
      { title: "Ye Banks and Braes O' Bonnie Doon", composer: "Percy Grainger", status: "planning" },
      { title: "瑪利歐銀河交響組曲", status: "planning" },
      { title: "City Pop 改編組曲", status: "planning" }
    ],
    ticket: { type: "ticketed", price: "待正式公告", channels: ["OPENTIX"], note: "售票資訊以正式公告為準" },
    poster: "assets/img/poster_weiwu_2026.webp",
    page: "concerts/2026-41st.html",
    gallery: ["gallery/2026-weiwu.html"],
    news: [
      "news/2026-06-12-rehearsal-schedule.html",
      "news/2026-06-27-first-rehearsal.html",
      "news/2026-06-30-summer-bbq.html",
      "news/2026-07-02-weiwu-announce.html",
      "news/2026-07-04-rehearsal-coffee.html"
    ],
    sources: ["concerts.html", "data/news.js", "news/2026-07-02-weiwu-announce.html"],
    status: "planning",
    notes: "不可寫成首度音樂廳或首度售票；曲目與演出人員仍屬籌備中。"
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
    conductors: [{ name: "簡晟軒", num: "8861", role: "指揮" }],
    soloists: [],
    program: [],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/2025.webp",
    page: "concerts/2025-40th.html",
    gallery: [],
    news: [],
    sources: ["concerts.html"],
    status: "partial",
    notes: "總召陳乃慎；鄭鈞元與許哲誠相關協演脈絡見校友演出紀錄。"
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
    organizers: [{ name: "翁啟榮", num: "7581", role: "籌備統籌" }],
    conductors: [
      { name: "盧宓承", num: "7111", role: "指揮" },
      { name: "丁肇賢", num: "8501", role: "指揮" },
      { name: "簡晟軒", num: "8861", role: "指揮" }
    ],
    soloists: [],
    performers: [
      { name: "劉炫廷", num: "9921", role: "雙簧管聲部" }
    ],
    program: [{ title: "旭陵慶典", composer: "葉哲良", status: "confirmed", note: "首演" }],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/2023.webp",
    page: "concerts/2023-38th.html",
    gallery: [],
    videos: [
      { label: "第 38 屆《一樹起響》錄影清單（吳明德學長手機錄影）", url: "https://youtube.com/playlist?list=PLrgre0LUNSYDPJu7FjDyfow4dvdFImMTa&si=nlORMnALVCRH-HQ8", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", SOURCE_SOCIAL_VIDEO_LIST],
    status: "partial",
    notes: "翁啟榮籌備統籌；中央社報導伍佰高中副隊長與低音號故事。"
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
      { title: "Slava!", status: "confirmed" },
      { title: "Dynamica", status: "confirmed" },
      { title: "Arutiunian Trumpet Concerto", status: "confirmed" },
      { title: "Bolero", status: "confirmed" },
      { title: "Riverdance", status: "confirmed" },
      { title: "Armenian Dances Part I", status: "confirmed" },
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
    sources: ["concerts.html", "concerts/2019-35th.html", SOURCE_SOCIAL_VIDEO_LIST],
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
    sources: ["concerts.html", SOURCE_SOCIAL_VIDEO_LIST, SOURCE_2018_PROGRAM_NOTES],
    status: "partial",
    notes: "曲目與樂曲解說已依社群協作曲目介紹補入。錄影清單註明因版權因素，YouTube 上傳後多有消音或版權宣告，現存清單多為示範帶。",
    intro: [
      "本屆曲目與樂曲解說已依校友提供的 2018 年校友聯演曲目介紹整理入頁，8 首曲目皆已補入中文曲名、外文曲名、作曲／編曲資訊與單曲介紹。",
      "附件未標明上下半場，曲序目前先依現存曲介順序呈現；後續若取得正式節目冊，可再校對曲序與演出人員名單。"
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
      { role: "打擊", people: ["8193 李瑾佑", "8302 鄧杰翔", "8991 陳英杰", "9392 林祐成", "9895 詹琬婷", "0091 王耀德"] }
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
    conductors: [],
    soloists: [],
    program: [],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/2014.webp",
    page: "concerts/2014-30th.html",
    gallery: [],
    videos: [
      { label: "第 30 屆《３０而礫》錄影清單", url: "https://youtube.com/playlist?list=PLAVnw2heYVvn5-dmQCDPpVOIpMu5hdO5J", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", SOURCE_SOCIAL_VIDEO_LIST],
    status: "partial",
    notes: "社群錄影清單作《３０而礫》；現有主頁與海報替代文字作《三十而樂》，名稱仍需節目冊或海報圖像再核對。日期、場地、指揮、曲目待補。"
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
      "依節目冊前言記載，嘉中管樂隊自民國 74 年（1985）起，每年暑假集合校友與在校生共同排練演出，「讓地方藝文界和學校更了解管樂發展趨勢」；至 2013 年已連續舉辦 28 年從未中斷，是嘉義表演藝術活動中深具特色的一道風景。第 29 屆的三大宗旨為：讓畢業隊友重溫高中時代情誼；藉正式音樂會之演出及排練，提升在校生的演奏及行政能力；以免票入場方式，倡導管樂欣賞與正當休閒之風氣。",
      "「嘉義高中校友管樂團」於民國 97 年（2008）9 月正式登記成立為嘉義市藝文團體，本屆是立案後第 5 年舉辦的聯演。籌備期間每週週末團練，演出前 8 月 20 日至 22 日連續三天集訓，8 月 23 日當天下午裝台彩排、晚間正式演出。"
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
      { role: "打擊", people: ["8193 李瑾佑", "9392 林祐成", "9691 袁舴", "9791 陳建宇", "9792 蔣承哲"] }
    ],
    performerNote: "依 2013 年正式節目冊記載，全體演出人員（含編號）如下。節目冊原文註明「篇幅所限，以上僅列出部分團員」，全團演出規模約 80 人；本表為節目冊中留有編號紀錄之演出者，如與其他頁面編號略有出入（節目冊內部亦偶見同一人在不同段落編號誤植，如上低音號王騰寬另處誤植為 8981），已忠實依原始文件轉錄，歡迎校友協助勘誤補充。",
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
      { section: "下半場", title: "寶島", foreignTitle: "Takarajima", credit: "和泉宏隆曲，真島俊夫編 Izumi, arr. Mashima", status: "confirmed", description: "日本融合爵士（Fusion）天團 T-Square（方格子樂團）1976 年由吉他手安藤正容創團，1982 年鍵盤手和泉宏隆加入後成為當家鍵盤手，與安藤正容共同成為創作核心，樂團連續五年獲日本金唱片大賞 Fusion 爵士獎項年度最佳專輯，並四度拿下最佳爵士專輯獎。〈Takarajima〉發行於 1995 年，是和泉宏隆的代表作之一。" }
    ],
    programNote: "曲目與樂曲解說整理自 2013 年正式節目冊（撰文／張婷婷，資料來源／維基百科與網路資料，編校／魏仕杰，時任音樂會總籌）。籌備前期的企劃書與新聞稿曾預告華格納《唐懷瑟》選段、曼焦《桑契斯之子》等曲目，惟依正式節目冊與海報記載，最終定案曲目如上，主辦單位並保有曲目更動之權利。",
    ticket: { type: "free-ticket", price: "0", channels: ["嘉義市政府文化局服務台", "主辦單位"], note: "免費索票入場" },
    poster: "assets/img/concerts/2013.webp",
    page: "concerts/2013-29th.html",
    gallery: [],
    photos: [
      { src: "assets/img/gallery/2013/0823-01t.webp", full: "assets/img/gallery/2013/0823-01.webp", caption: "全團於嘉義市政府文化局音樂廳舞台合影" }
    ],
    sponsorParagraphs: [
      "特別感謝嘉義市政府文化局、國立嘉義高中之指導；協力廠商為學明影印、DRINK 雋可樂活茶飲新生店。",
      "本屆演出並獲得在地三十家店家與補習班贊助支持（依單位名稱筆劃順序排列）：二丫頭麻辣涼麵、力新補習班、小杜吉美術社、天才美術社、台北江麻辣臭豆腐、正義蚵仔麵線、立碁補習班、百鴻畫廊、利特髮廊、宏泰物理、李揚數學、味好麵食館、味鮮小吃、明興補習班、沱江小館、哈牛排、故鄉牛排館、洗鞋家、皇家豆花、食尚輕食生活餐飲、陳建宏化學、頂好麵食館、道成補習班、嘉興牙醫診所、舞醬館、諸羅山五金、羅文公民。"
    ],
    videos: [
      { label: "第 29 屆《２９》錄影清單", url: "https://youtube.com/playlist?list=PLc3LYZ21H4qkLOi9_u0uwB7Q3EDJuOsv1", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", "concerts/2013-29th.html", SOURCE_SOCIAL_VIDEO_LIST],
    sourceNote: "本頁曲目、演出人員與場地資訊整理自 2013 年正式節目冊、演出企劃書與新聞稿（校友留存資料）；如需更正或補充演出照片，歡迎透過粉絲專頁與我們聯繫。",
    status: "confirmed",
    notes: "全團約 80 人；正式節目冊資料完整。"
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
    venueNote: "現存海報可考最早的音樂廳演出紀錄",
    hostHead: "",
    organizers: [{ name: "張永澤", num: "9601", role: "主要籌備與行政統籌" }],
    conductors: [
      { name: "鄭鈞元", num: "8431", role: "指揮" },
      { name: "丁肇賢", num: "8501", role: "指揮" }
    ],
    soloists: [{ name: "李子沛", num: "9312", instrument: "長笛", work: "" }],
    program: [],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/concerts/2012.webp",
    page: "concerts/2012-28th.html",
    gallery: [],
    videos: [
      { label: "第 28 屆錄影清單", url: "https://youtube.com/playlist?list=PL59A19BE790C3493A", source: SOURCE_SOCIAL_VIDEO_LIST }
    ],
    news: [],
    sources: ["concerts.html", SOURCE_SOCIAL_VIDEO_LIST],
    status: "partial",
    notes: "嘉義市文化局主辦，國立嘉義高中協辦，行政院青輔會與教育部指導。"
  },
  {
    id: "2011-27th",
    nth: 27,
    year: 2011,
    rocYear: 100,
    title: "第 27 屆聯合音樂會",
    subtitle: "",
    date: "2011-07-16",
    time: "",
    venue: "",
    venueNote: "場地待考",
    hostHead: "",
    intro: [
      "2005 年 8 月 28 日，第 21 屆嘉義高中校友暨在校生聯合音樂會《神話》登場。這批校友珍藏的原始照片，記錄了演出前的後台花絮、正式登台演奏，到指揮謝幕的完整片刻。",
      "本屆場地、指揮與曲目資訊仍在考證中；若您是當年參與的校友、或留有節目冊等資料，歡迎透過粉絲專頁與我們聯繫，協助補齊這段歷史。"
    ],
    conductors: [],
    soloists: [],
    performers: [
      { name: "鄧杰翔", num: "8302", role: "打擊聲部" }
    ],
    program: [],
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
      "20260704_嘉中管樂社官網_校友提供資料/01_校友聯演與歷史活動史料/2011_校友演奏會_待考/20_照片影像_公開候選"
    ],
    status: "partial",
    notes: "2011 聯演存在與鄧杰翔打擊聲部由人物頁名單脈絡確認；日期由 2011.07.16 影像 EXIF 支持，場地、指揮、主題與完整曲目待節目冊或海報補齊。2011 世界管樂年會校友團協奏紀錄暫列為同年相關活動，未直接併入第 27 屆。"
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
    time: "",
    venue: "嘉義市音樂廳",
    venueNote: "今嘉義市政府文化局音樂廳",
    hostHead: "",
    conductors: [],
    soloists: [],
    program: [{ title: "Blue Midnight", status: "partial", note: "照片檔名留下之曲目線索" }],
    ticket: { type: "unknown", price: "", channels: [], note: "" },
    poster: "assets/img/gallery/2002/0830c-06.webp",
    page: "concerts/2002-18th.html",
    gallery: ["gallery/2002-concert.html"],
    news: [],
    sources: ["concerts.html", "gallery/2002-concert.html"],
    status: "partial",
    notes: "目前影像保存最完整的早期屆別；主題名稱與完整節目單待考。"
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
      "20260704_嘉中管樂社官網_校友提供資料/01_校友聯演與歷史活動史料/1990_早期校友演奏會_待考/10_節目冊海報文宣_公開候選/節目冊海報文宣__校友提供__6066c757__74568191_3528475503831025_8578050035239878656_n.jpg",
      "20260704_嘉中管樂社官網_校友提供資料/01_校友聯演與歷史活動史料/1990_早期校友演奏會_待考/10_節目冊海報文宣_公開候選/節目冊海報文宣__校友提供__267adef7__75279247_3528476053830970_5702877242284048384_n.jpg"
    ],
    status: "partial",
    notes: "節目冊封面與曲目頁完整度高；屆次依 1985 年第 1 屆推算為第 14 屆，待正式屆次文字佐證。補充資料中同時保存其他早期年份影像，已依節目冊封面文字辨識本筆為 1998 年。"
  },
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
      "20260704_嘉中管樂社官網_校友提供資料/01_校友聯演與歷史活動史料/1990_早期校友演奏會_待考/10_節目冊海報文宣_公開候選/節目冊海報文宣__校友提供__518498ed__74984677_3528475117164397_253369561129156608_n.jpg"
    ],
    status: "partial",
    notes: "封面寫作「七九年校友聯合演奏會」，日期 8 月 23 日星期四與 1990 年相符；屆次依 1985 年第 1 屆推算為第 6 屆，待正式屆次文字、指揮、曲目與團員名單佐證。"
  },
  {
    id: "1985-1st",
    nth: 1,
    year: 1985,
    rocYear: 74,
    title: "傳統的起點",
    subtitle: "",
    date: "",
    time: "",
    venue: "",
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
    sources: ["concerts.html", "history.html"],
    status: "pending",
    notes: "校友暨在校生聯合音樂會傳統自 1985 年開始；第 1 屆細節待考。"
  }
];
