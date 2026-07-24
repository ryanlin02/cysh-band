// ============================================================
// 照片集網站設定檔（正式上線版）
// 此頁面的照片與索引資料存放於 Cloudflare R2（img.cysh.band），
// 不在 GitHub repo 內。詳見 07-照片網站/使用說明.md。
// ============================================================
window.SITE_CONFIG = {
  // 網站標題
  title: "影像館｜嘉義高中管樂隊暨校友管樂團",

  // 索引資料（site-index.json / people.json / avatars）所在位置
  dataBase: "https://img.cysh.band/data",

  // 縮圖與大圖所在位置（其下有 thumb/ 與 large/ 兩個資料夾）
  imageBase: "https://img.cysh.band",

  // 圖檔副檔名（R2 上為 WebP）
  imageExt: ".webp",

  // 版本化搜尋與瀏覽 runtime。程式檔放在同網域，資料檔由
  // bootstrap 指向 Cloudflare R2，讓 Web Worker 維持同源。
  runtimeBase: "./runtime",
};
