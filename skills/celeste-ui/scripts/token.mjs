#!/usr/bin/env node
import process from 'node:process';
import { args, cap, fail, load, wantsJson } from './lib.mjs';

const LIMIT = 40;
const query = args().join(' ').toLowerCase().replace(/^--/, '');

if (!query)
  fail('Usage: node token.mjs <pattern>\n  e.g. node token.mjs text');

const { tokens } = load('tokens.json');
const matches = tokens.filter(token => token.name.toLowerCase().includes(query));

if (!matches.length) {
  console.log(`No token matches "${query}".`);
  console.log(`Categories: ${[...new Set(tokens.map(token => token.category))].sort().join(', ')}`);
  process.exit(0);
}

if (wantsJson()) {
  console.log(JSON.stringify(matches, null, 2));
  process.exit(0);
}

const semantic = matches.filter(token => token.semantic);
const primitive = matches.filter(token => !token.semantic);

function print(list, heading, hint) {
  if (!list.length)
    return;

  console.log(`${heading} (${list.length})`);

  const { shown, note } = cap(list, LIMIT, hint);

  for (const token of shown)
    console.log(`  --${token.name}: ${token.value}${token.dark ? ` → ${token.dark} dark` : ''}`);

  if (note)
    console.log(`  ${note}`);
}

print(semantic, 'semantic — prefer these, they re-theme automatically', 'Narrow the pattern.');
print(primitive, 'primitive — fixed, will not adapt to dark mode', 'Narrow the pattern.');

console.log('\nUse as: var(--<name>). Never hard-code the value, never write a dark-mode override.');
