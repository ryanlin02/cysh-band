#!/usr/bin/env node
/*
  從會員後台拉取「已核准／已發布」的公開內容，轉為本站既有資料來源格式。
  此腳本只持有窄範圍同步 token；會員後台不持有 GitHub 寫入權限。
*/
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const apiBase = String(process.env.MEMBER_PUBLISH_API_URL || 'https://members.cysh.band/api/publish').replace(/\/$/, '');
const token = process.env.MEMBER_PUBLISH_SYNC_TOKEN || '';
const statePath = path.join(root, 'scripts', 'output', 'member-publish-state.json');

function requireToken() {
  if (token.length < 32) throw new Error('缺少 MEMBER_PUBLISH_SYNC_TOKEN（至少 32 字元）');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function replaceGeneratedBlock(relativePath, marker, value) {
  const filePath = path.join(root, relativePath);
  const source = fs.readFileSync(filePath, 'utf8');
  const start = `// <${marker}>`;
  const end = `// </${marker}>`;
  const pattern = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
  if (!pattern.test(source)) throw new Error(`${relativePath} 缺少 ${marker} 同步標記`);
  fs.writeFileSync(filePath, source.replace(pattern, `${start}\n${value}\n${end}`));
}

function safePublicPhoto(url, alumniNumber) {
  if (!url) return '../assets/img/members/blank.webp';
  const local = String(url).replace(/^https:\/\/cysh\.band\//, '../');
  return local.startsWith('../assets/img/members/') ? local : `../assets/img/members/${alumniNumber}.webp`;
}

function publicDateTime(value) {
  const date = new Date(value || Date.now());
  const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const fields = Object.fromEntries(formatter.formatToParts(date).filter((item) => item.type !== 'literal').map((item) => [item.type, item.value]));
  return { date: `${fields.year}-${fields.month}-${fields.day}`, time: `${fields.hour}:${fields.minute}` };
}

function webpDimensions(bytes) {
  if (bytes.length < 30 || bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') return null;
  const kind = bytes.toString('ascii', 12, 16);
  if (kind === 'VP8X') return { width: 1 + bytes.readUIntLE(24, 3), height: 1 + bytes.readUIntLE(27, 3) };
  if (kind === 'VP8L' && bytes[20] === 0x2f) {
    const bits = bytes.readUInt32LE(21);
    return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
  }
  if (kind === 'VP8 ' && bytes[23] === 0x9d && bytes[24] === 0x01 && bytes[25] === 0x2a) {
    return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff };
  }
  return null;
}

function profileSource(profile) {
  const sections = Array.isArray(profile.sections) ? profile.sections : [];
  return [`<p>${escapeHtml(profile.summary)}</p>`, ...sections.map((section) => `<h3>${escapeHtml(section.heading)}</h3>\n<p>${escapeHtml(section.body).replace(/\n/g, '<br>')}</p>`)].join('\n\n') + '\n';
}

function articleSource(article) {
  const sections = Array.isArray(article.sections) ? article.sections : [];
  return sections.map((section) => `<h2>${escapeHtml(section.heading)}</h2>\n<p>${escapeHtml(section.body).replace(/\n/g, '<br>')}</p>`).join('\n\n') + '\n';
}

async function request(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { authorization: `Bearer ${token}`, ...(options.headers || {}) } });
  if (!response.ok) throw new Error(`發布 API ${response.status}: ${await response.text()}`);
  return response;
}

async function sync() {
  requireToken();
  const payload = await (await request(apiBase)).json();
  const profiles = Array.isArray(payload.profiles) ? payload.profiles : [];
  const articles = Array.isArray(payload.articles) ? payload.articles : [];

  const profileItems = [];
  const alumniPatches = [];
  for (const profile of profiles) {
    const num = String(profile.member?.alumniNumber || '');
    if (!/^\d{4}$/.test(num)) throw new Error(`人物資料缺少有效校友編號：${profile.member_id}`);
    const source = `content/people/${num}.html`;
    const output = `people/${num}.html`;
    fs.mkdirSync(path.join(root, 'content', 'people'), { recursive: true });
    fs.writeFileSync(path.join(root, source), profileSource(profile));

    let photo = safePublicPhoto(profile.photo_url, num);
    if (profile.photo_storage_path) {
      const response = await request(`${apiBase}/photos/${encodeURIComponent(profile.member_id)}?revision=${encodeURIComponent(profile.revision)}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      const dimensions = webpDimensions(bytes);
      if (!dimensions || dimensions.width !== 480 || dimensions.height !== 480 || bytes.length > 2097152) {
        throw new Error(`人物 ${num} 的照片不是網站規範 480x480 WebP（上限 2 MB）`);
      }
      const photoPath = path.join(root, 'assets', 'img', 'members', `${num}.webp`);
      fs.writeFileSync(photoPath, bytes);
      photo = `../assets/img/members/${num}.webp`;
    }
    const facts = (Array.isArray(profile.facts) ? profile.facts : []).map((fact) => [escapeHtml(fact.label), escapeHtml(fact.value)]);
    profileItems.push({
      num,
      name: profile.display_name,
      source,
      output,
      title: `${profile.display_name}（${num}）｜嘉義高中管樂隊校友`,
      description: profile.summary,
      ogTitle: `${profile.display_name}（${num}）｜${profile.headline}`,
      ogDescription: profile.summary,
      headlineHtml: escapeHtml(profile.headline),
      photo,
      facts,
      navActive: 'roster',
      rosterLink: `../roster.html#p-${num}`,
      relatedLinks: [],
      updatedBy: profile.reviewedByName || profile.display_name,
      updatedAt: profile.reviewed_at || profile.updated_at,
      sourceHtml: `本文由${escapeHtml(profile.display_name)}透過會員後台提供，經${escapeHtml(profile.reviewedByName || '內容編輯')}審核後發布；歷史資料如有補充或更正，將保留更新者與時間紀錄。`
    });
    alumniPatches.push({ num, name: profile.display_name, photo: profile.photo_storage_path ? num : path.basename(photo, '.webp'), link: output });
  }

  const newsItems = [];
  for (const article of articles) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) throw new Error(`文章網址代號不安全：${article.id}`);
    const published = publicDateTime(article.reviewed_at || article.published_at || article.updated_at);
    const modified = publicDateTime(article.updated_at);
    const id = `${published.date}-${article.slug}`.replace(new RegExp(`^${published.date}-${published.date}-`), `${published.date}-`);
    const source = `content/news/${id}.html`;
    const output = `news/${id}.html`;
    fs.mkdirSync(path.join(root, 'content', 'news'), { recursive: true });
    fs.writeFileSync(path.join(root, source), articleSource(article));
    newsItems.push({
      id, date: published.date, time: published.time,
      modifiedDate: modified.date, modifiedTime: modified.time,
      category: article.category,
      tags: article.tags,
      pinned: false,
      priority: 'normal',
      title: article.title,
      summary: article.summary,
      source, output, url: output,
      thumb: 'assets/img/og.jpg',
      ogImage: 'assets/img/og.jpg',
      ogImageWidth: '1200', ogImageHeight: '630',
      pageTitle: `${article.title}｜最新消息｜嘉義高中管樂隊`,
      ogTitle: article.title,
      description: article.summary,
      ogDescription: article.summary,
      status: 'published',
      sourceNotes: `會員 ${article.author?.name || '校友'} 投稿，經 ${article.reviewedByName || '內容編輯'} 審核後發布。`
    });
  }

  replaceGeneratedBlock('data/people-profiles.js', 'member-publish-profiles', `window.MEMBER_MANAGED_PEOPLE_PROFILES = ${JSON.stringify(profileItems, null, 2)};`);
  replaceGeneratedBlock('data/alumni.js', 'member-publish-alumni', `window.MEMBER_MANAGED_ALUMNI_PROFILES = ${JSON.stringify(alumniPatches, null, 2)};`);
  replaceGeneratedBlock('data/news.js', 'member-publish-news', `window.MEMBER_PUBLISHED_NEWS = ${JSON.stringify(newsItems, null, 2)};`);

  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, JSON.stringify({
    generatedAt: payload.generatedAt,
    profiles: profiles.map((profile) => ({ id: profile.member_id, revision: profile.revision })),
    articles: articles.map((article) => ({ id: article.id, revision: article.revision })),
  }, null, 2) + '\n');
  console.log(`會員發布同步：人物 ${profiles.length}；文章 ${articles.length}`);
}

async function acknowledge(commitSha) {
  requireToken();
  if (!/^[0-9a-f]{40}$/i.test(commitSha || '')) throw new Error('ack 需要 40 字元 Git commit SHA');
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  const result = await (await request(apiBase, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...state, commitSha }) })).json();
  console.log(`發布回報完成：人物 ${result.profilesPublished}；文章 ${result.articlesPublished}`);
}

const ackIndex = process.argv.indexOf('--ack');
(ackIndex >= 0 ? acknowledge(process.argv[ackIndex + 1]) : sync()).catch((error) => { console.error(error); process.exitCode = 1; });
