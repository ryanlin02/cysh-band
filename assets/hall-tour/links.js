// 全景內跳點：計算每個節點該在畫面的哪個方位顯示可前往的圓點
//
// 資料來源是既有的校正結果，不需要額外標記：
//   - 位置：平面圖座標 plan{x,y}，或觀眾席的座位（排／欄換算成同方向的比例座標）
//   - 方位：heading＝畫面朝向平面圖正上方（舞台方向）時的 yaw
//
// 有了這兩者就能算出「從 A 看向 B」的方位角，圓點自然落在正確的方向上。

// PSV 的 yaw 增加方向若與預期相反，把這裡改成 -1 即可，不必動其他程式。
const YAW_SIGN = 1;

const MAX_LINKS = 4;        // 一個節點最多顯示幾個可前往的點，太多會擋住畫面
// 拍攝點之間本來就有間隔（觀眾席相鄰取樣點相距 3–8 排），距離上限太小會讓後排完全沒有圓點。
// 這裡放寬，並優先保證「最近的幾個一定看得到」。
const MAX_DIST = 0.55;
const MIN_LINKS = 2;        // 至少要有這麼多個，不足就無視距離上限補足
const PITCH_NEAR = -32;     // 近處的點壓低一些，看起來貼在地上
const PITCH_FAR = -14;
const MIN_SEPARATION = 26;  // 兩個跳點的方位至少要差這麼多度，否則會互相遮擋
// 跨樓層的通道算不出方位（兩層的座標系不同）。預設放在背對舞台的方向——
// 音樂廳的出入口都在觀眾席後方，這比原本的「正前方」合理得多。
// 真正準確的位置請在校正工具裡人工放置。
const BOUNDARY_FALLBACK_BEARING = 180;

/** 角度正規化到 0–360 */
const norm360 = d => ((d % 360) + 360) % 360;

/** 兩個方位角的最小夾角（0–180） */
const angSep = (a, b) => Math.abs(((a - b + 540) % 360) - 180);

// 觀眾席的實際尺寸來自館方技術資料，不是估的：
//   舞台前緣中心 → 第一排 5.42 m、→ 最後一排 26.5 m，19 個排距 = 21.08 m
// 先前用「每排＝2 格欄寬、舞台在前方 3.6 排」是隨手填的，導致側邊座位的角度被放大，
// 圓點因此指錯方向。
export const ROW_M = 21.08 / 19;   // 每排 1.11 m
export const COL_M = 0.55;         // 座椅間距
export const SEAT_CENTER_COL = 29.5;
export const STAGE_ROW = 1 - 5.42 / ROW_M;   // 舞台中央相當於第 -3.9 排
const HALL_M = 30;                 // 換算成 0–1 比例用的基準尺度

/** 把兩種定位方式統一成同方向的比例座標，只有相對關係有意義 */
export function normPos(node, seatPos) {
  if (node.plan) return { f: node.floor, x: node.plan.x, y: node.plan.y };
  if (node.seat && seatPos) {
    const s = seatPos.get(node.seat);
    if (!s) return null;
    // 平面圖是舞台在上：排數越大越往下，欄位越大越往右
    return {
      f: s.floor,
      x: 0.5 + (s.c - SEAT_CENTER_COL) * COL_M / HALL_M,
      y: s.row * ROW_M / HALL_M,
    };
  }
  return null;
}

/** 從某個座位看舞台中央的方位角（度，順時針，0＝正上方） */
export function stageBearing(c, row) {
  const px = (c - SEAT_CENTER_COL) * COL_M, py = row * ROW_M;
  return Math.atan2(0 - px, -(STAGE_ROW * ROW_M - py)) * 180 / Math.PI;
}

/** 從 A 看向 B 的方位角（度，順時針，0＝平面圖正上方） */
function bearing(a, b) {
  return Math.atan2(b.x - a.x, -(b.y - a.y)) * 180 / Math.PI;
}

function dist(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/**
 * 計算某個節點要顯示哪些跳點
 * @returns [{ id, region, label, yaw, pitch, kind }]  kind: 'move' | 'boundary'
 */
export function linksFor(node, region, ctx) {
  const { seatPos, regionsById, nodesById } = ctx;

  // 人工放置優先。
  // 這個廳同時有斜坡（高低差）與弧形排列，純靠平面幾何算不出正確的畫面位置；
  // 由人直接在照片上點，才是準確又省事的做法。計算結果只當作初始位置。
  const manual = Array.isArray(node.links) ? node.links : [];
  const boundaries = (region.boundaries || []).filter(b => b.node === node.id);

  if (manual.length) {
    const out = manual.map(l => {
      const t = nodesById && nodesById.get(l.to);
      const b = (region.boundaries || []).find(x => x.node === node.id && x.toNode === l.to);
      const targetRegion = b
        ? regionsById.get(b.to)
        : [...(regionsById?.values?.() || [])].find(candidate =>
            (candidate.nodes || []).some(target => target.id === l.to));
      const targetRegionId = targetRegion?.id || region.id;
      const crossRegion = targetRegionId !== region.id;
      const idx = (targetRegion?.nodes || region.nodes).findIndex(x => x.id === l.to);
      return {
        id: l.to,
        region: targetRegionId,
        label: b ? b.label : (t ? t.name : l.to),
        num: !crossRegion && idx >= 0 ? idx + 1 : undefined,
        kind: b || crossRegion ? 'boundary' : 'move',
        yaw: norm360(l.yaw),
        pitch: l.pitch,
        manual: true,
      };
    });

    // 跨區通道若還沒人工放置，仍要出現，否則使用者走不出這一區
    boundaries.filter(b => !manual.some(l => l.to === b.toNode)).forEach(b => {
      out.push(boundaryLink(node, b, nodesById, region));
    });
    return out;
  }

  const from = normPos(node, seatPos);
  if (!from || typeof node.heading !== 'number') return [];

  const out = [];

  // 同區域的鄰近節點
  const near = region.nodes
    .filter(n => n.id !== node.id && n.floor === node.floor)
    .map(n => ({ n, p: normPos(n, seatPos) }))
    .filter(o => o.p)
    .map(o => ({ ...o, d: dist(from, o.p) }))
    .filter(o => o.d <= MAX_DIST)
    .sort((a, b) => a.d - b.d);

  // 同方向的近點會疊在一起，方位太接近就只留較近的那個（near 已依距離排序）
  const taken = [];
  const push = (n, p, d) => {
    const br = bearing(from, p);
    if (taken.some(t => angSep(br, t) < MIN_SEPARATION)) return false;
    taken.push(br);
    const t = Math.min(1, d / MAX_DIST);
    out.push({
      id: n.id, region: region.id, label: n.name, kind: 'move',
      num: region.nodes.indexOf(n) + 1,
      yaw: norm360(node.heading + YAW_SIGN * br),
      pitch: PITCH_NEAR + (PITCH_FAR - PITCH_NEAR) * t,
    });
    return true;
  };

  near.forEach(o => {
    if (out.length >= MAX_LINKS) return;
    push(o.n, o.p, o.d);
  });

  // 距離上限之外的節點也要保底，否則後排或孤立位置會完全沒有圓點、變成死路
  if (out.length < MIN_LINKS) {
    region.nodes
      .filter(n => n.id !== node.id)
      .map(n => ({ n, p: normPos(n, seatPos) }))
      .filter(o => o.p)
      .map(o => ({ ...o, d: dist(from, o.p) }))
      .sort((a, b) => a.d - b.d)
      .forEach(o => { if (out.length < MIN_LINKS) push(o.n, o.p, Math.min(o.d, MAX_DIST)); });
  }

  // 跨區通道：一定顯示，而且要有文字，否則使用者不知道那顆點通往哪裡
  boundaries.forEach(b => {
    const target = b.toNode && nodesById.get(b.toNode);
    const tp = target && normPos(target, seatPos);
    const br = tp && tp.f === from.f ? bearing(from, tp) : BOUNDARY_FALLBACK_BEARING;
    out.push({
      id: b.toNode, region: b.to, label: b.label, kind: 'boundary',
      yaw: norm360(node.heading + YAW_SIGN * br),
      pitch: -10,
    });
  });

  return out;
}

/** 通道連結（人工未放置時使用） */
function boundaryLink(node, b, nodesById, region) {
  return {
    id: b.toNode, region: b.to, label: b.label, kind: 'boundary',
    yaw: norm360(node.heading + YAW_SIGN * BOUNDARY_FALLBACK_BEARING),
    pitch: -10,
  };
}

/** 產生 MarkersPlugin 用的設定 */
const escapeAttr = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

export function toMarkers(links) {
  return links.map((l, i) => {
    const boundary = l.kind === 'boundary';
    const accessibleLabel = boundary
      ? l.label
      : `前往 ${l.num != null ? `${l.num}. ` : ''}${l.label}`;
    return {
      id: `link-${i}`,
      position: { yaw: `${l.yaw}deg`, pitch: `${l.pitch}deg` },
      html: `<button type="button" class="tour-dot${boundary ? ' is-boundary' : ''}" aria-label="${escapeAttr(accessibleLabel)}">
               <span class="tour-dot-ring">${!boundary && l.num != null ? l.num : ''}</span>
               ${boundary ? `<span class="tour-dot-label">${l.label}</span>` : ''}
             </button>`,
      // 可見圓圈縮為 30px，但保留 44px 點擊範圍，兼顧密集畫面與手機操作。
      size: { width: 44, height: 44 },
      anchor: 'center center',
      tooltip: boundary ? null : (l.num != null ? `${l.num}. ${l.label}` : l.label),
      data: l,
    };
  });
}

/** 產生可開啟文字說明的資訊點。 */
export function toInfoMarkers(hotspots = []) {
  return hotspots.map((hotspot, index) => ({
    id: `info-${hotspot.id || index}`,
    position: { yaw: `${hotspot.yaw}deg`, pitch: `${hotspot.pitch}deg` },
    html: `<button type="button" class="tour-info-dot" aria-label="了解${escapeAttr(hotspot.title || '這個位置')}">
             <span class="tour-info-dot-ring" aria-hidden="true">i</span>
           </button>`,
    size: { width: 44, height: 44 },
    anchor: 'center center',
    tooltip: hotspot.title || '空間資訊',
    data: { kind: 'info', info: hotspot },
  }));
}

/** 以網站主視覺遮住環景正下方的腳架，不修改原始照片。 */
export function nadirMarker(imageUrl) {
  return {
    id: 'nadir-cap',
    position: { yaw: '0deg', pitch: '-90deg' },
    html: `<span class="tour-nadir-cap"><img src="${imageUrl}" alt="" draggable="false"></span>`,
    size: { width: 156, height: 156 },
    anchor: 'center center',
    tooltip: null,
    data: null,
  };
}

export const TOUR_DOT_CSS = `
.tour-dot{position:relative;width:100%;height:100%;padding:0;border:0;background:transparent;
  color:inherit;font:inherit;cursor:pointer;touch-action:manipulation}
.tour-dot-ring{position:absolute;inset:7px;border-radius:50%;
  background:rgba(255,253,249,.84);border:2px solid rgba(140,47,40,.9);
  box-shadow:0 2px 8px rgba(0,0,0,.34);
  transition:transform .18s cubic-bezier(.2,.8,.2,1),background-color .18s,border-color .18s,box-shadow .18s;
  display:flex;align-items:center;justify-content:center;
  color:#8c2f28;font-size:16px;font-weight:750;line-height:1;font-variant-numeric:tabular-nums}
.tour-dot:hover .tour-dot-ring,.tour-dot:focus-visible .tour-dot-ring,.psv-marker:focus-visible .tour-dot-ring{
  transform:scale(1.12);background:rgba(255,253,249,.98);border-color:#8c2f28;
  box-shadow:0 4px 13px rgba(0,0,0,.42)}
.tour-dot:active .tour-dot-ring{transform:scale(.92);background:#8c2f28;color:#fffdf9}
.tour-dot.is-boundary .tour-dot-ring{background:rgba(140,47,40,.86);border-color:rgba(255,253,249,.86)}
.tour-dot.is-boundary .tour-dot-ring{color:#fffdf9}
.tour-dot.is-boundary:hover .tour-dot-ring,.tour-dot.is-boundary:focus-visible .tour-dot-ring,.psv-marker:focus-visible .tour-dot.is-boundary .tour-dot-ring{
  background:rgba(140,47,40,.98);border-color:#fffdf9}
.tour-dot-label{position:absolute;left:50%;top:100%;transform:translateX(-50%);
  white-space:nowrap;background:#8c2f28;color:#fffdf9;font-size:12.5px;
  padding:3px 10px;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,.3)}
.tour-info-dot{position:relative;width:100%;height:100%;padding:0;border:0;background:transparent;
  color:inherit;font:inherit;cursor:pointer;touch-action:manipulation}
.tour-info-dot-ring{position:absolute;inset:7px;display:flex;align-items:center;justify-content:center;
  border:2px solid rgba(255,255,255,.88);border-radius:50%;background:rgba(35,76,98,.84);
  color:#fff;font:800 17px/1 Georgia,serif;box-shadow:0 2px 8px rgba(0,0,0,.34);
  transition:transform .18s cubic-bezier(.2,.8,.2,1),background-color .18s,box-shadow .18s}
.tour-info-dot:hover .tour-info-dot-ring,.tour-info-dot:focus-visible .tour-info-dot-ring{
  transform:scale(1.12);background:rgba(35,76,98,.98);box-shadow:0 4px 13px rgba(0,0,0,.42)}
.tour-info-dot:active .tour-info-dot-ring{transform:scale(.92);background:#173b4e}
@media (prefers-reduced-motion:reduce){.tour-dot-ring,.tour-info-dot-ring{transition-duration:.01ms}}
`;

export const NADIR_CAP_CSS = `
.tour-nadir-cap{display:grid;width:100%;height:100%;place-items:center;overflow:hidden;
  border:5px solid rgba(255,253,249,.92);border-radius:50%;background:#172532;
  box-shadow:0 3px 18px rgba(0,0,0,.42);pointer-events:none;user-select:none}
.tour-nadir-cap img{display:block;width:100%;height:100%;object-fit:cover;border-radius:50%}
`;
