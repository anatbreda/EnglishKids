/*
 * profiles.js — מסך בחירת פרופיל (תמיכה בכמה ילדים על אותו מחשב).
 */
window.ScreenProfiles = (function () {
  'use strict';

  var manageMode = false;

  function progressText(profile) {
    var total = window.LessonData.totalLessons();
    var done = 0;
    for (var i = 1; i <= total; i++) {
      if (profile.lessons[String(i)] && profile.lessons[String(i)].completed) done++;
    }
    if (done === 0) return 'עוד לא התחיל/ה — קדימה!';
    if (done === total) return 'סיים/ה את כל ' + total + ' השיעורים! 🏆';
    return 'סיים/ה ' + done + ' מתוך ' + total + ' שיעורים';
  }

  function rowHtml(profile, isActive) {
    var manage = manageMode
      ? '<div class="tiny-actions">' +
        '<button type="button" class="link-btn" data-reset="' + profile.id + '">אפס התקדמות</button>' +
        '<button type="button" class="link-btn danger" data-delete="' + profile.id + '">מחיקה</button>' +
        '</div>'
      : '';

    return (
      '<div>' +
      '<button type="button" class="profile-row ' + (isActive ? 'active' : '') +
      '" data-profile="' + profile.id + '">' +
      window.Characters.svg(profile.characterId, { items: profile.items, className: 'avatar' }) +
      '<span class="meta">' +
      '<span class="name">' + window.UI.escapeHtml(profile.childName) + '</span><br>' +
      '<span class="detail">עם ' + window.UI.escapeHtml(profile.characterName) + ' · ' +
      progressText(profile) + '</span>' +
      '</span>' +
      '</button>' +
      manage +
      '</div>'
    );
  }

  function render() {
    var profiles = window.Storage.getProfiles();
    var active = window.Storage.getActiveProfile();

    if (!profiles.length) {
      window.UI.go('#/new');
      return;
    }

    var body =
      '<div class="brand">' +
      '<h1>English Kids</h1>' +
      '<div class="sub">קורס אנגלית קטן ונחמד — 8 שיעורים</div>' +
      '</div>' +
      '<h2 class="center">מי לומד/ת עכשיו?</h2>' +
      '<div class="profile-list">' +
      profiles.map(function (p) { return rowHtml(p, active && p.id === active.id); }).join('') +
      '</div>' +
      '<div class="stack" style="margin-top:18px">' +
      '<button type="button" class="btn btn-accent btn-block btn-lg" id="add-profile">➕ הוספת ילד/ה</button>' +
      '<div class="center">' +
      '<button type="button" class="link-btn" id="toggle-manage">' +
      (manageMode ? 'סיום ניהול' : 'ניהול פרופילים') +
      '</button>' +
      '</div>' +
      '</div>';

    window.UI.mount({ topbar: '', body: body });

    window.UI.$$('[data-profile]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.Storage.setActiveProfile(btn.getAttribute('data-profile'));
        window.UI.go('#/path');
      });
    });

    window.UI.$$('[data-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-delete');
        var p = window.Storage.getProfiles().filter(function (x) { return x.id === id; })[0];
        if (!p) return;
        if (window.confirm('למחוק את הפרופיל של ' + p.childName + '? כל ההתקדמות תימחק.')) {
          window.Storage.deleteProfile(id);
          render();
        }
      });
    });

    window.UI.$$('[data-reset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-reset');
        var p = window.Storage.getProfiles().filter(function (x) { return x.id === id; })[0];
        if (!p) return;
        if (window.confirm('לאפס את ההתקדמות של ' + p.childName + ' ולהתחיל מחדש?')) {
          window.Storage.resetProfileProgress(id);
          render();
        }
      });
    });

    window.UI.$('#add-profile').addEventListener('click', function () {
      window.UI.go('#/new');
    });

    window.UI.$('#toggle-manage').addEventListener('click', function () {
      manageMode = !manageMode;
      render();
    });
  }

  return { render: render };
})();
