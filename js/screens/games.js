/*
 * games.js — שלושת סוגי המשחק המסכם: matching, sentence-picture, fill-word.
 *
 * כלל אחיד בכל המשחקים: ניסיון אחד לכל שאלה. טעות אינה חוסמת ואינה חוזרת —
 * מוצגת מיד התשובה הנכונה בצורה חיובית, והמשחק ממשיך הלאה.
 *
 * כל משחק מסיים בקריאה ל-onDone({correct, total, missedWordIds}).
 */
window.Games = (function () {
  'use strict';

  var UI = window.UI;

  function wordOf(id) {
    return window.LessonData.getWord(id) || { id: id, en: id, he: '', audioText: id };
  }

  /* ===================== משחק 1: התאמת תמונה למילה ===================== */

  function runMatching(opts) {
    var wordIds = (opts.data.wordIds || []).slice();
    var total = wordIds.length;
    var picsOrder = UI.shuffle(wordIds);
    var wordsOrder = UI.shuffle(wordIds);

    var matched = {};   // wordId -> true
    var firstTryOk = 0;
    var missed = [];
    var selected = null; // {col: 'pic'|'word', id}
    var busy = false;

    function html() {
      var pics = picsOrder
        .map(function (id) {
          return (
            '<button type="button" class="match-tile ' + (matched[id] ? 'matched' : '') +
            '" data-col="pic" data-id="' + id + '"' + (matched[id] ? ' disabled' : '') + '>' +
            window.WordIcons.svg(id) + '</button>'
          );
        })
        .join('');

      var words = wordsOrder
        .map(function (id) {
          return (
            '<button type="button" class="match-tile ' + (matched[id] ? 'matched' : '') +
            '" data-col="word" data-id="' + id + '"' + (matched[id] ? ' disabled' : '') + '>' +
            '<span class="en">' + UI.escapeHtml(wordOf(id).en) + '</span></button>'
          );
        })
        .join('');

      return (
        '<p class="center muted">לחצו על תמונה ואז על המילה המתאימה</p>' +
        '<div class="match-board">' +
        '<div class="match-col"><h3>תמונות</h3>' + pics + '</div>' +
        '<div class="match-col"><h3>מילים</h3>' + words + '</div>' +
        '</div>' +
        '<div id="match-feedback" style="margin-top:14px"></div>'
      );
    }

    function tile(col, id) {
      return opts.mountEl.querySelector('[data-col="' + col + '"][data-id="' + id + '"]');
    }

    function clearSelection() {
      UI.$$('.match-tile.picked', opts.mountEl).forEach(function (el) {
        el.classList.remove('picked');
      });
      selected = null;
    }

    function finishPair(pickedId, targetId, wasCorrect) {
      matched[pickedId] = true;
      matched[targetId] = true;

      if (wasCorrect) {
        firstTryOk++;
        window.Audio2.chimeCorrect();
      } else {
        if (missed.indexOf(targetId) === -1) missed.push(targetId);
        if (missed.indexOf(pickedId) === -1) missed.push(pickedId);
        window.Audio2.chimeGentle();
      }

      var fb = opts.mountEl.querySelector('#match-feedback');
      fb.innerHTML = UI.feedbackHtml(wasCorrect, {
        answerEn: wasCorrect ? null : wordOf(targetId).en,
        answerHe: wasCorrect ? null : wordOf(targetId).he,
        buddyName: opts.buddyName
      });

      window.Audio2.speak(wordOf(targetId).audioText || wordOf(targetId).en);

      busy = true;
      setTimeout(function () {
        busy = false;
        if (Object.keys(matched).length >= total) {
          opts.onDone({ correct: firstTryOk, total: total, missedWordIds: missed });
        } else {
          draw();
        }
      }, 1200);
    }

    function onTileClick(el) {
      if (busy) return;
      var col = el.getAttribute('data-col');
      var id = el.getAttribute('data-id');
      if (matched[id]) return;

      if (!selected || selected.col === col) {
        clearSelection();
        selected = { col: col, id: id };
        el.classList.add('picked');
        if (col === 'pic' || col === 'word') {
          window.Audio2.speak(wordOf(id).audioText || wordOf(id).en);
        }
        return;
      }

      // הבחירה השנייה — מהעמודה השנייה
      var pickedId = selected.id;
      var correct = pickedId === id;

      if (correct) {
        tile('pic', id).classList.add('matched');
        tile('word', id).classList.add('matched');
        finishPair(id, id, true);
      } else {
        el.classList.add('miss');
        // חושפים את ההתאמה הנכונה של הפריט שנבחר ראשון
        var right = tile(selected.col === 'pic' ? 'word' : 'pic', pickedId);
        if (right) right.classList.add('matched');
        tile(selected.col, pickedId).classList.add('matched');
        finishPair(pickedId, pickedId, false);
      }
      clearSelection();
    }

    function draw() {
      opts.mountEl.innerHTML = html();
      UI.$$('.match-tile', opts.mountEl).forEach(function (el) {
        el.addEventListener('click', function () { onTileClick(el); });
      });
    }

    draw();
  }

  /* ============ משחקים 2-3: שאלה אחת בכל פעם, ניסיון יחיד ============ */

  function runQuiz(opts) {
    var items = opts.data.items || [];
    var index = 0;
    var correctCount = 0;
    var missed = [];

    function questionHtml(item) {
      if (opts.type === 'fill-word') {
        // בלי רווח לפני סימן פיסוק, כדי שהמשפט ייראה טבעי
        var after = item.textAfter || '';
        var gap = /^[.,!?;:]/.test(after) ? '' : ' ';
        return (
          '<div class="card sentence-card">' +
          '<div class="fill-sentence">' +
          UI.escapeHtml(item.textBefore) +
          ' <span class="blank" id="blank">?</span>' + gap +
          UI.escapeHtml(after) +
          '</div>' +
          '<div class="sentence-he">' + UI.escapeHtml(item.he || '') + '</div>' +
          '</div>' +
          '<div class="choice-list" style="margin-top:14px">' +
          UI.shuffle(item.optionWordIds)
            .map(function (id) {
              return (
                '<button type="button" class="choice-text" data-pick="' + id + '">' +
                window.WordIcons.svg(id, { size: 40 }) +
                '<span class="en">' + UI.escapeHtml(wordOf(id).en) + '</span></button>'
              );
            })
            .join('') +
          '</div>'
        );
      }

      // sentence-picture
      return (
        '<div class="card sentence-card">' +
        '<div class="sentence-en en">' + UI.escapeHtml(item.en) + '</div>' +
        '<div class="sentence-he">' + UI.escapeHtml(item.he || '') + '</div>' +
        UI.speakButton(item.en, 'שמע שוב') +
        '</div>' +
        '<p class="center muted" style="margin-top:12px">איזו תמונה מתאימה למשפט?</p>' +
        '<div class="choice-grid">' +
        UI.shuffle(item.optionWordIds)
          .map(function (id) {
            return (
              '<button type="button" class="choice" data-pick="' + id + '">' +
              window.WordIcons.svg(id) + '</button>'
            );
          })
          .join('') +
        '</div>'
      );
    }

    function draw() {
      var item = items[index];
      opts.mountEl.innerHTML =
        '<div class="q-counter">שאלה ' + (index + 1) + ' מתוך ' + items.length + '</div>' +
        questionHtml(item) +
        '<div id="quiz-feedback" style="margin-top:16px"></div>';

      if (opts.type === 'sentence-picture') {
        window.Audio2.speak(item.en);
      }

      UI.$$('[data-pick]', opts.mountEl).forEach(function (btn) {
        btn.addEventListener('click', function () { answer(btn, item); }, { once: true });
      });
    }

    function answer(btn, item) {
      var picked = btn.getAttribute('data-pick');
      var correct = picked === item.answerWordId;

      UI.$$('[data-pick]', opts.mountEl).forEach(function (el) {
        var id = el.getAttribute('data-pick');
        el.disabled = true;
        if (id === item.answerWordId) el.classList.add('correct');
        else if (el === btn) el.classList.add('wrong');
        else el.classList.add('dimmed');
      });

      if (correct) {
        correctCount++;
        window.Audio2.chimeCorrect();
      } else {
        if (missed.indexOf(item.answerWordId) === -1) missed.push(item.answerWordId);
        window.Audio2.chimeGentle();
      }

      var answerWord = wordOf(item.answerWordId);
      var blank = opts.mountEl.querySelector('#blank');
      if (blank) {
        blank.textContent = answerWord.en;
        blank.classList.add('filled');
      }

      var fullSentence = opts.type === 'fill-word'
        ? [item.textBefore, answerWord.en, item.textAfter].join(' ').replace(/\s+([.!?,])/g, '$1')
        : item.en;

      var fb = opts.mountEl.querySelector('#quiz-feedback');
      fb.innerHTML =
        UI.feedbackHtml(correct, {
          answerEn: correct ? null : answerWord.en,
          answerHe: correct ? null : answerWord.he,
          buddyName: opts.buddyName
        }) +
        '<div class="center" style="margin-top:12px">' +
        UI.speakButton(fullSentence, 'שמע את המשפט') +
        '</div>' +
        '<button type="button" class="btn btn-block btn-lg" id="quiz-next" style="margin-top:12px">' +
        (index + 1 < items.length ? 'הבא ›' : 'סיימנו! ›') +
        '</button>';

      window.Audio2.speak(fullSentence);

      opts.mountEl.querySelector('#quiz-next').addEventListener('click', function () {
        index++;
        if (index < items.length) {
          draw();
        } else {
          opts.onDone({ correct: correctCount, total: items.length, missedWordIds: missed });
        }
      });
    }

    if (!items.length) {
      opts.onDone({ correct: 0, total: 0, missedWordIds: [] });
      return;
    }
    draw();
  }

  /**
   * @param {{type: string, data: object, mountEl: Element, buddyName: string, onDone: Function}} opts
   */
  function run(opts) {
    if (opts.type === 'matching') runMatching(opts);
    else runQuiz(opts);
  }

  return { run: run };
})();
