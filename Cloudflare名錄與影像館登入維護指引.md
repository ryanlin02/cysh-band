# Cloudflare 名錄與影像館登入維護指引

建立時間：2026-07-23（Asia/Taipei）  
適用網站：`https://cysh.band/`  
適用範圍：校友名錄 `roster.html`、影像館 `photos/`

---

## 1. 先記住三件事

1. 官網大部分內容仍公開，只有「名錄」與「影像館」需要 Email 驗證。
2. 自己整理的 Excel 可以保留姓名、編號與 Email；送到 Cloudflare 白名單的資料只能有 Email。
3. Excel 原檔、純 Email 暫存檔、驗證紀錄都不可放進這個公開 GitHub repo。

這個機制使用 Cloudflare Access 的一次性驗證碼。社員點選名錄或影像館後輸入 Email；只有白名單內的 Email 會收到驗證碼。驗證碼為單次使用，約 10 分鐘失效。登入狀態設定為 7 天，期間在名錄與影像館之間跳轉不必重複驗證。

登入畫面會使用「嘉義高中管樂隊暨校友管樂團」、官網標誌、暖白背景與中文說明。驗證信由 Cloudflare 的驗證服務寄送，不另設寄信程式；信件用途與連結必須能辨識為 `cysh.band`。

## 2. 實際保護範圍

Cloudflare Access 應只設定以下兩個路徑：

```text
cysh.band/roster.html
cysh.band/photos/*
```

不要設定成 `cysh.band/*`，否則首頁、最新消息、編號、人物誌、校友聯演與其他公開內容也會被要求登入。

以下內容維持公開：

- 首頁、最新消息、關於、傳承、編號、人物誌、校友聯演。
- 新聞與演出文章內使用的照片。
- `gallery/` 下既有的公開精選相簿。
- `img.cysh.band` 的 R2 圖片網址。
- GitHub Pages 的原始網址。

因此這是「避免一般瀏覽者直接看到完整整理內容」的基本保護，不是把所有原始檔案改成機密儲存。

## 3. 自己的白名單 Excel 怎麼整理

建議在電腦內保留以下三欄：

| 姓名 | 編號 | Email |
|---|---|---|
| 方便人工辨認 | 方便核對同名或世代 | 唯一會送到 Cloudflare 的欄位 |

姓名與編號只是您的內部管理欄位。每次更新 Cloudflare 時，只複製 Email 欄：

1. 打開自己的 Excel。
2. 確認一列一位社員。
3. 確認 Email 沒有空白、前後空格或重複。
4. 只複製「電子郵件地址」欄，不要選到姓名、編號或其他欄位。
5. 貼到 Cloudflare 的社員 Email 規則中。
6. 更新完成後刪除任何臨時 CSV 或文字檔；原始 Excel 留在原本的私人資料夾。

若不確定，可直接把更新後的 Excel 交給 Codex，並要求「只檢查並擷取 Email 白名單，不上傳姓名與編號」。

## 4. 新增一位可登入社員

Cloudflare 後台路徑：

```text
Zero Trust → Access controls → Applications
→ 嘉中管樂社員區 → Policies → 社員 Email 白名單
```

操作方式：

1. 選擇編輯社員 Email 白名單。
2. 在 `Include` 的 `Emails` 清單新增完整 Email，例如 `name@example.com`。
3. 不要使用 `Emails ending in @gmail.com`；那會讓所有 Gmail 使用者都有機會登入。
4. 儲存。
5. 用無痕視窗開啟 `https://cysh.band/roster.html`，以新 Email 測試一次。

## 5. 移除一位可登入社員

1. 進入同一個「社員 Email 白名單」規則。
2. 找到完整 Email 並移除。
3. 儲存。
4. 移除只會阻止下一次重新登入；已存在的登入階段最長可能持續到原本的 7 天期限。
5. 若需要立即失效，進入 Zero Trust 的使用者／登入階段管理，撤銷該使用者的 Access session，再以無痕視窗確認已無法收到可用登入碼。

## 6. 使用者登入與登出

登入：

1. 點「名錄」或「影像館」。
2. 輸入白名單 Email。
3. 到信箱尋找 Cloudflare 寄出的驗證信，確認內容指向 `cysh.band`。
4. 在 10 分鐘內輸入一次性驗證碼。
5. 驗證成功後自動回到原本頁面。

登出：

```text
https://cysh.band/cdn-cgi/access/logout
```

若只是關閉分頁，7 天內再次開啟仍可能保持登入，這是正常狀況。

## 7. 日後新增文章與照片

### 公開最新消息或演出文章

維持原本流程，不需碰 Cloudflare Access。文章中的公開圖片仍可直接觀看。

### 新增影像館照片

維持原本的 R2 上傳與 `photos/` 資料更新流程。因為整個 `photos/*` 路徑已被保護，新增的相簿、人物照片頁與搜尋結果會自動要求登入，不必逐張設定權限。

### 更新名錄

維持更新 `data/alumni.js` 與 `roster.html` 的既有流程。只要頁面仍是 `roster.html`，就會自動套用同一個登入保護。

## 8. SEO 與一般搜尋引擎

網站端已做三層提示：

- `sitemap.xml` 不列出名錄與 `photos/` 影像館。
- `robots.txt` 要求搜尋引擎不要抓取這兩個路徑。
- 兩個頁面都有 `noindex, nofollow, noarchive`。

這些是搜尋引擎規則，不是密碼；真正阻擋一般瀏覽者的是 Cloudflare Access。

## 9. 每次更新後的檢查

至少測試：

1. 一個白名單 Email：能收到信、驗證成功、看到名錄與影像館。
2. 一個不在白名單的 Email：畫面可以顯示已寄出提示，但實際不應收到可登入驗證碼。
3. 驗證後從名錄切到影像館：不需再輸入驗證碼。
4. 首頁、最新消息、編號、人物誌與校友聯演：未登入也能正常開啟。
5. 手機 375px、平板 768px、桌機 1080px：登入頁與網站導覽可正常操作。
6. `https://cysh.band/cdn-cgi/access/logout`：登出後重新進入社員區會再次要求驗證。

## 10. 與全站維護模式一起使用

全站維護模式使用另一個 `cysh-band-maintenance` Worker，相關操作見 `Cloudflare網站維護頁啟用與復原指引.md`。

- 不要刪除名錄／影像館 Access 設定來啟用維護頁。
- 維護模式啟用後，仍要測試首頁、`roster.html`、`photos/` 三個網址。
- 如果受保護網址先出現登入畫面而不是維護頁，暫時停用「嘉中管樂社員區」Access application；恢復網站後再重新啟用。
- 不要把 `img.cysh.band/*` 加進維護 Worker 或 Access 保護路徑。

## 11. 緊急復原

若登入設定造成公開頁面也被擋住：

1. 先進 Cloudflare Zero Trust 的 Applications。
2. 找到「嘉中管樂社員區」。
3. 檢查 Public hostname 是否誤設為 `cysh.band/*`。
4. 只保留 `roster.html` 與 `photos/*`；若短時間內無法修正，暫時停用這個 application。
5. 不要刪除 GitHub Pages、R2、圖片或 `cysh-band-maintenance` Worker。
6. 確認公開首頁恢復後，再逐一路徑重新測試。

## 12. 不可做的事

- 不把白名單 Excel、Email 清單、姓名或編號清單 commit 到 GitHub。
- 不把完整 Email 清單寫進 HTML、JavaScript、Markdown 或 Cloudflare Worker 原始碼。
- 不用「所有 Gmail」或「所有有效 Email」作為允許規則。
- 不把 Access application 範圍設為整個 `cysh.band/*`。
- 不因為刪除社員 Email 就刪除名錄人物資料；登入資格與公開史料是兩套不同資料。

## 13. 官方參考文件

- Cloudflare One-time PIN：<https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/>
- Cloudflare Access policies：<https://developers.cloudflare.com/cloudflare-one/access-controls/policies/>
- Cloudflare Access login page：<https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/>

