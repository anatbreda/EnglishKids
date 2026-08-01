/*
 * speech.js — זיהוי דיבור (Web Speech Recognition) והשוואה מקלה לתשובה הצפויה.
 *
 * הזיהוי נתמך רק בחלק מהדפדפנים (Chrome/Edge/Safari) ודורש חיבור לאינטרנט
 * ואישור מיקרופון. כשאין תמיכה — מנוע השיעור מדלג על שלב הדיבור לגמרי.
 *
 * ההשוואה מכוונת להיות סלחנית: ילד שאומר את המשפט בהגייה לא מושלמת
 * או מוסיף/משמיט מילת עזר — ייחשב כצודק.
 */
window.Speech = (function () {
  'use strict';

  var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

  function isSupported() {
    // דורש גם הקשר מאובטח (https או localhost) כדי לקבל גישה למיקרופון
    var secure = window.isSecureContext !== false;
    return !!Recognition && secure;
  }

  /* --------------------------- נרמול והשוואה --------------------------- */

  var CONTRACTIONS = {
    "i'm": 'i am',
    'im': 'i am',
    "it's": 'it is',
    'its': 'it is',
    "that's": 'that is',
    "she's": 'she is',
    "he's": 'he is',
    "don't": 'do not',
    'dont': 'do not',
    "can't": 'can not',
    'cant': 'can not',
    "i've": 'i have',
    "let's": 'let us'
  };

  // מילים קצרות שהשמטה או הוספה שלהן לא צריכה להיחשב טעות
  var FILLER = ['a', 'an', 'the', 'please', 'got', 'very', 'um', 'uh'];

  function normalize(text) {
    var s = String(text || '').toLowerCase();
    s = s.replace(/[.,!?;:"()]/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();

    var words = s.split(' ').map(function (w) {
      return Object.prototype.hasOwnProperty.call(CONTRACTIONS, w) ? CONTRACTIONS[w] : w;
    });
    return words.join(' ').replace(/'/g, '').replace(/\s+/g, ' ').trim();
  }

  function contentTokens(text) {
    return normalize(text)
      .split(' ')
      .filter(function (w) { return w && FILLER.indexOf(w) === -1; });
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var prev = [];
    for (var j = 0; j <= b.length; j++) prev[j] = j;
    for (var i = 1; i <= a.length; i++) {
      var cur = [i];
      for (var k = 1; k <= b.length; k++) {
        var cost = a.charAt(i - 1) === b.charAt(k - 1) ? 0 : 1;
        cur[k] = Math.min(cur[k - 1] + 1, prev[k] + 1, prev[k - 1] + cost);
      }
      prev = cur;
    }
    return prev[b.length];
  }

  function ratio(a, b) {
    var max = Math.max(a.length, b.length);
    if (!max) return 1;
    return 1 - levenshtein(a, b) / max;
  }

  /** האם שתי מילים "מספיק דומות" — סובלני להגייה של ילד. */
  function wordsClose(a, b) {
    if (a === b) return true;
    if (Math.abs(a.length - b.length) > 3) return false;
    return ratio(a, b) >= 0.7;
  }

  /**
   * משווה את מה שנשמע לתשובה הצפויה ולוריאציות המותרות.
   * @returns {{ok: boolean, score: number}}
   */
  function matches(heard, expectedPhrase, acceptableVariants) {
    var candidates = [expectedPhrase].concat(acceptableVariants || []);
    var best = 0;

    for (var i = 0; i < candidates.length; i++) {
      var expTokens = contentTokens(candidates[i]);
      var heardTokens = contentTokens(heard);
      if (!expTokens.length) continue;

      // כמה ממילות התוכן הצפויות נשמעו (בסדר כלשהו, עם התאמה מקלה)
      var pool = heardTokens.slice();
      var hits = 0;
      expTokens.forEach(function (want) {
        for (var p = 0; p < pool.length; p++) {
          if (wordsClose(want, pool[p])) {
            pool.splice(p, 1);
            hits++;
            return;
          }
        }
      });

      var coverage = hits / expTokens.length;
      var whole = ratio(normalize(candidates[i]), normalize(heard));
      var score = Math.max(coverage, whole);
      if (score > best) best = score;
    }

    return { ok: best >= 0.7, score: best };
  }

  /* ------------------------------ הקלטה ------------------------------ */

  var active = null;

  function stop() {
    if (active) {
      try { active.stop(); } catch (e) { /* כבר נעצר */ }
      active = null;
    }
  }

  /**
   * מתחיל האזנה יחידה.
   * @param {{onResult: Function, onError?: Function, onEnd?: Function, timeoutMs?: number}} opts
   * @returns {Function} פונקציה לביטול ההאזנה
   */
  function listen(opts) {
    if (!isSupported()) {
      if (opts.onError) opts.onError('unsupported');
      return function () {};
    }
    stop();

    var rec = new Recognition();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 5;
    rec.continuous = false;

    var finished = false;
    var timer = null;

    function finish(fn, arg) {
      if (finished) return;
      finished = true;
      if (timer) clearTimeout(timer);
      active = null;
      if (fn) fn(arg);
      if (opts.onEnd) opts.onEnd();
    }

    rec.onresult = function (event) {
      var alternatives = [];
      var result = event.results[0];
      for (var i = 0; i < result.length; i++) {
        alternatives.push(result[i].transcript);
      }
      finish(opts.onResult, alternatives);
    };

    rec.onerror = function (event) {
      finish(opts.onError, (event && event.error) || 'error');
    };

    rec.onend = function () {
      // הסתיים בלי תוצאה — נחשב כ"לא נשמע"
      finish(opts.onError, 'no-speech');
    };

    active = rec;
    try {
      rec.start();
    } catch (e) {
      finish(opts.onError, 'start-failed');
      return function () {};
    }

    timer = setTimeout(function () {
      try { rec.stop(); } catch (e) { /* כבר נעצר */ }
    }, opts.timeoutMs || 7000);

    return function cancel() {
      finished = true;
      if (timer) clearTimeout(timer);
      try { rec.abort(); } catch (e) { /* כבר בוטל */ }
      active = null;
    };
  }

  return {
    isSupported: isSupported,
    listen: listen,
    stop: stop,
    matches: matches,
    normalize: normalize
  };
})();
