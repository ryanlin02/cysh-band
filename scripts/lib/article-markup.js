/* 文章正文的簡易排版格式 → 官網 HTML
 *
 * ⚠️ 這個檔案在兩個專案各有一份，內容必須完全相同：
 *    cysh-band-community/src/lib/article-markup.js
 *    cysh-band/scripts/lib/article-markup.js
 *    （會員平台用它做即時預覽，官網用它產生正式頁面；不同步就會預覽與實際不一致）
 *    官網的 sync-member-publishing.js 會在執行時自動比對兩份是否一致。
 *
 * 為什麼自己寫而不用現成套件：
 *  ① 只需要固定幾種格式，自己寫可以「先全部跳脫、再開放白名單」，
 *     從根本上避免使用者貼進 HTML 或 <script> 造成的資安問題；
 *  ② 兩個專案都不必多裝套件，維護的人少一件事要煩惱。
 *
 * 支援的寫法（社員只要記這幾個）：
 *   **粗體**
 *   [顯示文字](https://網址)
 *   - 項目            → 清單
 *   1. 項目           → 編號清單
 *   > 引用一段話
 *   | 欄位 | 欄位 |   → 表格（第二列用 |---|---| 分隔）
 *   空一行            → 分成新的一段
 */

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

// 擋掉 javascript:、data: 這類危險網址；
// 站內相對連結（../people/7581.html、2026-06-12-xxx.html、#段落）一律放行。
function safeUrl(raw) {
  const value = String(raw || "").trim();
  if (!value || /\s/.test(value)) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (/^(mailto:|tel:)[^\s]+$/i.test(value)) return value;
  // 有「協定」的一律拒絕（javascript:、data:、vbscript: …）
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)) return "";
  return value;
}

/** 行內格式：先跳脫、再把白名單語法換成標籤 */
function renderInline(text) {
  let html = escapeHtml(text);
  // [文字](網址)
  html = html.replace(/\[([^\]\n]+)\]\(([^)\s]+)\)/g, (match, label, url) => {
    const href = safeUrl(url.replace(/&amp;/g, "&"));
    if (!href) return label;
    const external = /^https?:\/\//i.test(href) && !href.startsWith("https://cysh.band");
    return `<a href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${label}</a>`;
  });
  // **粗體**（先處理，才不會被斜體規則吃掉）
  html = html.replace(/\*\*([^*\n]+)\*\*/g, "<b>$1</b>");
  // *斜體*（曲名、外文書名常用）
  html = html.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<i>$2</i>");
  // 段落內換行
  return html.replace(/\n/g, "<br>\n");
}

/* 表格兩種寫法都支援，輸出都用官網既有的 table.plain 樣式：
 *   ① 有 |---| 分隔列 → 第一列是欄位標題（橫向表頭）
 *   ② 沒有分隔列     → 每一列的第一格是項目名稱（直向表頭，官網既有的時間表就是這種） */
function isSeparatorRow(line) {
  return /^\s*\|[\s:|-]+\|?\s*$/.test(line) && line.includes("-");
}

function renderTable(lines) {
  const cells = (line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
  const hasHeaderRow = lines.length >= 2 && isSeparatorRow(lines[1]);
  let inner;
  if (hasHeaderRow) {
    const header = cells(lines[0]);
    const rows = lines.slice(2).map(cells);
    inner = `<thead><tr>${header.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead>`
      + (rows.length ? `<tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`).join("")}</tbody>` : "");
  } else {
    inner = lines.map(cells).map((row) =>
      `<tr>${row.map((cell, index) => index === 0
        ? `<th>${renderInline(cell)}</th>`
        : `<td>${renderInline(cell)}</td>`).join("")}</tr>`).join("\n  ");
  }
  return `<div class="table-scroll"><table class="plain">\n  ${inner}\n</table></div>`;
}

function isTableBlock(lines) {
  return lines.every((line) => /^\s*\|.*\|\s*$/.test(line) || isSeparatorRow(line)) && /^\s*\|/.test(lines[0]);
}

/** 把一段正文轉成官網 HTML */
function renderBody(text) {
  const blocks = String(text || "").replace(/\r\n/g, "\n").split(/\n{2,}/);
  const out = [];
  for (const raw of blocks) {
    const block = raw.replace(/\s+$/, "");
    if (!block.trim()) continue;
    const lines = block.split("\n");

    if (isTableBlock(lines)) { out.push(renderTable(lines)); continue; }

    if (lines.every((line) => /^\s*[-*]\s+/.test(line))) {
      out.push(`<ul>${lines.map((line) => `<li>${renderInline(line.replace(/^\s*[-*]\s+/, ""))}</li>`).join("")}</ul>`);
      continue;
    }
    if (lines.every((line) => /^\s*\d+[.)]\s+/.test(line))) {
      out.push(`<ol>${lines.map((line) => `<li>${renderInline(line.replace(/^\s*\d+[.)]\s+/, ""))}</li>`).join("")}</ol>`);
      continue;
    }
    if (lines.every((line) => /^\s*>\s?/.test(line))) {
      // 最後一行若以「——」開頭視為出處，比照官網既有寫法放進 <footer>
      const quoted = lines.map((line) => line.replace(/^\s*>\s?/, ""));
      const last = quoted[quoted.length - 1] ?? "";
      const hasSource = quoted.length > 1 && /^\s*(——|--)/.test(last);
      const text = renderInline((hasSource ? quoted.slice(0, -1) : quoted).join("\n"));
      const source = hasSource ? `\n  <footer>${renderInline(last.trim())}</footer>` : "";
      out.push(`<blockquote>\n  ${text}${source}\n</blockquote>`);
      continue;
    }
    out.push(`<p>${renderInline(block)}</p>`);
  }
  return out.join("\n");
}

function renderFigure(image, assetPrefix) {
  const src = String(image.path || "").trim();
  if (!src) return "";
  const url = /^https?:\/\//i.test(src) ? src : `${assetPrefix}${src.replace(/^\/+/, "")}`;
  const size = image.width && image.height ? ` width="${Number(image.width)}" height="${Number(image.height)}"` : "";
  const caption = image.caption ? `\n  <figcaption>${renderInline(image.caption)}</figcaption>` : "";
  const wide = image.layout === "half" ? ' class="is-half"' : "";
  return `<figure${wide}>\n  <img src="${escapeHtml(url)}" alt="${escapeHtml(image.alt || image.caption || "")}"${size} loading="lazy">${caption}\n</figure>`;
}

/**
 * 整篇文章的正文 HTML。
 * section = { heading, body, images?: [{path, alt, caption, layout, width, height}], note? }
 * 第一段可以不填標題（做為開頭導言）。
 */
function renderArticleSections(sections, options) {
  const assetPrefix = (options && options.assetPrefix) || "";
  // 最新消息用 h2、人物介紹用 h3，與官網既有頁面一致
  const h = (options && options.headingLevel) || "h2";
  const parts = [];
  for (const section of Array.isArray(sections) ? sections : []) {
    const heading = String(section.heading || "").trim();
    if (heading) parts.push(`<${h}>${renderInline(heading)}</${h}>`);
    const body = renderBody(section.body);
    if (body) parts.push(body);
    for (const image of Array.isArray(section.images) ? section.images : []) {
      const figure = renderFigure(image, assetPrefix);
      if (figure) parts.push(figure);
    }
    const note = String(section.note || "").trim();
    if (note) parts.push(`<p class="muted">${renderInline(note)}</p>`);
  }
  return parts.join("\n\n") + "\n";
}

// 用 CommonJS 匯出：官網的產生腳本是 require()，會員平台這邊 import 也讀得到，
// 這樣兩份檔案才能保持一字不差。
module.exports = { escapeHtml, safeUrl, renderInline, renderBody, renderFigure, renderArticleSections };
