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
  var galleryImgs = document.querySelectorAll('.gallery-grid figure img:not(.album-cover), .concert-item .poster img, .news-article figure img');
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
    '.section, .card, .tl-item, .concert-item, .way, .stat, .concert-banner, .featured, .gallery-grid figure, blockquote, .num-demo .digit'
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
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
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
