#!/usr/bin/env node
import process from 'node:process';
import { args, closest, fail, load, wantsJson } from './lib.mjs';

const names = args();

if (!names.length)
  fail('Usage: node component.mjs <Name|helper> [...] [--full]\n  Find a name with: node search.mjs <query>');

const full = process.argv.includes('--full');
const { components, helpers = {}, version } = load('component-registry.json');

// Accepted by every component, or passed through to reka-ui and rarely needed.
// Listing them on every entry costs more than it tells.
const COMMON_PROPS = new Set(['class', 'as', 'asChild']);
const TYPE_LIMIT = 80;

function suggest(name) {
  return closest(name, [...Object.keys(components), ...Object.keys(helpers)]);
}

// A part with no story of its own is shown through its group's: prefer the
// story named after the group (table.stories.ts for TableRow), then any other.
function exampleFor(entry) {
  if (entry.story)
    return { owner: entry, own: true };

  const siblings = entry.siblings.map(name => components[name]).filter(sibling => sibling?.story);
  const primary = siblings.find(sibling => sibling.story.endsWith(`/${entry.group}.stories.ts`));
  const owner = primary ?? siblings[0];

  return owner ? { owner, own: false } : null;
}

function shorten(type) {
  return type.length > TYPE_LIMIT ? `${type.slice(0, TYPE_LIMIT - 1)}…` : type;
}

function propType(prop) {
  return prop.values?.length ? prop.values.map(value => `'${value}'`).join('|') : prop.type;
}

function renderPropFull(prop) {
  const required = prop.required ? ' (required)' : '';
  const fallback = prop.default ? ` = ${prop.default.replace(/^["']|["']$/g, '')}` : '';
  const note = prop.description ? `  — ${prop.description}` : '';

  return `  ${prop.name}: ${propType(prop)}${required}${fallback}${note}`;
}

function renderPropCompact(prop) {
  const required = prop.required ? '*' : '';
  const fallback = prop.default ? ` = ${prop.default.replace(/^["']|["']$/g, '')}` : '';

  return `${prop.name}${required}: ${shorten(propType(prop))}${fallback}`;
}

// Top-level keys of a slot scope such as `{ page: number; pageCount: number; }`.
function scopeKeys(type) {
  if (!type || type === '{}' || !type.startsWith('{'))
    return [];

  const keys = [];
  let depth = 0;
  let token = '';

  for (const char of type) {
    if ('{[(<'.includes(char))
      depth++;
    else if ('}])>'.includes(char))
      depth--;

    if (depth === 1 && /[\w$]/.test(char)) {
      token += char;
      continue;
    }

    if (depth === 1 && (char === ':' || char === '?') && token)
      keys.push(token);

    if (!/[\w$]/.test(char))
      token = '';
  }

  return [...new Set(keys)];
}

function renderFull(entry) {
  const lines = [`${entry.name} · ${entry.group} · import { ${entry.name} } from '${entry.import}'`];

  if (entry.props.length) {
    lines.push('props');
    lines.push(...entry.props.map(renderPropFull));
  }

  if (entry.events.length) {
    lines.push('events');
    lines.push(...entry.events.map(event => `  ${event.name}: ${event.type}`));
  }

  if (entry.slots.length) {
    lines.push('slots');
    lines.push(...entry.slots.map((slot) => {
      const scope = slot.type && slot.type !== '{}' ? ` — scope ${slot.type}` : '';

      return `  ${slot.name}${scope}`;
    }));
  }

  if (!entry.props.length && !entry.events.length && !entry.slots.length)
    lines.push('  takes no props, events, or slots');

  if (entry.siblings.length)
    lines.push(`composes with: ${entry.siblings.join(', ')}`);

  const example = exampleFor(entry);

  if (example) {
    lines.push(example.own
      ? `example: ${example.owner.story}`
      : `example: ${example.owner.story} (group story — this component has none of its own)`);
  }

  return lines.join('\n');
}

function renderCompact(entry) {
  const lines = [entry.name];
  const models = entry.events
    .filter(event => event.name.startsWith('update:'))
    .map(event => event.name.slice('update:'.length));
  // A v-model's value type is what you most need to know, inherited or not.
  const props = entry.props.filter(prop => !COMMON_PROPS.has(prop.name));
  const own = props.filter(prop => !prop.inherited || models.includes(prop.name));
  const inherited = props.filter(prop => prop.inherited && !models.includes(prop.name));
  const events = entry.events.filter(event => !event.name.startsWith('update:'));

  if (own.length)
    lines.push(...own.map(prop => `  ${renderPropCompact(prop)}`));

  if (inherited.length)
    lines.push(`  inherited: ${inherited.map(prop => `${prop.name}${prop.required ? '*' : ''}`).join(', ')}`);

  if (models.length)
    lines.push(`  v-model: ${models.map(model => model === 'modelValue' ? 'v-model' : `v-model:${model}`).join(', ')}`);

  if (events.length)
    lines.push(`  events: ${events.map(event => `@${event.name}`).join(', ')}`);

  if (entry.slots.length) {
    const slots = entry.slots.map((slot) => {
      const keys = scopeKeys(slot.type);

      return keys.length ? `${slot.name} { ${keys.join(', ')} }` : slot.name;
    });

    lines.push(`  slots: ${slots.join(', ')}`);
  }

  if (lines.length === 1)
    lines.push('  no props of its own');

  return lines.join('\n');
}

// Groups the requested components so each group's parts list and usage print
// once, however many of its parts were asked for.
function renderAllCompact(entries) {
  const groups = new Map();

  for (const entry of entries) {
    const members = groups.get(entry.group) ?? [];
    members.push(entry);
    groups.set(entry.group, members);
  }

  const blocks = [];

  for (const members of groups.values()) {
    const lines = [];
    const [first] = members;
    const parts = [first.name, ...first.siblings].sort();

    lines.push(parts.length > 1
      ? `── ${first.group} · import { … } from '${first.import}' · parts: ${parts.join(', ')}`
      : `── ${first.group} · import { ${first.name} } from '${first.import}'`);

    const shown = new Set();

    for (const entry of members) {
      const example = exampleFor(entry);

      if (example?.owner.usage && !shown.has(example.owner.name)) {
        shown.add(example.owner.name);
        lines.push(`usage (${example.owner.story}):`);
        lines.push(example.owner.usage.split('\n').map(line => `  ${line}`).join('\n'));
      }
    }

    lines.push(...members.map(renderCompact));
    blocks.push(lines.join('\n'));
  }

  blocks.push('* required. Every component also takes `class`. --full adds descriptions, inherited prop types, and event payloads.');

  return blocks.join('\n\n');
}

// Pulls in the exported types a helper's signature mentions, so `toast`
// arrives with `ToastOptions` instead of prompting a second lookup.
function withReferencedTypes(entries) {
  const names = new Set(entries.map(entry => entry.name));
  const ordered = [];

  for (const entry of entries) {
    ordered.push(entry);

    const text = [...entry.signatures, ...entry.members].join(' ');

    for (const word of new Set(text.match(/\b[A-Z]\w+\b/g) ?? [])) {
      const referenced = helpers[word];

      if (referenced?.kind === 'type' && !names.has(word)) {
        names.add(word);
        ordered.push(referenced);
      }
    }
  }

  return ordered;
}

function renderHelpers(entries) {
  return withReferencedTypes(entries).map((entry) => {
    const lines = [`── ${entry.name} · import { ${entry.name} } from '${entry.import}' · ${entry.file}`];

    if (entry.description)
      lines.push(entry.description);

    lines.push(...entry.signatures);
    lines.push(...entry.members.map(member => `  ${member}`));

    return lines.join('\n');
  }).join('\n\n');
}

const found = [];
const foundHelpers = [];
const missing = [];

for (const name of names) {
  if (components[name])
    found.push(components[name]);
  else if (helpers[name])
    foundHelpers.push(helpers[name]);
  else
    missing.push(name);
}

if (wantsJson()) {
  console.log(JSON.stringify([...found, ...foundHelpers], null, 2));
}
else {
  const sections = [];

  if (found.length)
    sections.push(full ? found.map(renderFull).join('\n\n') : renderAllCompact(found));
  if (foundHelpers.length)
    sections.push(renderHelpers(foundHelpers));

  if (sections.length)
    console.log(sections.join('\n\n'));
}

for (const name of missing) {
  const close = suggest(name);

  console.error(
    `✗ No component named "${name}" in @youcan/celeste@${version}.${
      close.length ? ` Did you mean: ${close.join(', ')}?` : ' Try: node search.mjs <query>'}`,
  );
}

if (!found.length && !foundHelpers.length)
  process.exit(1);
