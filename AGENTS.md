# AGENTS.md

本文件是 AI 與人工協作者維護 `cysh-band` 的入口。本站是「嘉義高中管樂隊暨校友管樂團」官方網站，也是持續累積的公共記憶庫；修改時要保留可追溯性，資料不足就標示待考，不把推測寫成定論。

## 1. 低 Token 開工方式

一般任務開始時只先讀：

1. 本文件。
2. `docs/ai/網站目前狀態與AI讀取索引.md`。
3. 依任務類型再讀必要的程式、資料或專題文件。

不要預設完整讀取下列大型或歷史資料：

- `網站修改歷程紀錄.md`
- `docs/history/`
- `docs/archive/`
- `_generated/`
- 整份 `網站製作規範.md`
- 整份 `嘉義高中管樂隊暨校友管樂團完整資訊整理.md`

需要規則、史實或舊決策時，先用 `rg` 搜尋關鍵字，再讀命中段落。文件與現行程式衝突時，以實際來源檔、產生器與當次檢查結果為準。

文件地圖與權威順序見 `文件總覽與AI協作流程.md`；不要為了「先理解全部」而載入所有報告。

## 2. 技術與部署底線

- 純靜態 GitHub Pages：HTML、CSS、原生 JavaScript、Node 產生器，正式網址為 `https://cysh.band/`。
- 必須支援本機 `file://` 預覽；資料檔維持 `.js` 掛在 `window`，不要擅自改成依賴 `fetch()` 的 JSON。
- 未經討論不要導入 React、Vue、Astro、CMS、後端、打包器或新的 npm 依賴。
- 優先修改資料、正文來源、模板或產生器，不要只手改下一次會被覆蓋的輸出 HTML。
- 工作區可能已有使用者修改；只處理本次範圍，不回復無關變更。

## 3. 權威來源與產物

| 類型 | 優先修改 | 產物／指令 |
|---|---|---|
| 最新消息 | `content/news/`、`data/news.js`、`scripts/generate-news-pages.js` | `news/*.html`、`news/index.html`、`feed.xml` |
| 人物頁 | `content/people/`、`data/people-profiles.js`、`data/alumni.js` | `node scripts/generate-people-pages.js` |
| 人物誌首頁 | `data/people-profiles.js` 的 `PEOPLE_FEATURED_SECTIONS` | `node scripts/generate-people-index.js` |
| 主內容頁 | `content/pages/`、對應模板／產生器 | 根目錄正式 HTML |
| 校友聯演 | `data/concerts.js`、聯演產生器 | `concerts.html`、`concerts/*.html` |
| 線上節目冊 | `concerts/{year}-{nth}-program/` 的資料、`assets/program-book/` | 各屆獨立節目冊頁 |
| 共用 nav/footer | `templates/partials/` | `node scripts/sync-shared-chrome.js` |
| 影像館人物連結 | 人物資料與產生器 | `photos/profile-links.js` |

重要例外與同步規則：

- `concerts/2019-35th.html` 因雙場次差異保留手寫；其他屆別頁原則上由 `scripts/generate-concert-pages.js` 依 `data/concerts.js` 產生。
- 線上節目冊可用 `data-page-shell="standalone"`，但必須同時標記 `data-page-type="concert-program-book"`，並保留首頁出口、分享／夜間模式、五項底部導覽、可縮放 viewport 與 `window.CONCERT_PROGRAM_DATA`。
- 不為單一屆節目冊複製共用 CSS／JS。
- 新增公開頁通常要同步 `sitemap.xml`、canonical、OG、Twitter meta；最新消息另同步 `feed.xml`。

## 4. 任務型必讀

- UI、CSS、JavaScript：只搜尋 `網站製作規範.md` 的相關視覺、互動、響應式章節，再查看實際元件。
- 最新消息：`最新消息發布完整教學.md`、README 對應段落、新聞來源與產生器。
- 人物頁：`人物頁模板化規格與檢查清單.md`；涉及影像館時再讀 `人物頁與影像館串接維護流程.md`。
- 校友、名錄、個資：`校友資料管理與驗證流程.md`。
- 聯演、線上節目冊：`data/concerts.js`、對應產生器與 `assets/program-book/`；只按年份或屆次搜尋內容知識庫。
- Cloudflare／登入：`Cloudflare名錄與影像館登入維護指引.md`。
- 維護頁：`Cloudflare網站維護頁啟用與復原指引.md`。
- 發布：`GitHub Desktop網站更新發布流程.md`。
- 舊架構決策：確認現行程式後，才按關鍵字搜尋 `docs/archive/`。

## 5. 公開、個資與登入界線

- `roster.html` 校友名錄公開可讀，但保留 `noindex, nofollow, noarchive`，不列入 sitemap／llms。
- Cloudflare Access 只保護 `cysh.band/photos/*`；不得擴大到整個 `cysh.band/*`。
- 首頁、消息、關於、傳承、編號、人物誌、校友聯演、名錄與公開精選相簿維持公開。
- `data/alumni.js` 是公開名錄，不是內部通訊錄。
- 可公開：經確認的編號、姓名、入學年、聲部、公開經歷，以及本人同意或既已公開且適合再利用的內容。
- 不可放入 repo：Email 白名單來源、內部 Excel／名冊、電話、地址、LINE、私人帳號、未確認同意的私人照片或家庭資料。
- `data/number-lookup.js` 不等於已驗證名錄，不可未經人工確認就整批併入 `data/alumni.js`。

## 6. 固定史實與文案規則

- 在校生社團：嘉義高中管樂社。
- 歷史稱呼：嘉義高中管樂隊。
- 校友組織：嘉義高中校友管樂團。
- 合稱：嘉義高中管樂隊暨校友管樂團。
- 編號在高一升高二幹部交接時取得，不是入隊第一天。
- 字頭是編號第二碼；聲部代碼 4 是法國號、5 是小號。
- 2021 年因疫情停辦聯演。
- 2026《為伍》可寫「睽違六年重返嘉義市政府文化局音樂廳」，不可寫成首次在該場館演出。
- 2026《為伍》不是首次售票；2015、2018、2020 已有售票紀錄。
- 籌備中資料需註明「實際以正式公告為準」或等價提醒。
- 推算、待考、本人自述、公開資料與正式明載必須區分。

需要更完整內容時，只搜尋 `嘉義高中管樂隊暨校友管樂團完整資訊整理.md` 的相關關鍵字。

## 7. 視覺與行動版原則

- 沿用 `css/style.css` 的 token 與既有元件，不另造設計語言。
- 第一層導覽維持 8 項：最新消息、關於、傳承、編號、人物誌、校友聯演、名錄、影像館；「嘉中管樂」另作首頁入口。
- 新增第一層導覽前先評估資訊架構。
- 網站主要由手機閱讀；互動目標至少 44px，保留可縮放 viewport、鍵盤操作、清楚焦點與可讀對比。
- 修改公開 UI 至少檢查 375px，必要時再檢查 768px、1080px。
- 表格在手機維持欄位比例，使用 `.table-scroll` 橫向捲動，不改成堆疊卡片。
- 圖片以 WebP 為主；人物照 480×480，裁切避免切頭。
- 修改 nav/footer 時要同步 `templates/partials/` 並執行共用區塊同步；社群圖示保留 `aria-label` 與 44px 點擊區。

## 8. 修改與驗證流程

1. 先用 `rg`、`rg --files` 確認來源、產物與引用。
2. 只讀本次任務需要的文件段落。
3. 修改來源檔；需要時執行對應產生器。
4. 檢查差異只包含預期檔案，不覆蓋無關修改。
5. 在根目錄 `網站修改歷程紀錄.md` 最上方追加近期紀錄；不要修改 `docs/history/` 的舊紀錄。
6. 依範圍驗證。

一般公開網站修改至少執行：

```bash
node scripts/check-site.js
node scripts/check-concerts-data.js
git diff --check
```

若只改文件，仍需執行 `git diff --check`，並宜跑 `node scripts/check-site.js` 證明網站未受影響。修改 JavaScript 要補 `node --check`；修改 UI 要用實際手機寬度檢查。未能完成的驗證要在回覆中明說。

## 9. 紀錄與協作原則

- 實質修改需記錄原因、檔案、摘要、影響範圍、驗證與後續待辦。
- 根目錄修改歷程只保留近期內容；舊紀錄在 `docs/history/`，一般任務不要整份讀。
- 歷史健康檢查與初期架構報告在 `docs/archive/`，只用於追查舊決策，不代表目前狀態。
- 不確定時明確標示，區分「目前可確認」與「未來可補」。
- 架構變更採小步、可回溯方式；未經使用者同意不刪除歷史資料。
