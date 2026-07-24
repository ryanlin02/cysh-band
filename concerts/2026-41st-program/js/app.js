/**
 * 第 41 屆嘉義高中校友暨在校生聯合音樂會《為伍》線上節目冊 - 主邏輯腳本
 */

import { concertData } from '../data/concert-41st.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeControl();
  initNavigation();
  renderHeroAndOverview();
  renderProgramNotes();
  renderTeamAndLeadership();
  renderMusicianAndStaffRoster();
  renderThanksAndHeritage();
});

/* ==========================================================================
   1. 暗光音樂廳主題模式 (Dark Hall Mode) 控制
   ========================================================================== */
function initThemeControl() {
  const themeBtn = document.getElementById('theme-toggle-btn');

  if (localStorage.getItem('cysh_dark_mode') === 'true') {
    document.body.classList.add('dark-mode');
    themeBtn?.classList.add('active');
  }

  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeBtn.classList.toggle('active', isDark);
    localStorage.setItem('cysh_dark_mode', isDark);
  });
}

/* ==========================================================================
   2. 底部導覽列切換邏輯 (App Bottom Navigation)
   ========================================================================== */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const pageSections = document.querySelectorAll('.page-section');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      pageSections.forEach(sec => {
        if (sec.id === targetId) {
          sec.classList.add('active');
        } else {
          sec.classList.remove('active');
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* ==========================================================================
   3. 渲染首頁 Hero 海報與團長的話 (正確 7111 照片 + 100% 全寬舒適閱讀內文)
   ========================================================================== */
function renderHeroAndOverview() {
  const container = document.getElementById('sec-home');
  if (!container) return;

  const { info, presidentMessage } = concertData;

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

    <!-- 團長的話 (盧宓承 團長 7111 - 頂部 Header + 100% 全寬內文，告別擠壓) -->
    <div class="card">
      <div class="person-card-header">
        <div class="person-avatar-mini">
          <img src="${presidentMessage.photo}" alt="${presidentMessage.author}" loading="lazy">
        </div>
        <div class="person-header-info">
          <div class="person-header-top">
            <h2 class="person-title-name">${presidentMessage.title}</h2>
            <span class="pure-number-tag">${presidentMessage.number}</span>
          </div>
          <div class="person-header-role">${presidentMessage.author} ｜ ${presidentMessage.subtitle}</div>
        </div>
      </div>

      <div class="person-full-bio">
        ${presidentMessage.content.map(p => `<p class="p-text">${p}</p>`).join('')}
      </div>
    </div>

    <!-- 觀演禮儀提醒 -->
    <div class="card" style="background: var(--bg-secondary);">
      <h3 style="font-family: var(--font-serif); font-size: 1.05rem; margin-bottom: 8px;">觀演禮儀提醒</h3>
      <ul style="font-size: 0.88rem; color: var(--text-secondary); padding-left: 18px; line-height: 1.65;">
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
      <p class="section-subtitle">點擊曲目卡片可展開詳細樂曲導賞</p>
    </div>

    <div class="tab-switcher">
      <button class="tab-btn active" id="tab-btn-1">上半場 (Part I)</button>
      <button class="tab-btn" id="tab-btn-2">下半場 (Part II)</button>
    </div>

    <div id="program-list-container"></div>
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
              <div class="track-title-zh">${track.titleZh}</div>
              <div class="track-title-en">${track.title}</div>
              <div class="track-composer">${track.composer} ${track.arranger ? ` / arr. ${track.arranger}` : ''}</div>
              ${track.soloist ? `<div style="margin-top: 6px; font-size: 0.8rem; font-weight: 700; color: var(--accent-gold);">🌟 獨奏：${track.soloist}</div>` : ''}
            </div>
            <svg class="track-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <div class="track-detail-content">
            ${notesHtml}
          </div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.track-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('open');
      });
    });
  };

  renderList(firstHalf);

  tab1.addEventListener('click', () => {
    tab1.classList.add('active');
    tab2.classList.remove('active');
    renderList(firstHalf);
  });

  tab2.addEventListener('click', () => {
    tab2.classList.add('active');
    tab1.classList.remove('active');
    renderList(secondHalf);
  });
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
      <div class="card">
        <div class="person-card-header">
          <div class="person-avatar-mini">
            <img src="${c.photo}" alt="${c.name}" loading="lazy">
          </div>
          <div class="person-header-info">
            <div class="person-header-top">
              <h3 class="person-title-name">${c.name}</h3>
              <span class="pure-number-tag">${c.number}</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 2px;">
              <span class="person-header-role">${c.role}</span>
              <a href="${c.officialLink}" target="_blank" rel="noopener" class="inline-ext-link">
                <span>官網人物誌</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            </div>
          </div>
        </div>

        <div class="person-full-bio">
          ${c.bio.map(p => `<p class="p-text">${p}</p>`).join('')}
        </div>
      </div>
    `).join('')}

    <!-- 2. 獨奏介紹 -->
    <div class="section-group-title">
      <span>小號獨奏</span>
      <span class="en">Trumpet Soloist</span>
    </div>

    ${soloist.map(s => `
      <div class="card">
        <div class="person-card-header">
          <div class="person-avatar-mini">
            <img src="${s.photo}" alt="${s.name}" loading="lazy">
          </div>
          <div class="person-header-info">
            <div class="person-header-top">
              <h3 class="person-title-name">${s.name}</h3>
              <span class="pure-number-tag">${s.number}</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 2px;">
              <span class="person-header-role">${s.role}</span>
              <a href="${s.officialLink}" target="_blank" rel="noopener" class="inline-ext-link">
                <span>官網人物誌</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            </div>
          </div>
        </div>

        <div class="person-full-bio">
          ${s.bio.map(p => `<p class="p-text">${p}</p>`).join('')}
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
    <div class="card" style="background: var(--bg-secondary);">
      <h3 class="card-title-serif" style="border-bottom: none; margin-bottom: 6px;">追蹤嘉中管樂官方頻道</h3>
      <p class="p-text" style="font-size: 0.85rem; margin-bottom: 14px;">歡迎前往官方網站與社群媒體觀看更多歷史檔案與影音</p>
      
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <a href="https://cysh.band" target="_blank" rel="noopener" class="btn-primary" style="background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border-color); justify-content: space-between;">
          <span>嘉中管樂官方網站 (cysh.band)</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
        <a href="https://www.facebook.com/cyshband/" target="_blank" rel="noopener" class="btn-primary" style="background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border-color); justify-content: space-between;">
          <span>Facebook 粉絲專頁</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
        <a href="https://www.instagram.com/cyshband_95th" target="_blank" rel="noopener" class="btn-primary" style="background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border-color); justify-content: space-between;">
          <span>Instagram (@cyshband_95th)</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
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
