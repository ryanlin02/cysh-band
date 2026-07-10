/* ============================================================
   嘉義高中管樂社 照片集 — 主程式
   純前端靜態網站：讀取 data/site-index.json 與 data/people.json
   ============================================================ */
"use strict";

const CFG = window.SITE_CONFIG;
const $ = (sel) => document.querySelector(sel);

let DB = null;          // { albums, photos }
let PEOPLE = [];        // 公開人物
let currentList = [];   // 目前畫面上照片的順序（給燈箱前後切換用）
let renderQueue = [];   // 尚未渲染的區段
let zoomMode = "album"; // album | month | year
let currentView = "";
let scrollPositions = {}; // 各檢視的捲動位置記憶

/* ---------- 工具 ---------- */
function encPath(rel) {
  return rel.split("/").map(encodeURIComponent).join("/");
}
const IMG_EXT = CFG.imageExt || ".jpg";
function thumbUrl(p) {
  if (p.thumb) return CFG.imageBase + "/" + encPath(p.thumb.replace(/^images\//, "").replace(/\.jpg$/i, IMG_EXT));
  const alb = DB.albums[p.a];
  const stem = p.f.replace(/\.[^.]+$/, "");
  return CFG.imageBase + "/thumb/" + encPath(alb.folder + "/" + stem + "-" + p.i + IMG_EXT);
}
function largeUrl(p) {
  if (p.large) return CFG.imageBase + "/" + encPath(p.large.replace(/^images\//, "").replace(/\.jpg$/i, IMG_EXT));
  return thumbUrl(p).replace("/thumb/", "/large/");
}
function albumDateLabel(alb) {
  if (alb.precision === "day") {
    const [y, m, d] = alb.date.split("-");
    return `${y}年${+m}月${+d}日`;
  }
  if (alb.precision === "month") {
    const [y, m] = alb.date.split("-");
    return `${y}年${+m}月`;
  }
  if (alb.precision === "year") return `${alb.date}年（日期待考）`;
  return "年份不詳";
}
function albumYear(alb) {
  const y = (alb.sortDate || "").slice(0, 4);
  return y && y !== "0000" ? y : null;
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- 資料載入 ---------- */
async function loadData() {
  const [idx, ppl] = await Promise.all([
    fetch(CFG.dataBase + "/site-index.json").then((r) => r.json()),
    fetch(CFG.dataBase + "/people.json").then((r) => r.json()),
  ]);
  DB = idx;
  PEOPLE = ppl;
  // 相簿由新到舊排序後的索引清單（時間軸用）
  DB.albumOrder = DB.albums
    .map((a, i) => i)
    .sort((x, y) => (DB.albums[y].sortDate || "").localeCompare(DB.albums[x].sortDate || ""));
  // 每本相簿的照片
  DB.photosByAlbum = DB.albums.map(() => []);
  DB.photoById = {};
  for (const p of DB.photos) {
    DB.photosByAlbum[p.a].push(p);
    DB.photoById[p.i] = p;
  }
  DB.aiCount = DB.photos.filter((p) => p.c || p.k).length;
}

/* ---------- 版面：照片牆（等高排排版） ---------- */
function targetRowHeight() {
  const w = Math.min(window.innerWidth, 1500);
  const base = zoomMode === "year" ? 74 : zoomMode === "month" ? 110 : 170;
  return w < 500 ? base * 0.75 : base;
}
function contentInnerWidth() {
  const c = $("#content");
  const cs = getComputedStyle(c);
  return c.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
}
function buildGrid(photos, listOffset) {
  // Google Photos 式等高排版：
  // 每一排是一個 flex 容器；排內每張照片以「長寬比」作為 flex-grow 權重，
  // 由瀏覽器精確分配寬度 → 左右邊緣必定切齊，無捨入誤差。
  // 只有最後一排（未填滿）維持固定尺寸、靠左排列。
  const grid = document.createElement("div");
  grid.className = "pgrid";
  const W = contentInnerWidth();
  const H = targetRowHeight();
  const GAP = 4; // 每張照片左右 margin 2px
  let row = [], rowRatio = 0;
  const flushJustified = () => {
    if (!row.length) return;
    const h = (W - row.length * GAP) / rowRatio;
    const rowEl = document.createElement("div");
    rowEl.className = "prow";
    for (const item of row) {
      item.el.style.height = h.toFixed(2) + "px";
      item.el.style.flex = `${item.ratio} 1 0%`; // 依比例精確分配寬度
      rowEl.appendChild(item.el);
    }
    grid.appendChild(rowEl);
    row = []; rowRatio = 0;
  };
  const flushLast = () => {
    if (!row.length) return;
    const rowEl = document.createElement("div");
    rowEl.className = "prow";
    for (const item of row) {
      item.el.style.height = H.toFixed(2) + "px";
      item.el.style.width = (H * item.ratio).toFixed(2) + "px";
      item.el.style.flex = "0 0 auto";
      rowEl.appendChild(item.el);
    }
    grid.appendChild(rowEl);
    row = []; rowRatio = 0;
  };
  photos.forEach((p, k) => {
    const ratio = (p.w && p.h) ? Math.min(3, Math.max(0.3, p.w / p.h)) : 1;
    const el = document.createElement("div");
    el.className = "ph";
    el.dataset.idx = listOffset + k;
    const img = document.createElement("img");
    img.decoding = "async";
    img.dataset.src = thumbUrl(p); // 由 imgObserver 控制載入/卸載
    img.alt = "";
    img.onload = () => img.classList.add("ok");
    el.appendChild(img);
    imgObserver.observe(img);
    row.push({ el, ratio });
    rowRatio += ratio;
    // 這一排以目標高度排列已達（或超過）容器寬度 → 收斂成一排
    if (rowRatio * H + row.length * GAP >= W) flushJustified();
  });
  flushLast();
  return grid;
}

/* ---------- 縮圖記憶體管理 ----------
   數千張縮圖若同時留在記憶體會拖垮瀏覽器（尤其手機）。
   做法：只有「視窗上下 1500px 範圍內」的縮圖才實際載入，
   捲遠之後自動卸載（釋放解碼後的圖像記憶體），捲回來再載入
   （通常仍在瀏覽器快取中，重新顯示很快）。 */
const imgObserver = new IntersectionObserver((entries) => {
  for (const en of entries) {
    const img = en.target;
    if (en.isIntersecting) {
      if (!img.getAttribute("src")) img.src = img.dataset.src;
    } else if (img.getAttribute("src")) {
      img.removeAttribute("src");
      img.classList.remove("ok");
    }
  }
}, { rootMargin: "1500px 0px" });

/* ---------- 區段渲染（漸進式載入） ---------- */
const sentinelObs = new IntersectionObserver((entries) => {
  if (entries.some((e) => e.isIntersecting)) renderNextChunk();
}, { rootMargin: "1200px" });

function resetContent() {
  const c = $("#content");
  imgObserver.disconnect(); // 舊畫面的縮圖全部停止觀察
  c.innerHTML = "";
  renderQueue = [];
  currentList = [];
  $("#loading").classList.add("hidden");
  // 重新觸發檢視切換淡入動畫（0.28 秒，不阻擋操作）
  c.classList.remove("fade-in");
  void c.offsetWidth;
  c.classList.add("fade-in");
}
function queueSections(sections) {
  renderQueue = sections.slice();
  renderNextChunk();
  sentinelObs.observe($("#sentinel"));
}
function renderNextChunk() {
  if (!renderQueue.length) { $("#loading").classList.add("hidden"); return; }
  $("#loading").classList.remove("hidden");
  let budget = 350; // 每批照片數
  const frag = document.createDocumentFragment();
  while (renderQueue.length && budget > 0) {
    const sec = renderQueue.shift();
    const header = document.createElement("div");
    header.className = "section-header";
    header.id = sec.anchor || "";
    header.innerHTML = sec.headerHtml;
    frag.appendChild(header);
    frag.appendChild(buildGrid(sec.photos, currentList.length));
    currentList.push(...sec.photos);
    budget -= sec.photos.length;
  }
  $("#content").appendChild(frag);
  if (!renderQueue.length) $("#loading").classList.add("hidden");
}

/* ---------- 檢視：時間軸 ---------- */
function timelineSections() {
  const secs = [];
  if (zoomMode === "album") {
    for (const ai of DB.albumOrder) {
      const alb = DB.albums[ai];
      const ph = DB.photosByAlbum[ai];
      if (!ph.length) continue;
      secs.push({
        anchor: "y" + (albumYear(alb) || "unknown") + "_a" + ai,
        year: albumYear(alb),
        headerHtml:
          `<span class="sec-date">${esc(albumDateLabel(alb))}</span>` +
          `<span class="sec-title">${esc(alb.title)}</span>` +
          `<span class="sec-count">${ph.length} 張</span>` +
          (alb.review ? `<span class="badge-review">日期待考</span>` : ""),
        photos: ph,
      });
    }
  } else {
    const keyOf = (alb) => {
      const y = albumYear(alb);
      if (!y) return "unknown";
      return zoomMode === "year" ? y : (alb.sortDate || "").slice(0, 7);
    };
    const labelOf = (key) => {
      if (key === "unknown") return "年份不詳";
      if (zoomMode === "year") return key + "年";
      const [y, m] = key.split("-");
      return +m ? `${y}年${+m}月` : `${y}年（月份待考）`;
    };
    let curKey = null, cur = null;
    for (const ai of DB.albumOrder) {
      const alb = DB.albums[ai];
      const ph = DB.photosByAlbum[ai];
      if (!ph.length) continue;
      const key = keyOf(alb);
      if (key !== curKey) {
        curKey = key;
        cur = { anchor: "y" + (key === "unknown" ? "unknown" : key.slice(0, 4)) + "_k" + key,
                year: key === "unknown" ? null : key.slice(0, 4),
                headerHtml: "", photos: [], _label: labelOf(key) };
        secs.push(cur);
      }
      cur.photos = cur.photos.concat(ph);
    }
    for (const s of secs) {
      s.headerHtml = `<span class="sec-date">${esc(s._label)}</span><span class="sec-count">${s.photos.length} 張</span>`;
    }
  }
  return secs;
}

/* ---------- 年份捲動條 ---------- */
let scrubYears = [];
function buildScrubber(sections) {
  const track = $("#scrubberTrack");
  track.innerHTML = "";
  const totals = {};
  let total = 0;
  for (const s of sections) {
    const y = s.year || "不詳";
    totals[y] = (totals[y] || 0) + s.photos.length;
    total += s.photos.length;
  }
  scrubYears = [];
  let acc = 0;
  const years = Object.keys(totals).sort((a, b) => (b === "不詳" ? -1 : a === "不詳" ? 1 : b.localeCompare(a)));
  for (const y of years) {
    scrubYears.push({ year: y, frac: acc / total });
    acc += totals[y];
  }
  const trackH = track.clientHeight || 400;
  let lastPx = -100;
  for (const sy of scrubYears) {
    const px = sy.frac * trackH;
    if (px - lastPx < 26) continue; // 避免標籤重疊
    lastPx = px;
    const el = document.createElement("div");
    el.className = "scrub-year";
    el.style.top = px + "px";
    el.textContent = sy.year;
    track.appendChild(el);
  }
}
function scrubberJump(clientY) {
  const track = $("#scrubberTrack");
  const rect = track.getBoundingClientRect();
  const frac = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
  let target = scrubYears[0];
  for (const sy of scrubYears) if (sy.frac <= frac) target = sy;
  if (!target) return;
  const bubble = $("#scrubberBubble");
  bubble.textContent = target.year;
  bubble.style.top = (frac * rect.height) + "px";
  bubble.classList.remove("hidden");
  // 需要的區段可能還沒渲染 → 先渲染到該年份為止
  ensureYearRendered(target.year);
  const el = document.querySelector(`.section-header[id^="y${target.year}_"]`);
  if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "auto" });
}
function ensureYearRendered(year) {
  let guard = 200;
  const match = () => document.querySelector(`.section-header[id^="y${year}_"]`);
  while (!match() && renderQueue.length && guard-- > 0) renderNextChunk();
}
function initScrubberEvents() {
  const sc = $("#scrubber");
  let active = false;
  const move = (e) => {
    if (!active) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    scrubberJump(y);
    e.preventDefault();
  };
  const end = () => { active = false; setTimeout(() => $("#scrubberBubble").classList.add("hidden"), 400); };
  sc.addEventListener("mousedown", (e) => { active = true; move(e); });
  sc.addEventListener("touchstart", (e) => { active = true; move(e); }, { passive: false });
  window.addEventListener("mousemove", move);
  window.addEventListener("touchmove", move, { passive: false });
  window.addEventListener("mouseup", end);
  window.addEventListener("touchend", end);
  // 頁面捲動時，在軌道上顯示「目前年份」指示（一段時間後淡出）
  let ticking = false, fadeTimer = null;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (sc.classList.contains("hidden") || !scrubYears.length) return;
      const top = window.scrollY + 70;
      let year = null;
      for (const h of document.querySelectorAll(".section-header[id]")) {
        if (h.offsetTop <= top) year = (h.id.match(/^y(\w+)_/) || [])[1] || year;
        else break;
      }
      if (!year) return;
      if (year === "unknown") year = "不詳";
      const sy = scrubYears.find((s) => s.year === year);
      if (!sy) return;
      const ind = $("#scrubIndicator");
      const trackH = $("#scrubberTrack").clientHeight || 400;
      ind.textContent = year;
      ind.style.top = (sy.frac * trackH) + "px";
      ind.classList.remove("hidden", "fading");
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => ind.classList.add("fading"), 1400);
    });
  }, { passive: true });
}

/* ---------- 檢視：相簿列表 ---------- */
function renderAlbums() {
  resetContent();
  const c = $("#content");
  const byYear = {};
  for (const ai of DB.albumOrder) {
    const alb = DB.albums[ai];
    if (!DB.photosByAlbum[ai].length) continue;
    const y = albumYear(alb) || "年份不詳";
    (byYear[y] = byYear[y] || []).push(ai);
  }
  const years = Object.keys(byYear).sort((a, b) => (b === "年份不詳" ? -1 : a === "年份不詳" ? 1 : b.localeCompare(a)));
  const frag = document.createDocumentFragment();
  for (const y of years) {
    const h = document.createElement("div");
    h.className = "year-header";
    h.textContent = y === "年份不詳" ? y : y + "年";
    frag.appendChild(h);
    const grid = document.createElement("div");
    grid.className = "album-grid";
    for (const ai of byYear[y]) {
      const alb = DB.albums[ai];
      const cover = DB.photosByAlbum[ai][0];
      const card = document.createElement("div");
      card.className = "album-card";
      card.innerHTML =
        `<div class="cover"><img loading="lazy" decoding="async" src="${thumbUrl(cover)}" alt=""></div>` +
        `<div class="a-title">${esc(alb.title)}</div>` +
        `<div class="a-meta">${esc(albumDateLabel(alb))} · ${alb.count} 張` +
        (alb.review ? ` <span class="badge-review">日期待考</span>` : "") + `</div>`;
      card.onclick = () => { location.hash = "#/album/" + encodeURIComponent(alb.id); };
      grid.appendChild(card);
    }
    frag.appendChild(grid);
  }
  c.appendChild(frag);
}

/* ---------- 檢視：相簿內頁 ---------- */
function renderAlbumDetail(albumId) {
  resetContent();
  const ai = DB.albums.findIndex((a) => a.id === albumId);
  if (ai < 0) { $("#content").innerHTML = `<div class="empty">找不到這本相簿</div>`; return; }
  const alb = DB.albums[ai];
  const ph = DB.photosByAlbum[ai];
  $("#subHeader").classList.remove("hidden");
  $("#subHeader").innerHTML =
    `<div class="sub-title">${esc(alb.title)}</div>` +
    `<div class="sub-meta">${esc(albumDateLabel(alb))} · ${ph.length} 張` +
    (alb.review ? ` · <span class="badge-review">日期待考</span>` : "") + `</div>`;
  queueSections([{ headerHtml: `<span class="sec-count">${ph.length} 張照片</span>`, photos: ph }]);
}

/* ---------- 檢視：人物 ---------- */
function renderPeople() {
  resetContent();
  const c = $("#content");
  if (!PEOPLE.length) {
    c.innerHTML = `<div class="empty"><div class="big">👤</div>目前還沒有可顯示的人物</div>`;
    return;
  }
  const grid = document.createElement("div");
  grid.className = "people-grid";
  for (const p of PEOPLE) {
    if (!p.count) continue;
    const card = document.createElement("div");
    card.className = "person-card";
    card.innerHTML =
      `<div class="face">${p.avatar ? `<img loading="lazy" src="${CFG.dataBase}/${encPath(p.avatar)}" alt="">` : ""}</div>` +
      `<div class="p-name">${esc(p.name)}</div><div class="p-count">${p.count} 張</div>`;
    card.onclick = () => { location.hash = "#/person/" + encodeURIComponent(p.id); };
    grid.appendChild(card);
  }
  c.appendChild(grid);
}
function renderPersonDetail(personId) {
  resetContent();
  const pi = PEOPLE.findIndex((p) => p.id === personId);
  if (pi < 0) { $("#content").innerHTML = `<div class="empty">找不到這位人物</div>`; return; }
  const person = PEOPLE[pi];
  $("#subHeader").classList.remove("hidden");
  $("#subHeader").innerHTML =
    `<div class="sub-title">` +
    (person.avatar ? `<img class="sub-avatar" src="${CFG.dataBase}/${encPath(person.avatar)}">` : "") +
    `${esc(person.name)}</div><div class="sub-meta">出現在 ${person.count} 張照片中（依人臉辨識結果，可能有誤判）</div>`;
  // 依相簿分區段
  const secs = [];
  for (const ai of DB.albumOrder) {
    const ph = DB.photosByAlbum[ai].filter((p) => p.p && p.p.includes(pi));
    if (!ph.length) continue;
    const alb = DB.albums[ai];
    secs.push({
      headerHtml: `<span class="sec-date">${esc(albumDateLabel(alb))}</span><span class="sec-title">${esc(alb.title)}</span><span class="sec-count">${ph.length} 張</span>`,
      photos: ph,
    });
  }
  queueSections(secs);
}

/* ---------- 檢視:搜尋 ---------- */
let searchTimer = null;
function renderSearch(initialQ) {
  resetContent();
  $("#subHeader").classList.remove("hidden");
  const annotated = DB.aiCount, total = DB.photos.length;
  $("#subHeader").innerHTML =
    `<div class="search-wrap"><div class="search-box"><svg class="ico-svg" style="color:var(--ink-dim)"><use href="#i-search"/></svg> <input id="searchInput" type="search" ` +
    `placeholder="搜尋活動、人物、照片內容…" value="${esc(initialQ || "")}" enterkeyhint="search"></div>` +
    `<div class="search-hint">可搜尋：活動名稱、人名、AI 照片內容標註（目前已完成 ${annotated.toLocaleString()} / ${total.toLocaleString()} 張，持續增加中）</div>` +
    `<div class="chips" id="searchChips"></div></div>`;
  const chips = ["合照", "演出", "團練", "比賽", "露營", "薩克斯風", "小號", "長笛", "打擊", "指揮", "舞台", "社辦"];
  const chipBox = $("#searchChips");
  for (const kw of chips) {
    const b = document.createElement("button");
    b.className = "chip"; b.textContent = kw;
    b.onclick = () => { $("#searchInput").value = kw; doSearch(kw); };
    chipBox.appendChild(b);
  }
  const input = $("#searchInput");
  // 中文輸入法（IME）保護：選字過程中的 Enter 與 input 事件不觸發搜尋，
  // 避免「文字重複出現、搜尋內容錯誤」的問題
  let composing = false;
  input.addEventListener("compositionstart", () => { composing = true; });
  input.addEventListener("compositionend", () => {
    composing = false;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => doSearch(input.value), 300);
  });
  input.addEventListener("input", () => {
    if (composing) return;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => doSearch(input.value), 300);
  });
  input.addEventListener("keydown", (e) => {
    if (e.isComposing || e.keyCode === 229) return; // 輸入法選字中，忽略
    if (e.key === "Enter") { clearTimeout(searchTimer); doSearch(input.value); input.blur(); }
  });
  if (initialQ) doSearch(initialQ); else input.focus();
}
// 同義詞表：搜尋任一詞時，同組的其他寫法也視為符合
const SYNONYMS = [
  ["演出", "表演", "音樂會", "演奏", "公演", "聯演"],
  ["團練", "練習", "排練", "練樂器", "合奏"],
  ["比賽", "競賽", "市賽", "縣賽", "全國賽", "音樂比賽"],
  ["合照", "團體照", "大合照", "合影", "全體"],
  ["露營", "營隊", "宿營", "夜營"],
  ["社辦", "社團辦公室", "辦公室"],
  ["交接", "幹部交接"],
  ["畢業", "畢典", "畢業典禮"],
  ["校慶", "園遊會", "路跑"],
  ["踩街", "遊行", "管樂節"],
  ["招生", "迎新", "招生音樂會"],
  ["薩克斯風", "sax", "薩克斯"],
  ["小號", "小喇叭", "trumpet"],
  ["長笛", "flute"],
  ["豎笛", "黑管", "單簧管", "clarinet"],
  ["打擊", "鼓", "percussion"],
  ["法國號", "horn"],
  ["長號", "伸縮號", "trombone"],
  ["低音號", "tuba", "上低音號"],
];
function expandTerm(t) {
  const out = new Set([t]);
  for (const group of SYNONYMS) {
    if (group.some((g) => g.toLowerCase().includes(t) || t.includes(g.toLowerCase()))) {
      for (const g of group) out.add(g.toLowerCase());
    }
  }
  return [...out];
}
function photoText(p) {
  if (p._txt === undefined) {
    p._txt = ((p.c || "") + " " + (p.k || []).join(" ") + " " + (p.s || "")).toLowerCase();
  }
  return p._txt;
}
function albumText(ai) {
  const a = DB.albums[ai];
  if (a._txt === undefined) a._txt = (a.title + " " + a.id).toLowerCase();
  return a._txt;
}
function runQuery(termGroups) {
  // 每個詞（含同義詞）至少要命中一處；多個詞之間為「同時成立」
  const matchedPeople = new Set();
  PEOPLE.forEach((p, i) => {
    const n = p.name.toLowerCase();
    if (termGroups.some((g) => g.some((t) => n.includes(t)))) matchedPeople.add(i);
  });
  const groupHit = (txt, g) => g.some((t) => txt.includes(t));
  return DB.photos.filter((p) => {
    return termGroups.every((g) =>
      groupHit(albumText(p.a), g) ||
      (p.p && p.p.some((pi) => matchedPeople.has(pi) && groupHit(PEOPLE[pi].name.toLowerCase(), g))) ||
      groupHit(photoText(p), g)
    );
  });
}
function doSearch(q) {
  q = (q || "").trim();
  resetContentKeepHeader();
  if (!q) return;
  history.replaceState(null, "", "#/search/" + encodeURIComponent(q));
  const rawTerms = [...new Set(q.toLowerCase().split(/\s+/).filter(Boolean))];
  let results = runQuery(rawTerms.map(expandTerm));
  let fuzzyNote = "";
  // 找不到時的遞補策略：把查詢字串拆成兩字一組的「相近字詞」再搜一次
  // （可處理輸入法重複字、詞序不同、多打字等情況）
  if (!results.length) {
    const joined = rawTerms.join("");
    const bigrams = new Set();
    for (let i = 0; i + 1 < joined.length; i++) bigrams.add(joined.slice(i, i + 2));
    if (bigrams.size) {
      const groups = [...bigrams].map(expandTerm);
      // 相近搜尋採「命中任一相近詞即可」，並依命中數排序
      const scored = [];
      for (const p of DB.photos) {
        let score = 0;
        for (const g of groups) {
          if (g.some((t) => photoText(p).includes(t) || albumText(p.a).includes(t) ||
              (p.p || []).some((pi) => PEOPLE[pi].name.toLowerCase().includes(t)))) score++;
        }
        if (score > 0) scored.push([score, p]);
      }
      const best = Math.max(0, ...scored.map(([s]) => s));
      if (best > 0) {
        results = scored.filter(([s]) => s === best).map(([, p]) => p);
        fuzzyNote = `找不到完全符合「${esc(q)}」的結果，以下是相近字詞的結果：`;
      }
    }
  }
  if (!results.length) {
    $("#content").innerHTML = `<div class="empty"><div class="big">🔍</div>找不到「${esc(q)}」相關的照片<br>
      <small>提示：AI 內容標註還在進行中（${DB.aiCount.toLocaleString()}/${DB.photos.length.toLocaleString()} 張），之後會找到更多結果</small></div>`;
    return;
  }
  if (fuzzyNote) {
    const n = document.createElement("div");
    n.className = "search-hint";
    n.innerHTML = fuzzyNote;
    $("#content").appendChild(n);
  }
  // 依相簿分區段呈現
  const byAlbum = new Map();
  for (const p of results) {
    if (!byAlbum.has(p.a)) byAlbum.set(p.a, []);
    byAlbum.get(p.a).push(p);
  }
  const secs = [];
  const order = [...byAlbum.keys()].sort((x, y) => (DB.albums[y].sortDate || "").localeCompare(DB.albums[x].sortDate || ""));
  for (const ai of order) {
    const alb = DB.albums[ai];
    secs.push({
      headerHtml: `<span class="sec-date">${esc(albumDateLabel(alb))}</span><span class="sec-title">${esc(alb.title)}</span><span class="sec-count">${byAlbum.get(ai).length} 張</span>`,
      photos: byAlbum.get(ai),
    });
  }
  const info = document.createElement("div");
  info.className = "search-hint";
  info.textContent = `共找到 ${results.length.toLocaleString()} 張照片`;
  $("#content").appendChild(info);
  queueSections(secs);
}
function resetContentKeepHeader() {
  $("#content").innerHTML = "";
  renderQueue = [];
  currentList = [];
}

/* ---------- 燈箱 ---------- */
let lbIndex = -1;
let lbScale = 1, lbTx = 0, lbTy = 0;
let lbFront = null;    // 目前顯示中的圖層
let lbLoadToken = 0;   // 快速連續切換時，忽略過期的載入結果
function activeImg() { return lbFront || $("#lbImg"); }
function openLightbox(idx) {
  if (idx < 0 || idx >= currentList.length) return;
  lbIndex = idx;
  const p = currentList[idx];
  resetZoom();
  // 交叉淡化：先在背景圖層載入並解碼完成，才淡入蓋過舊照片（全程無黑畫面）
  const token = ++lbLoadToken;
  const front = activeImg();
  const back = front === $("#lbImg") ? $("#lbImg2") : $("#lbImg");
  const url = largeUrl(p);
  const pre = new Image();
  pre.src = url;
  const show = () => {
    if (token !== lbLoadToken) return; // 使用者已切到別張，放棄這次結果
    back.src = url;
    back.classList.remove("kb");
    back.style.zIndex = 2;
    front.style.zIndex = 1;
    back.classList.add("show");
    if (slideTimer) back.classList.add("kb");
    front.classList.remove("show", "kb");
    lbFront = back;
  };
  (pre.decode ? pre.decode().then(show, show) : (pre.onload = show));
  $("#lbCounter").textContent = `${idx + 1} / ${currentList.length}`;
  $("#lbDownload").href = url;
  $("#lbDownload").setAttribute("download", p.f);
  $("#lightbox").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  updatePanel(p);
  // 預先載入前後兩張
  for (const off of [1, -1]) {
    const q = currentList[idx + off];
    if (q) { const im = new Image(); im.src = largeUrl(q); }
  }
}
function closeLightbox() {
  stopSlideshow();
  lbLoadToken++; // 取消進行中的載入
  $("#lightbox").classList.add("hidden");
  $("#lbPanel").classList.add("hidden");
  for (const im of document.querySelectorAll(".lb-photo")) {
    im.classList.remove("show", "kb");
    im.removeAttribute("src");
  }
  lbFront = null;
  document.body.style.overflow = "";
  lbIndex = -1;
}
function lbStep(d) {
  const n = lbIndex + d;
  if (n >= 0 && n < currentList.length) openLightbox(n);
}
/* 幻燈片播放 */
let slideTimer = null;
function stopSlideshow() {
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
    const b = $("#lbPlay");
    b.innerHTML = '<svg class="ico-svg"><use href="#i-play"/></svg>';
    b.title = "幻燈片播放";
    activeImg().classList.remove("kb");
  }
}
function toggleSlideshow() {
  if (slideTimer) { stopSlideshow(); return; }
  const b = $("#lbPlay");
  b.innerHTML = '<svg class="ico-svg"><use href="#i-pause"/></svg>';
  b.title = "暫停播放";
  activeImg().classList.add("kb"); // 目前這張也開始緩慢放大
  slideTimer = setInterval(() => {
    if (lbIndex < currentList.length - 1) openLightbox(lbIndex + 1);
    else stopSlideshow(); // 播到最後一張自動停止
  }, 3500);
}
function updatePanel(p) {
  const alb = DB.albums[p.a];
  let html = "";
  if (p.c) html += `<div class="cap">${esc(p.c)}</div>`;
  html += `<h3>日期／活動</h3><div>${esc(albumDateLabel(alb))} · <a class="alb-link" href="#/album/${encodeURIComponent(alb.id)}" onclick="document.getElementById('lbClose').click()">${esc(alb.title)}</a></div>`;
  if (p.p && p.p.length) {
    html += `<h3>照片中的人物（AI 辨識，可能有誤）</h3><div>` +
      p.p.map((pi) => {
        const person = PEOPLE[pi];
        const face = person.avatar
          ? `<img class="pp-face" src="${CFG.dataBase}/${encPath(person.avatar)}" alt="">`
          : "";
        return `<span class="pp-chip" onclick="location.hash='#/person/${person.id}';document.getElementById('lbClose').click()">${face}${esc(person.name)}</span>`;
      }).join("") + `</div>`;
  }
  if (p.k && p.k.length) {
    html += `<h3>標籤</h3><div>` +
      p.k.slice(0, 12).map((t) => `<span class="tag-chip" onclick="location.hash='#/search/${encodeURIComponent(t)}';document.getElementById('lbClose').click()">${esc(t)}</span>`).join("") + `</div>`;
  }
  html += `<h3>檔案</h3><div style="color:#9ca3af;font-size:12px">${esc(alb.folder)}/${esc(p.f)}</div>`;
  $("#lbPanel").innerHTML = html;
}
function resetZoom() {
  lbScale = 1; lbTx = 0; lbTy = 0;
  for (const im of document.querySelectorAll(".lb-photo")) {
    im.style.transform = ""; im.style.transformOrigin = "";
  }
}
function applyZoom() {
  const img = activeImg();
  if (lbScale === 1) { img.style.transform = ""; img.style.transformOrigin = ""; return; }
  img.classList.remove("kb"); // 手動縮放時停用過場動畫，避免衝突
  img.style.transformOrigin = "0 0";
  img.style.transform = `translate(${lbTx}px, ${lbTy}px) scale(${lbScale})`;
}
function initLightboxEvents() {
  $("#lbClose").onclick = closeLightbox;
  $("#lbPrev").onclick = () => { stopSlideshow(); lbStep(-1); };
  $("#lbNext").onclick = () => { stopSlideshow(); lbStep(1); };
  $("#lbInfo").onclick = () => $("#lbPanel").classList.toggle("hidden");
  $("#lbPlay").onclick = toggleSlideshow;
  // 下載：一律提供 JPG。若網站圖檔是 WebP，於瀏覽器內即時轉成 JPG 再下載
  $("#lbDownload").addEventListener("click", async (e) => {
    e.preventDefault();
    const p = currentList[lbIndex];
    if (!p) return;
    const url = largeUrl(p);
    const name = p.f.replace(/\.[^.]+$/, "") + ".jpg";
    try {
      const blob = await (await fetch(url)).blob();
      let out = blob;
      if (!/jpe?g/i.test(blob.type)) { // WebP（或其他格式）→ 轉 JPG
        const bmp = await createImageBitmap(blob);
        const canvas = document.createElement("canvas");
        canvas.width = bmp.width; canvas.height = bmp.height;
        canvas.getContext("2d").drawImage(bmp, 0, 0);
        out = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.92));
        bmp.close();
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(out);
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 8000);
      toast("已開始下載");
    } catch (err) {
      window.open(url, "_blank"); // 轉檔失敗時退回直接開圖
    }
  });
  $("#lbShare").onclick = async () => {
    const p = currentList[lbIndex];
    const url = location.origin + location.pathname + "#/photo/" + p.i;
    try {
      if (navigator.share) await navigator.share({ title: CFG.title, url });
      else { await navigator.clipboard.writeText(url); toast("已複製連結"); }
    } catch (e) { /* 使用者取消 */ }
  };
  document.addEventListener("keydown", (e) => {
    if ($("#lightbox").classList.contains("hidden")) return;
    if (e.key === "Escape") {
      // ESC 分層關閉：資訊欄開著就先關資訊欄，再按一次才離開照片
      const panel = $("#lbPanel");
      if (!panel.classList.contains("hidden")) panel.classList.add("hidden");
      else closeLightbox();
    }
    if (e.key === "ArrowLeft") { stopSlideshow(); lbStep(-1); }
    if (e.key === "ArrowRight") { stopSlideshow(); lbStep(1); }
    if (e.key === " ") { e.preventDefault(); toggleSlideshow(); }
  });
  // 觸控：滑動換頁、雙指縮放、雙擊放大
  const stage = $("#lbStage");
  let touchStartX = 0, touchStartY = 0, startDist = 0, startScale = 1, panning = false, lastTap = 0;
  let startTx = 0, startTy = 0, panStartX = 0, panStartY = 0;
  stage.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
      startDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      startScale = lbScale;
    } else if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      if (lbScale > 1) { panning = true; panStartX = touchStartX; panStartY = touchStartY; startTx = lbTx; startTy = lbTy; }
      const now = Date.now();
      if (now - lastTap < 300) { // 雙擊
        if (lbScale > 1) resetZoom();
        else { lbScale = 2.5; lbTx = -touchStartX * 1.5; lbTy = -touchStartY * 1.5; applyZoom(); }
      }
      lastTap = now;
    }
  }, { passive: true });
  stage.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2 && startDist) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      lbScale = Math.min(5, Math.max(1, startScale * d / startDist));
      if (lbScale === 1) { lbTx = 0; lbTy = 0; }
      applyZoom();
    } else if (panning && e.touches.length === 1) {
      lbTx = startTx + (e.touches[0].clientX - panStartX);
      lbTy = startTy + (e.touches[0].clientY - panStartY);
      applyZoom();
    }
  }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (e.touches.length === 0) {
      startDist = 0;
      if (!panning && lbScale === 1 && e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) { stopSlideshow(); lbStep(dx < 0 ? 1 : -1); }
        else if (dy < -70 && Math.abs(dy) > Math.abs(dx) * 1.5) $("#lbPanel").classList.remove("hidden"); // 上滑看資訊
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) {
          // 下滑：資訊面板開著就先收合，否則關閉照片
          if (!$("#lbPanel").classList.contains("hidden")) $("#lbPanel").classList.add("hidden");
          else closeLightbox();
        }
      }
      panning = false;
    }
  });
  // 點照片以外的空白區域：資訊欄開著就先關資訊欄，否則關閉照片
  stage.addEventListener("click", (e) => {
    if (e.target !== stage) return;
    const panel = $("#lbPanel");
    if (!panel.classList.contains("hidden")) panel.classList.add("hidden");
    else closeLightbox();
  });
}
function toast(msg) {
  const t = $("#lbToast");
  t.textContent = msg;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), 1600);
}

/* ---------- 路由 ---------- */
function setNav(view) {
  document.querySelectorAll("#desktopNav a, #bottomNav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.view === view);
  });
}
function route() {
  const hash = decodeURIComponent(location.hash || "#/timeline");
  const parts = hash.replace(/^#\//, "").split("/");
  const view = parts[0] || "timeline";
  // 記住舊檢視捲動位置
  if (currentView) scrollPositions[currentView] = window.scrollY;
  $("#subHeader").classList.add("hidden");
  $("#zoomBar").classList.add("hidden");
  $("#scrubber").classList.add("hidden");
  $("#backBtn").classList.toggle("hidden", !["album", "person"].includes(view));
  if (view === "photo" && parts[1]) {
    // 直接連結某張照片：以時間軸為背景開燈箱
    showTimeline();
    setNav("timeline");
    const p = DB.photoById[parts[1]];
    if (p) {
      // 確保該照片已在 currentList 中
      let idx = currentList.indexOf(p);
      let guard = 300;
      while (idx < 0 && renderQueue.length && guard-- > 0) { renderNextChunk(); idx = currentList.indexOf(p); }
      if (idx >= 0) openLightbox(idx);
    }
    currentView = "timeline";
    return;
  }
  switch (view) {
    case "albums": setNav("albums"); renderAlbums(); break;
    case "album": setNav("albums"); renderAlbumDetail(parts.slice(1).join("/")); break;
    case "people": setNav("people"); renderPeople(); break;
    case "person": setNav("people"); renderPersonDetail(parts[1]); break;
    case "search": setNav("search"); renderSearch(parts.slice(1).join("/")); break;
    default: setNav("timeline"); showTimeline(); break;
  }
  const back = scrollPositions[view + (parts[1] || "")];
  window.scrollTo({ top: view === currentView ? (back || 0) : 0, behavior: "auto" });
  currentView = view;
}
function showTimeline() {
  resetContent();
  $("#zoomBar").classList.remove("hidden");
  $("#scrubber").classList.remove("hidden");
  const secs = timelineSections();
  buildScrubber(secs);
  queueSections(secs);
}

/* ---------- 事件绑定與啟動 ---------- */
function initEvents() {
  window.addEventListener("hashchange", route);
  $("#backBtn").onclick = () => history.back();
  $("#siteTitle").onclick = () => { location.hash = "#/timeline"; };
  document.querySelectorAll("#zoomBar .seg button").forEach((b) => {
    b.onclick = () => {
      document.querySelectorAll("#zoomBar .seg button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      zoomMode = b.dataset.zoom;
      showTimeline();
    };
  });
  // 點縮圖開燈箱（事件委派）
  $("#content").addEventListener("click", (e) => {
    const ph = e.target.closest(".ph");
    if (ph) openLightbox(+ph.dataset.idx);
  });
  // 視窗大小改變 → 重新排版目前檢視
  let rt = null;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => route(), 250);
  });
  initLightboxEvents();
  initScrubberEvents();
}

(async function start() {
  document.title = CFG.title;
  $("#loading").classList.remove("hidden");
  try {
    await loadData();
  } catch (err) {
    $("#content").innerHTML = `<div class="empty"><div class="big">⚠️</div>資料載入失敗：${esc(err.message)}<br>
      <small>請確認是用「啟動照片網站預覽.command」開啟，而不是直接雙擊 index.html</small></div>`;
    $("#loading").classList.add("hidden");
    return;
  }
  initEvents();
  route();
})();
