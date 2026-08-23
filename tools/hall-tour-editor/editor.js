import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { HALL_SEATS } from '/repo/data/hall-seats.js';
import { createSeatMap, SEAT_MAP_CSS } from '/repo/assets/hall-tour/seat-map.js';
import { nadirMarker, NADIR_CAP_CSS } from '/repo/assets/hall-tour/links.js?v=20260823-interactive-dots';

const seatMapStyle = document.createElement('style');
seatMapStyle.textContent = SEAT_MAP_CSS + NADIR_CAP_CSS;
document.head.append(seatMapStyle);

const STORAGE_KEY = 'cysh-hall-tour-editor-v1';
const $ = id => document.getElementById(id);
const workspace = await (await fetch('/data/workspace.json', { cache: 'no-store' })).json();
const panoramaSrc = (node, tier = 'preview') => {
  const value = node?.panorama?.[tier] || node?.panorama?.preview || '';
  return /^https?:\/\//i.test(value) ? value : '/data/' + value;
};
let currentAreaId = workspace.areas[0].id;
let currentNodeId = workspace.nodes[0].id;
let dirty = false;
let loadedPanorama = '';
let placing = null;
let seatMap = null;
let seatMapAreaId = null;
let activeTab = 'position';
let referenceAreaId = currentAreaId;
let panoramaLoadToken = 0;
const PANORAMA_RETRIES = 2;

const viewer = new Viewer({
  container: 'viewer',
  panorama: panoramaSrc(workspace.nodes[0]),
  navbar: ['zoom', 'move', 'fullscreen'],
  defaultZoomLvl: 28,
  plugins: [[MarkersPlugin, {}]],
});
const markerPlugin = viewer.getPlugin(MarkersPlugin);

const currentNode = () => workspace.nodes.find(node => node.id === currentNodeId);
const currentArea = () => workspace.areas.find(area => area.id === currentAreaId);
const areaNodes = () => workspace.nodes.filter(node => node.areaId === currentAreaId);
const referenceArea = () => workspace.areas.find(area => area.id === referenceAreaId) || currentArea();
const referenceNodes = () => workspace.nodes.filter(node => node.areaId === referenceArea().id);
const degree = value => ((Math.round(value) % 360) + 360) % 360;
const fixed = value => +value.toFixed(4);
const hasPosition = node => Boolean(node.seat || node.plan);
const isLocated = node => Boolean(hasPosition(node) && node.headingSet);
const nodeById = id => workspace.nodes.find(node => node.id === id);
const areaById = id => workspace.areas.find(area => area.id === id);
const groupId = node => areaById(node?.areaId)?.publicRegionId || node?.areaId;
const MAX_RECOMMENDED_LINKS = 12;

function incomingLinks(nodeId) {
  return workspace.nodes.flatMap(source => (source.links || [])
    .filter(link => link.to === nodeId)
    .map(link => ({ source, link })));
}

function connectionStats(node) {
  const outgoing = (node.links || []).map(link => ({ link, target: nodeById(link.to) }));
  const validOutgoing = outgoing.filter(item => item.target);
  const incoming = incomingLinks(node.id);
  const sameGroup = validOutgoing.filter(item => groupId(item.target) === groupId(node));
  const crossGroup = validOutgoing.filter(item => groupId(item.target) !== groupId(node));
  const reciprocal = validOutgoing.filter(item => item.target.links?.some(link => link.to === node.id));
  const missingOutgoing = validOutgoing.filter(item => !item.target.links?.some(link => link.to === node.id));
  const missingIncoming = incoming.filter(item => !(node.links || []).some(link => link.to === item.source.id));
  const invalid = outgoing.filter(item => !item.target);
  return {
    outgoing,
    validOutgoing,
    incoming,
    sameGroup,
    crossGroup,
    reciprocal,
    missingOutgoing,
    missingIncoming,
    invalid,
    dense: validOutgoing.length > MAX_RECOMMENDED_LINKS,
  };
}

const hasConnectionIssue = node => {
  const stats = connectionStats(node);
  return Boolean(stats.missingOutgoing.length || stats.missingIncoming.length || stats.invalid.length || stats.dense);
};

function setViewerLoadStatus(message = '', error = false) {
  const status = $('viewerLoadStatus');
  status.hidden = !message;
  status.classList.toggle('is-error', error);
  $('viewerLoadMessage').textContent = message;
  $('retryPanoramaButton').hidden = !error;
}

const retryUrl = (url, attempt) => {
  if (!attempt) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}retry=${Date.now()}-${attempt}`;
};

function selectedTargetId() {
  return placing?.type === 'link' ? placing.targetId : $('otherNodeSelect')?.value || null;
}

function renderReferenceAreaSelect() {
  const select = $('referenceAreaSelect');
  select.innerHTML = '';
  workspace.areas.forEach(area => {
    const option = document.createElement('option');
    option.value = area.id;
    option.textContent = area.id === currentAreaId ? `${area.name}（目前場景）` : area.name;
    select.append(option);
  });
  select.value = referenceArea().id;
}

function setLinkTarget(nodeId, startPlacing = true) {
  const target = nodeById(nodeId);
  if (!target || target.id === currentNodeId) {
    $('positionStatus').textContent = '目前場景不能連到自己，請選另一個編號。';
    return;
  }
  $('targetAreaSelect').value = target.areaId;
  referenceAreaId = target.areaId;
  renderTargetNodeOptions(target.id);
  $('otherNodeSelect').value = target.id;
  if (startPlacing) placing = { type: 'link', targetId: target.id };
  renderTargetPreview();
  renderPosition();
  renderLinkControls({ preserveTarget: target.id });
}

function pickReferenceMarker(nodeId) {
  if (activeTab === 'links') {
    setLinkTarget(nodeId);
    return;
  }
  loadNode(nodeId);
}

function progress() {
  const total = workspace.nodes.length;
  $('progressPosition').textContent = `位置 ${workspace.nodes.filter(hasPosition).length}/${total}`;
  $('progressHeading').textContent = `方向 ${workspace.nodes.filter(node => node.headingSet).length}/${total}`;
  $('progressLinks').textContent = `動線 ${workspace.nodes.filter(node => node.links?.length).length}/${total}`;
  $('progressDescriptions').textContent = `介紹 ${workspace.nodes.filter(node => node.description.trim()).length}/${total}`;
  $('progressInfo').textContent = `資訊點 ${workspace.nodes.reduce((sum, node) => sum + (node.infoMarkers?.length || 0), 0)}`;
  const stats = workspace.nodes.map(connectionStats);
  $('progressCrossLinks').textContent = `跨場景動線 ${stats.reduce((sum, item) => sum + item.crossGroup.length, 0)}`;
  $('progressConnectionIssues').textContent = `待補返回 ${stats.reduce((sum, item) => sum + item.missingOutgoing.length, 0)}`;
  $('progressDenseScenes').textContent = `連線過密 ${stats.filter(item => item.dense).length}`;
}

function markDirty() {
  dirty = true;
  workspace.updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
    $('saveState').textContent = '瀏覽器已暫存，尚未正式儲存';
  } catch {
    $('saveState').textContent = '尚未正式儲存（瀏覽器暫存空間不足）';
  }
  progress();
}

function renderAreas() {
  const box = $('areaTabs');
  box.innerHTML = '';
  workspace.areas.forEach(area => {
    const nodes = workspace.nodes.filter(node => node.areaId === area.id);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'area-tab' + (area.id === currentAreaId ? ' is-active' : '');
    const issueCount = nodes.filter(hasConnectionIssue).length;
    button.innerHTML = `<strong>${area.name}</strong><span>${nodes.filter(isLocated).length}/${nodes.length} 已定位 · ${issueCount} 點待檢查</span>`;
    button.onclick = () => selectArea(area.id);
    box.append(button);
  });
}

function renderSceneList() {
  const filter = $('statusFilter').value;
  const nodes = areaNodes().filter(node => {
    if (filter === 'all') return true;
    if (filter === 'done') return isLocated(node);
    if (filter === 'todo') return !isLocated(node);
    const stats = connectionStats(node);
    if (filter === 'connection-issues') return hasConnectionIssue(node);
    if (filter === 'cross-region') return stats.crossGroup.length > 0;
    if (filter === 'dense') return stats.dense;
    return true;
  });
  const box = $('sceneList');
  box.innerHTML = '';
  nodes.forEach(node => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'scene-button' + (node.id === currentNodeId ? ' is-active' : '');
    button.title = node.source.file;
    const stats = connectionStats(node);
    const pending = stats.missingOutgoing.length + stats.missingIncoming.length;
    button.innerHTML = `<span class="scene-number">${node.number}</span><span class="scene-copy"><span class="scene-label">${node.name}</span><span class="scene-link-meta">同 ${stats.sameGroup.length} · 跨 ${stats.crossGroup.length} · 傳入 ${stats.incoming.length} · 待返 ${pending}</span></span><span class="scene-check ${isLocated(node) ? 'is-done' : ''}" aria-label="${isLocated(node) ? '已完成定位' : '尚未完成定位'}">${isLocated(node) ? '●' : '○'}</span>`;
    button.onclick = () => loadNode(node.id);
    box.append(button);
  });
  $('areaSummary').textContent = `${currentArea().name} · ${areaNodes().length} 張`;
}

function renderPosition() {
  const area = referenceArea();
  const node = currentNode();
  const usesSeats = area.mapType === 'seats';
  const isCurrentArea = area.id === currentAreaId;
  const target = nodeById(selectedTargetId());
  const highlightedNodeId = activeTab === 'links' ? target?.id : (isCurrentArea ? node.id : null);
  renderReferenceAreaSelect();
  $('seatMapFrame').hidden = !usesSeats;
  $('planFrame').hidden = usesSeats;
  $('planNote').hidden = usesSeats || !area.planNote;
  $('planNote').textContent = area.planNote || '';
  $('clearPositionButton').hidden = activeTab !== 'position';
  $('clearPositionButton').disabled = !isCurrentArea || !hasPosition(node);

  if (activeTab === 'links') {
    $('referenceModeHint').textContent = '動線模式：直接點圖上的編號即可選為目標；選好後再點環景中的通行方向。';
  } else if (activeTab === 'content') {
    $('referenceModeHint').textContent = '內容模式：空間編號會持續顯示；點編號可直接切換到該場景。';
  } else {
    $('referenceModeHint').textContent = isCurrentArea
      ? '定位模式：點座位或平面圖空白處，設定目前照片的拍攝位置。'
      : '定位模式：目前正在查看其他區域；切回目前場景所在區域後才能修改位置。';
  }

  if (usesSeats) {
    $('positionTitle').textContent = `空間參考 · 初版${area.floor === '1F' ? '一樓' : '二樓'}座位圖`;
    $('positionHelp').textContent = activeTab === 'position'
      ? '點最接近相機腳架位置的座位；紅色數字是已標注的觀看點。'
      : '所有已定位的觀看點編號都保留顯示，可直接比對相鄰位置。';
    if (!seatMap || seatMapAreaId !== area.id) {
      if (seatMap) seatMap.destroy();
      seatMap = createSeatMap($('seatMap'), {
        data: HALL_SEATS,
        floors: [area.floor],
        onSeatClick(seat) {
          if (activeTab !== 'position' || referenceAreaId !== currentAreaId) {
            seatMap.select(null);
            $('positionStatus').textContent = activeTab === 'links'
              ? '請點紅色數字圓點選目標；一般座位不代表拍攝點。'
              : '此分頁只供空間參考；請點已有編號的拍攝點。';
            return;
          }
          const duplicate = referenceNodes().find(item => item.id !== currentNodeId && item.seat === seat.id);
          if (duplicate) {
            $('positionStatus').textContent = `${seat.label}已由點位 ${duplicate.number} 使用，請選擇實際相鄰座位。`;
            seatMap.select(currentNode().seat || null);
            return;
          }
          currentNode().seat = seat.id;
          currentNode().plan = null;
          markDirty();
          renderPosition();
          renderAreas();
          renderSceneList();
        },
      });
      seatMapAreaId = area.id;
    }
    seatMap.setMarkers(
      referenceNodes().filter(item => item.seat).map(item => ({
        id: item.id,
        seatId: item.seat,
        label: item.name,
        n: item.number,
      })),
      marker => pickReferenceMarker(marker.id),
    );
    seatMap.select(activeTab === 'position' && isCurrentArea ? node.seat || null : null);
    seatMap.activeMarker(highlightedNodeId);
    const seat = isCurrentArea && node.seat ? seatMap.get(node.seat) : null;
    $('positionStatus').textContent = activeTab === 'links'
      ? (target ? `已選目標：${area.name} · ${target.number}. ${target.name}` : '請直接點圖上的目標編號')
      : activeTab === 'content'
        ? `${area.name}共有 ${referenceNodes().filter(item => item.seat).length} 個已定位點位`
        : isCurrentArea
          ? (seat ? `已定位：約在${seat.label}` : '尚未定位：請直接點最接近拍攝位置的座位')
          : `僅供參考：${area.name}`;
    return;
  }

  if (seatMap) {
    seatMap.destroy();
    seatMap = null;
    seatMapAreaId = null;
  }
  $('positionTitle').textContent = `空間參考 · ${area.name}平面圖`;
  $('positionHelp').textContent = activeTab === 'position'
    ? '直接點平面圖放置目前照片的編號。'
    : '所有已定位點位編號都保留顯示，可直接比對與選取。';
  const image = $('planImage');
  if (image.dataset.path !== area.plan) {
    image.src = '/data/' + area.plan;
    image.dataset.path = area.plan;
    image.alt = `${area.name}平面圖`;
  }
  const box = $('planMarkers');
  box.innerHTML = '';
  box.classList.toggle('is-dense', referenceNodes().filter(item => item.plan).length > 24);
  referenceNodes().forEach(item => {
    if (!item.plan) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'plan-marker'
      + (item.id === highlightedNodeId ? ' is-active' : '')
      + (activeTab === 'links' ? ' is-pickable' : '');
    button.style.left = item.plan.x * 100 + '%';
    button.style.top = item.plan.y * 100 + '%';
    button.innerHTML = `<span>${item.number}</span>`;
    button.title = item.name;
    button.onclick = event => {
      event.stopPropagation();
      pickReferenceMarker(item.id);
    };
    box.append(button);
  });
  const revealActiveMarker = () => {
    const activeMarker = box.querySelector('.plan-marker.is-active');
    if (!activeMarker) return;
    const frame = $('planFrame');
    const markerCenter = activeMarker.offsetTop + activeMarker.offsetHeight / 2;
    frame.scrollTop = Math.max(0, markerCenter - frame.clientHeight / 2);
  };
  if (image.complete) requestAnimationFrame(revealActiveMarker);
  else image.addEventListener('load', revealActiveMarker, { once: true });
  $('positionStatus').textContent = activeTab === 'links'
    ? (target ? `已選目標：${area.name} · ${target.number}. ${target.name}` : '請直接點圖上的目標編號')
    : activeTab === 'content'
      ? `${area.name}共有 ${referenceNodes().filter(item => item.plan).length} 個已定位點位`
      : isCurrentArea
        ? (node.plan ? `已定位：x ${node.plan.x.toFixed(4)} · y ${node.plan.y.toFixed(4)}` : '尚未定位：請直接點平面圖')
        : `僅供參考：${area.name}`;
}

function renderEntry() {
  const area = currentArea();
  const isEntry = area.entryNode === currentNodeId;
  $('entryNodeButton').textContent = isEntry ? '✓ 本區開場點' : '設為本區開場點';
  $('entryViewButton').disabled = !isEntry;
  $('entryStatus').textContent = !area.entryNode
    ? '本區尚未設定開場點'
    : `開場點：${nodeById(area.entryNode)?.number ?? area.entryNode}${area.entryView ? '，視角已設定' : '，視角尚未設定'}`;
}

async function prepareReturnLink(fromId, toId) {
  await loadNode(fromId);
  switchTab('links');
  setLinkTarget(toId, true);
  const target = nodeById(toId);
  $('placingMessage').textContent = `請在環景中點選通往「${target?.name || toId}」的實際方向，完成返回連線。`;
}

function renderConnectionAudit() {
  const node = currentNode();
  const stats = connectionStats(node);
  $('connectionSame').textContent = stats.sameGroup.length;
  $('connectionCross').textContent = stats.crossGroup.length;
  $('connectionIncoming').textContent = stats.incoming.length;
  $('connectionReciprocal').textContent = stats.reciprocal.length;
  $('connectionMissing').textContent = stats.missingOutgoing.length + stats.missingIncoming.length;

  const alert = $('connectionAlert');
  alert.className = 'connection-alert';
  if (stats.invalid.length) {
    alert.classList.add('is-danger');
    alert.textContent = `有 ${stats.invalid.length} 條連線指向不存在的點位，正式儲存前必須修正。`;
  } else if (stats.missingOutgoing.length || stats.missingIncoming.length) {
    alert.classList.add('is-warning');
    alert.textContent = `有 ${stats.missingOutgoing.length + stats.missingIncoming.length} 個方向缺少返回；請用下方按鈕前往正確場景補標。`;
  } else if (stats.dense) {
    alert.classList.add('is-warning');
    alert.textContent = `目前有 ${stats.validOutgoing.length} 個移動圓點，超過建議的 ${MAX_RECOMMENDED_LINKS} 個；請確認是否只保留實際鄰近與必要跨區路線。`;
  } else if (!stats.validOutgoing.length) {
    alert.classList.add('is-warning');
    alert.textContent = '目前尚未建立任何移動圓點；若此處不是動線終點，請至少連到一個實際相鄰點位。';
  } else {
    alert.textContent = `這個點位的 ${stats.validOutgoing.length} 條連線都有對應返回，方向結構完整。`;
  }

  const byArea = new Map();
  stats.validOutgoing.forEach(({ target }) => {
    const area = areaById(target.areaId);
    byArea.set(area?.name || target.areaId, (byArea.get(area?.name || target.areaId) || 0) + 1);
  });
  $('connectionBreakdown').textContent = byArea.size
    ? `前往區域：${[...byArea].map(([name, count]) => `${name} ${count}`).join('、')}`
    : '前往區域：尚無連線';

  const list = $('returnIssueList');
  list.innerHTML = '';
  stats.missingOutgoing.forEach(({ target }) => {
    const item = document.createElement('div');
    item.className = 'return-issue';
    item.innerHTML = `<div><strong>${areaById(target.areaId)?.name || ''} · ${target.number}. ${target.name}</strong><span>目前可從這裡前往，但對方尚未建立返回。</span></div><button class="button" type="button">前往對方補返回</button>`;
    item.querySelector('button').onclick = () => prepareReturnLink(target.id, node.id);
    list.append(item);
  });
  stats.missingIncoming.forEach(({ source }) => {
    const item = document.createElement('div');
    item.className = 'return-issue';
    item.innerHTML = `<div><strong>${areaById(source.areaId)?.name || ''} · ${source.number}. ${source.name}</strong><span>對方可以前往這裡，但目前場景尚未建立返回。</span></div><button class="button" type="button">現在補返回</button>`;
    item.querySelector('button').onclick = () => beginPlacing({ type: 'link', targetId: source.id });
    list.append(item);
  });
}

function renderLinkControls({ preserveTarget = null } = {}) {
  const nodes = areaNodes();
  const index = nodes.findIndex(node => node.id === currentNodeId);
  $('linkPreviousButton').disabled = index <= 0;
  $('linkNextButton').disabled = index < 0 || index >= nodes.length - 1;
  const areaSelect = $('targetAreaSelect');
  const previousArea = areaSelect.value || currentAreaId;
  areaSelect.innerHTML = '';
  workspace.areas.forEach(area => {
    const option = document.createElement('option');
    option.value = area.id;
    option.textContent = area.id === currentAreaId ? `${area.name}（目前區域）` : area.name;
    areaSelect.append(option);
  });
  areaSelect.value = workspace.areas.some(area => area.id === previousArea) ? previousArea : currentAreaId;
  renderTargetNodeOptions(preserveTarget);
  renderConnectionAudit();

  const list = $('linkList');
  list.innerHTML = '';
  (currentNode().links || []).forEach(link => {
    const target = nodeById(link.to);
    const targetArea = workspace.areas.find(area => area.id === target?.areaId);
    const isReciprocal = Boolean(target?.links?.some(item => item.to === currentNodeId));
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `<div class="list-item-header"><span class="list-item-title">前往 ${target ? `${targetArea?.name || ''} · ${target.number}. ${target.name}` : link.to}</span><span class="list-item-actions"><button class="text-button" type="button" data-action="reposition">重放</button><button class="text-button danger" type="button" data-action="remove">移除</button></span></div><span class="compact-status">${isReciprocal ? '雙向連線已完成' : '尚待從對方場景建立返回連線'} · yaw ${link.yaw.toFixed(2)}° · pitch ${link.pitch.toFixed(2)}°</span>`;
    item.querySelector('[data-action="reposition"]').onclick = () => beginPlacing({ type: 'link', targetId: link.to });
    item.querySelector('[data-action="remove"]').onclick = () => {
      currentNode().links = currentNode().links.filter(item => item.to !== link.to);
      markDirty();
      renderMarkers();
      renderLinkControls();
      renderAreas();
      renderSceneList();
    };
    list.append(item);
  });
  const target = placing?.type === 'link' ? nodeById(placing.targetId) : null;
  $('placingMessage').hidden = !placing;
  $('placingMessage').textContent = placing?.type === 'link'
    ? `現在請點環景中通往「${target?.name || placing.targetId}」的位置。`
    : placing?.type === 'info'
      ? '現在請點環景中要顯示介紹標記的位置。'
      : '';
  renderTargetPreview();
}

function renderTargetNodeOptions(preferredValue = null) {
  const select = $('otherNodeSelect');
  const previousValue = preferredValue || select.value;
  const targetAreaId = $('targetAreaSelect').value;
  select.innerHTML = '';
  workspace.nodes.filter(node => node.areaId === targetAreaId && node.id !== currentNodeId).forEach(node => {
    const option = document.createElement('option');
    option.value = node.id;
    option.textContent = `${node.number}. ${node.name}`;
    select.append(option);
  });
  if ([...select.options].some(option => option.value === previousValue)) select.value = previousValue;
  $('linkOtherButton').disabled = !select.value;
}

function renderTargetPreview() {
  const target = nodeById(selectedTargetId());
  const card = $('targetPreviewCard');
  card.hidden = !target;
  if (!target) return;
  const area = workspace.areas.find(item => item.id === target.areaId);
  $('targetPreviewImage').src = panoramaSrc(target);
  $('targetPreviewImage').alt = `${target.number}. ${target.name}的環景預覽`;
  $('targetPreviewMeta').textContent = `${area?.name || ''} · 點位 ${target.number}`;
  $('targetPreviewName').textContent = target.name;
}

function renderMarkers() {
  markerPlugin.clearMarkers();
  markerPlugin.addMarker(nadirMarker('/repo/assets/img/icon-512.png'));
  (currentNode().links || []).forEach(link => {
    const target = nodeById(link.to);
    markerPlugin.addMarker({
      id: `link-${link.to}`,
      position: { yaw: link.yaw + 'deg', pitch: link.pitch + 'deg' },
      html: `<span class="tour-pin"><span>${target?.number ?? '?'}</span></span>`,
      size: { width: 44, height: 44 },
      anchor: 'center center',
      tooltip: target?.name || link.to,
    });
  });
  (currentNode().infoMarkers || []).forEach(info => {
    markerPlugin.addMarker({
      id: `info-${info.id}`,
      position: { yaw: info.yaw + 'deg', pitch: info.pitch + 'deg' },
      html: '<span class="info-pin">i</span>',
      size: { width: 40, height: 40 },
      anchor: 'center center',
      tooltip: info.title || '資訊點',
    });
  });
}

function renderContent() {
  const node = currentNode();
  $('nameInput').value = node.name;
  $('descriptionInput').value = node.description;
  $('notesInput').value = node.notes || '';
  $('spaceTypeField').hidden = node.areaId !== 'stage-services';
  $('spaceTypeSelect').value = node.spaceType || '待分類';
  const list = $('infoList');
  list.innerHTML = '';
  (node.infoMarkers || []).forEach(info => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `<div class="list-item-header"><span class="list-item-title">${info.title || '未命名資訊點'}</span><span class="list-item-actions"><button class="text-button" type="button" data-action="reposition">重放</button><button class="text-button danger" type="button" data-action="remove">移除</button></span></div><div class="info-fields"><input data-field="title" aria-label="資訊點標題" placeholder="資訊點標題"><textarea data-field="body" rows="3" aria-label="資訊點介紹" placeholder="點擊後顯示的簡短介紹"></textarea></div>`;
    item.querySelector('[data-field="title"]').value = info.title || '';
    item.querySelector('[data-field="body"]').value = info.body || '';
    item.querySelector('[data-field="title"]').oninput = event => {
      info.title = event.target.value;
      item.querySelector('.list-item-title').textContent = info.title || '未命名資訊點';
      markDirty();
    };
    item.querySelector('[data-field="body"]').oninput = event => {
      info.body = event.target.value;
      markDirty();
    };
    item.querySelector('[data-action="reposition"]').onclick = () => beginPlacing({ type: 'info', infoId: info.id });
    item.querySelector('[data-action="remove"]').onclick = () => {
      node.infoMarkers = node.infoMarkers.filter(item => item.id !== info.id);
      markDirty();
      renderMarkers();
      renderContent();
    };
    list.append(item);
  });
}

function renderNode() {
  const node = currentNode();
  $('nodeKicker').textContent = `${currentArea().name} · 點位 ${node.number}`;
  $('nodeTitle').textContent = node.name;
  $('sourceName').textContent = node.source.file;
  $('headingStatus').textContent = node.headingSet ? `圖面上方 ${node.heading}°` : '尚未對齊圖面上方';
  renderAreas();
  renderSceneList();
  renderEntry();
  renderLinkControls();
  renderPosition();
  renderContent();
  renderMarkers();
  progress();
}

async function loadNode(nodeId, { force = false } = {}) {
  const node = nodeById(nodeId);
  if (!node) return;
  const loadToken = ++panoramaLoadToken;
  currentNodeId = node.id;
  currentAreaId = node.areaId;
  referenceAreaId = node.areaId;
  placing = null;
  if ($('targetAreaSelect')) $('targetAreaSelect').value = node.areaId;
  const panorama = panoramaSrc(node);
  renderAreas();
  renderSceneList();
  $('nodeKicker').textContent = `${currentArea().name} · 點位 ${node.number}`;
  $('nodeTitle').textContent = node.name;
  $('sourceName').textContent = node.source.file;
  if (force || panorama !== loadedPanorama) {
    setViewerLoadStatus(`正在載入「${node.name}」…`);
    let loaded = false;
    for (let attempt = 0; attempt <= PANORAMA_RETRIES; attempt += 1) {
      try {
        await viewer.setPanorama(retryUrl(panorama, attempt), { transition: false, caption: node.name });
        if (loadToken !== panoramaLoadToken) return;
        loaded = true;
        break;
      } catch (error) {
        if (loadToken !== panoramaLoadToken) return;
        if (attempt < PANORAMA_RETRIES) {
          setViewerLoadStatus(`載入未完成，正在自動重試「${node.name}」…`);
          await new Promise(resolve => setTimeout(resolve, 350 * (attempt + 1)));
        }
      }
    }
    if (loadToken !== panoramaLoadToken) return;
    if (!loaded) {
      loadedPanorama = '';
      setViewerLoadStatus(`「${node.name}」暫時無法載入，請檢查網路後重新嘗試。`, true);
      renderNode();
      return;
    }
    loadedPanorama = panorama;
  }
  if (loadToken !== panoramaLoadToken) return;
  setViewerLoadStatus();
  viewer.rotate({ yaw: (node.heading || 0) * Math.PI / 180, pitch: 0 });
  renderNode();
}

async function selectArea(areaId) {
  const first = workspace.nodes.find(node => node.areaId === areaId);
  if (first) await loadNode(first.id);
}

function beginPlacing(mode) {
  placing = placing && JSON.stringify(placing) === JSON.stringify(mode) ? null : mode;
  if (placing?.type === 'link') {
    const target = nodeById(placing.targetId);
    if (target) {
      referenceAreaId = target.areaId;
      $('targetAreaSelect').value = target.areaId;
      renderTargetNodeOptions(target.id);
    }
  }
  renderLinkControls();
  renderPosition();
}

function switchTab(tabName) {
  activeTab = tabName;
  document.querySelectorAll('.edit-tab').forEach(button => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.tab-page').forEach(page => {
    const active = page.id === `tab-${tabName}`;
    page.classList.toggle('is-active', active);
    page.hidden = !active;
  });
  if (tabName === 'links') {
    referenceAreaId = $('targetAreaSelect').value || currentAreaId;
  } else {
    referenceAreaId = currentAreaId;
  }
  renderPosition();
  if (tabName === 'links') renderLinkControls();
}

$('statusFilter').onchange = renderSceneList;
document.querySelectorAll('.edit-tab').forEach(button => button.onclick = () => switchTab(button.dataset.tab));
$('previousButton').onclick = () => {
  const nodes = areaNodes();
  const index = nodes.findIndex(node => node.id === currentNodeId);
  loadNode(nodes[(index - 1 + nodes.length) % nodes.length].id);
};
$('nextButton').onclick = () => {
  const nodes = areaNodes();
  const index = nodes.findIndex(node => node.id === currentNodeId);
  loadNode(nodes[(index + 1) % nodes.length].id);
};
$('retryPanoramaButton').onclick = () => loadNode(currentNodeId, { force: true });
$('headingButton').onclick = () => {
  currentNode().heading = degree(viewer.getPosition().yaw * 180 / Math.PI);
  currentNode().headingSet = true;
  markDirty();
  renderNode();
};
$('entryNodeButton').onclick = () => {
  const area = currentArea();
  area.entryNode = currentNodeId;
  area.entryView = null;
  markDirty();
  renderEntry();
};
$('entryViewButton').onclick = () => {
  const position = viewer.getPosition();
  currentArea().entryView = {
    yaw: +(position.yaw * 180 / Math.PI).toFixed(2),
    pitch: +(position.pitch * 180 / Math.PI).toFixed(2),
  };
  markDirty();
  renderEntry();
};
$('planFrame').onclick = event => {
  if (activeTab !== 'position' || referenceAreaId !== currentAreaId) return;
  if (event.target !== $('planImage') && event.target !== $('planMarkers')) return;
  const rect = $('planImage').getBoundingClientRect();
  currentNode().plan = {
    x: fixed(Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))),
    y: fixed(Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))),
  };
  currentNode().seat = null;
  markDirty();
  renderPosition();
  renderAreas();
  renderSceneList();
};
$('clearPositionButton').onclick = () => {
  if (activeTab !== 'position' || referenceAreaId !== currentAreaId) return;
  currentNode().plan = null;
  currentNode().seat = null;
  markDirty();
  renderPosition();
  renderAreas();
  renderSceneList();
};
$('linkPreviousButton').onclick = () => {
  const nodes = areaNodes();
  const index = nodes.findIndex(node => node.id === currentNodeId);
  if (index > 0) beginPlacing({ type: 'link', targetId: nodes[index - 1].id });
};
$('linkNextButton').onclick = () => {
  const nodes = areaNodes();
  const index = nodes.findIndex(node => node.id === currentNodeId);
  if (index < nodes.length - 1) beginPlacing({ type: 'link', targetId: nodes[index + 1].id });
};
$('targetAreaSelect').onchange = () => {
  referenceAreaId = $('targetAreaSelect').value;
  placing = null;
  renderTargetNodeOptions();
  renderTargetPreview();
  renderPosition();
};
$('otherNodeSelect').onchange = () => {
  placing = null;
  renderTargetPreview();
  renderPosition();
};
$('linkOtherButton').onclick = () => beginPlacing({ type: 'link', targetId: $('otherNodeSelect').value });
$('referenceAreaSelect').onchange = () => {
  referenceAreaId = $('referenceAreaSelect').value;
  if (activeTab === 'links') {
    $('targetAreaSelect').value = referenceAreaId;
    placing = null;
    renderTargetNodeOptions();
    renderTargetPreview();
  }
  renderPosition();
};
$('toggleReferenceButton').onclick = () => {
  const body = $('referenceBody');
  const expanded = $('toggleReferenceButton').getAttribute('aria-expanded') === 'true';
  body.hidden = expanded;
  $('toggleReferenceButton').setAttribute('aria-expanded', String(!expanded));
  $('toggleReferenceButton').textContent = expanded ? '展開' : '收合';
};
$('addInfoButton').onclick = () => {
  switchTab('content');
  beginPlacing({ type: 'info', infoId: null });
};
$('nameInput').oninput = event => {
  currentNode().name = event.target.value;
  $('nodeTitle').textContent = event.target.value;
  markDirty();
  renderSceneList();
};
$('spaceTypeSelect').onchange = event => {
  currentNode().spaceType = event.target.value;
  markDirty();
};
$('descriptionInput').oninput = event => {
  currentNode().description = event.target.value;
  markDirty();
};
$('notesInput').oninput = event => {
  currentNode().notes = event.target.value;
  markDirty();
};

viewer.addEventListener('click', event => {
  if (!placing) return;
  const yaw = +(event.data.yaw * 180 / Math.PI).toFixed(2);
  const pitch = +(event.data.pitch * 180 / Math.PI).toFixed(2);
  const node = currentNode();
  if (placing.type === 'link') {
    const link = { to: placing.targetId, yaw, pitch };
    node.links = node.links || [];
    const index = node.links.findIndex(item => item.to === placing.targetId);
    if (index >= 0) node.links[index] = link;
    else node.links.push(link);
  } else if (placing.type === 'info') {
    node.infoMarkers = node.infoMarkers || [];
    if (placing.infoId) {
      const info = node.infoMarkers.find(item => item.id === placing.infoId);
      if (info) Object.assign(info, { yaw, pitch });
    } else {
      node.infoMarkers.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, yaw, pitch, title: '', body: '' });
    }
  }
  placing = null;
  markDirty();
  renderMarkers();
  renderLinkControls();
  renderContent();
  renderAreas();
  renderSceneList();
});

$('saveButton').onclick = async () => {
  const button = $('saveButton');
  button.disabled = true;
  button.textContent = '儲存中…';
  try {
    const response = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workspace),
    });
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || result.errors?.join('；') || '未知錯誤');
    dirty = false;
    localStorage.removeItem(STORAGE_KEY);
    $('saveState').textContent = `已正式儲存 · ${new Date(result.savedAt).toLocaleTimeString('zh-TW')}`;
  } catch (error) {
    $('saveState').textContent = '儲存失敗：' + error.message;
  } finally {
    button.disabled = false;
    button.textContent = '正式儲存';
  }
};

const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  try {
    const restored = JSON.parse(saved);
    if (restored.nodes?.length === workspace.nodes.length && confirm('偵測到上次尚未正式儲存的內容，要先復原嗎？')) {
      Object.assign(workspace, restored);
      dirty = true;
      $('saveState').textContent = '已復原瀏覽器暫存，尚未正式儲存';
    } else if (restored.nodes?.length !== workspace.nodes.length) {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}
if (!dirty) $('saveState').textContent = '尚未有變更';

addEventListener('beforeunload', event => {
  if (dirty) {
    event.preventDefault();
    event.returnValue = '';
  }
});
addEventListener('keydown', event => {
  if (event.altKey && event.key === 'ArrowLeft') $('previousButton').click();
  if (event.altKey && event.key === 'ArrowRight') $('nextButton').click();
});

viewer.addEventListener('ready', () => {
  loadedPanorama = panoramaSrc(workspace.nodes[0]);
  setViewerLoadStatus();
  loadNode(currentNodeId);
}, { once: true });
