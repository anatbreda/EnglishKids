/*
 * review.js — תרגול המילים שהוחמצו, מתוך "המסלול שלי".
 *
 * מילה שנענתה נכון כאן יורדת מרשימת החזרה. מילה שהוחמצה שוב נשארת ברשימה,
 * ואפשר לתרגל אותה בסבב הבא — בלי חסימה ובלי ניסיון חוזר באותו רגע.
 */
window.ScreenReview = (function () {
  'use strict';

  var UI = window.UI;

  function render() {
    var profile = window.Storage.getActiveProfile();
    if (!profile) {
      UI.go('#/profiles');
      return;
    }

    var queue = UI.shuffle(window.Storage.getMissedWordIds()).filter(function (id) {
      return !!window.LessonData.getWord(id);
    });

    if (!queue.length) {
      UI.mount({
        topbar: UI.topbar({ profile: profile, backHref: '#/path' }),
        body:
          '<div class="card empty-state">' +
          '<h2>אין מילים לחזרה 🎉</h2>' +
          '<p>כל המילים שלמדת נמצאות בכיס!</p>' +
          '<button type="button" class="btn btn-block" id="back">חזרה למסלול שלי</button>' +
          '</div>'
      });
      UI.$('#back').addEventListener('click', function () { UI.go('#/path'); });
      return;
    }

    var index = 0;
    var learned = 0;
    var stillMissed = 0;

    function shell(inner) {
      UI.mount({
        topbar: UI.topbar({ profile: profile, backHref: '#/path' }),
        body:
          '<h2 class="center">חזרה על מילים</h2>' +
          '<div id="review-body">' + inner + '</div>'
      });
    }

    function distractorsFor(answerId) {
      var pool = window.WordIcons.ids().filter(function (id) {
        return id !== answerId && !!window.LessonData.getWord(id);
      });
      return UI.sample(pool, 3);
    }

    function draw() {
      var w = window.LessonData.getWord(queue[index]);
      var options = UI.shuffle([w.id].concat(distractorsFor(w.id)));

      shell(
        '<div class="q-counter">מילה ' + (index + 1) + ' מתוך ' + queue.length + '</div>' +
        '<div class="card center stack">' +
        '<div class="word-en en" style="font-size:2rem">' + UI.escapeHtml(w.en) + '</div>' +
        UI.speakButton(w.audioText || w.en, 'שמע שוב') +
        '</div>' +
        '<p class="center muted" style="margin-top:12px">איזו תמונה מתאימה למילה?</p>' +
        '<div class="choice-grid">' +
        options
          .map(function (id) {
            return '<button type="button" class="choice" data-pick="' + id + '">' +
              window.WordIcons.svg(id) + '</button>';
          })
          .join('') +
        '</div>' +
        '<div id="fb" style="margin-top:16px"></div>'
      );

      window.Audio2.speak(w.audioText || w.en);

      UI.$$('[data-pick]').forEach(function (btn) {
        btn.addEventListener('click', function () { answer(btn, w); }, { once: true });
      });
    }

    function answer(btn, w) {
      var correct = btn.getAttribute('data-pick') === w.id;

      UI.$$('[data-pick]').forEach(function (el) {
        el.disabled = true;
        if (el.getAttribute('data-pick') === w.id) el.classList.add('correct');
        else if (el === btn) el.classList.add('wrong');
        else el.classList.add('dimmed');
      });

      if (correct) {
        learned++;
        window.Storage.clearMissedWord(w.id);
        window.Audio2.chimeCorrect();
      } else {
        stillMissed++;
        window.Audio2.chimeGentle();
      }

      UI.$('#fb').innerHTML =
        UI.feedbackHtml(correct, {
          answerEn: correct ? null : w.en,
          answerHe: correct ? null : w.he,
          buddyName: profile.characterName
        }) +
        '<button type="button" class="btn btn-block btn-lg" id="next" style="margin-top:12px">' +
        (index + 1 < queue.length ? 'הבא ›' : 'סיימנו! ›') + '</button>';

      UI.$('#next').addEventListener('click', function () {
        index++;
        if (index < queue.length) draw();
        else finish();
      });
    }

    function finish() {
      window.Audio2.chimeFinish();
      shell(
        '<div class="card center stack">' +
        '<div style="width:120px;margin:0 auto">' +
        window.Characters.svg(profile.characterId, { items: profile.items }) +
        '</div>' +
        '<h2>סיימת את החזרה!</h2>' +
        '<p>' + learned + ' מילים ירדו מרשימת החזרה' +
        (stillMissed ? ', ו-' + stillMissed + ' מחכות לסבב הבא' : '') + '.</p>' +
        '<button type="button" class="btn btn-block btn-lg" id="back">חזרה למסלול שלי</button>' +
        '</div>'
      );
      UI.$('#back').addEventListener('click', function () { UI.go('#/path'); });
    }

    draw();
  }

  return { render: render };
})();
