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
