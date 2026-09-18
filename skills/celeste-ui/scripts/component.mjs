#!/usr/bin/env node
import process from 'node:process';
import { args, closest, fail, load, wantsJson } from './lib.mjs';

const names = args();

if (!names.length)
  fail('Usage: node component.mjs <Name> [Name...]\n  Find a name with: node search.mjs <query>');

const { components, version } = load('component-registry.json');

function suggest(name) {
  return closest(name, Object.keys(components));
}

function exampleFor(entry) {
  if (entry.story)
    return { path: entry.story, own: true };

  for (const sibling of entry.siblings) {
    const found = components[sibling];

    if (found?.story)
      return { path: found.story, own: false };
  }

  return null;
}

function renderProp(prop) {
  const type = prop.values?.length ? prop.values.map(value => `'${value}'`).join('|') : prop.type;
  const required = prop.required ? ' (required)' : '';
  const fallback = prop.default ? ` = ${prop.default.replace(/^["']|["']$/g, '')}` : '';
  const note = prop.description ? `  — ${prop.description}` : '';

  return `  ${prop.name}: ${type}${required}${fallback}${note}`;
}

function render(entry) {
  const lines = [`${entry.name} · ${entry.group} · import { ${entry.name} } from '${entry.import}'`];

  if (entry.props.length) {
    lines.push('props');
    lines.push(...entry.props.map(renderProp));
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
      ? `example: ${example.path}`
      : `example: ${example.path} (group story — this component has none of its own)`);
  }

  return lines.join('\n');
}

const found = [];
const missing = [];

for (const name of names) {
  const entry = components[name];

  if (entry)
    found.push(entry);
  else
    missing.push(name);
}

if (found.length) {
  if (wantsJson())
    console.log(JSON.stringify(found, null, 2));
  else
    console.log(found.map(render).join('\n\n'));
}

for (const name of missing) {
  const close = suggest(name);

  console.error(
    `✗ No component named "${name}" in @youcan/celeste@${version}.${
      close.length ? ` Did you mean: ${close.join(', ')}?` : ' Try: node search.mjs <query>'}`,
  );
}

if (!found.length)
  process.exit(1);
