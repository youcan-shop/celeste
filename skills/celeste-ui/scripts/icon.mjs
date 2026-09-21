#!/usr/bin/env node
import process from 'node:process';
import { args, cap, fail, load, wantsJson } from './lib.mjs';

const LIMIT = 60;
const query = args().join(' ').toLowerCase();

if (!query)
  fail('Usage: node icon.mjs <pattern>\n  e.g. node icon.mjs arrow');

const { icons, prefix } = load('icons.json');
const matches = icons.filter(icon => icon.name.toLowerCase().includes(query));

if (!matches.length) {
  console.log(`No icon matches "${query}".`);
  console.log(`Categories: ${[...new Set(icons.map(icon => icon.category))].sort().join(', ')}`);
  process.exit(0);
}

if (wantsJson()) {
  console.log(JSON.stringify(matches, null, 2));
  process.exit(0);
}

const { shown, note } = cap(matches, LIMIT, 'Narrow the pattern.');
const byCategory = new Map();

for (const icon of shown) {
  const existing = byCategory.get(icon.category) ?? [];
  existing.push(icon.name);
  byCategory.set(icon.category, existing);
}

for (const category of [...byCategory.keys()].sort())
  console.log(`${category}: ${byCategory.get(category).join(', ')}`);

if (note)
  console.log(note);

console.log(`\nRender as a literal class: <i class="i-${prefix}-${shown[0].name}" />`);
console.log('Never interpolate the name — UnoCSS only sees classes written literally.');
