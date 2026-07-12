#!/usr/bin/env node
/* 產生已模板化的最新消息文章、最新消息總覽與 RSS。
   GitHub Pages 仍使用輸出的靜態 HTML；此腳本只在本地維護時執行。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');
const { autoLinkHtml } = require('./lib/people-auto-link');

const root = path.join(__dirname, '..');
const { escapeHtml, renderPage } = createRenderer(root);

global.window = global;
require(path.join(root, 'data', 'news.js'));
require(path.join(root, 'data', 'people-profiles.js'));

const profiles = global.PEOPLE_PROFILES || [];

function isExternalUrl(value) {
  return /^https?:\/\//i.test(String(value || ''));
}

function assetUrl(value, assetPrefix = '') {
  return isExternalUrl(value) ? value : assetPrefix + value;
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
    pageTitle: item.pageTitle || `${title}｜最新消息｜嘉義高中管樂隊`,
    ogTitle: item.ogTitle || title,
    description: item.description || item.summary || title,
    ogDescription: item.ogDescription || item.description || item.summary || title,
    headlineHtml: item.headlineHtml || escapeHtml(title),
    category: item.category || '最新消息',
    tags: Array.isArray(item.tags) ? item.tags : [],
    pinUntil: item.pinUntil || '',
    priority: item.priority || (item.pinned ? 'important' : 'normal'),
    time: item.time || '12:00',
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
    `<time datetime="${escapeHtml(article.date)}">${escapeHtml(article.date)}</time>`
  ];
  if (article.pinned && article.pinUntil) meta.push('<span class="news-priority-badge">重要</span>');
  meta.push(`<span class="article-tags">${tags}</span>`);
  return `<div class="article-meta">
    ${meta.join('\n    ')}
  </div>`;
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
      <h3>相關消息</h3>
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
  const links = [];
  if (previous) {
    links.push(`<a class="btn ghost article-page-nav-link previous" href="../${escapeHtml(previous.output)}"><span>← 上一篇消息</span><b>${escapeHtml(articleNavLabel(previous))}</b></a>`);
  }
  links.push('<a class="btn ghost article-page-nav-link overview" href="../news/index.html"><span>回到</span><b>最新消息總覽</b></a>');
  if (next) {
    links.push(`<a class="btn ghost article-page-nav-link next" href="../${escapeHtml(next.output)}"><span>下一篇消息 →</span><b>${escapeHtml(articleNavLabel(next))}</b></a>`);
  }
  return `<nav class="article-page-nav news-page-nav" aria-label="最新消息文章導覽">
      ${links.join('\n      ')}
    </nav>`;
}

function renderArticle(article) {
  const body = fs.readFileSync(path.join(root, article.source), 'utf8').trim();
  const indentedBody = body.split('\n').map((line) => (line ? `    ${line}` : line)).join('\n');
  const content = `<header class="page-head">
  <p class="kicker">NEWS．${escapeHtml(article.date)}</p>
  <h1>${article.headlineHtml}</h1>
  ${articleMeta(article)}
</header>

<main class="wrap">
  <article class="section news-article">
${indentedBody}

    ${relatedArticles(article)}

    ${articlePageNav(article)}
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
    assetPrefix: '../',
    navActive: 'news',
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
  const tagHtml = tags.slice(0, 4).map((tag) => `<span>#${escapeHtml(tag)}</span>`).join('');
  const tail = article.thumb
    ? `<img class="news-thumb" src="${escapeHtml(assetUrl(article.thumb, assetPrefix))}" alt="" loading="lazy">`
    : '<span class="news-arrow">→</span>';
  const classes = ['news-item'];
  if (article.pinned && article.pinUntil) classes.push('is-pinned');
  if (article.priority === 'urgent') classes.push('is-urgent');
  return `<a class="${classes.join(' ')}" href="${escapeHtml(assetPrefix + article.output)}" data-category="${escapeHtml(article.category)}" data-tags="${escapeHtml(tags.join('|'))}" data-news-id="${escapeHtml(article.id)}">
      <span class="news-date"><span>${escapeHtml(article.category)}</span><time datetime="${escapeHtml(article.date)}">${escapeHtml(article.date)}</time></span>
      <span class="news-body">
        <span class="news-title-line">${article.pinned && article.pinUntil ? '<em>重要</em>' : ''}<b>${escapeHtml(article.title)}</b></span>
        <span class="news-summary">${escapeHtml(article.summary)}</span>
        ${tagHtml ? `<span class="news-tags">${tagHtml}</span>` : ''}
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

  const hotTags = tagCounts.slice(0, 12).map(([tag, count]) => (
    `<a href="?tag=${encodeURIComponent(tag)}" data-news-tag="${escapeHtml(tag)}">#${escapeHtml(tag)}<span>${count}</span></a>`
  )).join('\n          ');

  const categoryLinks = categoryCounts.map(([category, count]) => (
    `<a href="?category=${encodeURIComponent(category)}" data-news-filter="${escapeHtml(category)}">${escapeHtml(category)}<span>${count}</span></a>`
  )).join('\n          ');

  const content = `<header class="page-head">
  <p class="kicker">NEWS</p>
  <h1>最新消息總覽</h1>
  <p class="lede">音樂會公告、團練紀錄、幹部交接與各項活動動態，依時間由新到舊排列。分類與標籤可直接篩選，也能保留在網址中分享。</p>
</header>

<main class="wrap">
  <section class="section news-index-layout">
    <div class="news-index-main">
      <div class="news-filter-panel">
        <p class="news-filter-label">分類</p>
        <div class="news-filter-bar" aria-label="最新消息分類篩選">
          ${filters}
        </div>
        <div class="news-filter-status">
          <p class="news-result-count" id="news-result-count" aria-live="polite">目前顯示全部 ${articles.length} 則消息</p>
          <button class="news-clear-filter" id="news-clear-filter" type="button" hidden>清除篩選</button>
        </div>
      </div>
      <div class="news-list news-index-list" id="news-all" data-base="../" data-static="true">
        ${allItems.map((article) => renderNewsItem(article)).join('\n        ')}
      </div>
      <p class="news-empty-state" id="news-empty-state" hidden>目前沒有符合這組條件的消息，請改用其他分類或清除篩選。</p>
      <p class="news-more news-index-links"><a href="../concerts.html">← 回校友聯演</a><a href="../feed.xml">RSS 訂閱 →</a></p>
    </div>
    <aside class="news-sidebar" aria-label="最新消息輔助導覽">
      <section>
        <h2>熱門標籤</h2>
        <p class="news-sidebar-note">同一主題會跨越不同分類，例如《為伍》可包含演出公告、團練通知與活動紀錄。</p>
        <div class="news-tag-cloud">
          ${hotTags}
        </div>
      </section>
      <section>
        <h2>分類統計</h2>
        <div class="news-category-list">
          ${categoryLinks}
        </div>
      </section>
      <section>
        <h2>焦點消息</h2>
        <div class="news-sidebar-featured">
          ${articles.slice(0, 1).map((article) => `<a href="../${escapeHtml(article.output)}"><span>${escapeHtml(article.date)}</span><b>${escapeHtml(article.title)}</b></a>`).join('\n          ')}
        </div>
      </section>
    </aside>
  </section>
</main>`;

  return renderPage({
    title: '最新消息總覽｜嘉義高中管樂隊',
    description: '嘉義高中管樂隊暨校友管樂團的所有消息：音樂會公告、團練紀錄、幹部交接與各項活動動態。',
    ogTitle: '最新消息總覽｜嘉義高中管樂隊',
    ogDescription: '音樂會公告、團練紀錄、幹部交接與各項活動動態。',
    url: 'https://cysh.band/news/index.html',
    ogType: 'website',
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
}

if (require.main === module) {
  generateNewsPages();
}

module.exports = {
  articles,
  renderArticle,
  renderNewsIndex,
  renderFeed,
  generateNewsPages,
  renderNewsItem
};
