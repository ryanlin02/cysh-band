#!/usr/bin/env node
/*
  從會員後台拉取「已核准／已發布」的公開內容，轉為本站既有資料來源格式。
  此腳本只持有窄範圍同步 token；會員後台不持有 GitHub 寫入權限。
*/
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const { renderArticleSections } = require('./lib/article-markup');

// 兩個專案各有一份 article-markup.js，內容必須完全相同，否則預覽與正式頁會不一致
function verifyMarkupInSync() {
  const twin = path.join(root, '..', 'cysh-band-community', 'src', 'lib', 'article-markup.js');
  if (!fs.existsSync(twin)) return;
  const mine = fs.readFileSync(path.join(__dirname, 'lib', 'article-markup.js'), 'utf8');
  if (fs.readFileSync(twin, 'utf8') !== mine) {
    throw new Error('article-markup.js 兩個專案版本不一致，請先同步後再發布（會導致預覽與正式頁不同）');
  }
}
const apiBase = String(process.env.MEMBER_PUBLISH_API_URL || 'https://members.cysh.band/api/publish').replace(/\/$/, '');
const token = process.env.MEMBER_PUBLISH_SYNC_TOKEN || '';
const statePath = path.join(root, 'scripts', 'output', 'member-publish-state.json');
const manifestPath = path.join(root, 'data', 'member-published-manifest.json');

function requireToken() {
  if (token.length < 32) throw new Error('缺少 MEMBER_PUBLISH_SYNC_TOKEN（至少 32 字元）');
}

/**
 * 摘要與標題只會顯示成一行（清單、RSS、社群預覽），
 * 會員打字時常帶著換行與行尾空白（例如「8/28 18:30 」換行接地點）。
 * 官網的驗證步驟看到「行尾有空白」會讓整個發布失敗——
 * 一個人多打一個空格不該讓整個網站停止更新，所以在這裡就收成一行。
 */
function oneLine(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
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

function readManifest() {
  try {
    const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return { version: 1, articles: Array.isArray(parsed.articles) ? parsed.articles : [] };
  } catch {
    return { version: 1, articles: [] };
  }
}

function removeManagedFile(relativePath) {
  if (!/^(content\/news|news)\/[a-z0-9-]+[.]html$/.test(String(relativePath || ''))) {
    throw new Error(`拒絕刪除不在會員文章範圍內的檔案：${relativePath}`);
  }
  const absolutePath = path.join(root, relativePath);
  if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
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

/* 公開介紹的正文，與文章用同一份轉換程式（renderArticleSections）。
   以前這裡是自己寫的簡易版：整段跳脫、換行變 <br>，於是同一種寫法
   在文章裡會變成粗體、引言、清單，在人物介紹裡卻原封不動印出 ** 和 >。
   同一個網站兩種規則，寫的人記不住，也違反規範 2.3-B 的「兩邊要長得一樣」。
   人物頁的段落標題用 h3（規範 7.2），文章用 h2。 */
function profileSource(profile) {
  const sections = Array.isArray(profile.sections) ? profile.sections : [];
  const lede = `<p class="lede">${escapeHtml(profile.summary)}</p>`;
  const body = renderArticleSections(sections, { headingLevel: 'h3', assetPrefix: '../' });
  return `${lede}\n\n${body}`;
}

// 圖片：會員平台上傳在 Supabase，官網要自己保存一份，
// 這樣官網不依賴外部服務，日後對方停用也不會整批破圖。
async function downloadArticleImage(remoteUrl, articleId, index) {
  const fileName = `${articleId}-${index + 1}.webp`;
  const relative = `assets/img/news/${fileName}`;
  const target = path.join(root, relative);
  if (fs.existsSync(target)) return relative;
  const response = await fetch(remoteUrl);
  if (!response.ok) throw new Error(`文章圖片下載失敗 ${response.status}：${remoteUrl}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
  await downloadArticleThumb(remoteUrl, relative);
  return relative;
}

/**
 * 列表用的小圖。
 * 會員平台從 2026-08-22 起，上傳時會在原圖旁邊另存一張 480px 的小圖，
 * 檔名就是原圖加上 -thumb（例如 abc.webp 旁邊有 abc-thumb.webp）。
 * 抓得到就一起存一份，representativeImage() 原本就會優先用 xxx-thumb.webp；
 * 抓不到（那時候還沒有這個功能的舊圖片）就沿用原圖，絕不讓發布失敗。
 *
 * 只在「原圖是這一次才下載的」時候才試著抓小圖：已經在版本庫裡的舊圖片
 * 不會每小時再去要一次注定 404 的網址。
 */
async function downloadArticleThumb(remoteUrl, relative) {
  const target = path.join(root, relative.replace(/\.webp$/i, '-thumb.webp'));
  if (fs.existsSync(target)) return;
  const remoteThumb = remoteUrl.replace(/\.webp(\?|$)/i, '-thumb.webp$1');
  if (remoteThumb === remoteUrl) return;
  let response;
  try {
    response = await fetch(remoteThumb);
  } catch {
    return;
  }
  if (!response.ok) return;
  fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
}

async function localizeArticleImages(article, articleId) {
  const sections = Array.isArray(article.sections) ? article.sections : [];
  let counter = 0;
  const output = [];
  let lead = null;   // 第一張圖＝這篇文章的代表圖（列表縮圖、社群預覽、內文首圖都用它）
  for (const section of sections) {
    const images = [];
    for (const image of Array.isArray(section.images) ? section.images : []) {
      const raw = String(image.path || '').trim();
      if (!raw) continue;
      let localized;
      if (raw.startsWith('assets/')) {
        localized = { ...image, path: raw };
      } else {
        const remote = /^https?:\/\//i.test(raw)
          ? raw
          : `${String(process.env.MEMBER_ARTICLE_IMAGE_BASE || 'https://ismoiwguyqmvuqkgxlqk.supabase.co/storage/v1/object/public/article-images').replace(/\/$/, '')}/${raw}`;
        localized = { ...image, path: await downloadArticleImage(remote, articleId, counter), source: remote };
      }
      images.push(localized);
      if (!lead) lead = localized;
      counter += 1;
    }
    output.push({ ...section, images });
  }
  return { sections: output, lead };
}

/**
 * 文章的代表圖。
 * 少了這一段，最新消息列表與每篇文章的首圖都會變成官網主視覺（assets/img/og.jpg）——
 * 官網原本手寫的條目本來就是一篇一張自己的圖，發布流程必須照樣產生。
 *
 * 縮圖挑選順序（與官網原本手寫的作法一致）：
 *   ① 影像館的照片本來就有 thumb 尺寸，列表用 thumb、內文用 large
 *   ② 官網已經備好的小圖（xxx-thumb.webp 或 xxx_thumb.webp）
 *   ③ 都沒有就用原圖（會員上傳時已經壓到最寬 1600px）
 */
function representativeImage(lead) {
  const fallback = { thumb: 'assets/img/og.jpg', ogImage: 'assets/img/og.jpg', ogImageWidth: '1200', ogImageHeight: '630', imageAlt: '嘉義高中管樂隊' };
  if (!lead || !lead.path) return fallback;
  const source = String(lead.source || '');
  let thumb = lead.path;
  if (/^https:\/\/img\.cysh\.band\/large\//i.test(source)) {
    thumb = source.replace('/large/', '/thumb/');
  } else {
    // 有些海報帶著 ?v=… 的版本參數，要先拆掉才找得到旁邊那張小圖
    const file = lead.path.split('?')[0];
    const sized = ['-thumb.webp', '_thumb.webp']
      .map((suffix) => file.replace(/\.webp$/i, suffix))
      .find((candidate) => fs.existsSync(path.join(root, candidate)));
    if (sized) thumb = sized;
  }
  return {
    thumb,
    ogImage: lead.path,
    ogImageWidth: String(lead.width || '1200'),
    ogImageHeight: String(lead.height || '630'),
    imageAlt: String(lead.alt || lead.caption || '嘉義高中管樂隊'),
  };
}

function articleSource(article) {
  // 與會員平台預覽使用同一份轉換程式，所見即所得
  return renderArticleSections(article.sections, { assetPrefix: '../' });
}

function aiEditorialDisclosure(article) {
  // 說明句改由 generate-news-pages.js 的 articleProvenance 統一產生
  //（每一篇都要有，寫法才會一致），這裡只留資料來源的連結。
  if (article.editorialOrigin !== 'ai_assisted') return '';
  const sources = (Array.isArray(article.sourceItems) ? article.sourceItems : []).slice(0, 8);
  const links = sources.map((source) => `<li><a href="${escapeHtml(String(source.url || ''))}" target="_blank" rel="noopener noreferrer">${escapeHtml(String(source.publisher || source.title || '公開來源'))}</a></li>`).join('');
  if (!links) return '';
  return `<aside class="news-callout ai-editorial-disclosure" aria-label="資料來源">
  <ul>${links}</ul>
</aside>`;
}

async function request(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { authorization: `Bearer ${token}`, ...(options.headers || {}) } });
  if (!response.ok) throw new Error(`發布 API ${response.status}: ${await response.text()}`);
  return response;
}

let activeAiArticle = null;

async function reportAiArticleFailure(article, error) {
  try {
    await request(apiBase, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ failedArticles: [{ id: article.id, revision: article.revision, error: String(error?.message || error).slice(0, 2000) }] })
    });
  } catch (reportError) {
    console.error(`AI 文章失敗回報也未成功：${reportError.message}`);
  }
}

async function sync() {
  requireToken();
  verifyMarkupInSync();
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
    // 這個檔每次同步都會整份重寫。加一行標記說清楚，不然有人手動改了會安靜地不見。
    const managedHeader = '<!-- 這一頁的內容由會員平台的「公開介紹」產生，每次同步都會整份重寫。\n'
      + '     直接改這個檔沒有用，下一次同步就會被蓋掉。\n'
      + '     要修改請到 https://members.cysh.band/profile 編輯後送審。 -->\n';
    fs.writeFileSync(path.join(root, source), managedHeader + profileSource(profile));

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
      description: oneLine(profile.summary),
      ogTitle: `${profile.display_name}（${num}）｜${oneLine(profile.headline)}`,
      ogDescription: oneLine(profile.summary),
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
  const nextManifestArticles = [];
  for (const article of articles) {
    activeAiArticle = article.editorialOrigin === 'ai_assisted' ? { id: article.id, revision: article.revision } : null;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) throw new Error(`文章網址代號不安全：${article.id}`);
    // 回顧補記可使用管理員選定的內容日期；實際核准與上線時間仍由會員系統另外保存。
    const published = publicDateTime(article.publicDisplayDate ? `${article.publicDisplayDate}T12:00:00+08:00` : article.reviewed_at || article.published_at || article.updated_at);
    const modified = publicDateTime(article.updated_at);
    const id = `${published.date}-${article.slug}`.replace(new RegExp(`^${published.date}-${published.date}-`), `${published.date}-`);
    const source = `content/news/${id}.html`;
    const output = `news/${id}.html`;
    fs.mkdirSync(path.join(root, 'content', 'news'), { recursive: true });
    const { sections: localizedSections, lead } = await localizeArticleImages(article, id);
    const localized = { ...article, sections: localizedSections };
    const representative = representativeImage(lead);
    const disclosure = aiEditorialDisclosure(article);
    fs.writeFileSync(path.join(root, source), `${articleSource(localized)}${disclosure ? `\n${disclosure}` : ''}`);
    nextManifestArticles.push({ id: article.id, revision: article.revision, source, output });
    newsItems.push({
      id, date: published.date, time: published.time,
      modifiedDate: modified.date, modifiedTime: modified.time,
      category: article.category,
      tags: article.tags,
      pinned: false,
      priority: 'normal',
      title: oneLine(article.title),
      summary: oneLine(article.summary),
      source, output, url: output,
      thumb: representative.thumb,
      ogImage: representative.ogImage,
      ogImageWidth: representative.ogImageWidth,
      ogImageHeight: representative.ogImageHeight,
      imageAlt: representative.imageAlt,
      pageTitle: `${oneLine(article.title)}｜最新消息｜嘉義高中管樂隊`,
      ogTitle: oneLine(article.title),
      description: oneLine(article.summary),
      ogDescription: oneLine(article.summary),
      status: 'published',
      authorName: article.author?.name || null,
      authorAlumniNumber: article.author?.alumniNumber || null,
      revisedBy: Array.isArray(article.revisedBy) ? article.revisedBy : [],
      sourceNotes: article.editorialOrigin === 'ai_assisted'
        ? `嘉中管樂官方網站 AI 小編依公開來源協助整理，經 ${article.reviewedByName || '管理員'} 核准後發布。`
        : `會員 ${article.author?.name || '校友'} 投稿，經 ${article.reviewedByName || '內容編輯'} 審核後發布。`
    });
    activeAiArticle = null;
  }

  const previousManifest = readManifest();
  const nextIds = new Set(nextManifestArticles.map((article) => article.id));
  for (const previous of previousManifest.articles) {
    const current = nextManifestArticles.find((article) => article.id === previous.id);
    if (!nextIds.has(previous.id) || current?.source !== previous.source) removeManagedFile(previous.source);
    if (!nextIds.has(previous.id) || current?.output !== previous.output) removeManagedFile(previous.output);
  }

  replaceGeneratedBlock('data/people-profiles.js', 'member-publish-profiles', `window.MEMBER_MANAGED_PEOPLE_PROFILES = ${JSON.stringify(profileItems, null, 2)};`);
  replaceGeneratedBlock('data/alumni.js', 'member-publish-alumni', `window.MEMBER_MANAGED_ALUMNI_PROFILES = ${JSON.stringify(alumniPatches, null, 2)};`);
  // 各屆「參與過的校友」：只同步已確認的紀錄，待確認與未採用的不出官網
  const participation = Array.isArray(payload.participation) ? payload.participation : [];
  replaceGeneratedBlock('data/concert-participants.js', 'member-publish-participants',
    `window.MEMBER_CONFIRMED_PARTICIPATION = ${JSON.stringify(participation, null, 2)};`);
  replaceGeneratedBlock('data/news.js', 'member-publish-news', `window.MEMBER_PUBLISHED_NEWS = ${JSON.stringify(newsItems, null, 2)};`);
  fs.writeFileSync(manifestPath, JSON.stringify({ version: 1, articles: nextManifestArticles }, null, 2) + '\n');

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

/*
  發布流程失敗時要讓會員平台知道。
  以前只要任何一個步驟失敗（例如全站檢查沒過），整個工作就結束，
  什麼都不會回報——後台只會一直顯示「已核准，等待上官網」，
  沒有人知道其實是壞掉了、也不知道壞在哪裡。
*/
async function reportSyncFailure(step, message) {
  requireToken();
  const text = String(message || '').replace(/\s+/g, ' ').trim().slice(0, 2000);
  const result = await (await request(apiBase, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ syncFailure: { step: String(step || '未知步驟').slice(0, 120), message: text || '沒有錯誤訊息' } }),
  })).json();
  console.log(`已回報發布失敗：${JSON.stringify(result)}`);
}

const ackIndex = process.argv.indexOf('--ack');
const failIndex = process.argv.indexOf('--fail');
const task = failIndex >= 0
  ? reportSyncFailure(process.argv[failIndex + 1], process.argv[failIndex + 2])
  : ackIndex >= 0 ? acknowledge(process.argv[ackIndex + 1]) : sync();
task.catch(async (error) => {
  if (activeAiArticle) await reportAiArticleFailure(activeAiArticle, error);
  console.error(error); process.exitCode = 1;
});
