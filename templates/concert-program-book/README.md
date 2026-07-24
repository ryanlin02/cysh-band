# 線上節目冊頁面範本

每一場演出都採「獨立資料、共用介面」：

- 正式入口：`concerts/{year}-{nth}-program/index.html`
- 當屆資料：`concerts/{year}-{nth}-program/data/concert.js`
- 共用樣式：`assets/program-book/program-book.css`
- 共用互動：`assets/program-book/program-book.js`

## 新增步驟

1. 將本目錄的 `index.html` 複製到新的正式入口目錄。
2. 將 `data.example.js` 複製為正式入口內的 `data/concert.js`，完整填入當屆資料。
3. 修改入口頁的 title、description、canonical、Open Graph 與資料檔名稱。
4. 在 `data/concerts.js` 對應屆別加入 `onlineProgramBook: { label, url }`。
5. 重跑聯演頁產生器，並把新網址加入 `sitemap.xml`。
6. 執行 `node scripts/check-site.js`、`node scripts/check-concerts-data.js` 與 `git diff --check`。

入口頁使用 `data-page-type="concert-program-book"`，代表這是行動裝置優先的獨立功能頁，不套用一般官網的八項導覽與 footer；左上角首頁鍵是返回主站的固定出口。資料以 `window.CONCERT_PROGRAM_DATA` 提供，不用 `fetch()` 或 ES module，才能保留 `file://` 雙擊預覽能力。

曲名採有順序的 `titles` 陣列：第一筆是主要顯示名稱，其餘為輔助語言。人物介紹的 `bio` 固定拆成 `career`（學經歷）與 `concert`（本次演出）兩段。
