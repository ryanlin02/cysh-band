/**
 * 嘉中管樂線上節目冊共用介面。
 * 各屆資料由頁面自己的 data/*.js 寫入 window.CONCERT_PROGRAM_DATA。
 */

const concertData = window.CONCERT_PROGRAM_DATA;

document.addEventListener('DOMContentLoaded', () => {
  if (!concertData) {
    throw new Error('Missing window.CONCERT_PROGRAM_DATA.');
  }
  initProgramBookMetadata();
  initThemeControl();
  initShareControl();
  initNavigation();
  renderHeroAndOverview();
  renderProgramNotes();
  renderTeamAndLeadership();
  renderMusicianAndStaffRoster();
  renderThanksAndHeritage();
});

function initProgramBookMetadata() {
  const { info } = concertData;
  const title = document.getElementById('program-book-title');
  const shareBtn = document.getElementById('share-btn');
  if (title) title.textContent = info.headerTitle || `${info.concertNo}｜《${info.title}》`;
  if (shareBtn) {
    shareBtn.setAttribute('aria-label', `分享${info.concertNo}《${info.title}》線上節目冊`);
  }
}

/* ==========================================================================
   1. 暗光音樂廳主題模式 (Dark Hall Mode) 控制
   ========================================================================== */
function initThemeControl() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  let savedDarkMode = false;

  try {
    savedDarkMode = localStorage.getItem('cysh_dark_mode') === 'true';
  } catch (error) {
    savedDarkMode = false;
  }

  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
    themeBtn?.classList.add('active');
  }
  themeBtn?.setAttribute('aria-pressed', String(savedDarkMode));

  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeBtn.classList.toggle('active', isDark);
    themeBtn.setAttribute('aria-pressed', String(isDark));
    try {
      localStorage.setItem('cysh_dark_mode', String(isDark));
    } catch (error) {
      /* 無法使用本機儲存時，夜間模式仍可在本次瀏覽中正常切換。 */
    }
  });
}

function showShareToast(message) {
  const toast = document.getElementById('share-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showShareToast.timer);
  showShareToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

async function copyPageUrl(url) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(url);
    return;
  }

  const input = document.createElement('textarea');
  input.value = url;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand('copy');
  input.remove();
  if (!copied) throw new Error('Copy command failed.');
}

function initShareControl() {
  const shareBtn = document.getElementById('share-btn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: document.title,
      text: `${concertData.info.concertNo}《${concertData.info.title}》線上節目冊`,
      url: shareUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await copyPageUrl(shareUrl);
      showShareToast('此裝置未提供分享選單，已複製網頁連結');
    } catch (error) {
      if (error && error.name === 'AbortError') return;
      try {
        await copyPageUrl(shareUrl);
        showShareToast('已複製網頁連結');
      } catch (copyError) {
        showShareToast('無法開啟分享功能，請複製瀏覽器網址');
      }
    }
  });
}

/* ==========================================================================
   2. 底部導覽列切換邏輯 (App Bottom Navigation)
   ========================================================================== */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const pageSections = document.querySelectorAll('.page-section');

  const activateSection = (targetId, updateUrl = true) => {
    const matchedItem = Array.from(navItems).find(item => item.getAttribute('data-target') === targetId);
    if (!matchedItem) return;

    navItems.forEach(item => {
      const isActive = item === matchedItem;
      item.classList.toggle('active', isActive);
      if (isActive) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });

    pageSections.forEach(section => {
      section.classList.toggle('active', section.id === targetId);
    });

    if (updateUrl) history.replaceState(null, '', `#${targetId}`);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => activateSection(item.getAttribute('data-target')));
  });

  const initialTarget = window.location.hash.slice(1);
  activateSection(document.getElementById(initialTarget) ? initialTarget : 'sec-home', false);
}

function normalizeTitles(track) {
  if (Array.isArray(track.titles) && track.titles.length) return track.titles;
  return [
    track.titleZh ? { lang: 'zh-Hant', text: track.titleZh } : null,
    track.title ? { lang: 'en', text: track.title } : null
  ].filter(Boolean);
}

function creditText(value) {
  if (!value) return '';
  return Array.isArray(value) ? value.join('／') : value;
}

function renderTrackTitles(track, compact = false) {
  return normalizeTitles(track).map((title, index) => `
    <div class="${compact ? 'program-overview-title' : 'track-title'} ${index === 0 ? 'primary' : 'secondary'}" lang="${title.lang || ''}">${title.text}</div>
  `).join('');
}

function renderTrackCredits(track, compact = false) {
  const rows = [
    track.composer ? ['作曲', creditText(track.composer)] : null,
    track.arranger ? ['編曲', creditText(track.arranger)] : null
  ].filter(Boolean);
  const className = compact ? 'program-overview-credits' : 'track-credit-list';
  return `<div class="${className}">${rows.map(([label, value]) => `<span><b>${label}</b>${value}</span>`).join('')}</div>`;
}

function renderProgramOverview(program) {
  const halves = [
    ['上半場', 'Part I', program.firstHalf],
    ['下半場', 'Part II', program.secondHalf]
  ];

  return `
    <div class="card program-overview-card">
      <div class="program-overview-heading">
        <h3>演出曲目</h3>
        <span>PROGRAM</span>
      </div>
      ${halves.map(([label, english, tracks]) => `
        <section class="program-overview-half" aria-label="${label}">
          <h4>${label}<span>${english}</span></h4>
          <ol class="program-overview-list">
            ${tracks.map(track => `
              <li>
                <span class="program-overview-number">${String(track.no).padStart(2, '0')}</span>
                <div>
                  ${renderTrackTitles(track, true)}
                  ${renderTrackCredits(track, true)}
                </div>
              </li>
            `).join('')}
          </ol>
        </section>
      `).join('')}
    </div>
  `;
}

/* ==========================================================================
   3. 渲染首頁 Hero 海報與團長的話 (正確 7111 照片 + 100% 全寬舒適閱讀內文)
   ========================================================================== */
function renderHeroAndOverview() {
  const container = document.getElementById('sec-home');
  if (!container) return;

  const { info, presidentMessage, program } = concertData;

  container.innerHTML = `
    <!-- 海報大圖 -->
    <div class="poster-card">
      <img src="${info.posterUrl}" alt="${info.concertNo}《${info.title}》演出海報" class="poster-img">
    </div>

    <!-- 演出主題與極緻美感手機標題分層 -->
    <div class="hero-meta-block">
      <h1 class="hero-title-main">《${info.title}》</h1>
      <p class="hero-en-sub">${info.titleEnglish}</p>
      <p class="hero-zh-desc">${info.concertNo}</p>
      
      <div class="meta-divider"></div>

      <div class="meta-info-row">
        <div class="meta-info-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span>${info.date} (${info.dayOfWeek}) ${info.time}</span>
        </div>
        <div class="meta-info-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>${info.venue}</span>
        </div>
      </div>
    </div>

    <!-- 團長的話 -->
    <div class="card person-card president-card">
      <div class="person-card-header">
        <div class="person-avatar-mini">
          <img src="${presidentMessage.photo}" alt="${presidentMessage.author}" loading="lazy">
        </div>
        <div class="person-header-info">
          <div class="person-card-kicker">${presidentMessage.title}</div>
          <div class="person-header-top president-name-row">
            <div class="person-name-line">
              <h2 class="person-title-name">${presidentMessage.name || presidentMessage.author}</h2>
              <span class="person-number-inline">${presidentMessage.number}</span>
            </div>
            ${renderPersonProfileLink(presidentMessage.officialLink, presidentMessage.name || presidentMessage.author)}
          </div>
          <div class="person-header-meta">
            <div class="person-header-role">${presidentMessage.role || '團長'}<span class="meta-separator">｜</span>${presidentMessage.subtitle}</div>
          </div>
        </div>
      </div>

      <div class="person-full-bio">
        ${presidentMessage.content.map(p => `<p class="p-text">${p}</p>`).join('')}
      </div>
    </div>

    ${renderProgramOverview(program)}

    <!-- 觀演小提醒 -->
    <div class="card etiquette-card">
      <h3>觀演小提醒</h3>
      <ul>
        <li>演出前請將行動電話轉為靜音或關機。</li>
        <li>演出進行中請勿拍照、錄音、錄影。</li>
        <li>憑票入場，自由入座，請配合現場工作人員指引。</li>
      </ul>
    </div>
  `;
}

/* ==========================================================================
   4. 渲染曲目解說
   ========================================================================== */
function renderProgramNotes() {
  const container = document.getElementById('sec-program');
  if (!container) return;

  const { firstHalf, secondHalf } = concertData.program;

  container.innerHTML = `
    <div class="section-header">
      <span class="section-kicker">Repertoire & Notes</span>
      <h2 class="section-title">曲目解說</h2>
      <p class="section-subtitle">曲目資訊與樂曲導賞完整呈現，可直接向下閱讀</p>
    </div>

    <div class="tab-switcher" role="tablist" aria-label="選擇上半場或下半場曲目">
      <button class="tab-btn active" id="tab-btn-1" type="button" role="tab" aria-selected="true">上半場 (Part I)</button>
      <button class="tab-btn" id="tab-btn-2" type="button" role="tab" aria-selected="false">下半場 (Part II)</button>
    </div>

    <div id="program-list-container" aria-live="polite"></div>
  `;

  const tab1 = document.getElementById('tab-btn-1');
  const tab2 = document.getElementById('tab-btn-2');
  const listContainer = document.getElementById('program-list-container');

  const renderList = (tracks) => {
    listContainer.innerHTML = tracks.map(track => {
      const notesHtml = Array.isArray(track.note)
        ? track.note.map(p => `<p class="p-text">${p}</p>`).join('')
        : `<p class="p-text">${track.note}</p>`;

      return `
        <div class="card track-card" data-track-id="${track.no}">
          <div class="track-header">
            <div class="track-no">${String(track.no).padStart(2, '0')}</div>
            <div class="track-info">
              ${renderTrackTitles(track)}
              ${renderTrackCredits(track)}
              <div class="track-meta-row">
                ${track.soloist ? `<span><b>獨奏</b>${track.soloist}</span>` : ''}
                ${track.duration ? `<span><b>演奏時間</b>${track.duration}</span>` : ''}
              </div>
            </div>
          </div>

          <div class="track-detail-content">
            ${notesHtml}
          </div>
        </div>
      `;
    }).join('');
  };

  renderList(firstHalf);

  tab1.addEventListener('click', () => {
    tab1.classList.add('active');
    tab2.classList.remove('active');
    tab1.setAttribute('aria-selected', 'true');
    tab2.setAttribute('aria-selected', 'false');
    renderList(firstHalf);
  });

  tab2.addEventListener('click', () => {
    tab2.classList.add('active');
    tab1.classList.remove('active');
    tab2.setAttribute('aria-selected', 'true');
    tab1.setAttribute('aria-selected', 'false');
    renderList(secondHalf);
  });
}

function renderPersonProfileLink(url, name = '') {
  if (!url) return '';
  return `
    <a href="${url}" target="_blank" rel="noopener" class="inline-ext-link profile-link" aria-label="查看${name}的人物誌">
      <span>人物誌</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
    </a>
  `;
}

function renderPersonBio(bio) {
  if (!bio) return '';
  if (typeof bio === 'string') return `<p class="p-text">${bio}</p>`;
  if (Array.isArray(bio)) return `<p class="p-text">${bio.join('')}</p>`;
  return `<p class="p-text">${[bio.career, bio.concert].filter(Boolean).join('')}</p>`;
}

/* ==========================================================================
   5. 渲染「團隊與獨奏」 (頂部 Header + 100% 全寬內文，徹底消弭空白與擠壓)
   ========================================================================== */
function renderTeamAndLeadership() {
  const container = document.getElementById('sec-people');
  if (!container) return;

  const { conductors, soloist, ensembles } = concertData.leadership;

  container.innerHTML = `
    <div class="section-header">
      <span class="section-kicker">Leadership & Ensembles</span>
      <h2 class="section-title">團隊與獨奏</h2>
      <p class="section-subtitle">音樂會指揮、小號獨奏與演出團隊介紹</p>
    </div>

    <!-- 1. 指揮介紹 -->
    <div class="section-group-title" style="margin-top: 0;">
      <span>樂團指揮</span>
      <span class="en">Conductors</span>
    </div>

    ${conductors.map(c => `
      <div class="card person-card">
        <div class="person-card-header">
          <div class="person-avatar-mini">
            <img src="${c.photo}" alt="${c.name}" loading="lazy">
          </div>
          <div class="person-header-info">
            <div class="person-header-top">
              <h3 class="person-title-name">${c.name}</h3>
              <span class="person-number-inline">${c.number}</span>
            </div>
            <div class="person-header-meta">
              <span class="person-header-role">${c.role}</span>
              ${renderPersonProfileLink(c.officialLink, c.name)}
            </div>
          </div>
        </div>

        <div class="person-full-bio">
          ${renderPersonBio(c.bio)}
        </div>
      </div>
    `).join('')}

    <!-- 2. 獨奏介紹 -->
    <div class="section-group-title">
      <span>小號獨奏</span>
      <span class="en">Trumpet Soloist</span>
    </div>

    ${soloist.map(s => `
      <div class="card person-card">
        <div class="person-card-header">
          <div class="person-avatar-mini">
            <img src="${s.photo}" alt="${s.name}" loading="lazy">
          </div>
          <div class="person-header-info">
            <div class="person-header-top">
              <h3 class="person-title-name">${s.name}</h3>
              <span class="person-number-inline">${s.number}</span>
            </div>
            <div class="person-header-meta">
              <span class="person-header-role">${s.role}</span>
              ${renderPersonProfileLink(s.officialLink, s.name)}
            </div>
          </div>
        </div>

        <div class="person-full-bio">
          ${renderPersonBio(s.bio)}
        </div>
      </div>
    `).join('')}

    <!-- 3. 樂團團隊介紹 (嘉中校友管樂團 & 嘉中管樂社) -->
    <div class="section-group-title">
      <span>演出團隊介紹</span>
      <span class="en">Ensembles</span>
    </div>

    ${ensembles.map(ens => `
      <div class="card">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 6px;">
          <div>
            <h3 class="card-title-serif" style="margin-bottom: 2px; padding-bottom: 0; border-bottom: none;">${ens.title}</h3>
            <p style="font-family: var(--font-number); font-size: 0.82rem; color: var(--accent-gold);">${ens.subtitle}</p>
          </div>
          <a href="${ens.officialLink}" target="_blank" rel="noopener" class="inline-ext-link">
            <span>官網介紹</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        </div>
        <div style="border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 6px;">
          ${ens.content.map(p => `<p class="p-text">${p}</p>`).join('')}
        </div>
      </div>
    `).join('')}
  `;
}

/* ==========================================================================
   6. 渲染演出人員名冊
   ========================================================================== */
function renderMusicianAndStaffRoster() {
  const container = document.getElementById('sec-roster');
  if (!container) return;

  const { roster, organization } = concertData;

  container.innerHTML = `
    <div class="section-header">
      <span class="section-kicker">Musicians & Staff</span>
      <h2 class="section-title">演出與工作人員名冊</h2>
      <p class="section-subtitle">全體上台演奏團員與幕後籌備團隊</p>
    </div>

    <!-- 上台演出名冊 -->
    ${roster.map(sec => `
      <div class="roster-section-block">
        <h3 class="section-group-title">
          <span>${sec.sectionZh}</span>
          <span class="en">${sec.section}</span>
        </h3>
        <div class="roster-grid">
          ${sec.members.map(m => `
            <div class="roster-pill">
              <span class="roster-pill-name">${m.name}</span>
              <span class="roster-pill-num">${m.number}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}

    <!-- 工作人員名冊 -->
    <div style="margin-top: 32px;">
      <div class="section-header" style="text-align: left; margin-bottom: 12px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--text-primary); border-bottom: 2px solid var(--accent-gold-border); padding-bottom: 6px;">
          ${organization.staffTitle}
        </h3>
      </div>

      <div class="staff-grid">
        ${organization.staffGroups.map(group => `
          <div class="staff-item">
            <div class="staff-role">${group.role}</div>
            <div class="staff-names">${group.names.join('、')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ==========================================================================
   7. 渲染特別感謝與社群導流
   ========================================================================== */
function renderThanksAndHeritage() {
  const container = document.getElementById('sec-about');
  if (!container) return;

  const { organization } = concertData;

  container.innerHTML = `
    <div class="section-header">
      <span class="section-kicker">Acknowledgements & Channels</span>
      <h2 class="section-title">特別感謝與社群</h2>
      <p class="section-subtitle">感謝致謝名單與官方媒體連結</p>
    </div>

    <!-- 特別感謝 -->
    <div class="card">
      <h3 class="card-title-serif">${organization.thanksTitle}</h3>
      <ul class="thanks-list">
        ${organization.thanksList.map(item => `
          <li class="thanks-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <!-- 官方頻道與社群導流 -->
    <div class="card channel-card">
      <h3 class="card-title-serif channel-heading">追蹤嘉中管樂官方頻道</h3>
      <p class="p-text channel-intro">歡迎前往官方網站與社群媒體觀看更多歷史檔案與影音</p>
      
      <div class="channel-list">
        <a href="https://cysh.band" class="channel-link">
          <svg class="channel-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.4 2.5 3.7 5.5 3.7 9S14.4 18.5 12 21c-2.4-2.5-3.7-5.5-3.7-9S9.6 5.5 12 3Z"></path></svg>
          <span>嘉中管樂官方網站 <small>cysh.band</small></span>
          <svg class="channel-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
        </a>
        <a href="https://www.facebook.com/cyshband/" target="_blank" rel="noopener" class="channel-link">
          <svg class="channel-icon brand-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7.6v3h2.8v8h3.2Z"></path></svg>
          <span>Facebook 粉絲專頁</span>
          <svg class="channel-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
        </a>
        <a href="https://www.instagram.com/cyshband_95th" target="_blank" rel="noopener" class="channel-link">
          <svg class="channel-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><path d="M17.6 6.4h.01"></path></svg>
          <span>Instagram <small>@cyshband_95th</small></span>
          <svg class="channel-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
        </a>
      </div>
    </div>

    <!-- 電子問卷連結按鈕 -->
    <div class="card" style="text-align: center;">
      <h3 class="card-title-serif" style="border-bottom: none; margin-bottom: 4px;">現場演出意見回饋</h3>
      <p class="p-text" style="font-size: 0.85rem; margin-bottom: 14px;">您的寶貴建議是樂團持續前行最大的動力</p>
      <a href="${organization.feedbackUrl}" target="_blank" rel="noopener" class="btn-primary" style="margin: 0 auto;">
        <span>填寫電子問卷</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
      </a>
    </div>

    <div class="footer-credits">
      <p>© 2026 嘉義高中校友管樂團 ✕ 國立嘉義高級中學管樂社</p>
      <p style="margin-top: 4px; font-size: 0.78rem;">第 41 屆《為伍》線上節目冊</p>
    </div>
  `;
}
