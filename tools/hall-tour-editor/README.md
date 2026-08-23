# 嘉義市政府文化局音樂廳 360 導覽整合標注工具

這個工具只在本機使用，目前整合既有前廳 33 張與新版 105 張，共六區、138 個場景。它把下列工作集中在同一個畫面：

- 觀眾席使用初版互動座位圖標示最接近的觀看位置；其他區域使用平面圖
- 設定每張照片對應平面圖正上方的方向
- 在環景中放置同區或跨區的移動圓點，例如觀眾席與舞台互連
- 編輯空間名稱與介紹
- 放置可點擊的資訊標記
- 指定各區開場點與開場視角
- 在三個功能分頁持續顯示空間參考；動線模式可直接點圖面編號選目標並核對照片縮圖
- 以官網主視覺圓章遮住環景正下方腳架，不修改原始照片
- 即時顯示每個點位的同場景、跨場景、傳入、雙向與待補返回數量
- 篩選缺少返回、跨場景或超過 12 條連線的點位，並可一鍵前往另一端補返回
- 平面圖以 20／26px 小圓點顯示密集編號，但保留 44px 點擊範圍；目前點位會自動捲入視野
- 快速連續切換照片時以最後選取的點位為準；遠端照片若短暫失敗會自動重試，仍失敗時可按「重新載入照片」
- 環景中的移動點位使用略帶半透明的 30px 可見圓圈與較大的粗體編號，外層仍保留 44px 點擊範圍；滑鼠經過、鍵盤聚焦與按下時都有視覺回應

原始照片、WebP 預覽與人工標注都存放在 `local/hall-tour-editor/`，不會進入 Git，也不會自動上傳 R2 或修改公開導覽資料。

## 第一次準備

```bash
python3 tools/hall-tour-editor/prepare_workspace.py \
  "/Users/linjiunyu/Desktop/【進行中專案】/20260820_嘉義市音樂廳導覽系統"
```

準備程式會：

1. 清點四個資料夾內的 105 張 JPG，記錄尺寸、檔案大小與 SHA-256。
2. 驗證每張照片都是 2:1 環景照片。
3. 產生 2048×1024 的本機 WebP 標注預覽。
4. 建立可繼續編輯的 `workspace.json`；重跑時會保留既有人工標注。

## 開啟工具

不需要輸入程式。直接雙擊：

`tools/hall-tour-editor/開啟音樂廳360整合標注工具.command`

它會自行啟動本機工作台並開啟瀏覽器。若 macOS 第一次阻擋，請對檔案按右鍵，選「打開」。

維護者也可以使用：

```bash
python3 tools/hall-tour-editor/serve.py
```

再以瀏覽器開啟：

<http://127.0.0.1:8093/editor.html>

按下「正式儲存」時，舊版 `workspace.json` 會先備份到 `local/hall-tour-editor/backups/`。

標動線時不必在分頁之間來回切換：切到「動線」後，直接點上方座位圖或平面圖的
點位編號，右側會同步顯示目標區域、名稱與環景縮圖；確認後再點左側環景中的門口、
走道或實際通行方向。跨區時可先從「參考區域」切換到相鄰空間。原本的目標下拉選單
仍保留，可在編號密集或尚未定位時使用。

## 驗證

```bash
python3 tools/hall-tour-editor/prepare_workspace.py \
  "/Users/linjiunyu/Desktop/【進行中專案】/20260820_嘉義市音樂廳導覽系統" \
  --validate-only
```

完成所有人工標注後，再由維護流程把草稿轉成正式 `data/tour.js` 結構、產生公開用多級 WebP，並在確認後上傳 R2。天底圓章由檢視器即時疊加，因此不用改寫原始照片；這個工具本身不會執行發布動作。

## 基本標注完成後

先產生不修改人工資料的稽核報告：

```bash
python3 tools/hall-tour-editor/audit_workspace.py
```

報告位於 `local/hall-tour-editor/reports/workspace-audit.md`，會列出六區完成度、無效／單向
動線、過密場景、跨區方向與從開場點無法到達的點位。介紹與資訊點可以留到之後補，
不會被視為影像處理的阻擋項目。

建立不覆蓋公開網站的正式資料草稿：

```bash
node tools/hall-tour-editor/export_workspace.mjs
```

輸出位於 `local/hall-tour-editor/staging/`。每次補完內容或修改動線後重跑即可；只有文字
變動時不必重做 WebP。

建立並驗證 105 張新版照片的三級公開用 WebP 與四張新版入口卡（既有前廳沿用 R2 資產）：

```bash
python3 tools/hall-tour-editor/build_public_assets.py --jobs 2
python3 tools/hall-tour-editor/build_public_assets.py --validate-only
python3 tools/hall-tour-editor/build_scene_cards.py
```

輸出位於 `local/hall-tour-editor/public-assets/`，只供本機檢查與之後的 R2 上傳前清點；
工具不會自行上傳、刪除遠端檔案或發布網站。

工作台已取消固定「4 區／105 張」限制；未來新增音樂廳、草皮廣場或周邊公園時，
可再增加區域與節點，不必重做目前六區資料。尚無照片的入口不會先顯示在場景選單。
