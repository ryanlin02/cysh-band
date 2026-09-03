#!/usr/bin/env node
/* 將共用 nav/footer 套用到尚未完整模板化的公開頁面。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');

const root = path.join(__dirname, '..');
const { renderPartial, styleVersion } = createRenderer(root);

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

function syncPwaInstallMeta(html, fileRel) {
  if (
    fileRel === 'news/_template.html'
    || !html.includes('</head>')
    || html.includes('data-page-shell="standalone"')
  ) return html;

  const pwaInstallMeta = renderPartial('partials/pwa-install.html', {
    assetPrefix: assetPrefix(fileRel)
  }).trim();
  const markerPattern = /<!-- CYSH PWA install metadata: start -->[\s\S]*?<!-- CYSH PWA install metadata: end -->/;
  if (markerPattern.test(html)) return html.replace(markerPattern, pwaInstallMeta);

  return html.replace(
    /<link rel="apple-touch-icon" href="[^"]+">\n<meta name="theme-color" content="#faf8f3">/,
    pwaInstallMeta
  );
}

/* 樣式快取版本：把每一頁的 css/style.css 網址換成目前的內容雜湊。
   以前有 52 個頁面完全沒有版本參數，改了 CSS 之後回訪的人會吃到瀏覽器的舊樣式，
   新版面就會走位。這裡統一補上，來源是 lib/site-template.js 算出的同一個值。 */
function syncStyleVersion(html) {
  return html.replace(
    /(href=["'])((?:\.\.\/)*css\/style\.css)(\?v=[^"']*)?(["'])/g,
    (_, open, href, _version, close) => `${open}${href}${styleVersion}${close}`
  );
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
  // 導覽列 2026-08 起沒有「影像館」了（換成「登入」），
  // 所以 gallery/ 底下的頁面不能再指 photos——那會變成一個都沒亮。
  // 先沿用頁面上原本標好的那一個，沒有再照內容歸類。
  if (fileRel.startsWith('gallery/')) {
    return activeFromExisting(html) || (fileRel.startsWith('gallery/2026-') ? 'news' : 'concerts');
  }
  const existing = activeFromExisting(html);
  if (existing) return existing;
  const names = {
    'about.html': 'about',
    'history.html': 'history',
    'numbers.html': 'numbers',
    'people.html': 'people',
    'roster.html': 'roster',
    'concerts.html': 'concerts',
    'support.html': 'about',
    'site-map.html': 'index'
  };
  return Object.prototype.hasOwnProperty.call(names, fileRel) ? names[fileRel] : 'about';
}

function syncSharedChrome() {
  let written = 0;
  for (const file of walk(root)) {
    const fileRel = relative(file);
    if (fileRel === 'news/_template.html') continue;
    const html = fs.readFileSync(file, 'utf8');
    const withPwaInstallMeta = syncStyleVersion(syncPwaInstallMeta(html, fileRel));
    if (!withPwaInstallMeta.includes('<nav class="nav">') || !withPwaInstallMeta.includes('<footer class="footer">')) {
      if (withPwaInstallMeta !== html) {
        fs.writeFileSync(file, withPwaInstallMeta);
        written += 1;
      }
      continue;
    }
    const nav = renderPartial('partials/nav.html', {
      assetPrefix: assetPrefix(fileRel),
      navActive: activeFor(fileRel, withPwaInstallMeta)
    }).trimEnd();
    const footer = renderPartial('partials/footer.html', {
      assetPrefix: assetPrefix(fileRel)
    }).trimEnd();
    const next = withPwaInstallMeta
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
