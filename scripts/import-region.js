#!/usr/bin/env node
/**
 * 把某個區域的 nodes.json（影像管線 + 校正工具的產物）併入 data/tour.js
 *
 *   node scripts/import-region.js auditorium ../Stage-D-觀眾席/nodes.json
 *
 * 只覆蓋機器產生的欄位（影像路徑、座位、heading）。
 * 人工撰寫的欄位（description、hotspots、boundaries）一律保留，
 * 這樣重跑影像管線或重新校正都不會弄丟文案。
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const TOUR_JS = path.join(ROOT, 'data', 'tour.js');

// 直接 import 這個模組，不要用正則或 JSON.parse 去剖析原始碼——
// 檔案裡有註解，字串裡也可能出現大括號，文字剖析遲早會出錯。
async function readTour() {
  if (!fs.existsSync(TOUR_JS)) return null;
  const m = await import(pathToFileURL(TOUR_JS).href + '?t=' + Date.now());
  return JSON.parse(JSON.stringify(m.TOUR));
}

function writeTour(data) {
  const header =
`// 嘉義市政府文化局音樂廳 360 導覽 — 主資料檔
//
// 影像路徑、座位、heading 由 scripts/import-region.js 從各區的 nodes.json 帶入，
// 重跑會覆蓋；name、description、hotspots、boundaries 是人工維護的，不會被覆蓋。
//
// 修改後請執行：
//   node scripts/generate-tour.js     產生頁面並驗證資料

export const TOUR = `;
  fs.writeFileSync(TOUR_JS, header + JSON.stringify(data, null, 2) + ';\n');
}

async function main() {
  const [regionId, nodesPath] = process.argv.slice(2);
  if (!regionId || !nodesPath) {
    console.error('用法：node scripts/import-region.js <區域id> <nodes.json 路徑>');
    process.exit(1);
  }

  const tour = await readTour();
  if (!tour) { console.error('找不到 data/tour.js'); process.exit(1); }

  const region = tour.regions.find(r => r.id === regionId);
  if (!region) {
    console.error(`data/tour.js 沒有區域「${regionId}」。現有：` +
      tour.regions.map(r => r.id).join('、'));
    process.exit(1);
  }

  const incoming = JSON.parse(fs.readFileSync(path.resolve(nodesPath), 'utf8'));
  const existing = new Map((region.nodes || []).map(n => [n.id, n]));

  let added = 0, updated = 0, keptText = 0;
  region.nodes = incoming.map(src => {
    const old = existing.get(src.id);
    // 節點有兩種定位方式：觀眾席用座位 id，其餘區域用平面圖座標。
    // 兩者都要帶進來，只認其中一種會把另一種的校正成果整批弄丟。
    const node = {
      id: src.id,
      name: (old && old.name) || src.name,
      floor: src.floor,
      heading: src.heading,
      headingConfirmed: Boolean(src.headingConfirmed || (old && old.headingConfirmed)),
      images: { preview: src.preview, mid: src.mid, full: src.full },
      source: src.source,
      description: (old && old.description) || '',
      hotspots: (old && old.hotspots) || [],
    };
    if (src.seat) node.seat = src.seat;
    if (src.plan) node.plan = src.plan;
    // links＝人工在照片上點出來的圓點位置，是花最多時間做的部分。
    // 這裡漏掉的話，網站會完全看不到成果（曾經發生過，55 個場景全部失效）。
    if (Array.isArray(src.links) && src.links.length) node.links = src.links;
    if (!old) added++;
    else {
      updated++;
      if (old.description || (old.hotspots || []).length) keptText++;
    }
    return node;
  });

  region.status = region.nodes.length ? 'ready' : 'planned';
  region.photoCount = region.nodes.length;
  region.updatedAt = new Date().toISOString().slice(0, 10);

  writeTour(tour);
  console.log(`區域「${region.name}」：新增 ${added}、更新 ${updated} 個節點`);
  if (keptText) console.log(`保留 ${keptText} 個節點既有的文案與熱點`);
  console.log('已寫入 data/tour.js');
}

main().catch(e => { console.error(e); process.exit(1); });
