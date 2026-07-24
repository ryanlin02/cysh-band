window.CONCERT_PROGRAM_DATA = {
  info: {
    concertNo: "第 N 屆嘉義高中校友暨在校生聯合音樂會",
    headerTitle: "第N屆｜《演出名稱》",
    title: "演出名稱",
    titleEnglish: "English Title",
    date: "YYYY.MM.DD",
    dayOfWeek: "六",
    time: "14:30",
    venue: "演出場地",
    posterUrl: "../../assets/img/poster.webp"
  },
  presidentMessage: {
    title: "團長的話",
    author: "姓名",
    subtitle: "團長",
    number: "0000",
    photo: "../../assets/img/members/blank.webp",
    content: ["第一段內容。", "第二段內容。"]
  },
  program: {
    firstHalf: [{
      no: 1,
      titles: [
        { lang: "zh-Hant", text: "中文曲名" },
        { lang: "en", text: "English Title" }
      ],
      composer: ["中文姓名", "Romanized Name"],
      arranger: "編曲者",
      note: ["曲目解說第一段。"]
    }],
    secondHalf: []
  },
  leadership: {
    conductors: [{
      name: "姓名",
      number: "0000",
      role: "指揮",
      photo: "../../assets/img/members/blank.webp",
      officialLink: "../../people/0000.html",
      bio: {
        career: "學經歷與專業背景。",
        concert: "與本次演出的關聯及詳細介紹。"
      }
    }],
    soloist: [],
    ensembles: []
  },
  roster: [],
  organization: {
    staffTitle: "工作人員",
    staffGroups: [],
    thanksTitle: "特別感謝",
    thanksList: [],
    feedbackUrl: "https://example.com/"
  }
};
