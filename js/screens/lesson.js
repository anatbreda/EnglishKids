/*
 * lesson.js — מנוע השיעור הגנרי.
 *
 * כל שיעור בנוי מ-5 שלבים קבועים:
 *   1. חימום        — חזרה על מילים משיעורים קודמים (או הצצה לשיעור, בשיעור הראשון)
 *   2. מילים חדשות  — לימוד ואז בדיקה (נספר ל-wordsRemembered)
 *   3. משפטים       — הצגה ואז הבנה (נספר ל-sentencesUnderstood)
 *   4. תרגול דיבור  — מיקרופון; מדולג לגמרי כשאין תמיכה בדפדפן
 *   5. משחק מסכם    — לפי game.type, ואחריו מסך סיכום ופידבק
 *
 * כלל טעות אחיד: ניסיון אחד לכל שאלה, תמיד מציגים מיד את התשובה הנכונה
 * בצורה חיובית וממשיכים. אין חסימה ואין ניסיון חוזר על אותה שאלה.
 */
window.ScreenLesson = (function () {
  'use strict';

  var UI = window.UI;
  var session = null;

  function wordOf(id) {
    return window.LessonData.getWord(id) || { id: id, en: id, he: '', audioText: id };
  }

  /*
   * expectedPhrase נשמר ב-JSON באותיות קטנות ובלי פיסוק, כי הוא משמש להשוואה
   * מול תוצאת זיהוי הדיבור. לתצוגה מציגים אותו כמשפט אנגלי תקין.
   */
  function displayPhrase(phrase) {
    var text = String(phrase || '').trim();
    if (!text) return '';
    text = text.charAt(0).toUpperCase() + text.slice(1);
    text = text.replace(/\bi\b/g, 'I');
    if (!/[.!?]$/.test(text)) text += '.';
    return text;
  }

  function noteMissed(ids) {
    (ids || []).forEach(function (id) {
      if (session.results.missedWordIds.indexOf(id) === -1) {
        session.results.missedWordIds.push(id);
      }
    });
  }

  /** בוחר מסיחים לתמונות מתוך מילות השיעור, ומשלים מבנק המילים אם חסר. */
  function pickDistractors(answerId, poolIds, count) {
    var pool = (poolIds || []).filter(function (id) { return id !== answerId; });
    var chosen = UI.sample(pool, count);
    if (chosen.length < count) {
      var extra = window.WordIcons.ids().filter(function (id) {
        return id !== answerId && chosen.indexOf(id) === -1;
      });
      chosen = chosen.concat(UI.sample(extra, count - chosen.length));
    }
    return chosen;
  }

  /* =========================== שלב 1: חימום =========================== */

  function stageWarmup(mountEl, done) {
    var lesson = session.lesson;
    var reviewWords = window.LessonData.getWords(lesson.reviewWords);
    var index = 0;

    function drawIntro() {
      var preview = lesson.newWords
        .map(function (w) {
          return '<div class="missed-chip">' + UI.wordArt(w.id) +
            '<div class="w en">' + UI.escapeHtml(w.en) + '</div></div>';
        })
        .join('');

      mountEl.innerHTML =
        '<div class="card center stack">' +
        '<div style="width:110px;margin:0 auto">' +
        window.Characters.svg(session.profile.characterId, { items: session.profile.items }) +
        '</div>' +
        '<h2>' + UI.escapeHtml(lesson.titleHe) + '</h2>' +
        '<div class="en" style="font-size:1.2rem;color:var(--ink-soft)">' +
        UI.escapeHtml(lesson.title) + '</div>' +
        '<p>' + UI.escapeHtml(lesson.introHe || '') + '</p>' +
        '</div>' +
        '<h3 class="center" style="margin-top:18px">המילים שנלמד היום</h3>' +
        '<div class="missed-grid">' + preview + '</div>' +
        '<button type="button" class="btn btn-accent btn-block btn-lg" id="go" style="margin-top:18px">' +
        'יאללה, מתחילים! ›</button>';

      mountEl.querySelector('#go').addEventListener('click', done);
    }

    function drawReview() {
      if (index >= reviewWords.length) {
        drawIntro();
        return;
      }
      var w = reviewWords[index];
      mountEl.innerHTML =
        '<div class="q-counter">חזרה ' + (index + 1) + ' מתוך ' + reviewWords.length + '</div>' +
        '<div class="card word-card">' +
        '<div class="art">' + UI.wordArt(w.id) + '</div>' +
        '<div class="word-en en">' + UI.escapeHtml(w.en) + '</div>' +
        '<div class="word-he">' + UI.escapeHtml(w.he) + '</div>' +
        UI.speakButton(w.audioText || w.en, 'שמע שוב') +
        '</div>' +
        '<button type="button" class="btn btn-block btn-lg" id="next" style="margin-top:16px">' +
        (index + 1 < reviewWords.length ? 'הבא ›' : 'ממשיכים ›') + '</button>';

      window.Audio2.speak(w.audioText || w.en);

      mountEl.querySelector('#next').addEventListener('click', function () {
        index++;
        drawReview();
      });
    }

    if (reviewWords.length) {
      mountEl.innerHTML = '';
      drawReview();
    } else {
      drawIntro();
    }
  }

  /* ======================== שלב 2: מילים חדשות ======================== */

  function stageWords(mountEl, done) {
    var words = session.lesson.newWords;
    var lessonWordIds = words.map(function (w) { return w.id; });
    var phase = 'teach';
    var index = 0;
    var quizOrder = [];
    var correctCount = 0;
    var missed = [];

    function drawTeach() {
      var w = words[index];
      mountEl.innerHTML =
        '<div class="q-counter">מילה ' + (index + 1) + ' מתוך ' + words.length + '</div>' +
        '<div class="card word-card">' +
        '<div class="art">' + UI.wordArt(w.id) + '</div>' +
        '<div class="word-en en">' + UI.escapeHtml(w.en) + '</div>' +
        '<div class="word-he">' + UI.escapeHtml(w.he) + '</div>' +
        UI.speakButton(w.audioText || w.en, 'שמע שוב') +
        '</div>' +
        '<button type="button" class="btn btn-block btn-lg" id="next" style="margin-top:16px">' +
        (index + 1 < words.length ? 'הבא ›' : 'עכשיו נבדוק! ›') + '</button>';

      window.Audio2.speak(w.audioText || w.en);

      mountEl.querySelector('#next').addEventListener('click', function () {
        index++;
        if (index < words.length) {
          drawTeach();
        } else {
          phase = 'quiz';
          index = 0;
          quizOrder = UI.shuffle(words);
          drawQuiz();
        }
      });
    }

    function drawQuiz() {
      var w = quizOrder[index];
      var options = UI.shuffle([w.id].concat(pickDistractors(w.id, lessonWordIds, 3)));

      mountEl.innerHTML =
        '<div class="q-counter">שאלה ' + (index + 1) + ' מתוך ' + quizOrder.length + '</div>' +
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
        '<div id="fb" style="margin-top:16px"></div>';

      window.Audio2.speak(w.audioText || w.en);

      UI.$$('[data-pick]', mountEl).forEach(function (btn) {
        btn.addEventListener('click', function () { answer(btn, w); }, { once: true });
      });
    }

    function answer(btn, w) {
      var correct = btn.getAttribute('data-pick') === w.id;

      UI.$$('[data-pick]', mountEl).forEach(function (el) {
        el.disabled = true;
        if (el.getAttribute('data-pick') === w.id) el.classList.add('correct');
        else if (el === btn) el.classList.add('wrong');
        else el.classList.add('dimmed');
      });

      if (correct) {
        correctCount++;
        window.Audio2.chimeCorrect();
      } else {
        if (missed.indexOf(w.id) === -1) missed.push(w.id);
        window.Audio2.chimeGentle();
      }

      mountEl.querySelector('#fb').innerHTML =
        UI.feedbackHtml(correct, {
          answerEn: correct ? null : w.en,
          answerHe: correct ? null : w.he,
          buddyName: session.profile.characterName
        }) +
        '<button type="button" class="btn btn-block btn-lg" id="next" style="margin-top:12px">' +
        (index + 1 < quizOrder.length ? 'הבא ›' : 'ממשיכים למשפטים ›') + '</button>';

      mountEl.querySelector('#next').addEventListener('click', function () {
        index++;
        if (index < quizOrder.length) {
          drawQuiz();
        } else {
          session.results.wordsRemembered = correctCount;
          session.results.wordsTotal = quizOrder.length;
          noteMissed(missed);
          done();
        }
      });
    }

    if (phase === 'teach') drawTeach();
  }

  /* ========================== שלב 3: משפטים ========================== */

  function stageSentences(mountEl, done) {
    var sentences = session.lesson.sentences || [];
    var phase = 'teach';
    var index = 0;
    var correctCount = 0;
    var missed = [];

    function drawTeach() {
      var s = sentences[index];
      mountEl.innerHTML =
        '<div class="q-counter">משפט ' + (index + 1) + ' מתוך ' + sentences.length + '</div>' +
        '<div class="card sentence-card">' +
        '<div class="art" style="width:130px;height:130px;margin:0 auto 10px;background:var(--sky-pale);' +
        'border-radius:26px;padding:10px">' + UI.wordArt(s.matchWordId) + '</div>' +
        '<div class="sentence-en en">' + UI.escapeHtml(s.en) + '</div>' +
        '<div class="sentence-he">' + UI.escapeHtml(s.he) + '</div>' +
        UI.speakButton(s.en, 'שמע שוב') +
        '</div>' +
        '<button type="button" class="btn btn-block btn-lg" id="next" style="margin-top:16px">' +
        (index + 1 < sentences.length ? 'הבא ›' : 'עכשיו נבדוק! ›') + '</button>';

      window.Audio2.speak(s.en);

      mountEl.querySelector('#next').addEventListener('click', function () {
        index++;
        if (index < sentences.length) {
          drawTeach();
        } else {
          phase = 'quiz';
          index = 0;
          drawQuiz();
        }
      });
    }

    function drawQuiz() {
      var s = sentences[index];
      var options = UI.shuffle([s.matchWordId].concat(s.distractorWordIds || []));

      mountEl.innerHTML =
        '<div class="q-counter">שאלה ' + (index + 1) + ' מתוך ' + sentences.length + '</div>' +
        '<div class="card sentence-card">' +
        '<div class="sentence-en en">' + UI.escapeHtml(s.en) + '</div>' +
        UI.speakButton(s.en, 'שמע שוב') +
        '</div>' +
        '<p class="center muted" style="margin-top:12px">איזו תמונה מתאימה למשפט?</p>' +
        '<div class="choice-grid">' +
        options
          .map(function (id) {
            return '<button type="button" class="choice" data-pick="' + id + '">' +
              window.WordIcons.svg(id) + '</button>';
          })
          .join('') +
        '</div>' +
        '<div id="fb" style="margin-top:16px"></div>';

      window.Audio2.speak(s.en);

      UI.$$('[data-pick]', mountEl).forEach(function (btn) {
        btn.addEventListener('click', function () { answer(btn, s); }, { once: true });
      });
    }

    function answer(btn, s) {
      var correct = btn.getAttribute('data-pick') === s.matchWordId;
      var answerWord = wordOf(s.matchWordId);

      UI.$$('[data-pick]', mountEl).forEach(function (el) {
        el.disabled = true;
        if (el.getAttribute('data-pick') === s.matchWordId) el.classList.add('correct');
        else if (el === btn) el.classList.add('wrong');
        else el.classList.add('dimmed');
      });

      if (correct) {
        correctCount++;
        window.Audio2.chimeCorrect();
      } else {
        if (missed.indexOf(s.matchWordId) === -1) missed.push(s.matchWordId);
        window.Audio2.chimeGentle();
      }

      mountEl.querySelector('#fb').innerHTML =
        UI.feedbackHtml(correct, {
          answerEn: correct ? null : answerWord.en,
          answerHe: correct ? null : answerWord.he,
          buddyName: session.profile.characterName
        }) +
        '<div class="center" style="margin-top:10px">' +
        '<span class="sentence-he">' + UI.escapeHtml(s.he) + '</span></div>' +
        '<button type="button" class="btn btn-block btn-lg" id="next" style="margin-top:8px">' +
        (index + 1 < sentences.length ? 'הבא ›' : 'ממשיכים ›') + '</button>';

      mountEl.querySelector('#next').addEventListener('click', function () {
        index++;
        if (index < sentences.length) {
          drawQuiz();
        } else {
          session.results.sentencesUnderstood = correctCount;
          session.results.sentencesTotal = sentences.length;
          noteMissed(missed);
          done();
        }
      });
    }

    if (phase === 'teach') drawTeach();
  }

  /* ======================== שלב 4: תרגול דיבור ======================== */

  function stageSpeaking(mountEl, done) {
    var prompts = session.lesson.speakingPrompts || [];
    var index = 0;
    var correctCount = 0;
    var cancelListen = null;

    function draw() {
      var p = prompts[index];
      mountEl.innerHTML =
        '<div class="q-counter">תרגול דיבור ' + (index + 1) + ' מתוך ' + prompts.length + '</div>' +
        '<div class="card center stack">' +
        '<h3>' + UI.escapeHtml(p.promptHe) + '</h3>' +
        '<div class="sentence-en en">' + UI.escapeHtml(displayPhrase(p.expectedPhrase)) + '</div>' +
        UI.speakButton(p.expectedPhrase, 'שמע איך אומרים') +
        '</div>' +
        '<div class="mic-wrap" style="margin-top:20px">' +
        '<button type="button" class="mic-btn" id="mic" aria-label="הקלטה">🎤</button>' +
        '<div class="mic-hint" id="hint">לחצו על המיקרופון ואמרו את המשפט</div>' +
        '</div>' +
        '<div id="fb" style="margin-top:16px"></div>' +
        '<div class="center" style="margin-top:10px">' +
        '<button type="button" class="link-btn" id="skip">לדלג על התרגיל</button></div>';

      window.Audio2.speak(p.expectedPhrase);

      mountEl.querySelector('#mic').addEventListener('click', startListening);
      mountEl.querySelector('#skip').addEventListener('click', function () {
        stopListening();
        nextPrompt();
      });
    }

    function stopListening() {
      if (cancelListen) {
        cancelListen();
        cancelListen = null;
      }
    }

    /*
     * המיקרופון לא זמין (אין הרשאה / אין מכשיר / הדף נפתח כקובץ מקומי).
     * מדלגים על השלב כולו ומשאירים speakingTotal על 0, כדי שהסיכום לא יציג
     * "0 מתוך 2" על משהו שהילד/ה מעולם לא קיבל/ה הזדמנות לנסות.
     */
    function abortStage() {
      stopListening();
      session.results.speakingCorrectFirstTry = 0;
      session.results.speakingTotal = 0;

      mountEl.innerHTML =
        '<div class="card center stack">' +
        '<div class="note">המיקרופון לא זמין בדפדפן הזה, אז נדלג הפעם על תרגול הדיבור.</div>' +
        '<p class="muted">אפשר עדיין להקשיב ולחזור בקול רם אחרי ' +
        UI.escapeHtml(session.profile.characterName) + '!</p>' +
        '<button type="button" class="btn btn-block btn-lg" id="skip-stage">ממשיכים למשחק ›</button>' +
        '</div>';

      mountEl.querySelector('#skip-stage').addEventListener('click', done);
    }

    function startListening() {
      var p = prompts[index];
      var mic = mountEl.querySelector('#mic');
      var hint = mountEl.querySelector('#hint');
      if (!mic || mic.disabled) return;

      window.Audio2.cancel();
      mic.classList.add('listening');
      hint.textContent = 'מקשיב/ה… דברו עכשיו';

      cancelListen = window.Speech.listen({
        onResult: function (alternatives) {
          var best = null;
          for (var i = 0; i < alternatives.length; i++) {
            var m = window.Speech.matches(alternatives[i], p.expectedPhrase, p.acceptableVariants);
            if (!best || m.score > best.score) best = { score: m.score, ok: m.ok, text: alternatives[i] };
          }
          resolve(best || { ok: false, text: '' });
        },
        onError: function (err) {
          mic.classList.remove('listening');

          // אין מיקרופון או שאין הרשאה — מדלגים על כל שלב הדיבור, בלי להתקע
          if (err === 'not-allowed' || err === 'service-not-allowed' ||
              err === 'audio-capture' || err === 'unsupported') {
            abortStage();
            return;
          }

          if (err === 'no-speech') {
            hint.textContent = 'לא שמעתי כלום… ננסה שוב?';
          } else {
            hint.textContent = 'לא הצלחתי להקליט. אפשר לנסות שוב או לדלג.';
          }
        },
        onEnd: function () {
          cancelListen = null;
        }
      });
    }

    function resolve(result) {
      var p = prompts[index];
      var mic = mountEl.querySelector('#mic');
      var hint = mountEl.querySelector('#hint');

      mic.classList.remove('listening');
      mic.disabled = true;
      hint.textContent = '';

      if (result.ok) {
        correctCount++;
        window.Audio2.chimeCorrect();
      } else {
        window.Audio2.chimeGentle();
      }

      var heard = result.text
        ? '<div class="center" style="margin-top:10px">שמעתי: <span class="heard-text">' +
          UI.escapeHtml(result.text) + '</span></div>'
        : '';

      mountEl.querySelector('#fb').innerHTML =
        UI.feedbackHtml(result.ok, {
          answerEn: result.ok ? null : displayPhrase(p.expectedPhrase),
          buddyName: session.profile.characterName
        }) +
        heard +
        '<button type="button" class="btn btn-block btn-lg" id="next" style="margin-top:12px">' +
        (index + 1 < prompts.length ? 'הבא ›' : 'ממשיכים למשחק ›') + '</button>';

      mountEl.querySelector('#next').addEventListener('click', nextPrompt);
    }

    function nextPrompt() {
      index++;
      if (index < prompts.length) {
        draw();
      } else {
        session.results.speakingCorrectFirstTry = correctCount;
        session.results.speakingTotal = prompts.length;
        done();
      }
    }

    if (!prompts.length) {
      done();
      return;
    }
    draw();
  }

  /* ========================= שלב 5: משחק מסכם ========================= */

  function stageGame(mountEl, done) {
    var game = session.lesson.game || { type: 'matching', wordIds: [] };

    if (game.isFinalRecap && game.recapTitleHe) {
      mountEl.innerHTML = '<h3 class="center">' + UI.escapeHtml(game.recapTitleHe) + '</h3>' +
        '<div id="game-body"></div>';
    } else {
      mountEl.innerHTML = '<div id="game-body"></div>';
    }

    window.Games.run({
      type: game.type,
      data: game,
      mountEl: mountEl.querySelector('#game-body'),
      buddyName: session.profile.characterName,
      onDone: function (result) {
        session.results.gameCorrect = result.correct;
        session.results.gameTotal = result.total;
        noteMissed(result.missedWordIds);
        done();
      }
    });
  }

  /* ============================ מסך סיכום ============================ */

  function statRow(label, value, total) {
    if (!total) return '';
    return (
      '<div class="stat-row">' +
      '<span class="stat-label">' + label + '</span>' +
      UI.meter(value, total) +
      '<span class="stat-value">' + value + '/' + total + '</span>' +
      '</div>'
    );
  }

  function renderSummary() {
    var lesson = session.lesson;
    var r = session.results;
    var saved = window.Storage.saveLessonResult(lesson.lessonId, r);
    var profile = window.Storage.getActiveProfile();
    var reward = window.Characters.rewardForLesson(lesson.lessonId);

    var totalCorrect = r.wordsRemembered + r.sentencesUnderstood + (r.gameCorrect || 0);
    var totalQuestions = r.wordsTotal + r.sentencesTotal + (r.gameTotal || 0);
    var pct = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    var praise;
    if (pct >= 90) praise = 'וואו! כמעט הכל נכון! 🌟';
    else if (pct >= 70) praise = 'עבודה יפה מאוד! 👏';
    else if (pct >= 50) praise = 'יפה! לומדים ומשתפרים 💪';
    else praise = 'כל הכבוד שסיימת! נחזור על המילים ביחד 🤗';

    var missedHtml = '';
    if (r.missedWordIds.length) {
      missedHtml =
        '<div class="card stack">' +
        '<h3>מילים לחזור עליהן</h3>' +
        '<div class="missed-grid">' +
        r.missedWordIds
          .map(function (id) {
            var w = wordOf(id);
            return '<div class="missed-chip">' + UI.wordArt(id) +
              '<div class="w en">' + UI.escapeHtml(w.en) + '</div></div>';
          })
          .join('') +
        '</div>' +
        '<p class="muted" style="margin:0">הן מחכות לך במסך "המסלול שלי" לתרגול נוסף.</p>' +
        '</div>';
    }

    var nextId = lesson.lessonId + 1;
    var hasNext = nextId <= window.LessonData.totalLessons();

    var body =
      '<div class="summary-hero">' +
      window.Characters.svg(profile.characterId, { items: profile.items, className: 'avatar' }) +
      '<h1>' + UI.escapeHtml(praise) + '</h1>' +
      '<p class="muted">סיימת את שיעור ' + lesson.lessonId + ' — ' +
      UI.escapeHtml(lesson.titleHe) + '</p>' +
      '</div>' +
      (reward
        ? '<div class="card reward-card stack">' +
          '<div>' + UI.escapeHtml(profile.characterName) + ' קיבל/ה פריט חדש!</div>' +
          '<div class="reward-name">★ ' + UI.escapeHtml(reward.nameHe) + '</div>' +
          '</div>'
        : '') +
      '<div class="card">' +
      statRow('מילים שזכרת', saved.wordsRemembered, saved.wordsTotal) +
      statRow('משפטים שהבנת', saved.sentencesUnderstood, saved.sentencesTotal) +
      statRow('דיבור נכון בפעם הראשונה', saved.speakingCorrectFirstTry, saved.speakingTotal) +
      statRow('המשחק המסכם', r.gameCorrect || 0, r.gameTotal || 0) +
      '</div>' +
      missedHtml +
      '<div class="stack" style="margin-top:16px">' +
      (hasNext
        ? '<button type="button" class="btn btn-accent btn-block btn-lg" id="next-lesson">' +
          'לשיעור ' + nextId + ' ›</button>'
        : '<div class="note center">סיימת את כל 8 השיעורים! אפשר לחזור על כל שיעור שרוצים 🏆</div>') +
      '<button type="button" class="btn btn-ghost btn-block" id="to-path">חזרה למסלול שלי</button>' +
      '</div>';

    UI.mount({ topbar: UI.topbar({ profile: profile }), body: body });
    window.Audio2.chimeFinish();

    var next = UI.$('#next-lesson');
    if (next) {
      next.addEventListener('click', function () { UI.go('#/lesson/' + nextId); });
    }
    UI.$('#to-path').addEventListener('click', function () { UI.go('#/path'); });
  }

  /* ============================ ניהול השיעור ============================ */

  function buildStages() {
    var stages = [
      { key: 'warmup', labelHe: 'חימום', run: stageWarmup },
      { key: 'words', labelHe: 'מילים חדשות', run: stageWords },
      { key: 'sentences', labelHe: 'משפטים', run: stageSentences }
    ];

    // שלב הדיבור מוצג רק כשהדפדפן תומך בזיהוי דיבור — אחרת מדלגים עליו לגמרי
    if (window.Speech.isSupported() && (session.lesson.speakingPrompts || []).length) {
      stages.push({ key: 'speaking', labelHe: 'תרגול דיבור', run: stageSpeaking });
    }

    stages.push({ key: 'game', labelHe: 'משחק מסכם', run: stageGame });
    return stages;
  }

  function renderShell() {
    var stage = session.stages[session.stageIndex];
    var body =
      UI.stageBar(session.stages.length, session.stageIndex) +
      '<div class="stage-label">שלב ' + (session.stageIndex + 1) + ' מתוך ' +
      session.stages.length + ' · ' + stage.labelHe + '</div>' +
      '<div id="stage-body"></div>';

    UI.mount({
      topbar:
        '<div class="topbar">' +
        '<button type="button" class="icon-btn" id="leave-lesson" aria-label="יציאה מהשיעור">' +
        UI.backArrow + '</button>' +
        '<span class="spacer"></span>' +
        '<div class="buddy-chip">' +
        window.Characters.svg(session.profile.characterId, {
          items: session.profile.items,
          className: 'avatar'
        }) +
        '<span class="buddy-name">' + UI.escapeHtml(session.profile.characterName) + '</span>' +
        '</div></div>',
      body: body
    });

    UI.$('#leave-lesson').addEventListener('click', function () {
      if (window.confirm('לצאת מהשיעור? ההתקדמות בשיעור הזה לא תישמר.')) {
        session = null;
        UI.go('#/path');
      }
    });

    stage.run(UI.$('#stage-body'), nextStage);
  }

  function nextStage() {
    if (!session) return;
    session.stageIndex++;
    if (session.stageIndex < session.stages.length) {
      renderShell();
    } else {
      renderSummary();
      session = null;
    }
  }

  function render(lessonId) {
    var profile = window.Storage.getActiveProfile();
    if (!profile) {
      UI.go('#/profiles');
      return;
    }

    var lesson = window.LessonData.getLesson(lessonId);
    if (!lesson) {
      UI.go('#/path');
      return;
    }

    if (!window.Storage.isLessonUnlocked(lesson.lessonId)) {
      UI.go('#/path');
      return;
    }

    session = {
      lesson: lesson,
      profile: profile,
      stageIndex: 0,
      results: {
        wordsRemembered: 0,
        wordsTotal: 0,
        sentencesUnderstood: 0,
        sentencesTotal: 0,
        speakingCorrectFirstTry: 0,
        speakingTotal: 0,
        gameCorrect: 0,
        gameTotal: 0,
        missedWordIds: []
      }
    };
    session.stages = buildStages();
    renderShell();
  }

  return { render: render };
})();
