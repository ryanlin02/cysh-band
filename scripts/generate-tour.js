#!/usr/bin/env node
/**
 * 驗證 data/tour.js 並產生導覽頁
 *
 *   node scripts/generate-tour.js            驗證 + 產生
 *   node scripts/generate-tour.js --check    只驗證，不寫檔（給 check-site.js 用）
 *
 * 驗證項目是從實際踩過的坑反推出來的：
 *   - 節點 id 在所有區域中必須唯一（跨區銜接會用 id 指名）
 *   - 座位 id 必須存在於 hall-seats.js
 *   - floor 必須與座位所在樓層一致（曾發生名稱寫二樓、座位標一樓）
 *   - heading 必須設定過（未校正的節點初始視角會朝向牆壁）
 *   - 影像檔必須存在
 *   - boundary 指向的區域與節點必須存在
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'hall', 'tour');
const CHECK_ONLY = process.argv.includes('--check');

const errors = [];
const warns = [];
const missingImages = new Set();
const noText = new Set();
const noDots = new Set();
const unknownLinks = new Set();
const fail = m => errors.push(m);
const warn = m => warns.push(m);

async function load(rel) {
  return import(pathToFileURL(path.join(ROOT, rel)).href + '?t=' + Date.now());
}

function validate(TOUR, HALL) {
  const remoteImages = /^https:\/\/[^\s]+\/$/.test(TOUR.imageBase || '');
  if (!remoteImages) {
    fail('imageBase 必須是 HTTPS 公開網址，且最後保留斜線');
  }
  const seatIds = new Set();
  HALL.floors.forEach(f => f.rows.forEach(r => r.seats.forEach(s =>
    seatIds.set ? seatIds.add(`${f.id}-${r.row}-${s.n}`) : null)));
  const seatFloor = new Map();
  HALL.floors.forEach(f => f.rows.forEach(r => r.seats.forEach(s =>
    seatFloor.set(`${f.id}-${r.row}-${s.n}`, f.id))));

  const nodeIds = new Map();
  const regionIds = new Set(TOUR.regions.map(r => r.id));
  // 先收齊所有節點 id，圓點才能檢查是不是指向不存在的場景
  const nodeIdsAll = new Set(TOUR.regions.flatMap(r => (r.nodes || []).map(n => n.id)));

  if (!TOUR.regions.length) fail('regions 是空的');

  TOUR.regions.forEach(region => {
    const { id, name, status, nodes = [], boundaries = [] } = region;

    if (!['ready', 'draft', 'planned'].includes(status))
      fail(`區域 ${id}：status 必須是 ready／draft／planned，目前是「${status}」`);
    if (status === 'ready' && !nodes.length)
      fail(`區域 ${id}：狀態為 ready 卻沒有任何節點`);

    nodes.forEach(n => {
      const at = `${id}/${n.id}`;

      if (nodeIds.has(n.id))
        fail(`節點 id 重複：${n.id}（同時出現在 ${nodeIds.get(n.id)} 與 ${id}）`);
      nodeIds.set(n.id, id);

      if (!n.name) fail(`${at}：缺少 name`);

      // 定位有兩種：觀眾席用座位 id，其餘區域用平面圖座標。至少要有一種。
      if (!n.seat && !n.plan) {
        fail(`${at}：尚未指定拍攝位置（需要 seat 或 plan 其中之一）`);
      }
      if (n.seat) {
        if (!seatFloor.has(n.seat)) {
          fail(`${at}：座位 ${n.seat} 不存在於座位表`);
        } else if (n.floor && n.floor !== seatFloor.get(n.seat)) {
          fail(`${at}：floor 標示 ${n.floor}，但座位 ${n.seat} 在 ${seatFloor.get(n.seat)}`);
        }
      }
      if (n.plan) {
        const { x, y } = n.plan;
        if (typeof x !== 'number' || typeof y !== 'number')
          fail(`${at}：plan 座標必須是數字`);
        else if (x < 0 || x > 1 || y < 0 || y > 1)
          fail(`${at}：plan 座標必須介於 0–1（目前 x=${x} y=${y}）`);
        if (!['1F', '2F'].includes(n.floor))
          fail(`${at}：使用平面圖定位時必須指定 floor（目前是 ${n.floor}）`);
      }

      if (typeof n.heading !== 'number' || n.heading < 0 || n.heading >= 360)
        fail(`${at}：heading 必須是 0–359 的數字，目前是 ${n.heading}`);
      else if (n.heading === 0)
        warn(`${at}：heading 為 0，可能尚未校正正面方向`);

      ['preview', 'mid', 'full'].forEach(k => {
        const p = n.images && n.images[k];
        if (!p) return fail(`${at}：缺少 ${k} 影像路徑`);
        // 使用正式 R2 網址時由部署驗證逐一檢查；本機路徑則在這裡檢查檔案。
        const found = [
          path.join(ROOT, 'assets', 'hall-tour', path.basename(p)),
          ...(region.workDir ? [path.join(ROOT, '..', region.workDir, p)] : []),
        ].some(f => fs.existsSync(f));
        if (!remoteImages && !found) missingImages.add(id);
      });

      if (!n.description) noText.add(id);

      // 人工放置的圓點必須有 yaw／pitch，否則會靜靜地畫在錯的地方
      (n.links || []).forEach(l => {
        if (typeof l.yaw !== 'number' || typeof l.pitch !== 'number')
          fail(`${at}：圓點 ${l.to} 缺少 yaw 或 pitch`);
        if (!nodeIdsAll.has(l.to)) unknownLinks.add(`${at} → ${l.to}`);
      });
      if (!(n.links || []).length) noDots.add(id);
    });

    boundaries.forEach(b => {
      if (!regionIds.has(b.to)) fail(`區域 ${id} 的邊界指向不存在的區域「${b.to}」`);
      if (!nodes.some(n => n.id === b.node))
        fail(`區域 ${id} 的邊界起點 ${b.node} 不在該區節點中`);
    });
  });

  const ready = TOUR.regions.filter(r => r.status === 'ready');
  if (ready.length > 1) {
    const linked = new Set();
    TOUR.regions.forEach(r => (r.boundaries || []).forEach(b => {
      linked.add(r.id); linked.add(b.to);
    }));
    ready.forEach(r => {
      if (!linked.has(r.id))
        warn(`區域 ${r.id} 已完成但沒有任何邊界節點，使用者走不進／走不出這一區`);
    });
  }

  return { nodeCount: nodeIds.size, ready: ready.length };
}

async function main() {
  const { TOUR } = await load('data/tour.js');
  const { HALL_SEATS } = await load('data/hall-seats.js');

  const stat = validate(TOUR, HALL_SEATS);

  console.log(`導覽資料：${TOUR.regions.length} 個區域、${stat.nodeCount} 個節點、` +
              `${stat.ready} 個區域已完成`);
  TOUR.regions.forEach(r => {
    const mark = { ready: '完成', draft: '進行中', planned: '未開始' }[r.status];
    console.log(`  ${r.name.padEnd(8, '　')} ${mark}　${(r.nodes || []).length}/${r.sourcePhotos} 張`);
  });

  // 影像未就位與文案未撰寫都是整批性質的，逐筆列出會把真正的問題洗掉
  if (missingImages.size)
    warn(`找不到本機影像：${[...missingImages].join('、')}（上線前需上傳 R2）`);
  if (noText.size)
    warn(`尚未撰寫解說文字的區域：${[...noText].join('、')}`);
  if (noDots.size)
    warn(`尚未人工放置圓點的區域：${[...noDots].join('、')}（會改用自動計算的位置）`);
  if (unknownLinks.size)
    warn(`圓點指向不存在的場景：${[...unknownLinks].join('、')}`);

  if (warns.length) {
    console.log(`\n提醒 ${warns.length} 項：`);
    warns.slice(0, 12).forEach(w => console.log('  ·', w));
    if (warns.length > 12) console.log(`  …另有 ${warns.length - 12} 項`);
  }

  if (errors.length) {
    console.log(`\n錯誤 ${errors.length} 項：`);
    errors.forEach(e => console.log('  ✗', e));
    process.exit(1);
  }

  console.log('\n驗證通過');

  if (CHECK_ONLY) return;

  const tpl = path.join(ROOT, 'templates', 'hall-tour.html');
  if (!fs.existsSync(tpl)) {
    console.log('（找不到 templates/hall-tour.html，略過頁面產生）');
    return;
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const html = fs.readFileSync(tpl, 'utf8')
    .replace(/\{\{VENUE\}\}/g, TOUR.venue.name)
    .replace(/\{\{DESC\}\}/g,
      `${TOUR.venue.name} 360 度環景導覽，共 ${stat.nodeCount} 個場景。` +
      `${TOUR.venue.seats.total} 席，可售 ${TOUR.venue.seats.sellable} 席。`)
    .replace(/\{\{GENERATED\}\}/g, new Date().toISOString().slice(0, 10));
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), html);
  console.log(`已產生 hall/tour/index.html`);
}

main().catch(e => { console.error(e); process.exit(1); });
