# 嘉義高中管樂隊官方網站

樂團形象網站，於《為伍》2026 第 41 屆校友暨在校生聯合音樂會前上線。

> 本文件是日常維護的快速操作指南；完整的設計系統、圖片規格、內容準則與檢查清單見 **`網站製作規範.md`**。
> 根目錄 Markdown 文件的角色分工、權威順序與 AI 協作讀取路徑，見 **`文件總覽與AI協作流程.md`**。
> 校友名錄、編號查詢、人物頁與內部名冊之間的資料分工，見 **`校友資料管理與驗證流程.md`**。
> 人物個人頁的模板化方向、標準區塊與後續檢查規劃，見 **`人物頁模板化規格與檢查清單.md`**。

## 網站結構

| 檔案／目錄 | 內容 |
|------|------|
| index.html | 首頁（雙向敘事樞紐＋《為伍》購票＋最新消息） |
| about.html | 關於樂團 |
| history.html | 九十五年（歷史時間軸） |
| numbers.html | 編號文化 |
| people.html | 人物誌（精選故事，由 `data/people-profiles.js` 產生卡片） |
| roster.html | 校友名錄（`data/alumni.js` 驅動，搜尋＋卡片／列表檢視＋字頭／年代分組＋聲部／資料狀態篩選） |
| concerts.html | 校友聯演（最新消息＋本屆演出＋歷屆紀錄） |
| gallery.html | 影像館（活動相簿制，點擊放大） |
| news/ | 最新消息正式文章頁（目前由 `content/news/` 與 `scripts/generate-news-pages.js` 產生） |
| content/news/ | 最新消息正文來源檔 |
| content/people/ | 人物個人頁正文來源檔（32 個人物頁皆已模板化） |
| data/alumni.js | 校友名錄資料檔 |
| data/people-profiles.js | 已模板化人物個人頁 metadata（32 個人物頁皆已納入） |
| data/news.js | 最新消息資料檔 |
| data/number-lookup.js | 編號查詢小遊戲資料檔（非完整公開名錄） |
| 校友資料管理與驗證流程.md | 公開名錄、查號資料、個人頁與內部 Excel 名冊的管理流程 |
| 人物頁模板化規格與檢查清單.md | 人物個人頁模板化、資料來源、相關聯演與健康檢查規劃 |
| templates/ | 共用模板試作（head、導覽列、頁尾與基礎版型；暫不直接替換正式頁面） |
| _generated/ | 腳本產生的本地預覽／比對檔，不列入 sitemap |
| js/、css/ | 互動腳本與全站樣式 |
| assets/img/members/ | 成員大頭照（正方形 WebP） |

## 日常維護

### 新增校友（最常用）
1. 照片裁成正方形 WebP（480×480、品質 80），檔名用編號（如 `8501.webp`），放入 `assets/img/members/`。直式原圖以「臉部」為中心裁切（臉約在方形偏上 40%），不要單純置中，以免切到頭。沒照片先用 `blank`
2. 在 `data/alumni.js` 加一筆（欄位說明在檔案開頭），排序程式會自動處理

### 發布最新消息
目前最新消息文章已改為模板化流程：正文來源放在 `content/news/`，正式 HTML 由以下指令產生：

```
node scripts/generate-news-pages.js
```

新增消息時：
1. 在 `content/news/` 新增 `YYYY-MM-DD-主題.html`，只放文章正文。
2. 在 `scripts/generate-news-pages.js` 的 `articles` 陣列新增該篇標題、摘要、輸出路徑。
3. 在 `data/news.js` 陣列「最前面」加一筆。
4. 執行 `node scripts/generate-news-pages.js`，確認 `news/*.html` 已產生。

首頁自動顯示最新 2 則、校友聯演頁最新 2 則、news/index.html 總覽頁全部列出，皆由 `data/news.js` 自動處理。
`node scripts/check-site.js` 會檢查 `content/news/` 與正式 `news/*.html` 是否同步；若忘記重跑產生腳本，檢查會提醒。

### 新增一屆聯演
音樂會結束後，把 concerts.html「本屆演出」改寫為「歷屆紀錄」的一個 `concert-item`；目前已呈現的校友聯演屆別皆應有獨立資料頁，資料不足者以「資料待考」標示。缺頁可由 `node scripts/generate-concert-pages.js` 依 `data/concerts.js` 產生；既有人工頁不覆寫。生成頁會自動帶入可考海報／影像、指揮與獨奏者人物誌摘要、錄影清單與通用資料補充文字。

`concerts.html` 的歷屆卡片也由 `data/concerts.js` 產生：

```
node scripts/generate-concerts-index.js
```

`node scripts/check-site.js` 會檢查總覽卡片是否同步；若修改 `data/concerts.js` 後忘記重跑，檢查會提醒。

### 新增頁面時同步更新 SEO
新增任何公開頁面（如 news 文章、屆別頁）後，在 `sitemap.xml` 加一行對應的 `<url>`（複製既有行修改網址與日期即可）

### 更新前健康檢查
修改網站後、commit 前，建議執行：

```
node scripts/check-site.js
```

這會檢查 JS 語法、資料檔引用、HTML 本機連結、圖片 alt、SEO 基本欄位、sitemap / feed 對應、Google Fonts URL 標準化、news 產生結果同步，以及人物個人頁基本結構。

### 共用模板試作
目前正式頁面仍是手寫 HTML；為了降低 nav、footer、head 重複維護成本，已先建立共用模板試作。產生預覽頁：

```
node scripts/generate-page-preview.js
```

輸出檔案是 `_generated/page-template-preview.html`。它只供本地檢查模板方向，不會修改首頁、關於、人物誌、校友聯演等正式頁面。

已套用到正式頁面的第一批是目前全部 5 篇最新消息文章；修改 `content/news/` 後需執行 `node scripts/generate-news-pages.js`，再跑 `node scripts/check-site.js`。`news/_template.html` 已改為維護流程說明，不再作為複製範本。

人物頁模板化已涵蓋目前全部 32 個 `people/*.html` 個人頁。正文來源在 `content/people/`，頁面 metadata 在 `data/people-profiles.js`，正式 HTML 由以下指令產生：

```
node scripts/generate-people-pages.js
```

目前所有 `people/*.html` 個人頁皆由此腳本產生。`node scripts/check-site.js` 會檢查已模板化頁是否與來源檔同步。

若想先看模板預覽，可產生單頁人物模板預覽：

```
node scripts/generate-people-profile-preview.js
```

輸出檔案是 `_generated/people-profile-preview.html`，同樣以簡晟軒（8861）為試作對象，僅供本地檢查。

### 新增相簿照片（兩層相簿制）
- **策展原則**：大批照片一律「精選上網、全量放外部」——每本相簿精選 30–50 張，全量放 Google 相簿並在相簿頁尾放連結
- **結構**：gallery.html 是相簿封面牆；每本相簿獨立頁 `gallery/{活動}.html`，照片縮圖（480×360 q75）進網格、`data-full` 指向大圖（長邊 1600 q78）供點擊放大
- 封面卡的圖要加 `class="album-cover"`（避免被 lightbox 攔截，才能連進相簿頁）
- 相簿頁在子資料夾，資源路徑加 `../`；新相簿頁記得加進 sitemap.xml
- 原始檔名若含有意義的註解（拍攝者留言、曲名），優先保留為照片說明
- **相簿封面牆依年份新→舊排列**，「歷史影像」典藏區固定墊底；進行中的相簿標註「持續更新中」
- **照片單一來源**：一張照片全站只存一份，相簿與消息文章互相引用、不複製檔案

### 內容原則
- **編號排序**：凡呈現編號處，一律由前輩排到後輩（入學年早→晚）
- **編號取得時機**：高一入隊時沒有編號，高一升高二幹部交接時才獲得
- **音樂廳說法**：並非首度在文化局音樂廳演出——目前可考或校友確認的音樂廳屆別至少包含 18（2002）、23（2007）、25（2009）、28（2012）、29（2013）、31（2015）、34（2018）、36（2020），寫「睽違六年重返」，勿寫「首度移師」
- **售票說法**：並非首度售票——2015、2018、2020 均已售票（100 元，兩廳院系統／ibon），勿寫「首度公開售票」；可寫「透過 OPENTIX 售票」
- **屆數對照**：2012＝28、2014＝30、2015＝31、2017＝33（推算）、2018＝34（推算）、2020＝36、2021 因疫情停辦、2022＝37、2023＝38、2024＝39、2025＝40、2026＝41
- **人物誌 vs 名錄**：人物誌只放有故事可講的精選校友；名錄收所有人，兩邊重複沒關係，名錄卡用 `link` 欄位連到人物誌

## GitHub Pages 上架

1. https://github.com/new 建立 Public repository（如 `cysh-band`）
2. 上傳本資料夾所有檔案（Add file → Upload files 可拖曳）
3. Settings → Pages → Source 選 Deploy from a branch，Branch 選 `main` / root
4. 1–2 分鐘後網站上線於 `https://<帳號>.github.io/cysh-band/`

## 圖片轉 WebP（macOS）

```
brew install webp     # 安裝一次
cwebp -q 82 -resize 1600 0 原圖.jpg -o 輸出.webp
```

## 待補事項

- [ ] OPENTIX 實際購票連結（index.html、concerts.html、news 文章共三處）
- [ ] 《為伍》正式曲目公告後更新
- [ ] 演出照片（影像館《為伍》相簿）
- [ ] 其餘屆別的聯演紀錄（concerts.html 目前已有 1、6、14、18、21–41 屆；缺 2–5、7–13、15–17、19–20 屆。6、14、22、25、27、32 屆已補入部分紀錄，仍待正式節目冊補齊細節）
- [ ] 歷屆聯演獨立資料頁已先補齊至目前公開呈現屆別；總覽卡片與獨立頁目前皆以 `data/concerts.js` 為主要資料來源。下一階段可把人工頁與自動頁逐步統一欄位、補入更完整節目冊與團員名單。1990、1998、2016、2022、2024 已補入校友提供之海報或主視覺影像。
- [ ] 社群協作文件已補入 2005、2008–2024 多屆錄影清單；2025《四方之音》錄影仍待王則量資料補充
- [ ] 第 21 屆（2005《神話》）、第 26 屆（2010《Music à la Carte》）的確切場地、指揮、曲目待考證（見 `concerts/2005-21st.html`、`concerts/2010-26th.html`）
- [ ] 第 29 屆（2013）、第 35 屆（2019《正八音》）已有完整節目冊／海報資訊，人工獨立頁見 `concerts/2013-29th.html`、`concerts/2019-35th.html`
- [ ] 缺照片者以空白社徽顯示（在 alumni.js 搜尋 photo: "blank" 可列出全部待補名單）；8912 黃耀瑩照片為低解析度，待補清晰版
- [ ] 0755 許祥倫的表單「公開授權」欄為空白，請向本人確認同意公開後保留，否則通知我下架
- [ ] 成員名冊 xlsx/pdf 為內部個資檔案，僅作名錄更新依據，**絕對不上傳到網站 repo**
