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
 *   [顯示文字](https://網址)  ← 也可以直接貼網址，會自動變成連結
 *   - 項目            → 清單
 *   1. 項目           → 編號清單
 *   > 引用一段話
 *   | 欄位 | 欄位 |   → 表格（第二列用 |---|---| 分隔）
 *   => [小標|大字](網址) → 重點連結（官網的 news-cta 樣式，自成一行）
 *   空一行            → 分成新的一段
 *
 * ⚠️ 重點連結一篇只有一個（2026-09-04 起）：
 *    金色外框是「讀者現在可以做的那一件事」——報名、購票、看這場的相簿。
 *    主辦單位官網、場館介紹、樂團簡介這些是**註腳**，不是行動；
 *    三個一樣重的框排在一起，讀者反而看不出哪一個才重要。
 *    所以第二個以後的 `=>` 會自動降級成一行普通的連結文字（連結不會消失）。
 *    這條規則寫在網站製作規範 2.3-B，由程式保證，不必靠寫文章的人記得。
 *
 * 段落層級（不是打在正文裡，是段落的設定）：
 *   style: "callout" → 把一段實務資訊（演出資訊、報名方式…）用上下兩條細線
 *                       跟前後文分開（官網的 news-callout）。不是外框：
 *                       文章頁的框額度已經給了重點連結（規範 2.3-0）。
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

function isExternal(href) {
  return /^https?:\/\//i.test(href) && !href.startsWith("https://cysh.band");
}

/**
 * 連結要帶哪些屬性。
 * rel 用 noopener 不用 noreferrer：官網既有連結都是 noopener，
 * 而且 noreferrer 會連「這個人是從嘉中管樂官網過去的」也一併拿掉，
 * 售票與主辦單位那邊就看不出流量是我們帶過去的。
 * 購票連結（OPENTIX）自動套官網的按鈕樣式與 GA 標記——
 * 這是網址就看得出來的事，不需要寫文章的人自己記得加。
 */
function linkAttrs(href) {
  const ticket = /^https:\/\/www\.opentix\.life\//i.test(href);
  return (ticket ? ' class="btn"' : "")
    + (isExternal(href) ? ' target="_blank" rel="noopener"' : "")
    + (ticket ? ' data-ga-event="ticket_click" data-ga-placement="news_body"' : "");
}

/**
 * 直接貼上的網址自動變成可以點的連結。
 * 一般人不會記得 [文字](網址) 這種寫法，貼上網址卻點不了，
 * 是寫文章的人最容易踩到、也最困惑的一件事。
 * 已經是連結的部分不再處理，避免重複包一層。
 */
function autoLink(html) {
  return html.split(/(<a\b[^>]*>[\s\S]*?<\/a>)/g).map((part, index) => {
    if (index % 2 === 1) return part;
    return part.replace(/https?:\/\/[^\s<"]+/g, (raw) => {
      // 網址後面常常黏著標點（句號、全形括號），不要吃進連結裡
      const url = raw.replace(/[)\].,;:、。，）】」]+$/, "");
      const href = safeUrl(url.replace(/&amp;/g, "&"));
      if (!href) return raw;
      return `<a href="${escapeHtml(href)}"${linkAttrs(href)}>${url}</a>${raw.slice(url.length)}`;
    });
  }).join("");
}

/** 行內格式：先跳脫、再把白名單語法換成標籤 */
function renderInline(text) {
  let html = escapeHtml(text);
  // [文字](網址)
  html = html.replace(/\[([^\]\n]+)\]\(([^)\s]+)\)/g, (match, label, url) => {
    const href = safeUrl(url.replace(/&amp;/g, "&"));
    if (!href) return label;
    return `<a href="${escapeHtml(href)}"${linkAttrs(href)}>${label}</a>`;
  });
  // **粗體**（先處理，才不會被斜體規則吃掉）
  html = html.replace(/\*\*([^*\n]+)\*\*/g, "<b>$1</b>");
  // *斜體*（曲名、外文書名常用）
  html = html.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<i>$2</i>");
  // 直接貼上的網址（放在最後，前面的 [文字](網址) 已經變成標籤了）
  html = autoLink(html);
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

/**
 * 重點連結（官網的 news-cta）：自成一行的 `=> [小標|大字](網址)`。
 * 官網上是一個橫幅式的連結區塊，用來把人帶去相簿、售票或主辦單位頁面。
 */
function renderCta(label, url, demote) {
  const href = safeUrl(url.replace(/&amp;/g, "&"));
  if (!href) return `<p>${renderInline(label)}</p>`;
  const cut = label.indexOf("|");
  const small = cut >= 0 ? label.slice(0, cut).trim() : "";
  const big = (cut >= 0 ? label.slice(cut + 1) : label).trim();
  const attrs = isExternal(href) ? ' target="_blank" rel="noopener"' : "";
  // 第二個以後的重點連結降級成一行普通連結：連結還在，只是不再搶走版面。
  if (demote) {
    const text = big.replace(/\s*[→>]+\s*$/, "").trim() || big;
    return `<p>${small ? `${renderInline(small)}：` : ""}`
      + `<a href="${escapeHtml(href)}"${attrs}>${renderInline(text)}</a></p>`;
  }
  return `<p><a class="news-cta" href="${escapeHtml(href)}"${attrs}>`
    + (small ? `<span>${renderInline(small)}</span>` : "")
    + `<b>${renderInline(big)}</b></a></p>`;
}

/** 把一段正文轉成官網 HTML。
 *  budget 是整篇文章共用的重點連結額度（見檔頭說明）；單獨呼叫時每次都給一個新的，
 *  行為與以前一樣——第一個 `=>` 仍然是金色外框。 */
function renderBody(text, budget) {
  const cta_budget = budget || { ctaUsed: false };
  const blocks = String(text || "").replace(/\r\n/g, "\n").split(/\n{2,}/);
  const out = [];
  for (const raw of blocks) {
    const block = raw.replace(/\s+$/, "");
    if (!block.trim()) continue;
    const lines = block.split("\n");

    if (isTableBlock(lines)) { out.push(renderTable(lines)); continue; }

    // => [小標|大字](網址)：整個區塊只有這一行時才算重點連結
    const cta = lines.length === 1 && /^\s*=>\s*\[([^\]\n]+)\]\(([^)\s]+)\)\s*$/.exec(block);
    if (cta) {
      out.push(renderCta(cta[1], cta[2], cta_budget.ctaUsed));
      cta_budget.ctaUsed = true;
      continue;
    }

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
 * section = { heading, body, style?: "callout", images?: [{path, alt, caption, layout, width, height}], note? }
 * 第一段可以不填標題（做為開頭導言）；style: "callout" 會把整段做成官網的重點框。
 */
function renderArticleSections(sections, options) {
  const assetPrefix = (options && options.assetPrefix) || "";
  // 最新消息用 h2、人物介紹用 h3，與官網既有頁面一致
  const h = (options && options.headingLevel) || "h2";
  const parts = [];
  // 整篇文章共用一個重點連結額度：只有第一個 `=>` 會做成金色外框。
  const ctaBudget = { ctaUsed: false };
  for (const section of Array.isArray(sections) ? sections : []) {
    const heading = String(section.heading || "").trim();
    const inner = [];
    if (heading) inner.push(`<${h}>${renderInline(heading)}</${h}>`);
    const body = renderBody(section.body, ctaBudget);
    if (body) inner.push(body);
    // 重點框只包標題與正文；圖片與附註仍照原本方式排在外面，
    // 框裡塞一張大圖在官網上會整個爆版。
    if (section.style === "callout" && inner.length) {
      const indented = inner.join("\n").split("\n").map((line) => (line ? `  ${line}` : line)).join("\n");
      parts.push(`<section class="news-callout">\n${indented}\n</section>`);
    } else {
      parts.push(...inner);
    }
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
module.exports = { escapeHtml, safeUrl, renderInline, renderBody, renderCta, renderFigure, renderArticleSections };
