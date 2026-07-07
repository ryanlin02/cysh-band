# AGENTS.md

本文件給後續協助維護本資料夾的 AI agent 與人工協作者使用。  
這個 repo 是「嘉義高中管樂隊暨校友管樂團」官方網站的完整資料，目前以 GitHub Pages 部署在 `https://cysh.band/`。網站仍在快速成長中，但已同時承載宣傳、校史、校友名錄、人物誌、歷屆聯演、影像典藏與資料治理功能。修改前請先理解它不是一次性的活動頁，而是長期累積的公共記憶庫。

## 1. 專案使命

- 近期任務：支援 2026 年 8 月 8 日於嘉義市政府文化局音樂廳舉辦的第 41 屆校友暨在校生聯合音樂會《為伍》宣傳與資訊整理。
- 長期任務：補回嘉義高中管樂社、管樂隊、校友管樂團多年來散落、缺漏、未整理的歷史資料，讓校友、在校生與外部讀者都能查到可信的脈絡。
- 維護態度：資料不足時要保守標註，不要把推測寫成定論；寧可留下「待考」，也不要用漂亮文案掩蓋不確定性。

## 2. 開工前必讀順序

每次接手較大的修改，先依任務讀相關文件：

1. `README.md`：日常維護快速指南與目前網站結構。
2. `文件總覽與AI協作流程.md`：根目錄 Markdown 文件地圖、權威順序與任務讀取路徑。
3. `網站製作規範.md`：設計系統、資料流程、內容禁忌、上線檢查。若與其他文件衝突，技術與製作規則以此為準。
4. `網站修改歷程紀錄.md`：理解最近修改、目前階段與已驗證事項。任何實質修改通常都要追加紀錄。
5. `嘉義高中管樂隊暨校友管樂團完整資訊整理.md`：內容知識庫，寫歷史、人物、聯演文案前務必查。
6. `校友資料管理與驗證流程.md`：涉及校友名錄、內部資料、個資與公開同意時必讀。
7. `人物頁模板化規格與檢查清單.md`：新增或修改人物頁時必讀。
8. `網站結構優化建議報告書.md`：做架構、資料化、模板化、導覽擴張時參考。

不要只看單一頁面就開始改。這個網站目前有許多「來源檔產生正式頁」的流程，直接手改輸出檔很容易被下一次產生覆蓋。

## 3. 技術架構與部署限制

- 純靜態網站：HTML、CSS、原生 JavaScript，無框架、無後端、無建置服務。
- 部署：GitHub Pages，提交到 repo 後由 GitHub Pages 提供靜態檔案。
- 必須支援本機雙擊 `file://` 預覽，因此資料檔維持 `.js` 掛在 `window`，不要改成需要 `fetch()` 的 JSON 載入。
- 不要擅自導入 React、Vue、Astro、Eleventy、打包器、npm 依賴或後端服務。若真的需要架構升級，先提出分階段方案並更新相關規範。
- 主要驗證指令：

```bash
node scripts/check-site.js
node scripts/check-concerts-data.js
git diff --check
```

## 4. 目前資料量概況

截至 2026-07-07，本 repo 主要資料約為：

- `data/alumni.js`：514 筆公開校友名錄資料。
- `data/news.js`：5 筆最新消息。
- `data/concerts.js`：26 筆歷屆聯演資料。
- `data/people-profiles.js`：32 個人物個人頁 metadata，4 個人物誌分區，31 張人物誌卡片。

數字會持續變動；若你需要精準狀態，請用 Node 重新讀取資料檔，不要照抄本節。

## 5. 重要來源與產物

### 5.1 人物頁

- 正文來源：`content/people/*.html`
- metadata：`data/people-profiles.js`
- 正式輸出：`people/*.html`
- 產生指令：

```bash
node scripts/generate-people-pages.js
```

人物頁輸出檔不要直接手改。改正文請動 `content/people/`，改標題、SEO、頁首資料、相關連結、資料來源請動 `data/people-profiles.js`，再重跑產生器。

### 5.2 人物誌首頁

- 單一資料來源：`data/people-profiles.js` 的 `PEOPLE_FEATURED_SECTIONS`
- 正式輸出：`people.html`
- 產生指令：

```bash
node scripts/generate-people-index.js
```

不要直接在 `people.html` 手改人物誌卡片。每個分區內排序依實際入學民國年由前輩到後輩，民國 100 年後的編號不能用字串大小排序。

### 5.3 最新消息

- 正文來源：`content/news/*.html`
- metadata 與文章清單：`scripts/generate-news-pages.js` 的 `articles` 陣列、`data/news.js`
- 正式輸出：`news/*.html`
- 產生指令：

```bash
node scripts/generate-news-pages.js
```

新增消息時通常要同步：

- `content/news/YYYY-MM-DD-topic.html`
- `scripts/generate-news-pages.js`
- `data/news.js`，新消息放陣列最前面
- `sitemap.xml`
- `feed.xml`
- `網站修改歷程紀錄.md`

### 5.4 校友聯演

- 主要資料：`data/concerts.js`
- 聯演總覽輸出：`concerts.html`
- 獨立頁：`concerts/*.html`
- 相關指令：

```bash
node scripts/check-concerts-data.js
node scripts/generate-concerts-index.js
node scripts/generate-concert-pages.js
```

注意：部分屆別頁是人工整理頁，部分可由產生器更新。`scripts/generate-concert-pages.js` 的原則是既有人工頁不覆寫，只有缺頁或已標記為產生器輸出的頁面會更新。修改聯演資料後請檢查 `concerts.html`、獨立頁、人物頁「相關校友聯演」是否同步。

### 5.5 校友名錄

- 資料來源：`data/alumni.js`
- 頁面：`roster.html`
- 互動：`js/roster.js`

`data/alumni.js` 是公開名錄，不是內部通訊錄。只放可公開的姓名、編號、入學年、聲部、公開經歷、照片與個人頁連結。不要加入電話、email、地址、LINE、私人社群帳號或內部備註。

### 5.6 編號查詢

- 資料來源：`data/number-lookup.js`
- 頁面：`numbers.html`
- 互動：`js/number-lookup.js`

`data/number-lookup.js` 是編號小遊戲資料，不等於已驗證公開名錄。不要自動把它整批併入 `data/alumni.js`。若用它補聲部或姓名，需先產生候選、人工確認，再分批寫入。

## 6. 固定內容規則與禁忌

所有文案必須遵守：

- 正式稱謂：
  - 在校生社團：嘉義高中管樂社
  - 歷史稱呼：嘉義高中管樂隊
  - 校友組織：嘉義高中校友管樂團
  - 合稱：嘉義高中管樂隊暨校友管樂團
- 編號取得時機：高一升高二幹部交接時才取得，不是入隊第一天。
- 字頭定義：字頭是編號第二碼，不是第一碼，也不是民國年代。
- 聲部代碼：4 是法國號，5 是小號，不要寫反。
- 2026《為伍》不是首次在文化局音樂廳演出，正確寫法是「睽違六年重返嘉義市政府文化局音樂廳」。
- 2026《為伍》不是首次售票，2015、2018、2020 皆有售票紀錄；可寫「透過 OPENTIX 售票」，不可寫「首次公開售票」。
- 2021 年因疫情停辦聯演，不要寫成有舉辦屆別。
- 籌備中資訊，例如票價、曲目、演出人員，必須加「實際以正式公告為準」或等價提醒。
- 推算、待考、本人自述、公開資料、已明載要分清楚，不要把舊年度資料寫成現況。

## 7. 個資與授權界線

可公開：

- 編號、姓名、入學年、聲部。
- 本人同意公開的照片、故事與資料。
- 已公開的職稱、演出、比賽、任教、活動紀錄。
- 節目冊、海報、官方網站、公開報導與公開影片中的資料。

不可公開：

- 電話、email、地址、LINE、私人社群帳號。
- 內部 Excel 名冊、通訊錄、表單原檔或截圖。
- 未確認同意的私人照片、家庭細節、未成年家屬姓名。
- 來源不明、可能涉及個資或授權疑慮的資料。

內部 Excel 或舊名冊只能作為 repo 外參考來源。若要把其中資訊寫入網站，只能取非聯絡欄位，並需再判斷正確性與公開性。

## 8. 視覺與互動規則

- 全站色彩、版面、圓角、陰影、動畫 token 以 `css/style.css` 的 `:root` 為準，不要在新元件中隨意硬寫新色碼或新設計語言。
- 新內容優先沿用既有 class，如 `.section`、`.card`、`.cards`、`.concert-item`、`.news-list`、`.gallery-grid`、`.btn`、`.filter-bar`、`.table-scroll > table.plain`。
- 卡片語言主要保留給人物資訊與大量人物索引（人物誌、校友名錄）；最新消息使用文章索引設計，歷屆聯演使用典藏列表設計，不要再做成卡片牆。
- 當屆演出可保留主視覺大卡，但卡片內不得再塞小卡、表格感欄位、過多框線或膠囊標籤；資訊層級應靠標題、meta、段落與細分隔線完成。
- 最新消息在首頁、校友聯演頁與消息總覽頁共用 `.news-list`／`.news-item` 設計：圖片與標題為主，日期只是小型 meta，不建立大日期欄。
- 歷屆聯演列表由 `data/concerts.js` 與 `scripts/generate-concerts-index.js` 產生。不要直接手改 `concerts.html` 的 GENERATED 區塊；如需改呈現語言，改資料、產生器或 CSS 後重跑腳本。
- 歷屆聯演列表頁的海報可作為裁切、淡化後的右側背景視覺，不必強求整張完整露出；單一屆別介紹頁則必須完整呈現文宣海報，不可裁切掉文字或設計資訊。
- 歷屆聯演列表頁的右側背景海報應由右側清楚、往左側自然淡出，左側不得出現明顯圖片邊緣；優先用 CSS `mask-image` 讓圖片本體淡出，再用覆蓋層保護文字可讀性。
- 屆別介紹頁的曲目用 `.concert-program-list` 分隔線清單，不用卡片；每首曲目可依該場節目冊填入中外文標題、作曲／編曲資訊與專屬解說，不可用通用曲庫文字覆蓋節目冊版本。
- 屆別介紹頁的指揮與獨奏者用 `.concert-people-list .person-byline` 文章列，不用人物卡片；若 `data/concerts.js` 的人物物件有 `concertBio`／`concertRole`，必須優先使用該場次版本。人物照片與姓名都要連到個人介紹頁；資料不足時才退回人物誌摘要或待補文字。
- 手寫屆別頁轉為資料驅動前，必須比對原頁，不得刪除已整理的演出人員名冊、幕後行政團隊、職掌、贊助致謝、照片序列、資料來源或節目冊註記。`data/concerts.js` 可用 `performerGroups`、`adminRows`、`sponsorParagraphs`、`photos`、`sourceNote` 等欄位保留原始史料。
- 除 `concerts/2019-35th.html` 第 35 屆《正八音》外，屆別介紹頁應由 `scripts/generate-concert-pages.js` 依 `data/concerts.js` 產生。2019 因雙場次、不同場地與演出人員差異保留手寫 HTML，產生器會跳過。
- 導覽維持 8 項扁平架構：首頁、關於樂團、九十五年、編號、人物誌、校友名錄、校友聯演、影像館。新增第一層導覽前需重新評估架構。
- 行動版需檢查 375px、768px、1080px。新增或修改互動元件時，確認漢堡選單、篩選面板、表格橫向捲動、lightbox 不破版。
- 表格在手機版仍維持桌機欄位比例，靠 `.table-scroll` 橫向捲動；不要改成堆疊卡片。
- 圖片以 WebP 為主。成員照片正方形 480x480；直式原圖以臉部偏上裁切，避免切頭。

## 9. 每類任務的基本流程

### 9.1 新增或更新校友

1. 確認資料可公開且來源可信。
2. 更新 `data/alumni.js`，`desc` 保持短摘要。
3. 若有足夠資料，再新增或更新人物頁來源與 metadata。
4. 若具代表性，再加入 `PEOPLE_FEATURED_SECTIONS`。
5. 重跑相關產生器。
6. 更新 `sitemap.xml`，必要時更新全站姓名連結。
7. 更新 `網站修改歷程紀錄.md`。
8. 執行檢查。

### 9.2 新增人物頁

1. 新增 `content/people/{id}.html`。
2. 在 `data/people-profiles.js` 新增 `PEOPLE_PROFILES` metadata。
3. 在 `data/alumni.js` 填 `link`。
4. 視策展需求加入 `PEOPLE_FEATURED_SECTIONS`。
5. 執行：

```bash
node scripts/generate-people-pages.js
node scripts/generate-people-index.js
node scripts/check-site.js
```

6. 更新 `sitemap.xml` 與修改歷程。

### 9.3 新增最新消息

1. 新增 `content/news/*.html` 正文。
2. 更新 `scripts/generate-news-pages.js` 的 `articles`。
3. 更新 `data/news.js`。
4. 執行 `node scripts/generate-news-pages.js`。
5. 更新 `sitemap.xml` 與 `feed.xml`。
6. 執行 `node scripts/check-site.js`。
7. 更新修改歷程。

### 9.4 更新聯演資料

1. 優先更新 `data/concerts.js`。
2. 一般屆別頁重跑產生器；若要把舊人工頁改為資料驅動頁，使用 `node scripts/generate-concert-pages.js --overwrite-manual`。目前唯一保留人工頁的例外是 `concerts/2019-35th.html`。
3. 執行：

```bash
node scripts/check-concerts-data.js
node scripts/generate-concerts-index.js
node scripts/generate-concert-pages.js
node scripts/check-site.js
```

4. 檢查屆數、年份、場地、票務、資料狀態與禁忌文案。
5. 更新修改歷程。

### 9.5 新增相簿

- 相簿總覽：`gallery.html`
- 相簿頁：`gallery/{activity}.html`
- 圖片：`assets/img/gallery/{year-or-activity}/`
- 原則：精選上網、全量外部；一張照片全站只存一份，消息與相簿互相引用，不複製檔案。
- 相簿封面圖加 `class="album-cover"`，避免被 lightbox 攔截。
- 新相簿頁要更新 `sitemap.xml` 與修改歷程。

## 10. SEO、RSS 與網站索引

新增公開頁面時，通常要同步：

- `sitemap.xml`
- `feed.xml`，僅最新消息需要新增 RSS item
- canonical、OG、Twitter meta
- `llms.txt`，若重大內容或網站結構改變
- 結構化資料，尤其首頁 MusicEvent 與人物頁 Person JSON-LD

`scripts/check-site.js` 已檢查不少 SEO 與同步問題，但它不能取代人工判斷。

## 11. 修改歷程是必要工作

任何實質修改原則上都要在 `網站修改歷程紀錄.md` 新增一筆，尤其是：

- 公開頁面、資料檔、人物資料、聯演資料、消息、相簿、圖片。
- CSS、JavaScript、互動、響應式規則。
- SEO、sitemap、feed、結構化資料。
- 規範、README、維護文件或 AI 協作流程。
- 史實、稱謂、屆數、售票、音樂廳、個資或授權問題。

紀錄需包含修改者、原因、檔案、摘要、影響範圍、驗證方式與後續待辦。

## 12. 完成前檢查

送出前至少做：

```bash
node scripts/check-site.js
node scripts/check-concerts-data.js
git diff --check
```

若修改範圍只涉及文件，`check-concerts-data.js` 可視情況省略，但若碰到 `data/concerts.js`、`concerts.html`、`concerts/*.html`、人物頁相關聯演，就必跑。

若修改公開頁面或 CSS/JS，還應用本機瀏覽器檢查桌機與手機寬度。若無法跑瀏覽器或無法驗證，最後回覆要明講。

## 13. 與使用者協作的語氣

使用者是第一次用 AI 工具建立網站，網站也仍在第三天左右的快速成長期。回覆與修改時請保持清楚、保守、可追蹤：

- 先說明你理解的資料來源與風險，再改。
- 不確定時標註待確認，不要自行腦補。
- 若架構可能改變，優先小步調整並保留舊資料可回溯。
- 把「目前可確認」與「未來可補」分開。
- 不要把歷史資料整理成過度華麗、不可查證的宣傳語。

這個網站的價值不只在漂亮，而在於把多年散落的記憶慢慢整理成可信、可延續、能讓下一代接住的資料。
