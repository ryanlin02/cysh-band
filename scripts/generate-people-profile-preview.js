#!/usr/bin/env node
/* 人物個人頁模板預覽。
   這個腳本只輸出 _generated/people-profile-preview.html，不會修改正式 people/*.html。 */
const fs = require('fs');
const path = require('path');
const { profiles, renderProfile } = require('./generate-people-pages');

const root = path.join(__dirname, '..');
const outDir = path.join(root, '_generated');
const outFile = path.join(outDir, 'people-profile-preview.html');
const profile = profiles.find((item) => item.num === '8861');

if (!profile) {
  throw new Error('Cannot find preview profile: 8861');
}

const html = renderProfile(profile, {
  preview: true,
  generatedAt: new Date().toISOString(),
  title: '簡晟軒（8861）｜人物頁模板預覽｜嘉義高中管樂隊',
  description: '人物頁模板預覽：以簡晟軒（編號 8861）為例，示範基本資料、正文、相關校友聯演、相關連結與資料來源的未來版型。',
  ogTitle: '簡晟軒（8861）｜人物頁模板預覽',
  ogDescription: '以簡晟軒為例，示範嘉義高中管樂隊人物個人頁模板化後的區塊結構。',
  url: 'https://cysh.band/_generated/people-profile-preview.html',
  extraHead: '<meta name="robots" content="noindex">'
});

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, html);
console.log(path.relative(root, outFile));
