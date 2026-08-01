/*
 * audio.js — הקראה באנגלית (Web Speech Synthesis) וצלילי משוב קצרים.
 */
window.Audio2 = (function () {
  'use strict';

  var synth = window.speechSynthesis || null;
  var voice = null;
  var voicesReady = false;

  function pickVoice() {
    if (!synth) return null;
    var voices = synth.getVoices();
    if (!voices || !voices.length) return null;

    // מעדיפים קול אנגלי-אמריקאי, ואם אין — כל קול באנגלית
    var scored = voices
      .filter(function (v) { return /^en/i.test(v.lang || ''); })
      .sort(function (a, b) {
        function score(v) {
          var s = 0;
          if (/^en[-_]US/i.test(v.lang)) s += 4;
          else if (/^en[-_]GB/i.test(v.lang)) s += 3;
          else s += 1;
          if (v.localService) s += 1;
          if (/samantha|karen|google us english|zira|aria/i.test(v.name || '')) s += 2;
          return -s;
        }
        return score(a) - score(b);
      });
    return scored[0] || null;
  }

  function refreshVoices() {
    voice = pickVoice();
    voicesReady = !!voice;
  }

  if (synth) {
    refreshVoices();
    if (typeof synth.addEventListener === 'function') {
      synth.addEventListener('voiceschanged', refreshVoices);
    } else {
      synth.onvoiceschanged = refreshVoices;
    }
  }

  function isSupported() {
    return !!synth && typeof window.SpeechSynthesisUtterance === 'function';
  }

  function cancel() {
    if (synth) {
      try { synth.cancel(); } catch (e) { /* לא קריטי */ }
    }
  }

  /**
   * מקריא טקסט באנגלית.
   * @param {string} text
   * @param {{rate?: number, onEnd?: Function}} [opts]
   */
  function speak(text, opts) {
    opts = opts || {};
    if (!isSupported() || !text) {
      if (opts.onEnd) setTimeout(opts.onEnd, 0);
      return;
    }
    cancel();
    if (!voicesReady) refreshVoices();

    var u = new window.SpeechSynthesisUtterance(text);
    u.lang = (voice && voice.lang) || 'en-US';
    if (voice) u.voice = voice;
    u.rate = opts.rate == null ? 0.85 : opts.rate; // איטי יותר — מותאם לילדים
    u.pitch = 1.05;
    u.volume = 1;
    if (opts.onEnd) {
      u.onend = opts.onEnd;
      u.onerror = opts.onEnd;
    }

    // ב-Chrome נדרש לפעמים resume אחרי cancel
    try {
      synth.resume();
    } catch (e) { /* לא קריטי */ }
    synth.speak(u);
  }

  /* ---------------------- צלילי משוב קצרים ---------------------- */

  var ctx = null;

  function audioCtx() {
    if (ctx) return ctx;
    var Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
    } catch (e) {
      ctx = null;
    }
    return ctx;
  }

  function tone(freq, startAt, duration, gainPeak) {
    var ac = audioCtx();
    if (!ac) return;
    var osc = ac.createOscillator();
    var gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ac.currentTime + startAt);
    gain.gain.exponentialRampToValueAtTime(gainPeak, ac.currentTime + startAt + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + startAt + duration);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime + startAt);
    osc.stop(ac.currentTime + startAt + duration + 0.02);
  }

  function chimeCorrect() {
    var ac = audioCtx();
    if (ac && ac.state === 'suspended') ac.resume();
    tone(660, 0, 0.16, 0.18);
    tone(880, 0.11, 0.22, 0.16);
  }

  /** צליל רך ולא מעניש למקרה של טעות. */
  function chimeGentle() {
    var ac = audioCtx();
    if (ac && ac.state === 'suspended') ac.resume();
    tone(420, 0, 0.2, 0.12);
  }

  function chimeFinish() {
    var ac = audioCtx();
    if (ac && ac.state === 'suspended') ac.resume();
    tone(523, 0, 0.16, 0.16);
    tone(659, 0.12, 0.16, 0.16);
    tone(784, 0.24, 0.3, 0.18);
  }

  return {
    isSupported: isSupported,
    speak: speak,
    cancel: cancel,
    chimeCorrect: chimeCorrect,
    chimeGentle: chimeGentle,
    chimeFinish: chimeFinish
  };
})();
