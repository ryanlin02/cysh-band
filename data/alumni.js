/* 校友名錄資料檔
   新增校友：複製一筆物件、照片放 assets/img/members/{編號}.webp（正方形 WebP）
   欄位說明：
   - num: 編號（字串；還沒有編號填 null）
   - name: 姓名
   - year: 入學民國年（數字；用於字頭分組與排序；未知填 null）
   - part: 聲部顯示文字（幹部可寫「社長」「副社長」等）
   - tags: 篩選用聲部標籤（可複選，如 ["幹部","低音號"]）
   - role: 一句話頭銜（沒有可填 ""）
   - desc: 簡短介紹（沒有可填 ""）
   - photo: 照片檔名（不含副檔名；預設用編號；沒有照片填 "blank"）
   - link: 三層判斷，依序擇一：
       1) 有個人專頁 → "people/{編號}.html"
       2) 無個人頁但人物誌（people.html）有卡片 → 錨點 "people.html#p-{編號}"（無編號者用拼音，如 "people.html#p-hsiao"，需與 people.html 該卡片的 id 一致）
       3) 兩者皆無 → 留空字串 ""
   排列原則：依 year、num 由前輩至後輩（程式自動排序，這裡順序不拘）
*/
window.ALUMNI = [
  { num: null, name: "蕭萬長", year: 43, part: "打擊（鼓手）", tags: ["打擊"], role: "前副總統", desc: "學生時期是嘉中樂隊的鼓手，2024 年嘉中百年校慶亦親臨慶祝大會。編號制度建立前的資深前輩。", photo: "hsiao", link: "people.html#p-hsiao" },
  { num: "6301", name: "陳錫仁", year: 63, part: "社長．小號", tags: ["幹部", "小號"], role: "小號演奏家．中臺科技大學教師", desc: "當屆社長、小號聲部。美國聖保羅大學小號演奏碩士，台灣銅管五重奏團創辦人、中臺科技大學教師，曾在東海大學指導曾膺安，多屆聯演擔任指揮與小號獨奏。", photo: "6301", link: "people/6301.html" },
  { num: "6392", name: "羅家駒", year: 63, part: "打擊", tags: ["打擊"], role: "音樂教師．前指導老師", desc: "民國 63 年入學，打擊聲部，曾返回母隊擔任指導老師，深受隊員愛戴；現為詩班、合唱團、管樂與吉他教師。「依風台窩點、和學弟妹一齊演出的點滴！」", photo: "blank", link: "" },
  { num: "6401", name: "馮朝君", year: 64, part: "社長．打擊", tags: ["幹部", "打擊"], role: "嘉義城市管樂推手．前校友團團長", desc: "嘉中管樂隊校友，退伍後返回母隊指導學弟，後續投入嘉義地區學校管樂教育、嘉義市管樂節早期籌辦與嘉義市管樂團行政。曾任嘉義高中校友管樂團團長，媒體曾以「嘉義市管樂之父」稱之。", photo: "6401", link: "people/6401.html" },
  { num: "6951", name: "曾膺安", year: 69, part: "小號", tags: ["小號"], role: "嘉義市管樂團藝術總監暨常任指揮", desc: "自 1994 年嘉義市管樂團創立掌舵至今逾 30 年，率團登上多個國際管樂舞台。", photo: "6951", link: "people/6951.html" },
  { num: "7111", name: "盧宓承", year: 71, part: "長笛", tags: ["長笛"], role: "嘉義高中校友管樂團團長", desc: "綽號「咪咪學長」。校友管樂團登記立案代表人，現任教於雲林縣立蔦松藝術高中，校友聯演核心指揮之一。", photo: "7111", link: "people/7111.html" },
  { num: "7112", name: "何權烈", year: 71, part: "長笛", tags: ["長笛"], role: "", desc: "民國 71 年入學，長笛聲部校友。", photo: "7112", link: "" },
  { num: "7202", name: "吳俊霖（伍佰）", year: 72, part: "副隊長．低音號", tags: ["幹部", "低音號"], role: "創作歌手", desc: "高中時期擔任樂隊副隊長、主修低音號，畢業後多年仍回母校參與校友演奏會。", photo: "7202", link: "people.html#p-7202" },
  { num: "7401", name: "吳金河", year: 74, part: "社長．法國號", tags: ["幹部", "法國號"], role: "", desc: "民國 74 年入學，當屆社長，法國號聲部。", photo: "7401", link: "" },
  { num: "7502", name: "陳志鳴", year: 75, part: "副社長．打擊", tags: ["幹部", "打擊"], role: "", desc: "民國 75 年入學，當屆副社長，打擊聲部。", photo: "7502", link: "" },
  { num: "7581", name: "翁啟榮", year: 75, part: "低音號", tags: ["低音號"], role: "校友聯演籌備統籌", desc: "民國 75 年入隊，低音號一吹超過四十年；現職警官，綽號「警伯」。第 38 屆《一樹起響》籌備統籌，長年統籌聯演行政與帳務，每次團練第一個到場開門的人。「生於嘉義市管樂剛啟蒙的年代，太幸福了。」", photo: "7581", link: "people/7581.html" },
  { num: "7962", name: "范庭福", year: 79, part: "長號", tags: ["長號"], role: "", desc: "民國 79 年入學，長號聲部校友。", photo: "7962", link: "" },
  { num: "8192", name: "李瑾佑", year: 81, part: "打擊", tags: ["打擊"], role: "", desc: "民國 81 年入學，打擊聲部校友。", photo: "blank", link: "" },
  { num: "8301", name: "高崇文", year: 83, part: "社長．長號", tags: ["幹部", "長號"], role: "長號演奏家．音樂班教師", desc: "民國 83 年入學，當屆社長。曾任高雄市交響樂團長號專任團員，現任教多校音樂班。", photo: "8301", link: "people/8301.html" },
  { num: "8302", name: "鄧杰翔", year: 83, part: "副社長．打擊", tags: ["幹部", "打擊"], role: "", desc: "民國 83 年入學，當屆副社長，打擊聲部。", photo: "8302", link: "" },
  { num: "8401", name: "楊秉驊", year: 84, part: "社長．小號", tags: ["幹部", "小號"], role: "", desc: "民國 84 年入學，當屆社長，小號聲部。", photo: "8401", link: "" },
  { num: "8431", name: "鄭鈞元", year: 84, part: "薩克斯風", tags: ["薩克斯風"], role: "薩克斯風演奏家．南華大學講師", desc: "嘉義市管樂團薩克斯風首席，多屆聯演的重要協奏校友。", photo: "8431", link: "people/8431.html" },
  { num: "8501", name: "丁肇賢", year: 85, part: "社長．低音號", tags: ["幹部", "低音號"], role: "校友聯演統籌．指揮", desc: "長期統籌校友聯演行政與宣傳，近年聯演幕後最重要的推手之一。", photo: "8501", link: "people/8501.html" },
  { num: "8481", name: "羅碩文", year: 84, part: "低音號", tags: ["低音號"], role: "", desc: "民國 84 年入學，低音號聲部校友，曾協助接洽校友團公園演出場地。", photo: "blank", link: "" },
  { num: "8522", name: "廖淑卿", year: 85, part: "豎笛", tags: ["豎笛"], role: "", desc: "民國 85 年入學，豎笛聲部校友。", photo: "8522", link: "" },
  { num: "8601", name: "古峻錡", year: 86, part: "社長．小號", tags: ["幹部", "小號"], role: "", desc: "民國 86 年入學，當屆社長、小號聲部，畢業後長年活躍於校友社群，曾提議跨校聯合寒訓。", photo: "blank", link: "" },
  { num: "8671", name: "吳仁庭", year: 86, part: "上低音號", tags: ["上低音號"], role: "", desc: "民國 86 年入學，上低音號聲部校友。", photo: "blank", link: "" },
  { num: "8703", name: "林彥佑", year: 87, part: "前幹部．打擊", tags: ["幹部", "打擊"], role: "", desc: "民國 87 年入學，打擊聲部。曾回憶在「綠色小屋」的社團時光與每天兩百下伏地挺身的紮實訓練。", photo: "blank", link: "" },
  { num: "8722", name: "張羽嫻", year: 87, part: "豎笛", tags: ["豎笛"], role: "", desc: "民國 87 年入學，豎笛聲部校友。", photo: "blank", link: "" },
  { num: "8802", name: "劉議謙", year: 88, part: "副社長．法國號", tags: ["幹部", "法國號"], role: "", desc: "民國 88 年入學，當屆副社長，法國號聲部。", photo: "blank", link: "" },
  { num: "8841", name: "魏仕杰", year: 88, part: "法國號", tags: ["法國號"], role: "", desc: "民國 88 年入學，法國號聲部校友，長年參與校友活動與支援演出。", photo: "blank", link: "" },
  { num: "8861", name: "簡晟軒", year: 88, part: "長號", tags: ["長號"], role: "在校生管樂隊指導老師．長號演奏家", desc: "赴德國萊比錫音樂院深造，近年聯演核心指揮。", photo: "8861", link: "people/8861.html" },
  { num: "8901", name: "黃信又", year: 89, part: "社長．豎笛", tags: ["幹部", "豎笛"], role: "", desc: "民國 89 年入學，當屆社長，豎笛聲部。", photo: "blank", link: "" },
  { num: "8922", name: "陳正龍", year: 89, part: "豎笛", tags: ["豎笛"], role: "", desc: "民國 89 年入學，豎笛聲部校友。", photo: "blank", link: "" },
  { num: "8941", name: "洪伯欣", year: 89, part: "法國號", tags: ["法國號"], role: "", desc: "民國 89 年入學，法國號聲部校友，學生時期多次夜宿社辦，畢業後活躍於校友社群。", photo: "blank", link: "" },
  { num: "8942", name: "黃乙晃", year: 89, part: "法國號", tags: ["法國號"], role: "", desc: "民國 89 年入學，法國號聲部校友，曾協助接洽校友團演出場地。", photo: "blank", link: "" },
  { num: "8961", name: "鄭嘉緯", year: 89, part: "長號", tags: ["長號"], role: "", desc: "民國 89 年入學，長號聲部校友。", photo: "blank", link: "" },
  { num: "8991", name: "陳英杰", year: 89, part: "打擊", tags: ["打擊"], role: "", desc: "民國 89 年入學，打擊聲部校友。", photo: "blank", link: "" },
  { num: "8993", name: "林唐禾", year: 89, part: "打擊", tags: ["打擊"], role: "校友聯演指揮之一", desc: "民國 89 年入學，打擊聲部；2020 年第 36 屆聯演《Parent-Child 99》擔任指揮之一。", photo: "blank", link: "" },
  { num: "8982", name: "王騰寬", year: 89, part: "低音號", tags: ["低音號"], role: "實踐大學音樂學系助理教授", desc: "主修鋼琴，深造鋼琴合作藝術，現任教於實踐大學音樂學系。", photo: "8982", link: "people/8982.html" },
  { num: "9101", name: "謝介豪", year: 91, part: "社長．豎笛", tags: ["幹部", "豎笛"], role: "單簧管演奏家．教師", desc: "民國 91 年入學，當屆社長，豎笛（單簧管）聲部。《校友名冊》登錄為單簧管演奏家、教師。", photo: "9101", link: "people.html#p-9101" },
  { num: "9202", name: "蔡淳任", year: 92, part: "副社長．小號", tags: ["幹部", "小號"], role: "", desc: "民國 92 年入學，當屆副社長，小號聲部。", photo: "9202", link: "" },
  { num: "9311", name: "蔡沛霖", year: 93, part: "長笛", tags: ["長笛"], role: "", desc: "民國 93 年入學，長笛聲部校友，曾擔任校友團會計。", photo: "blank", link: "" },
  { num: "9502", name: "林俊余", year: 95, part: "副社長．長號", tags: ["幹部", "長號"], role: "steam平台5款遊戲全成就達成", desc: "民國 95 年入學，當屆副社長，長號聲部，《為伍》音樂會行政聯絡人。", photo: "blank", link: "" },
  { num: "9581", name: "李函濰", year: 95, part: "低音號", tags: ["低音號"], role: "", desc: "民國 95 年入學，低音號聲部校友。", photo: "9581", link: "" },
  { num: "9601", name: "張永澤", year: 96, part: "社長．長號", tags: ["幹部", "長號"], role: "", desc: "民國 96 年入學，當屆社長，長號聲部。", photo: "9601", link: "" },
  { num: "9701", name: "蔡政岳", year: 97, part: "社長．長號", tags: ["幹部", "長號"], role: "長號演奏家．低音銅管教師", desc: "當屆社長、長號聲部。國立高雄師範大學長號演奏碩士，嘉義市管樂團、NTSO 臺灣管樂團團員，長年於嘉義、雲林多校指導長號與低音銅管。", photo: "9701", link: "people/9701.html" },
  { num: "9721", name: "葉哲良", year: 97, part: "豎笛", tags: ["豎笛"], role: "作曲家．編曲人", desc: "為嘉中百年校慶創作《旭陵慶典》，2023 年第 38 屆聯演首演。", photo: "9721", link: "people/9721.html" },
  { num: "9802", name: "李亞璿", year: 98, part: "副社長．豎笛", tags: ["幹部", "豎笛"], role: "", desc: "民國 98 年入學，當屆副社長，豎笛聲部。", photo: "9802", link: "" },
  { num: "9841", name: "洪筱涵", year: 98, part: "法國號", tags: ["法國號"], role: "法國號演奏家", desc: "現為國立臺灣交響樂團附設 NTSO 臺灣管樂團法國號團員。", photo: "blank", link: "people.html#p-9841" },
  { num: "9921", name: "劉炫廷", year: 99, part: "豎笛", tags: ["豎笛"], role: "", desc: "民國 99 年入學，豎笛聲部校友。", photo: "9921", link: "" },
  { num: "0323", name: "董書菡", year: 103, part: "豎笛", tags: ["豎笛"], role: "", desc: "民國 103 年入學，豎笛聲部校友。", photo: "0323", link: "" },
  { num: "0431", name: "許哲誠", year: 104, part: "薩克斯風", tags: ["薩克斯風"], role: "旅外薩克斯風獨奏家", desc: "2025 年第 40 屆聯演協演校友。", photo: "0431", link: "people.html#p-0431" },
  { num: "0611", name: "蔡詠竹", year: 106, part: "長笛", tags: ["長笛"], role: "", desc: "民國 106 年入學，長笛聲部校友。", photo: "0611", link: "" },
  { num: "7571", name: "陳昌遠", year: 75, part: "上低音號", tags: ["上低音號"], role: "大學兼任教師", desc: "民國 75 年入學，上低音號聲部校友。", photo: "blank", link: "" },
  { num: "7722", name: "陳冠志", year: 77, part: "豎笛", tags: ["豎笛"], role: "工程師", desc: "民國 77 年入學，豎笛聲部校友。「感謝有樂隊，讓我有地方混。」", photo: "blank", link: "" },
  { num: "7921", name: "莊富益", year: 79, part: "豎笛", tags: ["豎笛"], role: "國小教師", desc: "民國 79 年入學，豎笛聲部校友。回憶嘉中管樂是「一群人完成好多事，音樂啟蒙的地方」。", photo: "7921", link: "" },
  { num: "8603", name: "江俊漢", year: 86, part: "副社長．豎笛", tags: ["幹部", "豎笛"], role: "嘉義大學特殊教育學系專任教師", desc: "民國 86 年入學，曾任副社長，豎笛聲部。", photo: "8603", link: "" },
  { num: "8912", name: "黃耀瑩", year: 89, part: "長笛", tags: ["長笛"], role: "愛樂者", desc: "民國 89 年入學，長笛聲部校友。「不能沒有你。」", photo: "8912", link: "" },
  { num: "8962", name: "蔡秉璋", year: 89, part: "長號", tags: ["長號"], role: "警務員", desc: "民國 89 年入學，長號聲部校友，現職臺南市政府警察局刑事鑑識中心警務員。", photo: "blank", link: "" },
  { num: "1001", name: "林奕安", year: 110, part: "社長．豎笛", tags: ["幹部", "豎笛"], role: "", desc: "民國 110 年入學，當屆社長，豎笛聲部，現就讀蘇州大學。", photo: "blank", link: "" },
  { num: "1051", name: "黃鈺芠", year: 110, part: "小號", tags: ["小號"], role: "臺北市立大學音樂系．《為伍》小號協奏", desc: "民國 110 年入學，小號聲部。自嘉義校園管樂體系成長，曾參與嘉義市國際管樂節與嘉中百年校慶聯演，將於第 41 屆《為伍》擔任 Philip Sparke《Manhattan》小號協奏。", photo: "1051", link: "people/1051.html" },
  { num: "0755", name: "許祥倫", year: 107, part: "小號", tags: ["小號"], role: "研究生", desc: "民國 107 年入學，小號聲部校友。", photo: "0755", link: "" },
  { num: null, name: "林少凡", year: 107, part: "小號", tags: ["小號"], role: "小號演奏．音樂研究生", desc: "民國 107 年入學，小號聲部。屏東大學音樂系畢業，現就讀國立臺北教育大學音樂學系碩士班演奏組；曾參與大型歌劇、職棒與國際賽事應援樂隊演出。校友編號待查。", photo: "linshaofan", link: "" },
  { num: "9161", name: "王聖安", year: 91, part: "長號", tags: ["長號"], role: "諮商心理師", desc: "民國 91 年入學，長號聲部校友。", photo: "9161", link: "" },
  { num: "0271", name: "莊宗儒", year: 102, part: "上低音號", tags: ["上低音號"], role: "上低音號演奏家", desc: "北藝大管絃與擊樂研究所畢業，EuTuba 悠風低音號重奏團、銅心銅管樂團、TSO 管樂團上低音號團員。2022 年第 37 屆聯演《從0開始》獨奏者，2025 TEF 總召集人。", photo: "0271", link: "people.html#p-0271" },
  { num: "0741", name: "陳羿弦", year: 107, part: "法國號", tags: ["法國號"], role: "法國號．藝術管理研究生", desc: "民國 107 年入學，法國號聲部，第 89 屆學生指揮。嘉義高中音樂班、國立清華大學音樂系畢業，現就讀國立中山大學藝術管理與創業研究所。", photo: "0741", link: "people.html#p-0741" }
];
