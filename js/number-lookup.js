/* 編號查詢小遊戲 */
document.addEventListener('DOMContentLoaded', function () {
  var root = document.getElementById('number-lookup');
  if (!root || !window.NUMBER_LOOKUP) return;

  var labels = ['第一碼', '第二碼', '第三碼', '第四碼'];
  var values = [8, 8, 6, 1];
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reels = Array.prototype.slice.call(root.querySelectorAll('.slot-reel'));
  var result = document.getElementById('number-result');
  var random = document.getElementById('number-random');
  var byNum = {};
  var photoByNum = {};

  window.NUMBER_LOOKUP.forEach(function (person) {
    if (person.num) byNum[person.num] = person;
  });

  /* 交叉比對 data/alumni.js：若此編號在校友名錄有真實大頭照（非 blank），查詢結果旁可顯示照片 */
  (window.ALUMNI || []).forEach(function (a) {
    if (a.num && a.photo && a.photo !== 'blank') photoByNum[a.num] = a.photo;
  });

  function padNum() {
    return values.join('');
  }

  function setDigit(index, value, direction) {
    var oldValue = values[index];
    values[index] = (value + 10) % 10;
    renderDigits(index, direction || (values[index] > oldValue ? 1 : -1));
    renderResult();
  }

  function setNumber(num, animate) {
    var clean = String(num || '').replace(/\D/g, '').slice(0, 4);
    while (clean.length < 4) clean = '0' + clean;
    var oldValues = values.slice();
    values = clean.split('').map(function (d) { return parseInt(d, 10); });
    renderDigits(animate ? -1 : null, 1, oldValues);
    renderResult();
  }

  function bump(index, delta) {
    setDigit(index, values[index] + delta, delta > 0 ? 1 : -1);
  }

  function renderDigits(activeIndex, direction, oldValues) {
    reels.forEach(function (reel, index) {
      var value = reel.querySelector('.slot-value');
      if (!value) return;
      var current = values[index];
      var previous = oldValues ? oldValues[index] : parseInt(value.dataset.value || value.textContent || current, 10);
      var dir = direction || 1;
      value.dataset.value = current;
      value.setAttribute('aria-label', labels[index] + '，目前為 ' + values[index]);
      if (reduced || (activeIndex !== index && activeIndex !== -1) || previous === current) {
        value.textContent = current;
        return;
      }
      var first = dir > 0 ? previous : current;
      var second = dir > 0 ? current : previous;
      value.innerHTML =
        '<span class="slot-window" aria-hidden="true">' +
          '<span class="slot-track ' + (dir > 0 ? 'roll-up' : 'roll-down') + '">' +
            '<span>' + first + '</span>' +
            '<span>' + second + '</span>' +
          '</span>' +
        '</span>';
      var track = value.querySelector('.slot-track');
      if (track) {
        track.addEventListener('animationend', function () {
          value.textContent = current;
          value.dataset.value = current;
        }, { once: true });
      }
    });
  }

  function metaFor(person) {
    var items = [];
    if (person.year != null) items.push('民國 ' + person.year + ' 年入學');
    if (person.part) items.push(person.part);
    if (person.officerRole && !/(社長|隊長|幹部)/.test(person.part || '')) items.push(person.officerRole);
    return items.join('．');
  }

  function renderResult() {
    var num = padNum();
    var person = byNum[num];
    if (!result) return;

    if (!person) {
      result.className = 'lookup-result is-empty';
      result.innerHTML =
        '<p class="result-num">' + num + '</p>' +
        '<h3>目前公開名冊查無此編號</h3>' +
        '<p>可能尚未收錄、資料仍待整理，或這組編號並未出現在公開查詢資料中。</p>';
      return;
    }

    var photo = photoByNum[person.num];
    result.className = 'lookup-result is-found' + (photo ? ' has-photo' : '');
    result.innerHTML =
      '<div class="result-text">' +
        '<p class="result-num">' + person.num + '</p>' +
        '<h3>' + person.name + '</h3>' +
        '<p class="result-meta">' + metaFor(person) + '</p>' +
      '</div>' +
      (photo ? '<img class="result-avatar" src="assets/img/members/' + photo + '.webp" alt="' + person.name + '" loading="lazy">' : '');
  }

  reels.forEach(function (reel, index) {
    var startY = null;

    var valueButton = reel.querySelector('.slot-value');
    if (valueButton) {
      valueButton.addEventListener('click', function () { bump(index, 1); });
      valueButton.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
          event.preventDefault();
          bump(index, 1);
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
          event.preventDefault();
          bump(index, -1);
        }
      });
    }

    reel.addEventListener('wheel', function (event) {
      event.preventDefault();
      bump(index, event.deltaY < 0 ? 1 : -1);
    }, { passive: false });

    reel.addEventListener('pointerdown', function (event) {
      startY = event.clientY;
      reel.setPointerCapture(event.pointerId);
    });
    reel.addEventListener('pointerup', function (event) {
      if (startY == null) return;
      var diff = event.clientY - startY;
      startY = null;
      if (Math.abs(diff) < 18) return;
      bump(index, diff < 0 ? 1 : -1);
    });
  });

  if (random) {
    random.addEventListener('click', function () {
      var list = window.NUMBER_LOOKUP.filter(function (person) { return person.num; });
      if (!list.length) return;
      setNumber(list[Math.floor(Math.random() * list.length)].num, true);
    });
  }

  renderDigits();
  renderResult();
});
