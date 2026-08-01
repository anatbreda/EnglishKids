/*
 * ui.js — עזרי ממשק משותפים: רינדור מסכים, כפתורי השמעה, משוב ועוד.
 */
window.UI = (function () {
  'use strict';

  var root = null;

  function appRoot() {
    if (!root) root = document.getElementById('app');
    return root;
  }

  function $(sel, scope) {
    return (scope || appRoot()).querySelector(sel);
  }

  function $$(sel, scope) {
    return Array.prototype.slice.call((scope || appRoot()).querySelectorAll(sel));
  }

  function escapeHtml(text) {
    return String(text == null ? '' : text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /** ערבוב מערך (Fisher–Yates) — מחזיר עותק חדש. */
  function shuffle(list) {
    var out = (list || []).slice();
    for (var i = out.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = out[i];
      out[i] = out[j];
      out[j] = tmp;
    }
    return out;
  }

  /** בוחר עד n פריטים אקראיים מתוך רשימה. */
  function sample(list, n) {
    return shuffle(list).slice(0, n);
  }

  /* --------------------------- רינדור מסך --------------------------- */

  /**
   * @param {{topbar?: string, body: string}} parts
   */
  function mount(parts) {
    window.Audio2.cancel();
    window.Speech.stop();
    appRoot().innerHTML = (parts.topbar || '') + '<main class="screen">' + parts.body + '</main>';
    appRoot().scrollTop = 0;
    window.scrollTo(0, 0);
  }

  /*
   * חץ חזרה כ-SVG ולא כתו טקסט: תווי חץ עוברים היפוך אוטומטי בהקשר RTL,
   * וכך מובטח שהחץ תמיד מצביע ימינה — כיוון ה"חזרה" בממשק עברי.
   */
  var BACK_ARROW =
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" ' +
    'stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M9 5l7 7-7 7"/></svg>';

  /** בונה סרגל עליון: כפתור חזרה (אופציונלי) + צ'יפ הדמות. */
  function topbar(opts) {
    opts = opts || {};
    var left = opts.backHref
      ? '<a class="icon-btn" href="' + opts.backHref + '" aria-label="חזרה">' + BACK_ARROW + '</a>'
      : '<span style="min-width:48px"></span>';

    var chip = '';
    if (opts.profile) {
      chip =
        '<div class="buddy-chip">' +
        window.Characters.svg(opts.profile.characterId, {
          items: opts.profile.items,
          className: 'avatar'
        }) +
        '<span class="buddy-name">' + escapeHtml(opts.profile.characterName) + '</span>' +
        '</div>';
    }

    return '<div class="topbar">' + left + '<span class="spacer"></span>' + chip + '</div>';
  }

  /* --------------------------- כפתור השמעה --------------------------- */

  /**
   * כפתור שמקריא טקסט באנגלית. ההאזנה מטופלת ב-delegation גלובלי למטה.
   */
  function speakButton(text, label, extraClass) {
    return (
      '<button type="button" class="speak-btn ' + (extraClass || '') + '" data-speak="' +
      escapeHtml(text) + '">' +
      '<span class="ico" aria-hidden="true">🔊</span>' +
      '<span>' + escapeHtml(label || 'שמע') + '</span>' +
      '</button>'
    );
  }

  var speakingBtn = null;

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-speak]') : null;
    if (!btn) return;
    var text = btn.getAttribute('data-speak');
    if (!text) return;

    if (speakingBtn) speakingBtn.classList.remove('speaking');
    speakingBtn = btn;
    btn.classList.add('speaking');
    window.Audio2.speak(text, {
      onEnd: function () {
        btn.classList.remove('speaking');
        if (speakingBtn === btn) speakingBtn = null;
      }
    });
  });

  /* --------------------------- אייקונים --------------------------- */

  function wordArt(wordId, className) {
    return window.WordIcons.svg(wordId, { className: className || 'word-icon' });
  }

  /* --------------------------- משוב --------------------------- */

  /**
   * הודעת משוב אחרי ניסיון יחיד. אף פעם לא מענישה — רק מראה את התשובה הנכונה.
   * @param {boolean} correct
   * @param {{answerEn?: string, answerHe?: string, buddyName?: string}} info
   */
  function feedbackHtml(correct, info) {
    info = info || {};
    if (correct) {
      var praise = ['כל הכבוד!', 'מעולה!', 'יופי!', 'נכון מאוד!', 'איזה יופי!'];
      var pick = praise[Math.floor(Math.random() * praise.length)];
      var who = info.buddyName ? escapeHtml(info.buddyName) + ' אומר/ת: ' : '';
      return (
        '<div class="feedback good"><span class="fb-icon" aria-hidden="true">🎉</span>' +
        '<span>' + who + pick + '</span></div>'
      );
    }

    var answer = '';
    if (info.answerEn) {
      answer =
        '<span class="fb-answer">התשובה הנכונה: <span class="en">' +
        escapeHtml(info.answerEn) + '</span>' +
        (info.answerHe ? ' — ' + escapeHtml(info.answerHe) : '') +
        '</span>';
    }
    return (
      '<div class="feedback almost"><span class="fb-icon" aria-hidden="true">💡</span>' +
      '<span>כמעט! ' + answer + '</span></div>'
    );
  }

  /* --------------------------- מד התקדמות --------------------------- */

  function stageBar(total, currentIndex) {
    var dots = '';
    for (var i = 0; i < total; i++) {
      var cls = i < currentIndex ? 'done' : i === currentIndex ? 'active' : '';
      dots += '<span class="stage-dot ' + cls + '"></span>';
    }
    return '<div class="stage-bar">' + dots + '</div>';
  }

  function meter(value, total) {
    var pct = total > 0 ? Math.round((value / total) * 100) : 0;
    return '<span class="meter"><span style="width:' + pct + '%"></span></span>';
  }

  /* --------------------------- ניווט --------------------------- */

  function go(hash) {
    if (window.location.hash === hash) {
      window.dispatchEvent(new Event('hashchange'));
    } else {
      window.location.hash = hash;
    }
  }

  return {
    $: $,
    $$: $$,
    escapeHtml: escapeHtml,
    shuffle: shuffle,
    sample: sample,
    mount: mount,
    topbar: topbar,
    backArrow: BACK_ARROW,
    speakButton: speakButton,
    wordArt: wordArt,
    feedbackHtml: feedbackHtml,
    stageBar: stageBar,
    meter: meter,
    go: go
  };
})();
