/*
 * app.js — טעינת התוכן וניתוב בין המסכים (hash routing).
 */
(function () {
  'use strict';

  var ready = false;

  function showLoading() {
    document.getElementById('app').innerHTML =
      '<main class="screen center" style="padding-top:60px">' +
      '<h1>English Kids</h1><p class="muted">טוען את השיעורים…</p></main>';
  }

  function showError(err) {
    document.getElementById('app').innerHTML =
      '<main class="screen">' +
      '<div class="card stack">' +
      '<h2>אופס, התוכן לא נטען</h2>' +
      '<p class="muted">' + window.UI.escapeHtml(err && err.message ? err.message : String(err)) + '</p>' +
      '<p class="muted">אם פתחתם את הקובץ ישירות מהמחשב, ודאו שקובץ ' +
      '<code>data/lessons.bundle.js</code> קיים (אפשר ליצור אותו עם ' +
      '<code>node tools/build-lessons.js</code>).</p>' +
      '<button type="button" class="btn btn-block" onclick="location.reload()">רענון</button>' +
      '</div></main>';
  }

  function route() {
    if (!ready) return;

    var hash = window.location.hash || '';
    var parts = hash.replace(/^#\/?/, '').split('/');
    var name = parts[0] || '';

    if (name === 'profiles') {
      window.ScreenProfiles.render();
      return;
    }
    if (name === 'new') {
      window.ScreenOnboarding.render();
      return;
    }
    if (name === 'path') {
      window.ScreenPath.render();
      return;
    }
    if (name === 'review') {
      window.ScreenReview.render();
      return;
    }
    if (name === 'lesson') {
      window.ScreenLesson.render(Number(parts[1]));
      return;
    }

    // ברירת מחדל: לפי מצב הנתונים
    if (!window.Storage.getProfiles().length) {
      window.ScreenOnboarding.reset();
      window.UI.go('#/new');
    } else if (window.Storage.getActiveProfile()) {
      window.UI.go('#/path');
    } else {
      window.UI.go('#/profiles');
    }
  }

  function start() {
    showLoading();
    window.LessonData.loadAll()
      .then(function () {
        ready = true;
        route();
      })
      .catch(showError);
  }

  window.addEventListener('hashchange', route);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
