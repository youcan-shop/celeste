import type { IconEntry } from './types.ts';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export function buildIconIndex(iconsPackageRoot: string): { prefix: string; icons: IconEntry[] } {
  const info = JSON.parse(readFileSync(join(iconsPackageRoot, 'dist/info.json'), 'utf8'));
  const collection = JSON.parse(readFileSync(join(iconsPackageRoot, 'dist/icons.json'), 'utf8'));

  const categories = mapNamesToCategories(join(iconsPackageRoot, 'icons'));

  const icons = Object.keys(collection.icons)
    .map(name => ({ name, category: categories.get(name) ?? 'uncategorized' }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return { prefix: info.prefix, icons };
}

function mapNamesToCategories(iconsDir: string): Map<string, string> {
  const categories = new Map<string, string>();

  for (const entry of readdirSync(iconsDir, { withFileTypes: true })) {
    if (!entry.isDirectory())
      continue;

    for (const file of readdirSync(join(iconsDir, entry.name))) {
      if (file.endsWith('.svg'))
        categories.set(file.slice(0, -'.svg'.length), entry.name);
    }
  }

  return categories;
}

const DYNAMIC_ICON_EXAMPLE = `:class="\`i-celeste-\${name}\`"`;

export function renderIconsMarkdown(prefix: string, icons: IconEntry[], version: string): string {
  const categories = new Map<string, string[]>();

  for (const icon of icons) {
    const existing = categories.get(icon.category) ?? [];
    existing.push(icon.name);
    categories.set(icon.category, existing);
  }

  const lines: string[] = [
    '# Celeste Icons',
    '',
    `> Generated from \`@youcan/celeste-icons@${version}\`. Do not edit.`,
    '',
    `**${icons.length} icons.** Render one as a class, not a component:`,
    '',
    '```vue',
    `<i class="i-${prefix}-arrow-down-line" />`,
    '```',
    '',
    'Resolved by the UnoCSS `presetIcons` collection, so the class name must appear',
    `literally in your source. A name built at runtime — \`\`${DYNAMIC_ICON_EXAMPLE}\`\` —`,
    'works in dev and silently renders nothing in a production build, because UnoCSS',
    'never sees it. Map to whole class strings instead, or add the names to `safelist`.',
    '',
    'Most icons come in `-line` and `-fill` pairs.',
    '',
  ];

  for (const category of [...categories.keys()].sort()) {
    const names = categories.get(category)!.sort();

    lines.push('---', '', `## ${category} (${names.length})`, '', names.map(name => `\`${name}\``).join(', '), '');
  }

  return `${lines.join('\n').trimEnd()}\n`;
}
