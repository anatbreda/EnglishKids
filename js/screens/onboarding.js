/*
 * onboarding.js — כניסה ראשונה: שם הילד/ה, בחירת דמות מלווה ומתן שם לדמות.
 */
window.ScreenOnboarding = (function () {
  'use strict';

  var draft = { childName: '', characterId: null, characterName: '' };
  var step = 1;

  var NAME_IDEAS = ['פלאפי', 'ניצוץ', 'בובו', 'ג׳ינג׳י', 'קוקי', 'שוקו', 'ענן', 'מיצי'];

  function reset() {
    draft = { childName: '', characterId: null, characterName: '' };
    step = 1;
  }

  /* ------------------------------ שלב 1 ------------------------------ */

  function renderName() {
    var body =
      '<div class="brand"><h1>ברוכים הבאים!</h1>' +
      '<div class="sub">בואו נכיר לפני שמתחילים</div></div>' +
      '<div class="card stack">' +
      '<label class="field" for="child-name">איך קוראים לך?</label>' +
      '<input type="text" id="child-name" maxlength="20" autocomplete="off" ' +
      'placeholder="השם שלי" value="' + window.UI.escapeHtml(draft.childName) + '">' +
      '<button type="button" class="btn btn-accent btn-block btn-lg" id="next">קדימה ›</button>' +
      '</div>' +
      (window.Storage.getProfiles().length
        ? '<div class="center" style="margin-top:12px">' +
          '<button type="button" class="link-btn" id="back-profiles">חזרה לרשימת הילדים</button></div>'
        : '');

    window.UI.mount({ body: body });

    var input = window.UI.$('#child-name');
    input.focus();

    function submit() {
      draft.childName = input.value.trim();
      if (!draft.childName) {
        input.focus();
        return;
      }
      step = 2;
      render();
    }

    window.UI.$('#next').addEventListener('click', submit);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') submit();
    });

    var back = window.UI.$('#back-profiles');
    if (back) {
      back.addEventListener('click', function () { window.UI.go('#/profiles'); });
    }
  }

  /* ------------------------------ שלב 2 ------------------------------ */

  function renderCharacter() {
    var grid = window.Characters.list
      .map(function (c) {
        return (
          '<button type="button" class="character-pick ' +
          (draft.characterId === c.id ? 'selected' : '') + '" data-char="' + c.id + '">' +
          window.Characters.svg(c.id, {}) +
          '<span class="label">' + c.nameHe + '</span>' +
          '</button>'
        );
      })
      .join('');

    var body =
      '<h1 class="center">היי ' + window.UI.escapeHtml(draft.childName) + '!</h1>' +
      '<p class="center muted">בחר/י חבר/ה שילמד/תלמד איתך אנגלית</p>' +
      '<div class="character-grid">' + grid + '</div>' +
      '<div class="stack" style="margin-top:18px">' +
      '<button type="button" class="btn btn-accent btn-block btn-lg" id="next" ' +
      (draft.characterId ? '' : 'disabled') + '>בחרתי! ›</button>' +
      '<div class="center"><button type="button" class="link-btn" id="back">חזרה</button></div>' +
      '</div>';

    window.UI.mount({ body: body });

    window.UI.$$('[data-char]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        draft.characterId = btn.getAttribute('data-char');
        renderCharacter();
      });
    });

    window.UI.$('#next').addEventListener('click', function () {
      if (!draft.characterId) return;
      step = 3;
      render();
    });

    window.UI.$('#back').addEventListener('click', function () {
      step = 1;
      render();
    });
  }

  /* ------------------------------ שלב 3 ------------------------------ */

  function renderCharacterName() {
    var ch = window.Characters.get(draft.characterId);
    var ideas = window.UI.sample(NAME_IDEAS, 4)
      .map(function (n) {
        return '<button type="button" class="btn btn-ghost" data-idea="' + n + '">' + n + '</button>';
      })
      .join('');

    var body =
      '<div class="card center stack">' +
      '<div style="width:150px;margin:0 auto">' + window.Characters.svg(ch.id, {}) + '</div>' +
      '<h2>איך תרצה/י לקרוא ל' + ch.nameHe + '?</h2>' +
      '<input type="text" id="buddy-name" maxlength="16" autocomplete="off" ' +
      'placeholder="שם לחבר/ה החדש/ה" value="' + window.UI.escapeHtml(draft.characterName) + '">' +
      '<div class="btn-row">' + ideas + '</div>' +
      '<button type="button" class="btn btn-green btn-block btn-lg" id="start">מתחילים ללמוד! 🎒</button>' +
      '<button type="button" class="link-btn" id="back">חזרה לבחירת דמות</button>' +
      '</div>';

    window.UI.mount({ body: body });

    var input = window.UI.$('#buddy-name');
    input.focus();

    window.UI.$$('[data-idea]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        input.value = btn.getAttribute('data-idea');
        input.focus();
      });
    });

    function start() {
      draft.characterName = input.value.trim() || ch.nameHe;
      window.Storage.createProfile(draft.childName, draft.characterId, draft.characterName);
      reset();
      window.UI.go('#/path');
    }

    window.UI.$('#start').addEventListener('click', start);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') start();
    });

    window.UI.$('#back').addEventListener('click', function () {
      step = 2;
      render();
    });
  }

  function render() {
    if (step === 2) renderCharacter();
    else if (step === 3) renderCharacterName();
    else renderName();
  }

  return { render: render, reset: reset };
})();
