# GitHub Desktop 網站更新發布流程

文件建立時間：2026-07-04 21:04:37 CST（Asia/Taipei，UTC+8）  
適用網站：嘉義高中管樂隊暨校友管樂團官方網站  
GitHub 專案：`ryanlin02/cysh-band`  
正式網址：<https://cysh.band/>  
文件用途：讓完全不熟 Git、GitHub、VS Code 的維護者，也能理解如何安全更新網站、檢查修改、發布到 GitHub Pages。

---

## 1. 先理解四個名詞

### Git

Git 是一套「修改紀錄系統」。

它可以記錄：

- 哪一天改了哪些檔案。
- 每次修改的內容差異。
- 誰做了這次修改。
- 必要時如何回到舊版本。

你不需要會打 Git 指令，但要知道 Git 是網站長期維護的版本保險。

### GitHub

GitHub 是放在網路上的專案倉庫。

這個網站的 GitHub 專案是：

<https://github.com/ryanlin02/cysh-band>

可以把它想成「網站正式資料的雲端總資料夾」。

### GitHub Pages

GitHub Pages 是 GitHub 提供的靜態網站發布功能。

你的 GitHub 專案裡的網站檔案更新後，GitHub Pages 會把它發布成：

<https://cysh.band/>

### GitHub Desktop

GitHub Desktop 是 GitHub 官方提供的圖形介面軟體。

它可以讓你不用打指令，也能完成：

- 從 GitHub 下載網站專案。
- 查看這次改了哪些檔案。
- 儲存一筆修改紀錄，稱為 commit。
- 把修改上傳到 GitHub，稱為 push。

對不熟程式的人來說，GitHub Desktop 會比直接使用 VS Code 裡的 Git 功能更容易上手。

---

## 2. 目前這個資料夾的狀態

目前 Codex 操作的資料夾是：

`/Users/linjiunyu/Desktop/【進行中專案】/20260513_嘉中校友聯演/11_官方網站`

這個資料夾裡目前沒有 `.git` 資料夾，所以它不是一個 Git 正式追蹤中的工作資料夾。

這代表：

- 可以繼續編輯網站檔案。
- 可以繼續請 Codex 協助整理內容。
- 但目前不能直接用 `git status` 查看修改差異。
- 也不能直接用 Git 指令把這個資料夾推送到 GitHub。

這不是錯誤，也不代表網站壞掉。它只代表目前這份資料比較像一般工作副本，不是從 GitHub 正式下載下來並由 Git 追蹤的專案資料夾。

長期建議：未來建立一個「正式 GitHub 工作資料夾」，以後所有網站更新都在那個資料夾進行。

---

## 3. 建議的長期工作方式

建議未來維護網站時，分成兩種資料夾概念：

### A. 正式 GitHub 工作資料夾

這是用 GitHub Desktop 從 `ryanlin02/cysh-band` 下載下來的資料夾。

用途：

- 正式修改網站。
- 檢查檔案差異。
- commit。
- push 到 GitHub。
- 讓 GitHub Pages 更新正式網站。

這個資料夾應該被視為「之後真正要上傳的網站資料夾」。

### B. 素材與暫存資料夾

例如：

- 原始照片。
- 海報掃描檔。
- 未整理文字。
- 活動資料。
- 臨時備份。

這些資料可以放在其他專案資料夾，不一定全部放進網站專案。

原因是 GitHub 專案不適合放太多超大原始檔。網站裡通常只放已壓縮、已命名、要公開顯示的圖片，例如 `.webp` 圖片。

---

## 4. 第一次設定 GitHub Desktop

這個步驟只需要做一次。

### 步驟 1：安裝 GitHub Desktop

下載位置：

<https://desktop.github.com/>

安裝後登入你的 GitHub 帳號。

### 步驟 2：從 GitHub 下載網站專案

在 GitHub Desktop 裡選擇：

`File` -> `Clone Repository`

選擇或輸入：

`ryanlin02/cysh-band`

選擇一個你之後容易記得的位置，例如：

`/Users/linjiunyu/Desktop/GitHub/cysh-band`

建議不要放在太深、太複雜、常常搬移的資料夾裡。

### 步驟 3：確認資料夾是正式工作資料夾

成功 clone 後，GitHub Desktop 左上角應該會顯示這個 repository。

這時候那個資料夾裡會有一個隱藏的 `.git`，代表它已經由 Git 追蹤。

之後要更新正式網站，建議都在這個資料夾做。

---

## 5. 從目前資料夾轉到正式 GitHub 工作資料夾

因為目前這個資料夾不是 Git 工作資料夾，第一次轉換時要小心，不要直接整包覆蓋 GitHub 下載下來的資料夾。

建議流程：

1. 先用 GitHub Desktop clone 最新的 `ryanlin02/cysh-band`。
2. 取得一個乾淨的正式 GitHub 工作資料夾。
3. 請 Codex 協助比較目前資料夾與正式 GitHub 工作資料夾的差異。
4. 只把需要保留的新檔案與修改內容搬到正式工作資料夾。
5. 用 GitHub Desktop 檢查變更清單。
6. 確認沒有多餘檔案或錯誤刪除後再 commit。
7. push 到 GitHub。

這一步最重要的是：不要用人工拖曳整包覆蓋，因為可能會不小心刪掉 GitHub 上已有、但目前資料夾沒有的檔案。

---

## 6. 日常更新網站的標準流程

以下是未來每次更新網站都建議照著做的流程。

### 步驟 1：先開 GitHub Desktop

確認目前選到的是：

`cysh-band`

如果看到 `Fetch origin`，可以先按一下。這會檢查 GitHub 上有沒有新的版本。

如果按鈕變成 `Pull origin`，代表 GitHub 上有新內容，要先拉下來，避免你在舊版本上修改。

### 步驟 2：打開正式工作資料夾

可以用 Finder 或 VS Code 打開正式 GitHub 工作資料夾。

如果只是請 Codex 協助修改，也要確認 Codex 操作的是正式工作資料夾，而不是舊的暫存資料夾。

### 步驟 3：進行網站修改

常見修改包括：

- 新增最新消息。
- 新增或壓縮圖片。
- 更新 `data/news.js`。
- 更新 `feed.xml`。
- 更新 `sitemap.xml`。
- 修改人物頁。
- 修改活動頁。
- 修改網站規範。
- 修改 `網站修改歷程紀錄.md`。

每次重要修改都應該同步更新 `網站修改歷程紀錄.md`。

### 步驟 4：回到 GitHub Desktop 檢查變更

GitHub Desktop 會列出這次改動的檔案。

你要看三件事：

1. 這次應該新增的檔案是否有出現。
2. 不應該被修改的檔案是否沒有出現。
3. 有沒有出現大量奇怪檔案，例如原始大照片、暫存檔、系統檔。

如果看到不確定的檔案，先不要 commit，可以問 Codex。

### 步驟 5：寫 commit 訊息

commit 可以理解成「儲存一筆修改紀錄」。

GitHub Desktop 左下角會有 Summary 欄位，可以寫簡短摘要。

建議格式：

```txt
新增 2026-07-04 團練最新消息
```

或：

```txt
更新網站規範與資料化報告
```

下面 Description 欄位可以寫詳細內容，但不是每次都必要。

建議常用 commit 摘要：

- `新增最新消息：文章標題`
- `更新人物資料：姓名或編號`
- `新增活動相簿：活動名稱`
- `更新網站規範`
- `新增維護文件`
- `修正頁面文字`
- `壓縮並更新圖片`

### 步驟 6：按 Commit

按下：

`Commit to main`

或 GitHub Desktop 顯示的目前分支名稱。

這一步只是把修改記錄在你的電腦裡，還沒有上傳到 GitHub。

### 步驟 7：按 Push origin

commit 之後，GitHub Desktop 通常會出現：

`Push origin`

按下後，修改才會上傳到 GitHub。

### 步驟 8：等待 GitHub Pages 更新

push 之後，GitHub Pages 需要一點時間更新正式網站。

你可以稍等 1 到 5 分鐘後，打開：

<https://cysh.band/>

確認最新內容是否出現。

有時候瀏覽器會暫存舊頁面，可以重新整理，或用無痕視窗查看。

---

## 7. 每次更新前的安全檢查

更新前請確認：

- 目前 GitHub Desktop 選到的是正確 repository：`cysh-band`。
- 已經先按 `Fetch origin` 或確認沒有需要 pull 的更新。
- Codex 或自己修改的是正式 GitHub 工作資料夾。
- 本次修改目的清楚，例如「新增最新消息」或「更新人物頁」。
- 原始大照片沒有直接放進網站資料夾。

---

## 8. 每次更新後的安全檢查

commit 前請確認：

- GitHub Desktop 裡列出的變更檔案都合理。
- 沒有不該刪除的檔案。
- 沒有 `.DS_Store` 之類的系統檔。
- 沒有超大的原始照片。
- `網站修改歷程紀錄.md` 已更新。
- 若有新增頁面，`sitemap.xml` 已視需要更新。
- 若有新增最新消息，`data/news.js` 與 `feed.xml` 已視需要更新。

push 後請確認：

- GitHub 專案頁面看得到剛剛的 commit。
- `https://cysh.band/` 可以正常打開。
- 新增或修改的頁面可以正常打開。
- 手機版大致看起來正常。
- 圖片沒有破圖。
- 導覽連結沒有明顯錯誤。

---

## 9. 請 Codex 協助時的建議說法

未來你可以這樣對 Codex 說：

```txt
請在正式 GitHub 工作資料夾內新增一篇最新消息，完成後幫我列出本次修改的檔案，但先不要 commit。
```

或：

```txt
請幫我檢查 GitHub Desktop 顯示的修改清單是否合理，我不確定哪些檔案該提交。
```

或：

```txt
請幫我準備這次 commit 的摘要與詳細說明。
```

如果你還不熟 Git，建議先不要要求 Codex 直接 push。比較安全的方式是：Codex 幫你整理、檢查、說明，最後由你在 GitHub Desktop 按 commit 和 push。

---

## 10. 常見情境

### 情境 A：新增一篇最新消息

通常會修改或新增：

- `news/日期-文章代稱.html`
- `data/news.js`
- `feed.xml`
- `sitemap.xml`
- `assets/img/news/圖片檔.webp`
- `網站修改歷程紀錄.md`

檢查重點：

- 文章頁能打開。
- 圖片能顯示。
- 首頁或最新消息列表能出現新文章。
- RSS 與 sitemap 已同步。

### 情境 B：新增人物頁

通常會修改或新增：

- `people/編號.html`
- `data/alumni.js`
- 可能修改 `people.html`
- 可能新增人物照片。
- `網站修改歷程紀錄.md`

檢查重點：

- 人物編號正確。
- 公開資訊有授權或確認可公開。
- 人名、職稱、年分一致。
- 個人頁與人物誌卡片資料一致。

### 情境 C：更新聯演資料

通常會修改：

- `data/concerts.js`
- `concerts.html`
- 可能新增 `concerts/屆別.html`
- 可能新增海報或相簿圖片。
- `網站修改歷程紀錄.md`

檢查重點：

- 不要把未確認資料寫成已確認。
- 日期、場地、屆次、字頭要一致。
- 如果是 2026《為伍》，不要寫成首度音樂廳或首度售票。

### 情境 D：只修改維護文件

通常會修改：

- `網站製作規範.md`
- `網站修改歷程紀錄.md`
- `網站結構優化建議報告書.md`
- 其他 `.md` 文件。

檢查重點：

- 不會影響正式網站畫面。
- 但仍建議 commit，因為這些文件是未來維護依據。

---

## 11. 什麼情況先不要 push

遇到以下情況，先不要 push：

- GitHub Desktop 顯示大量你看不懂的檔案變更。
- 有檔案被刪除，但你不確定原因。
- 出現很多原始照片或影片檔。
- Codex 或其他 AI 修改了你沒有要求的頁面。
- 新增文章還沒有校對完成。
- 圖片還沒有壓縮。
- 網站在本機打開時已經有破圖或明顯錯誤。

這時候可以先截圖 GitHub Desktop 的變更清單，或請 Codex 讀取資料夾檢查。

---

## 12. 如果網站更新後出錯怎麼辦

Git 的好處就是可以找到出錯前的版本。

建議處理順序：

1. 不要急著再亂改一堆檔案。
2. 先記下錯誤狀況，例如哪個頁面壞掉、什麼圖片不見、手機版哪裡跑版。
3. 打開 GitHub Desktop，查看最近一次 commit。
4. 請 Codex 協助判斷是哪一個檔案造成問題。
5. 如果只是小錯，做一個修正 commit。
6. 如果整次更新都需要撤回，再討論是否 revert。

注意：不要隨便刪除整個資料夾，也不要自己手動覆蓋大量檔案。

---

## 13. 建議的資料夾管理方式

建議未來電腦裡可以這樣分：

```txt
Desktop/
  GitHub/
    cysh-band/                  正式 GitHub 工作資料夾

  【進行中專案】/
    20260513_嘉中校友聯演/
      12_官方網站用圖片/        原始圖片與待整理素材
      13_文字資料/              未整理文案、訪談、活動資料
      14_備份/                  手動備份或匯出資料
```

原則：

- 正式網站檔案放在 `GitHub/cysh-band`。
- 原始素材放在進行中專案資料夾。
- 只有整理好、要公開、已壓縮的圖片才放進網站資料夾。

---

## 14. 推薦的維護節奏

### 每次小更新

例如新增一篇最新消息：

1. 修改網站。
2. 檢查 GitHub Desktop 變更。
3. commit。
4. push。
5. 打開正式網站確認。

### 每次中型更新

例如新增人物頁、活動頁、相簿：

1. 先整理資料來源。
2. 修改網站。
3. 檢查手機版與電腦版。
4. 檢查連結、圖片、sitemap。
5. 更新修改歷程。
6. commit。
7. push。
8. 正式網站確認。

### 每次大型更新

例如改網站架構、資料化、CSS 外觀：

1. 先寫規劃或報告。
2. 分階段修改。
3. 每階段都 commit。
4. 不要累積太多修改才一次提交。
5. 每次 push 後都檢查正式網站。

---

## 15. 最重要的原則

1. 永遠先確認自己正在改正式 GitHub 工作資料夾。
2. 每次修改都要看 GitHub Desktop 的變更清單。
3. 不懂的檔案不要急著 commit。
4. 原始大檔不要直接放進網站專案。
5. 每次重要修改都要更新 `網站修改歷程紀錄.md`。
6. commit 訊息要讓未來的自己看得懂。
7. push 後一定要打開 `https://cysh.band/` 檢查。

---

## 16. 官方參考資料

- GitHub Desktop 官方說明：<https://docs.github.com/en/desktop>
- GitHub Desktop 下載頁：<https://desktop.github.com/>
- GitHub Pages 官方說明：<https://docs.github.com/en/pages>
- 專案 GitHub 頁面：<https://github.com/ryanlin02/cysh-band>
