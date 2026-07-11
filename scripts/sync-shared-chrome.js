#!/usr/bin/env node
/* 將共用 nav/footer 套用到尚未完整模板化的公開頁面。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');

const root = path.join(__dirname, '..');
const { renderPartial } = createRenderer(root);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['.git', 'assets', 'content', '_generated', 'templates', 'photos'].includes(entry.name)) continue;
      walk(file, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(file);
    }
  }
  return files;
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join('/');
}

function assetPrefix(fileRel) {
  const depth = fileRel.split('/').length - 1;
  return '../'.repeat(depth);
}

function activeFromExisting(html) {
  const anchors = html.match(/<a\b[^>]*>/g) || [];
  for (const anchor of anchors) {
    if (!/\bactive\b/.test(anchor)) continue;
    const href = (anchor.match(/\bhref=["']([^"']+)["']/) || [])[1] || '';
    if (/news\/index\.html/.test(href)) return 'news';
    if (/about\.html/.test(href)) return 'about';
    if (/history\.html/.test(href)) return 'history';
    if (/numbers\.html/.test(href)) return 'numbers';
    if (/people\.html/.test(href)) return 'people';
    if (/roster\.html/.test(href)) return 'roster';
    if (/concerts\.html/.test(href)) return 'concerts';
    if (/photos\//.test(href)) return 'photos';
    if (/index\.html/.test(href)) return 'index';
  }
  return '';
}

function activeFor(fileRel, html) {
  if (fileRel === 'index.html') return 'index';
  if (fileRel.startsWith('news/')) return 'news';
  if (fileRel.startsWith('concerts/')) return 'concerts';
  if (fileRel.startsWith('gallery/')) return 'photos';
  const existing = activeFromExisting(html);
  if (existing) return existing;
  const names = {
    'about.html': 'about',
    'history.html': 'history',
    'numbers.html': 'numbers',
    'people.html': 'people',
    'roster.html': 'roster',
    'concerts.html': 'concerts',
    'support.html': 'about'
  };
  return names[fileRel] || 'about';
}

function syncSharedChrome() {
  let written = 0;
  for (const file of walk(root)) {
    const fileRel = relative(file);
    if (fileRel === 'gallery.html' || fileRel === 'news/_template.html') continue;
    const html = fs.readFileSync(file, 'utf8');
    if (!html.includes('<nav class="nav">') || !html.includes('<footer class="footer">')) continue;
    const nav = renderPartial('partials/nav.html', {
      assetPrefix: assetPrefix(fileRel),
      navActive: activeFor(fileRel, html)
    }).trimEnd();
    const footer = renderPartial('partials/footer.html', {
      assetPrefix: assetPrefix(fileRel)
    }).trimEnd();
    const next = html
      .replace(/<nav class="nav">[\s\S]*?<\/nav>\n*/, `${nav}\n\n\n`)
      .replace(/<footer class="footer">[\s\S]*?<\/footer>\n*/, `${footer}\n\n\n`);
    if (next !== html) {
      fs.writeFileSync(file, next);
      written += 1;
    }
  }
  return written;
}

if (require.main === module) {
  console.log(`Synced shared nav/footer in ${syncSharedChrome()} page(s).`);
}

module.exports = { syncSharedChrome };
