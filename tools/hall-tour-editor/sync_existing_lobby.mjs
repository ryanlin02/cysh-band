#!/usr/bin/env node
/** 將既有 33 張前廳場景安全併入整合標注工作區，不改動其餘人工標註。 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TOOL = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(TOOL, '../..');
const WORKSPACE_PATH = path.join(ROOT, 'local/hall-tour-editor/workspace.json');
const workspace = JSON.parse(fs.readFileSync(WORKSPACE_PATH, 'utf8'));
const { TOUR } = await import(pathToFileURL(path.join(ROOT, 'data/tour.js')).href + `?t=${Date.now()}`);
const { TOUR_ENTRY_VIEWS } = await import(pathToFileURL(path.join(ROOT, 'data/tour-entry-views.js')).href + `?t=${Date.now()}`);

const clone = value => JSON.parse(JSON.stringify(value));
const lobby = TOUR.regions.find(region => region.id === 'lobby');
if (!lobby || !Array.isArray(lobby.nodes) || !lobby.nodes.length) {
  throw new Error('data/tour.js 找不到既有前廳場景。');
}

const lobbyIds = new Set(lobby.nodes.map(node => node.id));
const priorById = new Map(workspace.nodes.map(node => [node.id, node]));
const publicImage = value => `${TOUR.imageBase}${value}`;

function lobbyNode(node) {
  const prior = priorById.get(node.id);
  const floorArea = node.floor === '2F' ? 'lobby-2f' : 'lobby-1f';
  const imported = {
    id: node.id,
    number: Number(node.id.match(/(\d+)$/)?.[1] || 0),
    areaId: floorArea,
    publicRegionId: 'lobby',
    name: node.name,
    floor: node.floor,
    spaceType: '',
    description: node.description || '',
    source: {
      file: node.source || node.id,
      kind: 'existing-r2',
      remote: true,
    },
    panorama: {
      preview: publicImage(node.images.preview),
      mid: publicImage(node.images.mid),
      full: publicImage(node.images.full),
    },
    publicImages: clone(node.images),
    seat: node.seat || null,
    plan: node.plan ? clone(node.plan) : null,
    heading: node.heading,
    headingSet: true,
    links: (node.links || []).filter(link => lobbyIds.has(link.to)).map(clone),
    infoMarkers: (node.hotspots || []).map((hotspot, index) => ({
      id: hotspot.id || `imported-${node.id}-${index + 1}`,
      title: hotspot.title || '',
      body: hotspot.body || hotspot.text || '',
      yaw: hotspot.yaw,
      pitch: hotspot.pitch,
    })),
    notes: '',
  };
  if (!prior) return imported;
  // 若未來已在整合工作台編輯前廳，重新同步時優先保留人工欄位。
  for (const field of ['name', 'description', 'plan', 'heading', 'headingSet', 'links', 'infoMarkers', 'notes']) {
    if (field in prior) imported[field] = clone(prior[field]);
  }
  return imported;
}

function lobbyArea(id, floor, name, plan) {
  const prior = workspace.areas.find(area => area.id === id);
  const floorNodes = lobby.nodes.filter(node => node.floor === floor);
  const view = TOUR_ENTRY_VIEWS[id];
  return {
    id,
    name,
    floor,
    expectedCount: floorNodes.length,
    publicRegionId: 'lobby',
    mapType: 'plan',
    plan,
    planNote: '',
    entryNode: prior?.entryNode || view?.startNode || floorNodes[0]?.id || null,
    entryView: prior?.entryView || (view ? { yaw: view.yaw, pitch: view.pitch } : null),
  };
}

const lobbyAreas = [
  lobbyArea('lobby-1f', '1F', '音樂廳前廳一樓', 'plans/1F.png'),
  lobbyArea('lobby-2f', '2F', '音樂廳前廳二樓', 'plans/2F.png'),
];
const otherAreas = workspace.areas
  .filter(area => !['lobby-1f', 'lobby-2f'].includes(area.id))
  .map(area => area.id === 'stage-services'
    ? { ...area, name: '舞台與貴賓室', planNote: '舞台與貴賓室目前暫用 1F 平面圖，需由現場熟悉者確認。' }
    : area);
const otherNodes = workspace.nodes.filter(node => !node.id.startsWith('lob-'));
const importedLobbyNodes = lobby.nodes.map(lobbyNode);

workspace.project = {
  ...workspace.project,
  mode: 'local-integrated-annotation',
  photoCount: otherNodes.length + importedLobbyNodes.length,
  localPhotoCount: otherNodes.length,
  existingPhotoCount: importedLobbyNodes.length,
  publishingStatus: '尚未發布',
};
workspace.updatedAt = new Date().toISOString();
workspace.areas = [...lobbyAreas, ...otherAreas];
workspace.nodes = [...importedLobbyNodes, ...otherNodes];

fs.writeFileSync(WORKSPACE_PATH, JSON.stringify(workspace, null, 2) + '\n');
console.log(`整合完成：${workspace.areas.length} 區、${workspace.nodes.length} 個場景（前廳 ${importedLobbyNodes.length} + 新版 ${otherNodes.length}）。`);
