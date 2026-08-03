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
    name: "姓名",
    role: "團長",
    author: "姓名",
    subtitle: "團長",
    number: "0000",
    photo: "../../assets/img/members/blank.webp",
    photoAlt: "人物照片的說明文字",
    photoWidth: 1200,
    photoHeight: 800,
    photoPosition: "center",
    officialLink: "../../people/0000.html",
    content: ["第一段內容。", "第二段內容。"]
  },
  program: {
    heroImage: {
      src: "assets/images/program-notes-hero.webp",
      alt: "曲目解說主視覺的說明文字",
      width: 1200,
      height: 800
    },
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
      photoAlt: "人物照片的說明文字",
      photoWidth: 1200,
      photoHeight: 800,
      photoPosition: "center",
      officialLink: "../../people/0000.html",
      bio: "僅供本場音樂會節目冊使用的完整人物介紹文章，內容可整合必要學經歷、專業特色、與本次演出的關聯及詮釋重點。"
    }],
    soloist: [],
    ensembles: [{
      title: "演出團隊名稱",
      subtitle: "Ensemble Name",
      photo: "assets/images/ensemble.webp",
      photoAlt: "演出團隊照片的說明文字",
      photoWidth: 1200,
      photoHeight: 800,
      content: ["團隊介紹。"],
      officialLink: "https://example.com/"
    }]
  },
  roster: [],
  organization: {
    heroImage: {
      src: "assets/images/thanks-hero.webp",
      alt: "感謝與社群主視覺的說明文字",
      width: 1200,
      height: 800
    },
    staffTitle: "工作人員",
    staffGroups: [],
    thanksTitle: "特別感謝",
    thanksList: [],
    feedbackUrl: "https://example.com/"
  }
};
