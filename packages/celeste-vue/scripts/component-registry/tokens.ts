// Parsed from the built tokens.css, not the source JSON, so names match what
// exists at runtime without reimplementing style-dictionary's transforms.
// Requires @youcan/celeste-tokens to be built first.
//
// Semantic == redeclared under [data-theme="dark"]. Not a heuristic: the dark
// theme only overrides tokens that carry meaning, so themed and semantic are
// the same property.

import type { TokenEntry } from './types.ts';
import { readFileSync } from 'node:fs';

const DECLARATION_RE = /--([a-z0-9-]+)\s*:\s*([^;}]+)/gi;

function categoryOf(name: string): string {
  return name.split('-')[0];
}

function parseBlock(css: string, selector: string): Map<string, string> {
  const start = css.indexOf(selector);

  if (start === -1)
    return new Map();

  const open = css.indexOf('{', start);
  const end = css.indexOf('}', open);

  if (open === -1 || end === -1)
    return new Map();

  const body = css.slice(open + 1, end);
  const declarations = new Map<string, string>();

  for (const match of body.matchAll(DECLARATION_RE))
    declarations.set(match[1], match[2].trim());

  return declarations;
}

export function buildTokenIndex(tokensCssPath: string): TokenEntry[] {
  const css = readFileSync(tokensCssPath, 'utf8');

  const light = parseBlock(css, ':root');
  const dark = parseBlock(css, '[data-theme=dark]');

  return [...light.entries()]
    .map(([name, value]) => {
      const darkValue = dark.get(name);
      const themed = darkValue !== undefined && darkValue !== value;

      return {
        name,
        category: categoryOf(name),
        value,
        ...(themed ? { dark: darkValue } : {}),
        semantic: themed,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function renderTokensMarkdown(tokens: TokenEntry[], version: string): string {
  const categories = new Map<string, TokenEntry[]>();

  for (const token of tokens) {
    const existing = categories.get(token.category) ?? [];
    existing.push(token);
    categories.set(token.category, existing);
  }

  const semanticCount = tokens.filter(token => token.semantic).length;

  const lines: string[] = [
    '# Celeste Design Tokens',
    '',
    `> Generated from \`@youcan/celeste-tokens@${version}\`. Do not edit.`,
    '',
    `**${tokens.length} tokens.** Use them as CSS custom properties: \`var(--color-text-sub-600)\`.`,
    '',
    `**${semanticCount} are semantic** — they change automatically under \`[data-theme="dark"]\`.`,
    'Always prefer a semantic token over the primitive it resolves to: `--color-text-sub-600`',
    'adapts to dark mode, `--color-neutral-600` does not.',
    '',
    'Dark mode is applied by setting `data-theme="dark"` on an ancestor, or `data-theme="system"`',
    'to follow the OS. Never hard-code a dark colour.',
    '',
  ];

  for (const category of [...categories.keys()].sort()) {
    const entries = categories.get(category)!;

    lines.push('---', '', `## ${category}`, '');

    const themed = entries.filter(token => token.semantic);
    const fixed = entries.filter(token => !token.semantic);

    if (themed.length) {
      lines.push('### Semantic — prefer these', '');

      for (const token of themed)
        lines.push(`- \`--${token.name}\`: ${token.value} → ${token.dark} in dark`);

      lines.push('');
    }

    if (fixed.length) {
      lines.push(themed.length ? '### Primitive — fixed values' : '', '');

      for (const token of fixed)
        lines.push(`- \`--${token.name}\`: ${token.value}`);

      lines.push('');
    }
  }

  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd()}\n`;
}
