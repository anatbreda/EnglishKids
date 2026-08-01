/*
 * data.js — טעינת תוכן השיעורים ובניית בנק המילים.
 *
 * מקור האמת לתוכן הוא קבצי ה-JSON שב-data/. כשהאתר רץ משרת (GitHub Pages,
 * localhost) הם נטענים ישירות ב-fetch, כך שעריכת קובץ JSON משנה מיד את התוכן.
 *
 * כשפותחים את index.html כקובץ מקומי (file://) הדפדפן חוסם fetch, ולכן קיים
 * גיבוי: data/lessons.bundle.js — עותק של אותם קבצים כמשתנה JS.
 * אחרי עריכת תוכן יש להריץ `node tools/build-lessons.js` כדי לרענן אותו.
 */
window.LessonData = (function () {
  'use strict';

  var TOTAL_LESSONS = 8;

  var lessons = null;    // מערך לפי סדר השיעורים
  var wordBank = null;   // id -> אובייקט מילה
  var loadPromise = null;

  function fetchJson(url) {
    return fetch(url, { cache: 'no-cache' }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status + ' עבור ' + url);
      return res.json();
    });
  }

  function fromBundle() {
    var bundle = window.__LESSON_BUNDLE__;
    if (!bundle || !bundle.lessons) {
      throw new Error('לא נמצא תוכן שיעורים (גם לא בקובץ הגיבוי lessons.bundle.js)');
    }
    return {
      lessons: bundle.lessons.slice(),
      extraWords: (bundle.extraWords && bundle.extraWords.words) || []
    };
  }

  function fromNetwork() {
    var urls = [];
    for (var i = 1; i <= TOTAL_LESSONS; i++) urls.push('data/lesson-' + i + '.json');
    urls.push('data/extra-words.json');

    return Promise.all(urls.map(fetchJson)).then(function (all) {
      var extra = all.pop();
      return { lessons: all, extraWords: (extra && extra.words) || [] };
    });
  }

  function buildWordBank(payload) {
    var bank = {};
    payload.lessons.forEach(function (lesson) {
      lesson.newWords.forEach(function (w) {
        if (!bank[w.id]) bank[w.id] = w;
      });
    });
    payload.extraWords.forEach(function (w) {
      if (!bank[w.id]) bank[w.id] = w;
    });
    return bank;
  }

  function ingest(payload) {
    payload.lessons.sort(function (a, b) { return a.lessonId - b.lessonId; });
    lessons = payload.lessons;
    wordBank = buildWordBank(payload);
    return { lessons: lessons, wordBank: wordBank };
  }

  /** טוען את כל התוכן פעם אחת ומחזיר Promise. */
  function loadAll() {
    if (loadPromise) return loadPromise;

    var viaFile = window.location.protocol === 'file:';
    var attempt = (viaFile || typeof fetch !== 'function')
      ? Promise.reject(new Error('אין fetch זמין'))
      : fromNetwork();

    loadPromise = attempt
      .catch(function () { return fromBundle(); })
      .then(ingest);

    return loadPromise;
  }

  function getLesson(lessonId) {
    if (!lessons) return null;
    return lessons.filter(function (l) { return l.lessonId === Number(lessonId); })[0] || null;
  }

  function getWord(id) {
    return (wordBank && wordBank[id]) || null;
  }

  /** מחזיר מילים לפי רשימת מזהים, מדלג על מזהים לא מוכרים. */
  function getWords(ids) {
    return (ids || []).map(getWord).filter(Boolean);
  }

  function allLessons() {
    return lessons || [];
  }

  function totalLessons() {
    return TOTAL_LESSONS;
  }

  return {
    loadAll: loadAll,
    getLesson: getLesson,
    getWord: getWord,
    getWords: getWords,
    allLessons: allLessons,
    totalLessons: totalLessons
  };
})();
