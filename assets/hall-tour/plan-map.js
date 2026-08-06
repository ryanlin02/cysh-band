// 平面圖定位元件
//
// 座位表只有觀眾席用得到，其他四個區域需要通用的空間參照。
// 這個元件顯示樓層平面圖，可點選定位、可放置節點標記，
// 座標一律用 0–1 正規化，換底圖或改解析度都不會失效。
//
//   const plan = createPlanMap(el, {
//     plans: { '1F': 'plan/1F.png', '2F': 'plan/2F.png' },
//     floor: '1F',
//     onPick:  ({ floor, x, y }) => {},   // 點空白處定位（校正用）
//     onMarker: node => {},                // 點既有標記
//   });
//   plan.setFloor('2F');
//   plan.setMarkers([{ id, floor, x, y, label }]);
//   plan.active('lob-03');

const NS = 'http://www.w3.org/2000/svg';
const MARKER_R = 0.022;   // 相對於圖寬。直式底圖較窄，比例要放大才維持得住點擊面積

function el(n, a = {}) {
  const e = document.createElementNS(NS, n);
  for (const k in a) e.setAttribute(k, a[k]);
  return e;
}

export function createPlanMap(container, opts = {}) {
  const { plans = {}, onPick = null, onMarker = null, pickable = true, markerScale = 1 } = opts;
  const floors = Object.keys(plans);
  let floor = opts.floor || floors[0];
  let markers = [];
  let activeId = null;

  container.innerHTML = '';
  container.classList.add('planmap-root');

  const bar = document.createElement('div');
  bar.className = 'planmap-bar';
  container.appendChild(bar);

  const wrap = document.createElement('div');
  wrap.className = 'planmap-wrap';
  container.appendChild(wrap);

  // 底圖為直式（舞台在上、大門在下，與座位表同方向）。
  // 這裡只是載入前的暫用值，實際尺寸由 probe 取得後覆寫，座標一律用比例計算。
  let W = 956, H = 1397;
  const svg = el('svg', { class: 'planmap-svg', viewBox: `0 0 ${W} ${H}` });
  const img = el('image', { x: 0, y: 0, width: W, height: H, class: 'planmap-img' });
  const hit = el('rect', { x: 0, y: 0, width: W, height: H, fill: 'transparent',
                           class: pickable ? 'planmap-hit' : '' });
  const layer = el('g');
  svg.append(img, hit, layer);
  wrap.appendChild(svg);

  const probe = new Image();
  probe.onload = () => {
    W = probe.naturalWidth; H = probe.naturalHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    [img, hit].forEach(n => { n.setAttribute('width', W); n.setAttribute('height', H); });
    draw();
  };

  function setFloor(f) {
    if (!plans[f]) return;
    floor = f;
    img.setAttribute('href', plans[f]);
    probe.src = plans[f];
    [...bar.children].forEach(b => {
      const selected = b.dataset.f === f;
      b.classList.toggle('on', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    draw();
  }

  floors.forEach(f => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = f === 'B1' ? '地下室' : f === '1F' ? '一樓' : f === '2F' ? '二樓' : f;
    b.dataset.f = f;
    b.setAttribute('aria-pressed', String(f === floor));
    b.onclick = () => setFloor(f);
    bar.appendChild(b);
  });

  if (pickable) {
    hit.addEventListener('click', ev => {
      const r = svg.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width;
      const y = (ev.clientY - r.top) / r.height;
      onPick && onPick({ floor, x: +x.toFixed(4), y: +y.toFixed(4) });
    });
  }

  function draw() {
    layer.textContent = '';
    const R = MARKER_R * W * markerScale;
    markers.filter(m => m.floor === floor).forEach((m, i) => {
      const cx = m.x * W, cy = m.y * H;
      const g = el('g', { class: 'planmap-marker', role: 'button', tabindex: 0 });
      g.setAttribute('aria-label', m.label || m.id);
      g.dataset.id = m.id;
      const on = m.id === activeId;
      g.appendChild(el('circle', { cx, cy, r: R * 2.4, fill: 'transparent' }));

      // 方向扇形：heading 為 0 代表面向平面圖正上方。
      // 校正時可一眼看出哪些節點的方向還沒對齊，不必逐一點開檢查。
      if (typeof m.dir === 'number') {
        const a = (m.dir - 90) * Math.PI / 180;
        const spread = 0.42;
        const L = R * 3.2;
        const p = (t) => `${cx + Math.cos(t) * L},${cy + Math.sin(t) * L}`;
        g.appendChild(el('path', {
          d: `M${cx},${cy} L${p(a - spread)} A${L},${L} 0 0 1 ${p(a + spread)} Z`,
          fill: '#8c2f28', opacity: on ? 0.30 : 0.14,
        }));
      }
      g.appendChild(el('circle', { cx, cy, r: R, class: 'planmap-dot',
                                   fill: on ? '#8c2f28' : '#fffdf9',
                                   stroke: '#8c2f28', 'stroke-width': R * 0.18 }));
      const t = el('text', { x: cx, y: cy + R * 0.36, 'text-anchor': 'middle',
                             'font-size': R * 1.05, 'font-weight': 600,
                             fill: on ? '#fffdf9' : '#8c2f28' });
      t.textContent = m.n != null ? m.n : i + 1;
      g.appendChild(t);
      g.addEventListener('click', ev => { ev.stopPropagation(); onMarker && onMarker(m); });
      g.addEventListener('keydown', ev => {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onMarker && onMarker(m); }
      });
      layer.appendChild(g);
    });
  }

  setFloor(floor);

  return {
    setFloor,
    getFloor: () => floor,
    setMarkers(list) { markers = list || []; draw(); },
    active(id) { activeId = id; draw(); },
    count(f) { return markers.filter(m => m.floor === (f || floor)).length; },
  };
}

export const PLAN_MAP_CSS = `
.planmap-root{--pm-line:#e2dcd1;--pm-ink:#241f1a;--pm-muted:#7a7068}
.planmap-bar{display:flex;gap:8px;margin:0 0 8px}
.planmap-bar button{background:transparent;border:1px solid var(--pm-line);border-radius:20px;
  min-height:44px;padding:7px 15px;font-size:13px;cursor:pointer;font-family:inherit;color:var(--pm-muted);touch-action:manipulation}
.planmap-bar button.on{background:var(--pm-ink);color:#faf8f3;border-color:var(--pm-ink)}
.planmap-wrap{background:#fffdf9;border:1px solid var(--pm-line);border-radius:10px;
  padding:8px;overflow:hidden}
.planmap-svg{width:100%;height:auto;display:block}
.planmap-img{opacity:.55}
.planmap-hit{cursor:crosshair}
.planmap-marker{cursor:pointer;outline:none}
.planmap-dot{transition:fill .12s}
.planmap-marker:hover .planmap-dot{fill:#f3e3e1}
.planmap-marker:focus-visible .planmap-dot{stroke-width:4}
`;
