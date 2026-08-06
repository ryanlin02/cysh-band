#!/usr/bin/env node
/*
 * 將地下室人工標記資料轉成公開導覽使用的座標。
 * 人工標記用圖保留了觀眾席；公開地圖會裁成地下室區域，因此 y 座標須同步換算。
 *
 * 用法：node scripts/prepare-greenroom-public.js [來源 nodes.json] [輸出 nodes.json]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const input = process.argv[2] || path.join(ROOT, 'local/hall-tour-greenroom/nodes.json');
const output = process.argv[3] || path.join(ROOT, 'local/hall-tour-greenroom/nodes-public.json');
const SOURCE_HEIGHT = 1928;
const PUBLIC_HEIGHT = 1120;
const maxY = PUBLIC_HEIGHT / SOURCE_HEIGHT;

const nodes = JSON.parse(fs.readFileSync(path.resolve(input), 'utf8'));
if (!Array.isArray(nodes) || !nodes.length) throw new Error('找不到地下室標記資料');

const prepared = nodes.map(node => {
  if (!node.plan || typeof node.plan.x !== 'number' || typeof node.plan.y !== 'number')
    throw new Error(`${node.id} 尚未定位`);
  if (!node.headingSet || typeof node.heading !== 'number')
    throw new Error(`${node.id} 尚未設定正面方向`);
  if (node.plan.y > maxY)
    throw new Error(`${node.id} 位於公開地下室裁圖範圍之外，請調整裁圖或重新標記`);
  const { headingSet, sizeKB, ...publicNode } = node;
  return {
    ...publicNode,
    floor: 'B1',
    headingConfirmed: true,
    plan: {
      x: node.plan.x,
      y: +(node.plan.y * SOURCE_HEIGHT / PUBLIC_HEIGHT).toFixed(4),
    },
  };
});

fs.writeFileSync(path.resolve(output), JSON.stringify(prepared, null, 2) + '\n');
console.log(`已建立 ${prepared.length} 張公開導覽用節點：${path.resolve(output)}`);
