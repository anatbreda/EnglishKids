/*
 * icons.js — בנק אייקוני SVG למילים.
 *
 * כל אייקון מצויר בתוך viewBox של 100x100, בסגנון אחיד:
 * צורות שטוחות, פינות מעוגלות, ללא טקסט (חוץ ממספרים ואות Z לשינה),
 * כדי שהאייקון לא "יסגיר" את המילה באנגלית בתרגילים.
 */
window.WordIcons = (function () {
  'use strict';

  // גוונים חוזרים — נשמרים כאן כדי שכל האייקונים יישארו באותה משפחת צבעים
  var C = {
    skin: '#FFD9B3',
    skinDark: '#F5C08A',
    hairBrown: '#8B5A2B',
    hairDark: '#5A3A22',
    hairGinger: '#C9752F',
    red: '#E8544E',
    blue: '#4A90D9',
    blueDark: '#3B79B8',
    sky: '#A8D8EA',
    skyPale: '#EAF6FB',
    green: '#52C77C',
    mint: '#B8E6C1',
    yellow: '#FFD166',
    orange: '#FFB84D',
    orangeDark: '#FF9F2E',
    pink: '#F6A5C0',
    brown: '#A9703F',
    brownLight: '#C08552',
    wheat: '#F0C48A',
    wheatDark: '#D9A05B',
    gray: '#C9D4DC',
    grayDark: '#8FA3B0',
    grayPale: '#EAF1F5',
    ink: '#3D4A57',
    white: '#FFFFFF'
  };

  var FONT = 'system-ui, -apple-system, Segoe UI, Arial, sans-serif';

  // עיניים וחיוך סטנדרטיים לדמויות אנוש (העיניים בגובה cy, החיוך מתחתיהן)
  function humanFace(cx, cy) {
    return (
      '<circle cx="' + (cx - 6) + '" cy="' + cy + '" r="2.3" fill="' + C.ink + '"/>' +
      '<circle cx="' + (cx + 6) + '" cy="' + cy + '" r="2.3" fill="' + C.ink + '"/>' +
      '<path d="M' + (cx - 6) + ' ' + (cy + 8) + 'q6 5 12 0" stroke="' + C.ink +
      '" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
    );
  }

  /*
   * שיער נבנה כעיגול שמצויר לפני הפנים, כשעיגול הפנים מוסט מעט כלפי מטה —
   * כך נשארת "כיפת שיער" ברורה בחלק העליון של הראש.
   */
  function headWithHair(cx, cy, faceR, hairFill, skinFill) {
    var hairR = faceR * 1.18;
    return (
      '<circle cx="' + cx + '" cy="' + (cy - faceR * 0.36) + '" r="' + hairR.toFixed(1) +
      '" fill="' + hairFill + '"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + faceR + '" fill="' + (skinFill || C.skin) + '"/>'
    );
  }

  // כוכב חמישה קודקודים סביב הראשית, רדיוס 40
  var STAR =
    'M0,-40 L11.8,-14.5 L38,-12.4 L18.5,4.6 L23.5,30.4 L0,17 ' +
    'L-23.5,30.4 L-18.5,4.6 L-38,-12.4 L-11.8,-14.5 Z';

  function numberIcon(digit, dots) {
    var out =
      '<circle cx="50" cy="50" r="38" fill="' + C.skyPale + '" stroke="' + C.sky + '" stroke-width="4"/>' +
      '<text x="34" y="69" text-anchor="middle" font-size="52" font-weight="800" fill="' +
      C.blue + '" font-family="' + FONT + '">' + digit + '</text>';
    var ys = dots === 1 ? [50] : dots === 2 ? [36, 64] : [30, 50, 70];
    for (var i = 0; i < ys.length; i++) {
      out += '<circle cx="70" cy="' + ys[i] + '" r="7.5" fill="' + C.orange + '"/>';
    }
    return out;
  }

  function paintBlob(color) {
    return (
      '<path d="M50 12c18 0 32 14 32 32 0 20-14 34-32 34S18 64 18 44 32 12 50 12z" fill="' + color + '"/>' +
      '<path d="M74 64c6 4 9 12 4 16s-14 1-13-6c1-5 5-9 9-10z" fill="' + color + '"/>' +
      '<ellipse cx="38" cy="34" rx="9" ry="5" fill="#fff" opacity=".35" transform="rotate(-25 38 34)"/>'
    );
  }

  var ICONS = {
    /* ---------- שיעור 1: משפחה ---------- */
    mother:
      '<ellipse cx="50" cy="48" rx="24" ry="26" fill="' + C.hairBrown + '"/>' +
      headWithHair(50, 47, 17, C.hairBrown) +
      humanFace(50, 46) +
      '<path d="M50 64c-12 0-22 8-22 19v6h44v-6c0-11-10-19-22-19z" fill="' + C.green + '"/>',

    father:
      headWithHair(50, 47, 17, C.hairDark) +
      humanFace(50, 46) +
      // שפם — מבדיל את אבא מאח, שאחרת נראים דומים מדי
      '<path d="M43 50q7-3 14 0-7 3-14 0z" fill="' + C.hairDark + '"/>' +
      '<path d="M50 64c-12 0-22 8-22 19v6h44v-6c0-11-10-19-22-19z" fill="' + C.blue + '"/>',

    sister:
      '<circle cx="25" cy="48" r="9" fill="' + C.hairGinger + '"/>' +
      '<circle cx="75" cy="48" r="9" fill="' + C.hairGinger + '"/>' +
      headWithHair(50, 47, 17, C.hairGinger) +
      humanFace(50, 46) +
      '<path d="M50 64c-12 0-22 8-22 19v6h44v-6c0-11-10-19-22-19z" fill="' + C.pink + '"/>',

    brother:
      headWithHair(50, 47, 17, C.hairBrown) +
      humanFace(50, 46) +
      '<path d="M50 64c-12 0-22 8-22 19v6h44v-6c0-11-10-19-22-19z" fill="' + C.orange + '"/>',

    baby:
      '<circle cx="50" cy="42" r="22" fill="' + C.skin + '"/>' +
      '<path d="M46 20q4-9 8-1" stroke="' + C.hairBrown + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="34" cy="50" r="4.5" fill="' + C.pink + '" opacity=".65"/>' +
      '<circle cx="66" cy="50" r="4.5" fill="' + C.pink + '" opacity=".65"/>' +
      '<circle cx="42" cy="41" r="2.6" fill="' + C.ink + '"/>' +
      '<circle cx="58" cy="41" r="2.6" fill="' + C.ink + '"/>' +
      '<circle cx="50" cy="53" r="5.5" fill="' + C.pink + '"/>' +
      '<circle cx="50" cy="53" r="2.4" fill="' + C.orange + '"/>' +
      '<path d="M50 66c-11 0-19 7-19 16v7h38v-7c0-9-8-16-19-16z" fill="' + C.mint + '"/>',

    family:
      '<g fill="' + C.blue + '"><circle cx="22" cy="40" r="9"/>' +
      '<path d="M22 51c-8 0-14 6-14 14v14h28V65c0-8-6-14-14-14z"/></g>' +
      '<g fill="' + C.green + '"><circle cx="44" cy="36" r="10"/>' +
      '<path d="M44 48c-9 0-16 7-16 16v15h32V64c0-9-7-16-16-16z"/></g>' +
      '<g fill="' + C.pink + '"><circle cx="66" cy="46" r="8"/>' +
      '<path d="M66 56c-7 0-12 5-12 12v11h24V68c0-7-5-12-12-12z"/></g>' +
      '<g fill="' + C.orange + '"><circle cx="84" cy="54" r="6.5"/>' +
      '<path d="M84 62c-5 0-9 4-9 9v8h18v-8c0-5-4-9-9-9z"/></g>',

    /* ---------- שיעור 2: בית ---------- */
    house:
      '<path d="M50 14 8 48h84z" fill="' + C.red + '"/>' +
      '<rect x="18" y="48" width="64" height="40" rx="4" fill="#FFF0DC"/>' +
      '<rect x="42" y="62" width="16" height="26" rx="2" fill="' + C.brown + '"/>' +
      '<circle cx="55" cy="76" r="1.8" fill="' + C.yellow + '"/>' +
      '<rect x="25" y="57" width="13" height="13" rx="2" fill="' + C.sky + '" stroke="#fff" stroke-width="2"/>' +
      '<rect x="62" y="57" width="13" height="13" rx="2" fill="' + C.sky + '" stroke="#fff" stroke-width="2"/>',

    room:
      '<rect x="10" y="18" width="80" height="48" rx="4" fill="' + C.skyPale + '"/>' +
      '<rect x="10" y="66" width="80" height="22" rx="4" fill="' + C.wheatDark + '"/>' +
      '<rect x="20" y="28" width="24" height="19" rx="2" fill="' + C.mint + '" stroke="' + C.green + '" stroke-width="2.5"/>' +
      '<path d="M70 66V45" stroke="' + C.brown + '" stroke-width="3.5" stroke-linecap="round"/>' +
      '<path d="M60 45h20l-5-13H65z" fill="' + C.yellow + '"/>' +
      '<ellipse cx="38" cy="77" rx="19" ry="7" fill="' + C.pink + '"/>',

    bed:
      '<rect x="10" y="36" width="11" height="46" rx="5" fill="' + C.brown + '"/>' +
      '<rect x="80" y="54" width="9" height="28" rx="4" fill="' + C.brown + '"/>' +
      '<rect x="15" y="56" width="70" height="14" rx="4" fill="#fff" stroke="' + C.gray + '" stroke-width="2"/>' +
      '<path d="M42 52h43a4 4 0 0 1 4 4v14H42z" fill="' + C.blue + '"/>' +
      '<rect x="21" y="46" width="22" height="13" rx="5" fill="' + C.grayPale + '" stroke="' + C.gray + '" stroke-width="2"/>' +
      '<rect x="15" y="70" width="74" height="6" rx="3" fill="#8A5A33"/>',

    door:
      '<rect x="27" y="12" width="46" height="76" rx="6" fill="' + C.brown + '"/>' +
      '<rect x="33" y="19" width="34" height="30" rx="4" fill="' + C.brownLight + '"/>' +
      '<rect x="33" y="55" width="34" height="27" rx="4" fill="' + C.brownLight + '"/>' +
      '<circle cx="64" cy="52" r="3.6" fill="' + C.yellow + '"/>',

    window:
      '<rect x="18" y="16" width="64" height="62" rx="5" fill="#fff" stroke="' + C.brown + '" stroke-width="5"/>' +
      '<rect x="25" y="23" width="50" height="48" fill="' + C.sky + '"/>' +
      '<circle cx="38" cy="36" r="7" fill="' + C.yellow + '"/>' +
      '<path d="M50 23v48M25 47h50" stroke="#fff" stroke-width="5"/>' +
      '<path d="M14 14h13v66H14z" fill="' + C.pink + '" opacity=".9"/>' +
      '<path d="M73 14h13v66H73z" fill="' + C.pink + '" opacity=".9"/>',

    kitchen:
      '<path d="M44 24q3-8 0-14M56 24q3-8 0-14" stroke="' + C.sky + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<rect x="30" y="26" width="40" height="6" rx="3" fill="' + C.blueDark + '"/>' +
      '<rect x="34" y="31" width="32" height="20" rx="4" fill="' + C.blue + '"/>' +
      '<path d="M27 38h7M66 38h7" stroke="' + C.blueDark + '" stroke-width="4.5" stroke-linecap="round"/>' +
      '<rect x="12" y="52" width="76" height="8" rx="4" fill="' + C.grayDark + '"/>' +
      '<rect x="12" y="60" width="76" height="28" rx="4" fill="' + C.gray + '"/>' +
      '<rect x="20" y="66" width="26" height="17" rx="3" fill="' + C.grayPale + '"/>' +
      '<rect x="54" y="66" width="26" height="17" rx="3" fill="' + C.grayPale + '"/>',

    /* ---------- שיעור 3: אוכל ---------- */
    apple:
      '<path d="M50 34c-6-7-19-7-24 1-6 11-2 30 6 40 4 6 9 9 18 9s14-3 18-9c8-10 12-29 6-40-5-8-18-8-24-1z" fill="' + C.red + '"/>' +
      '<path d="M50 34V20" stroke="#7A4A2B" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M50 24c6-9 17-9 19-5-2 9-13 11-19 5z" fill="' + C.green + '"/>' +
      '<path d="M36 48c2-6 6-9 10-9" stroke="#fff" stroke-width="4.5" opacity=".45" stroke-linecap="round" fill="none"/>',

    bread:
      '<path d="M16 48c0-13 15-22 34-22s34 9 34 22v22a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6z" fill="' + C.wheatDark + '"/>' +
      '<path d="M22 46c0-9 13-15 28-15s28 6 28 15z" fill="' + C.wheat + '"/>' +
      '<path d="M33 37l7-9M50 35l7-9M67 37l7-9" stroke="#C98A46" stroke-width="3.5" stroke-linecap="round"/>',

    water:
      '<path d="M30 18h40l-5 64a7 7 0 0 1-7 6H42a7 7 0 0 1-7-6z" fill="' + C.skyPale + '" stroke="' + C.sky + '" stroke-width="3"/>' +
      '<path d="M34 44h32l-3 38a5 5 0 0 1-5 4H42a5 5 0 0 1-5-4z" fill="' + C.blue + '" opacity=".85"/>' +
      '<path d="M40 54v20" stroke="#fff" stroke-width="4" opacity=".5" stroke-linecap="round"/>',

    milk:
      '<path d="M28 34h44v50a6 6 0 0 1-6 6H34a6 6 0 0 1-6-6z" fill="#fff" stroke="' + C.gray + '" stroke-width="3"/>' +
      '<path d="M28 34 50 12l22 22z" fill="' + C.grayPale + '" stroke="' + C.gray + '" stroke-width="3"/>' +
      '<rect x="34" y="50" width="32" height="24" rx="4" fill="' + C.blue + '"/>' +
      '<path d="M50 55c0 0 7 9 7 13a7 7 0 0 1-14 0c0-4 7-13 7-13z" fill="#fff"/>',

    pizza:
      '<path d="M50 12l34 64a6 6 0 0 1-5 9H21a6 6 0 0 1-5-9z" fill="' + C.wheat + '"/>' +
      '<path d="M17 74h66l1 2a6 6 0 0 1-5 9H21a6 6 0 0 1-5-9z" fill="' + C.wheatDark + '"/>' +
      '<path d="M50 26l24 46H26z" fill="' + C.yellow + '"/>' +
      '<circle cx="44" cy="52" r="5" fill="' + C.red + '"/>' +
      '<circle cx="58" cy="60" r="5" fill="' + C.red + '"/>' +
      '<circle cx="50" cy="68" r="4.5" fill="' + C.red + '"/>',

    like:
      '<path d="M50 86S14 62 14 40a19 19 0 0 1 36-9 19 19 0 0 1 36 9c0 22-36 46-36 46z" fill="' + C.red + '"/>' +
      '<path d="M30 34c-4 3-6 7-6 11" stroke="#fff" opacity=".5" stroke-width="4.5" fill="none" stroke-linecap="round"/>',

    /* ---------- שיעור 4: בית ספר ---------- */
    bag:
      '<path d="M36 30V26a14 14 0 0 1 28 0v4" stroke="' + C.blueDark + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<path d="M32 30h36a16 16 0 0 1 16 16v34a8 8 0 0 1-8 8H24a8 8 0 0 1-8-8V46a16 16 0 0 1 16-16z" fill="' + C.blue + '"/>' +
      '<rect x="28" y="56" width="44" height="26" rx="5" fill="' + C.sky + '"/>' +
      '<rect x="42" y="40" width="16" height="9" rx="4.5" fill="' + C.yellow + '"/>',

    pencil:
      '<g transform="rotate(-40 50 50)">' +
      '<rect x="41" y="12" width="18" height="10" rx="4" fill="' + C.pink + '"/>' +
      '<rect x="41" y="21" width="18" height="5" fill="' + C.gray + '"/>' +
      '<rect x="41" y="26" width="18" height="42" fill="' + C.yellow + '"/>' +
      '<path d="M41 68h18l-9 18z" fill="' + C.wheat + '"/>' +
      '<path d="M46 78l4 8 4-8z" fill="' + C.ink + '"/>' +
      '</g>',

    book:
      '<path d="M50 28c-10-8-24-11-35-9v52c11-2 25 1 35 9z" fill="' + C.grayPale + '" stroke="' + C.blue + '" stroke-width="3"/>' +
      '<path d="M50 28c10-8 24-11 35-9v52c-11-2-25 1-35 9z" fill="#fff" stroke="' + C.blue + '" stroke-width="3"/>' +
      '<path d="M50 28v52" stroke="' + C.blue + '" stroke-width="3"/>' +
      '<path d="M25 38h16M25 48h16M25 58h12M59 38h16M59 48h16M63 58h12" stroke="' + C.sky +
      '" stroke-width="3" stroke-linecap="round"/>',

    teacher:
      '<rect x="6" y="14" width="48" height="36" rx="3" fill="#3E5F4A" stroke="' + C.brown + '" stroke-width="3"/>' +
      '<path d="M15 26h26M15 36h18" stroke="#fff" stroke-width="3" opacity=".85" stroke-linecap="round"/>' +
      headWithHair(72, 40, 13, C.hairDark) +
      humanFace(72, 39) +
      '<path d="M72 54c-10 0-17 7-17 17v17h34V71c0-10-7-17-17-17z" fill="' + C.green + '"/>' +
      '<path d="M56 62 40 50" stroke="' + C.brown + '" stroke-width="3.5" stroke-linecap="round"/>',

    'class':
      '<rect x="12" y="10" width="76" height="36" rx="4" fill="#3E5F4A" stroke="' + C.brown + '" stroke-width="3"/>' +
      '<path d="M22 22h32M22 33h22" stroke="#fff" stroke-width="3" opacity=".85" stroke-linecap="round"/>' +
      '<g fill="' + C.wheatDark + '"><rect x="10" y="58" width="34" height="6" rx="3"/>' +
      '<rect x="14" y="64" width="4" height="20" rx="2"/><rect x="36" y="64" width="4" height="20" rx="2"/></g>' +
      '<g fill="' + C.wheatDark + '"><rect x="56" y="58" width="34" height="6" rx="3"/>' +
      '<rect x="60" y="64" width="4" height="20" rx="2"/><rect x="82" y="64" width="4" height="20" rx="2"/></g>' +
      '<circle cx="27" cy="52" r="6" fill="' + C.blue + '"/>' +
      '<circle cx="73" cy="52" r="6" fill="' + C.pink + '"/>',

    friend:
      headWithHair(33, 36, 13, C.hairDark) +
      humanFace(33, 35) +
      '<path d="M33 51c-10 0-17 7-17 17v21h34V68c0-10-7-17-17-17z" fill="' + C.blue + '"/>' +
      headWithHair(67, 36, 13, C.hairGinger) +
      humanFace(67, 35) +
      '<path d="M67 51c-10 0-17 7-17 17v21h34V68c0-10-7-17-17-17z" fill="' + C.pink + '"/>' +
      '<path d="M42 70h16" stroke="' + C.skin + '" stroke-width="7" stroke-linecap="round"/>',

    /* ---------- שיעור 5: חיות ---------- */
    dog:
      '<ellipse cx="22" cy="42" rx="10" ry="17" fill="#8A5A33" transform="rotate(-15 22 42)"/>' +
      '<ellipse cx="78" cy="42" rx="10" ry="17" fill="#8A5A33" transform="rotate(15 78 42)"/>' +
      '<circle cx="50" cy="48" r="27" fill="' + C.brownLight + '"/>' +
      '<ellipse cx="50" cy="63" rx="17" ry="13" fill="' + C.wheat + '"/>' +
      '<circle cx="39" cy="42" r="3.4" fill="' + C.ink + '"/>' +
      '<circle cx="61" cy="42" r="3.4" fill="' + C.ink + '"/>' +
      '<ellipse cx="50" cy="56" rx="6.5" ry="5" fill="' + C.ink + '"/>' +
      '<path d="M50 61v5M50 66q-5 5-9 1M50 66q5 5 9 1" stroke="' + C.ink +
      '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M45 71h10v5a5 5 0 0 1-10 0z" fill="' + C.pink + '"/>',

    cat:
      '<path d="M28 36 25 12l20 11z" fill="' + C.orange + '"/>' +
      '<path d="M72 36 75 12 55 23z" fill="' + C.orange + '"/>' +
      '<path d="M31 32 30 20l10 6z" fill="' + C.pink + '"/>' +
      '<path d="M69 32 70 20l-10 6z" fill="' + C.pink + '"/>' +
      '<circle cx="50" cy="52" r="27" fill="' + C.orange + '"/>' +
      '<ellipse cx="39" cy="47" rx="4" ry="5.5" fill="' + C.ink + '"/>' +
      '<ellipse cx="61" cy="47" rx="4" ry="5.5" fill="' + C.ink + '"/>' +
      '<path d="M45 57h10l-5 5z" fill="' + C.pink + '"/>' +
      '<path d="M50 62v3M50 65q-4 4-8 1M50 65q4 4 8 1" stroke="' + C.ink +
      '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '<path d="M20 50h12M20 60h12M68 50h12M68 60h12" stroke="' + C.ink +
      '" stroke-width="2" opacity=".65" stroke-linecap="round"/>',

    bird:
      '<path d="M24 50 6 40l7 14-7 14 18-10z" fill="' + C.blueDark + '"/>' +
      '<ellipse cx="48" cy="56" rx="27" ry="22" fill="' + C.blue + '"/>' +
      '<circle cx="66" cy="38" r="16" fill="#5AA0E5"/>' +
      '<path d="M34 54q14-9 27 4-13 10-27 3z" fill="' + C.sky + '"/>' +
      '<circle cx="72" cy="34" r="3.4" fill="#fff"/>' +
      '<circle cx="72.5" cy="34" r="1.9" fill="' + C.ink + '"/>' +
      '<path d="M80 39l15 4-15 7z" fill="' + C.orange + '"/>' +
      '<path d="M44 77v9M56 77v9" stroke="' + C.orange + '" stroke-width="4" stroke-linecap="round"/>',

    fish:
      '<circle cx="16" cy="26" r="4.5" fill="' + C.sky + '"/>' +
      '<circle cx="26" cy="15" r="3" fill="' + C.sky + '"/>' +
      '<path d="M74 52 96 34v36z" fill="' + C.orangeDark + '"/>' +
      '<ellipse cx="46" cy="52" rx="31" ry="23" fill="' + C.orange + '"/>' +
      '<path d="M48 30q11 3 13 13-10-1-15-8z" fill="' + C.orangeDark + '"/>' +
      '<path d="M52 40q7 12 0 24M64 44q6 8 0 16" stroke="' + C.orangeDark + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="30" cy="45" r="4.5" fill="#fff"/>' +
      '<circle cx="29" cy="45" r="2.3" fill="' + C.ink + '"/>',

    lion:
      '<g fill="#D9822B">' +
      '<circle cx="50" cy="16" r="9"/><circle cx="79" cy="28" r="9"/><circle cx="88" cy="55" r="9"/>' +
      '<circle cx="72" cy="79" r="9"/><circle cx="43" cy="88" r="9"/><circle cx="16" cy="72" r="9"/>' +
      '<circle cx="11" cy="44" r="9"/><circle cx="25" cy="21" r="9"/></g>' +
      '<circle cx="50" cy="50" r="33" fill="#E09A45"/>' +
      '<circle cx="30" cy="32" r="7" fill="#D9822B"/>' +
      '<circle cx="70" cy="32" r="7" fill="#D9822B"/>' +
      '<circle cx="50" cy="52" r="23" fill="#FFD9A0"/>' +
      '<circle cx="41" cy="47" r="3.2" fill="' + C.ink + '"/>' +
      '<circle cx="59" cy="47" r="3.2" fill="' + C.ink + '"/>' +
      '<path d="M45 58h10l-5 5z" fill="#8A5A33"/>' +
      '<path d="M50 63v3M50 66q-5 5-9 0M50 66q5 5 9 0" stroke="#8A5A33" stroke-width="2.6" fill="none" stroke-linecap="round"/>',

    rabbit:
      '<ellipse cx="39" cy="26" rx="7.5" ry="21" fill="#F2F5F7" stroke="' + C.gray + '" stroke-width="2"/>' +
      '<ellipse cx="61" cy="26" rx="7.5" ry="21" fill="#F2F5F7" stroke="' + C.gray + '" stroke-width="2"/>' +
      '<ellipse cx="39" cy="27" rx="3.5" ry="14" fill="' + C.pink + '"/>' +
      '<ellipse cx="61" cy="27" rx="3.5" ry="14" fill="' + C.pink + '"/>' +
      '<circle cx="50" cy="62" r="25" fill="#F2F5F7" stroke="' + C.gray + '" stroke-width="2"/>' +
      '<circle cx="34" cy="66" r="5" fill="' + C.pink + '" opacity=".6"/>' +
      '<circle cx="66" cy="66" r="5" fill="' + C.pink + '" opacity=".6"/>' +
      '<circle cx="41" cy="57" r="3.2" fill="' + C.ink + '"/>' +
      '<circle cx="59" cy="57" r="3.2" fill="' + C.ink + '"/>' +
      '<path d="M46 66h8l-4 4z" fill="' + C.pink + '"/>' +
      '<path d="M50 70v3M50 73q-4 4-8 1M50 73q4 4 8 1" stroke="' + C.ink + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>',

    /* ---------- שיעור 6: גוף ורגשות ---------- */
    hand:
      '<g fill="' + C.skin + '" stroke="#EFB98D" stroke-width="2">' +
      '<rect x="33" y="42" width="36" height="42" rx="17"/>' +
      '<rect x="35" y="18" width="10" height="32" rx="5"/>' +
      '<rect x="46" y="12" width="10" height="38" rx="5"/>' +
      '<rect x="57" y="16" width="10" height="34" rx="5"/>' +
      '<rect x="67" y="26" width="10" height="26" rx="5"/>' +
      '<rect x="19" y="40" width="10" height="28" rx="5" transform="rotate(-22 24 54)"/>' +
      '</g>',

    head:
      '<circle cx="50" cy="45" r="35" fill="none" stroke="' + C.orange + '" stroke-width="3" stroke-dasharray="6 7"/>' +
      '<circle cx="22" cy="50" r="5.5" fill="' + C.skinDark + '"/>' +
      '<circle cx="78" cy="50" r="5.5" fill="' + C.skinDark + '"/>' +
      headWithHair(50, 47, 25, C.hairBrown) +
      '<circle cx="42" cy="47" r="3" fill="' + C.ink + '"/>' +
      '<circle cx="58" cy="47" r="3" fill="' + C.ink + '"/>' +
      '<path d="M43 57q7 6 14 0" stroke="' + C.ink + '" stroke-width="2.8" fill="none" stroke-linecap="round"/>' +
      '<path d="M42 71h16v5c11 2 17 8 17 14H25c0-6 6-12 17-14z" fill="' + C.mint + '"/>',

    // צורת שקד עם ריסים — קריא כ"עיניים" ולא כמשקפיים
    eyes:
      '<path d="M10 30q19-9 38 0" stroke="' + C.ink + '" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M52 30q19-9 38 0" stroke="' + C.ink + '" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M9 56q20-22 40 0-20 22-40 0z" fill="#fff" stroke="' + C.ink +
      '" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<path d="M51 56q20-22 40 0-20 22-40 0z" fill="#fff" stroke="' + C.ink +
      '" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<circle cx="29" cy="56" r="9" fill="#7A4A2B"/><circle cx="29" cy="56" r="4.2" fill="' + C.ink + '"/>' +
      '<circle cx="71" cy="56" r="9" fill="#7A4A2B"/><circle cx="71" cy="56" r="4.2" fill="' + C.ink + '"/>' +
      '<circle cx="26" cy="52" r="2.8" fill="#fff"/><circle cx="68" cy="52" r="2.8" fill="#fff"/>' +
      '<path d="M12 44l-5-6M29 38v-6M46 44l5-6M54 44l-5-6M71 38v-6M88 44l5-6" stroke="' + C.ink +
      '" stroke-width="2.6" stroke-linecap="round" opacity=".55"/>',

    happy:
      '<circle cx="50" cy="50" r="37" fill="' + C.yellow + '"/>' +
      '<circle cx="36" cy="42" r="4.6" fill="' + C.ink + '"/>' +
      '<circle cx="64" cy="42" r="4.6" fill="' + C.ink + '"/>' +
      '<circle cx="26" cy="58" r="6" fill="' + C.pink + '" opacity=".55"/>' +
      '<circle cx="74" cy="58" r="6" fill="' + C.pink + '" opacity=".55"/>' +
      '<path d="M31 58q19 21 38 0" stroke="' + C.ink + '" stroke-width="5" fill="none" stroke-linecap="round"/>',

    sad:
      '<circle cx="50" cy="50" r="37" fill="' + C.sky + '"/>' +
      // גבות עצובות: הקצה הפנימי גבוה והחיצוני נמוך (הפוך מגבות כועסות)
      '<path d="M26 36l16-6M74 36l-16-6" stroke="' + C.ink + '" stroke-width="3.5" stroke-linecap="round"/>' +
      '<circle cx="36" cy="47" r="4.6" fill="' + C.ink + '"/>' +
      '<circle cx="64" cy="47" r="4.6" fill="' + C.ink + '"/>' +
      '<path d="M64 53c0 0 6 10 6 14a6 6 0 0 1-12 0c0-4 6-14 6-14z" fill="' + C.blue + '"/>' +
      '<path d="M33 72q17-16 34 0" stroke="' + C.ink + '" stroke-width="5" fill="none" stroke-linecap="round"/>',

    tired:
      '<circle cx="50" cy="54" r="34" fill="' + C.mint + '"/>' +
      '<path d="M29 46q8 8 16 0M55 46q8 8 16 0" stroke="' + C.ink + '" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="50" cy="68" rx="11" ry="13" fill="' + C.ink + '"/>' +
      '<ellipse cx="50" cy="74" rx="7" ry="6" fill="' + C.pink + '"/>' +
      '<text x="76" y="26" font-size="19" font-weight="800" fill="' + C.blue + '" font-family="' + FONT + '">Z</text>' +
      '<text x="88" y="14" font-size="13" font-weight="800" fill="' + C.blue + '" font-family="' + FONT + '">Z</text>',

    /* ---------- שיעור 7: צבעים, מספרים, מזג אוויר ---------- */
    red: paintBlob(C.red),
    blue: paintBlob(C.blue),
    one: numberIcon('1', 1),
    two: numberIcon('2', 2),
    three: numberIcon('3', 3),

    sunny:
      '<g stroke="' + C.orange + '" stroke-width="6" stroke-linecap="round">' +
      '<path d="M50 6v13M50 81v13M6 50h13M81 50h13M19 19l9 9M72 72l9 9M81 19l-9 9M28 72l-9 9"/></g>' +
      '<circle cx="50" cy="50" r="25" fill="' + C.yellow + '"/>' +
      '<circle cx="42" cy="45" r="3.2" fill="' + C.ink + '"/>' +
      '<circle cx="58" cy="45" r="3.2" fill="' + C.ink + '"/>' +
      '<path d="M40 56q10 10 20 0" stroke="' + C.ink + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>',

    rainy:
      '<path d="M32 58a17 17 0 0 1 2-34 23 23 0 0 1 43 5 15 15 0 0 1-3 29z" fill="' + C.gray + '"/>' +
      '<g fill="' + C.blue + '">' +
      '<path d="M32 64c0 0 6 9 6 13a6 6 0 0 1-12 0c0-4 6-13 6-13z"/>' +
      '<path d="M50 70c0 0 6 9 6 13a6 6 0 0 1-12 0c0-4 6-13 6-13z"/>' +
      '<path d="M68 64c0 0 6 9 6 13a6 6 0 0 1-12 0c0-4 6-13 6-13z"/></g>',

    /* ---------- שיעור 8: היום שלי ---------- */
    morning:
      '<g stroke="' + C.orange + '" stroke-width="5" stroke-linecap="round">' +
      '<path d="M50 10v11M24 22l7 7M76 22l-7 7M8 50h11M81 50h11"/></g>' +
      '<circle cx="50" cy="52" r="21" fill="' + C.yellow + '"/>' +
      '<path d="M4 72c14-15 30-15 44 0s32 14 48-2v22H4z" fill="' + C.green + '"/>' +
      '<path d="M4 82c16-10 32-10 48 0s30 8 44-2v12H4z" fill="#3FA968"/>',

    get_up:
      '<rect x="56" y="58" width="38" height="11" rx="5" fill="' + C.blue + '"/>' +
      '<rect x="56" y="48" width="15" height="12" rx="5" fill="' + C.grayPale + '" stroke="' + C.gray + '" stroke-width="2"/>' +
      '<rect x="57" y="69" width="5" height="14" rx="2" fill="' + C.brown + '"/>' +
      '<rect x="88" y="69" width="5" height="14" rx="2" fill="' + C.brown + '"/>' +
      '<path d="M23 54 12 32M45 54 56 32" stroke="' + C.skin + '" stroke-width="8" stroke-linecap="round"/>' +
      headWithHair(34, 32, 13, C.hairBrown) +
      '<circle cx="30" cy="32" r="2.2" fill="' + C.ink + '"/>' +
      '<circle cx="38" cy="32" r="2.2" fill="' + C.ink + '"/>' +
      '<path d="M29 39q5 4 10 0" stroke="' + C.ink + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M34 46c-9 0-15 6-15 15v24h30V61c0-9-6-15-15-15z" fill="' + C.orange + '"/>',

    eat:
      '<path d="M14 12v20a7 7 0 0 0 7 7v45" stroke="' + C.grayDark + '" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M22 12v18M30 12v20a7 7 0 0 1-7 7" stroke="' + C.grayDark + '" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="84" cy="26" rx="8" ry="12" fill="' + C.grayDark + '"/>' +
      '<rect x="81" y="36" width="6" height="48" rx="3" fill="' + C.grayDark + '"/>' +
      '<circle cx="50" cy="52" r="28" fill="' + C.grayPale + '" stroke="' + C.gray + '" stroke-width="3"/>' +
      '<circle cx="50" cy="52" r="18" fill="#fff"/>' +
      '<circle cx="50" cy="52" r="10" fill="' + C.orange + '"/>',

    play:
      '<rect x="66" y="52" width="26" height="26" rx="5" fill="' + C.blue + '"/>' +
      '<rect x="70" y="26" width="19" height="19" rx="5" fill="' + C.green + '"/>' +
      '<circle cx="36" cy="56" r="26" fill="' + C.red + '"/>' +
      '<path d="M10 56h52M36 30v52" stroke="#fff" stroke-width="4.5"/>' +
      '<circle cx="36" cy="56" r="9" fill="#fff"/>',

    sleep:
      '<path d="M14 56c0-11 9-18 22-18h26c13 0 22 7 22 18s-9 20-22 20H36c-13 0-22-9-22-20z" fill="' + C.grayPale + '" stroke="' + C.gray + '" stroke-width="3"/>' +
      '<path d="M34 54q6 6 12 0M54 54q6 6 12 0" stroke="' + C.ink + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M45 64q5 4 10 0" stroke="' + C.ink + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<text x="60" y="32" font-size="17" font-weight="800" fill="' + C.blue + '" font-family="' + FONT + '">Z</text>' +
      '<text x="74" y="22" font-size="21" font-weight="800" fill="' + C.blue + '" font-family="' + FONT + '">Z</text>' +
      '<text x="88" y="14" font-size="13" font-weight="800" fill="' + C.blue + '" font-family="' + FONT + '">Z</text>',

    night:
      '<rect x="6" y="10" width="88" height="80" rx="14" fill="#2E4A6B"/>' +
      '<path d="M66 22a27 27 0 1 0 9 47 31 31 0 0 1-9-47z" fill="' + C.yellow + '"/>' +
      '<g fill="#FFF3C4">' +
      '<circle cx="24" cy="28" r="3"/><circle cx="36" cy="46" r="2.2"/>' +
      '<circle cx="20" cy="60" r="2.6"/><circle cx="32" cy="74" r="2"/>' +
      '<circle cx="52" cy="80" r="2.4"/></g>',

    /* ---------- מילים נוספות ---------- */
    big:
      '<g transform="translate(37,50) scale(0.85)" fill="' + C.orange + '"><path d="' + STAR + '"/></g>' +
      '<g transform="translate(80,72) scale(0.3)" fill="' + C.sky + '"><path d="' + STAR + '"/></g>' +
      '<path d="M8 92h58" stroke="' + C.blue + '" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M8 88v8M66 88v8" stroke="' + C.blue + '" stroke-width="3" stroke-linecap="round"/>'
  };

  var FALLBACK =
    '<circle cx="50" cy="50" r="36" fill="' + C.skyPale + '" stroke="' + C.sky + '" stroke-width="4"/>' +
    '<text x="50" y="66" text-anchor="middle" font-size="40" font-weight="800" fill="' +
    C.blue + '" font-family="' + FONT + '">?</text>';

  /**
   * מחזיר מחרוזת SVG מלאה לאייקון של מילה.
   * @param {string} id מזהה המילה
   * @param {{size?: number|string, className?: string}} [opts]
   */
  function svg(id, opts) {
    opts = opts || {};
    var body = Object.prototype.hasOwnProperty.call(ICONS, id) ? ICONS[id] : FALLBACK;
    var size = opts.size == null ? '100%' : (typeof opts.size === 'number' ? opts.size + 'px' : opts.size);
    return (
      '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '" ' +
      'class="' + (opts.className || 'word-icon') + '" role="img" aria-hidden="true" ' +
      'xmlns="http://www.w3.org/2000/svg">' + body + '</svg>'
    );
  }

  function has(id) {
    return Object.prototype.hasOwnProperty.call(ICONS, id);
  }

  function ids() {
    return Object.keys(ICONS);
  }

  return { svg: svg, has: has, ids: ids, palette: C };
})();
