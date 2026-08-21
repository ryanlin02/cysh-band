#!/usr/bin/env node
/* 把官網 content/news/ 既有文章轉成會員平台的文章格式（JSON），
   之後由會員平台的匯入指令寫進資料庫，讓這些文章變成可以在後台編輯。

   轉換原則：只做「看得懂就轉、看不懂就報告」，絕不猜測。
   任何一篇只要有無法完整表示的內容，就會列在報告裡不予匯入，
   避免把官網上已經公開的內容悄悄改壞。

   用法：node scripts/export-news-for-member-platform.js
   產出：scripts/output/news-export.json ＋ 終端機的逐篇報告 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
global.window = global;
require(path.join(root, 'data', 'news.js'));
const NEWS = (global.NEWS || []).filter((item) => item && item.source);

function decode(text) {
  return String(text)
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
}

/** 行內 HTML → 簡易排版格式（粗體、連結）；其餘標籤一律視為看不懂 */
function inlineToMarkup(html, problems, context) {
  let text = String(html);
  text = text.replace(/<b>([\s\S]*?)<\/b>/g, (m, inner) => `**${inlineToMarkup(inner, problems, context)}**`);
  text = text.replace(/<strong>([\s\S]*?)<\/strong>/g, (m, inner) => `**${inlineToMarkup(inner, problems, context)}**`);
  text = text.replace(/<i>([\s\S]*?)<\/i>/g, (m, inner) => `*${inlineToMarkup(inner, problems, context)}*`);
  text = text.replace(/<em>([\s\S]*?)<\/em>/g, (m, inner) => `*${inlineToMarkup(inner, problems, context)}*`);
  text = text.replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
    (m, href, label) => `[${inlineToMarkup(label, problems, context)}](${href})`);
  text = text.replace(/<span[^>]*>([\s\S]*?)<\/span>/g, (m, inner) => inlineToMarkup(inner, problems, context));
  text = text.replace(/<br\s*\/?>/g, '\n');
  const leftover = text.match(/<[^>]+>/g);
  if (leftover) problems.push(`${context}：出現無法轉換的標籤 ${[...new Set(leftover)].join(' ')}`);
  return decode(text).replace(/[ \t]+\n/g, '\n').trim();
}

function tableToMarkup(html, problems, context) {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((match) =>
    [...match[1].matchAll(/<(th|td)[^>]*>([\s\S]*?)<\/\1>/g)].map((cell) => inlineToMarkup(cell[2], problems, context)));
  if (!rows.length) return '';
  const width = rows[0].length;
  if (rows.some((row) => row.length !== width)) { problems.push(`${context}：表格每列欄數不一致`); return ''; }
  const line = (cells) => `| ${cells.join(' | ')} |`;
  // 官網既有表格是「每列第一格為項目名稱」，不需要分隔列；
  // 只有真正的橫向表頭（整個第一列都是 th）才加分隔列。
  const firstRowAllHeaders = /<tr[^>]*>(?:\s*<th[^>]*>[\s\S]*?<\/th>\s*)+<\/tr>/.test(html);
  return firstRowAllHeaders
    ? [line(rows[0]), `|${' --- |'.repeat(width)}`, ...rows.slice(1).map(line)].join('\n')
    : rows.map(line).join('\n');
}

/** 一篇文章的正文 HTML → sections[] */
function convert(article) {
  const problems = [];
  const filePath = path.join(root, article.source);
  if (!fs.existsSync(filePath)) return { problems: [`找不到來源檔 ${article.source}`] };
  let html = fs.readFileSync(filePath, 'utf8');

  // 官網的重點框（news-callout）要保留下來：先用哨兵標出範圍，
  // 之後這個範圍內的段落會標成 style: "callout"。其餘 <section> 只是結構分組，攤平即可。
  html = html.replace(/<section class="news-callout">([\s\S]*?)<\/section>/g,
    (m, inner) => `\n\n<p>[[CALLOUT-START]]</p>\n\n${inner}\n\n<p>[[CALLOUT-END]]</p>\n\n`);
  html = html.replace(/<\/?section[^>]*>/g, '\n\n');
  html = html.replace(/<div class="table-scroll"[^>]*>([\s\S]*?)<\/div>/g, (m, inner) => `\n\n${inner}\n\n`);
  // blockquote 內的 <footer> 是引言出處，要留在 blockquote 裡；其餘 footer 才是文末附註
  html = html.replace(/<footer[^>]*>([\s\S]*?)<\/footer>/g, (m, inner, offset, whole) => {
    const before = whole.slice(0, offset);
    const inQuote = before.lastIndexOf('<blockquote') > before.lastIndexOf('</blockquote>');
    return inQuote ? `\n——${inner.replace(/^\s*(——|--)/, '')}` : `\n\n<p class="muted">${inner}</p>\n\n`;
  });

  const sections = [];
  let inCallout = false;
  let current = { heading: '', body: [], images: [], note: '' };
  const pushCurrent = () => {
    const body = current.body.join('\n\n').trim();
    if (body || current.images.length || current.note) {
      sections.push({
        heading: current.heading, body, images: current.images, note: current.note,
        ...(inCallout ? { style: 'callout' } : {}),
      });
    }
    current = { heading: '', body: [], images: [], note: '' };
  };

  const blockPattern = /<h2[^>]*>([\s\S]*?)<\/h2>|<figure[^>]*>([\s\S]*?)<\/figure>|<table[^>]*>[\s\S]*?<\/table>|<ul[^>]*>[\s\S]*?<\/ul>|<ol[^>]*>[\s\S]*?<\/ol>|<blockquote[^>]*>[\s\S]*?<\/blockquote>|<p[^>]*>[\s\S]*?<\/p>/g;
  let match;
  let consumed = 0;
  while ((match = blockPattern.exec(html)) !== null) {
    const between = html.slice(consumed, match.index).replace(/<[^>]+>/g, '').trim();
    if (between) problems.push(`區塊之間出現未包在標籤內的文字：「${between.slice(0, 40)}」`);
    consumed = match.index + match[0].length;
    const block = match[0];
    const context = `${article.id}`;

    if (/^<h2/.test(block)) { pushCurrent(); current.heading = inlineToMarkup(match[1], problems, context); continue; }

    if (/^<figure/.test(block)) {
      const img = /<img\s+([^>]+)>/.exec(match[2]);
      if (!img) { problems.push(`${context}：figure 內找不到圖片`); continue; }
      const attr = (name) => { const m2 = new RegExp(`${name}="([^"]*)"`).exec(img[1]); return m2 ? m2[1] : ''; };
      const caption = /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/.exec(match[2]);
      // 圖片會顯示在所屬段落的最後，所以遇到圖片就把目前這段收起來，
      // 下一段文字另起一段，官網上的先後順序才會和原本一模一樣。
      current.images.push({
        path: attr('src').replace(/^(\.\.\/)+/, ''),
        alt: decode(attr('alt')),
        caption: caption ? inlineToMarkup(caption[1], problems, context) : '',
        layout: 'full',
        ...(attr('width') ? { width: Number(attr('width')) } : {}),
        ...(attr('height') ? { height: Number(attr('height')) } : {}),
      });
      const carriedHeading = current.heading;
      pushCurrent();
      current.heading = '';
      void carriedHeading;
      continue;
    }

    if (/^<table/.test(block)) { const t = tableToMarkup(block, problems, context); if (t) current.body.push(t); continue; }

    if (/^<(ul|ol)/.test(block)) {
      const ordered = /^<ol/.test(block);
      const items = [...block.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)]
        .map((item, index) => `${ordered ? `${index + 1}.` : '-'} ${inlineToMarkup(item[1], problems, context)}`);
      if (items.length) current.body.push(items.join('\n'));
      continue;
    }

    if (/^<blockquote/.test(block)) {
      const inner = block.replace(/<\/?blockquote[^>]*>/g, '').replace(/<\/?p[^>]*>/g, '\n').trim();
      current.body.push(inlineToMarkup(inner, problems, context).split('\n').filter(Boolean).map((line) => `> ${line}`).join('\n'));
      continue;
    }

    // <p>
    if (/\[\[CALLOUT-START\]\]/.test(block)) { pushCurrent(); inCallout = true; continue; }
    if (/\[\[CALLOUT-END\]\]/.test(block)) { pushCurrent(); inCallout = false; continue; }

    // 重點連結（news-cta）：官網上是一個橫幅式的連結區塊，轉成 => [小標|大字](網址)
    const cta = /^<p[^>]*>\s*<a class="news-cta" href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/p>$/.exec(block);
    if (cta) {
      const small = /<span[^>]*>([\s\S]*?)<\/span>/.exec(cta[2]);
      const big = /<b[^>]*>([\s\S]*?)<\/b>/.exec(cta[2]);
      const smallText = small ? inlineToMarkup(small[1], problems, context) : '';
      const bigText = inlineToMarkup(big ? big[1] : cta[2], problems, context);
      current.body.push(`=> [${smallText ? `${smallText}|` : ''}${bigText}](${cta[1]})`);
      continue;
    }

    const isMuted = /class="[^"]*\bmuted\b/.test(block);
    const inner = block.replace(/^<p[^>]*>/, '').replace(/<\/p>$/, '');
    const text = inlineToMarkup(inner, problems, `${article.id}`);
    if (!text) continue;
    if (isMuted) { current.note = current.note ? `${current.note}\n${text}` : text; continue; }
    current.body.push(text);
  }
  const tail = html.slice(consumed).replace(/<[^>]+>/g, '').trim();
  if (tail) problems.push(`結尾出現未包在標籤內的文字：「${tail.slice(0, 40)}」`);
  pushCurrent();

  if (!sections.length) problems.push('轉換後沒有任何內容');
  return { sections, problems };
}

function main() {
  const exported = [];
  const skipped = [];
  for (const article of NEWS) {
    const { sections, problems } = convert(article);
    if (problems.length || !sections) { skipped.push({ id: article.id, problems }); continue; }
    exported.push({
      // 直接沿用官網文章 id 當網址代號：兩篇文章可能只有日期不同、後段完全相同
      // （例如 07-23 與 08-01 的 sausage-grill-gathering），去掉日期就會互相覆蓋。
      // 官網同步時會自動去除重複的日期前綴，網址維持原樣。
      slug: String(article.id),
      originalId: article.id,
      title: article.title,
      summary: article.summary,
      category: article.category,
      tags: Array.isArray(article.tags) ? article.tags.slice(0, 5) : [],
      sections,
      publishedAt: `${article.date}T${article.time || '09:00'}:00+08:00`,
      output: article.output,
    });
  }

  const outputDir = path.join(root, 'scripts', 'output');
  fs.mkdirSync(outputDir, { recursive: true });
  const target = path.join(outputDir, 'news-export.json');
  fs.writeFileSync(target, JSON.stringify({ generatedAt: new Date().toISOString(), articles: exported }, null, 2) + '\n');

  console.log(`可匯入：${exported.length} 篇`);
  for (const item of exported) console.log(`  ✓ ${item.originalId}（${item.sections.length} 段）`);
  if (skipped.length) {
    console.log(`\n需要人工確認：${skipped.length} 篇`);
    for (const item of skipped) {
      console.log(`  ✗ ${item.id}`);
      for (const problem of [...new Set(item.problems)]) console.log(`      ${problem}`);
    }
  }
  console.log(`\n輸出：${path.relative(root, target)}`);
}

main();
