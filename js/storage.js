/*
 * storage.js — פרופילים והתקדמות ב-localStorage.
 *
 * מבנה הנתונים:
 * {
 *   version: 1,
 *   activeProfileId: "p_ab12",
 *   profiles: [{
 *     id, childName, characterId, characterName, createdAt,
 *     items: ["hat", "scarf"],
 *     lessons: { "1": { completed, date, wordsRemembered, wordsTotal,
 *                       sentencesUnderstood, sentencesTotal,
 *                       speakingCorrectFirstTry, speakingTotal, missedWordIds } }
 *   }]
 * }
 */
window.Storage = (function () {
  'use strict';

  var KEY = 'englishkids.v1';
  var VERSION = 1;
  var memoryFallback = null; // כשה-localStorage חסום (גלישה פרטית)

  function blank() {
    return { version: VERSION, activeProfileId: null, profiles: [] };
  }

  function readRaw() {
    try {
      return window.localStorage.getItem(KEY);
    } catch (e) {
      return memoryFallback;
    }
  }

  function writeRaw(value) {
    try {
      window.localStorage.setItem(KEY, value);
    } catch (e) {
      memoryFallback = value;
    }
  }

  var state = null;

  function load() {
    if (state) return state;
    var raw = readRaw();
    if (!raw) {
      state = blank();
      return state;
    }
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.profiles)) throw new Error('bad shape');
      parsed.version = VERSION;
      state = parsed;
    } catch (e) {
      // נתונים פגומים — מתחילים מחדש במקום להיתקע
      state = blank();
    }
    return state;
  }

  function save() {
    writeRaw(JSON.stringify(load()));
  }

  function newId() {
    return 'p_' + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-3);
  }

  function todayIso() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  /* ------------------------------ פרופילים ------------------------------ */

  function getProfiles() {
    return load().profiles;
  }

  function getActiveProfile() {
    var s = load();
    if (!s.activeProfileId) return null;
    return s.profiles.filter(function (p) { return p.id === s.activeProfileId; })[0] || null;
  }

  function setActiveProfile(id) {
    var s = load();
    s.activeProfileId = id;
    save();
  }

  function createProfile(childName, characterId, characterName) {
    var s = load();
    var profile = {
      id: newId(),
      childName: (childName || '').trim() || 'תלמיד/ה',
      characterId: characterId,
      characterName: (characterName || '').trim() || window.Characters.get(characterId).nameHe,
      createdAt: todayIso(),
      items: [],
      lessons: {}
    };
    s.profiles.push(profile);
    s.activeProfileId = profile.id;
    save();
    return profile;
  }

  function updateProfile(id, changes) {
    var s = load();
    var profile = s.profiles.filter(function (p) { return p.id === id; })[0];
    if (!profile) return null;
    Object.keys(changes).forEach(function (k) { profile[k] = changes[k]; });
    save();
    return profile;
  }

  function deleteProfile(id) {
    var s = load();
    s.profiles = s.profiles.filter(function (p) { return p.id !== id; });
    if (s.activeProfileId === id) s.activeProfileId = null;
    save();
  }

  /* ------------------------------ התקדמות ------------------------------ */

  function getLessonResult(lessonId) {
    var profile = getActiveProfile();
    if (!profile) return null;
    return profile.lessons[String(lessonId)] || null;
  }

  function isLessonCompleted(lessonId) {
    var r = getLessonResult(lessonId);
    return !!(r && r.completed);
  }

  /** שיעור 1 תמיד פתוח; כל שיעור אחר נפתח בסיום הקודם. */
  function isLessonUnlocked(lessonId) {
    if (lessonId <= 1) return true;
    return isLessonCompleted(lessonId - 1);
  }

  function nextLessonId(totalLessons) {
    for (var i = 1; i <= totalLessons; i++) {
      if (!isLessonCompleted(i)) return i;
    }
    return totalLessons; // הכל הושלם — חוזרים לשיעור האחרון לחזרה
  }

  /**
   * שומר תוצאת שיעור. שומר את התוצאה הטובה ביותר אם השיעור נעשה שוב,
   * כדי שחזרה על שיעור לא תוריד את ההישג הקודם.
   */
  function saveLessonResult(lessonId, result) {
    var profile = getActiveProfile();
    if (!profile) return null;
    var key = String(lessonId);
    var prev = profile.lessons[key];

    var merged = {
      completed: true,
      date: todayIso(),
      wordsRemembered: result.wordsRemembered,
      wordsTotal: result.wordsTotal,
      sentencesUnderstood: result.sentencesUnderstood,
      sentencesTotal: result.sentencesTotal,
      speakingCorrectFirstTry: result.speakingCorrectFirstTry,
      speakingTotal: result.speakingTotal,
      missedWordIds: result.missedWordIds || []
    };

    if (prev) {
      merged.wordsRemembered = Math.max(prev.wordsRemembered || 0, merged.wordsRemembered);
      merged.sentencesUnderstood = Math.max(prev.sentencesUnderstood || 0, merged.sentencesUnderstood);
      merged.speakingCorrectFirstTry = Math.max(
        prev.speakingCorrectFirstTry || 0,
        merged.speakingCorrectFirstTry
      );
      // רשימת החזרה מתעדכנת לפי המעבר האחרון בלבד — מילה שנענתה נכון הפעם יורדת ממנה
    }

    profile.lessons[key] = merged;

    var reward = window.Characters.rewardForLesson(lessonId);
    if (reward && profile.items.indexOf(reward.id) === -1) {
      profile.items.push(reward.id);
    }

    save();
    return merged;
  }

  /** כל המילים שהוחמצו בכל השיעורים, ללא כפילויות. */
  function getMissedWordIds() {
    var profile = getActiveProfile();
    if (!profile) return [];
    var seen = {};
    var out = [];
    Object.keys(profile.lessons).forEach(function (key) {
      (profile.lessons[key].missedWordIds || []).forEach(function (id) {
        if (!seen[id]) {
          seen[id] = true;
          out.push(id);
        }
      });
    });
    return out;
  }

  /** מסירה מילה מרשימת החזרה אחרי שנענתה נכון במסך "המסלול שלי". */
  function clearMissedWord(wordId) {
    var profile = getActiveProfile();
    if (!profile) return;
    Object.keys(profile.lessons).forEach(function (key) {
      var lesson = profile.lessons[key];
      if (lesson.missedWordIds) {
        lesson.missedWordIds = lesson.missedWordIds.filter(function (id) { return id !== wordId; });
      }
    });
    save();
  }

  function addMissedWord(lessonId, wordId) {
    var profile = getActiveProfile();
    if (!profile) return;
    var key = String(lessonId);
    if (!profile.lessons[key]) return;
    var list = profile.lessons[key].missedWordIds || (profile.lessons[key].missedWordIds = []);
    if (list.indexOf(wordId) === -1) list.push(wordId);
    save();
  }

  function resetProfileProgress(id) {
    var s = load();
    var profile = s.profiles.filter(function (p) { return p.id === id; })[0];
    if (!profile) return;
    profile.lessons = {};
    profile.items = [];
    save();
  }

  return {
    load: load,
    save: save,
    getProfiles: getProfiles,
    getActiveProfile: getActiveProfile,
    setActiveProfile: setActiveProfile,
    createProfile: createProfile,
    updateProfile: updateProfile,
    deleteProfile: deleteProfile,
    getLessonResult: getLessonResult,
    isLessonCompleted: isLessonCompleted,
    isLessonUnlocked: isLessonUnlocked,
    nextLessonId: nextLessonId,
    saveLessonResult: saveLessonResult,
    getMissedWordIds: getMissedWordIds,
    clearMissedWord: clearMissedWord,
    addMissedWord: addMissedWord,
    resetProfileProgress: resetProfileProgress
  };
})();
