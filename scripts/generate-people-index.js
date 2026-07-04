#!/usr/bin/env node
/* 產生人物誌首頁 people.html。
   GitHub Pages 仍使用輸出的靜態 HTML；此腳本只在本地維護時執行。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');

const root = path.join(__dirname, '..');
const { escapeHtml, renderPage } = createRenderer(root);

global.window = global;
require(path.join(root, 'data', 'alumni.js'));
require(path.join(root, 'data', 'people-profiles.js'));

const profiles = global.PEOPLE_PROFILES || [];
const sections = global.PEOPLE_FEATURED_SECTIONS || [];
const alumni = global.ALUMNI || [];

const profileByNum = new Map(profiles.map((profile) => [profile.num, profile]));
const alumniByNum = new Map(alumni.filter((person) => person.num).map((person) => [person.num, person]));

function indexPhotoFromProfile(profile) {
  return String(profile.photo || '').replace(/^\.\.\//, '');
}

function numHtmlForProfile(profile) {
  const person = alumniByNum.get(profile.num);
  const year = person && person.year ? ` <small>民國 ${escapeHtml(person.year)} 年入學</small>` : '';
  return `${escapeHtml(profile.num)}${year}`;
}

function renderCard(item) {
  const profile = item.profile ? profileByNum.get(item.profile) : null;
  if (item.profile && !profile) {
    throw new Error(`PEOPLE_FEATURED_SECTIONS references missing profile: ${item.profile}`);
  }

  const id = profile ? profile.num : item.id;
  const name = profile ? profile.name : item.name;
  const numHtml = profile ? numHtmlForProfile(profile) : item.numHtml;
  const photo = profile ? indexPhotoFromProfile(profile) : item.photo;
  const role = item.role;
  const summaryHtml = item.summaryHtml;

  if (!id || !name || !numHtml || !photo || !role || !summaryHtml) {
    throw new Error(`Incomplete people index card data: ${id || item.profile || '(missing id)'}`);
  }

  const head = profile
    ? `<a class="card-head" href="${escapeHtml(profile.output)}" aria-label="查看${escapeHtml(name)}完整人物誌 →">
          <img class="avatar" src="${escapeHtml(photo)}" alt="${escapeHtml(name)}" loading="lazy">
          <div>
            <p class="num">${numHtml}</p>
            <h3>${escapeHtml(name)}</h3>
          </div>
        </a>`
    : `<div class="card-head">
          <img class="avatar" src="${escapeHtml(photo)}" alt="${escapeHtml(name)}" loading="lazy">
          <div>
            <p class="num">${numHtml}</p>
            <h3>${escapeHtml(name)}</h3>
          </div>
        </div>`;

  const more = profile
    ? `
        <p class="more"><a href="${escapeHtml(profile.output)}">閱讀完整人物誌 →</a></p>`
    : '';

  return `      <div class="card" id="p-${escapeHtml(id)}">
        ${head}
        <p class="role">${escapeHtml(role)}</p>
        <p>${summaryHtml}</p>${more}
      </div>`;
}

function renderSection(section) {
  if (!section.title || !Array.isArray(section.items) || !section.items.length) {
    throw new Error(`Invalid people index section: ${section.title || '(missing title)'}`);
  }
  const note = section.note ? `      <!-- ${escapeHtml(section.note)} -->\n` : '';
  const after = section.afterHtml
    ? `\n    <p class="muted" style="margin-top:24px">${section.afterHtml}</p>`
    : '';
  return `  <section class="section">
    <h2>${escapeHtml(section.title)}</h2>
    <div class="cards">
${note}${section.items.map(renderCard).join('\n')}
    </div>${after}
  </section>`;
}

function renderPeopleIndex() {
  const content = `<header class="page-head">
  <p class="kicker">PEOPLE</p>
  <h1>人物誌</h1>
  <p class="lede">近百年來，嘉中管樂隊培育出許多在音樂領域深耕的校友——從職業樂團演奏家、大學音樂系教師到指揮家與作曲家。每張卡片旁的數字，是他們在嘉中管樂隊的<a href="numbers.html">編號</a>；各區依入學年由前輩至後輩排列。</p>
</header>

<main class="wrap">

${sections.map(renderSection).join('\n\n')}

</main>`;

  return renderPage({
    title: "人物誌｜嘉義高中管樂隊傑出校友",
    description: "嘉義高中管樂隊近百年來培育的音樂人才：職業樂團演奏家、大學音樂教師、指揮家與作曲家。",
    ogTitle: "人物誌｜嘉義高中管樂隊傑出校友",
    ogDescription: "嘉義高中管樂隊近百年來培育的音樂人才：職業樂團演奏家、大學音樂教師、指揮家與作曲家。",
    url: "https://cysh.band/people.html",
    navActive: "people",
    content
  }).replace(/[ \t]+$/gm, '');
}

function generatePeopleIndex() {
  const outputPath = path.join(root, 'people.html');
  fs.writeFileSync(outputPath, renderPeopleIndex());
  console.log('people.html');
}

if (require.main === module) {
  generatePeopleIndex();
}

module.exports = { renderPeopleIndex, generatePeopleIndex };
