#!/usr/bin/env node
/** 將整合工作區轉為可檢查的正式資料草稿；預設不覆蓋公開 data/。 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const TOOL = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(TOOL, '../..');
const { values } = parseArgs({
  options: {
    workspace: { type: 'string' },
    audit: { type: 'string' },
    output: { type: 'string' },
  },
});
const WORKSPACE_PATH = path.resolve(values.workspace || path.join(ROOT, 'local/hall-tour-editor/workspace.json'));
const AUDIT_PATH = path.resolve(values.audit || path.join(ROOT, 'local/hall-tour-editor/reports/workspace-audit.json'));
const OUTPUT_DIR = path.resolve(values.output || path.join(ROOT, 'local/hall-tour-editor/staging'));
const ASSET_RELEASE = '20260823-v1';

const workspace = JSON.parse(fs.readFileSync(WORKSPACE_PATH, 'utf8'));
const audit = fs.existsSync(AUDIT_PATH) ? JSON.parse(fs.readFileSync(AUDIT_PATH, 'utf8')) : null;
const { TOUR: currentTour } = await import(pathToFileURL(path.join(ROOT, 'data/tour.js')).href + `?t=${Date.now()}`);
const { TOUR_ENTRY_VIEWS: currentEntryViews } = await import(pathToFileURL(path.join(ROOT, 'data/tour-entry-views.js')).href + `?t=${Date.now()}`);

const clone = value => JSON.parse(JSON.stringify(value));
const areaById = new Map(workspace.areas.map(area => [area.id, area]));
const nodesByArea = areaId => workspace.nodes
  .filter(node => node.areaId === areaId)
  .sort((a, b) => a.number - b.number);

function publicNode(node) {
  const isStage = node.areaId === 'stage-services';
  const output = {
    id: node.id,
    name: node.name,
    floor: isStage && node.floor === '待確認' ? '1F' : node.floor,
    heading: node.heading,
    images: node.publicImages ? clone(node.publicImages) : {
      preview: `pano/${ASSET_RELEASE}/${node.id}-preview.webp`,
      mid: `pano/${ASSET_RELEASE}/${node.id}-mid.webp`,
      full: `pano/${ASSET_RELEASE}/${node.id}-full.webp`,
    },
    source: node.source.file,
    description: node.description || '',
    hotspots: (node.infoMarkers || []).map(info => ({
      id: info.id,
      title: info.title || '',
      body: info.body || '',
      yaw: info.yaw,
      pitch: info.pitch,
    })),
    links: clone(node.links || []),
  };
  if (node.seat) output.seat = node.seat;
  if (node.plan) output.plan = clone(node.plan);
  if (node.spaceType) output.spaceType = node.spaceType;
  return output;
}

const groups = {
  lobby: [...nodesByArea('lobby-1f'), ...nodesByArea('lobby-2f')],
  auditorium: [...nodesByArea('auditorium-1f'), ...nodesByArea('auditorium-2f')],
  stage: nodesByArea('stage-services'),
  greenroom: nodesByArea('greenroom'),
};

const tour = clone(currentTour);
tour.regions = tour.regions.filter(region => region.id !== 'backstage').map(region => {
  if (!groups[region.id]) return region;
  const nodes = groups[region.id].map(publicNode);
  return {
    ...region,
    name: region.id === 'stage' ? '舞台與貴賓室' : region.name,
    status: 'ready',
    photoCount: nodes.length,
    sourcePhotos: nodes.length,
    nodes,
    boundaries: [],
    updatedAt: workspace.updatedAt?.slice(0, 10),
  };
});

const entryAreas = {
  'lobby-1f': areaById.get('lobby-1f'),
  'lobby-2f': areaById.get('lobby-2f'),
  'auditorium-1f': areaById.get('auditorium-1f'),
  'auditorium-2f': areaById.get('auditorium-2f'),
  stage: areaById.get('stage-services'),
  greenroom: areaById.get('greenroom'),
};

tour.sceneMenu = tour.sceneMenu.filter(entry => entry.id !== 'backstage').map(entry => {
  const area = entryAreas[entry.id];
  if (!area) return entry;
  const next = {
    ...entry,
    name: entry.id === 'stage'
      ? '舞台與貴賓室'
      : entry.id === 'lobby-1f'
        ? '音樂廳前廳一樓'
        : entry.id === 'lobby-2f'
          ? '音樂廳前廳二樓'
          : entry.name,
    startNode: area.entryNode,
    status: 'ready',
  };
  if (entry.id === 'stage') next.floor = '1F';
  if (['auditorium-1f', 'auditorium-2f', 'stage', 'greenroom'].includes(entry.id)) {
    next.image = `scene-cards/${ASSET_RELEASE}/${entry.id}.webp`;
  }
  return next;
});

const entryViews = clone(currentEntryViews);
for (const [entryId, area] of Object.entries(entryAreas)) {
  if (!area?.entryNode || !area?.entryView) throw new Error(`入口 ${entryId} 尚未完成開場點或視角設定`);
  entryViews[entryId] = {
    startNode: area.entryNode,
    yaw: area.entryView.yaw,
    pitch: area.entryView.pitch,
  };
}

const allNodes = tour.regions.flatMap(region => region.nodes || []);
const ids = new Set(allNodes.map(node => node.id));
const removedLegacyLinks = [];
for (const node of allNodes) {
  node.links = (node.links || []).filter(link => {
    if (ids.has(link.to)) return true;
    if (node.id.startsWith('lob-') && /^aud-\d+$/.test(link.to || '')) {
      removedLegacyLinks.push({ from: node.id, to: link.to });
      return false;
    }
    return true;
  });
}
const regionByNode = new Map(tour.regions.flatMap(region => (region.nodes || []).map(node => [node.id, region.id])));
tour.regions = tour.regions.map(region => ({
  ...region,
  boundaries: (region.nodes || []).flatMap(node => (node.links || [])
    .filter(link => regionByNode.get(link.to) && regionByNode.get(link.to) !== region.id)
    .map(link => ({
      node: node.id,
      to: regionByNode.get(link.to),
      toNode: link.to,
      label: `前往${tour.regions.find(item => item.id === regionByNode.get(link.to))?.name || '相鄰空間'}`,
    }))),
}));
const errors = [];
if (ids.size !== allNodes.length) errors.push('正式草稿含重複節點 ID');
for (const node of allNodes) {
  for (const link of node.links || []) {
    if (!ids.has(link.to)) errors.push(`${node.id} 指向不存在的 ${link.to}`);
  }
  for (const tier of ['preview', 'mid', 'full']) {
    if (!/^pano\/(?:[a-z0-9-]+\/)?[a-z0-9-]+-(preview|mid|full)\.webp$/.test(node.images[tier])) {
      errors.push(`${node.id} 的 ${tier} 路徑格式錯誤`);
    }
  }
}
for (const entry of tour.sceneMenu.filter(item => item.status === 'ready')) {
  if (!ids.has(entryViews[entry.id]?.startNode || entry.startNode)) {
    errors.push(`入口 ${entry.id} 的 startNode 不存在`);
  }
}
if (errors.length) throw new Error(errors.join('\n'));

const warnings = [];
const lobbyAuditoriumLinks = allNodes.flatMap(node => (node.links || []).map(link => ({ from: node.id, to: link.to })))
  .filter(link => (
    (link.from.startsWith('lob-') && link.to.startsWith('aud-'))
    || (link.from.startsWith('aud-') && link.to.startsWith('lob-'))
  ));
if (!lobbyAuditoriumLinks.length) {
  warnings.push('前廳與新版觀眾席尚未建立任何實際對應動線。');
}
if (audit?.summary?.stageUnclassified) {
  warnings.push(`舞台組仍有 ${audit.summary.stageUnclassified} 個點位使用「待分類」；目前以一般 1F 平面圖顯示。`);
}
if (!fs.existsSync(path.join(ROOT, 'local/hall-tour-editor/public-assets/scene-cards/stage.webp'))) {
  warnings.push('scene-cards/stage.webp 仍需在 R2 上傳前產生與確認。');
}
if (audit?.summary?.oneWayLinks) warnings.push(`目前有 ${audit.summary.oneWayLinks} 條只有單向的動線。`);
if (audit?.highDensityScenes?.length) warnings.push(`目前有 ${audit.highDensityScenes.length} 個場景超過 12 顆移動點。`);
if (audit?.summary?.unreachableFromAreaEntries) warnings.push(`目前有 ${audit.summary.unreachableFromAreaEntries} 個點位無法由該區開場點依箭頭到達。`);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUTPUT_DIR, 'tour.js'), `// 由 hall-tour-editor 工作區產生；正式套用前仍需處理 staging-manifest.json 的警告。\nexport const TOUR = ${JSON.stringify(tour, null, 2)};\n`);
fs.writeFileSync(path.join(OUTPUT_DIR, 'tour-entry-views.js'), `// 由 hall-tour-editor 工作區產生。\nexport const TOUR_ENTRY_VIEWS = ${JSON.stringify(entryViews, null, 2)};\n`);
fs.writeFileSync(path.join(OUTPUT_DIR, 'staging-manifest.json'), JSON.stringify({
  generatedAt: new Date().toISOString(),
  workspaceUpdatedAt: workspace.updatedAt,
  publicDataModified: false,
  assetRelease: ASSET_RELEASE,
  nodes: allNodes.length,
  regionCounts: Object.fromEntries(tour.regions.map(region => [region.id, region.nodes.length])),
  content: {
    descriptions: workspace.nodes.filter(node => node.description?.trim()).length,
    infoMarkers: workspace.nodes.reduce((sum, node) => sum + (node.infoMarkers?.length || 0), 0),
    mayBeAddedLater: true,
  },
  removedLegacyLinks,
  warnings,
}, null, 2) + '\n');

console.log(`已建立本機正式草稿：${allNodes.length} 個節點、${tour.sceneMenu.length} 個場景入口`);
console.log(`輸出：${OUTPUT_DIR}`);
console.log(`警告：${warnings.length} 項；未修改 data/tour.js`);
