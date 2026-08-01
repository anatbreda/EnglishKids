#!/usr/bin/env node
/*
 * build-lessons.js — מייצר את data/lessons.bundle.js מקבצי ה-JSON.
 *
 * הקובץ שנוצר משמש רק כגיבוי לפתיחת index.html כקובץ מקומי (file://),
 * שבה הדפדפן חוסם fetch. כשהאתר רץ משרת, ה-JSON נטען ישירות.
 *
 * הרצה:  node tools/build-lessons.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'data');
const outFile = path.join(dataDir, 'lessons.bundle.js');
const TOTAL_LESSONS = 8;

function readJson(file) {
  const full = path.join(dataDir, file);
  try {
    return JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (err) {
    console.error(`שגיאה בקריאת ${file}: ${err.message}`);
    process.exit(1);
  }
}

const lessons = [];
for (let i = 1; i <= TOTAL_LESSONS; i++) {
  lessons.push(readJson(`lesson-${i}.json`));
}
const extraWords = readJson('extra-words.json');

const banner =
  '/* נוצר אוטומטית על ידי tools/build-lessons.js — אין לערוך ידנית.\n' +
  '   כדי לשנות תוכן: ערכו את data/lesson-N.json והריצו `node tools/build-lessons.js`. */\n';

const payload = { lessons, extraWords };
fs.writeFileSync(outFile, banner + 'window.__LESSON_BUNDLE__ = ' + JSON.stringify(payload, null, 2) + ';\n', 'utf8');

const wordCount = lessons.reduce((sum, l) => sum + l.newWords.length, 0) + extraWords.words.length;
console.log(`נוצר ${path.relative(root, outFile)} — ${lessons.length} שיעורים, ${wordCount} מילים.`);
