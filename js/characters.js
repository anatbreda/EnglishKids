/*
 * characters.js — 10 הדמויות המלוות + פריטי השדרוג שהן צוברות.
 *
 * כל דמות מצוירת ב-viewBox 100x100: ראש עגול (מרכז 50,44 רדיוס 26) וגוף קטן מתחתיו.
 * הפריטים מצוירים כשכבות מעל/מתחת לדמות, במיקומים קבועים ("slots"),
 * כך שאותו פריט מתאים לכל אחת מ-10 הדמויות.
 */
window.Characters = (function () {
  'use strict';

  var C = window.WordIcons.palette;
  var INK = C.ink;

  var STAR =
    'M0,-40 L11.8,-14.5 L38,-12.4 L18.5,4.6 L23.5,30.4 L0,17 ' +
    'L-23.5,30.4 L-18.5,4.6 L-38,-12.4 L-11.8,-14.5 Z';

  // עיניים + חיוך במיקום אחיד לכל הדמויות
  function face(opts) {
    opts = opts || {};
    var eyeY = opts.eyeY || 40;
    return (
      '<circle cx="41" cy="' + eyeY + '" r="3.4" fill="' + INK + '"/>' +
      '<circle cx="59" cy="' + eyeY + '" r="3.4" fill="' + INK + '"/>' +
      '<circle cx="39.8" cy="' + (eyeY - 1.2) + '" r="1.2" fill="#fff"/>' +
      '<circle cx="57.8" cy="' + (eyeY - 1.2) + '" r="1.2" fill="#fff"/>'
    );
  }

  function snout(noseFill, muzzleFill) {
    return (
      '<ellipse cx="50" cy="55" rx="16" ry="10" fill="' + muzzleFill + '"/>' +
      '<ellipse cx="50" cy="50" rx="5" ry="4" fill="' + noseFill + '"/>' +
      '<path d="M50 54v4M50 58q-5 4-9 0M50 58q5 4 9 0" stroke="' + noseFill +
      '" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
    );
  }

  function body(fill) {
    return '<path d="M50 66c-15 0-25 9-25 21v5h50v-5c0-12-10-21-25-21z" fill="' + fill + '"/>';
  }

  function cheeks() {
    return (
      '<circle cx="28" cy="50" r="5" fill="' + C.pink + '" opacity=".45"/>' +
      '<circle cx="72" cy="50" r="5" fill="' + C.pink + '" opacity=".45"/>'
    );
  }

  var CHARACTERS = [
    {
      id: 'fox',
      nameHe: 'שועל',
      color: '#F08C3C',
      art:
        '<path d="M26 28 21 5l18 13z" fill="#E07B39"/>' +
        '<path d="M74 28 79 5 61 18z" fill="#E07B39"/>' +
        '<path d="M28 25 25 12l9 6z" fill="#FFF6EC"/>' +
        '<path d="M72 25 75 12l-9 6z" fill="#FFF6EC"/>' +
        body('#F08C3C') +
        '<circle cx="50" cy="44" r="26" fill="#F08C3C"/>' +
        snout(INK, '#FFF6EC') +
        face() +
        cheeks()
    },
    {
      id: 'rabbit',
      nameHe: 'ארנב',
      color: '#EFF3F6',
      art:
        '<ellipse cx="38" cy="14" rx="7" ry="19" fill="#EFF3F6" stroke="' + C.gray + '" stroke-width="2"/>' +
        '<ellipse cx="62" cy="14" rx="7" ry="19" fill="#EFF3F6" stroke="' + C.gray + '" stroke-width="2"/>' +
        '<ellipse cx="38" cy="15" rx="3.2" ry="13" fill="' + C.pink + '"/>' +
        '<ellipse cx="62" cy="15" rx="3.2" ry="13" fill="' + C.pink + '"/>' +
        body('#EFF3F6') +
        '<circle cx="50" cy="44" r="26" fill="#EFF3F6" stroke="' + C.gray + '" stroke-width="2"/>' +
        snout(C.pink, '#FFFFFF') +
        face() +
        cheeks()
    },
    {
      id: 'penguin',
      nameHe: 'פינגווין',
      color: '#3D4A57',
      art:
        body('#3D4A57') +
        '<ellipse cx="50" cy="80" rx="15" ry="11" fill="#FFF6EC"/>' +
        '<circle cx="50" cy="44" r="26" fill="#3D4A57"/>' +
        '<ellipse cx="50" cy="48" rx="19" ry="19" fill="#FFF6EC"/>' +
        '<path d="M42 50h16l-8 9z" fill="' + C.orange + '"/>' +
        face() +
        '<circle cx="27" cy="52" r="5" fill="' + C.pink + '" opacity=".45"/>' +
        '<circle cx="73" cy="52" r="5" fill="' + C.pink + '" opacity=".45"/>'
    },
    {
      id: 'dragon',
      nameHe: 'דרקון',
      color: '#52C77C',
      art:
        '<path d="M36 20 32 4l12 10z" fill="' + C.mint + '"/>' +
        '<path d="M64 20 68 4 56 14z" fill="' + C.mint + '"/>' +
        '<path d="M18 62q-12-14 0-22 2 12 12 16z" fill="#3FA968"/>' +
        '<path d="M82 62q12-14 0-22-2 12-12 16z" fill="#3FA968"/>' +
        body('#52C77C') +
        '<circle cx="50" cy="44" r="26" fill="#52C77C"/>' +
        '<ellipse cx="50" cy="56" rx="15" ry="10" fill="' + C.mint + '"/>' +
        '<circle cx="45" cy="53" r="2" fill="#3FA968"/>' +
        '<circle cx="55" cy="53" r="2" fill="#3FA968"/>' +
        '<path d="M42 61q8 6 16 0" stroke="#2F8A54" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
        face({ eyeY: 38 })
    },
    {
      id: 'kitten',
      nameHe: 'חתלתול',
      color: '#B7C3CC',
      art:
        '<path d="M28 28 25 6l19 11z" fill="#B7C3CC"/>' +
        '<path d="M72 28 75 6 56 17z" fill="#B7C3CC"/>' +
        '<path d="M31 25 29 13l8 5z" fill="' + C.pink + '"/>' +
        '<path d="M69 25 71 13l-8 5z" fill="' + C.pink + '"/>' +
        body('#B7C3CC') +
        '<circle cx="50" cy="44" r="26" fill="#B7C3CC"/>' +
        '<path d="M40 20v8M50 18v8M60 20v8" stroke="#94A3AD" stroke-width="3.5" stroke-linecap="round"/>' +
        '<ellipse cx="50" cy="55" rx="15" ry="9" fill="#E6ECF0"/>' +
        '<path d="M46 50h8l-4 4z" fill="' + C.pink + '"/>' +
        '<path d="M50 54v3M50 57q-4 4-8 1M50 57q4 4 8 1" stroke="' + INK +
        '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
        '<path d="M24 52h10M24 59h10M66 52h10M66 59h10" stroke="' + INK +
        '" stroke-width="1.8" opacity=".55" stroke-linecap="round"/>' +
        face()
    },
    {
      id: 'puppy',
      nameHe: 'כלבלב',
      color: '#C08552',
      art:
        '<ellipse cx="22" cy="48" rx="9" ry="17" fill="#9C6636"/>' +
        '<ellipse cx="78" cy="48" rx="9" ry="17" fill="#9C6636"/>' +
        body('#C08552') +
        '<circle cx="50" cy="44" r="26" fill="#C08552"/>' +
        '<ellipse cx="38" cy="34" rx="9" ry="7" fill="#9C6636" opacity=".7"/>' +
        snout(INK, C.wheat) +
        '<path d="M45 62h10v5a5 5 0 0 1-10 0z" fill="' + C.pink + '"/>' +
        face()
    },
    {
      id: 'bird',
      nameHe: 'ציפור',
      color: '#5AA0E5',
      art:
        '<path d="M50 12q7 2 8 10-8-1-11-6z" fill="#3B79B8"/>' +
        '<path d="M16 60q-10-12 0-20 2 11 11 15z" fill="#3B79B8"/>' +
        '<path d="M84 60q10-12 0-20-2 11-11 15z" fill="#3B79B8"/>' +
        body('#5AA0E5') +
        '<ellipse cx="50" cy="80" rx="13" ry="10" fill="' + C.sky + '"/>' +
        '<circle cx="50" cy="44" r="26" fill="#5AA0E5"/>' +
        '<path d="M42 50h16l-8 10z" fill="' + C.orange + '"/>' +
        face() +
        '<circle cx="28" cy="52" r="5" fill="' + C.pink + '" opacity=".4"/>' +
        '<circle cx="72" cy="52" r="5" fill="' + C.pink + '" opacity=".4"/>'
    },
    {
      id: 'panda',
      nameHe: 'פנדה',
      color: '#FFFFFF',
      art:
        '<circle cx="26" cy="24" r="11" fill="' + INK + '"/>' +
        '<circle cx="74" cy="24" r="11" fill="' + INK + '"/>' +
        body('#FFFFFF') +
        '<path d="M27 70q-4 12-2 22h12q-3-12 0-22z" fill="' + INK + '"/>' +
        '<path d="M73 70q4 12 2 22H63q3-12 0-22z" fill="' + INK + '"/>' +
        '<circle cx="50" cy="44" r="26" fill="#FFFFFF" stroke="' + C.gray + '" stroke-width="2"/>' +
        '<ellipse cx="40" cy="41" rx="8" ry="10" fill="' + INK + '" transform="rotate(-15 40 41)"/>' +
        '<ellipse cx="60" cy="41" rx="8" ry="10" fill="' + INK + '" transform="rotate(15 60 41)"/>' +
        '<circle cx="41" cy="41" r="3.2" fill="#fff"/>' +
        '<circle cx="59" cy="41" r="3.2" fill="#fff"/>' +
        '<ellipse cx="50" cy="57" rx="6" ry="4.5" fill="' + INK + '"/>' +
        '<path d="M50 61v3M50 64q-5 4-9 0M50 64q5 4 9 0" stroke="' + INK +
        '" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
    },
    {
      id: 'monkey',
      nameHe: 'קוף',
      color: '#A9703F',
      art:
        '<circle cx="20" cy="44" r="11" fill="#A9703F"/>' +
        '<circle cx="80" cy="44" r="11" fill="#A9703F"/>' +
        '<circle cx="20" cy="44" r="6" fill="' + C.wheat + '"/>' +
        '<circle cx="80" cy="44" r="6" fill="' + C.wheat + '"/>' +
        body('#A9703F') +
        '<circle cx="50" cy="44" r="26" fill="#A9703F"/>' +
        '<path d="M50 26c-14 0-22 10-22 22 0 12 10 20 22 20s22-8 22-20c0-12-8-22-22-22z" fill="' + C.wheat + '"/>' +
        '<ellipse cx="50" cy="52" rx="5" ry="3.6" fill="#8A5A33"/>' +
        '<path d="M50 56v3M50 59q-6 5-10 0M50 59q6 5 10 0" stroke="#8A5A33" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        face({ eyeY: 41 })
    },
    {
      id: 'unicorn',
      nameHe: 'חד-קרן',
      color: '#F7EFFB',
      art:
        '<path d="M50 2l7 22H43z" fill="' + C.yellow + '" stroke="#E8A93C" stroke-width="2"/>' +
        '<path d="M45 9h10M44 16h12" stroke="#E8A93C" stroke-width="2" stroke-linecap="round"/>' +
        // רעמה צבעונית משני צדי הראש
        '<path d="M26 22q-14 10-12 28 10-12 20-12z" fill="' + C.pink + '"/>' +
        '<path d="M74 22q14 10 12 28-10-12-20-12z" fill="#B08BE8"/>' +
        '<path d="M20 44q-8 14 2 26 2-14 12-18z" fill="' + C.sky + '"/>' +
        '<path d="M80 44q8 14-2 26-2-14-12-18z" fill="' + C.mint + '"/>' +
        body('#F7EFFB') +
        '<circle cx="50" cy="44" r="26" fill="#F7EFFB" stroke="' + C.gray + '" stroke-width="2"/>' +
        // בלורית מעל המצח
        '<path d="M34 30q6-12 16-8 10-4 16 8-8-4-16 1-8-5-16-1z" fill="' + C.pink + '"/>' +
        '<ellipse cx="50" cy="56" rx="14" ry="9" fill="#FFFFFF"/>' +
        '<circle cx="45" cy="54" r="1.8" fill="' + C.pink + '"/>' +
        '<circle cx="55" cy="54" r="1.8" fill="' + C.pink + '"/>' +
        '<path d="M43 61q7 5 14 0" stroke="' + C.pink + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        face() +
        cheeks()
    }
  ];

  /* ------------------------ פריטי שדרוג ------------------------ */
  // slot = מיקום על הדמות. שני פריטים באותו slot — רק המאוחר מביניהם מוצג.
  var ITEMS = [
    {
      id: 'hat',
      nameHe: 'כובע צמר',
      slot: 'head',
      layer: 'front',
      art:
        '<path d="M27 27c0-13 10-23 23-23s23 10 23 23z" fill="' + C.blue + '"/>' +
        '<rect x="23" y="25" width="54" height="9" rx="4.5" fill="' + C.blueDark + '"/>' +
        '<circle cx="50" cy="3" r="5.5" fill="' + C.yellow + '"/>'
    },
    {
      id: 'scarf',
      nameHe: 'צעיף',
      slot: 'neck',
      layer: 'front',
      art:
        '<path d="M27 65q23 13 46 0v10q-23 13-46 0z" fill="' + C.red + '"/>' +
        '<path d="M62 74l11 22-12 3-7-20z" fill="' + C.red + '"/>' +
        '<path d="M27 70q23 13 46 0" stroke="#C9443E" stroke-width="2" fill="none"/>'
    },
    {
      id: 'glasses',
      nameHe: 'משקפיים',
      slot: 'eyes',
      layer: 'front',
      art:
        '<circle cx="41" cy="40" r="9" fill="' + C.sky + '" opacity=".35"/>' +
        '<circle cx="59" cy="40" r="9" fill="' + C.sky + '" opacity=".35"/>' +
        '<g fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round">' +
        '<circle cx="41" cy="40" r="9"/><circle cx="59" cy="40" r="9"/>' +
        '<path d="M47 38q3-3 6 0M32 37l-9-3M68 37l9-3"/></g>'
    },
    {
      id: 'backpack',
      nameHe: 'תיק גב',
      slot: 'side',
      layer: 'front',
      art:
        '<path d="M76 64v-3a6 6 0 0 1 12 0v3" stroke="#3FA968" stroke-width="3" fill="none"/>' +
        '<rect x="73" y="64" width="21" height="25" rx="6" fill="' + C.green + '"/>' +
        '<rect x="78" y="72" width="11" height="10" rx="3" fill="' + C.mint + '"/>'
    },
    {
      id: 'medal',
      nameHe: 'מדליה',
      slot: 'chest',
      layer: 'front',
      art:
        '<path d="M44 72l-3 9M56 72l3 9" stroke="' + C.blue + '" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="50" cy="86" r="9.5" fill="' + C.yellow + '" stroke="#E8A93C" stroke-width="2"/>' +
        '<g transform="translate(50,86) scale(0.15)" fill="#E8A93C"><path d="' + STAR + '"/></g>'
    },
    {
      id: 'balloon',
      nameHe: 'בלון',
      slot: 'balloon',
      layer: 'front',
      art:
        '<path d="M13 34q4 16-1 28t3 24" stroke="#E88AA8" stroke-width="2" fill="none"/>' +
        '<ellipse cx="13" cy="19" rx="11" ry="13" fill="' + C.pink + '"/>' +
        '<path d="M13 32l-3 5h6z" fill="#E88AA8"/>' +
        '<ellipse cx="9" cy="14" rx="3" ry="4" fill="#fff" opacity=".55"/>'
    },
    {
      id: 'starBadge',
      nameHe: 'סמל כוכב',
      slot: 'badge',
      layer: 'front',
      art:
        '<circle cx="15" cy="84" r="12" fill="' + C.blue + '" stroke="#fff" stroke-width="2"/>' +
        '<g transform="translate(15,84) scale(0.21)" fill="' + C.yellow + '"><path d="' + STAR + '"/></g>'
    },
    {
      id: 'crown',
      nameHe: 'כתר',
      slot: 'head',
      layer: 'front',
      art:
        '<path d="M26 28 30 7l10 11 10-15 10 15 10-11 4 21z" fill="' + C.yellow + '" stroke="#E8A93C" stroke-width="2"/>' +
        '<circle cx="34" cy="18" r="2.6" fill="' + C.red + '"/>' +
        '<circle cx="50" cy="13" r="2.6" fill="' + C.green + '"/>' +
        '<circle cx="66" cy="18" r="2.6" fill="' + C.blue + '"/>' +
        '<rect x="24" y="26" width="52" height="7" rx="3.5" fill="#E8A93C"/>'
    }
  ];

  // הפריט שמוענק בסיום כל שיעור (אינדקס 0 = שיעור 1)
  var LESSON_REWARDS = ['hat', 'scarf', 'glasses', 'backpack', 'medal', 'balloon', 'starBadge', 'crown'];

  var byId = {};
  CHARACTERS.forEach(function (c) { byId[c.id] = c; });

  var itemById = {};
  ITEMS.forEach(function (i) { itemById[i.id] = i; });

  function get(id) {
    return byId[id] || CHARACTERS[0];
  }

  function getItem(id) {
    return itemById[id] || null;
  }

  function rewardForLesson(lessonId) {
    return getItem(LESSON_REWARDS[lessonId - 1]);
  }

  /**
   * בונה את שכבות הפריטים, כאשר בכל slot מוצג רק הפריט האחרון שנצבר.
   */
  function itemLayers(itemIds) {
    var bySlot = {};
    (itemIds || []).forEach(function (id) {
      var item = itemById[id];
      if (item) bySlot[item.slot] = item;
    });
    // סדר ציור קבוע כדי שהתוצאה תיראה זהה בכל פעם
    var order = ['side', 'balloon', 'neck', 'chest', 'eyes', 'head', 'badge'];
    return order
      .filter(function (slot) { return bySlot[slot]; })
      .map(function (slot) { return bySlot[slot].art; })
      .join('');
  }

  /**
   * @param {string} charId
   * @param {{items?: string[], size?: number|string, className?: string, label?: string}} [opts]
   */
  function svg(charId, opts) {
    opts = opts || {};
    var ch = get(charId);
    var size = opts.size == null ? '100%' : (typeof opts.size === 'number' ? opts.size + 'px' : opts.size);
    return (
      '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '" ' +
      'class="' + (opts.className || 'character-svg') + '" role="img" ' +
      'aria-label="' + (opts.label || ch.nameHe) + '" xmlns="http://www.w3.org/2000/svg">' +
      ch.art + itemLayers(opts.items) +
      '</svg>'
    );
  }

  return {
    list: CHARACTERS,
    items: ITEMS,
    get: get,
    getItem: getItem,
    rewardForLesson: rewardForLesson,
    svg: svg
  };
})();
