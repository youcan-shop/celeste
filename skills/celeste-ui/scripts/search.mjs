#!/usr/bin/env node
import process from 'node:process';
import { args, cap, fail, load, wantsJson } from './lib.mjs';

const LIMIT = 20;
const query = args().join(' ').toLowerCase();

if (!query)
  fail('Usage: node search.mjs <query>\n  e.g. node search.mjs date');

const { components, helpers = {} } = load('component-registry.json');

function score(entry) {
  const name = entry.name.toLowerCase();

  if (name === query)
    return 0;
  if (name.startsWith(query))
    return 1;
  if (name.includes(query))
    return 2;
  if (entry.group.toLowerCase().includes(query))
    return 3;
  if (entry.props.some(prop => prop.name.toLowerCase().includes(query)))
    return 4;

  return Infinity;
}

const matches = Object.values(components)
  .map(entry => ({ entry, rank: score(entry) }))
  .filter(match => match.rank !== Infinity)
  .sort((a, b) => a.rank - b.rank || a.entry.name.localeCompare(b.entry.name));

// Exported functions such as `toast` or `useSidebar`, not components.
const helperMatches = Object.values(helpers)
  .filter(helper => helper.kind === 'function' && helper.name.toLowerCase().includes(query))
  .map(helper => helper.name);

if (helperMatches.length && !wantsJson())
  console.log(`helpers: ${helperMatches.join(', ')}  (node component.mjs ${helperMatches[0]})\n`);

if (!matches.length) {
  console.log(`No component matches "${query}".`);
  console.log('Celeste may not have one — see "Not in Celeste" in SKILL.md before hand-rolling it.');
  process.exit(0);
}

if (wantsJson()) {
  console.log(JSON.stringify(matches.map(match => match.entry.name), null, 2));
  process.exit(0);
}

const { shown, note } = cap(matches, LIMIT, 'Narrow the query.');

for (const { entry } of shown) {
  const propNames = entry.props.map(prop => prop.name);
  const preview = propNames.slice(0, 4).join(', ');
  const extra = propNames.length > 4 ? ` (+${propNames.length - 4})` : '';
  const props = propNames.length ? `props: ${preview}${extra}` : 'no props';

  console.log(`${entry.name} · ${entry.group} · ${props}`);
}

if (note)
  console.log(note);

console.log(`\nFull API: node component.mjs ${shown[0].entry.name}`);
