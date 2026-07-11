#!/usr/bin/env node
/* 由 data/concerts.js 產生本地測試用歷屆卡片頁。
   這個腳本不會修改 concerts.html，只輸出 _generated/concerts-preview.html 供人工比對。 */
const fs = require('fs');
const path = require('path');

global.window = global;
require(path.join(__dirname, '..', 'data', 'concerts.js'));

const root = path.join(__dirname, '..');
const outDir = path.join(root, '_generated');
const outFile = path.join(outDir, 'concerts-preview.html');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function zhDate(date) {
  if (!date) return '';
  const m = String(date).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return escapeHtml(date);
  return `${m[1]}.${m[2]}.${m[3]}`;
}

function personLabel(p) {
  if (!p) return '';
  const name = escapeHtml(p.name || '');
  const num = p.num ? `（${escapeHtml(p.num)}）` : '';
  const role = p.role ? ` ${escapeHtml(p.role)}` : '';
  const instrument = p.instrument ? ` ${escapeHtml(p.instrument)}` : '';
  const work = p.work ? `／${escapeHtml(p.work)}` : '';
  return `${name}${num}${role}${instrument}${work}`;
}

function statusLabel(status) {
  const labels = {
    confirmed: '已確認',
    partial: '部分可考',
    inferred: '推算',
    pending: '待考',
    planning: '籌備中',
    cancelled: '停辦'
  };
  return labels[status] || status || '未標示';
}

function ticketLabel(ticket) {
  if (!ticket) return '';
  const types = {
    ticketed: '售票',
    free: '免票',
    'free-ticket': '免費索票',
    ceremony: '典禮活動',
    unknown: '票務待考',
    none: '無演出'
  };
  const parts = [types[ticket.type] || ticket.type];
  if (ticket.price) parts.push(`票價 ${ticket.price}`);
  if (ticket.channels && ticket.channels.length) parts.push(ticket.channels.join('、'));
  if (ticket.note) parts.push(ticket.note);
  return parts.filter(Boolean).join('．');
}

function missingFields(c) {
  const missing = [];
  if (c.status !== 'cancelled') {
    if (!c.date) missing.push('日期');
    if (!c.time) missing.push('時間');
    if (!c.venue) missing.push('場地');
    if (!c.conductors || !c.conductors.length) missing.push('指揮');
    if (!c.program || !c.program.length) missing.push('曲目');
    if (!c.ticket || c.ticket.type === 'unknown') missing.push('票務');
  }
  if (!c.sources || !c.sources.length) missing.push('來源');
  return missing;
}

function summaryText(c) {
  const bits = [];
  if (c.venueNote) bits.push(c.venueNote);
  if (c.hostHead) bits.push(`主辦字頭：${c.hostHead}`);
  if (c.conductors && c.conductors.length) bits.push(`指揮：${c.conductors.map(personLabel).join('、')}`);
  if (c.soloists && c.soloists.length) bits.push(`獨奏／協奏：${c.soloists.map(personLabel).join('、')}`);
  if (c.program && c.program.length) {
    bits.push(`曲目摘要：${c.program.slice(0, 6).map((p) => escapeHtml(p.title)).join('、')}${c.program.length > 6 ? '等' : ''}`);
  }
  if (c.notes) bits.push(escapeHtml(c.notes));
  return bits.join('。');
}

function renderCard(c) {
  const hasPoster = Boolean(c.poster);
  const linked = Boolean(c.page);
  const title = `《${escapeHtml(c.title)}》${c.subtitle ? ` <span class="muted" style="font-size:.68em">${escapeHtml(c.subtitle)}</span>` : ''}`;
  const titleHtml = linked ? `<a href="../${escapeHtml(c.page)}">${title}</a>` : title;
  const date = zhDate(c.date);
  const endDate = c.endDate ? `／${zhDate(c.endDate)}` : '';
  const meta = [date + endDate, c.time, c.venue].filter(Boolean).join('．') || `${c.year || ''}`;
  const missing = missingFields(c);
  const posterHtml = hasPoster
    ? `<div class="poster${linked ? ' linked' : ''}">${linked ? `<a href="../${escapeHtml(c.page)}">` : ''}<img src="../${escapeHtml(c.poster)}" alt="${escapeHtml(c.nth ? `第 ${c.nth} 屆 ${c.title}` : c.title)}" loading="lazy">${linked ? '</a>' : ''}</div>`
    : '';
  return `<div class="concert-item${hasPoster ? ' has-poster' : ''}">
      <div class="no"><b>${escapeHtml(c.nth ?? '—')}</b><span>${escapeHtml(c.year)}</span></div>
      <div>
        <h3>${titleHtml}</h3>
        <p class="meta">${escapeHtml(meta)}</p>
        <p>${summaryText(c) || '此屆資料待補。'}</p>
        <p class="muted">資料狀態：${escapeHtml(statusLabel(c.status))}｜票務：${escapeHtml(ticketLabel(c.ticket) || '未填')}｜來源：${escapeHtml((c.sources || []).join('、') || '未填')}</p>
        ${missing.length ? `<p class="muted">待補欄位：${escapeHtml(missing.join('、'))}</p>` : ''}
      </div>
      ${posterHtml}
    </div>`;
}

const cards = global.CONCERTS.map(renderCard).join('\n');
const generatedAt = new Date().toISOString();

const html = `<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>歷屆聯演資料化測試輸出｜嘉義高中管樂隊</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&amp;family=Noto+Sans+TC:wght@400;700&amp;family=Noto+Serif+TC:wght@700;900&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css">
<script src="../js/main.js" defer></script>
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <a class="nav-brand" href="../index.html">嘉中管樂 <span>CYSH BAND</span></a>
    <ul class="nav-links">
      <li><a href="../concerts.html" class="active">正式校友聯演頁</a></li>
      <li><a href="../網站製作規範.md">網站規範</a></li>
    </ul>
  </div>
</nav>
<header class="page-head concerts-head">
  <p class="kicker">GENERATED PREVIEW</p>
  <h1>歷屆聯演資料化測試輸出</h1>
  <p class="lede">此頁由 <code>data/concerts.js</code> 產生，只供本地比對使用，不是正式公開頁面。產生時間：${escapeHtml(generatedAt)}。請將下方卡片與正式 <code>concerts.html</code> 歷屆紀錄逐屆比對，確認欄位是否足夠。</p>
  <div class="concerts-metrics" aria-label="資料摘要">
    <div><b>${global.CONCERTS.length}</b><span>筆資料</span></div>
    <div><b>${global.CONCERTS.filter((c) => c.status === 'confirmed').length}</b><span>已確認</span></div>
    <div><b>${global.CONCERTS.filter((c) => missingFields(c).length).length}</b><span>仍有待補欄位</span></div>
  </div>
</header>
<main class="wrap">
  <section class="section archive-section">
    <h2>測試卡片</h2>
    <div class="archive-intro">
      <p>這份輸出刻意顯示資料狀態、來源與待補欄位。若卡片文字太薄，代表 <code>data/concerts.js</code> 該屆摘要欄位還需要補充；若卡片比正式頁更清楚，代表該欄位適合未來正式渲染。</p>
      <div class="archive-tags" aria-label="測試標籤">
        <span>不替換正式頁</span>
        <span>本地比對用</span>
        <span>資料化試跑</span>
      </div>
    </div>
    <div class="concert-archive">
${cards}
    </div>
  </section>
</main>
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-about">
      <h4>測試輸出</h4>
      <p>由 scripts/generate-concerts-preview.js 產生。</p>
    </div>
    <div class="footer-links">
      <h4>資料來源</h4>
      <p>data/concerts.js</p>
    </div>
    <div class="footer-links">
      <h4>用途</h4>
      <p>僅供本地比對，不列入 sitemap。</p>
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
</footer>
</body>
</html>
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, html);
console.log(path.relative(root, outFile));
