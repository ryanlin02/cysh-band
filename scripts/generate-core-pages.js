#!/usr/bin/env node
/* 產生已模板化的主內容頁。
   GitHub Pages 仍使用輸出的靜態 HTML；此腳本只在本地維護時執行。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');

const root = path.join(__dirname, '..');
const { renderPage } = createRenderer(root);

const pages = [
  {
    id: 'about',
    source: 'content/pages/about.html',
    output: 'about.html',
    title: '關於樂團｜嘉義高中管樂隊暨校友管樂團',
    description: '嘉義高中管樂隊暨校友管樂團，由在校生管樂社與歷屆畢業校友組成的校友管樂團共同構成，血脈相連、人才相通。',
    navActive: 'about',
    url: 'https://cysh.band/about.html'
  },
  {
    id: 'history',
    source: 'content/pages/history.html',
    output: 'history.html',
    title: '傳承｜嘉義高中管樂隊歷史沿革',
    description: '從 1931 年嘉義第一支學生吹奏樂隊，到台灣管樂之都的搖籃——嘉義高中管樂隊跨世代延續至今的傳承故事。',
    navActive: 'history',
    url: 'https://cysh.band/history.html'
  },
  {
    id: 'numbers',
    source: 'content/pages/numbers.html',
    output: 'numbers.html',
    title: '編號｜嘉中管樂人一輩子的身分',
    description: '嘉義高中管樂隊的編號文化：入學年份、聲部與流水號組成的四碼數字，是嘉中管樂人跨越世代、伴隨一生的身分認同。',
    navActive: 'numbers',
    url: 'https://cysh.band/numbers.html',
    extraScripts: [
      '<script src="data/number-lookup.js" defer></script>',
      '<script src="data/alumni.js?v=20260711-1" defer></script>',
      '<script src="js/number-lookup.js" defer></script>'
    ].join('\n')
  },
  {
    id: 'support',
    source: 'content/pages/support.html',
    output: 'support.html',
    title: '支持我們｜嘉義高中校友管樂團',
    description: '支持嘉義高中校友管樂團，讓校友與在校生的年度聯演、排練、樂器搬運與史料整理能持續延續。',
    ogTitle: '支持我們｜嘉義高中校友管樂團',
    ogDescription: '每一次排練、搬運、行政與演出，都是讓嘉中管樂跨世代傳統延續下去的一部分。',
    navActive: 'about',
    url: 'https://cysh.band/support.html'
  }
];

function renderCorePage(page) {
  const content = fs.readFileSync(path.join(root, page.source), 'utf8').trim();
  const html = renderPage({
    title: page.title,
    description: page.description,
    ogTitle: page.ogTitle || page.title,
    ogDescription: page.ogDescription || page.description,
    url: page.url,
    assetPrefix: '',
    navActive: page.navActive,
    extraHead: page.extraHead || '',
    extraScripts: page.extraScripts || '',
    content
  });
  return html.replace(/[ \t]+$/gm, '');
}

function generateCorePages() {
  for (const page of pages) {
    fs.writeFileSync(path.join(root, page.output), `${renderCorePage(page).trim()}\n`);
  }
}

if (require.main === module) {
  generateCorePages();
}

module.exports = {
  pages,
  renderCorePage,
  generateCorePages
};
