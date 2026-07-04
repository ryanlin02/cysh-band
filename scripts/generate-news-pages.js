#!/usr/bin/env node
/* 產生已模板化的最新消息文章。
   GitHub Pages 仍使用輸出的靜態 HTML；此腳本只在本地維護時執行。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');

const root = path.join(__dirname, '..');
const { escapeHtml, renderPage } = createRenderer(root);

const articles = [
  {
    date: '2026-07-04',
    source: 'content/news/2026-07-04-rehearsal-coffee.html',
    output: 'news/2026-07-04-rehearsal-coffee.html',
    title: '7/4 團練日：火雞肉飯、團練室與一壺咖啡｜最新消息｜嘉義高中管樂隊',
    ogTitle: '7/4 團練日：火雞肉飯、團練室與一壺咖啡',
    description: '第 41 屆校友聯演《為伍》7 月 4 日週末團練紀錄：翁啟榮學長中午先到簡單火雞肉飯，下午回到嘉中團練室，還煮起咖啡和大家一起喝。',
    ogDescription: '第 41 屆校友聯演《為伍》7 月 4 日週末團練紀錄：午餐、團練與咖啡，都是校友歸隊的一部分。',
    headlineHtml: '7/4 團練日：<br>火雞肉飯、團練室與一壺咖啡'
  },
  {
    date: '2026-07-02',
    source: 'content/news/2026-07-02-weiwu-announce.html',
    output: 'news/2026-07-02-weiwu-announce.html',
    title: '《為伍》8/8 文化局音樂廳登場｜最新消息｜嘉義高中管樂隊',
    ogTitle: '《為伍》8/8 文化局音樂廳登場｜最新消息｜嘉義高中管樂隊',
    description: '第 41 屆校友暨在校生聯合音樂會《為伍》，2026 年 8 月 8 日於嘉義市政府文化局音樂廳演出。',
    headlineHtml: '第 41 屆聯合音樂會《為伍》<br>8/8 文化局音樂廳登場'
  }
];

function renderArticle(article) {
  const body = fs.readFileSync(path.join(root, article.source), 'utf8').trim();
  const indentedBody = body.split('\n').map((line) => (line ? `    ${line}` : line)).join('\n');
  const content = `<header class="page-head">
  <p class="kicker">NEWS．${escapeHtml(article.date)}</p>
  <h1>${article.headlineHtml}</h1>
</header>

<main class="wrap">
  <article class="section news-article">
${indentedBody}
  </article>
</main>`;

  return renderPage({
    title: article.title,
    description: article.description,
    ogTitle: article.ogTitle,
    ogDescription: article.ogDescription,
    url: `https://cysh.band/${article.output}`,
    ogType: 'article',
    assetPrefix: '../',
    navActive: 'concerts',
    content
  });
}

for (const article of articles) {
  const outputPath = path.join(root, article.output);
  fs.writeFileSync(outputPath, renderArticle(article));
  console.log(article.output);
}
