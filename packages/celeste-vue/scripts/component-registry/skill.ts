import type { TokenEntry } from './types';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export interface SkillCounts {
  components: number;
  tokens: number;
  themed: number;
  icons: number;
}

type CountKey = keyof SkillCounts;

const SENTENCES: { file: string; template: string }[] = [
  { file: 'SKILL.md', template: 'design system: {components} Vue 3 components, {tokens} design tokens, and {icons} icons' },
  { file: 'rules/components.md', template: 'Celeste exports {components} components' },
  { file: 'rules/icons.md', template: 'Celeste ships {icons} icons' },
  { file: 'rules/tokens.md', template: 'There are {tokens} of them' },
  { file: 'rules/tokens.md', template: 'through them: {themed} of the {tokens} are redefined' },
];

const PLACEHOLDER_RE = /\{(\w+)\}/g;
const NUMBER = String.raw`(\d[\d,]*)`;

function escape(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, String.raw`\s+`);
}

function compile(template: string): { pattern: RegExp; keys: CountKey[] } {
  const literals = template.split(PLACEHOLDER_RE).filter((_, index) => index % 2 === 0);
  const keys = [...template.matchAll(PLACEHOLDER_RE)].map(match => match[1] as CountKey);
  const source = literals.map(literal => `(${escape(literal)})`).join(NUMBER);

  return { pattern: new RegExp(source), keys };
}

export function syncSkillCounts(skillRoot: string, counts: SkillCounts): string[] {
  const contents = new Map<string, string>();
  const missing: string[] = [];

  for (const { file, template } of SENTENCES) {
    const path = join(skillRoot, file);

    if (!existsSync(path)) {
      missing.push(`${file}: file not found`);
      continue;
    }

    const source = contents.get(file) ?? readFileSync(path, 'utf8');
    const { pattern, keys } = compile(template);

    if (!pattern.test(source)) {
      missing.push(`${file}: "${template}"`);
      continue;
    }

    contents.set(file, source.replace(pattern, (...groups: string[]) => {
      const parts = groups.slice(1, keys.length * 2 + 2);

      return parts
        .map((part, index) => index % 2 === 0 ? part : counts[keys[(index - 1) / 2]].toLocaleString('en-US'))
        .join('');
    }));
  }

  if (missing.length) {
    throw new Error(
      `Could not find these count sentences in the skill:\n    ${missing.join('\n    ')}\n`
      + '  If the wording changed, update SENTENCES in scripts/component-registry/skill.ts.',
    );
  }

  const changed: string[] = [];

  for (const [file, content] of contents) {
    const path = join(skillRoot, file);

    if (readFileSync(path, 'utf8') !== content) {
      writeFileSync(path, content);
      changed.push(file);
    }
  }

  return changed;
}

const SHEET_START = '<!-- generated:tokens -->';
const SHEET_END = '<!-- /generated:tokens -->';

function suffixes(tokens: TokenEntry[], prefix: string): string[] {
  return tokens.filter(token => token.name.startsWith(prefix)).map(token => token.name.slice(prefix.length));
}

// `sub-600` sorts by its number, highest first; plain numbers ascend.
function byScale(values: string[], descending = false): string[] {
  const number = (value: string) => Number(value.match(/\d+$/)?.[0] ?? Infinity);

  return [...values].sort((a, b) => descending ? number(b) - number(a) : number(a) - number(b));
}

function group(prefix: string, values: string[]): string {
  return `\`--${prefix}{${values.join(', ')}}\``;
}

/**
 * The tokens nearly every page reaches for, so an agent can style a page
 * without a round of `token.mjs` lookups. Generated, so it cannot drift.
 */
function tokenSheet(tokens: TokenEntry[]): string {
  const semantic = tokens.filter(token => token.semantic);
  const shades = new Map<string, string[]>();

  for (const name of suffixes(semantic, 'color-state-')) {
    const [state, shade] = [name.slice(0, name.lastIndexOf('-')), name.slice(name.lastIndexOf('-') + 1)];
    shades.set(state, [...(shades.get(state) ?? []), shade]);
  }

  const byShades = new Map<string, string[]>();

  for (const [state, list] of shades) {
    const key = list.join(', ');
    byShades.set(key, [...(byShades.get(key) ?? []), state]);
  }

  const shadows = suffixes(tokens, 'shadow-').filter(name => !/button|toggle/.test(name));
  const paragraphs = suffixes(tokens, 'paragraph-').filter(name => !/indent|spacing/.test(name));

  return [
    `- **Text:** ${group('color-text-', byScale(suffixes(semantic, 'color-text-'), true))}`,
    `- **Background:** ${group('color-bg-', byScale(suffixes(semantic, 'color-bg-'), true))}`,
    `- **Border:** ${group('color-stroke-', byScale(suffixes(semantic, 'color-stroke-'), true))}`,
    `- **Icon:** ${group('color-icon-', byScale(suffixes(semantic, 'color-icon-'), true))}`,
    `- **State:** \`--color-state-<state>-<shade>\` — ${[...byShades].map(([list, states]) => `${states.join(', ')}: ${list}`).join(' · ')}`,
    `- **Spacing:** ${group('spacing-', byScale(suffixes(tokens, 'spacing-')))}`,
    `- **Radius:** ${group('radius-', byScale(suffixes(tokens, 'radius-')))}`,
    `- **Shadow:** ${group('shadow-', shadows)}`,
    `- **Type,** with \`font:\` — ${group('title-', byScale(suffixes(tokens, 'title-')))} · ${group('label-', suffixes(tokens, 'label-'))} · ${group('paragraph-', paragraphs)} · ${group('subheading-', suffixes(tokens, 'subheading-'))}`,
  ].join('\n');
}

export function syncTokenSheet(skillRoot: string, tokens: TokenEntry[]): boolean {
  const path = join(skillRoot, 'SKILL.md');
  const source = readFileSync(path, 'utf8');
  const start = source.indexOf(SHEET_START);
  const end = source.indexOf(SHEET_END);

  if (start === -1 || end < start)
    throw new Error(`SKILL.md is missing the ${SHEET_START} … ${SHEET_END} markers for the token sheet.`);

  // Blank lines around the list, as the markdown formatter leaves them.
  const updated = `${source.slice(0, start + SHEET_START.length)}\n\n${tokenSheet(tokens)}\n\n${source.slice(end)}`;

  if (updated === source)
    return false;

  writeFileSync(path, updated);

  return true;
}
