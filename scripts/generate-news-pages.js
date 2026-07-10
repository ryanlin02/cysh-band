#!/usr/bin/env node
/* 產生已模板化的最新消息文章。
   GitHub Pages 仍使用輸出的靜態 HTML；此腳本只在本地維護時執行。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');
const { autoLinkHtml } = require('./lib/people-auto-link');

const root = path.join(__dirname, '..');
const { escapeHtml, renderPage } = createRenderer(root);

global.window = global;
require(path.join(root, 'data', 'people-profiles.js'));

const profiles = global.PEOPLE_PROFILES || [];

const articles = [
  {
    date: '2026-07-10',
    source: 'content/news/2026-07-10-chiayi-city-closure.html',
    output: 'news/2026-07-10-chiayi-city-closure.html',
    title: '嘉義市 7/11 停止上班上課，請留意巴威颱風動態｜最新消息｜嘉義高中管樂隊',
    ogTitle: '嘉義市 7/11 停止上班上課，請留意巴威颱風動態',
    description: '嘉義市政府已發布巴威颱風停班停課通知，7/11 全面停止上班上課；請團員與家長注意安全，7/12 團練將依後續天候另行通知。',
    ogDescription: '嘉義市 7/11 停止上班上課，7/11 團練取消；請團員與家長留意巴威颱風動態與後續團練公告。',
    headlineHtml: '嘉義市 7/11 停止上班上課，<br>請留意巴威颱風動態'
  },
  {
    date: '2026-07-10',
    source: 'content/news/2026-07-10-typhoon-bavi-rehearsal.html',
    output: 'news/2026-07-10-typhoon-bavi-rehearsal.html',
    title: '因巴威颱風影響，7/11 團練取消｜最新消息｜嘉義高中管樂隊',
    ogTitle: '因巴威颱風影響，7/11 團練取消',
    description: '受巴威颱風影響，7/11 團練取消；7/12 團練將依颱風動向與嘉義地區天候狀況另行通知，後續團練時間表同步公告。',
    ogDescription: '7/11 團練取消，7/12 是否照常進行將依颱風動向與天候狀況更新，請校友與在校生留意後續公告。',
    headlineHtml: '因巴威颱風影響，<br>7/11 團練取消'
  },
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
  },
  {
    date: '2026-06-30',
    source: 'content/news/2026-06-30-summer-bbq.html',
    output: 'news/2026-06-30-summer-bbq.html',
    title: '期末考結束，肉趴開烤！在校生迎接《為伍》暑假｜最新消息｜嘉義高中管樂隊',
    ogTitle: '期末考結束，肉趴開烤！在校生迎接《為伍》暑假',
    description: '6 月 30 日晚間，在校生管樂社在指導老師簡晟軒帶領下舉辦期末烤肉聚會，為暑假的《為伍》密集團練暖身。',
    headlineHtml: '期末考結束，肉趴開烤！<br>在校生迎接《為伍》的暑假'
  },
  {
    date: '2026-06-27',
    source: 'content/news/2026-06-27-first-rehearsal.html',
    output: 'news/2026-06-27-first-rehearsal.html',
    title: '《為伍》第一次團練啟動｜最新消息｜嘉義高中管樂隊',
    ogTitle: '《為伍》第一次團練啟動｜嘉義高中管樂隊',
    description: '第 41 屆校友聯演《為伍》6 月 27 日展開第一次團練，翁啟榮學長一如往常第一個到場開門，團練後再回味一碗嘉中人的火雞肉飯。',
    headlineHtml: '《為伍》第一次團練啟動！<br>警伯依然是第一個到的人'
  },
  {
    date: '2026-06-12',
    source: 'content/news/2026-06-12-rehearsal-schedule.html',
    output: 'news/2026-06-12-rehearsal-schedule.html',
    title: '校友歸隊召集令：《為伍》團練時程公布｜最新消息｜嘉義高中管樂隊',
    ogTitle: '校友歸隊召集令：《為伍》團練時程公布',
    ogDescription: '6/27 起每週六日下午團練，8/4–7 平日晚間衝刺，8/8 文化局音樂廳登台。歡迎校友歸隊。',
    description: '第 41 屆校友聯演《為伍》團練時程公布：6/27 起每週六日下午團練，8/4–7 平日晚間衝刺，8/8 文化局音樂廳登台。歡迎校友歸隊。',
    headlineHtml: '校友歸隊召集令：<br>《為伍》團練時程公布'
  }
];

function textFromHtml(html) {
  return String(html || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function articleNavLabel(article) {
  return textFromHtml(article.ogTitle || article.title).replace(/｜.*$/, '');
}

function adjacentArticles(article) {
  const index = articles.findIndex((item) => item.output === article.output);
  if (index < 0) return { previous: null, next: null };
  return {
    previous: articles[index - 1] || null,
    next: articles[index + 1] || null
  };
}

function articlePageNav(article) {
  const { previous, next } = adjacentArticles(article);
  const links = [];
  if (previous) {
    links.push(`<a class="btn ghost article-page-nav-link previous" href="../${escapeHtml(previous.output)}"><span>← 上一篇消息</span><b>${escapeHtml(articleNavLabel(previous))}</b></a>`);
  }
  links.push('<a class="btn ghost article-page-nav-link overview" href="../news/index.html"><span>回到</span><b>最新消息總覽</b></a>');
  if (next) {
    links.push(`<a class="btn ghost article-page-nav-link next" href="../${escapeHtml(next.output)}"><span>下一篇消息 →</span><b>${escapeHtml(articleNavLabel(next))}</b></a>`);
  }
  return `<nav class="article-page-nav news-page-nav" aria-label="最新消息文章導覽">
      ${links.join('\n      ')}
    </nav>`;
}

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

    ${articlePageNav(article)}
  </article>
</main>`;

  const html = renderPage({
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
  return autoLinkHtml(html, article.output, profiles);
}

function generateNewsPages() {
  for (const article of articles) {
    const outputPath = path.join(root, article.output);
    fs.writeFileSync(outputPath, renderArticle(article));
    console.log(article.output);
  }
}

if (require.main === module) {
  generateNewsPages();
}

module.exports = { articles, renderArticle, generateNewsPages };
