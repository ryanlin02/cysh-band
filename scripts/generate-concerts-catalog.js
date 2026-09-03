#!/usr/bin/env node
/* 產生 data/concerts-catalog.json：給會員平台讀的屆別清單。
 *
 * 會員平台需要「第幾屆、哪一年、叫什麼」來讓校友勾選自己參加過哪幾屆。
 * 那份資料在官網的 data/concerts.js，所以由官網產生一份精簡 JSON，
 * 會員平台用 fetch 讀——不是各自維護一份，避免以後兩邊對不起來。
 *
 * 只輸出勾選需要的欄位，不含節目單、海報、售票這些。
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
global.window = {};
require(path.join(root, 'data', 'concerts.js'));

const editions = (global.window.CONCERTS || [])
  .filter((item) => Number.isInteger(item.nth) && item.nth > 0)
  .filter((item) => item.status !== 'cancelled')
  .map((item) => ({
    nth: item.nth,
    year: Number(item.year) || null,
    title: String(item.title || `第 ${item.nth} 屆聯合音樂會`),
    page: item.id ? `concerts/${item.id}.html` : null,
  }))
  .sort((a, b) => b.nth - a.nth);

const output = { generatedAt: new Date().toISOString().slice(0, 10), editions };
const target = path.join(root, 'data', 'concerts-catalog.json');
const next = JSON.stringify(output, null, 2) + '\n';

if (process.argv.includes('--check')) {
  const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  // generatedAt 每天都會變，比對時忽略它
  const strip = (text) => text.replace(/"generatedAt":\s*"[^"]*",?\s*/, '');
  if (strip(current) !== strip(next)) {
    console.error('data/concerts-catalog.json 與 data/concerts.js 不同步，請執行 node scripts/generate-concerts-catalog.js');
    process.exit(1);
  }
  console.log(`屆別清單檢查通過：${editions.length} 屆`);
} else {
  fs.writeFileSync(target, next);
  console.log(`data/concerts-catalog.json（${editions.length} 屆，第 ${editions[editions.length - 1].nth}–${editions[0].nth} 屆）`);
}
