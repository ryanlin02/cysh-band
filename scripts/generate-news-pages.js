#!/usr/bin/env node
/* 產生已模板化的最新消息文章、最新消息總覽與 RSS。
   GitHub Pages 仍使用輸出的靜態 HTML；此腳本只在本地維護時執行。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');
const { autoLinkHtml } = require('./lib/people-auto-link');

const root = path.join(__dirname, '..');
const { escapeHtml, renderPage, styleVersion } = createRenderer(root);
/* 樣式快取版本已改由 lib/site-template.js 統一計算（全站同一個值）；
   這裡保留舊名稱是為了 check-site.js 仍以它比對輸出。 */
const NEWS_STYLE_VERSION = styleVersion;

global.window = global;
require(path.join(root, 'data', 'news.js'));
require(path.join(root, 'data', 'people-profiles.js'));

const profiles = global.PEOPLE_PROFILES || [];

require(path.join(root, 'data', 'news-provenance.js'));
require(path.join(root, 'data', 'news-taxonomy.js'));
const CATEGORY_MAP = global.NEWS_CATEGORY_MAP || {};
/** 舊分類自動對到固定的六種；沒對到的原樣保留，check-site 會抓出來。 */
function mapCategory(name) {
  return CATEGORY_MAP[String(name || '').trim()] || String(name || '').trim();
}
const provenanceConfig = global.NEWS_PROVENANCE || { byAuthor: {}, byArticle: {} };
// 姓名 → 校友編號：撰稿與核准那一行要把編號一起寫出來
const numberByName = new Map(profiles.filter((p) => p.name && p.num).map((p) => [p.name, String(p.num)]));

function personLabel(name, alumniNumber) {
  const clean = String(name || '').trim();
  if (!clean) return '';
  const num = String(alumniNumber || numberByName.get(clean) || '').trim();
  return num ? `${clean}（${num}）` : clean;
}

/* 撰稿與核准：每一篇文章都要有，而且寫法一致。
   誰寫的由 data/news-provenance.js 聲明（發布者自己說的，不是程式猜的）。
   sourceNotes 是這一篇的資料來源說明，有就一起列出來。 */
/* 內文裡如果還留著舊版的 AI 揭露區塊，把它抽出來：
   說明句改由 articleProvenance 統一產生，只留下資料來源的連結。 */
function extractLegacyDisclosure(body) {
  const match = body.match(/\s*<aside class="news-callout ai-editorial-disclosure"[\s\S]*?<\/aside>/);
  if (!match) return { body, sourceLinks: '' };
  const links = (match[0].match(/<ul>[\s\S]*?<\/ul>/) || [''])[0];
  return { body: body.replace(match[0], ''), sourceLinks: links };
}

function articleProvenance(article, sourceLinks = '') {
  const author = String(article.authorName || '').trim();
  if (!author) return '';
  const origin = provenanceConfig.byArticle?.[article.id]
    || (article.authorAlumniNumber ? provenanceConfig.byAuthor?.[String(article.authorAlumniNumber)] : null)
    || (author === 'AI 小編' ? 'ai_assisted' : 'member');

  // sourceNotes 目前的寫法是「…，經 某某 核准後發布。」，把核准的人抓出來
  const notes = String(article.sourceNotes || '').trim();
  const approvedBy = (notes.match(/經\s*([^\s，,。]+)\s*(?:核准|審核)/) || [])[1] || author;
  const writerLabel = origin === 'ai_assisted' && author === 'AI 小編'
    ? '嘉中管樂官方網站 AI 小編'
    : personLabel(author, article.authorAlumniNumber);
  const approverLabel = personLabel(approvedBy);

  let sentence;
  if (origin === 'ai_assisted') {
    sentence = author === 'AI 小編'
      ? `本文由嘉中管樂官方網站 AI 小編依公開來源協助整理，並由 ${approverLabel} 核准後發布。`
      : `本文由嘉中管樂官方網站 AI 小編協助整理，並由 ${writerLabel} 核准後發布。`;
  } else {
    sentence = writerLabel === approverLabel
      ? `本文由 ${writerLabel} 撰寫並核准後發布。`
      : `本文由 ${writerLabel} 撰寫，並由 ${approverLabel} 核准後發布。`;
  }

  // 資料來源說明：AI 那一篇的來源連結已經寫在內文的區塊裡，這裡只補文字說明
  const sourceLine = notes && !/核准後發布|審核後發布/.test(notes)
    ? `<p class="article-end-note"><strong>資料來源</strong>　${escapeHtml(notes)}</p>`
    : '';

  // 發布之後被誰改過。一個人就寫名字，兩個人寫兩個，三個以上寫「某某等 N 人」——
  // 不是省略，是因為列出五六個名字讀者反而看不懂重點，最後修訂日期才是他要的資訊。
  const revised = (Array.isArray(article.revisedBy) ? article.revisedBy : [])
    .filter((item) => item && item.name);
  let revisionLine = '';
  if (revised.length) {
    const labels = revised.map((item) => personLabel(item.name, item.alumniNumber));
    const lastAt = revised.map((item) => String(item.at || '').slice(0, 10)).filter(Boolean).sort().pop();
    const who = labels.length === 1
      ? labels[0]
      : labels.length === 2
        ? `${labels[0]}、${labels[1]}`
        : `${labels[0]} 等 ${labels.length} 人`;
    revisionLine = `發布後由 ${who}修訂過${lastAt ? `，最後修訂 ${lastAt}` : ''}。`;
  }
  return { sentence, sourceLine, sourceLinks, revisionLine };
}

function isExternalUrl(value) {
  return /^https?:\/\//i.test(String(value || ''));
}

function assetUrl(value, assetPrefix = '') {
  return isExternalUrl(value) ? value : assetPrefix + value;
}

function canonicalAssetUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (isExternalUrl(raw)) return raw;
  return `https://cysh.band/${raw.replace(/^(\.\.\/)+/, '').replace(/^\/+/, '')}`;
}

function displayAssetUrl(value, assetPrefix = '../') {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (raw.startsWith('https://cysh.band/')) {
    return assetPrefix + raw.slice('https://cysh.band/'.length);
  }
  return assetUrl(raw, assetPrefix);
}

function normalizeArticle(item) {
  const output = item.output || item.url;
  const title = item.title || item.ogTitle || '';
  return {
    ...item,
    id: item.id || output.replace(/^news\//, '').replace(/\.html$/, ''),
    output,
    url: item.url || output,
    source: item.source,
    title,
    listTitle: item.listTitle || title,
    pageTitle: item.pageTitle || `${title}｜最新消息｜嘉義高中管樂隊`,
    ogTitle: item.ogTitle || title,
    description: item.description || item.summary || title,
    ogDescription: item.ogDescription || item.description || item.summary || title,
    headlineHtml: item.headlineHtml || escapeHtml(title),
    category: mapCategory(item.category) || '團的日常',
    tags: Array.isArray(item.tags) ? item.tags : [],
    pinUntil: item.pinUntil || '',
    priority: item.priority || (item.pinned ? 'important' : 'normal'),
    time: item.time || '12:00',
    modifiedDate: item.modifiedDate || item.date,
    modifiedTime: item.modifiedTime || item.time || '12:00',
    ogImage: canonicalAssetUrl(item.ogImage || item.thumb || 'assets/img/og.jpg'),
    ogImageWidth: String(item.ogImageWidth || '1200'),
    ogImageHeight: String(item.ogImageHeight || '630'),
    imageAlt: item.imageAlt || title,
    imageCaption: item.imageCaption || '',
    status: item.status || 'published'
  };
}

const articles = (global.NEWS || []).map(normalizeArticle);

function textFromHtml(html) {
  return String(html || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function articleNavLabel(article) {
  return textFromHtml(article.ogTitle || article.title).replace(/｜.*$/, '');
}

function adjacentArticles(article) {
  const index = articles.findIndex((item) => item.output === article.output);
  if (index < 0) return { previous: null, next: null };
  return {
    previous: articles[index - 1] || null,
    next: articles[index + 1] || null
  };
}

function tagLink(tag, assetPrefix = '../') {
  return `${assetPrefix}news/index.html?tag=${encodeURIComponent(tag)}`;
}

function categoryLink(category, assetPrefix = '../') {
  return `${assetPrefix}news/index.html?category=${encodeURIComponent(category)}`;
}

function articleMeta(article) {
  const tags = article.tags.map((tag) => `<a href="${escapeHtml(tagLink(tag))}">#${escapeHtml(tag)}</a>`).join('');
  const meta = [
    `<a class="news-category-pill" href="${escapeHtml(categoryLink(article.category))}">${escapeHtml(article.category)}</a>`,
    `<span class="article-date"><span>發布</span><time datetime="${escapeHtml(article.date)}">${escapeHtml(article.date)}</time></span>`,
    `<span class="article-date"><span>最後更新</span><time datetime="${escapeHtml(article.modifiedDate)}">${escapeHtml(article.modifiedDate)}</time></span>`
  ];
  if (article.pinned && article.pinUntil) meta.push('<span class="news-priority-badge">重要</span>');
  meta.push(`<span class="article-tags">${tags}</span>`);
  return `<div class="article-meta">
    ${meta.join('\n    ')}
  </div>`;
}

function setImgAttribute(tag, name, value) {
  const pattern = new RegExp(`\\s${name}=(?:"[^"]*"|'[^']*'|[^\\s>]+)`, 'i');
  const cleaned = tag.replace(pattern, '');
  const selfClosing = /\/>$/.test(cleaned);
  return cleaned.replace(/\s*\/?>$/, ` ${name}="${escapeHtml(value)}"${selfClosing ? ' />' : '>'}`);
}

function setInlineStyleProperty(tag, name, value) {
  const styleMatch = tag.match(/\sstyle=(["'])(.*?)\1/i);
  const declarations = (styleMatch ? styleMatch[2] : '')
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => !new RegExp(`^${name}\\s*:`, 'i').test(item));
  declarations.push(`${name}: ${value}`);
  return setImgAttribute(tag, 'style', `${declarations.join('; ')};`);
}

function optimizeImageTag(tag, { lead = false, width = '', height = '' } = {}) {
  let output = tag;
  output = setImgAttribute(output, 'loading', lead ? 'eager' : 'lazy');
  output = setImgAttribute(output, 'decoding', 'async');
  output = setInlineStyleProperty(output, 'height', 'auto');
  if (lead) output = setImgAttribute(output, 'fetchpriority', 'high');
  if (width) output = setImgAttribute(output, 'width', width);
  if (height) output = setImgAttribute(output, 'height', height);
  return output;
}

function addRepresentativeSourceSet(tag, article) {
  if (!article.thumb || Number(article.ogImageWidth) <= 480) return tag;
  let output = setImgAttribute(
    tag,
    'srcset',
    `${displayAssetUrl(article.thumb)} 480w, ${displayAssetUrl(article.ogImage)} ${article.ogImageWidth}w`
  );
  output = setImgAttribute(output, 'sizes', '(max-width: 760px) calc(100vw - 40px), 720px');
  return output;
}

function addFigureClass(figure, className) {
  return figure.replace(/<figure\b([^>]*)>/i, (tag, attrs) => {
    const classMatch = attrs.match(/\sclass=(["'])(.*?)\1/i);
    if (!classMatch) return `<figure class="${className}"${attrs}>`;
    const classes = new Set(classMatch[2].split(/\s+/).filter(Boolean));
    classes.add(className);
    return tag.replace(classMatch[0], ` class="${[...classes].join(' ')}"`);
  });
}

function prepareArticleBody(article, sourceBody) {
  let body = String(sourceBody || '').trim();
  const figureMatch = body.match(/<figure\b[\s\S]*?<\/figure>/i);
  let leadFigure = '';
  let imageAlt = article.imageAlt;

  if (figureMatch && /<img\b/i.test(figureMatch[0])) {
    const sourceImage = (figureMatch[0].match(/<img\b[^>]*>/i) || [])[0] || '';
    imageAlt = (sourceImage.match(/\salt=(["'])(.*?)\1/i) || [])[2] || imageAlt;
    leadFigure = addFigureClass(figureMatch[0], 'news-lead-image')
      .replace(/<img\b[^>]*>/i, (tag) => {
        let image = setImgAttribute(tag, 'src', displayAssetUrl(article.ogImage));
        image = optimizeImageTag(image, {
          lead: true,
          width: article.ogImageWidth,
          height: article.ogImageHeight
        });
        return addRepresentativeSourceSet(image, article);
      });
    body = `${body.slice(0, figureMatch.index)}${body.slice(figureMatch.index + figureMatch[0].length)}`.trim();
  } else {
    const caption = article.imageCaption
      ? `\n  <figcaption>${escapeHtml(article.imageCaption)}</figcaption>`
      : '';
    const generatedImage = addRepresentativeSourceSet(optimizeImageTag(
      `<img src="${escapeHtml(displayAssetUrl(article.ogImage))}" alt="${escapeHtml(article.imageAlt)}">`,
      {
        lead: true,
        width: article.ogImageWidth,
        height: article.ogImageHeight
      }
    ), article);
    leadFigure = `<figure class="news-lead-image">
  ${generatedImage}${caption}
</figure>`;
  }

  body = body.replace(/<img\b[^>]*>/gi, (tag) => optimizeImageTag(tag));
  return { leadFigure, body, imageAlt };
}

function articleDateTime(date, time) {
  return `${date}T${time}:00+08:00`;
}

function renderArticleStructuredData(article) {
  const url = `https://cysh.band/${article.output}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: textFromHtml(article.ogTitle || article.title),
    description: article.description,
    image: [article.ogImage],
    datePublished: articleDateTime(article.date, article.time),
    dateModified: articleDateTime(article.modifiedDate, article.modifiedTime),
    author: {
      '@type': 'Organization',
      name: '嘉義高中管樂隊暨校友管樂團',
      url: 'https://cysh.band/about.html'
    },
    publisher: {
      '@type': 'Organization',
      name: '嘉義高中管樂隊暨校友管樂團',
      url: 'https://cysh.band/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cysh.band/assets/img/icon-192.png',
        width: 192,
        height: 192
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    articleSection: article.category,
    keywords: article.tags,
    inLanguage: 'zh-Hant-TW',
    isAccessibleForFree: true
  };
  return JSON.stringify(schema, null, 2).replace(/</g, '\\u003c');
}

function renderArticleExtraHead(article) {
  const published = articleDateTime(article.date, article.time);
  const modified = articleDateTime(article.modifiedDate, article.modifiedTime);
  const tags = article.tags.map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}">`).join('\n');
  return `<meta name="robots" content="max-image-preview:large">
<meta property="og:image:alt" content="${escapeHtml(article.imageAlt)}">
<meta name="twitter:title" content="${escapeHtml(article.ogTitle)}">
<meta name="twitter:description" content="${escapeHtml(article.ogDescription)}">
<meta name="twitter:image" content="${escapeHtml(article.ogImage)}">
<meta name="twitter:image:alt" content="${escapeHtml(article.imageAlt)}">
<meta property="article:published_time" content="${escapeHtml(published)}">
<meta property="article:modified_time" content="${escapeHtml(modified)}">
<meta property="article:section" content="${escapeHtml(article.category)}">
${tags}
<script type="application/ld+json">
${renderArticleStructuredData(article)}
</script>`;
}

function relatedArticles(article) {
  const related = articles
    .filter((item) => item.output !== article.output)
    .map((item) => {
      const sharedTags = item.tags.filter((tag) => article.tags.includes(tag)).length;
      const sameCategory = item.category === article.category ? 1 : 0;
      const sameConcert = item.relatedConcert && item.relatedConcert === article.relatedConcert ? 1 : 0;
      return { item, score: sharedTags * 3 + sameCategory * 2 + sameConcert };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || articles.indexOf(a.item) - articles.indexOf(b.item))
    .slice(0, 3)
    .map(({ item }) => item);

  if (!related.length) return '';
  return `<section class="related-news" aria-label="相關消息">
      <h2>相關消息</h2>
      <div class="related-news-list">
        ${scoredNewsLinks(related)}
      </div>
    </section>`;
}

function scoredNewsLinks(items) {
  return items.map((item) => `<a href="../${escapeHtml(item.output)}">
          <span>${escapeHtml(item.category)}</span>
          <b>${escapeHtml(item.title)}</b>
        </a>`).join('\n        ');
}

function articlePageNav(article) {
  const { previous, next } = adjacentArticles(article);
  const neighbors = [];
  if (previous) {
    neighbors.push(`<a class="page-neighbor previous" href="../${escapeHtml(previous.output)}"><span>← 上一篇消息</span><b>${escapeHtml(articleNavLabel(previous))}</b></a>`);
  }
  if (next) {
    neighbors.push(`<a class="page-neighbor next" href="../${escapeHtml(next.output)}"><span>下一篇消息 →</span><b>${escapeHtml(articleNavLabel(next))}</b></a>`);
  }
  return `<nav class="article-page-nav news-page-nav" aria-label="最新消息文章導覽">
      ${neighbors.length ? `<div class="page-neighbors">${neighbors.join('\n        ')}</div>` : ''}
      <a class="news-page-overview" href="../news/index.html">回到最新消息總覽</a>
    </nav>`;
}

/* 文章結尾：撰稿與核准 ＋ 社員的討論 ＋ 分享，合成同一區。
   以前這三件事各自一個框，同一頁出現三種框線，看起來像拼湊的。
   規範 2.3-A：外層已經是文章，內部用文字階層與細分隔線，不再加內嵌框。
   讚數與留言數由會員平台提供（js/news-social.js 去要），要不到就把那一列藏起來。 */
function articleEnd(article, sourceLinks = '') {
  const provenance = articleProvenance(article, sourceLinks);
  /* 會員平台那邊的網址代號：以 memberSlug 為準（由同步帶過來），
     沒有的才退回舊的猜法（官網早期手寫、從來沒進過會員平台的文章）。
     舊的猜法是「把 id 前面的日期切掉」，但會員平台的 slug 本身可能含日期，
     切掉就對不起來——25 篇有 24 篇的讚與留言因此查不到（2026-09-04 修）。 */
  const slug = String(article.memberSlug || '').trim()
    || String(article.id || '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const shareUrl = `https://cysh.band/${article.output}`;
  const statusId = `${article.id}-share-status`;
  const social = slug
    ? `<div class="article-end-meta" data-news-social data-slug="${escapeHtml(slug)}" hidden>
        <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10.5v9H4.5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"></path><path d="M7 10.5 11.5 3.5a2 2 0 0 1 2.9 2.4L13.3 9.5h5.2a2 2 0 0 1 1.95 2.45l-1.3 5.8a2.5 2.5 0 0 1-2.44 1.95H7z"></path></svg><b data-social-likes>0</b> 個讚</span>
        <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 12.5a7 7 0 0 1-7 7H8l-3.5 2.5v-4a7 7 0 0 1 3.5-13h5a7 7 0 0 1 7 7z"></path></svg><b data-social-comments>0</b> 則留言</span>
      </div>`
    : '';
  return `<footer class="article-end" aria-label="撰稿與核准與互動">
      <h2>撰稿與核准</h2>
      <p>${escapeHtml(provenance.sentence)}</p>
      ${provenance.revisionLine ? `<p class="article-end-note">${escapeHtml(provenance.revisionLine)}</p>` : ''}
      ${provenance.sourceLine}${provenance.sourceLinks ? `<p class="article-end-note"><strong>資料來源</strong></p>${provenance.sourceLinks}` : ''}
      ${social}
      <div class="article-end-actions">
        <a class="btn ghost" data-social-cta href="https://members.cysh.band/" hidden>登入後可以留言與按讚 →</a>
        <button class="btn ghost" type="button" data-news-share data-share-url="${escapeHtml(shareUrl)}" data-share-title="${escapeHtml(textFromHtml(article.ogTitle || article.title))}" data-share-text="${escapeHtml(article.summary)}" aria-describedby="${escapeHtml(statusId)}">分享這則消息</button>
      </div>
      <p class="article-end-status news-share-status" id="${escapeHtml(statusId)}" role="status" aria-live="polite" hidden></p>
      <p class="article-end-status" data-social-note hidden></p>
    </footer>`;
}

function renderArticle(article) {
  const sourceBody = fs.readFileSync(path.join(root, article.source), 'utf8');
  const prepared = prepareArticleBody(article, sourceBody);
  const pageArticle = { ...article, imageAlt: prepared.imageAlt || article.imageAlt };
  const indentedBody = prepared.body.split('\n').map((line) => (line ? `      ${line}` : line)).join('\n');
  const related = relatedArticles(article);
  const pageNav = articlePageNav(article);
  const legacy = extractLegacyDisclosure(indentedBody);
  const endBlock = articleEnd(article, legacy.sourceLinks);
  const content = `<header class="page-head">
  <p class="kicker">NEWS</p>
  <h1>${article.headlineHtml}</h1>
  <p class="news-dek">${escapeHtml(article.summary)}</p>
  ${articleMeta(article)}
</header>

<main class="wrap">
  <article class="section news-article">
    ${prepared.leadFigure}

    <div class="news-content">
${legacy.body}
    </div>

    ${endBlock}

${related ? `    ${related}\n\n` : ''}    ${pageNav}
  </article>
</main>`;

  const html = renderPage({
    title: article.pageTitle,
    description: article.description,
    ogTitle: article.ogTitle,
    ogDescription: article.ogDescription,
    ogImage: article.ogImage,
    ogImageWidth: article.ogImageWidth,
    ogImageHeight: article.ogImageHeight,
    url: `https://cysh.band/${article.output}`,
    ogType: 'article',
    extraHead: renderArticleExtraHead(pageArticle),
    styleVersion: NEWS_STYLE_VERSION,
    assetPrefix: '../',
    navActive: 'news',
    extraScripts: '<script src="../js/news-share.js" defer></script>\n  <script src="../js/news-social.js" defer></script>',
    content
  });
  return autoLinkHtml(html, article.output, profiles);
}

function countBy(items, selector) {
  const counts = new Map();
  for (const item of items) {
    const values = selector(item);
    for (const value of Array.isArray(values) ? values : [values]) {
      if (!value) continue;
      counts.set(value, (counts.get(value) || 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh-Hant'));
}

function renderNewsItem(article, assetPrefix = '../') {
  const tags = article.tags || [];
  const tail = article.thumb
    ? `<img class="news-thumb" src="${escapeHtml(assetUrl(article.thumb, assetPrefix))}" alt="" width="104" height="78" loading="lazy" decoding="async">`
    : '';
  const classes = ['news-item'];
  if (!article.thumb) classes.push('no-thumb');
  if (article.pinned && article.pinUntil) classes.push('is-pinned');
  if (article.priority === 'urgent') classes.push('is-urgent');
  return `<a class="${classes.join(' ')}" href="${escapeHtml(assetPrefix + article.output)}" data-category="${escapeHtml(article.category)}" data-tags="${escapeHtml(tags.join('|'))}" data-news-id="${escapeHtml(article.id)}">
      <span class="news-date"><span>${escapeHtml(article.category)}</span><time datetime="${escapeHtml(article.date)}">${escapeHtml(article.date)}</time></span>
      <span class="news-body">
        <span class="news-title-line">${article.pinned && article.pinUntil ? '<em>重要</em>' : ''}<b>${escapeHtml(article.listTitle)}</b></span>
        <span class="news-summary">${escapeHtml(article.summary)}</span>
      </span>
      ${tail}
    </a>`;
}

function renderFilterButton(label, count, attr, value, active = false) {
  return `<button class="news-filter${active ? ' active' : ''}" type="button" ${attr}="${escapeHtml(value)}" aria-pressed="${active ? 'true' : 'false'}">${escapeHtml(label)}<span>${count}</span></button>`;
}

function renderNewsIndex() {
  const categoryCounts = countBy(articles, (item) => item.category);
  const tagCounts = countBy(articles, (item) => item.tags);
  const allItems = articles;

  const filters = [
    renderFilterButton('全部', articles.length, 'data-news-filter', 'all', true),
    ...categoryCounts.map(([category, count]) => renderFilterButton(category, count, 'data-news-filter', category))
  ].join('\n          ');

  const curatedTopics = Array.isArray(global.NEWS_INDEX_TOPICS) ? global.NEWS_INDEX_TOPICS : [];
  const curatedTopicCounts = curatedTopics
    .map((tag) => [tag, tagCounts.find(([candidate]) => candidate === tag)?.[1] || 0])
    .filter(([, count]) => count > 0)
    .slice(0, 5);
  const topicCounts = curatedTopicCounts.length ? curatedTopicCounts : tagCounts.slice(0, 5);
  const hotTags = topicCounts.map(([tag, count]) => (
    `<a href="?tag=${encodeURIComponent(tag)}" data-news-tag="${escapeHtml(tag)}">#${escapeHtml(tag)}<span>${count}</span></a>`
  )).join('\n          ');
  const featuredArticle = articles.find((article) => article.featured);
  const featuredMarkup = featuredArticle ? `
    <aside class="news-sidebar" aria-label="焦點消息">
      <section class="news-sidebar-featured-section">
        <h2>焦點消息</h2>
        <div class="news-sidebar-featured">
          <a href="../${escapeHtml(featuredArticle.output)}"><span>${escapeHtml(featuredArticle.date)}</span><b>${escapeHtml(featuredArticle.title)}</b></a>
        </div>
      </section>
    </aside>` : '';
  const content = `<header class="page-head news-index-head">
  <p class="kicker">NEWS</p>
  <h1>最新消息總覽</h1>
  <p class="lede">音樂會公告、團練紀錄與各項活動動態，依時間由新到舊排列。</p>
</header>

<main class="wrap">
  <section class="section news-index-layout">
    <div class="news-index-main">
      <div class="news-filter-panel">
        <div class="news-filter-status">
          <p class="news-result-count" id="news-result-count" aria-live="polite">目前顯示全部 ${articles.length} 則消息</p>
          <div class="news-filter-actions">
            <button class="news-filter-toggle" id="news-filter-toggle" type="button" aria-controls="news-filter-options" aria-expanded="false">篩選消息<span id="news-filter-active-label">全部</span></button>
            <button class="news-clear-filter" id="news-clear-filter" type="button" hidden>清除篩選</button>
          </div>
        </div>
        <div class="news-filter-bar" id="news-filter-options" aria-label="最新消息分類篩選">
          ${filters}
        </div>
        <details class="news-explore news-filter-topics">
          <summary>探索主題<span aria-hidden="true"></span></summary>
          <p class="news-sidebar-note">同一主題可跨越不同分類；選擇主題後仍可用網址分享結果。</p>
          <div class="news-tag-cloud">
            ${hotTags}
          </div>
        </details>
      </div>
      <div class="news-list news-index-list" id="news-all" data-base="../" data-static="true">
        ${allItems.map((article) => renderNewsItem(article)).join('\n        ')}
      </div>
      <p class="news-empty-state" id="news-empty-state" hidden>目前沒有符合這組條件的消息，請改用其他分類或清除篩選。</p>
      <p class="news-more news-index-links"><a href="../concerts.html">← 回校友聯演</a><a href="../feed.xml">RSS 訂閱 →</a></p>
    </div>${featuredMarkup}
  </section>
</main>`;

  return renderPage({
    title: '最新消息總覽｜嘉義高中管樂隊',
    description: '嘉義高中管樂隊暨校友管樂團的所有消息：音樂會公告、團練紀錄、幹部交接與各項活動動態。',
    ogTitle: '最新消息總覽｜嘉義高中管樂隊',
    ogDescription: '音樂會公告、團練紀錄、幹部交接與各項活動動態。',
    url: 'https://cysh.band/news/index.html',
    ogType: 'website',
    styleVersion: NEWS_STYLE_VERSION,
    assetPrefix: '../',
    navActive: 'news',
    extraScripts: '<script src="../data/news.js" defer></script>\n<script src="../js/news.js" defer></script>',
    content
  });
}

function weekdayName(date, time) {
  const [year, month, day] = date.split('-').map(Number);
  const jsDate = new Date(Date.UTC(year, month - 1, day));
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][jsDate.getUTCDay()];
}

function rssDate(article) {
  const [year, month, day] = article.date.split('-').map(Number);
  const [hour, minute] = article.time.split(':').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${weekdayName(article.date, article.time)}, ${String(day).padStart(2, '0')} ${months[month - 1]} ${year} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00 +0800`;
}

function xmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderFeed() {
  const latest = articles[0];
  const items = articles.map((article) => `  <item>
    <title>${xmlEscape(article.title)}</title>
    <link>https://cysh.band/${xmlEscape(article.output)}</link>
    <guid>https://cysh.band/${xmlEscape(article.output)}</guid>
    <pubDate>${rssDate(article)}</pubDate>
    <description>${xmlEscape(article.summary)}</description>
  </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>嘉義高中管樂隊暨校友管樂團｜最新消息</title>
  <link>https://cysh.band/</link>
  <description>音樂會公告、團練紀錄、幹部交接與各項活動動態。</description>
  <language>zh-TW</language>
  <lastBuildDate>${rssDate(latest)}</lastBuildDate>
  <atom:link href="https://cysh.band/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>
`;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function laterDate(left, right) {
  if (!left) return right || '';
  if (!right) return left;
  return left >= right ? left : right;
}

function bumpSitemapLastmod(xml, url, date) {
  if (!date) return xml;
  const pattern = new RegExp(`(<url><loc>${escapeRegExp(url)}</loc><lastmod>)(\\d{4}-\\d{2}-\\d{2})(</lastmod>)`);
  return xml.replace(pattern, (_, before, current, after) => `${before}${laterDate(current, date)}${after}`);
}

function renderSitemap(sitemapXml) {
  const original = String(sitemapXml || '');
  const hadTrailingNewline = original.endsWith('\n');
  const lines = original.trimEnd().split('\n');
  const newsEntryPattern = /<url><loc>(https:\/\/cysh\.band\/news\/(?:index\.html|[^<]+\.html))<\/loc>.*<\/url>/;
  const existingPriorities = new Map();

  for (const line of lines) {
    const match = line.match(newsEntryPattern);
    if (!match) continue;
    const priority = (line.match(/<priority>([^<]+)<\/priority>/) || [])[1];
    if (priority) existingPriorities.set(match[1], priority);
  }

  const keptLines = lines.filter((line) => !newsEntryPattern.test(line));
  const closingIndex = keptLines.findIndex((line) => line.trim() === '</urlset>');
  if (closingIndex < 0) throw new Error('sitemap.xml: missing closing </urlset>.');

  const latestNewsDate = articles.reduce((latest, article) => laterDate(latest, article.modifiedDate), '');
  const newsIndexUrl = 'https://cysh.band/news/index.html';
  const generatedNewsEntries = [
    `  <url><loc>${newsIndexUrl}</loc><lastmod>${latestNewsDate}</lastmod><priority>${existingPriorities.get(newsIndexUrl) || '0.7'}</priority></url>`,
    ...articles.map((article) => {
      const url = `https://cysh.band/${article.output}`;
      return `  <url><loc>${url}</loc><lastmod>${article.modifiedDate}</lastmod><priority>${existingPriorities.get(url) || '0.7'}</priority></url>`;
    })
  ];

  keptLines.splice(closingIndex, 0, ...generatedNewsEntries);
  let output = keptLines.join('\n');
  output = bumpSitemapLastmod(output, 'https://cysh.band/', latestNewsDate);
  const latestConcertNewsDate = articles
    .filter((article) => article.relatedConcert)
    .reduce((latest, article) => laterDate(latest, article.modifiedDate), '');
  output = bumpSitemapLastmod(output, 'https://cysh.band/concerts.html', latestConcertNewsDate);
  return output + (hadTrailingNewline ? '\n' : '');
}

function generateNewsPages() {
  for (const article of articles) {
    const outputPath = path.join(root, article.output);
    fs.writeFileSync(outputPath, renderArticle(article));
    console.log(article.output);
  }
  fs.writeFileSync(path.join(root, 'news', 'index.html'), renderNewsIndex());
  console.log('news/index.html');
  fs.writeFileSync(path.join(root, 'feed.xml'), renderFeed());
  console.log('feed.xml');
  /* generatedAt 每次執行都會變。以前直接寫現在時間，結果排程發布每小時都會產生
     一筆「只改了時間戳」的 commit——版本紀錄被灌滿雜訊，真正有內容的發布反而找不到。
     現在只有文章清單真的變了才更新時間。 */
  const catalogPath = path.join(root, 'data', 'news-catalog.json');
  const catalogArticles = articles.map((article) => ({
      id: article.id,
      date: article.date,
      category: article.category,
      title: textFromHtml(article.listTitle || article.title),
      url: `https://cysh.band/${article.output}`,
      tags: article.tags,
      authorName: article.authorName || null,
      authorAlumniNumber: article.authorAlumniNumber || null,
      sourceNotes: article.sourceNotes || null
  }));
  let generatedAt = new Date().toISOString();
  try {
    const previous = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    if (JSON.stringify(previous.articles) === JSON.stringify(catalogArticles) && previous.generatedAt) {
      generatedAt = previous.generatedAt;
    }
  } catch { /* 檔案不存在或壞掉就重新產生 */ }
  fs.writeFileSync(catalogPath, JSON.stringify({ version: 1, generatedAt, articles: catalogArticles }, null, 2) + '\n');
  console.log('data/news-catalog.json');
  const sitemapPath = path.join(root, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, renderSitemap(fs.readFileSync(sitemapPath, 'utf8')));
  console.log('sitemap.xml');
}

if (require.main === module) {
  generateNewsPages();
}

module.exports = {
  articles,
  renderArticle,
  renderNewsIndex,
  renderFeed,
  renderSitemap,
  generateNewsPages,
  renderNewsItem,
  NEWS_STYLE_VERSION
};
