/**
 * 第 41 屆嘉義高中校友暨在校生聯合音樂會《為伍》線上節目冊 - 資料設定檔
 */

export const concertData = {
  // --- 1. 基本資訊 ---
  info: {
    title: "為伍",
    titleEnglish: "Keep Company",
    concertNo: "第 41 屆嘉義高中校友暨在校生聯合音樂會",
    pageTypeTitle: "線上節目冊",
    date: "2026.08.08",
    dayOfWeek: "星期六",
    time: "14:30",
    doorTime: "14:00 自由入場",
    venue: "嘉義市政府文化局音樂廳",
    venueAddress: "嘉義市東區忠孝路 275 號",
    posterUrl: "https://cysh.band/assets/img/poster_weiwu_2026.webp",
    organizer: "五字頭",
    officialConcertPage: "https://cysh.band/concerts/2026-41st.html"
  },

  // --- 2. 團長的話 (盧宓承 團長，編號 7111) ---
  presidentMessage: {
    title: "團長的話",
    author: "團長 盧宓承",
    number: "7111",
    photo: "https://cysh.band/assets/img/members/7111.webp",
    subtitle: "以音樂為伍，跨越世代的聚首",
    content: [
      "歡迎各位蒞臨 2026 年第 41 屆嘉義高中校友暨在校生聯合音樂會《為伍》。",
      "從 1931 年嘉中管樂社創立至今，吹奏音樂的熱情在校園與社辦裡延續了近百年。每年夏天，散落各地的校友帶著久未保養卻熟悉的樂器歸隊，與年輕的在校生譜架並排，在同一組指揮棒下吹出相同的和聲。",
      "「為伍」，代表著相聚、陪伴與同行。睽違六年，我們重新回到熟悉的嘉義市政府文化局音樂廳。感謝每一位撥空到場的聽眾，願今晚的樂音能與大家常相陪伴。"
    ]
  },

  // --- 3. 團隊、指揮與獨奏家介紹 (純數字號碼、官網連結) ---
  leadership: {
    conductors: [
      {
        id: "8861",
        name: "簡晟軒",
        number: "8861",
        role: "樂團指導 / 指揮",
        photo: "https://cysh.band/assets/img/members/8861.webp",
        bio: [
          "從嘉中管樂隊第一次拿起長號，到指揮東京佼成管樂團錄製臺灣作品——簡晟軒在演奏、指揮與教育之間扎根嘉義。",
          "作為本次《為伍》聯合音樂會的樂團指導，簡晟軒帶領不同世代的校友與在校生，將經典管樂大作、精緻小號協奏與流行動漫主題曲融入整場節目，展現樂團極具張力與感染力的音樂面貌。"
        ],
        officialLink: "https://cysh.band/people/8861.html"
      },
      {
        id: "8501",
        name: "丁肇賢",
        number: "8501",
        role: "樂團指導 / 指揮",
        photo: "https://cysh.band/assets/img/members/8501.webp",
        bio: [
          "從嘉中低音號手到管樂與管弦樂團指揮——丁肇賢長年返團帶領校友與在校生，是近年校友聯演幕後最重要的推手之一。",
          "丁肇賢擁有極為豐富的樂團合奏指導經驗，細膩精準的排練風格陪伴每一屆暑期團練的點點滴滴，把世代間的聲響慢慢靠攏，點亮舞台上的高光時刻。"
        ],
        officialLink: "https://cysh.band/people/8501.html"
      }
    ],
    soloist: [
      {
        id: "1051",
        name: "黃鈺芠",
        number: "1051",
        role: "小號獨奏 / Sparke: Manhattan",
        photo: "https://cysh.band/assets/img/members/1051.webp",
        bio: [
          "從嘉義校園管樂體系走向嘉中校友團——黃鈺芠展現了極具穿透力與歌唱感的亮麗小號音色。",
          "本次音樂會重頭戲，黃鈺芠特別擔綱演出 Philip Sparke 寫給小號與管樂團的名作《Manhattan》。全曲呈現紐約曼哈頓的爵士律動與天際線的光影變化，技術性與音樂性兼備。"
        ],
        officialLink: "https://cysh.band/people/1051.html"
      }
    ],
    ensembles: [
      {
        title: "嘉義高中校友管樂團",
        subtitle: "CYSH Alumni Band",
        photo: "https://cysh.band/assets/img/og.jpg",
        content: [
          "嘉義高中校友管樂團於 2008 年正式立案為演藝團體。樂團由散落於全國乃至世界各地的嘉中管樂校友組成，團員編號橫跨數十個世代字頭。",
          "校友團秉持「傳承、創新與熱情」的理念，每年夏天籌辦「校友暨在校生聯合音樂會」，讓畢業多年的學長們回到熟悉的譜架前，與在校學弟們共同合奏，透過樂音延續對管樂的熱愛與世代交替的情感。"
        ],
        officialLink: "https://cysh.band/about.html"
      },
      {
        title: "國立嘉義高級中學管樂社",
        subtitle: "CYSH Student Band (Founded 1931)",
        photo: "https://cysh.band/assets/img/og.jpg",
        content: [
          "國立嘉義高級中學管樂社創立於 1931 年（日治時期昭和六年），是臺灣歷史最悠久的高中學府管樂團之一。",
          "社團在長達九十餘年的歲月中，培育出無數傑出的音樂家與熱愛音樂的各領域人才。在校生團員在極具傳承精神的樂團指導下，連年在音樂比賽與演出中展現亮眼成績，是嘉義高中最具代表性的社團之一。"
        ],
        officialLink: "https://cysh.band/history.html"
      }
    ]
  },

  // --- 4. 曲目與詳盡管樂樂曲解說 ---
  program: {
    firstHalf: [
      {
        no: 1,
        title: "Flashing Winds",
        titleZh: "閃耀之風",
        composer: "Jan Van der Roost (揚·范德羅斯特)",
        arranger: "",
        duration: "約 4 分 30 秒",
        note: [
          "《Flashing Winds》（閃耀之風）是比利時管樂大師揚·范德羅斯特（Jan Van der Roost）受「西法蘭德斯音樂聯盟」（Het muziekverbond van West-Vlaanderen）委託創作之代表作品（難度 Grade 5），並題獻給 Arlequino 青年管樂團。",
          "樂曲最顯著的特色在於「全曲速度始終不變」，在單一高速節奏下保持極強的向前推進動力。開頭由全團發出震撼力十足的「和聲音塊」（chord-blocks），隨即進入木管群疾風般流轉的六八拍與二四拍交錯主題。中段銅管號角與木管旋律交織，後段再度重現開頭壯麗的和聲音塊，達到首尾嚴謹呼應的建築美感，為音樂會揭開華麗燦爛的序幕。"
        ]
      },
      {
        no: 2,
        title: "Ye Banks and Braes o' Bonnie Doon",
        titleZh: "美麗邦尼鄧的河岸與丘陵",
        composer: "Percy A. Grainger (珀西·格蘭傑)",
        arranger: "",
        duration: "約 3 分 00 秒",
        note: [
          "《Ye Banks and Braes o' Bonnie Doon》是澳洲裔作曲家珀西·格蘭傑（Percy Grainger）著名的「英國民謠設定」（British Folk-Music Settings）第 32 號作品。改編自蘇格蘭詩人羅伯特·彭斯（Robert Burns）於 1791 年寫下的抒情詩篇，搭配傳統蘇格蘭曲調《The Caledonian Hunt's Delight》。",
          "全曲以簡潔嚴謹的 17 小節 AABA 結構組成，描繪流經蘇格蘭丘陵的鄧河（Doon River）。格蘭傑將管樂團運用如管風琴般深邃溫暖，低音木管與法國號鋪設持久的微音襯底（drone background），長笛與單簧管吹奏富有彈性速度（tempo rubato）的複音對位。極度考驗樂團的呼吸控制與音色融合度，傳達出濃郁的懷舊與深情。"
        ]
      },
      {
        no: 3,
        title: "The Seventh Night of July (たなばた)",
        titleZh: "七夕",
        composer: "酒井格 (Itaru Sakai)",
        arranger: "",
        duration: "約 6 分 00 秒",
        note: [
          "《たなばた》（七夕）是日本著名管樂作曲家酒井格於 1988 年高三時期創作的管樂傳承名作。樂曲創作靈感來自七夕夜晚織女星（Orihime）與牛郎星（Hikoboshi）跨越銀河相會的浪漫傳說。",
          "樂曲開頭由輝煌華麗的快板（Allegro）展開，璀璨的木管音符宛如夏季夜空繁星閃爍。曲中令人心醉的慢板（Andante）段落，由中音薩克斯風吹出深情款款的織女主題，隨後由上低音號（或法國號）吹奏牛郎的主題回應，兩者在樂團溫柔的和聲中對唱。末段再現快板的主題並融合節慶氛圍，將跨越時空的相聚情感推向最震撼的高潮。"
        ]
      },
      {
        no: 4,
        title: "Manhattan (Concerto for Trumpet)",
        titleZh: "曼哈頓 (小號協奏曲)",
        composer: "Philip Sparke (菲利浦·史巴克)",
        soloist: "黃鈺芠 (1051)",
        soloInstrument: "小號 Solo Trumpet",
        duration: "約 10 分 00 秒",
        note: [
          "《Manhattan》是英國管樂大師菲利浦·史巴克（Philip Sparke）應美國陸軍軍樂隊（The United States Army Band）委託創作的小號協奏曲名作，2003 年於紐約卡內基音樂廳首演。全曲以紐約曼哈頓的都市風貌與生活節奏為背景，分為兩個風格鮮明的樂章：",
          "第一樂章〈週六小夜曲 Saturday Serenade〉帶有濃厚的藍調（bluesy）色彩，從小號優雅高亢的抒情長調，描繪紐約週末夜晚煙霧繚繞的爵士酒吧與街頭浪漫；第二樂章〈週日詼諧曲 Sunday Scherzo〉則轉為節奏輕快、充滿活力的切分快板，描繪週日清晨中央公園慢跑的人群與天際線光影。全曲極具技術與音樂性挑戰，將由校友黃鈺芠精彩詮釋。"
        ]
      }
    ],
    secondHalf: [
      {
        no: 5,
        title: "Novena + Seagate Overture",
        titleZh: "諾維娜與海門序曲組曲",
        composer: "James Swearingen (詹姆斯·斯威靈根)",
        arranger: "",
        duration: "約 7 分 30 秒",
        note: [
          "美國管樂教育家兼作曲家詹姆斯·斯威靈根（James Swearingen）的作品，是全球無數管樂學習者學生時代最重要的啟蒙記憶與音樂基石。本場音樂會特別將 Swearingen 最具代表性的兩首 Grade 3 經典串聯呈現：",
          "前半段《Novena》（管樂狂想曲，1980）由深沉感性的慢板（Adagio）展開，經由木管獨奏與層層堆疊的和聲懸疑，推進至震撼的情感高潮；後半段無縫銜接《Seagate Overture》（海門序曲，1988），以輝煌雄渾的銅管號角與充滿動感的切分節奏展現宏偉氣勢。兩曲交織重現了青春時期合奏時最純粹、最澎湃的音樂感動。"
        ]
      },
      {
        no: 6,
        title: "The Days Of Wine And Roses",
        titleZh: "美酒與玫瑰的日子",
        composer: "Henry Mancini",
        arranger: "岩井直溥 (Naohiro Iwai)",
        duration: "約 4 分 00 秒",
        note: [
          "本曲原為亨利·曼西尼（Henry Mancini）於 1962 年榮獲奧斯卡最佳原創歌曲獎的同名電影主題曲，由日本吹奏樂教父岩井直溥親自改編（收錄於經典《New Sounds in Brass》系列）。",
          "岩井直溥以極具成熟魅力的中速 Swing 爵士搖擺風格改編。配器上融合了薩克斯風組迷人濃郁的密聲部和聲、銅管加弱音器的對位答唱，以及低音聲部流暢的行走貝斯（Walking Bass）。整首作品散發出如 1960 年代好萊塢爵士酒吧般溫潤、復古且令人醉心的微醺韻味。"
        ]
      },
      {
        no: 7,
        title: "Heal The World",
        titleZh: "拯救世界",
        composer: "Michael Jackson",
        arranger: "Ron Sebregts",
        duration: "約 5 分 00 秒",
        note: [
          "《Heal The World》為流行樂之王麥可·傑克森（Michael Jackson）於 1991 年專輯《Dangerous》中發行的經典和平大愛名曲，由荷蘭編曲家 Ron Sebregts 精緻改編為管樂合奏版本。",
          "樂曲開端由長笛與單簧管吹奏出純真暖心的主旋律，隨後法國號與中音聲部加入疊加層次。音樂隨著調性轉調層層遞進，最終匯聚成全團宏亮輝煌的大合奏唱段，將大愛、希望與跨越世代相互擁抱的溫暖力量注入每一位聽眾的心中。"
        ]
      },
      {
        no: 8,
        title: "Japanese Graffiti XXII City Pop Medley",
        titleZh: "日本流行塗鴉 XXII：City Pop 組曲",
        composer: "Various Artists",
        arranger: "金山徹 (Tohru Kanayama)",
        duration: "約 7 分 00 秒",
        note: [
          "收錄日本 1980 年代掀起全球熱潮的「City Pop」五首黃金歲月代表作，由金山徹精心編曲：",
          "1. 山下達郎〈SPARKLE〉：以強烈吉他切分律動改編的耀眼銅管開場；\n2. 竹內瑪莉亞〈Plastic Love〉：神秘動感迪斯可節奏與薩克斯風性感和聲；\n3. 大瀧詠一〈君は天然色〉：明快流暢的六八拍 POP 搖擺與木管亮麗音符；\n4. 泰葉〈Flyday Chinatown〉：帶有東方都市異國風情的狂野爵士切分；\n5. 松原美紀〈真夜中的ドア〜stay with me〉：深情高亢的銅管主旋律帶領全場重回復古耀眼的霓虹夜光。"
        ]
      },
      {
        no: 9,
        title: "Symphonic Suite of Galaxy (Super Mario Galaxy)",
        titleZh: "星雲交響組曲（選自《超級瑪利歐銀河》）",
        composer: "橫田真人、近藤浩治",
        arranger: "尚水堂",
        duration: "約 8 分 30 秒",
        note: [
          "任天堂 2007 年經典電玩巨作《Super Mario Galaxy》（超級瑪利歐銀河）管樂交響改編組曲。原聲帶由橫田真人與近藤浩治指揮管弦樂團實錄，被譽為遊戲音樂史上不可逾越的高峰。",
          "本曲將宇宙冒險的浩瀚與奇幻色彩極致交響化。曲中收錄最知名的〈Gusty Garden Galaxy〉（風之花園）宏偉主旋律、太空打擊樂的磅礡推進與木管群如星芒般的快速琶音。全團銅管與打擊樂交織出極具震撼力的交響終曲，為第 41 屆《為伍》下半場劃下圓滿燦爛的句點。"
        ]
      }
    ]
  },

  // --- 5. 演出人員名冊 ---
  roster: [
    {
      section: "Flute & Piccolo",
      sectionZh: "長笛 / 短笛",
      members: [
        { name: "翁啟榮", number: "7581" },
        { name: "陳立威", number: "9512" },
        { name: "林庭宇", number: "10103" },
        { name: "張嘉哲", number: "10521" },
        { name: "許柏翔", number: "11005" }
      ]
    },
    {
      section: "Oboe & English Horn",
      sectionZh: "雙簧管 / 英國管",
      members: [
        { name: "蔡秉修", number: "9811" },
        { name: "劉彥均", number: "10416" },
        { name: "郭宥廷", number: "11108" },
        { name: "陳冠宇", number: "11204" },
        { name: "黃聖傑", number: "11310" }
      ]
    },
    {
      section: "Clarinet",
      sectionZh: "單簧管",
      members: [
        { name: "李國豪", number: "8204" },
        { name: "賴冠宏", number: "9115" },
        { name: "吳宗翰", number: "9722" },
        { name: "曾敬哲", number: "10014" },
        { name: "鄭宇軒", number: "10309" }
      ]
    },
    {
      section: "Saxophone",
      sectionZh: "薩克斯風",
      members: [
        { name: "周建宏", number: "8609" },
        { name: "黃冠文", number: "9317" },
        { name: "柯博文", number: "9904" },
        { name: "蕭崇安", number: "10211" },
        { name: "蔡昀達", number: "10719" }
      ]
    },
    {
      section: "French Horn",
      sectionZh: "法國號",
      members: [
        { name: "張志豪", number: "8710" },
        { name: "方品智", number: "9406" },
        { name: "楊晨昇", number: "10118" },
        { name: "羅子翔", number: "10625" },
        { name: "簡聖祐", number: "11112" }
      ]
    },
    {
      section: "Trumpet",
      sectionZh: "小號",
      members: [
        { name: "黃鈺芠", number: "1051" },
        { name: "陳智遠", number: "8914" },
        { name: "劉家銘", number: "9603" },
        { name: "洪偉哲", number: "10129" },
        { name: "詹益翔", number: "10807" }
      ]
    },
    {
      section: "Trombone",
      sectionZh: "長號",
      members: [
        { name: "簡晟軒", number: "8861" },
        { name: "林聖傑", number: "9218" },
        { name: "徐嘉佑", number: "10007" },
        { name: "戴子揚", number: "10531" },
        { name: "莊宗穎", number: "11019" }
      ]
    },
    {
      section: "Euphonium & Tuba",
      sectionZh: "上低音號 / 低音號",
      members: [
        { name: "丁肇賢", number: "8501" },
        { name: "蘇承毅", number: "9422" },
        { name: "魏廷諺", number: "10315" },
        { name: "潘柏辰", number: "10904" },
        { name: "鍾易達", number: "11311" }
      ]
    },
    {
      section: "Percussion",
      sectionZh: "打擊樂",
      members: [
        { name: "廖健宏", number: "9008" },
        { name: "江庭緯", number: "9829" },
        { name: "彭修齊", number: "10402" },
        { name: "粘博盛", number: "10714" },
        { name: "梁哲瑋", number: "11133" }
      ]
    }
  ],

  // --- 6. 工作人員名冊 (團長盧宓承 7111 為第一項) ---
  organization: {
    staffTitle: "籌備與工作人員名冊",
    staffGroups: [
      { role: "團長", names: ["盧宓承"] },
      { role: "主辦字頭", names: ["五字頭"] },
      { role: "總召集人", names: ["王則量"] },
      { role: "執行企劃", names: ["翁啟榮", "丁肇賢"] },
      { role: "文宣 / 美宣設計", names: ["廖淑卿", "劉炫廷"] },
      { role: "譜務組", names: ["翁啟榮", "丁肇賢"] },
      { role: "總務組", names: ["魏仕杰"] },
      { role: "場務 / 器材組", names: ["還沒決定"] },
      { role: "前台公關組", names: ["還沒決定"] },
      { role: "影像直播 / 紀錄", names: ["量子藝術有限公司"] }
    ],
    thanksTitle: "特別感謝",
    thanksList: [
      "國立嘉義高級中學",
      "嘉義市政府文化局",
      "熱心贊助與協助練習之全體校友與親友",
      "所有蒞臨現場支持的樂迷朋友"
    ],
    feedbackUrl: "https://forms.gle/sample-feedback-form-41st"
  }
};
