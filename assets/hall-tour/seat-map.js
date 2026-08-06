// 嘉義市政府文化局音樂廳 — 互動座位表元件
//
// 這是元件不是頁面：可以單獨顯示（場地資訊頁），也可以在 360 導覽裡
// 接上 onSeatClick 跳到最接近該座位的全景節點。兩種用法共用同一份程式碼。
//
//   import { HALL_SEATS } from './hall-seats.js';
//   import { createSeatMap } from './seat-map.js';
//
//   const map = createSeatMap(el, {
//     data: HALL_SEATS,                  // 資料由呼叫端傳入，元件不綁定檔案位置
//     floors: ['1F', '2F'],              // 要顯示哪幾層，預設兩層都顯示
//     onSeatClick: seat => { ... },      // seat = { id, floor, row, num, type, label }
//     onSeatHover: seat => { ... },      // 可省略
//   });
//   map.select('1F-5-12');   // 標記選取
//   map.highlight([...]);    // 標記一組座位（例如某個全景節點涵蓋的範圍）
//   map.clear();
//   map.destroy();

const NS = 'http://www.w3.org/2000/svg';

// 配色沿用 cysh.band 的暖色調；輪椅相關依慣例用藍色，選取用座椅本身的紅
const COLORS = {
  normal:     '#cfc5b6',
  wheelchair: '#2f6f8c',
  companion:  '#8fb3c6',
  removable:  '#c9993f',
  staff:      '#e6e0d5',
  selected:   '#8c2f28',
  highlight:  '#d98c3f',
};

const CW = 12;      // 每欄寬度（含間距）
const RH = 12.5;    // 每排高度
const SW = 10.4;    // 座位方塊邊長
const PAD_L = 34;   // 左側排號欄寬
const PAD_T = 30;   // 舞台列高度
const MARKER_R = 11;  // 拍攝點圓點半徑（座位方塊才 10.4，圓點要明顯大於它才好點）
// 實際座位是以舞台為圓心的弧：同一排的每個座位到舞台距離相同，
// 因此畫在平面上時「中央離舞台最遠、兩側較近」——先前做反了，反而更難對位。
// Excel 只有方格欄列，這裡用拋物線近似那道弧。
const CURVE = 1.15;    // 中央相對最外側往後偏移幾個排距

function el(name, attrs = {}) {
  const n = document.createElementNS(NS, name);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
}

export function createSeatMap(container, opts = {}) {
  const {
    data,
    floors = ['1F', '2F'],
    onSeatClick = null,
    onSeatHover = null,
    showLegend = true,
  } = opts;

  if (!data) throw new Error('createSeatMap 需要 data（HALL_SEATS）');
  const shown = data.floors.filter(f => floors.includes(f.id));

  // 兩層共用同一個欄位範圍，視覺上才會對齊
  const colMin = Math.min(...shown.map(f => f.colMin));
  const colMax = Math.max(...shown.map(f => f.colMax));
  const cols = colMax - colMin + 1;
  const width = PAD_L * 2 + cols * CW;

  const seatEls = new Map();   // id -> { rect, seat }
  let selectedId = null;
  let highlighted = [];

  container.innerHTML = '';
  container.classList.add('seatmap-root');

  shown.forEach((floor, fi) => {
    const head = document.createElement('p');
    head.className = 'seatmap-floor-label';
    head.textContent = `${floor.label} ${floor.total} 席` +
      (floor.total !== floor.sellable ? `（可售 ${floor.sellable}）` : '');
    container.appendChild(head);

    const height = PAD_T + floor.rows.length * RH + CURVE * RH + 8;
    const svg = el('svg', {
      viewBox: `0 0 ${width} ${height}`,
      class: 'seatmap-svg',
      role: 'img',
      'aria-label': `${data.venue}${floor.label}座位圖`,
    });

    // 只有最靠近舞台的那一層畫舞台
    if (fi === 0) {
      const sx = PAD_L + cols * CW * 0.28;
      const sw = cols * CW * 0.44;
      svg.appendChild(el('rect', { x: sx, y: 5, width: sw, height: 17, rx: 3, fill: '#efe7d9' }));
      const t = el('text', { x: sx + sw / 2, y: 17.5, 'text-anchor': 'middle',
                             'font-size': 11, fill: '#8a7c68' });
      t.textContent = '舞台';
      svg.appendChild(t);
    }

    floor.rows.forEach((r, ri) => {
      const y = PAD_T + ri * RH;

      [PAD_L - 7, PAD_L + cols * CW + 7].forEach((x, side) => {
        const t = el('text', {
          x, y: y + SW - 1.5, 'text-anchor': side ? 'start' : 'end',
          'font-size': 9.5, fill: '#9a8f80', class: 'seatmap-rowlabel',
        });
        t.textContent = r.row;
        svg.appendChild(t);
      });

      r.seats.forEach(s => {
        const id = `${floor.id}-${r.row}-${s.n}`;
        const x = PAD_L + (s.c - colMin) * CW;
        // 中央往後（遠離舞台）、兩側往前，形成以舞台為圓心的弧
        const t = (s.c - (colMin + colMax) / 2) / ((colMax - colMin) / 2);
        const yc = y + CURVE * RH * (1 - t * t);

        const rect = el('rect', {
          x, y: yc, width: SW, height: SW, rx: 1.6,
          fill: COLORS[s.t] || COLORS.normal,
          class: 'seatmap-seat',
        });
        if (s.t === 'staff') { rect.setAttribute('stroke', '#cfc5b6'); rect.setAttribute('stroke-width', 0.6); }
        svg.appendChild(rect);

        // 透明的較大點擊區：手機上座位方塊只有 7px 左右，直接點很難中
        const hit = el('rect', {
          x: x - 0.8, y: yc - 0.8, width: CW, height: RH,
          fill: 'transparent', class: 'seatmap-hit',
          role: 'button', tabindex: 0,
        });
        const seat = {
          id, floor: floor.id, row: r.row, num: s.n, type: s.t,
          label: `${floor.label} 第 ${r.row} 排 ${s.n} 號`,
          typeLabel: data.types[s.t],
        };
        hit.setAttribute('aria-label', seat.label);

        const fire = () => { select(id); onSeatClick && onSeatClick(seat); };
        hit.addEventListener('click', fire);
        hit.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); }
        });
        if (onSeatHover) {
          hit.addEventListener('mouseenter', () => onSeatHover(seat));
          hit.addEventListener('mouseleave', () => onSeatHover(null));
        }
        svg.appendChild(hit);

        seatEls.set(id, { rect, seat, base: COLORS[s.t] || COLORS.normal });
      });
    });

    container.appendChild(svg);
  });

  if (showLegend) {
    const lg = document.createElement('div');
    lg.className = 'seatmap-legend';
    const used = new Set();
    shown.forEach(f => f.rows.forEach(r => r.seats.forEach(s => used.add(s.t))));
    ['normal', 'wheelchair', 'companion', 'removable', 'staff']
      .filter(k => used.has(k))
      .forEach(k => {
        const i = document.createElement('span');
        i.innerHTML = `<i style="background:${COLORS[k]}"></i>${data.types[k]}`;
        lg.appendChild(i);
      });
    container.appendChild(lg);
  }

  function paint(id) {
    const e = seatEls.get(id);
    if (!e) return;
    const fill = id === selectedId ? COLORS.selected
               : highlighted.includes(id) ? COLORS.highlight
               : e.base;
    e.rect.setAttribute('fill', fill);
    e.rect.classList.toggle('is-selected', id === selectedId);
  }

  function select(id) {
    const prev = selectedId;
    selectedId = seatEls.has(id) ? id : null;
    if (prev) paint(prev);
    if (selectedId) paint(selectedId);
    return selectedId ? seatEls.get(selectedId).seat : null;
  }

  function highlight(ids) {
    const prev = highlighted;
    highlighted = (ids || []).filter(i => seatEls.has(i));
    [...new Set([...prev, ...highlighted])].forEach(paint);
  }

  // 拍攝點標記：手機上單一座位只有 7px 左右，很難點中。
  // 951 個座位最後也只會對應到 20 幾個拍攝點，精確到座位其實是假的精度。
  // 因此另外疊一層明顯、好點的圓點標記，代表實際可以跳過去的位置。
  let markerLayer = null;
  function setMarkers(list, onPick) {
    if (markerLayer) markerLayer.forEach(g => g.remove());
    markerLayer = [];
    (list || []).forEach((m, i) => {
      const e = seatEls.get(m.seatId);
      if (!e) return;
      const rect = e.rect;
      const cx = +rect.getAttribute('x') + SW / 2;
      const cy = +rect.getAttribute('y') + SW / 2;
      const svg = rect.ownerSVGElement;

      const g = el('g', { class: 'seatmap-marker', role: 'button', tabindex: 0 });
      g.setAttribute('aria-label', m.label || m.id);
      g.appendChild(el('circle', { cx, cy, r: MARKER_R * 1.75, fill: 'transparent' }));
      g.appendChild(el('circle', { cx, cy, r: MARKER_R, fill: '#fffdf9',
                                   stroke: COLORS.selected, 'stroke-width': 2 }));
      const t = el('text', { x: cx, y: cy + MARKER_R * 0.36, 'text-anchor': 'middle',
                             'font-size': MARKER_R * 1.05, 'font-weight': 600,
                             fill: COLORS.selected });
      t.textContent = i + 1;
      g.appendChild(t);

      const fire = () => onPick && onPick(m);
      g.addEventListener('click', fire);
      g.addEventListener('keydown', ev => {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); fire(); }
      });
      svg.appendChild(g);
      markerLayer.push(g);
      g.dataset.id = m.id;
    });
  }

  function activeMarker(id) {
    (markerLayer || []).forEach(g => {
      const on = g.dataset.id === id;
      g.classList.toggle('is-active', on);
      const c = g.querySelectorAll('circle')[1];
      c.setAttribute('fill', on ? COLORS.selected : '#fffdf9');
      g.querySelector('text').setAttribute('fill', on ? '#fffdf9' : COLORS.selected);
    });
  }

  return {
    select,
    highlight,
    setMarkers,
    activeMarker,
    clear() { highlight([]); select(null); },
    get(id) { const e = seatEls.get(id); return e ? e.seat : null; },
    all() { return [...seatEls.values()].map(e => e.seat); },
    destroy() { seatEls.clear(); container.innerHTML = ''; },
  };
}

export const SEAT_MAP_CSS = `
.seatmap-root{--sm-ink:#241f1a;--sm-muted:#7a7068;--sm-line:#e2dcd1}
.seatmap-floor-label{font-size:13px;color:var(--sm-muted);margin:1.2rem 0 6px}
.seatmap-root>.seatmap-floor-label:first-child{margin-top:0}
.seatmap-svg{width:100%;height:auto;display:block;overflow:visible}
.seatmap-seat{transition:fill .12s}
.seatmap-seat.is-selected{stroke:#241f1a;stroke-width:1}
.seatmap-hit{cursor:pointer;outline:none}
.seatmap-hit:focus-visible+*,.seatmap-hit:focus-visible{stroke:#241f1a;stroke-width:1.2}
.seatmap-hit:hover{fill:rgba(140,47,40,.10)}
.seatmap-legend{display:flex;flex-wrap:wrap;gap:14px;margin-top:14px;
  font-size:12px;color:var(--sm-muted)}
.seatmap-legend i{display:inline-block;width:10px;height:10px;border-radius:2px;
  margin-right:6px;vertical-align:-1px}
.seatmap-marker{cursor:pointer;outline:none}
.seatmap-marker circle:nth-child(2){transition:fill .12s}
.seatmap-marker:hover circle:nth-child(2){fill:#f3e3e1}
.seatmap-marker:focus-visible circle:nth-child(2){stroke-width:2.6}
`;
