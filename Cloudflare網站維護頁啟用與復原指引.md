# Cloudflare 網站維護頁啟用與復原指引

建立日期：2026-07-15 CST  
適用網域：`cysh.band`（含所有 `cysh.band/*` 子路徑）

## 目的與範圍

本維護頁由 Cloudflare Worker 在 GitHub Pages 前端回應，因此不刪除、不搬移、也不覆寫任何正式網站或照片檔案。

- 攔截：`https://cysh.band/`、人物頁、最新消息、歷屆聯演、`/photos/` 等所有 `cysh.band/*` 網址。
- 不攔截：`https://img.cysh.band/*` 的 R2 圖片原始網址；這些檔案保留不動，但一般訪客不會從官網進入。
- 顯示內容：畫面上只會有「網站維護中」。
- 設計：暖白紙質底、深棕文字、金色細線，沿用官網既有視覺語言。
- 快取：Worker 回應 `no-store`，啟用或解除後不應被舊頁面快取延遲。

## 目前準備好的檔案

- `cloudflare-maintenance/worker.js`：實際回應維護頁的 Worker 程式。
- `cloudflare-maintenance/wrangler.jsonc`：部署名稱與正式路由設定。

Worker 將所有樣式內嵌，沒有載入官網 CSS、圖片或 JavaScript；這是為了保證 `cysh.band/*` 全面攔截時，維護頁本身仍然能正常顯示。

## 第一次啟用（Cloudflare 儀表板）

登入 Cloudflare 後，選擇持有 `cysh.band` 網域的帳號，依序操作：

1. 開啟 **Workers & Pages**，選 **Create application** → **Create Worker**。
2. Worker 名稱填入 `cysh-band-maintenance`，建立後進入編輯器。
3. 用 `cloudflare-maintenance/worker.js` 的完整內容取代預設程式，按 **Deploy**。
4. 回到該 Worker 的 **Settings** → **Domains & Routes** → **Add** → **Route**。
5. Zone 選 `cysh.band`，Route 填入 `cysh.band/*`，Worker 選 `cysh-band-maintenance`，儲存。
6. 將 `cysh.band` 的四筆 GitHub Pages 根網域 A 紀錄（`185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`）全數設為橘雲（Proxied）。不要變更 A 紀錄的目標值，也不要調整 `img.cysh.band`、MX 或 TXT 紀錄。

完成後，以無痕視窗或重新整理測試下列網址：

- `https://cysh.band/`
- `https://cysh.band/people/8522.html`
- `https://cysh.band/concerts/2026-41st.html`
- `https://cysh.band/photos/`

四個網址都必須只顯示「網站維護中」。`https://img.cysh.band/` 不列入這項測試，因為它是保留中的 R2 圖片資源網域。

## 本次啟用紀錄（2026-07-15）

- 已部署 Worker：`cysh-band-maintenance`。
- 已啟用路由：`cysh.band/*` → `cysh-band-maintenance`。
- 已將上述四筆 GitHub Pages 根網域 A 紀錄設為橘雲，目標 IP 保持不變。
- `img.cysh.band` R2 紀錄及所有郵件 MX／TXT 紀錄均未變更。
- 已以 Cloudflare 邊緣節點實測首頁、人物頁、聯演頁與 `/photos/`，皆回傳 HTTP 200 且畫面只含「網站維護中」。

## 完全復原

改版完成、要恢復現有網站時：

1. 到 **Workers & Pages** → `cysh-band-maintenance` → **Settings** → **Domains & Routes**。
2. 刪除或停用唯一的 `cysh.band/*` Route。
3. 再次測試首頁、任一人物頁、任一聯演頁與 `/photos/`；應立即回到 GitHub Pages 原本內容。
4. 若要連 DNS 代理狀態也恢復成啟用前的完全相同配置，再將四筆 GitHub Pages 根網域 A 紀錄（`185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`）全數切回灰雲（DNS only）。
5. 保留 Worker 與本資料夾檔案，日後需要維護模式時可直接重新加回同一條 Route。

解除 Route 不會刪除 GitHub Pages、R2 圖片、Cloudflare DNS、Email Routing 或 Worker 原始碼。

## 重要限制

- 此設定只處理官方自訂網域 `cysh.band`。若仍有人直接使用 `ryanlin02.github.io/cysh-band/`，那是 GitHub Pages 的另一個網址，不會被 Cloudflare 攔截。
- 不要用 GitHub Pages 的 `404.html` 取代本方案；它無法攔截目前已存在的正式頁面。
- 不要把 `img.cysh.band/*` 納入這條路由，否則影像館的 R2 圖片資源也會被攔截。
