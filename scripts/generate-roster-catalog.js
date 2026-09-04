#!/usr/bin/env node
/* 產生 data/roster-catalog.json：給會員平台讀的校友名錄索引。
 *
 * 為什麼要有這一份：
 *   官網的名錄（data/alumni.js）有 519 位校友、其中 141 位有照片，
 *   而會員平台原本只認得「有人物誌頁面」的那 41 位——
 *   結果一個在官網早就有照片的校友，開通帳號之後在後台卻沒有大頭照。
 *
 *   照片與姓名的權威來源是官網（進 Git、每次修改都留紀錄），
 *   所以這裡輸出一份精簡 JSON 讓會員平台 fetch，而不是把資料複製一份進資料庫——
 *   複製就會有兩份不同步，而且沒有人知道要去更新哪一份。
 *
 * 只輸出「配對得上的鍵、顯示需要的欄位」：編號、姓名、照片檔名。
 * 沒有編號的人（如蕭萬長）不輸出——會員平台是用編號配對的。
 * 這些資料在 https://cysh.band/data/alumni.js 本來就是公開的，
 * 這一份沒有多公開任何東西（見規範 1.3-A 名錄公開政策）。
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
global.window = global;
require(path.join(root, 'data', 'alumni.js'));

const members = (global.ALUMNI || [])
  .filter((item) => item && /^[0-9]{4}$/.test(String(item.num || '')))
  .map((item) => {
    const photo = String(item.photo || '').trim();
    // photo 欄位存的是檔名（"9502"／"blank"）；blank 代表還沒有照片
    const hasPhoto = photo && photo !== 'blank'
      && fs.existsSync(path.join(root, 'assets', 'img', 'members', `${photo}.webp`));
    return {
      num: String(item.num),
      name: String(item.name || '').trim(),
      photo: hasPhoto ? `assets/img/members/${photo}.webp` : null,
    };
  })
  .filter((item) => item.name)
  .sort((a, b) => a.num.localeCompare(b.num));

const output = { generatedAt: new Date().toISOString().slice(0, 10), members };
const target = path.join(root, 'data', 'roster-catalog.json');
const next = JSON.stringify(output, null, 2) + '\n';

if (process.argv.includes('--check')) {
  const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  const strip = (text) => text.replace(/"generatedAt":\s*"[^"]*",?\s*/, '');
  if (strip(current) !== strip(next)) {
    console.error('data/roster-catalog.json 與 data/alumni.js 不同步，請執行 node scripts/generate-roster-catalog.js');
    process.exit(1);
  }
  console.log(`名錄索引檢查通過：${members.length} 位，其中 ${members.filter((m) => m.photo).length} 位有照片`);
} else {
  fs.writeFileSync(target, next);
  console.log(`data/roster-catalog.json（${members.length} 位，其中 ${members.filter((m) => m.photo).length} 位有照片）`);
}
