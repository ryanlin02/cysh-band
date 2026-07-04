#!/usr/bin/env node
/* 人物個人頁模板預覽。
   這個腳本只輸出 _generated/people-profile-preview.html，不會修改正式 people/*.html。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');

const root = path.join(__dirname, '..');
const outDir = path.join(root, '_generated');
const outFile = path.join(outDir, 'people-profile-preview.html');
const { escapeHtml, renderPage } = createRenderer(root);

global.window = global;
require(path.join(root, 'data', 'concerts.js'));

const profile = {
  num: '8861',
  name: '簡晟軒',
  title: '簡晟軒（8861）｜人物頁模板預覽｜嘉義高中管樂隊',
  description: '人物頁模板預覽：以簡晟軒（編號 8861）為例，示範基本資料、正文、相關校友聯演、相關連結與資料來源的未來版型。',
  ogTitle: '簡晟軒（8861）｜人物頁模板預覽',
  ogDescription: '以簡晟軒為例，示範嘉義高中管樂隊人物個人頁模板化後的區塊結構。',
  headlineHtml: '簡晟軒：從嘉中出發，<br>再把音樂帶回嘉義',
  photo: '../assets/img/members/8861.webp',
  facts: [
    ['編號', '<b>8861</b>（民國 88 年入學．長號聲部）'],
    ['出身', '嘉義縣新港'],
    ['主要專業', '長號、低音長號、管樂團指揮'],
    ['現職', '嘉頌重奏團副團長、嘉頌管樂團常任指揮；高雄市管樂團團員']
  ],
  officialPage: '../people/8861.html',
  rosterLink: '../roster.html#p-8861',
  peopleLink: '../people.html#p-8861',
  relatedLinks: [
    { label: '高雄市管樂團〈簡晟軒〉', url: 'https://kcwo2012.com/zaq13J', type: '公開人物資料' },
    { label: '嘉頌重奏團官方人物頁', url: 'https://www.chiasong.com/team-2/%E7%B0%A1%E6%99%9F%E8%BB%92', type: '公開人物資料' },
    { label: '衛武營國家藝術文化中心節目頁', url: 'https://npac-weiwuying.org/programs/62a989418897870008243984', type: '演出節目頁' },
    { label: '目前正式人物頁', url: '../people/8861.html', type: '本站現行頁面' }
  ],
  sourceNote: '本文整理自公開人物資料、演出節目頁、嘉義市管樂團官方資料與嘉義市政府「樂脈計畫」新聞稿；歷史資料以當年紀錄為準。'
};

function extractArticleBody(relativePath) {
  const html = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const article = html.match(/<article class="section news-article person-article">([\s\S]*?)<\/article>/);
  if (!article) throw new Error(`Cannot find person article in ${relativePath}`);
  const withoutSources = article[1].split(/\n\s*<h3>資料來源<\/h3>/)[0].trim();
  return withoutSources;
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

function zhDate(date) {
  const match = String(date || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return '';
  return `${match[1]}.${match[2]}.${match[3]}`;
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
      <tr><th>屆次</th><th>演出</th><th>角色</th></tr>
${rows.map((row) => {
    const title = `第 ${escapeHtml(row.nth)} 屆《${escapeHtml(row.title)}》`;
    const meta = [zhDate(row.date), row.venue].filter(Boolean).join('．');
    return `      <tr><th>${escapeHtml(row.year)}</th><td>${title}${meta ? `<br><span class="muted">${escapeHtml(meta)}</span>` : ''}</td><td>${escapeHtml(row.roles.join('、'))}</td></tr>`;
  }).join('\n')}
    </table></div>`;
}

function renderRelatedLinks(links) {
  return `<h3>相關連結</h3>
    <div class="table-scroll"><table class="plain">
      <tr><th>類型</th><th>連結</th></tr>
${links.map((link) => `      <tr><th>${escapeHtml(link.type)}</th><td><a href="${escapeHtml(link.url)}"${/^https?:/.test(link.url) ? ' target="_blank" rel="noopener"' : ''}>${escapeHtml(link.label)}</a></td></tr>`).join('\n')}
    </table></div>`;
}

const body = extractArticleBody('people/8861.html');
const indentedBody = body.split('\n').map((line) => (line ? `    ${line}` : line)).join('\n');
const relatedConcerts = findRelatedConcerts(profile.num);
const generatedAt = new Date().toISOString();

const content = `<header class="page-head">
  <p class="kicker">PEOPLE．${escapeHtml(profile.num)}．PREVIEW</p>
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
    <p class="muted">此頁為人物個人頁模板預覽，由 <code>scripts/generate-people-profile-preview.js</code> 產生，不是正式公開人物頁。產生時間：${escapeHtml(generatedAt)}</p>

${indentedBody}

    ${renderRelatedConcerts(relatedConcerts)}

    ${renderRelatedLinks(profile.relatedLinks)}

    <h3>資料來源</h3>
    <p class="sources">${escapeHtml(profile.sourceNote)}</p>

    <nav class="person-nav" aria-label="人物頁面導覽">
      <a class="btn ghost" href="${escapeHtml(profile.peopleLink)}">← 回人物誌總覽</a>
      <a class="btn ghost" href="${escapeHtml(profile.officialPage)}">查看目前正式頁 →</a>
      <a class="btn" href="${escapeHtml(profile.rosterLink)}">在校友名錄查看${escapeHtml(profile.name)} →</a>
    </nav>
  </article>
</main>`;

const html = renderPage({
  title: profile.title,
  description: profile.description,
  ogTitle: profile.ogTitle,
  ogDescription: profile.ogDescription,
  url: 'https://cysh.band/_generated/people-profile-preview.html',
  ogType: 'profile',
  assetPrefix: '../',
  navActive: 'people',
  extraHead: '<meta name="robots" content="noindex">',
  content
});

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, html);
console.log(path.relative(root, outFile));
