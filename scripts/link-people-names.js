#!/usr/bin/env node
/* 將已有個人介紹頁的人名，在公開 HTML 文字節點中自動連到人物頁。
   用法：
   node scripts/link-people-names.js
   node scripts/link-people-names.js --check */
const fs = require('fs');
const path = require('path');
const { autoLinkHtml } = require('./lib/people-auto-link');

const root = path.join(__dirname, '..');
const isCheck = process.argv.includes('--check');
const ignoredDirs = new Set([
  '.git',
  '.agents',
  '.codex',
  '20260704_嘉中管樂社官網_校友提供資料'
]);

global.window = global;
require(path.join(root, 'data', 'people-profiles.js'));

const profiles = global.PEOPLE_PROFILES || [];

function rel(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function walk(dir, results = []) {
  for (const name of fs.readdirSync(dir)) {
    if (ignoredDirs.has(name)) continue;
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
      walk(file, results);
    } else if (file.endsWith('.html')) {
      results.push(file);
    }
  }
  return results;
}

const changed = [];
for (const file of walk(root).sort()) {
  const currentRel = rel(file);
  const current = fs.readFileSync(file, 'utf8');
  const next = autoLinkHtml(current, currentRel, profiles);
  if (next !== current) {
    changed.push(currentRel);
    if (!isCheck) fs.writeFileSync(file, next);
  }
}

if (isCheck && changed.length) {
  console.error('People name links are out of sync. Run node scripts/link-people-names.js');
  for (const file of changed) console.error(`- ${file}`);
  process.exit(1);
}

if (changed.length) {
  console.log(`linked people names: ${changed.length} file(s)`);
  for (const file of changed) console.log(file);
} else {
  console.log('people name links ok');
}
