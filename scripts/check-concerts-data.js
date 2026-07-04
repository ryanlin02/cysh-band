#!/usr/bin/env node
/* 檢查 data/concerts.js 試作資料。
   用法：node scripts/check-concerts-data.js */
const fs = require('fs');
const path = require('path');

global.window = global;
require(path.join(__dirname, '..', 'data', 'concerts.js'));

const concerts = global.CONCERTS;
const allowedStatuses = new Set(['confirmed', 'partial', 'inferred', 'pending', 'planning', 'cancelled']);
const allowedTicketTypes = new Set(['ticketed', 'free', 'free-ticket', 'ceremony', 'unknown', 'none']);
const root = path.join(__dirname, '..');
const errors = [];
const warnings = [];

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

if (!Array.isArray(concerts)) {
  errors.push('window.CONCERTS must be an array.');
} else {
  const ids = new Set();
  concerts.forEach((c, index) => {
    const label = c && c.id ? c.id : `#${index}`;
    if (!c || typeof c !== 'object') {
      errors.push(`${label}: record must be an object.`);
      return;
    }
    if (!c.id) errors.push(`${label}: missing id.`);
    if (ids.has(c.id)) errors.push(`${label}: duplicate id.`);
    ids.add(c.id);

    if (!allowedStatuses.has(c.status)) errors.push(`${label}: invalid status "${c.status}".`);
    if (!c.year) errors.push(`${label}: missing year.`);
    if (c.status !== 'cancelled' && !c.title) errors.push(`${label}: missing title.`);
    if (c.status !== 'cancelled' && c.nth == null) errors.push(`${label}: missing nth.`);
    if (c.ticket && !allowedTicketTypes.has(c.ticket.type)) {
      errors.push(`${label}: invalid ticket.type "${c.ticket.type}".`);
    }

    ['page', 'poster'].forEach((field) => {
      if (c[field] && !exists(c[field])) errors.push(`${label}: ${field} not found: ${c[field]}`);
    });
    ['gallery', 'news'].forEach((field) => {
      (c[field] || []).forEach((rel) => {
        if (!exists(rel)) errors.push(`${label}: ${field} not found: ${rel}`);
      });
    });

    if (c.status === 'confirmed' && !(c.sources || []).length) {
      warnings.push(`${label}: confirmed record should include sources.`);
    }
    if (c.status === 'planning' && !String(c.notes || '').includes('籌備')) {
      warnings.push(`${label}: planning record should mention planning/official announcement notes.`);
    }
  });
}

console.log(`CONCERTS records: ${Array.isArray(concerts) ? concerts.length : 0}`);
if (warnings.length) {
  console.log('\nWarnings:');
  warnings.forEach((w) => console.log(`- ${w}`));
}
if (errors.length) {
  console.error('\nErrors:');
  errors.forEach((e) => console.error(`- ${e}`));
  process.exit(1);
}
console.log('concerts data ok');
