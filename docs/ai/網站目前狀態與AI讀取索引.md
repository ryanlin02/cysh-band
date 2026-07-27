# 網站目前狀態與 AI 讀取索引

更新時間：2026-07-28
用途：讓後續 AI 以最少讀取量掌握網站現況、權威來源與任務路徑。這是開工索引，不取代實際程式、正式規範或專題文件。

## 1. 開工時只先讀這些

1. 根目錄 `AGENTS.md`。
2. 本文件。
3. 依任務類型讀下方指定的專題文件或程式來源。

不要在一般任務開始時完整讀取：

- `網站修改歷程紀錄.md`
- `docs/history/`
- `docs/archive/`
- `_generated/`
- 整份 `網站製作規範.md`
- 整份 `嘉義高中管樂隊暨校友管樂團完整資訊整理.md`

需要規則或舊脈絡時，先用 `rg` 搜尋關鍵字，再讀命中的小段落。若文字文件與實際程式衝突，以實際程式、資料與當次檢查結果為準。

## 2. 目前網站基準

本站是純靜態 GitHub Pages 網站，正式網域為 `https://cysh.band/`。使用 HTML、CSS、原生 JavaScript、結構化資料檔與 Node 產生器，不使用前端框架或後端。

截至本文件更新時，`node scripts/check-site.js` 的基準為：

- JavaScript 語法檢查：33 個檔案。
- HTML 本機引用檢查：118 個檔案。
- 公開 HTML 品質檢查：114 個檔案。
- sitemap：111 個 URL。
- 最新消息：20 筆。
- 校友聯演：40 筆。
- 人物資料：37 筆，人物誌精選卡片 34 張。
- 校友公開名錄：518 筆。
- 全站檢查結果：0 warning。

以上數量會變動。需要精確現況時重新執行檢查，不要把本段數字當成永久規則。

目前第一層導覽維持 8 項：

`最新消息｜關於｜傳承｜編號｜人物誌｜校友聯演｜名錄｜影像館`

網站名稱「嘉中管樂」另作首頁入口。

## 3. 公開與登入界線

- `roster.html` 校友名錄可直接開啟，但保留 `noindex, nofollow, noarchive`，不列入 sitemap／llms。
- `/photos/` 影像館由 Cloudflare Access 保護，使用社員 Email 白名單與一次性驗證碼。
- 首頁、最新消息、關於、傳承、編號、人物誌、校友聯演、名錄與公開精選相簿維持公開。
- GitHub Pages repo 是公開空間，不得加入 Email 白名單來源、內部名冊、電話、地址、LINE、私人帳號或未核准個資。

涉及上述界線時，讀：

- `Cloudflare名錄與影像館登入維護指引.md`
- `校友資料管理與驗證流程.md`

## 4. 權威來源與產物

| 任務 | 優先修改 | 產物／驗證 |
|---|---|---|
| 最新消息 | `content/news/`、`data/news.js`、`scripts/generate-news-pages.js` | `news/*.html`、`news/index.html`、`feed.xml`、`sitemap.xml` 的消息區段 |
| 人物頁 | `content/people/`、`data/people-profiles.js`、`data/alumni.js` | `people/*.html` |
| 人物誌首頁 | `data/people-profiles.js` 的 `PEOPLE_FEATURED_SECTIONS` | `people.html` |
| 主內容頁 | `content/pages/`、共用模板與產生器 | 根目錄正式 HTML |
| 校友聯演 | `data/concerts.js`、`scripts/generate-concert-pages.js`、`scripts/generate-concerts-index.js` | `concerts.html`、`concerts/*.html` |
| 線上節目冊 | 各屆 `concerts/*-program/` 資料、`assets/program-book/` 共用介面 | 獨立節目冊頁 |
| 共用導覽／footer | `templates/partials/` | `node scripts/sync-shared-chrome.js` |
| 影像館人物連結 | 人物資料與產生器 | `photos/profile-links.js` |

不要把產生後的 HTML 當成唯一修改來源。若不確定某頁是否由產生器管理，先查 `AGENTS.md`、README 或對應產生器。

最新消息正式頁目前由產生器統一輸出摘要、發布／最後更新日期、代表圖、`NewsArticle` JSON-LD 與圖片載入屬性；文章 metadata 或圖片異動後必須重跑產生器。

## 5. 任務型讀取路徑

### 一般小型 UI、CSS 或 JavaScript 修改

- 讀 `網站製作規範.md` 中與視覺、互動、響應式相關的段落。
- 查看實際元件的 HTML、CSS、JavaScript。
- 不需要讀完整資訊整理、歷史紀錄或封存報告。

### 最新消息

- `最新消息發布完整教學.md`
- README 的最新消息段落
- `data/news.js` 與 `scripts/generate-news-pages.js`

### 人物、校友名錄與個資

- `人物頁模板化規格與檢查清單.md`
- `人物頁與影像館串接維護流程.md`
- `校友資料管理與驗證流程.md`
- 只在需要史實時搜尋完整資訊整理

### 校友聯演與線上節目冊

- `data/concerts.js`
- `scripts/generate-concert-pages.js`
- `assets/program-book/`
- 只搜尋完整資訊整理中的相關年份或屆次

### Cloudflare、登入與發布

- `Cloudflare名錄與影像館登入維護指引.md`
- `Cloudflare網站維護頁啟用與復原指引.md`
- `GitHub Desktop網站更新發布流程.md`

### 長期架構或舊決策調查

- 先讀本文件與目前程式。
- 再按關鍵字查 `docs/archive/` 的原始策略報告。
- 查特定修改日期或功能時，使用 `rg` 搜尋 `網站修改歷程紀錄.md` 與 `docs/history/`，不要整份載入。

## 6. 固定內容與製作底線

- 在校生社團：嘉義高中管樂社。
- 歷史稱呼：嘉義高中管樂隊。
- 校友組織：嘉義高中校友管樂團。
- 合稱：嘉義高中管樂隊暨校友管樂團。
- 編號在高一升高二幹部交接時取得；字頭是編號第二碼。
- 聲部代碼 4 是法國號、5 是小號。
- 2026《為伍》可寫「睽違六年重返嘉義市政府文化局音樂廳」，不可寫成首次在該場館演出。
- 2026《為伍》不是首次售票。
- 不擅自導入 React、Vue、Astro、CMS、後端或打包器。
- 行動裝置互動目標至少 44px，公開頁面需保留可縮放 viewport、鍵盤操作與可讀對比。

涉及正式文案、史實或更多禁忌時，搜尋 `網站製作規範.md` 與 `嘉義高中管樂隊暨校友管樂團完整資訊整理.md` 的相關段落。

## 7. 完成前檢查

一般公開網站修改至少執行：

```bash
node scripts/check-site.js
node scripts/check-concerts-data.js
git diff --check
```

依修改內容補跑相關產生器、`node --check` 與實際手機／桌面瀏覽器檢查。

修改歷程仍需記錄，但只在根目錄 `網站修改歷程紀錄.md` 最上方新增近期紀錄；較早內容存放於 `docs/history/`。
