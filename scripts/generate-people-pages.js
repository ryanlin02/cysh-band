#!/usr/bin/env node
/* 產生已模板化的人物個人頁。
   GitHub Pages 仍使用輸出的靜態 HTML；此腳本只在本地維護時執行。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');
const { autoLinkHtml } = require('./lib/people-auto-link');

const root = path.join(__dirname, '..');
const { escapeHtml, renderPage } = createRenderer(root);

global.window = global;
require(path.join(root, 'data', 'concerts.js'));
require(path.join(root, 'data', 'people-profiles.js'));

const profiles = global.PEOPLE_PROFILES || [];

function profileKey(profile) {
  return profile.id || profile.num;
}

function indentHtml(html, spaces = 4) {
  const prefix = ' '.repeat(spaces);
  return html.split('\n').map((line) => (line ? `${prefix}${line}` : line)).join('\n');
}

function zhDate(date) {
  const match = String(date || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return '';
  return `${match[1]}.${match[2]}.${match[3]}`;
}

function personMatchesProfile(person, profile) {
  if (!person || !profile) return false;
  if (profile.num && person.num === profile.num) return true;
  if (profile.id && person.id === profile.id) return true;
  return false;
}

function findRelatedConcerts(profile) {
  const concerts = global.CONCERTS || [];
  const rows = [];
  for (const concert of concerts) {
    const roles = [];
    for (const person of concert.conductors || []) {
      if (personMatchesProfile(person, profile)) roles.push(person.role || '指揮');
    }
    for (const person of concert.organizers || []) {
      if (personMatchesProfile(person, profile)) roles.push(person.role || '籌備');
    }
    for (const person of concert.soloists || []) {
      if (personMatchesProfile(person, profile)) {
        const detail = [person.instrument, person.work].filter(Boolean).join('／');
        roles.push(detail ? `獨奏／協奏：${detail}` : '獨奏／協奏');
      }
    }
    for (const person of concert.performers || []) {
      if (personMatchesProfile(person, profile)) roles.push(person.role || person.instrument || '演出');
    }
    if (roles.length) {
      rows.push({
        year: concert.year,
        nth: concert.nth,
        title: concert.title,
        date: concert.date,
        venue: concert.venue,
        page: concert.page,
        roles: [...new Set(roles)]
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
    const titleHtml = row.page
      ? `<a href="../${escapeHtml(row.page)}">${title}</a>`
      : title;
    const meta = [zhDate(row.date), row.venue].filter(Boolean).join('．');
    return `      <tr><th>${escapeHtml(row.year)}</th><td>${titleHtml}${meta ? `<br><span class="muted">${escapeHtml(meta)}</span>` : ''}</td><td>${escapeHtml(row.roles.join('、'))}</td></tr>`;
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

function renderGalleryLink(profile) {
  if (!profile.num) return '';
  const href = `../photos/#/person-num/${encodeURIComponent(profile.num)}`;
  return `<section class="person-gallery-panel" aria-label="影像館人物照片">
      <h3>影像館中的照片</h3>
      <a class="btn ghost" href="${escapeHtml(href)}"><span>前往影像館</span><b>查看照片牆</b></a>
    </section>`;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function linkConcertMentions(html) {
  const concertLinks = (global.CONCERTS || [])
    .filter((concert) => concert.page && concert.status !== 'cancelled' && concert.title)
    .map((concert) => ({
      nth: concert.nth,
      title: concert.title,
      href: `../${concert.page}`
    }))
    .sort((a, b) => String(b.title).length - String(a.title).length);
  const chunks = String(html || '').split(/(<a\b[\s\S]*?<\/a>)/gi);
  return chunks.map((chunk) => {
    if (/^<a\b/i.test(chunk)) return chunk;
    let next = chunk;
    for (const concert of concertLinks) {
      const linked = `<a href="${escapeHtml(concert.href)}">《${escapeHtml(concert.title)}》</a>`;
      next = next.replace(new RegExp(`(?<!>)《${escapeRegExp(concert.title)}》`, 'g'), linked);
      if (concert.nth) {
        const full = `第 ${concert.nth} 屆聯合音樂會`;
        const fullLinked = `<a href="${escapeHtml(concert.href)}">${escapeHtml(full)}</a>`;
        next = next.replace(new RegExp(escapeRegExp(full), 'g'), fullLinked);
      }
    }
    return next;
  }).join('');
}

function textFromHtml(html) {
  return String(html || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function safeJsonLd(data) {
  return JSON.stringify(data, null, 2).replace(/<\/(script)/gi, '<\\/$1');
}

function renderPersonStructuredData(profile) {
  const key = profileKey(profile);
  const url = `https://cysh.band/${profile.output}`;
  const image = profile.photo.replace(/^\.\.\//, 'https://cysh.band/');
  const facts = Object.fromEntries((profile.facts || []).map(([label, value]) => [label, textFromHtml(value)]));
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    identifier: key,
    url,
    image,
    description: profile.description,
    memberOf: {
      '@type': 'PerformingGroup',
      name: '嘉義高中管樂隊暨校友管樂團',
      url: 'https://cysh.band/'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: '國立嘉義高級中學'
    }
  };
  const instrument = facts['主修'] || facts['主要樂器'];
  if (instrument) person.knowsAbout = instrument;
  return `<script type="application/ld+json">
${safeJsonLd(person)}
</script>`;
}

function renderProfile(profile, options = {}) {
  const body = linkConcertMentions(fs.readFileSync(path.join(root, profile.source), 'utf8').trim());
  const relatedConcerts = findRelatedConcerts(profile);
  const key = profileKey(profile);
  const previewNote = options.preview
    ? `    <p class="muted">此頁為人物個人頁模板預覽，由 <code>scripts/generate-people-profile-preview.js</code> 產生，不是正式公開人物頁。產生時間：${escapeHtml(options.generatedAt || new Date().toISOString())}</p>\n\n`
    : '';
  const officialPageLink = options.preview
    ? `      <a class="btn ghost" href="../${escapeHtml(profile.output)}">查看目前正式頁 →</a>\n`
    : '';
  const previewSuffix = options.preview ? '．PREVIEW' : '';
  const relatedLinksHtml = renderRelatedLinks(profile.relatedLinks);
  const galleryLinkHtml = renderGalleryLink(profile);
  const personNavClass = profile.peopleLink ? 'person-nav article-page-nav' : 'person-nav article-page-nav person-nav--single';
  const peopleBackLink = profile.peopleLink
    ? `      <a class="btn ghost article-page-nav-link overview" href="${escapeHtml(profile.peopleLink)}"><span>回到</span><b>人物誌總覽</b></a>\n`
    : '';

  const content = `<header class="page-head">
  <p class="kicker">PEOPLE．${escapeHtml(key)}${previewSuffix}</p>
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

    ${renderRelatedConcerts(relatedConcerts)}${relatedLinksHtml ? `\n\n    ${relatedLinksHtml}` : ''}${galleryLinkHtml ? `\n\n    ${galleryLinkHtml}` : ''}

    <h3>資料來源</h3>
    <p class="sources">${profile.sourceHtml}</p>

    <nav class="${personNavClass}" aria-label="人物頁面導覽">
${peopleBackLink}${officialPageLink}      <a class="btn ghost article-page-nav-link next" href="${escapeHtml(profile.rosterLink)}"><span>校友資料</span><b>在名錄查看</b></a>
    </nav>
  </article>
</main>`;

  const html = renderPage({
    title: options.title || profile.title,
    description: options.description || profile.description,
    ogTitle: options.ogTitle || profile.ogTitle,
    ogDescription: options.ogDescription || profile.ogDescription,
    url: options.url || `https://cysh.band/${profile.output}`,
    ogType: 'profile',
    assetPrefix: '../',
    navActive: profile.navActive || 'people',
    extraHead: [options.extraHead, renderPersonStructuredData(profile)].filter(Boolean).join('\n'),
    content
  }).replace(/[ \t]+$/gm, '');
  return autoLinkHtml(html, profile.output, profiles);
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
