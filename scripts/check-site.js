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
    for (const field of ['ogImage', 'ogImageWidth', 'ogImageHeight']) {
      if (!item[field]) addError(`data/news.js: "${label}" missing representative image field ${field}.`);
    }
    if (!Array.isArray(item.tags) || item.tags.length < 2 || item.tags.length > 5) {
      addError(`data/news.js: "${label}" tags must contain 2 to 5 entries.`);
    } else if (new Set(item.tags).size !== item.tags.length) {
      addError(`data/news.js: "${label}" tags must not contain duplicates.`);
    }
    if (item.listTitle !== undefined && !String(item.listTitle).trim()) {
      addError(`data/news.js: "${label}" listTitle must not be blank when provided.`);
    }
    if (item.output && item.url && item.output !== item.url) addError(`data/news.js: "${label}" output/url mismatch: ${item.output} / ${item.url}`);
    if (item.source && !exists(item.source)) addError(`data/news.js: missing news source for "${label}": ${item.source}`);
    if (!item.url || !exists(item.url)) addError(`data/news.js: missing news page: ${item.url || '(empty url)'}`);
    if (item.thumb && !/^https?:\/\//i.test(item.thumb) && !exists(item.thumb)) addError(`data/news.js: missing news thumb for "${item.title}": ${item.thumb}`);
    if (item.ogImage && !/^https?:\/\//i.test(item.ogImage) && !exists(item.ogImage.split('?')[0])) {
      addError(`data/news.js: missing representative image for "${item.title}": ${item.ogImage}`);
    }
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
    if (concert.onlineProgramBook) {
      const book = concert.onlineProgramBook;
      if (!book || typeof book !== 'object') {
        addError(`data/concerts.js: ${label} onlineProgramBook must be an object.`);
      } else {
        if (!book.label) addError(`data/concerts.js: ${label} onlineProgramBook missing label.`);
        if (!book.url) {
          addError(`data/concerts.js: ${label} onlineProgramBook missing url.`);
        } else if (isExternal(book.url)) {
          addError(`data/concerts.js: ${label} onlineProgramBook must use a local site path: ${book.url}`);
        } else {
          const programBookEntry = cleanLocalRef(book.url).replace(/\/?$/, '/index.html');
          if (!exists(programBookEntry)) {
            addError(`data/concerts.js: ${label} onlineProgramBook entry not found: ${programBookEntry}`);
          }
        }
      }
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

    const isStandalonePage = /<html\b[^>]*\bdata-page-shell=["']standalone["']/i.test(text);
    const activeNav = [...text.matchAll(/<a\b[^>]*class=["'][^"']*\bactive\b[^"']*["'][^>]*>/g)];
    if (!isStandalonePage && activeNav.length !== 1) {
      addError(`${fileRel}: expected exactly 1 active nav link, found ${activeNav.length}.`);
    }
  }

  info.push(`Public HTML quality checked: ${publicHtml.length} files`);
}

function checkAboutPageImages() {
  const file = path.join(root, 'about.html');
  if (!fs.existsSync(file)) {
    addError('about.html: missing generated page.');
    return;
  }

  const text = fs.readFileSync(file, 'utf8');
  const expectedImages = [
    { src: 'assets/img/about/about-ensemble-1280.webp', width: 1280, height: 640 },
    { src: 'assets/img/about/about-student-rehearsal-1072.webp', width: 1072, height: 536 },
    { src: 'assets/img/about/about-alumni-band-1280.webp', width: 1280, height: 640 },
    { src: 'assets/img/about/about-brass-section-1064.webp', width: 1064, height: 532 },
    { src: 'assets/img/about/about-support-rehearsal-1280.webp', width: 1280, height: 640 }
  ];
  const imageTags = [...text.matchAll(/<figure\b[^>]*class=["'][^"']*\babout-photo\b[^"']*["'][^>]*>[\s\S]*?<img\b([^>]+)>[\s\S]*?<\/figure>/gi)]
    .map((match) => `<img ${match[1]}>`);

  if (imageTags.length !== expectedImages.length) {
    addError(`about.html: expected ${expectedImages.length} editorial images, found ${imageTags.length}.`);
  }

  imageTags.forEach((tag, index) => {
    const label = `about.html editorial image ${index + 1}`;
    const expected = expectedImages[index];
    if (expected && !tag.includes(`src="${expected.src}"`)) {
      addError(`${label}: representative source mismatch; expected ${expected.src}.`);
    }
    if (!/\balt=["'][^"']+["']/i.test(tag)) addError(`${label}: missing descriptive alt text.`);
    if (expected && (!tag.includes(`width="${expected.width}"`) || !tag.includes(`height="${expected.height}"`))) {
      addError(`${label}: intrinsic dimensions must match the centered 2:1 crop (${expected.width}x${expected.height}).`);
    }
    if (!/\bsrcset=["'][^"']+\b640w\b[^"']+\b800w\b[^"']+["']/i.test(tag) || !/\bsizes=["'][^"']+640px[^"']*["']/i.test(tag)) {
      addError(`${label}: missing 640px/800px responsive sources or 640px display cap.`);
    }
    if (!/\bdecoding=["']async["']/i.test(tag)) addError(`${label}: decoding should be async.`);
    if (!/\bloading=["']lazy["']/i.test(tag)) {
      addError(`${label}: supplementary image should be lazy loaded.`);
    }
  });

  if (!/<meta\s+property=["']og:image["']\s+content=["']https:\/\/cysh\.band\/assets\/img\/about\/about-ensemble-1280\.webp["']/i.test(text)) {
    addError('about.html: og:image should use the visible lead image.');
  }
  if (!/<meta\s+property=["']og:image:height["']\s+content=["']640["']/i.test(text)) {
    addError('about.html: og:image dimensions should match the 1280x640 cropped image.');
  }
  if (!/css\/style\.css\?v=20260728-about-photo-r2/i.test(text)) {
    addError('about.html: stylesheet cache version must protect the corrected image dimensions.');
  }
  const css = fs.readFileSync(path.join(root, 'css', 'style.css'), 'utf8');
  if (!/\.about-photo\s*\{[\s\S]*?max-width:\s*40rem/i.test(css)
      || !/\.about-photo img\s*\{[\s\S]*?aspect-ratio:\s*2\s*\/\s*1[\s\S]*?object-fit:\s*cover/i.test(css)) {
    addError('css/style.css: about photos must use a 40rem maximum width and centered 2:1 crop.');
  }
  info.push(`About page editorial images checked: ${imageTags.length}`);
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
    if (/<html\b[^>]*\bdata-page-shell=["']standalone["']/i.test(text)) continue;

    if (!text.includes('<nav class="nav">')) addError(`${fileRel}: missing shared top navigation.`);
    if (!text.includes(`href="${prefix}index.html"`)) addError(`${fileRel}: shared top navigation missing brand link -> ${prefix}index.html.`);
    for (const [target, label] of navTargets) {
      if (!text.includes(`href="${prefix}${target}"`) || !text.includes(`>${label}</a>`)) {
        addError(`${fileRel}: shared top navigation missing ${label} -> ${prefix}${target}.`);
      }
    }
    for (const target of ['photos/']) {
      const escapedTarget = `${prefix}${target}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const memberLink = new RegExp(`<a\\b[^>]*href=["']${escapedTarget}["'][^>]*\\bdata-member-only\\b`, 'i');
      if (!memberLink.test(text)) {
        addError(`${fileRel}: shared top navigation missing member-only marker -> ${prefix}${target}.`);
      }
    }
    const rosterTarget = `${prefix}roster.html`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rosterMemberLink = new RegExp(`<a\\b[^>]*href=["']${rosterTarget}["'][^>]*\\bdata-member-only\\b`, 'i');
    if (rosterMemberLink.test(text)) {
      addError(`${fileRel}: public roster navigation must not use a member-only marker -> ${prefix}roster.html.`);
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

function checkConcertProgramBooks() {
  const programBookPages = walk(path.join(root, 'concerts'), (file) => (
    file.endsWith('.html')
    && !file.includes(`${path.sep}templates${path.sep}`)
  )).filter((file) => /<html\b[^>]*\bdata-page-type=["']concert-program-book["']/i.test(fs.readFileSync(file, 'utf8')));

  for (const file of programBookPages) {
    const fileRel = rel(file);
    const text = fs.readFileSync(file, 'utf8');
    const entryDir = path.dirname(file);

    if (!/<html\b[^>]*\bdata-page-shell=["']standalone["']/i.test(text)) {
      addError(`${fileRel}: concert program book must use data-page-shell="standalone".`);
    }
    if (!text.includes('assets/program-book/program-book.css')) {
      addError(`${fileRel}: missing shared program-book stylesheet.`);
    }
    if (!text.includes('assets/program-book/program-book.js')) {
      addError(`${fileRel}: missing shared program-book runtime.`);
    }
    if (!text.includes('G-PEWFLMMJNZ')) {
      addError(`${fileRel}: missing GA4 measurement tag.`);
    }
    if (!/<script\b[^>]*src=["']data\/[^"']+\.js(?:\?[^"']*)?["'][^>]*\bdefer\b/i.test(text)) {
      addError(`${fileRel}: missing deferred per-concert data script under data/.`);
    }
    if (!/\bid=["']home-btn["']/i.test(text)) addError(`${fileRel}: missing home icon button.`);
    if (!/\bid=["']share-btn["']/i.test(text)) addError(`${fileRel}: missing share button.`);
    if (!/\bid=["']theme-toggle-btn["']/i.test(text)) addError(`${fileRel}: missing theme button.`);
    if (!/\bid=["']program-book-title["']/i.test(text)) addError(`${fileRel}: missing centered program-book title.`);
    if (!/\bid=["']program-content["']/i.test(text)) addError(`${fileRel}: missing main program content target.`);
    if (!/<nav\b[^>]*class=["'][^"']*\bbottom-nav\b/i.test(text)) addError(`${fileRel}: missing bottom program navigation.`);
    const navItems = [...text.matchAll(/<button\b[^>]*class=["'][^"']*\bnav-item\b[^"']*["'][^>]*>/gi)];
    if (navItems.length !== 5) addError(`${fileRel}: expected exactly 5 bottom navigation items, found ${navItems.length}.`);
    if (!/<button\b[^>]*class=["'][^"']*\bnav-item\b[^"']*["'][^>]*>[\s\S]*?<span>節目冊<\/span>/i.test(text)) {
      addError(`${fileRel}: first program navigation label must be 節目冊.`);
    }
    const viewport = (text.match(/<meta\s+name=["']viewport["']\s+content=["']([^"']+)["']/i) || [])[1] || '';
    if (/user-scalable\s*=\s*no|maximum-scale\s*=\s*1(?:\.0)?/i.test(viewport)) {
      addError(`${fileRel}: viewport must not disable user zoom.`);
    }

    const localDataScripts = [...text.matchAll(/<script\b[^>]*src=["'](data\/[^"']+\.js)(?:\?[^"']*)?["']/gi)];
    for (const match of localDataScripts) {
      const dataFile = path.join(entryDir, match[1]);
      if (!fs.existsSync(dataFile)) continue;
      const dataText = fs.readFileSync(dataFile, 'utf8');
      if (!/window\.CONCERT_PROGRAM_DATA\s*=/.test(dataText)) {
        addError(`${rel(dataFile)}: must assign window.CONCERT_PROGRAM_DATA for file:// compatibility.`);
      }
    }
  }

  if (!programBookPages.length) addWarning('No concert program-book pages found.');
  info.push(`Concert program-book contract checked: ${programBookPages.length} pages`);
}

function checkAnalyticsTracking() {
  const analyticsId = 'G-PEWFLMMJNZ';
  const concertPages = walk(path.join(root, 'concerts'), (file) => (
    file.endsWith('.html')
    && !file.includes(`${path.sep}templates${path.sep}`)
    && !/<html\b[^>]*\bdata-page-type=["']concert-program-book["']/i.test(fs.readFileSync(file, 'utf8'))
  ));

  for (const file of concertPages) {
    const fileRel = rel(file);
    if (!fs.readFileSync(file, 'utf8').includes(analyticsId)) {
      addError(`${fileRel}: concert detail page is missing GA4 measurement tag.`);
    }
  }

  const template = read('templates/concert-program-book/index.html');
  if (!template.includes(analyticsId)) {
    addError('templates/concert-program-book/index.html: missing GA4 measurement tag for future program books.');
  }

  const htmlFiles = walk(root, (file) => file.endsWith('.html'));
  for (const file of htmlFiles) {
    const fileRel = rel(file);
    const links = fs.readFileSync(file, 'utf8').match(/<a\b[^>]*\bhref=["']https:\/\/www\.opentix\.life\/[^"']+["'][^>]*>/gi) || [];
    for (const link of links) {
      if (!/\bdata-ga-event=["']ticket_click["']/i.test(link)) {
        addError(`${fileRel}: OPENTIX purchase link must use data-ga-event="ticket_click".`);
      }
    }
  }

  info.push(`Analytics tracking checked: ${concertPages.length} concert detail pages; OPENTIX links are marked for ticket_click.`);
}

function checkSitemapAndFeed() {
  const sitemapUrls = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const omittedFromSitemapUrls = new Set([
    'https://cysh.band/roster.html',
    'https://cysh.band/photos/'
  ]);
  for (const url of omittedFromSitemapUrls) {
    if (sitemapUrls.includes(url)) addError(`sitemap.xml: privacy-sensitive page must not be listed: ${url}`);
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
      addError(`${file}: privacy-sensitive page must declare noindex, nofollow, noarchive.`);
    }
  }
  if (robots.includes('Disallow: /roster.html')) {
    addError('robots.txt: public roster must remain crawlable so search engines can read its noindex directive.');
  }
  if (!robots.includes('Disallow: /photos/')) addError('robots.txt: missing protected photos disallow rule.');
  if (/https:\/\/cysh\.band\/(?:roster\.html|photos\/)/.test(llms)) {
    addError('llms.txt: roster and protected photo archive must not be advertised.');
  }
  const navTemplate = read('templates/partials/nav.html');
  if (!/<a\b[^>]*href=["'][^"']*photos\/["'][^>]*\bdata-member-only\b/i.test(navTemplate)) {
    addError('templates/partials/nav.html: protected photo archive marker is missing.');
  }
  if (/<a\b[^>]*href=["'][^"']*roster\.html["'][^>]*\bdata-member-only\b/i.test(navTemplate)) {
    addError('templates/partials/nav.html: public roster must not use a member-only marker.');
  }
  info.push('Access privacy markers checked: public noindex roster, protected photos, robots, sitemap, llms, nav');
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
  const {
    articles,
    renderArticle,
    renderNewsIndex,
    renderFeed,
    renderSitemap,
    NEWS_STYLE_VERSION
  } = require('./generate-news-pages');
  const css = read('css/style.css');
  if (!/\.news-article figure img\s*\{[\s\S]*?max-width:\s*100%[\s\S]*?height:\s*auto[\s\S]*?aspect-ratio:\s*auto[\s\S]*?object-fit:\s*contain/i.test(css)) {
    addError('css/style.css: news article images must preserve their intrinsic aspect ratio.');
  }
  if (!/\.news-share-button\s*\{[\s\S]*?min-height:\s*44px[\s\S]*?touch-action:\s*manipulation/i.test(css)) {
    addError('css/style.css: news share control must keep a 44px touch target and touch-action: manipulation.');
  }
  if (!exists('js/news-share.js')) {
    addError('js/news-share.js: generated news pages require the share control script.');
  }
  const activePins = articles.filter((article) => article.pinned && article.pinUntil && article.pinUntil >= new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Taipei' }));
  const missingPinUntil = articles.filter((article) => article.pinned && !article.pinUntil);
  const invalidModifiedDates = articles.filter((article) => (
    !/^\d{4}-\d{2}-\d{2}$/.test(article.modifiedDate)
    || article.modifiedDate < article.date
  ));
  const invalidModifiedTimes = articles.filter((article) => !/^\d{2}:\d{2}$/.test(article.modifiedTime));
  if (missingPinUntil.length) addError(`news data: pinned article(s) missing pinUntil: ${missingPinUntil.map((article) => article.id).join(', ')}.`);
  if (activePins.length > 1) addError(`news data: at most one active pinned article is allowed, found ${activePins.map((article) => article.id).join(', ')}.`);
  if (invalidModifiedDates.length) addError(`news data: modifiedDate must be YYYY-MM-DD and not earlier than date: ${invalidModifiedDates.map((article) => article.id).join(', ')}.`);
  if (invalidModifiedTimes.length) addError(`news data: modifiedTime must be HH:MM: ${invalidModifiedTimes.map((article) => article.id).join(', ')}.`);
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
    if (!actual.includes(`href="../css/style.css${NEWS_STYLE_VERSION}"`)) {
      addError(`${article.output}: stylesheet cache version is missing or stale.`);
    }
    if (!actual.includes('data-news-share') || !actual.includes('../js/news-share.js')) {
      addError(`${article.output}: article share control is missing or incomplete.`);
    }

    const schemaBlocks = [...actual.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
    const newsSchemas = [];
    for (const match of schemaBlocks) {
      try {
        const parsed = JSON.parse(match[1]);
        if (parsed && parsed['@type'] === 'NewsArticle') newsSchemas.push(parsed);
      } catch (error) {
        addError(`${article.output}: invalid JSON-LD: ${error.message}`);
      }
    }
    if (newsSchemas.length !== 1) {
      addError(`${article.output}: expected exactly one NewsArticle JSON-LD block, found ${newsSchemas.length}.`);
    } else {
      const schema = newsSchemas[0];
      for (const field of ['headline', 'description', 'image', 'datePublished', 'dateModified', 'author', 'publisher', 'mainEntityOfPage']) {
        if (!schema[field]) addError(`${article.output}: NewsArticle missing ${field}.`);
      }
      if (!Array.isArray(schema.image) || schema.image[0] !== article.ogImage) {
        addError(`${article.output}: NewsArticle image must match the representative og:image.`);
      }
      if (schema.datePublished !== `${article.date}T${article.time}:00+08:00`) {
        addError(`${article.output}: NewsArticle datePublished is out of sync.`);
      }
      if (schema.dateModified !== `${article.modifiedDate}T${article.modifiedTime}:00+08:00`) {
        addError(`${article.output}: NewsArticle dateModified is out of sync.`);
      }
    }

    const ogImage = (actual.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) || [])[1] || '';
    if (!/^https:\/\/[^/]+\//.test(ogImage)) addError(`${article.output}: og:image must be an absolute HTTPS URL.`);
    const visibleSummary = (actual.match(/<p class="news-dek">([\s\S]*?)<\/p>/i) || [])[1] || '';
    if (plainTextFromHtml(visibleSummary) !== article.summary) {
      addError(`${article.output}: visible article summary is missing or out of sync.`);
    }
    if (!new RegExp(`最後更新[\\s\\S]*?<time datetime=["']${article.modifiedDate}["']`).test(actual)) {
      addError(`${article.output}: visible last-updated date is missing or out of sync.`);
    }

    const leadFigure = (actual.match(/<figure\b[^>]*class=["'][^"']*\bnews-lead-image\b[^"']*["'][^>]*>[\s\S]*?<\/figure>/i) || [])[0] || '';
    const leadImage = (leadFigure.match(/<img\b[^>]*>/i) || [])[0] || '';
    if (!leadImage) addError(`${article.output}: representative lead image is missing.`);
    if (!/\salt=["'][^"']+["']/i.test(leadImage)) addError(`${article.output}: representative image needs meaningful alt text.`);
    if (!/\swidth=["']\d+["']/i.test(leadImage) || !/\sheight=["']\d+["']/i.test(leadImage)) {
      addError(`${article.output}: representative image needs width and height.`);
    }
    if (!new RegExp(`\\swidth=["']${article.ogImageWidth}["']`, 'i').test(leadImage)
        || !new RegExp(`\\sheight=["']${article.ogImageHeight}["']`, 'i').test(leadImage)) {
      addError(`${article.output}: representative image dimensions must match data/news.js.`);
    }
    if (!/\sstyle=["'][^"']*\bheight\s*:\s*auto\b[^"']*["']/i.test(leadImage)) {
      addError(`${article.output}: representative image needs an inline height:auto distortion safeguard.`);
    }
    if (!/\sloading=["']eager["']/i.test(leadImage) || !/\sfetchpriority=["']high["']/i.test(leadImage) || !/\sdecoding=["']async["']/i.test(leadImage)) {
      addError(`${article.output}: representative image loading priority is incomplete.`);
    }
    if (Number(article.ogImageWidth) > 480 && (!/\ssrcset=["'][^"']+["']/i.test(leadImage) || !/\ssizes=["'][^"']+["']/i.test(leadImage))) {
      addError(`${article.output}: representative image needs responsive srcset and sizes.`);
    }

    const articleBody = (actual.match(/<article\b[^>]*class=["'][^"']*\bnews-article\b[^"']*["'][^>]*>([\s\S]*?)<\/article>/i) || [])[1] || '';
    const bodyWithoutLead = articleBody.replace(leadFigure, '');
    const bodyImages = [...bodyWithoutLead.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
    for (const [imageIndex, image] of bodyImages.entries()) {
      if (!/\swidth=["']\d+["']/i.test(image) || !/\sheight=["']\d+["']/i.test(image)) {
        addError(`${article.output}: body image ${imageIndex + 1} needs width and height.`);
      }
      if (!/\sloading=["']lazy["']/i.test(image) || !/\sdecoding=["']async["']/i.test(image)) {
        addError(`${article.output}: body image ${imageIndex + 1} must lazy-load and decode asynchronously.`);
      }
      if (!/\sstyle=["'][^"']*\bheight\s*:\s*auto\b[^"']*["']/i.test(image)) {
        addError(`${article.output}: body image ${imageIndex + 1} needs an inline height:auto distortion safeguard.`);
      }
    }
  }
  const expectedIndex = renderNewsIndex();
  const actualIndex = read('news/index.html');
  if (actualIndex !== expectedIndex) {
    addError('news/index.html: generated HTML is out of sync. Run node scripts/generate-news-pages.js');
  }
  if (!actualIndex.includes(`href="../css/style.css${NEWS_STYLE_VERSION}"`)) {
    addError('news/index.html: stylesheet cache version is missing or stale.');
  }
  const expectedFeed = renderFeed();
  const actualFeed = read('feed.xml');
  if (actualFeed !== expectedFeed) {
    addError('feed.xml: generated RSS is out of sync. Run node scripts/generate-news-pages.js');
  }
  const actualSitemap = read('sitemap.xml');
  const expectedSitemap = renderSitemap(actualSitemap);
  if (actualSitemap !== expectedSitemap) {
    addError('sitemap.xml: generated news entries are out of sync. Run node scripts/generate-news-pages.js');
  }
  info.push(`Generated news pages, RSS, and sitemap checked: ${articles.length}`);
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

function checkHallTour() {
  const required = [
    'data/tour.js',
    'data/hall-seats.js',
    'templates/hall-tour.html',
    'hall/tour/index.html',
    'assets/hall-tour/links.js',
    'assets/hall-tour/plan-map.js',
    'assets/hall-tour/seat-map.js'
  ];
  required.forEach((file) => {
    if (!exists(file)) addError(`Hall tour required file missing: ${file}`);
  });
  if (!required.every(exists)) return;

  const result = spawnSync(process.execPath, ['scripts/generate-tour.js', '--check'], {
    cwd: root,
    encoding: 'utf8'
  });
  if (result.status !== 0) {
    addError(`Hall tour data validation failed:\n${(result.stdout || result.stderr || '').trim()}`);
  }

  const html = read('hall/tour/index.html');
  if (!/data-page-type=["']hall-tour-test["']/i.test(html)) {
    addError('hall/tour/index.html: missing test-page marker.');
  }
  if (!/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex[^"']*nofollow/i.test(html)) {
    addError('hall/tour/index.html: test page must remain noindex and nofollow.');
  }
  if (!/data-tour-layout=["']immersive["']/i.test(html)) {
    addError('hall/tour/index.html: immersive full-screen layout marker is missing.');
  }
  ['scenesBtn', 'mapBtn', 'infoBtn', 'gyroBtn', 'tourPanel'].forEach((id) => {
    if (!html.includes(`id="${id}"`)) {
      addError(`hall/tour/index.html: immersive control #${id} is missing.`);
    }
  });
  if (!html.includes("gyroPlugin.start('fast')")) {
    addError('hall/tour/index.html: gyroscope must remain user-initiated in fast mode.');
  }
  if (read('sitemap.xml').includes('https://cysh.band/hall/tour/')) {
    addError('sitemap.xml: hall tour test page must not be listed before public release.');
  }
  info.push('Hall tour checked: source data, immersive controls, user-initiated gyroscope, private-test markers, and sitemap exclusion');
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
checkAboutPageImages();
checkSharedChromeConsistency();
checkConcertProgramBooks();
checkAnalyticsTracking();
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
checkHallTour();
printReport();
