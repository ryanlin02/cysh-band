#!/usr/bin/env node
/* 依 data/concerts.js 產生校友聯演獨立資料頁。
   預設只更新缺頁或本腳本生成頁；加上 --overwrite-manual 可將人工頁改為資料驅動頁。
   2019 第 35 屆《正八音》為雙場次、場地與人員差異較大的手寫例外。
   用法：node scripts/generate-concert-pages.js [--overwrite-manual] [concert-id] */
const fs = require('fs');
const path = require('path');
const { autoLinkHtml } = require('./lib/people-auto-link');
const { createAlumniRosterResolver } = require('./lib/alumni-roster');

global.window = global;
require(path.join(__dirname, '..', 'data', 'alumni.js'));
require(path.join(__dirname, '..', 'data', 'concerts.js'));
require(path.join(__dirname, '..', 'data', 'people-profiles.js'));
require(path.join(__dirname, '..', 'data', 'news.js'));

const root = path.join(__dirname, '..');
const alumni = global.ALUMNI || [];
const concerts = global.CONCERTS || [];
const peopleProfiles = global.PEOPLE_PROFILES || [];
const newsItems = global.NEWS || [];
const rosterResolver = createAlumniRosterResolver(alumni);
const generatedMarker = '<!-- GENERATED CONCERT PAGE -->';
const args = process.argv.slice(2);
const overwriteManual = args.includes('--overwrite-manual');
const onlyIds = new Set(args.filter((arg) => !arg.startsWith('--')));
const manualPageExceptions = new Set(['2019-35th']);

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function publicNote(value, fallback) {
  const text = String(value || '')
    .replace(/不可因此誤寫[^。；]*[。；]?/g, '')
    .replace(/校友提供影像仍需交叉確認，暫不作為公開頁主證據。?/g, '')
    .replace(/場地由使用者確認為/g, '場地確認為')
    .replace(/日期由補充照片 EXIF 與演出影像檔名群組支持。?/g, '')
    .replace(/2011 聯演存在與鄧杰翔打擊聲部由人物頁名單脈絡確認；?/g, '2011 聯演已有校友名單脈絡可考；')
    .replace(/日期由 2011\.07\.16 影像 EXIF 支持，?/g, '日期暫列 2011.07.16，')
    .replace(/社群錄影清單作/g, '現存錄影資料作')
    .replace(/社群協作曲目介紹可補全本屆曲目；?/g, '現存曲目介紹可補全本屆曲目；')
    .replace(/錄影清單註明因版權因素，YouTube 上傳後多有消音或版權宣告，現存清單多為示範帶。?/g, '')
    .replace(/；?曲目檔確認部分曲目，室內樂重奏細目待補。?/, '')
    .replace(/，。/g, '。')
    .replace(/^[；，、\s]+/, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text || fallback;
}

function compactSummary(value, max = 260) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const sentenceEnd = Math.max(slice.lastIndexOf('。'), slice.lastIndexOf('；'));
  if (sentenceEnd > 120) return slice.slice(0, sentenceEnd + 1).trim();
  return `${slice.slice(0, max - 1).trim()}…`;
}

function concertLead(concert, fallback) {
  if (concert.lede) return compactSummary(concert.lede);
  if (concert.summary) return compactSummary(concert.summary);
  if (concert.intro && concert.intro.length) return compactSummary(concert.intro.join(''));
  return publicNote(concert.notes, fallback);
}

function displayTitle(concert) {
  if (!concert.title) return `第 ${concert.nth || '?'} 屆聯合音樂會`;
  if (/^第\s*\d+\s*屆/.test(concert.title) || concert.title === '傳統的起點') return concert.title;
  return `《${concert.title}》`;
}

function pageTitle(concert) {
  const title = displayTitle(concert);
  if (/^第\s*\d+\s*屆/.test(title)) return `${title}（${concert.year}）`;
  return `第 ${concert.nth} 屆${title}（${concert.year}）`;
}

function formatDate(date) {
  if (!date) return '日期待考';
  const [year, month, day] = String(date).split('-');
  if (!year || !month || !day) return escapeHtml(date);
  return `${year}.${month}.${day}`;
}

function formatDateRange(concert) {
  const start = formatDate(concert.date);
  if (!concert.endDate) return start;
  return `${start} - ${formatDate(concert.endDate)}`;
}

function itemText(person) {
  if (!person) return '';
  const personKey = person.num || person.id;
  const hasPersonPage = personKey && exists(`people/${personKey}.html`);
  const name = hasPersonPage
    ? `<a href="../people/${escapeHtml(person.num || person.id)}.html">${escapeHtml(person.name)}</a>`
    : escapeHtml(person.name);
  const detail = [
    person.role,
    person.instrument,
    person.work
  ].filter(Boolean).map(escapeHtml).join('／');
  return detail ? `${name}（${detail}）` : name;
}

function itemName(person) {
  if (!person) return '';
  const personKey = person.num || person.id;
  const hasPersonPage = personKey && exists(`people/${personKey}.html`);
  return hasPersonPage
    ? `<a href="../people/${escapeHtml(personKey)}.html">${escapeHtml(person.name)}</a>`
    : escapeHtml(person.name);
}

function profileFor(person) {
  if (!person) return null;
  const key = person.num || person.id;
  return peopleProfiles.find((profile) => {
    if (key && (profile.num === key || profile.id === key || profile.output === `people/${key}.html`)) return true;
    return person.name && profile.name === person.name;
  }) || null;
}

function personHref(person, profile) {
  const key = person && (person.num || person.id);
  if (key && exists(`people/${key}.html`)) return `../people/${escapeHtml(key)}.html`;
  if (profile && profile.output && exists(profile.output)) return `../${escapeHtml(profile.output)}`;
  return '';
}

function personPhoto(profile) {
  if (!profile || !profile.photo) return '../assets/img/members/blank.webp';
  if (profile.photo.startsWith('../')) return escapeHtml(profile.photo);
  return `../${escapeHtml(profile.photo)}`;
}

function personSummary(person, profile, fallbackRole) {
  if (person.concertBio) return escapeHtml(person.concertBio);
  if (profile && profile.description) return escapeHtml(profile.description);
  const role = person.role || fallbackRole;
  if (person.work) {
    return `${escapeHtml(person.name)}於本屆擔任${escapeHtml(role || '演出者')}，演出曲目為 ${escapeHtml(person.work)}。完整人物資料仍待補充。`;
  }
  return `${escapeHtml(person.name)}於本屆擔任${escapeHtml(role || '演出者')}；人物介紹資料仍待校友補充與確認。`;
}

function roleText(person, fallbackRole) {
  if (person.concertRole) return escapeHtml(person.concertRole);
  return [person.concertRole || person.role || fallbackRole, person.instrument, person.work]
    .filter(Boolean)
    .map(escapeHtml)
    .join('／');
}

function linkToFullProfile(href) {
  return href ? ` <a href="${href}">閱讀完整人物誌 →</a>` : '';
}

function renderPersonByline(person, fallbackRole) {
  const profile = profileFor(person);
  const href = personHref(person, profile);
  const name = href
    ? `<a href="${href}">${escapeHtml(person.name)}</a>`
    : escapeHtml(person.name);
  const number = person.num ? `<span class="person-number">編號 ${escapeHtml(person.num)}</span>` : '';
  const photo = `<img src="${personPhoto(profile)}" alt="${escapeHtml(person.name)}">`;
  const photoNode = href ? `<a class="person-photo-link" href="${href}" aria-label="查看${escapeHtml(person.name)}人物誌">${photo}</a>` : photo;
  const role = roleText(person, fallbackRole);
  const summary = personSummary(person, profile, fallbackRole);
  return `<div class="person-byline">
      ${photoNode}
      <div>
        <h3>${name}${number}</h3>
        ${role ? `<p class="role">${role}</p>` : ''}
        <p>${summary}${linkToFullProfile(href)}</p>
      </div>
    </div>`;
}

function renderPeopleSection(concert) {
  const peopleMap = new Map();
  for (const { person, role } of [
    ...(concert.conductors || []).map((item) => ({ person: item, role: '指揮' })),
    ...(concert.soloists || []).map((item) => ({ person: item, role: '獨奏／協奏' }))
  ]) {
    const key = person.num || person.id || person.name;
    if (!peopleMap.has(key)) {
      peopleMap.set(key, { person: { ...person }, role });
      continue;
    }
    const current = peopleMap.get(key);
    current.person = {
      ...person,
      ...current.person,
      instrument: current.person.instrument || person.instrument,
      work: current.person.work || person.work,
      concertRole: current.person.concertRole || person.concertRole || [current.person.role, person.role].filter(Boolean).join('／')
    };
  }
  const people = [...peopleMap.values()];
  if (!people.length) {
    return '<p class="muted">本屆指揮與獨奏／協奏音樂家資料仍待考證；若您保存節目冊或演出紀錄，歡迎聯絡補充。</p>';
  }
  return `<div class="concert-people-list">
    ${people.map(({ person, role }) => renderPersonByline(person, role)).join('\n    ')}
    </div>`;
}

function listPeople(items) {
  if (!items || !items.length) return '資料待考';
  return items.map(itemText).join('、');
}

function ticketText(ticket) {
  if (!ticket || ticket.type === 'unknown') return '票務資訊待考';
  if (ticket.type === 'none') return ticket.note || '無';
  if (ticket.type === 'free') return ticket.note || '免票入場';
  if (ticket.type === 'free-ticket') return ticket.note || '免費索票入場';
  if (ticket.type === 'ceremony') return ticket.note || '慶典活動';
  const parts = [];
  if (ticket.price) parts.push(`票價 ${escapeHtml(ticket.price)} 元`);
  if (ticket.channels && ticket.channels.length) parts.push(`通路：${ticket.channels.map(escapeHtml).join('、')}`);
  if (ticket.note) parts.push(escapeHtml(ticket.note));
  return parts.length ? parts.join('；') : '售票資訊待補';
}

function missingFields(concert) {
  const missing = [];
  if (!concert.date) missing.push('正式日期');
  if (!concert.time) missing.push('演出時間');
  if (!concert.venue) missing.push('演出場地');
  if (!concert.conductors || !concert.conductors.length) missing.push('指揮');
  if (!concert.program || !concert.program.length) missing.push('完整曲目');
  if ((!concert.performers || !concert.performers.length) && (!concert.performerGroups || !concert.performerGroups.length)) missing.push('完整團員名單');
  return missing;
}

function concertIntro(concert, desc) {
  const paragraphs = [];
  if (concert.intro && concert.intro.length) {
    return concert.intro.map((text) => `<p>${escapeHtml(text)}</p>`).join('\n    ');
  }
  const note = publicNote(concert.notes, '');
  if (note) paragraphs.push(note);
  if (concert.venueNote && !paragraphs.join('').includes(concert.venueNote)) paragraphs.push(concert.venueNote);
  if (concert.hostHead) {
    paragraphs.push(`本屆由${escapeHtml(concert.hostHead)}校友承接籌辦脈絡，延續不同世代校友與在校生共同排練、共同登台的校友聯演傳統。`);
  }
  if (concert.sessions && concert.sessions.length > 1) {
    paragraphs.push(`本屆包含 ${concert.sessions.length} 場演出，場次資訊已依目前可考資料分列於演出資訊表；各場曲目與完整演出人員仍會隨節目冊與校友補充資料持續校對。`);
  }
  const hasProgramContext = Boolean(concert.programNote || (concert.programBook && concert.programBook.length));
  if (concert.program && concert.program.length && !hasProgramContext) {
    paragraphs.push(`目前已整理出 ${concert.program.length} 首曲目線索；若尚未能確認上下半場或完整順序，網站先以可考曲目建立清單，後續再依節目冊補齊曲序與樂曲介紹。`);
  }
  const missing = missingFields(concert);
  if (missing.length) {
    paragraphs.push(`目前仍待補齊${missing.join('、')}等資料；若校友保存節目冊、海報、照片、錄音或團員名單，歡迎協助補充。`);
  }
  if (!paragraphs.length) paragraphs.push(desc);
  return paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join('\n    ');
}

function concertInfoTable(concert, statusText) {
  const rows = [
    ['屆別', `第 ${escapeHtml(concert.nth)} 屆`],
    ['年度', `${escapeHtml(concert.year)}${concert.rocYear ? `（民國 ${escapeHtml(concert.rocYear)} 年）` : ''}`],
    ['主題', `${escapeHtml(displayTitle(concert))}${concert.subtitle ? `｜${escapeHtml(concert.subtitle)}` : ''}${concert.aliases && concert.aliases.length ? `<br><span class="muted">別名：${concert.aliases.map(escapeHtml).join('、')}</span>` : ''}`],
    ['日期', formatDateRange(concert)],
    ['時間', escapeHtml(concert.time || '時間待考')],
    ['場地', `${escapeHtml(concert.venue || '場地待考')}${concert.venueNote ? `<br><span class="muted">${escapeHtml(concert.venueNote)}</span>` : ''}`],
    ['指揮', listPeople(concert.conductors)],
    ['獨奏／協奏', listPeople(concert.soloists)],
    ['籌辦字頭', escapeHtml(concert.hostHead || '待考')],
    ['票務', ticketText(concert.ticket)],
    ['資料狀態', escapeHtml(statusText)]
  ];
  if (concert.sessions && concert.sessions.length) {
    rows.push(['場次', `${concert.sessions.length} 場${concert.sessions.length > 1 ? '（詳見下方場次資訊）' : ''}`]);
  }
  return `<div class="table-scroll"><table class="plain">
      ${rows.map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`).join('\n      ')}
    </table></div>`;
}

function programList(program, concert = {}) {
  if (!program || !program.length) return '<p class="muted">完整曲目待考證。</p>';
  const withSection = program.some((work) => work.section || work.part || work.half);
  const sections = [];
  if (withSection) {
    for (const work of program) {
      const key = work.section || work.part || work.half || '曲目';
      let section = sections.find((item) => item.key === key);
      if (!section) {
        section = { key, works: [] };
        sections.push(section);
      }
      section.works.push(work);
    }
  } else {
    sections.push({ key: '', works: program });
  }
  const titleText = (work) => {
    if (work.displayTitle) return escapeHtml(work.displayTitle);
    const main = work.localTitle || work.title || '曲名待考';
    const foreign = work.foreignTitle || work.originalTitle || '';
    return `${escapeHtml(main)}${foreign ? ` <i>${escapeHtml(foreign)}</i>` : ''}`;
  };
  const composerText = (work) => {
    const base = work.credit
      ? [work.credit]
      : [work.composer, work.arranger ? `arr. ${work.arranger}` : ''];
    return [
      ...base,
      work.conductor ? `指揮：${work.conductor}` : '',
      work.soloist ? `獨奏：${work.soloist}` : '',
      work.note
    ]
      .filter(Boolean)
      .map(escapeHtml)
      .join('／');
  };
  const renderWorks = (works) => `<ol class="concert-program-list">
      ${works.map((work) => {
    const meta = composerText(work);
    const description = work.description ? `<p>${escapeHtml(work.description)}</p>` : '';
    return `<li><b>${titleText(work)}</b>${meta ? `<span>${meta}</span>` : ''}${description}</li>`;
  }).join('\n      ')}
    </ol>`;
  const content = sections.map((section) => `${section.key ? `<h3>${escapeHtml(section.key)}</h3>` : ''}${renderWorks(section.works)}`).join('\n    ');
  const sourceNote = concert.programNote || '';
  return `${content}${sourceNote ? `\n    <p class="muted">${escapeHtml(sourceNote)}</p>` : ''}`;
}

function sessionsTable(sessions) {
  if (!sessions || !sessions.length) return '';
  const nav = sessions.length > 1
    ? `<p class="session-nav">
      ${sessions.map((session, index) => `<a href="#session-${index + 1}"><span class="num">${index + 1}</span>${escapeHtml(session.label || `第 ${index + 1} 場`)}</a>`).join('\n      ')}
    </p>`
    : '';
  const blocks = sessions.map((session, index) => `
    <div class="session" id="session-${index + 1}">
      <div class="session-head">
        <p class="kicker">SESSION ${index + 1}</p>
        <h3>${escapeHtml(session.label || `第 ${index + 1} 場`)}</h3>
      </div>
      <dl class="session-meta">
        <div><dt>日期</dt><dd>${formatDate(session.date)}</dd></div>
        <div><dt>時間</dt><dd>${escapeHtml(session.time || '待考')}</dd></div>
        <div><dt>場地</dt><dd>${escapeHtml(session.venue || '待考')}</dd></div>
        <div><dt>指揮</dt><dd>${session.conductor ? itemText({ ...session.conductor, role: '指揮' }) : '待考'}</dd></div>
      </dl>
    </div>`).join('\n');
  return `${nav}${blocks}`;
}

function videosList(videos) {
  if (!videos || !videos.length) return '<p class="muted">目前尚無可公開整理的錄影連結。</p>';
  return `<ul class="concert-link-list">\n      ${videos.map((video) => `<li><a href="${escapeHtml(video.url)}" target="_blank" rel="noopener">${escapeHtml(video.label || '錄影清單')}</a></li>`).join('\n      ')}\n    </ul>`;
}

function provenanceText(concert, missing) {
  const state = missing.length
    ? `目前仍待補：${missing.map(escapeHtml).join('、')}。`
    : '基本欄位已有可考資料，仍會持續核對節目冊與校友補充。';
  if (concert.sourceNote || (concert.sourceNotes && concert.sourceNotes.length)) {
    const notes = concert.sourceNotes && concert.sourceNotes.length ? concert.sourceNotes : [concert.sourceNote];
    return `${notes.map((note) => `<p>${escapeHtml(note)}</p>`).join('\n    ')}
    <p class="muted">${state}</p>`;
  }
  return `<p>本頁依校友提供之海報、節目冊、照片、錄影清單與網站既有資料整理。部分早期屆別仍缺完整節目單、指揮、曲目或團員名單；若您留有相關資料，歡迎透過粉絲專頁聯絡補充。</p>
    <p class="muted">${state}</p>`;
}

function rosterPersonText(entry) {
  if (!entry) return '';
  const resolved = rosterResolver.resolveEntry(entry);
  if (typeof entry === 'string') {
    if (!resolved) return escapeHtml(entry);
    const num = resolved.num;
    const label = num
      ? `${resolved.prefix || ''}${num} ${resolved.name || (resolved.person && resolved.person.name) || ''}`.trim()
      : resolved.raw;
    if (!num) return escapeHtml(label);
    return exists(`people/${num}.html`)
      ? `<a href="../people/${escapeHtml(num)}.html">${escapeHtml(label)}</a>`
      : escapeHtml(label);
  }
  if (entry.text) return rosterPersonText(entry.text);
  const key = (resolved && resolved.num) || entry.num || entry.id;
  const label = [
    key,
    entry.name || (resolved && resolved.name),
    entry.note ? `(${entry.note})` : ''
  ].filter(Boolean).join(' ');
  return key && exists(`people/${key}.html`)
    ? `<a href="../people/${escapeHtml(key)}.html">${escapeHtml(label)}</a>`
    : escapeHtml(label || entry.name || '');
}

function rosterPeopleText(people) {
  if (!people || !people.length) return '資料待考';
  return people.map(rosterPersonText).filter(Boolean).join('、');
}

function performerRows(concert) {
  if (!concert.performerGroups && (!concert.performers || !concert.performers.length)) return '<p class="muted">完整演出人員名單待節目冊、團員名冊或校友補充資料確認。</p>';
  const groups = [];
  if (concert.performerGroups && concert.performerGroups.length) {
    for (const group of concert.performerGroups) {
      groups.push({ key: group.role || group.label || '演出人員', people: group.people || group.members || [] });
    }
  } else {
    for (const person of concert.performers) {
      const role = person.role || person.instrument || '演出人員';
      const key = role.replace(/（.*?）/g, '').trim();
      let group = groups.find((item) => item.key === key);
      if (!group) {
        group = { key, people: [] };
        groups.push(group);
      }
      group.people.push(person);
    }
  }
  let html = `<div class="table-scroll"><table class="plain roster">
      <tr><th>聲部／角色</th><th>人員</th></tr>
      ${groups.map((group) => `<tr><td data-label="聲部／角色">${escapeHtml(group.key)}</td><td data-label="人員">${rosterPeopleText(group.people)}</td></tr>`).join('\n      ')}
    </table></div>${concert.performerNote ? `\n    <p class="muted">${escapeHtml(concert.performerNote)}</p>` : ''}`;
  if (concert.performerSupplementGroups && concert.performerSupplementGroups.length) {
    html += `\n    <h3>社群協作名單補充</h3>
    <div class="table-scroll"><table class="plain roster">
      <tr><th>聲部／角色</th><th>人員</th></tr>
      ${concert.performerSupplementGroups.map((group) => `<tr><td data-label="聲部／角色">${escapeHtml(group.role || group.label || '補充名單')}</td><td data-label="人員">${rosterPeopleText(group.people || group.members || [])}</td></tr>`).join('\n      ')}
    </table></div>`;
  }
  if (concert.performerSupplementNote) {
    html += `\n    <p class="muted">${escapeHtml(concert.performerSupplementNote)}</p>`;
  }
  return html;
}

function adminTable(concert) {
  const adminRows = concert.adminRows || (concert.organizers || []).map((person) => ({
    role: person.role || '籌備／主辦',
    people: [person]
  }));
  if (!adminRows.length) return '<p class="muted">幕後行政團隊名單仍待補齊；若您保存籌備文件或工作人員名單，歡迎協助補充。</p>';
  const hasDuty = adminRows.some((row) => row.duty || row.description);
  return `<div class="table-scroll"><table class="plain roster">
      <tr><th>職務</th><th>人員</th>${hasDuty ? '<th>職掌</th>' : ''}</tr>
      ${adminRows.map((row) => `<tr><td data-label="職務">${escapeHtml(row.role || '籌備／主辦')}</td><td data-label="人員">${rosterPeopleText(row.people || row.members || [row.person || row])}</td>${hasDuty ? `<td data-label="職掌">${escapeHtml(row.duty || row.description || '')}</td>` : ''}</tr>`).join('\n      ')}
    </table></div>${concert.adminNote ? `\n    <p class="muted">${escapeHtml(concert.adminNote)}</p>` : ''}`;
}

function sponsorsText(concert) {
  if (concert.sponsorParagraphs && concert.sponsorParagraphs.length) {
    return concert.sponsorParagraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join('\n    ');
  }
  const sponsors = concert.sponsors || concert.supporters || [];
  const thanks = concert.thanks || concert.acknowledgements || [];
  if (!sponsors.length && !thanks.length) return '<p class="muted">贊助、協辦與致謝名單仍待節目冊或海報補齊。</p>';
  const rows = [];
  if (sponsors.length) rows.push(`<p><b>贊助／協辦：</b>${sponsors.map(escapeHtml).join('、')}</p>`);
  if (thanks.length) rows.push(`<p><b>致謝：</b>${thanks.map(escapeHtml).join('、')}</p>`);
  return rows.join('\n    ');
}

function planningSection(concert) {
  const rows = concert.planningRows || [];
  const notes = concert.planningNotes || [];
  if (!rows.length && !notes.length) return '';
  const noteHtml = notes.map((text) => `<p>${escapeHtml(text)}</p>`).join('\n    ');
  const rowsHtml = rows.length ? `<div class="table-scroll"><table class="plain roster">
      <tr><th>時間</th><th>紀錄</th></tr>
      ${rows.map((row) => `<tr><td data-label="時間">${escapeHtml(row.date || row.time || '')}</td><td data-label="紀錄">${escapeHtml(row.detail || row.description || '')}</td></tr>`).join('\n      ')}
    </table></div>` : '';
  return `<section class="section">
    <h2>籌備紀錄</h2>
    ${noteHtml}
    ${rowsHtml}
  </section>`;
}

function galleryPhotos(concert) {
  const explicit = concert.photos || concert.galleryPhotos || [];
  const normalized = explicit.map((photo) => typeof photo === 'string' ? { src: photo, caption: '' } : photo);
  if (normalized.length) return normalized;

  const dir = path.join(root, 'assets', 'img', 'gallery', String(concert.year));
  if (!fs.existsSync(dir)) return normalized;
  const files = fs.readdirSync(dir)
    .filter((file) => /t\.webp$/.test(file))
    .sort((a, b) => {
      const score = (name) => (/0830c-06|0905-01|0901-01|0828-04/.test(name) ? -1 : 0);
      return score(a) - score(b) || a.localeCompare(b);
    })
    .slice(0, 3 - normalized.length)
    .map((file) => ({
      src: `assets/img/gallery/${concert.year}/${file}`,
      full: `assets/img/gallery/${concert.year}/${file.replace(/t\.webp$/, '.webp')}`,
      caption: /0830c-06|0905-01|0901-01|0828-04/.test(file) ? '演出合影或舞台紀錄' : '演出留影'
    }));
  return normalized.concat(files);
}

function renderGallerySection(concert) {
  const photos = galleryPhotos(concert);
  if (!photos.length) {
    return '<p class="muted">目前尚未整理到足夠的演出影像。若校友保存全團合照、舞台照或排練照片，歡迎協助補充。</p>';
  }
  return `<div class="gallery-grid concert-gallery-grid">
      ${photos.map((photo) => {
    const src = photo.src || '';
    const full = photo.full || src.replace(/t\.webp$/, '.webp');
    const caption = photo.caption || '演出留影';
    return `<figure><img src="../${escapeHtml(src)}"${full ? ` data-full="../${escapeHtml(full)}"` : ''} alt="${escapeHtml(caption)}" loading="lazy"><figcaption>${escapeHtml(caption)}</figcaption></figure>`;
  }).join('\n      ')}
    </div>`;
}

function promoImagesSection(concert) {
  const images = concert.promoImages || [];
  if (!images.length) return '';
  return `<section class="section">
    <h2>宣傳品</h2>
    <div class="gallery-grid concert-gallery-grid">
      ${images.map((item) => {
    const src = typeof item === 'string' ? item : item.src;
    const full = typeof item === 'string' ? item : (item.full || item.src);
    const caption = typeof item === 'string' ? '宣傳品' : (item.caption || '宣傳品');
    return `<figure><img src="../${escapeHtml(src)}"${full ? ` data-full="../${escapeHtml(full)}"` : ''} alt="${escapeHtml(caption)}" loading="lazy"><figcaption>${escapeHtml(caption)}</figcaption></figure>`;
  }).join('\n      ')}
    </div>
  </section>`;
}

function programBookSection(concert) {
  const scans = concert.programBook || concert.programScans || concert.booklet || [];
  if (!scans.length) return '<p class="muted">目前尚未整理到可公開呈現的完整節目冊掃描圖檔。</p>';
  return `<p class="muted">節目冊與企劃書影像以縮圖列保存；可左右滑動瀏覽，點開圖片後可用左右鍵切換頁面。</p>
    <div class="program-book-strip" aria-label="節目冊頁面縮圖">
      ${scans.map((scan, index) => {
    const item = typeof scan === 'string' ? { src: scan, caption: `節目冊第 ${index + 1} 頁` } : scan;
    const caption = item.caption || `節目冊第 ${index + 1} 頁`;
    return `<figure><img src="../${escapeHtml(item.src)}" data-full="../${escapeHtml(item.full || item.src)}" alt="${escapeHtml(caption)}" loading="lazy"><figcaption>${escapeHtml(caption)}</figcaption></figure>`;
  }).join('\n      ')}
    </div>`;
}

function relatedArticles(concert) {
  const urls = new Set(concert.news || []);
  const items = newsItems.filter((item) => urls.has(item.url));
  if (!items.length) return '<p class="muted">目前尚無已整理的相關文章。</p>';
  return `<ul class="concert-link-list">
      ${items.map((item) => `<li><a href="../${escapeHtml(item.url)}">${escapeHtml(item.title)}</a><br><span class="muted">${escapeHtml(item.date)}．${escapeHtml(item.summary || '')}</span></li>`).join('\n      ')}
    </ul>`;
}

function relatedPageLinks(concert) {
  const links = [];
  for (const item of concert.gallery || []) {
    if (exists(item)) links.push(`<a class="btn ghost" href="../${escapeHtml(item)}">影像館</a>`);
  }
  return links.join('\n      ');
}

function concertNavLabel(concert) {
  const title = displayTitle(concert);
  if (/^第\s*\d+\s*屆/.test(title)) return title;
  return `第 ${concert.nth} 屆${title}`;
}

function adjacentConcerts(concert) {
  const pageConcerts = concerts
    .filter((item) => item.page && exists(item.page) && item.status !== 'cancelled')
    .sort((a, b) => Number(a.nth || 0) - Number(b.nth || 0));
  const index = pageConcerts.findIndex((item) => item.id === concert.id);
  if (index < 0) return { previous: null, next: null };
  return {
    previous: pageConcerts[index - 1] || null,
    next: pageConcerts[index + 1] || null
  };
}

function concertPageNav(concert) {
  const { previous, next } = adjacentConcerts(concert);
  const links = [];
  if (previous) {
    links.push(`<a class="btn ghost concert-page-nav-link previous" href="../${escapeHtml(previous.page)}"><span>← 上一屆</span><b>${escapeHtml(concertNavLabel(previous))}</b></a>`);
  }
  links.push(`<a class="btn ghost concert-page-nav-link overview" href="../concerts.html#concert-${escapeHtml(concert.id)}"><span>回到</span><b>校友聯演</b></a>`);
  if (next) {
    links.push(`<a class="btn ghost concert-page-nav-link next" href="../${escapeHtml(next.page)}"><span>下一屆 →</span><b>${escapeHtml(concertNavLabel(next))}</b></a>`);
  }
  return `<nav class="concert-page-nav" aria-label="聯演頁面導覽">
      ${links.join('\n      ')}
    </nav>`;
}

function render(concert) {
  const title = pageTitle(concert);
  const plainTitle = `${title}｜校友聯演｜嘉義高中管樂隊`;
  const desc = `${concert.year} 年第 ${concert.nth} 屆嘉義高中校友暨在校生聯合音樂會${displayTitle(concert)}資料頁：整理日期、場地、指揮、曲目、錄影與待考資訊。`;
  const lede = concertLead(concert, desc);
  const hasPoster = concert.poster && exists(concert.poster);
  const missing = missingFields(concert);
  const statusText = concert.status === 'planning' ? '籌備中' : concert.status === 'pending' ? '資料待考' : concert.status === 'confirmed' ? '已確認' : '部分可考';
  const canonical = `https://cysh.band/${concert.page}`;
  const planningHtml = planningSection(concert);
  const promoHtml = promoImagesSection(concert);
  const programOrderHint = concert.program && concert.program.length && !concert.program.some((work) => work.section || work.part || work.half)
    ? '\n    <p class="muted">若尚未顯示上下半場或完整曲序，表示目前資料尚不足以確認正式節目順序；後續會依節目冊與校友補充資料校對。</p>'
    : '';

  const html = `<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${generatedMarker}
<title>${escapeHtml(plainTitle)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<link rel="icon" type="image/png" sizes="32x32" href="../assets/img/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="../assets/img/icon-192.png">
<link rel="apple-touch-icon" href="../assets/img/apple-touch-icon.png">
<meta name="theme-color" content="#faf8f3">
<link rel="alternate" type="application/rss+xml" title="嘉中管樂最新消息 RSS" href="https://cysh.band/feed.xml">
<link rel="canonical" href="${escapeHtml(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="嘉義高中管樂隊暨校友管樂團">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<meta property="og:url" content="${escapeHtml(canonical)}">
<meta property="og:image" content="https://cysh.band/assets/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&amp;family=Noto+Sans+TC:wght@400;700&amp;family=Noto+Serif+TC:wght@700;900&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css?v=20260708-concert-booklet-text">
<script src="../js/main.js" defer></script>
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <a class="nav-brand" href="../index.html">嘉中管樂 <span>CYSH BAND</span></a>
    <button class="nav-toggle" type="button" aria-label="開啟選單" aria-expanded="false"><span></span><span></span><span></span></button>
    <ul class="nav-links">
      <li><a href="../index.html">首頁</a></li>
      <li><a href="../about.html">關於樂團</a></li>
      <li><a href="../history.html">九十五年</a></li>
      <li><a href="../numbers.html">編號</a></li>
      <li><a href="../people.html">人物誌</a></li>
      <li><a href="../roster.html">校友名錄</a></li>
      <li><a href="../concerts.html" class="active">校友聯演</a></li>
      <li><a href="../photos/" target="_blank" rel="noopener">影像館</a></li>
    </ul>
  </div>
</nav>

<header class="page-head${hasPoster ? ' has-poster' : ''}">
  <div class="ph-text">
    <p class="kicker">CONCERT．第 ${escapeHtml(concert.nth)} 屆．${escapeHtml(concert.year)}</p>
    <h1>${escapeHtml(displayTitle(concert))}</h1>
    <p class="lede">${escapeHtml(lede)}</p>
  </div>
  ${hasPoster ? `<div class="ph-poster">
    <img src="../${escapeHtml(concert.poster)}" alt="${escapeHtml(title)}海報或影像" loading="lazy">
    <p class="cap">${escapeHtml(title)}</p>
  </div>` : ''}
</header>

<main class="wrap">
  <section class="section">
    <h2>演出資訊</h2>
    ${concertInfoTable(concert, statusText)}
    ${sessionsTable(concert.sessions)}
    ${missing.length ? `<p class="muted">待補欄位：${missing.map(escapeHtml).join('、')}。</p>` : '<p class="muted">本頁基本欄位已有可考資料，仍會持續核對節目冊與校友補充。</p>'}
  </section>

  <section class="section">
    <h2>關於這場音樂會</h2>
    ${concertIntro(concert, desc)}
  </section>${planningHtml ? `\n\n  ${planningHtml}` : ''}

  <section class="section">
    <h2>指揮與獨奏</h2>
    ${renderPeopleSection(concert)}
  </section>

  <section class="section">
    <h2>曲目</h2>
    ${programList(concert.program, concert)}${programOrderHint}
  </section>

  <section class="section">
    <h2>演出人員名單</h2>
    ${performerRows(concert)}
  </section>

  <section class="section">
    <h2>幕後行政團隊</h2>
    ${adminTable(concert)}
  </section>

  <section class="section">
    <h2>贊助與致謝</h2>
    ${sponsorsText(concert)}
  </section>

  <section class="section">
    <h2>演出留影</h2>
    ${renderGallerySection(concert)}
  </section>${promoHtml ? `\n\n  ${promoHtml}` : ''}

  <section class="section">
    <h2>節目冊</h2>
    ${programBookSection(concert)}
  </section>

  <section class="section">
    <h2>影片連結</h2>
    ${videosList(concert.videos)}
  </section>

  <section class="section">
    <h2>相關文章</h2>
    ${relatedArticles(concert)}
  </section>

  <section class="section">
    <h2>資料補充</h2>
    ${provenanceText(concert, missing)}
    ${concertPageNav(concert)}
  </section>
</main>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-about">
      <h4>嘉義高中管樂隊暨校友管樂團</h4>
      <p>嘉義高中校友管樂團（2008 年立案演藝團體）<br>國立嘉義高級中學管樂社（創立於 1931 年）</p>
    </div>
    <div class="footer-links">
      <h4>網站導覽</h4>
      <ul>
        <li><a href="../about.html">關於樂團</a></li>
        <li><a href="../history.html">九十五年</a></li>
        <li><a href="../numbers.html">編號文化</a></li>
        <li><a href="../people.html">人物誌</a></li>
        <li><a href="../roster.html">校友名錄</a></li>
        <li><a href="../concerts.html">校友聯演</a></li>
      </ul>
    </div>
    <div class="footer-links">
      <h4>追蹤與支持</h4>
      <ul>
        <li><a href="../news/index.html">最新消息</a></li>
        <li><a href="../support.html">支持我們</a></li>
        <li><a href="../photos/">影像館</a></li>
        <li><a href="https://www.facebook.com/cyshband/" target="_blank" rel="noopener">嘉義高中管樂社 CYSH Band 粉絲專頁</a></li>
      </ul>
    </div>
  </div>
  <p class="copy">© 2026 嘉義高中校友管樂團</p>
</footer>

</body>
</html>
`;
  return autoLinkHtml(html, concert.page, peopleProfiles);
}

let written = 0;
let skipped = 0;
let manualConverted = 0;
let exceptionSkipped = 0;

for (const concert of concerts) {
  if (!concert || !concert.page || concert.status === 'cancelled') continue;
  if (onlyIds.size && !onlyIds.has(concert.id)) continue;
  if (!concert.page.startsWith('concerts/')) continue;

  const output = path.join(root, concert.page);
  if (fs.existsSync(output)) {
    const current = fs.readFileSync(output, 'utf8');
    if (!current.includes(generatedMarker)) {
      if (manualPageExceptions.has(concert.id)) {
        skipped += 1;
        exceptionSkipped += 1;
        continue;
      }
      if (!overwriteManual) {
        skipped += 1;
        continue;
      }
      manualConverted += 1;
    }
  }

  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, render(concert).replace(/[ \t]+$/gm, ''));
  written += 1;
}

console.log(`generated concert pages: ${written}; skipped existing manual pages: ${skipped}; converted manual pages: ${manualConverted}; manual exceptions: ${exceptionSkipped}`);
