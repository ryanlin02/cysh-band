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
   - link: 人物誌有詳細介紹時填 "people.html"（名錄卡會顯示連結）
   排列原則：依 year、num 由前輩至後輩（程式自動排序，這裡順序不拘）
*/
window.ALUMNI = [
  { num: null, name: "蕭萬長", year: 43, part: "打擊（鼓手）", tags: ["打擊"], role: "前副總統", desc: "學生時期是嘉中樂隊的鼓手，2024 年嘉中百年校慶亦親臨慶祝大會。編號制度建立前的資深前輩。", photo: "hsiao", link: "people.html" },
  { num: "6301", name: "陳錫仁", year: 63, part: "薩克斯風", tags: ["薩克斯風"], role: "音樂教育工作者", desc: "曾任教東海大學音樂系，是曾膺安大學時期的授業恩師——「學長教學弟」跨世代傳承的佳話。", photo: "6301", link: "" },
  { num: "6951", name: "曾膺安", year: 69, part: "小號", tags: ["小號"], role: "嘉義市管樂團藝術總監暨常任指揮", desc: "自 1994 年嘉義市管樂團創立掌舵至今逾 30 年，率團登上多個國際管樂舞台。", photo: "6951", link: "people.html" },
  { num: "7111", name: "盧宓承", year: 71, part: "長笛", tags: ["長笛"], role: "嘉義高中校友管樂團團長", desc: "校友管樂團登記立案代表人，現任教於雲林縣立蔦松藝術高中，校友聯演核心指揮之一。", photo: "7111", link: "people.html" },
  { num: "7112", name: "何權烈", year: 71, part: "長笛", tags: ["長笛"], role: "", desc: "民國 71 年入學，長笛聲部校友。", photo: "7112", link: "" },
  { num: "7202", name: "吳俊霖（伍佰）", year: 72, part: "副隊長．低音號", tags: ["幹部", "低音號"], role: "創作歌手", desc: "高中時期擔任樂隊副隊長、主修低音號，畢業後多年仍回母校參與校友演奏會。", photo: "7202", link: "people.html" },
  { num: "7401", name: "吳金河", year: 74, part: "社長", tags: ["幹部"], role: "", desc: "民國 74 年入學，當屆社長。", photo: "7401", link: "" },
  { num: "7502", name: "陳志鳴", year: 75, part: "副社長", tags: ["幹部"], role: "", desc: "民國 75 年入學，當屆副社長。", photo: "7502", link: "" },
  { num: "7581", name: "翁啟榮", year: 75, part: "低音號", tags: ["低音號"], role: "校友聯演籌備統籌", desc: "第 38 屆《一樹起響》音樂會籌備統籌，長年投入校友聯演事務。", photo: "7581", link: "" },
  { num: "7962", name: "范庭福", year: 79, part: "長號", tags: ["長號"], role: "", desc: "民國 79 年入學，長號聲部校友。", photo: "7962", link: "" },
  { num: "8301", name: "高崇文", year: 83, part: "長號", tags: ["長號"], role: "長號演奏家．音樂班教師", desc: "曾任高雄市交響樂團長號專任團員，現任教多校音樂班。", photo: "8301", link: "people.html" },
  { num: "8302", name: "鄧杰翔", year: 83, part: "副社長", tags: ["幹部"], role: "", desc: "民國 83 年入學，當屆副社長。", photo: "8302", link: "" },
  { num: "8401", name: "楊秉驊", year: 84, part: "社長", tags: ["幹部"], role: "", desc: "民國 84 年入學，當屆社長。", photo: "8401", link: "" },
  { num: "8431", name: "鄭鈞元", year: 84, part: "薩克斯風", tags: ["薩克斯風"], role: "薩克斯風演奏家．南華大學講師", desc: "嘉義市管樂團薩克斯風首席，多屆聯演的重要協奏校友。", photo: "8431", link: "people.html" },
  { num: "8501", name: "丁肇賢", year: 85, part: "社長．低音號", tags: ["幹部", "低音號"], role: "校友聯演統籌．指揮", desc: "長期統籌校友聯演行政與宣傳，近年聯演幕後最重要的推手之一。", photo: "8501", link: "people.html" },
  { num: "8522", name: "廖淑卿", year: 85, part: "豎笛", tags: ["豎笛"], role: "", desc: "民國 85 年入學，豎笛聲部校友。", photo: "8522", link: "" },
  { num: "8802", name: "劉議謙", year: 88, part: "副社長．法國號", tags: ["幹部", "法國號"], role: "", desc: "民國 88 年入學，當屆副社長，法國號聲部。", photo: "blank", link: "" },
  { num: "8861", name: "簡晟軒", year: 88, part: "長號", tags: ["長號"], role: "在校生管樂隊指導老師．長號演奏家", desc: "赴德國萊比錫音樂院深造，近年聯演核心指揮。", photo: "8861", link: "people.html" },
  { num: "8982", name: "王騰寬", year: 89, part: "低音號", tags: ["低音號"], role: "實踐大學音樂學系助理教授", desc: "主修鋼琴，深造鋼琴合作藝術，現任教於實踐大學音樂學系。", photo: "8982", link: "people.html" },
  { num: "9101", name: "謝介豪", year: 91, part: "長笛", tags: ["長笛", "豎笛"], role: "單簧管演奏家．教師", desc: "《校友名冊》登錄為單簧管演奏家、教師。", photo: "9101", link: "people.html" },
  { num: "9202", name: "蔡淳任", year: 92, part: "副社長", tags: ["幹部"], role: "", desc: "民國 92 年入學，當屆副社長。", photo: "9202", link: "" },
  { num: "9502", name: "林俊余", year: 95, part: "副社長", tags: ["幹部"], role: "第 41 屆音樂會聯絡人", desc: "民國 95 年入學，當屆副社長，《為伍》音樂會行政聯絡人。", photo: "blank", link: "" },
  { num: "9581", name: "李函濰", year: 95, part: "低音號", tags: ["低音號"], role: "", desc: "民國 95 年入學，低音號聲部校友。", photo: "9581", link: "" },
  { num: "9601", name: "張永澤", year: 96, part: "社長", tags: ["幹部"], role: "", desc: "民國 96 年入學，當屆社長。", photo: "9601", link: "" },
  { num: "9701", name: "蔡政岳", year: 97, part: "社長", tags: ["幹部"], role: "", desc: "民國 97 年入學，當屆社長。", photo: "9701", link: "" },
  { num: "9721", name: "葉哲良", year: 97, part: "豎笛", tags: ["豎笛"], role: "作曲家．編曲人", desc: "為嘉中百年校慶創作《旭陵慶典》，2023 年第 38 屆聯演首演。", photo: "9721", link: "people.html" },
  { num: "9802", name: "李亞璿", year: 98, part: "副社長", tags: ["幹部"], role: "", desc: "民國 98 年入學，當屆副社長。", photo: "9802", link: "" },
  { num: "9841", name: "洪筱涵", year: 98, part: "法國號", tags: ["法國號"], role: "法國號演奏家", desc: "現為國立臺灣交響樂團附設 NTSO 臺灣管樂團法國號團員。", photo: "blank", link: "people.html" },
  { num: "9921", name: "劉炫廷", year: 99, part: "豎笛", tags: ["豎笛"], role: "", desc: "民國 99 年入學，豎笛聲部校友。", photo: "9921", link: "" },
  { num: "0323", name: "董書菡", year: 103, part: "豎笛", tags: ["豎笛"], role: "", desc: "民國 103 年入學，豎笛聲部校友。", photo: "0323", link: "" },
  { num: "0431", name: "許哲誠", year: 104, part: "薩克斯風", tags: ["薩克斯風"], role: "旅外薩克斯風獨奏家", desc: "2025 年第 40 屆聯演協演校友。", photo: "0431", link: "people.html" },
  { num: "0611", name: "蔡詠竹", year: 106, part: "長笛", tags: ["長笛"], role: "", desc: "民國 106 年入學，長笛聲部校友。", photo: "0611", link: "" },
  { num: null, name: "莊宗儒", year: null, part: "上低音號", tags: ["上低音號"], role: "上低音號演奏家", desc: "2022 年第 37 屆聯演《從0開始》獨奏者。", photo: "blank", link: "people.html" },
  { num: null, name: "陳羿弦", year: null, part: "", tags: [], role: "", desc: "編號與聲部資料待補。", photo: "chenyihsien", link: "" }
];
