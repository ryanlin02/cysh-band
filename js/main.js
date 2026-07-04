/* 嘉義高中管樂隊官方網站 — 互動效果 */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 閱讀進度條 ---------- */
  var bar = document.createElement('div');
  bar.className = 'progress-bar';
  document.body.appendChild(bar);

  /* ---------- 回到頂端 ---------- */
  var top = document.createElement('button');
  top.className = 'to-top';
  top.setAttribute('aria-label', '回到頂端');
  top.innerHTML = '↑';
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); });
  document.body.appendChild(top);

  /* ---------- 演出倒數 ---------- */
  document.querySelectorAll('[data-countdown]').forEach(function (el) {
    var target = new Date(el.getAttribute('data-countdown') + 'T00:00:00+08:00');
    var days = Math.ceil((target - new Date()) / 86400000);
    if (days > 1) el.innerHTML = '距離演出還有 <b>' + days + '</b> 天';
    else if (days === 1) el.innerHTML = '明天就是演出日！';
    else if (days === 0) el.innerHTML = '就是今天，音樂廳見！';
    else el.innerHTML = '演出圓滿落幕，感謝蒞臨';
  });

  /* ---------- 漢堡選單 ---------- */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* ---------- Lightbox（影像館） ---------- */
  var galleryImgs = document.querySelectorAll('.gallery-grid figure img:not(.album-cover), .news-article figure img, .page-head .ph-poster img');
  if (galleryImgs.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<img alt=""><p class="lb-caption"></p>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.lb-caption');
    galleryImgs.forEach(function (img) {
      img.addEventListener('click', function () {
        lbImg.src = img.dataset.full || img.src;
        lbImg.alt = img.alt || '';
        var cap = img.closest('figure') && img.closest('figure').querySelector('figcaption');
        lbCap.textContent = cap ? cap.textContent : (img.alt || '');
        lb.classList.add('show');
      });
    });
    lb.addEventListener('click', function () { lb.classList.remove('show'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('show'); });
  }

  /* ---------- 導覽列陰影 + 進度 + 回頂按鈕 ---------- */
  function onScroll() {
    var y = window.scrollY;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('scrolled', y > 8);
    top.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 捲動漸入 ---------- */
  var targets = document.querySelectorAll(
    '.section, .card, .tl-item, .concert-item, .archive-tags span, .concerts-metrics div, .way, .stat, .concert-banner, .featured, .gallery-grid figure, blockquote, .num-demo .digit'
  );
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('reveal', 'in'); });
  } else {
    targets.forEach(function (el) { el.classList.add('reveal'); });
    /* 同一群組內的元素做交錯延遲 */
    document.querySelectorAll('.cards, .stats, .two-way, .gallery-grid, .num-demo').forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (el, i) {
        var t = el.classList.contains('reveal') ? el : el.querySelector('.reveal');
        if (t) t.style.setProperty('--d', Math.min(i * 0.08, 0.5) + 's');
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    targets.forEach(function (el) { io.observe(el); });

    /* 保險機制：部分行動瀏覽器（尤其舊版 iOS Safari）對 IntersectionObserver 的支援不穩定，
       曾發生區塊永遠停留在淡入前的透明狀態、導致內容「消失」的情形。捲動與縮放視窗時
       額外用座標檢查一次，確保任何進入可視範圍的區塊一定會顯示出來。 */
    function revealVisible() {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }
    window.addEventListener('scroll', revealVisible, { passive: true });
    window.addEventListener('resize', revealVisible);
    revealVisible();
  }

  /* ---------- 錨點跳轉：目標卡片略過淡入動畫直接顯示（如 people.html#p-7581） ---------- */
  if (location.hash) {
    var hashEl = document.querySelector(location.hash);
    if (hashEl) hashEl.classList.add('in');
  }

  /* ---------- 數字滾動（首頁 stats） ---------- */
  var nums = document.querySelectorAll('.stat b');
  if (nums.length && !reduced && 'IntersectionObserver' in window) {
    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        nio.unobserve(e.target);
        var raw = e.target.textContent.trim();
        var m = raw.match(/^(\d+)(.*)$/);
        if (!m) return;
        var end = parseInt(m[1], 10), suffix = m[2] || '';
        var dur = 1400, t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3); /* easeOutCubic */
          e.target.textContent = Math.round(end * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else e.target.textContent = raw;
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { nio.observe(el); });
  }
});
