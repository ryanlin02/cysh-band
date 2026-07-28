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

  // 人物頭像快取版本。修復或大量更新頭像後遞增，避免沿用舊的404快取。
  avatarVersion: "20260728.1",

  // 穩定 bootstrap 放在 R2；每次完整更新會先上傳新版本資料，
  // 最後才切換此檔。程式檔仍由同網域提供，讓 Web Worker 維持同源。
  runtimeBootstrap: "https://img.cysh.band/runtime/bootstrap.json",
  runtimeBase: "./runtime",
};
