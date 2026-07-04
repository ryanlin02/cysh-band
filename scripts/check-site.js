#!/usr/bin/env node
/* 全站健康檢查。
   用法：node scripts/check-site.js */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const errors = [];
const warnings = [];
const info = [];

function rel(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function walk(dir, predicate, results = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === '.git') continue;
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) walk(file, predicate, results);
    else if (!predicate || predicate(file)) results.push(file);
  }
  return results;
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function isExternal(raw) {
  return /^(https?:|mailto:|tel:|javascript:|data:)/i.test(raw) || raw.startsWith('//');
}

function cleanLocalRef(raw) {
  return raw.split('#')[0].split('?')[0];
}

function webUrlToLocal(url) {
  const parsed = new URL(url);
  let pathname = decodeURIComponent(parsed.pathname);
  if (pathname === '/') pathname = '/index.html';
  if (pathname.endsWith('/')) pathname += 'index.html';
  return pathname.slice(1);
}

function checkJsSyntax() {
  const files = walk(root, (file) => file.endsWith('.js'));
  for (const file of files) {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) {
      addError(`${rel(file)}: JavaScript syntax check failed\n${result.stderr.trim()}`);
    }
  }
  info.push(`JS syntax checked: ${files.length}`);
}

function loadData() {
  global.window = global;
  for (const file of ['data/alumni.js', 'data/news.js', 'data/number-lookup.js', 'data/concerts.js']) {
    require(path.join(root, file));
  }

  if (!Array.isArray(global.ALUMNI)) addError('data/alumni.js: window.ALUMNI must be an array.');
  if (!Array.isArray(global.NEWS)) addError('data/news.js: window.NEWS must be an array.');
  if (!Array.isArray(global.NUMBER_LOOKUP)) addError('data/number-lookup.js: window.NUMBER_LOOKUP must be an array.');
  if (!Array.isArray(global.CONCERTS)) addError('data/concerts.js: window.CONCERTS must be an array.');
}

function checkDataReferences() {
  const alumni = global.ALUMNI || [];
  const news = global.NEWS || [];
  const lookup = global.NUMBER_LOOKUP || [];
  const concerts = global.CONCERTS || [];

  for (const person of alumni) {
    const label = `${person.num || 'no-num'} ${person.name || '(missing name)'}`;
    if (person.photo && person.photo !== 'blank' && !exists(`assets/img/members/${person.photo}.webp`)) {
      addError(`data/alumni.js: missing photo for ${label}: assets/img/members/${person.photo}.webp`);
    }
    if (person.link && !person.link.includes('#') && !exists(person.link)) {
      addError(`data/alumni.js: missing linked page for ${label}: ${person.link}`);
    }
  }

  for (const item of news) {
    if (!item.url || !exists(item.url)) addError(`data/news.js: missing news page: ${item.url || '(empty url)'}`);
    if (item.thumb && !exists(item.thumb)) addError(`data/news.js: missing news thumb for "${item.title}": ${item.thumb}`);
  }

  const allowedStatuses = new Set(['confirmed', 'partial', 'inferred', 'pending', 'planning', 'cancelled']);
  const allowedTicketTypes = new Set(['ticketed', 'free', 'free-ticket', 'ceremony', 'unknown', 'none']);
  const concertIds = new Set();
  for (const concert of concerts) {
    const label = concert && concert.id ? concert.id : '(missing id)';
    if (!concert || typeof concert !== 'object') {
      addError('data/concerts.js: record must be an object.');
      continue;
    }
    if (!concert.id) addError('data/concerts.js: concert missing id.');
    if (concertIds.has(concert.id)) addError(`data/concerts.js: duplicate concert id: ${concert.id}`);
    concertIds.add(concert.id);
    if (!allowedStatuses.has(concert.status)) addError(`data/concerts.js: ${label} invalid status "${concert.status}".`);
    if (concert.ticket && !allowedTicketTypes.has(concert.ticket.type)) {
      addError(`data/concerts.js: ${label} invalid ticket.type "${concert.ticket.type}".`);
    }
    for (const field of ['page', 'poster']) {
      if (concert[field] && !exists(concert[field])) addError(`data/concerts.js: ${label} ${field} not found: ${concert[field]}`);
    }
    for (const field of ['gallery', 'news']) {
      for (const item of concert[field] || []) {
        if (!exists(item)) addError(`data/concerts.js: ${label} ${field} not found: ${item}`);
      }
    }
  }

  const lookupByNum = new Map(lookup.map((person) => [person.num, person]));
  for (const person of alumni) {
    if (person.num && lookupByNum.has(person.num) && lookupByNum.get(person.num).name !== person.name) {
      addWarning(`ALUMNI / NUMBER_LOOKUP name mismatch for ${person.num}: ${person.name} / ${lookupByNum.get(person.num).name}`);
    }
  }

  const blankPhotos = alumni.filter((person) => person.photo === 'blank').length;
  const incompleteParts = alumni.filter((person) => !person.part || !person.tags || !person.tags.length).length;
  info.push(`ALUMNI records: ${alumni.length}; blank photos: ${blankPhotos}; incomplete part/tags: ${incompleteParts}`);
  info.push(`NEWS records: ${news.length}; NUMBER_LOOKUP records: ${lookup.length}; CONCERTS records: ${concerts.length}`);
}

function checkHtmlReferences() {
  const htmlFiles = walk(root, (file) => (
    file.endsWith('.html')
    && !file.includes(`${path.sep}content${path.sep}`)
    && !file.includes(`${path.sep}templates${path.sep}`)
  ));
  const missing = [];
  const referencePattern = /\b(href|src|data-full)=["']([^"']+)["']/g;

  for (const file of htmlFiles) {
    const fileRel = rel(file);
    const text = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = referencePattern.exec(text))) {
      const attr = match[1];
      const raw = match[2];
      if (!raw || raw.startsWith('#') || isExternal(raw)) continue;
      const clean = cleanLocalRef(raw);
      if (!clean || !/\.(html|css|js|png|jpg|jpeg|gif|webp|ico|xml|txt|pdf)$/i.test(clean)) continue;
      const target = path.normalize(path.join(path.dirname(file), clean));
      if (!target.startsWith(root) || !fs.existsSync(target)) {
        missing.push(`${fileRel}: ${attr}="${raw}"`);
      }
    }
  }

  for (const item of missing) addError(`missing local reference: ${item}`);
  info.push(`HTML local references checked: ${htmlFiles.length} files`);
}

function checkPublicHtmlQuality() {
  const publicHtml = walk(root, (file) => (
    file.endsWith('.html')
    && !file.includes(`${path.sep}content${path.sep}`)
    && !file.includes(`${path.sep}_generated${path.sep}`)
    && !file.includes(`${path.sep}templates${path.sep}`)
    && !file.endsWith(`${path.sep}news${path.sep}_template.html`)
  ));

  for (const file of publicHtml) {
    const fileRel = rel(file);
    const text = fs.readFileSync(file, 'utf8');
    if (!/<title>[^<]{5,}<\/title>/i.test(text)) addError(`${fileRel}: missing or short <title>.`);
    if (!/<meta\s+name=["']description["']\s+content=["'][^"']{20,}["']/i.test(text)) {
      addError(`${fileRel}: missing or short meta description.`);
    }
    if (!/<meta\s+property=["']og:title["']/i.test(text)) addError(`${fileRel}: missing og:title.`);
    if (!/<meta\s+property=["']og:description["']/i.test(text)) addError(`${fileRel}: missing og:description.`);

    const ids = [...text.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    for (const id of duplicateIds) addError(`${fileRel}: duplicate id "${id}".`);

    for (const match of text.matchAll(/<img\b[^>]*>/gi)) {
      if (!/\balt=["'][^"']*["']/i.test(match[0])) addError(`${fileRel}: image missing alt: ${match[0].slice(0, 120)}`);
    }

    let anchorDepth = 0;
    for (const match of text.matchAll(/<\/?a\b[^>]*>/gi)) {
      const tag = match[0];
      if (/^<\/a/i.test(tag)) {
        anchorDepth = Math.max(0, anchorDepth - 1);
      } else {
        if (anchorDepth > 0) addError(`${fileRel}: nested <a> near "${tag.slice(0, 80)}".`);
        anchorDepth += 1;
      }
    }
    if (anchorDepth !== 0) addError(`${fileRel}: unbalanced <a> tags.`);

    const activeNav = [...text.matchAll(/<a\b[^>]*class=["'][^"']*\bactive\b[^"']*["'][^>]*>/g)];
    if (activeNav.length !== 1) addError(`${fileRel}: expected exactly 1 active nav link, found ${activeNav.length}.`);
  }

  info.push(`Public HTML quality checked: ${publicHtml.length} files`);
}

function checkSitemapAndFeed() {
  const sitemapUrls = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  for (const url of sitemapUrls) {
    const local = webUrlToLocal(url);
    if (!exists(local)) addError(`sitemap.xml: local file not found for ${url} -> ${local}`);
  }

  const feedLinks = [...read('feed.xml').matchAll(/<link>(https:\/\/cysh\.band\/[^<]+)<\/link>/g)].map((match) => match[1]);
  for (const url of feedLinks) {
    const local = webUrlToLocal(url);
    if (!exists(local)) addError(`feed.xml: local file not found for ${url} -> ${local}`);
  }

  info.push(`sitemap urls checked: ${sitemapUrls.length}; feed links checked: ${feedLinks.length}`);
}

function checkFontUrlEncoding() {
  const files = walk(root, (file) => (
    file.endsWith('.html')
    || file.includes(`${path.sep}templates${path.sep}`)
    || rel(file) === 'scripts/generate-concerts-preview.js'
    || rel(file) === 'scripts/generate-page-preview.js'
  ));
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    if (text.includes('fonts.googleapis.com/css2') && (/&family=|&display=/.test(text))) {
      addError(`${rel(file)}: Google Fonts URL should use &amp;family= / &amp;display= inside HTML.`);
    }
  }
}

function checkGeneratedNewsPages() {
  const { articles, renderArticle } = require('./generate-news-pages');
  for (const article of articles) {
    const outputPath = path.join(root, article.output);
    if (!fs.existsSync(outputPath)) {
      addError(`generated news missing: ${article.output}`);
      continue;
    }
    const expected = renderArticle(article);
    const actual = fs.readFileSync(outputPath, 'utf8');
    if (actual !== expected) {
      addError(`${article.output}: generated HTML is out of sync. Run node scripts/generate-news-pages.js`);
    }
  }
  info.push(`Generated news pages checked: ${articles.length}`);
}

function getAttr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`, 'i'));
  return match ? match[1] : '';
}

function checkPeopleProfilePages() {
  const peopleDir = path.join(root, 'people');
  const profileFiles = fs.readdirSync(peopleDir)
    .filter((name) => name.endsWith('.html'))
    .sort()
    .map((name) => path.join(peopleDir, name));
  const linkedProfiles = new Map((global.ALUMNI || [])
    .filter((person) => person.link && /^people\/[^#]+\.html$/.test(person.link))
    .map((person) => [person.link, person]));

  let blankHeroPhotos = 0;
  let missingOgImageDimensions = 0;

  for (const file of profileFiles) {
    const fileRel = rel(file);
    const num = path.basename(file, '.html');
    const text = fs.readFileSync(file, 'utf8');

    if (!/class=["'][^"']*\bperson-hero\b[^"']*["']/i.test(text)) addError(`${fileRel}: missing person-hero.`);
    if (!/class=["'][^"']*\bperson-article\b[^"']*["']/i.test(text)) addError(`${fileRel}: missing person-article.`);
    if (!/<h3>\s*資料來源\s*<\/h3>/i.test(text)) addError(`${fileRel}: missing 資料來源 heading.`);
    if (!/class=["'][^"']*\bperson-nav\b[^"']*["']/i.test(text)) addError(`${fileRel}: missing person-nav.`);
    if (!text.includes(`PEOPLE．${num}`)) addError(`${fileRel}: page kicker should include PEOPLE．${num}.`);
    if (!/<meta\s+property=["']og:type["']\s+content=["']profile["']/i.test(text)) addError(`${fileRel}: og:type should be profile.`);
    if (!/<meta\s+property=["']og:image:width["']/i.test(text) || !/<meta\s+property=["']og:image:height["']/i.test(text)) {
      missingOgImageDimensions += 1;
    }

    const linkedPerson = linkedProfiles.get(fileRel);
    if (!linkedPerson) {
      addError(`${fileRel}: no matching data/alumni.js link.`);
    } else if (linkedPerson.num && linkedPerson.num !== num) {
      addError(`${fileRel}: data/alumni.js link num mismatch: ${linkedPerson.num} / ${num}`);
    }

    const heroMatch = text.match(/<div\s+class=["'][^"']*\bperson-hero\b[^"']*["'][\s\S]*?<img\b([^>]*)>/i);
    if (!heroMatch) {
      addError(`${fileRel}: missing person hero image.`);
      continue;
    }

    const imgTag = heroMatch[0];
    const src = getAttr(imgTag, 'src');
    const alt = getAttr(imgTag, 'alt');
    if (!src) addError(`${fileRel}: person hero image missing src.`);
    if (!alt) addError(`${fileRel}: person hero image missing alt.`);
    if (src.endsWith('/blank.webp') || src === '../assets/img/members/blank.webp') blankHeroPhotos += 1;
    if (src && !isExternal(src)) {
      const clean = cleanLocalRef(src);
      const target = path.normalize(path.join(path.dirname(file), clean));
      if (!target.startsWith(root) || !fs.existsSync(target)) addError(`${fileRel}: person hero image not found: ${src}`);
    }
  }

  info.push(`People profile pages checked: ${profileFiles.length}; blank hero photos: ${blankHeroPhotos}; missing OG image dimensions: ${missingOgImageDimensions}`);
}

function printReport() {
  console.log('CYSH Band site health check');
  console.log('===========================');
  for (const item of info) console.log(`OK: ${item}`);

  if (warnings.length) {
    console.log('\nWarnings:');
    for (const warning of warnings) console.log(`- ${warning}`);
  }

  if (errors.length) {
    console.error('\nErrors:');
    for (const error of errors) console.error(`- ${error}`);
    console.error(`\nResult: failed with ${errors.length} error(s), ${warnings.length} warning(s).`);
    process.exit(1);
  }

  console.log(`\nResult: ok (${warnings.length} warning(s)).`);
}

checkJsSyntax();
loadData();
checkDataReferences();
checkHtmlReferences();
checkPublicHtmlQuality();
checkSitemapAndFeed();
checkFontUrlEncoding();
checkGeneratedNewsPages();
checkPeopleProfilePages();
printReport();
