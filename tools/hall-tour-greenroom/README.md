# 地下休息室人工標記工具

這是只在本機使用的工具，不會把原始照片、全景轉檔或未完成標記上傳到網站。

準備與開啟：

```bash
python3 tools/hall-tour-greenroom/build_greenroom_panoramas.py \
  "/Users/linjiunyu/Desktop/【進行中專案】/20260804_音樂廳環境介紹/20260805_音樂廳環境/05-地下室休息室" \
  local/hall-tour-greenroom
python3 tools/hall-tour-greenroom/serve.py
```

開啟瀏覽器網址 `http://127.0.0.1:8091/annotate.html`，按照頁面上「定位、設定正面、放圓點」的順序操作。每次正式儲存都會備份前一次 `nodes.json`。

完成全部 28 張後，不要自行把資料貼到網站；告知 Codex 進行連線檢查、R2 上傳與導覽整合。
