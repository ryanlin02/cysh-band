#!/usr/bin/env node
/* 共用模板試作。
   這個腳本只輸出 _generated/page-template-preview.html，不會修改任何正式公開頁面。 */
const fs = require('fs');
const path = require('path');
const { createRenderer } = require('./lib/site-template');

const root = path.join(__dirname, '..');
const outDir = path.join(root, '_generated');
const outFile = path.join(outDir, 'page-template-preview.html');
const { escapeHtml, renderPage } = createRenderer(root);

const generatedAt = new Date().toISOString();
const content = `<header class="page-head">
  <p class="kicker">TEMPLATE PREVIEW</p>
  <h1>共用模板試作</h1>
  <p class="lede">這是一個本地預覽頁，用來確認 head、導覽列與頁尾可以由同一套模板產生。正式網站頁面目前不受影響。</p>
</header>

<main class="wrap">
  <section class="section">
    <h2>試作目的</h2>
    <p>目前網站每一頁都各自寫了一份標題資訊、導覽列與頁尾。這份試作先把共用區塊集中在 <code>templates/</code>，再產生一個預覽頁，讓未來可以逐步減少重複維護。</p>
    <p>如果之後要修改導覽列文字、頁尾資訊、字型載入或社群分享設定，就可以先改模板，再用腳本產生需要的頁面，降低漏改其中一頁的機率。</p>
  </section>

  <section class="section">
    <h2>目前安全範圍</h2>
    <div class="two-way">
      <div class="way">
        <p class="dir">已建立 ──</p>
        <h3>共用模板零件</h3>
        <p><code>templates/partials/head.html</code>、<code>nav.html</code>、<code>footer.html</code> 與 <code>templates/layouts/base.html</code> 已可組成一個完整 HTML 頁面。</p>
      </div>
      <div class="way">
        <p class="dir">未替換 ──</p>
        <h3>正式公開頁面</h3>
        <p>首頁、關於、人物誌、校友聯演等正式頁面仍維持原本手寫版本。這一步只是先確認模板方向可行。</p>
      </div>
    </div>
  </section>

  <section class="section">
    <h2>下一步建議</h2>
    <p>若這份預覽頁確認正常，下一階段可以選擇一種最規律、風險最低的頁面類型試套模板，例如最新消息文章或人物個人頁。每次只轉換少量頁面，轉換後再執行健康檢查。</p>
    <p class="muted">產生時間：${escapeHtml(generatedAt)}</p>
  </section>
</main>`;

const html = renderPage({
  title: '共用模板試作｜嘉義高中管樂隊暨校友管樂團',
  description: '嘉義高中管樂隊暨校友管樂團網站的共用模板試作頁，用於本地確認 head、導覽列與頁尾模板化方向，不替換正式公開頁面。',
  url: 'https://cysh.band/_generated/page-template-preview.html',
  ogType: 'website',
  assetPrefix: '../',
  navActive: 'about',
  extraHead: '<meta name="robots" content="noindex">',
  content
});

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, html);
console.log(path.relative(root, outFile));
