/*
 * path.js — "המסלול שלי": רשימת השיעורים, אוסף הפריטים של הדמות,
 * וכניסה לתרגול המילים שהוחמצו.
 */
window.ScreenPath = (function () {
  'use strict';

  function greeting(profile, nextId, allDone) {
    if (allDone) return 'סיימת את כל הקורס! אפשר לחזור על כל שיעור שרוצים 🏆';
    if (nextId === 1) return 'היי ' + profile.childName + '! מתחילים בשיעור הראשון?';
    return 'כל הכבוד ' + profile.childName + '! ממשיכים לשיעור ' + nextId + '?';
  }

  function lessonNodeHtml(lesson, state) {
    var result = window.Storage.getLessonResult(lesson.lessonId);
    var scoreLine = '';
    if (result && result.completed) {
      var got = result.wordsRemembered + result.sentencesUnderstood;
      var max = result.wordsTotal + result.sentencesTotal;
      scoreLine = '<div class="lesson-score">✓ הושלם · ' + got + '/' + max + ' תשובות נכונות</div>';
    }

    var badge = state === 'locked' ? '🔒' : state === 'done' ? '✓' : String(lesson.lessonId);
    var tag = state === 'locked' ? 'div' : 'button';
    var attrs = state === 'locked'
      ? ''
      : ' type="button" data-lesson="' + lesson.lessonId + '"';

    return (
      '<' + tag + ' class="lesson-node ' + state + '"' + attrs + '>' +
      '<span class="lesson-badge">' + badge + '</span>' +
      '<span class="lesson-info">' +
      '<span class="t-he">' + window.UI.escapeHtml(lesson.titleHe) + '</span><br>' +
      '<span class="t-en en">' + window.UI.escapeHtml(lesson.title) + '</span>' +
      scoreLine +
      '</span>' +
      '</' + tag + '>'
    );
  }

  function itemsStripHtml(profile) {
    return window.Characters.items
      .map(function (item, index) {
        var owned = profile.items.indexOf(item.id) !== -1;
        return (
          '<span class="item-pill ' + (owned ? '' : 'locked') + '">' +
          (owned ? '★ ' : '🔒 ') + item.nameHe +
          (owned ? '' : ' (שיעור ' + (index + 1) + ')') +
          '</span>'
        );
      })
      .join('');
  }

  function render() {
    var profile = window.Storage.getActiveProfile();
    if (!profile) {
      window.UI.go('#/profiles');
      return;
    }

    var lessons = window.LessonData.allLessons();
    var total = window.LessonData.totalLessons();
    var nextId = window.Storage.nextLessonId(total);
    var allDone = window.Storage.isLessonCompleted(total);

    var nodes = lessons
      .map(function (lesson) {
        var state;
        if (!window.Storage.isLessonUnlocked(lesson.lessonId)) state = 'locked';
        else if (window.Storage.isLessonCompleted(lesson.lessonId)) state = 'done';
        else state = 'current';
        return lessonNodeHtml(lesson, state);
      })
      .join('');

    var missed = window.Storage.getMissedWordIds();
    var missedCard = missed.length
      ? '<div class="card stack">' +
        '<h3>מילים לחזרה (' + missed.length + ')</h3>' +
        '<div class="missed-grid">' +
        missed.slice(0, 8).map(function (id) {
          var w = window.LessonData.getWord(id);
          if (!w) return '';
          return (
            '<div class="missed-chip">' + window.UI.wordArt(id) +
            '<div class="w en">' + window.UI.escapeHtml(w.en) + '</div></div>'
          );
        }).join('') +
        '</div>' +
        '<button type="button" class="btn btn-accent btn-block" id="go-review">בוא/י נתרגל אותן 🔁</button>' +
        '</div>'
      : '<div class="card center"><h3>מילים לחזרה</h3>' +
        '<p class="muted">אין כרגע מילים לחזרה — כל הכבוד!</p></div>';

    var body =
      '<div class="path-hero">' +
      window.Characters.svg(profile.characterId, { items: profile.items, className: 'avatar' }) +
      '<div class="hero-text">' +
      '<div class="bubble">' + window.UI.escapeHtml(greeting(profile, nextId, allDone)) + '</div>' +
      '</div>' +
      '</div>' +
      '<h2 style="margin-top:18px">המסלול שלי</h2>' +
      '<div class="lesson-list">' + nodes + '</div>' +
      '<div style="margin-top:18px">' + missedCard + '</div>' +
      '<div class="card stack" style="margin-top:14px">' +
      '<h3>האוסף של ' + window.UI.escapeHtml(profile.characterName) + '</h3>' +
      '<div class="items-strip">' + itemsStripHtml(profile) + '</div>' +
      '</div>';

    window.UI.mount({
      topbar: window.UI.topbar({ profile: profile, backHref: '#/profiles' }),
      body: body
    });

    window.UI.$$('[data-lesson]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.UI.go('#/lesson/' + btn.getAttribute('data-lesson'));
      });
    });

    var review = window.UI.$('#go-review');
    if (review) {
      review.addEventListener('click', function () { window.UI.go('#/review'); });
    }
  }

  return { render: render };
})();
