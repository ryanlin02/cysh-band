#!/usr/bin/env node
/* 把官網 content/people/ 的人物介紹轉成會員平台格式（JSON），
   之後由會員平台的匯入指令寫進資料庫，讓這些人物頁可以在後台編輯。

   與最新消息相同的原則：看得懂就轉、看不懂就報告，絕不猜測。
   轉完會自動把結果再渲染回 HTML 與原檔逐字比對，不一致就列為需人工確認。

   用法：node scripts/export-people-for-member-platform.js
   產出：scripts/output/people-export.json ＋ 終端機的逐篇報告 */
const fs = require('fs');
const path = require('path');
const { renderArticleSections, renderInline } = require('./lib/article-markup');

const root = path.join(__dirname, '..');
global.window = global;
require(path.join(root, 'data', 'people-profiles.js'));
const PROFILES = (global.PEOPLE_PROFILES || []).filter((item) => item && item.num && item.source);

function decode(text) {
  return String(text)
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
}

/** 行內 HTML → 簡易排版格式；看不懂的標籤會回報 */
function inlineToMarkup(html, problems, context) {
  let text = String(html);
  text = text.replace(/<(b|strong)>([\s\S]*?)<\/\1>/g, (m, tag, inner) => `**${inlineToMarkup(inner, problems, context)}**`);
  text = text.replace(/<(i|em)>([\s\S]*?)<\/\1>/g, (m, tag, inner) => `*${inlineToMarkup(inner, problems, context)}*`);
  text = text.replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
    (m, href, label) => `[${inlineToMarkup(label, problems, context)}](${href})`);
  text = text.replace(/<span[^>]*>([\s\S]*?)<\/span>/g, (m, inner) => inlineToMarkup(inner, problems, context));
  text = text.replace(/<br\s*\/?>/g, '\n');
  const leftover = text.match(/<[^>]+>/g);
  if (leftover) problems.push(`${context}：無法轉換的標籤 ${[...new Set(leftover)].join(' ')}`);
  return decode(text).replace(/[ \t]+\n/g, '\n').trim();
}

function convert(profile) {
  const problems = [];
  const filePath = path.join(root, profile.source);
  if (!fs.existsSync(filePath)) return { problems: [`找不到來源檔 ${profile.source}`] };
  let html = fs.readFileSync(filePath, 'utf8');

  html = html.replace(/<footer[^>]*>([\s\S]*?)<\/footer>/g, (m, inner, offset, whole) => {
    const before = whole.slice(0, offset);
    const inQuote = before.lastIndexOf('<blockquote') > before.lastIndexOf('</blockquote>');
    return inQuote ? `\n——${inner.replace(/^\s*(——|--)/, '')}` : `\n\n<p class="muted">${inner}</p>\n\n`;
  });

  const sections = [];
  let current = { heading: '', body: [], note: '' };
  const pushCurrent = () => {
    const body = current.body.join('\n\n').trim();
    if (body || current.note) sections.push({ heading: current.heading, body, note: current.note });
    current = { heading: '', body: [], note: '' };
  };

  const blockPattern = /<h3[^>]*>([\s\S]*?)<\/h3>|<blockquote[^>]*>[\s\S]*?<\/blockquote>|<ul[^>]*>[\s\S]*?<\/ul>|<ol[^>]*>[\s\S]*?<\/ol>|<p[^>]*>[\s\S]*?<\/p>/g;
  let match; let consumed = 0;
  while ((match = blockPattern.exec(html)) !== null) {
    const between = html.slice(consumed, match.index).replace(/<[^>]+>/g, '').trim();
    if (between) problems.push(`區塊之間有未包在標籤內的文字：「${between.slice(0, 40)}」`);
    consumed = match.index + match[0].length;
    const block = match[0];

    if (/^<h3/.test(block)) { pushCurrent(); current.heading = inlineToMarkup(match[1], problems, profile.num); continue; }

    if (/^<(ul|ol)/.test(block)) {
      const ordered = /^<ol/.test(block);
      const items = [...block.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)]
        .map((item, index) => `${ordered ? `${index + 1}.` : '-'} ${inlineToMarkup(item[1], problems, profile.num)}`);
      if (items.length) current.body.push(items.join('\n'));
      continue;
    }

    if (/^<blockquote/.test(block)) {
      const inner = block.replace(/<\/?blockquote[^>]*>/g, '').replace(/<\/?p[^>]*>/g, '\n').trim();
      current.body.push(inlineToMarkup(inner, problems, profile.num).split('\n').filter(Boolean).map((line) => `> ${line}`).join('\n'));
      continue;
    }

    const isMuted = /class="[^"]*\bmuted\b/.test(block);
    const text = inlineToMarkup(block.replace(/^<p[^>]*>/, '').replace(/<\/p>$/, ''), problems, profile.num);
    if (!text) continue;
    if (isMuted) { current.note = current.note ? `${current.note}\n${text}` : text; continue; }
    current.body.push(text);
  }
  const tail = html.slice(consumed).replace(/<[^>]+>/g, '').trim();
  if (tail) problems.push(`結尾有未包在標籤內的文字：「${tail.slice(0, 40)}」`);
  pushCurrent();

  if (!sections.length) problems.push('轉換後沒有任何內容');

  // 逐字驗證：轉換結果再渲染回 HTML，與原檔比對
  const rendered = renderArticleSections(sections, { headingLevel: 'h3' });
  const textOnly = (value) => value.replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
  const tagSeq = (value) => (value.match(/<\/?(?:p|h3|ul|ol|li|blockquote|b|i|a|footer)\b/g) || [])
    .map((tag) => tag.replace(/[<>]/g, '')).join(',');
  const original = fs.readFileSync(filePath, 'utf8');
  if (textOnly(original) !== textOnly(rendered)) problems.push('往返比對：文字內容不一致');
  if (tagSeq(original) !== tagSeq(rendered)) problems.push('往返比對：標籤結構不一致');

  return { sections, problems };
}

function main() {
  const exported = []; const skipped = [];
  for (const profile of PROFILES) {
    const { sections, problems } = convert(profile);
    if (problems.length || !sections) { skipped.push({ num: profile.num, problems }); continue; }

    // facts 的值原本是 HTML（例如 <b>0271</b>（民國 102 年入學）），轉成簡易排版格式
    const factProblems = [];
    const facts = (Array.isArray(profile.facts) ? profile.facts : []).map(([label, value]) => ({
      label: inlineToMarkup(label, factProblems, `${profile.num} facts`),
      value: inlineToMarkup(value, factProblems, `${profile.num} facts`),
    }));
    if (factProblems.length) { skipped.push({ num: profile.num, problems: factProblems }); continue; }

    exported.push({
      alumniNumber: profile.num,
      displayName: profile.name,
      // headlineHtml 用 <br> 換行，轉成真正的換行字元保存
      headline: inlineToMarkup(profile.headlineHtml || profile.name, [], `${profile.num} headline`),
      summary: profile.description || profile.ogDescription || '',
      photoPath: String(profile.photo || '').replace(/^(\.\.\/)+/, ''),
      facts,
      sections,
      relatedLinks: (Array.isArray(profile.relatedLinks) ? profile.relatedLinks : [])
        .map((link) => ({ label: link.label, url: link.url, type: link.type || '' })),
      ogTitle: profile.ogTitle || '',
      output: profile.output,
    });
  }

  const outputDir = path.join(root, 'scripts', 'output');
  fs.mkdirSync(outputDir, { recursive: true });
  const target = path.join(outputDir, 'people-export.json');
  fs.writeFileSync(target, JSON.stringify({ generatedAt: new Date().toISOString(), profiles: exported }, null, 2) + '\n');

  console.log(`可匯入：${exported.length} 位（往返比對逐字一致）`);
  if (skipped.length) {
    console.log(`\n需要人工確認：${skipped.length} 位`);
    for (const item of skipped) {
      console.log(`  ✗ ${item.num}`);
      for (const problem of [...new Set(item.problems)]) console.log(`      ${problem}`);
    }
  }
  console.log(`\n輸出：${path.relative(root, target)}`);
  void renderInline;
}

main();
