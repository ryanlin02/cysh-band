#!/usr/bin/env node
/* 全站健康檢查。
   用法：node scripts/check-site.js */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { hasUnlinkedPeopleNames } = require('./lib/people-auto-link');
const { createAlumniRosterResolver, cleanName } = require('./lib/alumni-roster');

const root = path.join(__dirname, '..');
const errors = [];
const warnings = [];
const info = [];
const ignoredDirs = new Set([
  '.git',
  '20260704_嘉中管樂社官網_校友提供資料'
]);

function rel(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function walk(dir, predicate, results = []) {
  for (const name of fs.readdirSync(dir)) {
    if (ignoredDirs.has(name)) continue;
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

function plainTextFromHtml(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function countCjk(text) {
  return (String(text || '').match(/[\u3400-\u9fff]/g) || []).length;
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
  for (const file of ['data/alumni.js', 'data/news.js', 'data/number-lookup.js', 'data/concerts.js', 'data/people-profiles.js']) {
    require(path.join(root, file));
  }
  require(path.join(root, 'photos', 'profile-links.js'));

  if (!Array.isArray(global.ALUMNI)) addError('data/alumni.js: window.ALUMNI must be an array.');
  if (!Array.isArray(global.NEWS)) addError('data/news.js: window.NEWS must be an array.');
  if (!Array.isArray(global.NUMBER_LOOKUP)) addError('data/number-lookup.js: window.NUMBER_LOOKUP must be an array.');
  if (!Array.isArray(global.CONCERTS)) addError('data/concerts.js: window.CONCERTS must be an array.');
  if (!Array.isArray(global.PEOPLE_PROFILES)) addError('data/people-profiles.js: window.PEOPLE_PROFILES must be an array.');
  if (!Array.isArray(global.PEOPLE_FEATURED_SECTIONS)) addError('data/people-profiles.js: window.PEOPLE_FEATURED_SECTIONS must be an array.');
  if (!global.PEOPLE_PROFILE_LINKS || typeof global.PEOPLE_PROFILE_LINKS !== 'object') addError('photos/profile-links.js: window.PEOPLE_PROFILE_LINKS must be an object.');
}

function checkDataReferences() {
  const alumni = global.ALUMNI || [];
  const news = global.NEWS || [];
  const lookup = global.NUMBER_LOOKUP || [];
  const concerts = global.CONCERTS || [];
  const peopleProfiles = global.PEOPLE_PROFILES || [];
  const featuredSections = global.PEOPLE_FEATURED_SECTIONS || [];

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
    const label = item.title || item.id || item.url || '(untitled news)';
    for (const field of ['id', 'date', 'title', 'summary', 'source', 'output', 'category']) {
      if (!item[field]) addError(`data/news.js: "${label}" missing ${field}.`);
    }
    if (!Array.isArray(item.tags) || !item.tags.length) addError(`data/news.js: "${label}" tags must be a non-empty array.`);
    if (item.output && item.url && item.output !== item.url) addError(`data/news.js: "${label}" output/url mismatch: ${item.output} / ${item.url}`);
    if (item.source && !exists(item.source)) addError(`data/news.js: missing news source for "${label}": ${item.source}`);
    if (!item.url || !exists(item.url)) addError(`data/news.js: missing news page: ${item.url || '(empty url)'}`);
    if (item.thumb && !/^https?:\/\//i.test(item.thumb) && !exists(item.thumb)) addError(`data/news.js: missing news thumb for "${item.title}": ${item.thumb}`);
  }

  const alumniByNum = new Map(alumni.filter((person) => person.num).map((person) => [person.num, person]));
  const alumniByLink = new Map(alumni.filter((person) => person.link).map((person) => [person.link, person]));
  const profileIds = new Set();
  for (const profile of peopleProfiles) {
    const key = profile.id || profile.num;
    const label = `${key || 'no-id'} ${profile.name || '(missing name)'}`;
    if (!key) addError(`data/people-profiles.js: missing id/num for ${label}`);
    if (key && profileIds.has(key)) addError(`data/people-profiles.js: duplicate id/num: ${key}`);
    if (key) profileIds.add(key);
    for (const field of ['name', 'source', 'output', 'title', 'description', 'headlineHtml', 'photo', 'sourceHtml']) {
      if (!profile[field]) addError(`data/people-profiles.js: ${label} missing ${field}.`);
    }
    if (profile.source && !exists(profile.source)) addError(`data/people-profiles.js: ${label} source not found: ${profile.source}`);
    if (profile.output && !exists(profile.output)) addError(`data/people-profiles.js: ${label} output not found: ${profile.output}`);
    if (profile.photo && !isExternal(profile.photo)) {
      const target = path.normalize(path.join(root, profile.output ? path.dirname(profile.output) : 'people', cleanLocalRef(profile.photo)));
      if (!target.startsWith(root) || !fs.existsSync(target)) {
        addError(`data/people-profiles.js: ${label} photo not found: ${profile.photo}`);
      }
    }
    if (!Array.isArray(profile.facts) || !profile.facts.length) addError(`data/people-profiles.js: ${label} facts must be a non-empty array.`);
    if (!Array.isArray(profile.relatedLinks)) addError(`data/people-profiles.js: ${label} relatedLinks must be an array.`);
    for (const [index, link] of (profile.relatedLinks || []).entries()) {
      if (!link.label || !link.url || !link.type) addError(`data/people-profiles.js: ${label} relatedLinks[${index}] missing label/url/type.`);
    }
    const alumniPerson = profile.num ? alumniByNum.get(profile.num) : alumniByLink.get(profile.output);
    if (!alumniPerson) {
      addError(`data/people-profiles.js: ${label} no matching data/alumni.js record.`);
    } else if (alumniPerson.link !== profile.output) {
      addError(`data/people-profiles.js: ${label} output mismatch with data/alumni.js link: ${profile.output} / ${alumniPerson.link}`);
    } else if (alumniPerson.photo && alumniPerson.photo !== 'blank') {
      const profilePhoto = String(profile.photo || '')
        .replace(/^\.\.\//, '')
        .replace(/^assets\/img\/members\//, '')
        .replace(/\.webp$/, '');
      if (profilePhoto && profilePhoto !== alumniPerson.photo) {
        addError(`data/people-profiles.js: ${label} photo mismatch with data/alumni.js: ${profilePhoto} / ${alumniPerson.photo}`);
      }
    }
  }

  const profileByNum = new Map(peopleProfiles.map((profile) => [profile.id || profile.num, profile]));
  const featuredIds = new Set();
  let featuredCardCount = 0;
  let featuredSummaryMin = Infinity;
  let featuredSummaryMax = 0;
  let featuredSummaryCjkMin = Infinity;
  let featuredSummaryCjkMax = 0;
  for (const [sectionIndex, section] of featuredSections.entries()) {
    const sectionLabel = section && section.title ? section.title : `section ${sectionIndex + 1}`;
    if (!section || typeof section !== 'object') {
      addError(`data/people-profiles.js: PEOPLE_FEATURED_SECTIONS[${sectionIndex}] must be an object.`);
      continue;
    }
    if (!section.title) addError(`data/people-profiles.js: PEOPLE_FEATURED_SECTIONS[${sectionIndex}] missing title.`);
    if (!Array.isArray(section.items) || !section.items.length) {
      addError(`data/people-profiles.js: PEOPLE_FEATURED_SECTIONS "${sectionLabel}" must have items.`);
      continue;
    }
    for (const [itemIndex, item] of section.items.entries()) {
      const itemLabel = `${sectionLabel} item ${itemIndex + 1}`;
      if (!item || typeof item !== 'object') {
        addError(`data/people-profiles.js: ${itemLabel} must be an object.`);
        continue;
      }
      const id = item.profile || item.id;
      if (!id) addError(`data/people-profiles.js: ${itemLabel} missing profile/id.`);
      if (id && featuredIds.has(id)) addError(`data/people-profiles.js: duplicate PEOPLE_FEATURED card id: ${id}`);
      if (id) featuredIds.add(id);
      featuredCardCount += 1;
      if (!item.role) addError(`data/people-profiles.js: ${itemLabel} missing role.`);
      if (!item.summaryHtml) addError(`data/people-profiles.js: ${itemLabel} missing summaryHtml.`);
      if (item.summaryHtml) {
        const summaryText = plainTextFromHtml(item.summaryHtml).trim();
        const summaryLength = summaryText.length;
        const summaryCjkLength = countCjk(summaryText);
        featuredSummaryMin = Math.min(featuredSummaryMin, summaryLength);
        featuredSummaryMax = Math.max(featuredSummaryMax, summaryLength);
        featuredSummaryCjkMin = Math.min(featuredSummaryCjkMin, summaryCjkLength);
        featuredSummaryCjkMax = Math.max(featuredSummaryCjkMax, summaryCjkLength);
        if (summaryLength < 105 || summaryLength > 145) {
          addWarning(`data/people-profiles.js: ${itemLabel} summary visible length ${summaryLength} outside recommended 105-145.`);
        }
        if (summaryCjkLength < 75 || summaryCjkLength > 115) {
          addWarning(`data/people-profiles.js: ${itemLabel} summary CJK length ${summaryCjkLength} outside recommended 75-115.`);
        }
      }

      if (item.profile) {
        if (!profileByNum.has(item.profile)) {
          addError(`data/people-profiles.js: ${itemLabel} references missing PEOPLE_PROFILES profile: ${item.profile}`);
        }
      } else {
        for (const field of ['id', 'name', 'numHtml', 'photo']) {
          if (!item[field]) addError(`data/people-profiles.js: ${itemLabel} missing ${field}.`);
        }
        const alumniPerson = item.id ? alumniByNum.get(item.id) : null;
        if (alumniPerson && item.name !== alumniPerson.name && item.officialName !== alumniPerson.name) {
          addError(`data/people-profiles.js: ${itemLabel} name "${item.name}" does not match ALUMNI name "${alumniPerson.name}" and has no matching officialName.`);
        }
        if (item.photo && !exists(item.photo)) addError(`data/people-profiles.js: ${itemLabel} photo not found: ${item.photo}`);
      }
    }
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
    if (concert.videos && !Array.isArray(concert.videos)) {
      addError(`data/concerts.js: ${label} videos must be an array.`);
    }
    for (const [index, video] of (concert.videos || []).entries()) {
      if (!video || typeof video !== 'object') {
        addError(`data/concerts.js: ${label} videos[${index}] must be an object.`);
        continue;
      }
      if (!video.label) addError(`data/concerts.js: ${label} videos[${index}] missing label.`);
      if (!video.url) addError(`data/concerts.js: ${label} videos[${index}] missing url.`);
      if (video.url && !/^https?:\/\//i.test(video.url)) addError(`data/concerts.js: ${label} videos[${index}] url must be http(s): ${video.url}`);
    }
    for (const field of ['conductors', 'soloists', 'organizers', 'performers']) {
      if (concert[field] && !Array.isArray(concert[field])) {
        addError(`data/concerts.js: ${label} ${field} must be an array.`);
        continue;
      }
      for (const [index, person] of (concert[field] || []).entries()) {
        if (!person || typeof person !== 'object') {
          addError(`data/concerts.js: ${label} ${field}[${index}] must be an object.`);
          continue;
        }
        if (!person.name) addError(`data/concerts.js: ${label} ${field}[${index}] missing name.`);
        if (field !== 'soloists' && !person.role) addError(`data/concerts.js: ${label} ${field}[${index}] missing role.`);
      }
    }
  }

  const rosterResolver = createAlumniRosterResolver(alumni);
  let rosterEntries = 0;
  let rosterResolved = 0;
  let rosterAmbiguous = 0;
  let rosterUnmatched = 0;
  const checkRosterEntry = (entry) => {
    if (!entry) return;
    if (typeof entry === 'object' && !entry.name && !entry.text) return;
    const resolved = rosterResolver.resolveEntry(entry.text || entry);
    if (!resolved || !resolved.name) return;
    rosterEntries += 1;
    if (resolved.num) {
      rosterResolved += 1;
      return;
    }
    const matches = rosterResolver.byName.get(cleanName(resolved.name)) || [];
    if (matches.length > 1) rosterAmbiguous += 1;
    else rosterUnmatched += 1;
  };

  for (const concert of concerts) {
    for (const field of ['conductors', 'soloists', 'organizers', 'performers']) {
      for (const person of concert[field] || []) checkRosterEntry(person);
    }
    for (const field of ['performerGroups', 'performerSupplementGroups']) {
      for (const group of concert[field] || []) {
        for (const person of group.people || group.members || []) checkRosterEntry(person);
      }
    }
    for (const row of concert.adminRows || []) {
      for (const person of row.people || row.members || []) checkRosterEntry(person);
    }
  }
  info.push(`Concert roster alumni cross-check: entries ${rosterEntries}; numbered or unique ${rosterResolved}; ambiguous ${rosterAmbiguous}; unmatched/non-alumni ${rosterUnmatched}`);

  const lookupByNum = new Map(lookup.map((person) => [person.num, person]));
  for (const person of alumni) {
    if (person.num && lookupByNum.has(person.num) && lookupByNum.get(person.num).name !== person.name) {
      addWarning(`ALUMNI / NUMBER_LOOKUP name mismatch for ${person.num}: ${person.name} / ${lookupByNum.get(person.num).name}`);
    }
  }

  const blankPhotos = alumni.filter((person) => person.photo === 'blank').length;
  const incompleteParts = alumni.filter((person) => !person.part || !person.tags || !person.tags.length).length;
  info.push(`ALUMNI records: ${alumni.length}; blank photos: ${blankPhotos}; incomplete part/tags: ${incompleteParts}`);
  info.push(`NEWS records: ${news.length}; NUMBER_LOOKUP records: ${lookup.length}; CONCERTS records: ${concerts.length}; PEOPLE_PROFILES records: ${peopleProfiles.length}; PEOPLE_FEATURED cards: ${featuredCardCount}`);
  if (featuredCardCount) {
    info.push(`PEOPLE_FEATURED summary length: visible ${featuredSummaryMin}-${featuredSummaryMax}; CJK ${featuredSummaryCjkMin}-${featuredSummaryCjkMax}`);
  }
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
    if (!/<link\s+rel=["']canonical["']\s+href=["']https:\/\/cysh\.band\/[^"']*["']\s*>/i.test(text)) {
      addError(`${fileRel}: missing canonical URL.`);
    }

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

function expectedAssetPrefix(fileRel) {
  const dir = path.dirname(fileRel);
  if (dir === '.') return '';
  return '../'.repeat(dir.split('/').length);
}

function checkSharedChromeConsistency() {
  const publicHtml = walk(root, (file) => (
    file.endsWith('.html')
    && !file.includes(`${path.sep}content${path.sep}`)
    && !file.includes(`${path.sep}_generated${path.sep}`)
    && !file.includes(`${path.sep}templates${path.sep}`)
    && !file.endsWith(`${path.sep}news${path.sep}_template.html`)
    && !file.includes(`${path.sep}photos${path.sep}`)
    && rel(file) !== 'gallery.html'
  ));

  const navTargets = [
    ['news/index.html', '最新消息'],
    ['about.html', '關於'],
    ['history.html', '傳承'],
    ['numbers.html', '編號'],
    ['people.html', '人物誌'],
    ['roster.html', '名錄'],
    ['concerts.html', '校友聯演'],
    ['photos/', '影像館']
  ];
  const footerTargets = [
    ['about.html', '關於'],
    ['history.html', '傳承'],
    ['numbers.html', '編號'],
    ['people.html', '人物誌'],
    ['roster.html', '名錄'],
    ['concerts.html', '校友聯演'],
    ['news/index.html', '最新消息'],
    ['support.html', '支持我們'],
    ['photos/', '影像館']
  ];

  for (const file of publicHtml) {
    const fileRel = rel(file);
    const text = fs.readFileSync(file, 'utf8');
    const prefix = expectedAssetPrefix(fileRel);

    if (!text.includes('<nav class="nav">')) addError(`${fileRel}: missing shared top navigation.`);
    if (!text.includes(`href="${prefix}index.html"`)) addError(`${fileRel}: shared top navigation missing brand link -> ${prefix}index.html.`);
    for (const [target, label] of navTargets) {
      if (!text.includes(`href="${prefix}${target}"`) || !text.includes(`>${label}</a>`)) {
        addError(`${fileRel}: shared top navigation missing ${label} -> ${prefix}${target}.`);
      }
    }
    for (const target of ['roster.html', 'photos/']) {
      const escapedTarget = `${prefix}${target}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const memberLink = new RegExp(`<a\\b[^>]*href=["']${escapedTarget}["'][^>]*\\bdata-member-only\\b`, 'i');
      if (!memberLink.test(text)) {
        addError(`${fileRel}: shared top navigation missing member-only marker -> ${prefix}${target}.`);
      }
    }

    if (!text.includes('<footer class="footer">')) addError(`${fileRel}: missing shared footer.`);
    if (text.includes('第 41 屆聯合音樂會《為伍》</h4>')) {
      addError(`${fileRel}: footer still contains event-specific legacy block.`);
    }
    if (!text.includes('<h4>網站導覽</h4>')) addError(`${fileRel}: shared footer missing 網站導覽 group.`);
    if (!text.includes('<h4>追蹤與支持</h4>')) addError(`${fileRel}: shared footer missing 追蹤與支持 group.`);
    for (const socialUrl of ['https://www.facebook.com/cyshband/', 'https://www.instagram.com/cyshband_95th', 'https://www.youtube.com/channel/UCMwqOn_zvwqoa3snL3j_iWA']) {
      if (!text.includes(`href="${socialUrl}"`)) addError(`${fileRel}: shared footer missing official social link ${socialUrl}.`);
    }
    for (const [target, label] of footerTargets) {
      if (!text.includes(`href="${prefix}${target}"`) || !text.includes(`>${label}</a>`)) {
        addError(`${fileRel}: shared footer missing ${label} -> ${prefix}${target}.`);
      }
    }
  }

  info.push(`Shared nav/footer consistency checked: ${publicHtml.length} files`);
}

function checkSitemapAndFeed() {
  const sitemapUrls = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const protectedUrls = new Set([
    'https://cysh.band/roster.html',
    'https://cysh.band/photos/'
  ]);
  for (const url of protectedUrls) {
    if (sitemapUrls.includes(url)) addError(`sitemap.xml: protected member page must not be listed: ${url}`);
  }
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

function checkMemberAccessPrivacy() {
  const roster = read('roster.html');
  const photos = read('photos/index.html');
  const robots = read('robots.txt');
  const llms = read('llms.txt');

  for (const [file, html] of [['roster.html', roster], ['photos/index.html', photos]]) {
    if (!/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex[^"']*nofollow[^"']*noarchive/i.test(html)) {
      addError(`${file}: protected member page must declare noindex, nofollow, noarchive.`);
    }
  }
  if (!robots.includes('Disallow: /roster.html')) addError('robots.txt: missing protected roster disallow rule.');
  if (!robots.includes('Disallow: /photos/')) addError('robots.txt: missing protected photos disallow rule.');
  if (/https:\/\/cysh\.band\/(?:roster\.html|photos\/)/.test(llms)) {
    addError('llms.txt: protected member pages must not be advertised.');
  }
  if (!read('templates/partials/nav.html').includes('data-member-only')) {
    addError('templates/partials/nav.html: member-only navigation markers are missing.');
  }
  info.push('Member access privacy markers checked: roster, photos, robots, sitemap, llms, nav');
}

function checkStructuredData() {
  const indexHtml = read('index.html');
  const blocks = [...indexHtml.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim());
  const jsonLd = [];
  for (const [index, block] of blocks.entries()) {
    try {
      jsonLd.push(JSON.parse(block));
    } catch (error) {
      addError(`index.html: JSON-LD block ${index + 1} is invalid JSON: ${error.message}`);
    }
  }

  const events = jsonLd.filter((item) => {
    const type = item && item['@type'];
    return type === 'Event' || type === 'MusicEvent' || (Array.isArray(type) && (type.includes('Event') || type.includes('MusicEvent')));
  });
  for (const event of events) {
    const label = event.name || '(unnamed event)';
    for (const field of ['name', 'startDate', 'endDate', 'eventStatus', 'eventAttendanceMode', 'location', 'image', 'description', 'organizer', 'performer']) {
      if (!event[field]) addError(`index.html: MusicEvent "${label}" missing JSON-LD field ${field}.`);
    }
    if (event.offers && (!event.offers['@type'] || !event.offers.url || !event.offers.priceCurrency || event.offers.price === undefined)) {
      addError(`index.html: MusicEvent "${label}" offers should include @type, a direct ticket URL, priceCurrency, and price.`);
    }
  }
  info.push(`JSON-LD checked: ${jsonLd.length} blocks; events: ${events.length}`);
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
  const { articles, renderArticle, renderNewsIndex, renderFeed } = require('./generate-news-pages');
  const activePins = articles.filter((article) => article.pinned && article.pinUntil && article.pinUntil >= new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Taipei' }));
  const missingPinUntil = articles.filter((article) => article.pinned && !article.pinUntil);
  if (missingPinUntil.length) addError(`news data: pinned article(s) missing pinUntil: ${missingPinUntil.map((article) => article.id).join(', ')}.`);
  if (activePins.length > 1) addError(`news data: at most one active pinned article is allowed, found ${activePins.map((article) => article.id).join(', ')}.`);
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
  const expectedIndex = renderNewsIndex();
  const actualIndex = read('news/index.html');
  if (actualIndex !== expectedIndex) {
    addError('news/index.html: generated HTML is out of sync. Run node scripts/generate-news-pages.js');
  }
  const expectedFeed = renderFeed();
  const actualFeed = read('feed.xml');
  if (actualFeed !== expectedFeed) {
    addError('feed.xml: generated RSS is out of sync. Run node scripts/generate-news-pages.js');
  }
  info.push(`Generated news pages checked: ${articles.length}`);
}

function checkGeneratedCorePages() {
  const { pages, renderCorePage } = require('./generate-core-pages');
  for (const page of pages) {
    const outputPath = path.join(root, page.output);
    if (!fs.existsSync(outputPath)) {
      addError(`generated core page missing: ${page.output}`);
      continue;
    }
    const expected = `${renderCorePage(page).trim()}\n`;
    const actual = fs.readFileSync(outputPath, 'utf8');
    if (actual !== expected) {
      addError(`${page.output}: generated HTML is out of sync. Run node scripts/generate-core-pages.js`);
    }
  }
  info.push(`Generated core pages checked: ${pages.length}`);
}

function checkGeneratedPeoplePages() {
  const { profiles, renderProfile } = require('./generate-people-pages');
  for (const profile of profiles) {
    const outputPath = path.join(root, profile.output);
    if (!fs.existsSync(outputPath)) {
      addError(`generated people page missing: ${profile.output}`);
      continue;
    }
    const expected = renderProfile(profile);
    const actual = fs.readFileSync(outputPath, 'utf8');
    if (actual !== expected) {
      addError(`${profile.output}: generated HTML is out of sync. Run node scripts/generate-people-pages.js`);
    }
  }
  info.push(`Generated people pages checked: ${profiles.length}`);
}

function checkGeneratedPeopleIndex() {
  const { renderPeopleIndex } = require('./generate-people-index');
  const expected = renderPeopleIndex();
  const actual = read('people.html');
  if (actual !== expected) {
    addError('people.html: generated HTML is out of sync. Run node scripts/generate-people-index.js');
  }
  info.push('Generated people index checked: people.html');
}

function checkGeneratedConcertsIndex() {
  const { renderConcertsIndex } = require('./generate-concerts-index');
  const expected = renderConcertsIndex();
  const actual = read('concerts.html');
  if (actual !== expected) {
    addError('concerts.html: generated archive is out of sync. Run node scripts/generate-concerts-index.js');
  }
  info.push('Generated concerts archive checked: concerts.html');
}

function checkPeopleIndexCards() {
  const text = read('people.html');
  const cardRegex = /<div class="card" id="p-([^"]+)">([\s\S]*?)(?=\n\s*<div class="card" id="p-[^"]+">|\n\s*<\/div>\s*(?:<p class="muted"|<\/section>))/g;
  const cards = [...text.matchAll(cardRegex)].map((match) => ({ id: match[1], html: match[2] }));
  const alumniByNum = new Map((global.ALUMNI || [])
    .filter((person) => person.num)
    .map((person) => [person.num, person]));
  const profileByNum = new Map((global.PEOPLE_PROFILES || [])
    .map((profile) => [profile.id || profile.num, profile]));
  const featuredById = new Map();
  for (const section of global.PEOPLE_FEATURED_SECTIONS || []) {
    for (const item of section.items || []) {
      featuredById.set(item.profile || item.id, item);
    }
  }

  for (const card of cards) {
    const name = (card.html.match(/<h3>([\s\S]*?)<\/h3>/) || [null, ''])[1].replace(/<[^>]+>/g, '').trim();
    const avatar = (card.html.match(/<img class="avatar" src="assets\/img\/members\/([^"/]+)\.webp"/) || [null, ''])[1];
    const headLink = (card.html.match(/<a class="card-head" href="people\/([^"#]+)\.html"/) || [null, ''])[1];
    const moreLink = (card.html.match(/<p class="more"><a href="people\/([^"#]+)\.html"/) || [null, ''])[1];
    const alumni = alumniByNum.get(card.id);
    const profile = profileByNum.get(card.id);
    const featured = featuredById.get(card.id);

    if (headLink && !profileByNum.has(headLink)) addError(`people.html#p-${card.id}: card-head links to missing profile people/${headLink}.html.`);
    if (profile && headLink !== card.id) addError(`people.html#p-${card.id}: card-head should link to people/${card.id}.html.`);
    if (profile && moreLink !== card.id) addError(`people.html#p-${card.id}: more link should point to people/${card.id}.html.`);
    if (profile && profile.name !== name) addError(`people.html#p-${card.id}: card name "${name}" does not match PEOPLE_PROFILES name "${profile.name}".`);
    if (alumni && alumni.name !== name && (!featured || featured.officialName !== alumni.name)) {
      addError(`people.html#p-${card.id}: card name "${name}" does not match ALUMNI name "${alumni.name}".`);
    }
    if (alumni && avatar !== alumni.photo) addError(`people.html#p-${card.id}: card avatar "${avatar}" does not match ALUMNI photo "${alumni.photo}".`);
    if (profile) {
      const profileAvatar = (profile.photo.match(/members\/([^/]+)\.webp$/) || [null, ''])[1];
      if (profileAvatar && avatar !== profileAvatar) addError(`people.html#p-${card.id}: card avatar "${avatar}" does not match PEOPLE_PROFILES photo "${profileAvatar}".`);
    }
  }

  info.push(`People index cards checked: ${cards.length}`);
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
    if (!/<script\s+type=["']application\/ld\+json["']>[\s\S]*"@type":\s*"Person"[\s\S]*<\/script>/i.test(text)) {
      addError(`${fileRel}: missing Person JSON-LD.`);
    }
    if (num !== 'linshaofan' && !text.includes(`../photos/#/person-num/${num}`)) {
      addError(`${fileRel}: missing gallery person-num link.`);
    }
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

function checkGalleryProfileLinks() {
  const links = global.PEOPLE_PROFILE_LINKS || {};
  const byNum = links.byNum || {};
  const byId = links.byId || {};
  const profiles = global.PEOPLE_PROFILES || [];
  const expectedNums = new Set();
  const expectedIds = new Set();

  for (const profile of profiles) {
    const key = profile.id || profile.num;
    const record = profile.num ? byNum[profile.num] : byId[key];
    const label = `${key || 'no-id'} ${profile.name || '(missing name)'}`;
    if (profile.num) expectedNums.add(profile.num);
    else if (key) expectedIds.add(key);
    if (!record) {
      addError(`photos/profile-links.js: missing profile link for ${label}. Run node scripts/generate-gallery-profile-links.js`);
      continue;
    }
    const expectedUrl = `../${profile.output}`;
    const expectedPhoto = `../${String(profile.photo || '').replace(/^\.\.\//, '')}`;
    if (record.name !== profile.name) addError(`photos/profile-links.js: ${label} name mismatch: ${record.name} / ${profile.name}`);
    if (record.url !== expectedUrl) addError(`photos/profile-links.js: ${label} url mismatch: ${record.url} / ${expectedUrl}`);
    if (record.photo !== expectedPhoto) addError(`photos/profile-links.js: ${label} photo mismatch: ${record.photo} / ${expectedPhoto}`);
    for (const field of ['url', 'photo']) {
      const value = cleanLocalRef(record[field] || '');
      if (!value || isExternal(value)) continue;
      const target = path.normalize(path.join(root, 'photos', value));
      if (!target.startsWith(root) || !fs.existsSync(target)) {
        addError(`photos/profile-links.js: ${label} ${field} not found: ${record[field]}`);
      }
    }
  }

  for (const num of Object.keys(byNum)) {
    if (!expectedNums.has(num)) addError(`photos/profile-links.js: stale byNum record: ${num}`);
  }
  for (const id of Object.keys(byId)) {
    if (!expectedIds.has(id)) addError(`photos/profile-links.js: stale byId record: ${id}`);
  }
  info.push(`Gallery profile links checked: byNum ${Object.keys(byNum).length}; byId ${Object.keys(byId).length}`);
}

function checkPeopleNameLinks() {
  const profiles = global.PEOPLE_PROFILES || [];
  const files = walk(root, (file) => file.endsWith('.html'));
  const outOfSync = [];
  for (const file of files) {
    const fileRel = rel(file);
    const html = fs.readFileSync(file, 'utf8');
    if (hasUnlinkedPeopleNames(html, fileRel, profiles)) outOfSync.push(fileRel);
  }
  if (outOfSync.length) {
    addError(`people name links out of sync in ${outOfSync.length} file(s). Run node scripts/link-people-names.js: ${outOfSync.join(', ')}`);
  }
  info.push(`People name auto-links checked: ${files.length} HTML files`);
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
checkSharedChromeConsistency();
checkSitemapAndFeed();
checkMemberAccessPrivacy();
checkStructuredData();
checkFontUrlEncoding();
checkGeneratedCorePages();
checkGeneratedNewsPages();
checkGeneratedPeoplePages();
checkGeneratedPeopleIndex();
checkGeneratedConcertsIndex();
checkPeopleIndexCards();
checkPeopleProfilePages();
checkGalleryProfileLinks();
checkPeopleNameLinks();
printReport();
