#!/usr/bin/env node
/* 產生已模板化的人物個人頁。
   GitHub Pages 仍使用輸出的靜態 HTML；此腳本只在本地維護時執行。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');

const root = path.join(__dirname, '..');
const { escapeHtml, renderPage } = createRenderer(root);

global.window = global;
require(path.join(root, 'data', 'concerts.js'));

const profiles = [
  {
    num: '8861',
    name: '簡晟軒',
    source: 'content/people/8861.html',
    output: 'people/8861.html',
    title: '簡晟軒（8861）｜人物誌｜嘉義高中管樂隊',
    description: '從嘉中管樂隊第一次拿起長號，到指揮東京佼成管樂團錄製臺灣作品——簡晟軒（編號 8861）在演奏、指揮與教育之間扎根嘉義。',
    ogTitle: '簡晟軒（8861）｜從嘉中出發，再把音樂帶回嘉義',
    ogDescription: '長號演奏家、嘉頌重奏團副團長、指揮，編號 8861 從嘉中管樂隊走向專業、再扎根地方的歷程。',
    headlineHtml: '簡晟軒：從嘉中出發，<br>再把音樂帶回嘉義',
    photo: '../assets/img/members/8861.webp',
    facts: [
      ['編號', '<b>8861</b>（民國 88 年入學．長號聲部）'],
      ['出身', '嘉義縣新港'],
      ['主要專業', '長號、低音長號、管樂團指揮'],
      ['現職', '嘉頌重奏團副團長、嘉頌管樂團常任指揮；高雄市管樂團團員']
    ],
    peopleLink: '../people.html#p-8861',
    rosterLink: '../roster.html#p-8861',
    relatedLinks: [
      { label: '高雄市管樂團〈簡晟軒〉', url: 'https://kcwo2012.com/zaq13J', type: '公開人物資料' },
      { label: '嘉頌重奏團官方人物頁', url: 'https://www.chiasong.com/team-2/%E7%B0%A1%E6%99%9F%E8%BB%92', type: '公開人物資料' },
      { label: '衛武營國家藝術文化中心節目頁', url: 'https://npac-weiwuying.org/programs/62a989418897870008243984', type: '演出節目頁' }
    ],
    sourceHtml: '本文整理自以下公開資料：<a href="https://kcwo2012.com/zaq13J" target="_blank" rel="noopener">高雄市管樂團〈簡晟軒〉</a>、<a href="https://www.chiasong.com/team-2/%E7%B0%A1%E6%99%9F%E8%BB%92" target="_blank" rel="noopener">嘉頌重奏團官方人物頁</a>、嘉義市管樂團官方資料、<a href="https://npac-weiwuying.org/programs/62a989418897870008243984" target="_blank" rel="noopener">衛武營國家藝術文化中心節目頁</a>、嘉義市政府「樂脈計畫」新聞稿。歷史資料以當年紀錄為準；如需補充或更正，歡迎透過粉絲專頁與我們聯繫。'
  }
];

function indentHtml(html, spaces = 4) {
  const prefix = ' '.repeat(spaces);
  return html.split('\n').map((line) => (line ? `${prefix}${line}` : line)).join('\n');
}

function zhDate(date) {
  const match = String(date || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return '';
  return `${match[1]}.${match[2]}.${match[3]}`;
}

function findRelatedConcerts(num) {
  const concerts = global.CONCERTS || [];
  const rows = [];
  for (const concert of concerts) {
    const roles = [];
    for (const person of concert.conductors || []) {
      if (person.num === num) roles.push(person.role || '指揮');
    }
    for (const person of concert.soloists || []) {
      if (person.num === num) {
        const detail = [person.instrument, person.work].filter(Boolean).join('／');
        roles.push(detail ? `獨奏／協奏：${detail}` : '獨奏／協奏');
      }
    }
    if (roles.length) {
      rows.push({
        year: concert.year,
        nth: concert.nth,
        title: concert.title,
        date: concert.date,
        venue: concert.venue,
        roles
      });
    }
  }
  return rows;
}

function renderFacts(facts) {
  return `<div class="table-scroll"><table class="plain">
${facts.map(([label, value]) => `        <tr><th>${escapeHtml(label)}</th><td>${value}</td></tr>`).join('\n')}
      </table></div>`;
}

function renderRelatedConcerts(rows) {
  if (!rows.length) {
    return `<h3>相關校友聯演</h3>
    <p class="muted">目前資料庫尚未列出可確認的相關聯演紀錄；這不代表此人物未曾參與校友聯演。</p>`;
  }
  return `<h3>相關校友聯演</h3>
    <p class="muted">以下為目前資料庫可確認的相關聯演紀錄，並非此人物完整參與履歷。</p>
    <div class="table-scroll"><table class="plain">
      <tr><th>年份</th><th>演出</th><th>角色</th></tr>
${rows.map((row) => {
    const escapedTitle = escapeHtml(row.title);
    const title = String(row.title || '').includes(`第 ${row.nth} 屆`)
      ? `《${escapedTitle}》`
      : `第 ${escapeHtml(row.nth)} 屆《${escapedTitle}》`;
    const meta = [zhDate(row.date), row.venue].filter(Boolean).join('．');
    return `      <tr><th>${escapeHtml(row.year)}</th><td>${title}${meta ? `<br><span class="muted">${escapeHtml(meta)}</span>` : ''}</td><td>${escapeHtml(row.roles.join('、'))}</td></tr>`;
  }).join('\n')}
    </table></div>`;
}

function renderRelatedLinks(links) {
  if (!links || !links.length) return '';
  return `<h3>相關連結</h3>
    <div class="table-scroll"><table class="plain">
      <tr><th>類型</th><th>連結</th></tr>
${links.map((link) => `      <tr><th>${escapeHtml(link.type)}</th><td><a href="${escapeHtml(link.url)}"${/^https?:/.test(link.url) ? ' target="_blank" rel="noopener"' : ''}>${escapeHtml(link.label)}</a></td></tr>`).join('\n')}
    </table></div>`;
}

function renderProfile(profile, options = {}) {
  const body = fs.readFileSync(path.join(root, profile.source), 'utf8').trim();
  const relatedConcerts = findRelatedConcerts(profile.num);
  const previewNote = options.preview
    ? `    <p class="muted">此頁為人物個人頁模板預覽，由 <code>scripts/generate-people-profile-preview.js</code> 產生，不是正式公開人物頁。產生時間：${escapeHtml(options.generatedAt || new Date().toISOString())}</p>\n\n`
    : '';
  const officialPageLink = options.preview
    ? `      <a class="btn ghost" href="../${escapeHtml(profile.output)}">查看目前正式頁 →</a>\n`
    : '';
  const previewSuffix = options.preview ? '．PREVIEW' : '';

  const content = `<header class="page-head">
  <p class="kicker">PEOPLE．${escapeHtml(profile.num)}${previewSuffix}</p>
  <h1>${profile.headlineHtml}</h1>
  <div class="person-hero">
    <img src="${escapeHtml(profile.photo)}" alt="${escapeHtml(profile.name)}">
    <div class="person-meta">
      ${renderFacts(profile.facts)}
    </div>
  </div>
</header>

<main class="wrap">
  <article class="section news-article person-article">
${previewNote}${indentHtml(body)}

    ${renderRelatedConcerts(relatedConcerts)}

    ${renderRelatedLinks(profile.relatedLinks)}

    <h3>資料來源</h3>
    <p class="sources">${profile.sourceHtml}</p>

    <nav class="person-nav" aria-label="人物頁面導覽">
      <a class="btn ghost" href="${escapeHtml(profile.peopleLink)}">← 回人物誌總覽</a>
${officialPageLink}      <a class="btn" href="${escapeHtml(profile.rosterLink)}">在校友名錄查看${escapeHtml(profile.name)} →</a>
    </nav>
  </article>
</main>`;

  return renderPage({
    title: options.title || profile.title,
    description: options.description || profile.description,
    ogTitle: options.ogTitle || profile.ogTitle,
    ogDescription: options.ogDescription || profile.ogDescription,
    url: options.url || `https://cysh.band/${profile.output}`,
    ogType: 'profile',
    assetPrefix: '../',
    navActive: 'people',
    extraHead: options.extraHead || '',
    content
  });
}

function generatePeoplePages() {
  for (const profile of profiles) {
    const outputPath = path.join(root, profile.output);
    fs.writeFileSync(outputPath, renderProfile(profile));
    console.log(profile.output);
  }
}

if (require.main === module) {
  generatePeoplePages();
}

module.exports = { profiles, renderProfile, generatePeoplePages };
