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
