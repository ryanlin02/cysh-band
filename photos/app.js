/* ============================================================
   嘉義高中管樂隊 影像館 — 主程式
   純前端靜態網站：讀取版本化 public gallery runtime

   時間軸採「預先計算版面＋虛擬化渲染」架構（同 Google Photos）：
   載入時先用數學算出全部照片的位置（不建立畫面元素），
   捲動時只掛載視窗附近的列、離開的列立即卸載。
   因此時間軸可以瞬間跳到任何年份，記憶體用量恆定，不會閃爍跳動。
   ============================================================ */
"use strict";

const CFG = window.SITE_CONFIG;
const $ = (sel) => document.querySelector(sel);

let DB = null;          // { albums, photos }
let PEOPLE = [];        // 公開人物
let currentList = [];   // 目前檢視全部照片的順序（給燈箱前後切換用）
let zoomMode = "album"; // album | month | year
let currentView = "";
let scrollPositions = {}; // 各檢視的捲動位置記憶
let GALLERY_RUNTIME = null;
let RUNTIME_BOOTSTRAP = null;
let RUNTIME_CORE = null;
let SEARCH_META = null;

/* ---------- 工具 ---------- */
function encPath(rel) {
  return rel.split("/").map(encodeURIComponent).join("/");
}
const IMG_EXT = CFG.imageExt || ".jpg";
function thumbUrl(p) {
  if (p.thumb) return CFG.imageBase + "/" + encPath(p.thumb.replace(/^images\//, "").replace(/\.jpg$/i, IMG_EXT));
  const alb = DB.albums[p.a];
  const stem = p.f.replace(/\.[^.]+$/, "");
  return CFG.imageBase + "/thumb/" + encPath(alb.folder + "/" + stem + "-" + p.cid.slice(0, 12) + IMG_EXT);
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
function profileLinkForPerson(person) {
  const links = window.PEOPLE_PROFILE_LINKS || {};
  if (!person) return null;
  if (person.num && links.byNum && links.byNum[person.num]) return links.byNum[person.num];
  if (person.id && links.byId && links.byId[person.id]) return links.byId[person.id];
  return null;
}
function personAvatarUrl(person) {
  const profile = profileLinkForPerson(person);
  if (profile && profile.photo && !/\/blank\.webp$/i.test(profile.photo)) return profile.photo;
  if (person && person.avatar) return CFG.dataBase + "/" + encPath(person.avatar);
  return "";
}

/* ---------- 資料載入 ---------- */
async function loadData() {
  const runtimeBase = new URL(
    String(CFG.runtimeBase || "").replace(/\/?$/, "/"),
    document.baseURI
  );
  const bootstrapResponse = await fetch(new URL("bootstrap.json", runtimeBase));
  if (!bootstrapResponse.ok) {
    throw new Error(`Runtime載入失敗（${bootstrapResponse.status}）`);
  }
  RUNTIME_BOOTSTRAP = await bootstrapResponse.json();
  if (RUNTIME_BOOTSTRAP.audience !== "public") {
    throw new Error("影像館只能載入public runtime");
  }
  const loaderUrl = new URL(
    RUNTIME_BOOTSTRAP.files.runtimeLoader.path,
    runtimeBase
  );
  const { GalleryRuntime } = await import(loaderUrl.href);
  GALLERY_RUNTIME = new GalleryRuntime(runtimeBase.href);
  GALLERY_RUNTIME.bootstrapPromise = Promise.resolve(RUNTIME_BOOTSTRAP);
  RUNTIME_CORE = await GALLERY_RUNTIME.loadCore();

  const albums = RUNTIME_CORE.albums.map((row) => ({
    id: row[0],
    title: row[1],
    folder: row[2],
    count: row[3],
    date: row[4],
    sortDate: row[5],
    precision: row[6],
    confidence: row[7],
    review: Boolean(row[8]),
  }));
  PEOPLE = RUNTIME_CORE.people.map((row) => ({
    id: row[0],
    name: row[1],
    num: row[2],
    entryYearRoc: row[3],
    entryYearAd: row[4],
    aliases: row[5] || [],
    identityStatus: row[6],
    avatar: "",
    count: 0,
  }));
  const photos = RUNTIME_CORE.photos.map((row) => ({
    i: row[0],
    cid: row[1],
    a: row[2],
    f: row[3],
    w: row[4],
    h: row[5],
    p: row[6] || [],
    thumb: row[7]?.[0] || "",
    large: row[7]?.[1] || "",
    _detailState: "idle",
  }));
  for (const photo of photos) {
    for (const personIndex of photo.p) {
      if (PEOPLE[personIndex]) PEOPLE[personIndex].count += 1;
    }
  }
  DB = {
    albums,
    photos,
    aiCount: RUNTIME_BOOTSTRAP.counts.annotatedPhotos || 0,
  };
  DB.albumOrder = DB.albums
    .map((a, i) => i)
    .sort((x, y) => (DB.albums[y].sortDate || "").localeCompare(DB.albums[x].sortDate || ""));
  DB.photosByAlbum = DB.albums.map(() => []);
  DB.photoById = {};
  for (const p of DB.photos) {
    DB.photosByAlbum[p.a].push(p);
    DB.photoById[p.i] = p;
    DB.photoById[p.cid.slice(0, 12)] ||= p;
  }
}

async function ensurePhotoDetails(photo) {
  if (photo._detailState === "ready") return photo;
  if (photo._detailPromise) return photo._detailPromise;
  photo._detailState = "loading";
  photo._detailPromise = GALLERY_RUNTIME.loadDetails(photo.cid)
    .then((content) => {
      const primary = content?.primary || {};
      const supplements = content?.supplements || [];
      photo.c = primary.caption || "";
      photo.k = primary.tags || [];
      photo.s = primary.scene || "";
      photo.c2s = supplements.flatMap((item) => item.safeCaptions || []);
      photo.k2 = supplements.flatMap((item) => item.safeKeywords || []);
      photo.s2 = supplements.flatMap((item) => item.safeContext || []);
      photo._detailState = "ready";
      return photo;
    })
    .catch((error) => {
      photo._detailState = "error";
      photo._detailPromise = null;
      throw error;
    });
  return photo._detailPromise;
}

/* ============================================================
   虛擬化照片牆引擎
   ============================================================ */
const V = {
  rows: [],        // [{t:'h', top, h, html} | {t:'p', top, h, items:[{p, gi, r}], justify}]
  secs: [],        // [{chip, year, top}]
  total: 0,
  mounted: new Map(),
  contentTop: 0,
  buffer: 1500,
  active: false,
  lastSections: null,
};
const HEADER_H = 56;
const ROW_GAP = 4;

function contentInnerWidth() {
  const c = $("#content");
  const cs = getComputedStyle(c);
  return c.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
}
function targetRowHeight() {
  const w = Math.min(window.innerWidth, 1500);
  const base = zoomMode === "year" ? 74 : zoomMode === "month" ? 110 : 170;
  return w < 500 ? base * 0.75 : base;
}
function vClear() {
  V.active = false;
  V.rows = []; V.secs = []; V.total = 0; V.lastSections = null;
  for (const el of V.mounted.values()) el.remove();
  V.mounted.clear();
  $("#content").style.height = "";
  $("#floatDate").classList.add("hidden");
}
function resetContent() {
  vClear();
  SEARCH_META = null;
  const c = $("#content");
  c.innerHTML = "";
  currentList = [];
  $("#loading").classList.add("hidden");
  c.classList.remove("fade-in");
  void c.offsetWidth;
  c.classList.add("fade-in");
}

/* 版面預計算：一次算出所有列的位置（純數學，不建立元素，8 千張照片只需幾毫秒） */
function vBuild(sections) {
  for (const el of V.mounted.values()) el.remove();
  V.mounted.clear();
  V.rows = []; V.secs = [];
  currentList = [];
  V.lastSections = sections;

  const W = contentInnerWidth();
  const H = targetRowHeight();
  let top = 8;

  for (const sec of sections) {
    V.secs.push({ chip: sec.chip || "", year: sec.year || null, top });
    V.rows.push({ t: "h", top, h: HEADER_H, html: sec.headerHtml });
    top += HEADER_H;
    let row = [], ratio = 0;
    const flush = () => {
      if (!row.length) return;
      const filled = ratio * H + row.length * ROW_GAP >= W;
      const h = filled ? (W - row.length * ROW_GAP) / ratio : H;
      V.rows.push({ t: "p", top, h, items: row, justify: filled });
      top += h + ROW_GAP;
      row = []; ratio = 0;
    };
    for (const p of sec.photos) {
      const r = (p.w && p.h) ? Math.min(3, Math.max(0.3, p.w / p.h)) : 1;
      row.push({ p, gi: currentList.length, r });
      currentList.push(p);
      ratio += r;
      if (ratio * H + row.length * ROW_GAP >= W) flush();
    }
    flush();
    top += 10;
  }
  V.total = top;
  const c = $("#content");
  c.style.height = top + "px";
  V.contentTop = c.getBoundingClientRect().top + window.scrollY;
  V.active = true;
  vUpdate();
}

/* 建立單一列的畫面元素 */
function vRowEl(row) {
  const el = document.createElement("div");
  if (row.t === "h") {
    el.className = "vheader";
    el.innerHTML = row.html;
  } else {
    el.className = "vrow";
    el.style.height = row.h.toFixed(2) + "px";
    for (const item of row.items) {
      const ph = document.createElement("div");
      ph.className = "ph";
      ph.dataset.idx = item.gi;
      ph.tabIndex = 0;
      ph.setAttribute("role", "button");
      if (row.justify) ph.style.flex = `${item.r} 1 0%`;
      else { ph.style.width = (row.h * item.r).toFixed(2) + "px"; ph.style.flex = "0 0 auto"; }
      const img = document.createElement("img");
      img.decoding = "async";
      img.src = thumbUrl(item.p);
      const meta = SEARCH_META?.get(item.p);
      const album = DB.albums[item.p.a];
      const reason = meta?.reasons?.[0];
      const accessibleLabel = reason
        ? `${album.title || "未命名相簿"}，命中${reason.label}：${reason.matched}`
        : `${album.title || "未命名相簿"}照片`;
      img.alt = accessibleLabel;
      ph.setAttribute("aria-label", accessibleLabel);
      img.onload = () => img.classList.add("ok");
      ph.appendChild(img);
      if (reason) {
        const badge = document.createElement("span");
        badge.className = "match-reason";
        badge.textContent = reason.label;
        ph.appendChild(badge);
      }
      if (meta?.dateRelation === "mismatched") {
        const warning = document.createElement("span");
        warning.className = "match-date-warning";
        warning.textContent = "年份不一致";
        ph.appendChild(warning);
      }
      el.appendChild(ph);
    }
  }
  el.style.top = row.top.toFixed(2) + "px";
  return el;
}

/* 捲動更新：二分搜尋可見範圍，掛載缺少的列、卸載離開的列 */
function vUpdate() {
  if (!V.active) return;
  const y = window.scrollY - V.contentTop;
  const start = y - V.buffer;
  const end = y + window.innerHeight + V.buffer;
  let lo = 0, hi = V.rows.length - 1, first = V.rows.length;
  while (lo <= hi) {
    const m = (lo + hi) >> 1;
    if (V.rows[m].top + V.rows[m].h > start) { first = m; hi = m - 1; } else lo = m + 1;
  }
  const need = new Set();
  for (let i = first; i < V.rows.length && V.rows[i].top < end; i++) need.add(i);
  for (const [i, el] of V.mounted) {
    if (!need.has(i)) { el.remove(); V.mounted.delete(i); }
  }
  let frag = null;
  for (const i of need) {
    if (!V.mounted.has(i)) {
      const el = vRowEl(V.rows[i]);
      V.mounted.set(i, el);
      (frag = frag || document.createDocumentFragment()).appendChild(el);
    }
  }
  if (frag) $("#content").appendChild(frag);
}

/* 目前（或指定）捲動位置對應的區段 */
function vCurrentSec(scrollPos) {
  const y = (scrollPos !== undefined ? scrollPos : window.scrollY) - V.contentTop + 70;
  let cur = V.secs[0];
  let lo = 0, hi = V.secs.length - 1;
  while (lo <= hi) {
    const m = (lo + hi) >> 1;
    if (V.secs[m].top <= y) { cur = V.secs[m]; lo = m + 1; } else hi = m - 1;
  }
  return cur;
}

/* 視窗大小改變：以目前看到的第一張照片為錨點重建版面 */
function vRelayout() {
  if (!V.active || !V.lastSections) return;
  const y = window.scrollY - V.contentTop;
  let anchorGi = null;
  for (const row of V.rows) {
    if (row.t === "p" && row.top + row.h > y + 60) { anchorGi = row.items[0].gi; break; }
  }
  vBuild(V.lastSections);
  if (anchorGi !== null) {
    for (const row of V.rows) {
      if (row.t === "p" && row.items.some((it) => it.gi === anchorGi)) {
        window.scrollTo({ top: V.contentTop + row.top - 70, behavior: "auto" });
        break;
      }
    }
  }
  buildScrubber();
}

/* ---------- 浮動日期籤（捲動時顯示目前區段） ---------- */
let floatTimer = null;
function showFloatDate() {
  if (!V.active || !V.secs.length) return;
  const sec = vCurrentSec();
  if (!sec || !sec.chip) return;
  const fd = $("#floatDate");
  fd.textContent = sec.chip;
  fd.classList.remove("hidden", "fading");
  clearTimeout(floatTimer);
  floatTimer = setTimeout(() => fd.classList.add("fading"), 900);
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
        year: albumYear(alb),
        chip: albumDateLabel(alb),
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
        cur = { year: key === "unknown" ? null : key.slice(0, 4), chip: labelOf(key), headerHtml: "", photos: [], _label: labelOf(key) };
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
function showTimeline() {
  resetContent();
  $("#zoomBar").classList.remove("hidden");
  $("#scrubber").classList.remove("hidden");
  // 時間軸檢視：隱藏瀏覽器原生捲軸（右側把手取代其功能，避免誤觸；捲動功能不受影響）
  document.documentElement.classList.add("no-scrollbar");
  vBuild(timelineSections());
  buildScrubber();
}

/* ---------- 年份捲動條 ----------
   平時只顯示小把手；拖曳時出現年份氣泡並可即時跳轉，
   切換到不同年份時手機會輕微震動（支援 vibrate 的裝置）。 */
let scrubYears = [];
let scrubActive = false, lastHapticYear = null;
function trackRect() { return $("#scrubberTrack").getBoundingClientRect(); }
function buildScrubber() {
  const track = $("#scrubberTrack");
  track.querySelectorAll(".scrub-year").forEach((n) => n.remove());
  scrubYears = [];
  if (!V.active || !V.secs.length) return;
  const seen = new Set();
  for (const s of V.secs) {
    const y = s.year || "不詳";
    if (seen.has(y)) continue;
    seen.add(y);
    scrubYears.push({ year: y, top: s.top });
  }
  const trackH = track.clientHeight || 400;
  const denom = Math.max(1, V.total - window.innerHeight);
  let lastPx = -100;
  for (const sy of scrubYears) {
    sy.trackY = Math.min(1, sy.top / denom) * (trackH - 40);
    if (sy.trackY - lastPx < 24) continue; // 避免標籤重疊（僅影響顯示，不影響拖曳）
    lastPx = sy.trackY;
    const el = document.createElement("div");
    el.className = "scrub-year";
    el.style.top = (sy.trackY + 20) + "px";
    el.textContent = sy.year;
    track.appendChild(el);
  }
  vSyncHandle();
}
function vSyncHandle() {
  if (!V.active) return;
  const trackH = $("#scrubberTrack").clientHeight || 400;
  const denom = Math.max(1, V.total - window.innerHeight);
  const frac = Math.min(1, Math.max(0, (window.scrollY - V.contentTop) / denom));
  const topPx = frac * (trackH - 40);
  $("#scrubHandle").style.top = topPx + "px";
  $("#floatDate").style.top = (topPx + 20) + "px"; // 日期籤跟著把手走（同 Google Photos）
}
function scrubTo(clientY) {
  const rect = trackRect();
  const usable = Math.max(1, rect.height - 40);
  const frac = Math.min(1, Math.max(0, (clientY - rect.top - 20) / usable));
  const denom = Math.max(0, V.total - window.innerHeight);
  const target = V.contentTop + frac * denom;
  window.scrollTo({ top: target, behavior: "auto" });
  vSyncHandle();
  const sec = vCurrentSec(target);
  const bubble = $("#scrubberBubble");
  if (sec) {
    const label = sec.year || "不詳";
    bubble.textContent = label;
    bubble.style.top = (frac * usable + 20) + "px";
    bubble.classList.remove("hidden");
    if (label !== lastHapticYear) {
      lastHapticYear = label;
      if (navigator.vibrate) navigator.vibrate(8);
    }
  }
}
function initScrubberEvents() {
  const sc = $("#scrubber");
  const move = (e) => {
    if (!scrubActive) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    scrubTo(y);
    e.preventDefault();
  };
  const end = () => {
    if (!scrubActive) return;
    scrubActive = false;
    lastHapticYear = null;
    document.body.classList.remove("scrubbing");
    setTimeout(() => $("#scrubberBubble").classList.add("hidden"), 350);
  };
  const begin = (e) => {
    if (!V.active) return;
    scrubActive = true;
    document.body.classList.add("scrubbing");
    move(e);
  };
  sc.addEventListener("mousedown", begin);
  sc.addEventListener("touchstart", begin, { passive: false });
  window.addEventListener("mousemove", move);
  window.addEventListener("touchmove", move, { passive: false });
  window.addEventListener("mouseup", end);
  window.addEventListener("touchend", end);
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
  vBuild([{ chip: albumDateLabel(alb), year: albumYear(alb),
            headerHtml: `<span class="sec-count">${ph.length} 張照片</span>`, photos: ph }]);
}

/* ---------- 檢視：人物 ---------- */
function renderPeople() {
  resetContent();
  const c = $("#content");
  if (!PEOPLE.length) {
    c.innerHTML = `<div class="empty"><svg class="empty-icon ico-svg" aria-hidden="true"><use href="#i-person"/></svg><h2>目前還沒有可顯示的人物</h2></div>`;
    return;
  }
  const grid = document.createElement("div");
  grid.className = "people-grid";
  for (const p of PEOPLE) {
    if (!p.count) continue;
    const card = document.createElement("div");
    card.className = "person-card";
    const avatar = personAvatarUrl(p);
    card.innerHTML =
      `<div class="face">${avatar ? `<img loading="lazy" src="${esc(avatar)}" alt="">` : ""}</div>` +
      `<div class="p-name">${esc(p.name)}${p.num ? `<span class="p-num">${p.num}</span>` : ""}</div><div class="p-count">${p.count} 張</div>`;
    card.onclick = () => { location.hash = "#/person/" + encodeURIComponent(p.id); };
    grid.appendChild(card);
  }
  c.appendChild(grid);
}
function renderPersonDetail(personId) {
  resetContent();
  const pi = PEOPLE.findIndex((p) => p.id === personId);
  if (pi < 0) { $("#content").innerHTML = `<div class="empty">找不到這位人物</div>`; return; }
  renderPersonDetailByIndex(pi, PEOPLE[pi]);
}
function renderPersonDetailByNum(num) {
  resetContent();
  const pi = PEOPLE.findIndex((p) => p.num === num);
  if (pi < 0) {
    $("#content").innerHTML = `<div class="empty">目前影像館尚未建立編號 ${esc(num)} 的人物照片頁<br><small>影像館人物資料會隨照片整理持續更新。</small></div>`;
    return;
  }
  renderPersonDetailByIndex(pi, PEOPLE[pi]);
}
function renderPersonDetailByIndex(pi, person) {
  const profile = profileLinkForPerson(person);
  const avatar = personAvatarUrl(person);
  $("#subHeader").classList.remove("hidden");
  $("#subHeader").innerHTML =
    `<div class="sub-title">` +
    (avatar ? `<img class="sub-avatar" src="${esc(avatar)}" alt="${esc(person.name)}">` : "") +
    `<span>${esc(person.name)}${person.num ? `<span class="p-num">${person.num}</span>` : ""}</span>` +
    (profile ? `<a class="profile-jump" href="${esc(profile.url)}">閱讀人物介紹</a>` : "") +
    `</div><div class="sub-meta">出現在 ${person.count} 張已確認公開關聯的照片中</div>`;
  const secs = [];
  for (const ai of DB.albumOrder) {
    const ph = DB.photosByAlbum[ai].filter((p) => p.p && p.p.includes(pi));
    if (!ph.length) continue;
    const alb = DB.albums[ai];
    secs.push({
      chip: albumDateLabel(alb), year: albumYear(alb),
      headerHtml: `<span class="sec-date">${esc(albumDateLabel(alb))}</span><span class="sec-title">${esc(alb.title)}</span><span class="sec-count">${ph.length} 張</span>`,
      photos: ph,
    });
  }
  vBuild(secs);
}

/* ---------- 舊搜尋實作（保留作本機回復參考；路由不再呼叫） ---------- */
let searchTimer = null;
/* 搜尋建議索引：從 AI 標籤、活動名稱、人名統計詞頻（只建一次） */
let SUGGEST = null;
let POPULAR_SEARCHES = null;

// 快速搜尋詞的篩選規則。這裡只影響搜尋框下方的詞，不影響使用者輸入後的搜尋結果。
// 人名、活動名稱與過於泛用的詞不適合作為照片內容的快速入口，故不列入。
const POPULAR_SEARCH_EXCLUDE = new Set([
  "嘉義高中", "嘉中", "嘉義", "照片", "照片內容", "活動",
]);

function buildSuggest() {
  if (SUGGEST) return SUGGEST;
  const freq = new Map();
  const add = (t, w) => {
    t = (t || "").trim();
    if (t.length < 2 || t.length > 12) return;
    freq.set(t, (freq.get(t) || 0) + (w || 1));
  };
  for (const p of DB.photos) for (const t of (p.k || [])) add(t, 1);
  for (const a of DB.albums) add(a.title, 5);
  for (const p of PEOPLE) add(p.name, 10);
  SUGGEST = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  return SUGGEST;
}

/*
 * 快速搜尋：只以實際照片的 AI 關鍵字計算「有幾張照片含這個詞」。
 * 不沿用 buildSuggest 的活動名稱／人名加權，避免熱門詞被非照片內容左右。
 */
function buildPopularSearches() {
  if (POPULAR_SEARCHES) return POPULAR_SEARCHES;
  const peopleNames = new Set(PEOPLE.map((p) => p.name.trim()));
  const freq = new Map();
  for (const photo of DB.photos) {
    // 網站索引已經在每張照片內去除重複詞；再次用 Set 保護舊索引資料。
    for (const term of new Set(photo.k || [])) {
      const t = term.trim();
      if (t.length < 2 || t.length > 6 || peopleNames.has(t) || POPULAR_SEARCH_EXCLUDE.has(t)) continue;
      freq.set(t, (freq.get(t) || 0) + 1);
    }
  }
  POPULAR_SEARCHES = [...freq.entries()].sort((a, b) =>
    b[1] - a[1] || a[0].localeCompare(b[0], "zh-Hant")
  );
  return POPULAR_SEARCHES;
}

/* 即時搜尋建議：打字時列出最相關的詞（資料都在本機，零延遲） */
function updateSuggest(q) {
  const box = $("#suggestBox");
  if (!box) return;
  q = (q || "").trim().toLowerCase();
  if (!q) { box.classList.add("hidden"); return; }
  const hits = buildSuggest()
    .filter(([t]) => t.toLowerCase().includes(q) && t.toLowerCase() !== q)
    .slice(0, 8);
  if (!hits.length) { box.classList.add("hidden"); return; }
  box.innerHTML = hits.map(([t, c]) =>
    `<div class="sug" data-t="${esc(t)}"><svg class="ico-svg" style="width:15px;height:15px;opacity:.5"><use href="#i-search"/></svg>${esc(t)}<span class="sug-n">${c}</span></div>`
  ).join("");
  box.classList.remove("hidden");
}
function renderSearch(initialQ) {
  resetContent();
  $("#subHeader").classList.remove("hidden");
  const annotated = DB.aiCount, total = DB.photos.length;
  $("#subHeader").innerHTML =
    `<div class="search-wrap"><div class="search-box"><svg class="ico-svg" style="color:var(--ink-dim)"><use href="#i-search"/></svg> <input id="searchInput" type="search" ` +
    `placeholder="搜尋活動、人物、照片內容…" value="${esc(initialQ || "")}" enterkeyhint="search"></div>` +
    `<div id="suggestBox" class="hidden"></div>` +
    `<div class="search-hint">可搜尋：活動名稱、人名、AI 照片內容標註（目前已完成 ${annotated.toLocaleString()} / ${total.toLocaleString()} 張，持續增加中）</div>` +
    `<div class="chips" id="searchChips"></div></div>`;
  // 快速搜尋：依實際含有該 AI 關鍵字的照片數自動產生。
  // CSS 會在手機顯示前 20 個、較寬版面顯示前 50 個。
  const chips = buildPopularSearches()
    .slice(0, 50)
    .map(([t]) => t);
  const chipBox = $("#searchChips");
  for (const kw of chips) {
    const b = document.createElement("button");
    b.className = "chip"; b.textContent = kw;
    b.onclick = () => { $("#searchInput").value = kw; doSearch(kw); };
    chipBox.appendChild(b);
  }
  const input = $("#searchInput");
  // 中文輸入法（IME）保護：選字過程中的 Enter 與 input 事件不觸發搜尋
  let composing = false;
  input.addEventListener("compositionstart", () => { composing = true; });
  input.addEventListener("compositionend", () => {
    composing = false;
    updateSuggest(input.value);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => doSearch(input.value), 300);
  });
  input.addEventListener("input", () => {
    if (composing) return;
    updateSuggest(input.value);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => doSearch(input.value), 300);
  });
  input.addEventListener("keydown", (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") { clearTimeout(searchTimer); $("#suggestBox").classList.add("hidden"); doSearch(input.value); input.blur(); }
    if (e.key === "Escape") $("#suggestBox").classList.add("hidden");
  });
  // 點選建議詞直接搜尋
  $("#suggestBox").addEventListener("mousedown", (e) => {
    const sug = e.target.closest(".sug");
    if (!sug) return;
    input.value = sug.dataset.t;
    $("#suggestBox").classList.add("hidden");
    doSearch(sug.dataset.t);
  });
  input.addEventListener("blur", () => setTimeout(() => $("#suggestBox") && $("#suggestBox").classList.add("hidden"), 200));
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
    p._txt = (
      primaryPhotoText(p) + " " + supplementalPhotoText(p)
    ).trim();
  }
  return p._txt;
}
function primaryPhotoText(p) {
  if (p._txtPrimary === undefined) {
    p._txtPrimary = (
      (p.c || "") + " " + (p.k || []).join(" ") + " " + (p.s || "")
    ).toLowerCase();
  }
  return p._txtPrimary;
}
function supplementalPhotoText(p) {
  if (p._txtSupplemental === undefined) {
    p._txtSupplemental = (
      (p.c2s || []).join(" ") + " " +
      (p.k2 || []).join(" ") + " " +
      (p.s2 || []).join(" ")
    ).toLowerCase();
  }
  return p._txtSupplemental;
}
function albumText(ai) {
  const a = DB.albums[ai];
  if (a._txt === undefined) a._txt = (a.title + " " + a.id).toLowerCase();
  return a._txt;
}
function runQuery(termGroups) {
  const matchedPeople = new Set();
  PEOPLE.forEach((p, i) => {
    const n = p.name.toLowerCase();
    if (termGroups.some((g) => g.some((t) => n.includes(t)))) matchedPeople.add(i);
  });
  const groupHit = (txt, g) => g.some((t) => txt.includes(t));
  const scored = [];
  for (const p of DB.photos) {
    let score = 0;
    let matched = true;
    for (const g of termGroups) {
      if (groupHit(albumText(p.a), g)) {
        score += 4;
      } else if (
        p.p && p.p.some((pi) =>
          matchedPeople.has(pi) && groupHit(PEOPLE[pi].name.toLowerCase(), g)
        )
      ) {
        score += 4;
      } else if (groupHit(primaryPhotoText(p), g)) {
        score += 2;
      } else if (groupHit(supplementalPhotoText(p), g)) {
        // 階段2.5補充標註可增加召回，但排序低於既有標註與明確資料。
        score += 1;
      } else {
        matched = false;
        break;
      }
    }
    if (matched) scored.push([score, p]);
  }
  return scored
    .sort((a, b) => b[0] - a[0])
    .map(([, p]) => p);
}
function doSearch(q) {
  q = (q || "").trim();
  vClear();
  $("#content").innerHTML = "";
  currentList = [];
  if (!q) return;
  history.replaceState(null, "", "#/search/" + encodeURIComponent(q));
  const rawTerms = [...new Set(q.toLowerCase().split(/\s+/).filter(Boolean))];
  let results = runQuery(rawTerms.map(expandTerm));
  let fuzzyNote = "";
  // 找不到時的遞補策略：把查詢拆成兩字一組的相近字詞再搜一次
  if (!results.length) {
    const joined = rawTerms.join("");
    const bigrams = new Set();
    for (let i = 0; i + 1 < joined.length; i++) bigrams.add(joined.slice(i, i + 2));
    if (bigrams.size) {
      const groups = [...bigrams].map(expandTerm);
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
        fuzzyNote = `找不到完全符合「${esc(q)}」的結果，以下為相近字詞的結果，`;
      }
    }
  }
  if (!results.length) {
    $("#content").innerHTML = `<div class="empty"><div class="big">🔍</div>找不到「${esc(q)}」相關的照片<br>
      <small>提示：AI 內容標註還在進行中（${DB.aiCount.toLocaleString()}/${DB.photos.length.toLocaleString()} 張），之後會找到更多結果</small></div>`;
    return;
  }
  const byAlbum = new Map();
  for (const p of results) {
    if (!byAlbum.has(p.a)) byAlbum.set(p.a, []);
    byAlbum.get(p.a).push(p);
  }
  const secs = [{
    chip: "", year: null,
    headerHtml: `<span class="sec-count">${fuzzyNote}共找到 ${results.length.toLocaleString()} 張照片</span>`,
    photos: [],
  }];
  const order = [...byAlbum.keys()].sort((x, y) => (DB.albums[y].sortDate || "").localeCompare(DB.albums[x].sortDate || ""));
  for (const ai of order) {
    const alb = DB.albums[ai];
    secs.push({
      chip: albumDateLabel(alb), year: albumYear(alb),
      headerHtml: `<span class="sec-date">${esc(albumDateLabel(alb))}</span><span class="sec-title">${esc(alb.title)}</span><span class="sec-count">${byAlbum.get(ai).length} 張</span>`,
      photos: byAlbum.get(ai),
    });
  }
  vBuild(secs);
}

/* ---------- 階段7C：正式runtime搜尋介面 ---------- */
let formalSearchRuntimePromise = null;
let formalSearchWorker = null;
let formalPopular = [];
let formalRequestId = 0;
let formalSearchToken = 0;
let formalSuggestToken = 0;
let formalLastQuery = "";
let formalFilters = {};
const formalPending = new Map();

function formalWorkerRequest(type, payload = {}) {
  return new Promise((resolve, reject) => {
    const requestId = `search-${++formalRequestId}`;
    formalPending.set(requestId, { resolve, reject });
    formalSearchWorker.postMessage({ type, requestId, ...payload });
  });
}

function formalStartSearchRuntime() {
  if (!formalSearchRuntimePromise) {
    formalSearchRuntimePromise = Promise.all([
      GALLERY_RUNTIME.startSearchWorker(),
      GALLERY_RUNTIME.loadPopular(),
    ]).then(([worker, popularPayload]) => {
      formalSearchWorker = worker;
      formalPopular = popularPayload.popular || [];
      worker.addEventListener("message", (event) => {
        const requestId = event.data?.requestId;
        if (!requestId || !formalPending.has(requestId)) return;
        const pending = formalPending.get(requestId);
        formalPending.delete(requestId);
        if (event.data.type === "error") {
          pending.reject(new Error(event.data.message));
        } else {
          pending.resolve(event.data);
        }
      });
      return { worker, popular: formalPopular };
    }).catch((error) => {
      formalSearchRuntimePromise = null;
      formalSearchWorker = null;
      throw error;
    });
  }
  return formalSearchRuntimePromise;
}

function formalSetStatus(kind, message) {
  const state = $("#searchState");
  if (!state) return;
  state.className = `search-state ${kind || "idle"}`;
  state.innerHTML = message || "";
  state.classList.toggle("hidden", !message);
}

function formalRenderPopular() {
  const box = $("#searchChips");
  if (!box) return;
  box.innerHTML = "";
  for (const [term, count] of formalPopular.slice(0, 50)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip";
    button.textContent = term;
    button.title = `${count.toLocaleString()} 張照片`;
    button.onclick = () => {
      const input = $("#searchInput");
      input.value = term;
      formalDoSearch(term);
    };
    box.appendChild(button);
  }
  $("#popularSearches")?.classList.toggle("hidden", !formalPopular.length);
}

async function formalUpdateSuggest(rawQuery) {
  const box = $("#suggestBox");
  if (!box) return;
  const query = rawQuery.trim();
  const token = ++formalSuggestToken;
  if (!query) {
    box.classList.add("hidden");
    box.innerHTML = "";
    return;
  }
  try {
    await formalStartSearchRuntime();
    const response = await formalWorkerRequest("suggest", { query });
    if (token !== formalSuggestToken || !$("#suggestBox")) return;
    const suggestions = response.results || [];
    if (!suggestions.length) {
      box.classList.add("hidden");
      box.innerHTML = "";
      return;
    }
    box.innerHTML = suggestions.map(([term, count]) =>
      `<button type="button" class="sug" role="option" data-t="${esc(term)}">` +
      `<svg class="ico-svg" aria-hidden="true"><use href="#i-search"/></svg>` +
      `<span>${esc(term)}</span><span class="sug-n">${count.toLocaleString()} 張</span></button>`
    ).join("");
    box.classList.remove("hidden");
  } catch (_error) {
    box.classList.add("hidden");
  }
}

function formalFilterActive() {
  return Object.values(formalFilters).some((value) =>
    value !== "" && value !== false && value !== null && value !== undefined
  );
}

function formalFacetLabel(type, value) {
  if (type === "albumIndex") {
    const album = DB.albums[Number(value)];
    return album
      ? `${album.title || "未命名相簿"} · ${albumDateLabel(album)}`
      : "未命名相簿";
  }
  if (type === "personIndex") {
    const person = PEOPLE[Number(value)];
    return person ? `${person.name}${person.num ? ` ${person.num}` : ""}` : String(value);
  }
  return String(value);
}

function formalCreateSelect(container, label, filterKey, rows) {
  if (!rows?.length) return;
  const wrap = document.createElement("label");
  wrap.className = "filter-field";
  const text = document.createElement("span");
  text.textContent = label;
  const select = document.createElement("select");
  select.dataset.filter = filterKey;
  select.setAttribute("aria-label", label);
  const all = document.createElement("option");
  all.value = "";
  all.textContent = `全部${label}`;
  select.appendChild(all);
  for (const [value, count] of rows) {
    const option = document.createElement("option");
    option.value = String(value);
    option.textContent = `${formalFacetLabel(filterKey, value)}（${count.toLocaleString()}）`;
    option.selected = String(formalFilters[filterKey] ?? "") === String(value);
    select.appendChild(option);
  }
  wrap.append(text, select);
  container.appendChild(wrap);
}

function formalRenderFilters(facets) {
  const fieldset = $("#searchFilters");
  const fields = $("#filterFields");
  if (!fieldset || !fields) return;
  fields.innerHTML = "";
  formalCreateSelect(fields, "年份", "year", facets.years);
  formalCreateSelect(fields, "相簿", "albumIndex", facets.albums);
  formalCreateSelect(fields, "人物", "personIndex", facets.people);
  formalCreateSelect(fields, "場景", "scene", facets.scenes);
  formalCreateSelect(fields, "活動", "activity", facets.activities);
  formalCreateSelect(fields, "樂器", "instrument", facets.instruments);
  if (facets.ocr > 0) {
    const wrap = document.createElement("label");
    wrap.className = "filter-check";
    wrap.innerHTML =
      `<input type="checkbox" data-filter="hasOcr"${formalFilters.hasOcr ? " checked" : ""}>` +
      `<span>含可搜尋文字（${facets.ocr.toLocaleString()}）</span>`;
    fields.appendChild(wrap);
  }
  const hasFields = fields.children.length > 0;
  fieldset.classList.toggle("hidden", !hasFields);
  if (hasFields) {
    fieldset.open = formalFilterActive()
      || window.matchMedia("(min-width: 768px)").matches;
    const activeCount = Object.values(formalFilters).filter(
      (value) => value !== "" && value !== false && value !== null && value !== undefined
    ).length;
    const count = $("#activeFilterCount");
    if (count) {
      count.textContent = activeCount ? `已套用 ${activeCount} 項` : "選用";
      count.classList.toggle("active", activeCount > 0);
    }
  }
  $("#clearFilters").classList.toggle("hidden", !formalFilterActive());
  fields.querySelectorAll("[data-filter]").forEach((control) => {
    control.addEventListener("change", () => {
      const key = control.dataset.filter;
      formalFilters[key] = control.type === "checkbox"
        ? control.checked
        : control.value;
      formalDoSearch($("#searchInput").value, { fromFilter: true });
    });
  });
}

function formalEmptyMarkup(query, filtered) {
  const popular = formalPopular.slice(0, 4).map(([term]) =>
    `<button type="button" class="chip empty-suggestion" data-query="${esc(term)}">${esc(term)}</button>`
  ).join("");
  return `<div class="empty search-empty">` +
    `<svg class="empty-icon ico-svg" aria-hidden="true"><use href="#i-search"/></svg>` +
    `<h2>${filtered ? "目前篩選條件沒有結果" : `找不到「${esc(query)}」相關照片`}</h2>` +
    `<p>${filtered ? "可以先清除一項篩選條件，再逐步縮小範圍。" : "請嘗試較短的關鍵字、人物編號，或使用下方建議。"}</p>` +
    (filtered
      ? `<button type="button" class="secondary-btn" id="emptyClearFilters">清除所有篩選</button>`
      : `<div class="chips empty-chips">${popular}</div>`) +
    `</div>`;
}

function formalRenderResults(query, response) {
  const content = $("#content");
  const filtered = response.unfilteredTotal > 0 && response.total === 0;
  formalRenderFilters(response.facets);
  if (!response.total) {
    SEARCH_META = null;
    currentList = [];
    content.innerHTML = formalEmptyMarkup(query, filtered);
    $("#emptyClearFilters")?.addEventListener("click", () => {
      formalFilters = {};
      formalDoSearch(query, { fromFilter: true });
    });
    content.querySelectorAll(".empty-suggestion").forEach((button) => {
      button.addEventListener("click", () => {
        $("#searchInput").value = button.dataset.query;
        formalDoSearch(button.dataset.query);
      });
    });
    formalSetStatus("", "");
    return;
  }

  const photos = [];
  SEARCH_META = new Map();
  for (const result of response.results) {
    const photo = DB.photos[result.photoIndex];
    if (!photo) continue;
    photos.push(photo);
    SEARCH_META.set(photo, result);
  }
  const mismatchCount = response.results.filter(
    (result) => result.dateRelation === "mismatched"
  ).length;
  const summary = [
    response.mode === "fuzzy"
      ? `<span class="search-mode fuzzy">近似結果</span>`
      : `<span class="search-mode exact">精確結果</span>`,
    `<strong>${response.total.toLocaleString()}</strong> 張照片`,
    response.total !== response.unfilteredTotal
      ? `（篩選前 ${response.unfilteredTotal.toLocaleString()} 張）`
      : "",
    mismatchCount
      ? `<span class="date-caution">${mismatchCount.toLocaleString()} 張年份不一致但仍保留</span>`
      : "",
  ].filter(Boolean).join(" ");
  vBuild([{
    chip: "",
    year: null,
    headerHtml: `<span class="search-result-summary">${summary}</span>`,
    photos,
  }]);
  formalSetStatus("", "");
}

async function formalDoSearch(rawQuery, { fromFilter = false } = {}) {
  const query = String(rawQuery || "").trim();
  const content = $("#content");
  vClear();
  content.innerHTML = "";
  currentList = [];
  SEARCH_META = null;
  $("#suggestBox")?.classList.add("hidden");
  if (!query) {
    formalLastQuery = "";
    formalFilters = {};
    $("#searchFilters")?.classList.add("hidden");
    formalSetStatus("", "");
    history.replaceState(null, "", "#/search");
    return;
  }
  if (!fromFilter && query !== formalLastQuery) formalFilters = {};
  formalLastQuery = query;
  history.replaceState(null, "", "#/search/" + encodeURIComponent(query));
  const token = ++formalSearchToken;
  let loadingShown = false;
  const loadingTimer = setTimeout(() => {
    loadingShown = true;
    formalSetStatus(
      "loading",
      `<span class="mini-spin" aria-hidden="true"></span><span>正在準備搜尋資料與排序結果…</span>`
    );
  }, 300);
  try {
    await formalStartSearchRuntime();
    formalRenderPopular();
    const response = await formalWorkerRequest("query", {
      query,
      filters: formalFilters,
    });
    if (token !== formalSearchToken || !$("#searchInput")) return;
    clearTimeout(loadingTimer);
    formalRenderResults(query, response);
  } catch (error) {
    clearTimeout(loadingTimer);
    if (token !== formalSearchToken) return;
    formalSetStatus(
      "error",
      `<svg class="ico-svg" aria-hidden="true"><use href="#i-info"/></svg>` +
      `<span>搜尋資料載入失敗。請檢查網路後再試一次。</span>` +
      `<button type="button" class="secondary-btn" id="retrySearch">重試</button>`
    );
    $("#retrySearch")?.addEventListener("click", () => formalDoSearch(query, { fromFilter: true }));
    if (!loadingShown) content.innerHTML = "";
  }
}

function renderFormalSearch(initialQ) {
  resetContent();
  $("#subHeader").classList.remove("hidden");
  $("#subHeader").innerHTML =
    `<div class="search-wrap">` +
    `<form id="searchForm" role="search">` +
    `<label class="search-label" for="searchInput">搜尋影像館</label>` +
    `<div class="search-box"><svg class="ico-svg" aria-hidden="true"><use href="#i-search"/></svg>` +
    `<input id="searchInput" type="search" autocomplete="off" inputmode="search" enterkeyhint="search" ` +
    `aria-autocomplete="list" aria-controls="suggestBox" placeholder="活動、人物、編號、樂器或照片內容" value="${esc(initialQ || "")}">` +
    `<button type="button" id="clearSearch" class="search-clear icon-btn" aria-label="清除搜尋">` +
    `<svg class="ico-svg"><use href="#i-close"/></svg></button></div>` +
    `<div id="suggestBox" class="hidden" role="listbox" aria-label="搜尋建議"></div>` +
    `</form>` +
    `<div id="searchState" class="search-state hidden" aria-live="polite"></div>` +
    `<p class="search-hint">可輸入多個條件，例如「團練 長笛」。人物搭配年份時，年份只協助排序，不會直接排除可能歸檔錯誤的照片。</p>` +
    `<details id="searchFilters" class="search-filters hidden"><summary>縮小搜尋範圍 <span id="activeFilterCount">選用</span></summary>` +
    `<div id="filterFields" class="filter-fields"></div>` +
    `<button type="button" id="clearFilters" class="text-btn hidden">清除所有篩選</button></details>` +
    `<section id="popularSearches" class="popular-searches hidden" aria-labelledby="popularTitle">` +
    `<h2 id="popularTitle">熱門搜尋</h2><div class="chips" id="searchChips"></div></section>` +
    `</div>`;

  const input = $("#searchInput");
  const form = $("#searchForm");
  let composing = false;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (composing) return;
    clearTimeout(searchTimer);
    formalDoSearch(input.value);
    input.blur();
  });
  input.addEventListener("compositionstart", () => { composing = true; });
  input.addEventListener("compositionend", () => {
    composing = false;
    formalUpdateSuggest(input.value);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => formalDoSearch(input.value), 300);
  });
  input.addEventListener("input", () => {
    if (composing) return;
    formalUpdateSuggest(input.value);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => formalDoSearch(input.value), 300);
  });
  input.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) return;
    const options = [...document.querySelectorAll("#suggestBox .sug")];
    if (event.key === "ArrowDown" && options.length) {
      event.preventDefault();
      options[0].focus();
    } else if (event.key === "Escape") {
      $("#suggestBox").classList.add("hidden");
    }
  });
  $("#suggestBox").addEventListener("click", (event) => {
    const option = event.target.closest(".sug");
    if (!option) return;
    input.value = option.dataset.t;
    $("#suggestBox").classList.add("hidden");
    formalDoSearch(option.dataset.t);
  });
  $("#suggestBox").addEventListener("keydown", (event) => {
    const options = [...document.querySelectorAll("#suggestBox .sug")];
    const index = options.indexOf(document.activeElement);
    if ((event.key === "Enter" || event.key === " ") && index >= 0) {
      event.preventDefault();
      const option = options[index];
      input.value = option.dataset.t;
      $("#suggestBox").classList.add("hidden");
      formalDoSearch(option.dataset.t);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      options[(index + 1) % options.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (index <= 0) input.focus();
      else options[index - 1].focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      $("#suggestBox").classList.add("hidden");
      input.focus();
    }
  });
  $("#clearSearch").addEventListener("click", () => {
    input.value = "";
    formalDoSearch("");
    input.focus();
  });
  $("#clearFilters").addEventListener("click", () => {
    formalFilters = {};
    formalDoSearch(input.value, { fromFilter: true });
  });
  input.addEventListener("blur", () =>
    setTimeout(() => $("#suggestBox")?.classList.add("hidden"), 180)
  );

  if (!initialQ) input.focus();
  const initialLoadingTimer = setTimeout(() => {
    formalSetStatus(
      "loading",
      `<span class="mini-spin" aria-hidden="true"></span><span>正在載入熱門搜尋…</span>`
    );
  }, 300);
  formalStartSearchRuntime().then(() => {
    if (!$("#searchInput")) return;
    clearTimeout(initialLoadingTimer);
    formalRenderPopular();
    formalSetStatus("", "");
    if (initialQ) formalDoSearch(initialQ);
  }).catch(() => {
    if (!$("#searchInput")) return;
    clearTimeout(initialLoadingTimer);
    formalSetStatus(
      "error",
      `<svg class="ico-svg" aria-hidden="true"><use href="#i-info"/></svg>` +
      `<span>搜尋資料載入失敗。</span>` +
      `<button type="button" class="secondary-btn" id="retrySearch">重試</button>`
    );
    $("#retrySearch")?.addEventListener("click", () => {
      formalSearchRuntimePromise = null;
      renderFormalSearch(initialQ);
    });
  });
}

/* ---------- 燈箱 ---------- */
let lbIndex = -1;
let lbScale = 1, lbTx = 0, lbTy = 0;
let lbFront = null;
let lbLoadToken = 0;
function activeImg() { return lbFront || $("#lbImg"); }
function openLightbox(idx) {
  if (idx < 0 || idx >= currentList.length) return;
  lbIndex = idx;
  const p = currentList[idx];
  resetZoom();
  // 交叉淡化：背景圖層載入解碼完成後才淡入蓋過舊照片（全程無黑畫面）
  const token = ++lbLoadToken;
  const front = activeImg();
  const back = front === $("#lbImg") ? $("#lbImg2") : $("#lbImg");
  const url = largeUrl(p);
  const pre = new Image();
  pre.src = url;
  const show = () => {
    if (token !== lbLoadToken) return;
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
  void updatePanel(p);
  for (const off of [1, -1]) {
    const q = currentList[idx + off];
    if (q) { const im = new Image(); im.src = largeUrl(q); }
  }
}
function closeLightbox() {
  stopSlideshow();
  lbLoadToken++;
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
  activeImg().classList.add("kb");
  slideTimer = setInterval(() => {
    if (lbIndex < currentList.length - 1) openLightbox(lbIndex + 1);
    else stopSlideshow();
  }, 3500);
}
async function updatePanel(p) {
  const panel = $("#lbPanel");
  if (p._detailState !== "ready") {
    panel.innerHTML =
      `<button class="panel-close" aria-label="關閉資訊欄" onclick="document.getElementById('lbPanel').classList.add('hidden')"><svg class="ico-svg"><use href="#i-close"/></svg></button>` +
      `<div class="panel-loading"><span class="mini-spin" aria-hidden="true"></span>正在載入照片資訊…</div>`;
    try {
      await ensurePhotoDetails(p);
    } catch (_error) {
      if (currentList[lbIndex] !== p) return;
      panel.innerHTML =
        `<button class="panel-close" aria-label="關閉資訊欄" onclick="document.getElementById('lbPanel').classList.add('hidden')"><svg class="ico-svg"><use href="#i-close"/></svg></button>` +
        `<div class="panel-error" role="alert">照片資訊載入失敗。<button type="button" class="panel-retry">重試</button></div>`;
      panel.querySelector(".panel-retry")?.addEventListener("click", () => updatePanel(p));
      return;
    }
    if (currentList[lbIndex] !== p) return;
  }
  const alb = DB.albums[p.a];
  let html = `<button class="panel-close" aria-label="關閉資訊欄" onclick="document.getElementById('lbPanel').classList.add('hidden')"><svg class="ico-svg"><use href="#i-close"/></svg></button>`;
  if (p.c) html += `<div class="cap">${esc(p.c)}</div>`;
  html += `<h3>日期／活動</h3><div>${esc(albumDateLabel(alb))} · <a class="alb-link" href="#/album/${encodeURIComponent(alb.id)}" onclick="document.getElementById('lbClose').click()">${esc(alb.title)}</a></div>`;
  if (p.p && p.p.length) {
    html += `<h3>已確認人物</h3><div>` +
      p.p.map((pi) => {
        const person = PEOPLE[pi];
        const avatar = personAvatarUrl(person);
        const face = avatar ? `<img class="pp-face" src="${esc(avatar)}" alt="">` : "";
        const numTag = person.num ? `<span class="pp-num">${person.num}</span>` : "";
        return `<span class="pp-chip" onclick="location.hash='#/person/${person.id}';document.getElementById('lbClose').click()">${face}${esc(person.name)}${numTag}</span>`;
      }).join("") + `</div>`;
  }
  if (p.k && p.k.length) {
    html += `<h3>標籤</h3><div>` +
      p.k.slice(0, 12).map((t) => `<span class="tag-chip" onclick="location.hash='#/search/${encodeURIComponent(t)}';document.getElementById('lbClose').click()">${esc(t)}</span>`).join("") + `</div>`;
  }
  html += `<h3>檔案</h3><div style="color:#9ca3af;font-size:12px">${esc(alb.folder)}/${esc(p.f)}</div>`;
  panel.innerHTML = html;
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
  img.classList.remove("kb");
  img.style.transformOrigin = "0 0";
  img.style.transform = `translate(${lbTx}px, ${lbTy}px) scale(${lbScale})`;
}
function initLightboxEvents() {
  $("#lbClose").onclick = closeLightbox;
  $("#lbPrev").onclick = () => { stopSlideshow(); lbStep(-1); };
  $("#lbNext").onclick = () => { stopSlideshow(); lbStep(1); };
  $("#lbInfo").onclick = () => $("#lbPanel").classList.toggle("hidden");
  $("#lbPlay").onclick = toggleSlideshow;
  // 下載：一律提供 JPG。網站圖檔是 WebP 時，於瀏覽器內即時轉成 JPG 再下載
  $("#lbDownload").addEventListener("click", async (e) => {
    e.preventDefault();
    const p = currentList[lbIndex];
    if (!p) return;
    const url = largeUrl(p);
    const name = p.f.replace(/\.[^.]+$/, "") + ".jpg";
    try {
      const blob = await (await fetch(url)).blob();
      let out = blob;
      if (!/jpe?g/i.test(blob.type)) {
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
      window.open(url, "_blank");
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
      const panel = $("#lbPanel");
      if (!panel.classList.contains("hidden")) panel.classList.add("hidden");
      else closeLightbox();
    }
    if (e.key === "ArrowLeft") { stopSlideshow(); lbStep(-1); }
    if (e.key === "ArrowRight") { stopSlideshow(); lbStep(1); }
    if (e.key === " ") { e.preventDefault(); toggleSlideshow(); }
  });
  // 觸控：滑動換頁、雙指縮放、雙擊放大、上滑資訊、下滑收合/關閉
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
      if (now - lastTap < 300) {
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
        else if (dy < -70 && Math.abs(dy) > Math.abs(dx) * 1.5) $("#lbPanel").classList.remove("hidden");
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) {
          if (!$("#lbPanel").classList.contains("hidden")) $("#lbPanel").classList.add("hidden");
          else closeLightbox();
        }
      }
      panning = false;
    }
  });
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
  if (currentView) scrollPositions[currentView] = window.scrollY;
  $("#subHeader").classList.add("hidden");
  $("#zoomBar").classList.add("hidden");
  $("#scrubber").classList.add("hidden");
  document.documentElement.classList.remove("no-scrollbar");
  $("#backBtn").classList.toggle("hidden", !["album", "person", "person-num"].includes(view));
  if (view === "photo" && parts[1]) {
    // 直接連結某張照片：版面預先含全部照片，直接找得到位置
    showTimeline();
    setNav("timeline");
    const p = DB.photoById[parts[1]];
    if (p) {
      const idx = currentList.indexOf(p);
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
    case "person-num": setNav("people"); renderPersonDetailByNum(parts[1]); break;
    case "search": setNav("search"); renderFormalSearch(parts.slice(1).join("/")); break;
    default: setNav("timeline"); showTimeline(); break;
  }
  const back = scrollPositions[view + (parts[1] || "")];
  window.scrollTo({ top: view === currentView ? (back || 0) : 0, behavior: "auto" });
  currentView = view;
  vUpdate();
}

/* ---------- 事件綁定與啟動 ---------- */
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
      window.scrollTo({ top: 0, behavior: "auto" });
    };
  });
  // 點縮圖開燈箱（事件委派）
  $("#content").addEventListener("click", (e) => {
    const ph = e.target.closest(".ph");
    if (ph) openLightbox(+ph.dataset.idx);
  });
  $("#content").addEventListener("keydown", (e) => {
    const ph = e.target.closest(".ph");
    if (!ph || !["Enter", " "].includes(e.key)) return;
    e.preventDefault();
    openLightbox(+ph.dataset.idx);
  });
  // 捲動：更新虛擬列 + 浮動日期 + 把手位置（rAF 節流）
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      vUpdate();
      if (!scrubActive && V.active) { showFloatDate(); vSyncHandle(); }
    });
  }, { passive: true });
  // 視窗大小改變：以錨點照片重建版面
  let rt = null;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => { if (V.active) vRelayout(); }, 250);
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
    $("#content").innerHTML =
      `<div class="empty" role="alert"><svg class="empty-icon ico-svg" aria-hidden="true"><use href="#i-info"/></svg>` +
      `<h2>影像館資料載入失敗</h2><p>${esc(err.message)}</p>` +
      `<button type="button" class="secondary-btn" onclick="location.reload()">重新載入</button></div>`;
    $("#loading").classList.add("hidden");
    return;
  }
  $("#loading").classList.add("hidden");
  initEvents();
  route();
})();
