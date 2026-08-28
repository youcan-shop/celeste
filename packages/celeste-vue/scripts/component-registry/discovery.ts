/**
 * Component discovery.
 *
 * The registry describes the PUBLIC API, so components are discovered through
 * the barrel files rather than by globbing `.vue` files. A component that is not
 * re-exported from `src/components/<group>/index.ts` cannot be imported by a
 * consumer, and so has no business being in the registry.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join, relative, resolve } from 'node:path';

export interface DiscoveredComponent {
  /** Public export name, e.g. `Button`. */
  name: string;
  /** Folder name, e.g. `button`. */
  group: string;
  /** Absolute path to the `.vue` file. */
  path: string;
  /** Repo-relative path, for the registry output. */
  file: string;
  /** Repo-relative story path, when one exists. */
  story?: string;
}

/** Matches `export { default as Button } from './button.vue';` */
const EXPORT_RE = /export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*['"](\.\/[^'"]+\.vue)['"]/g;

export function discoverComponents(packageRoot: string): DiscoveredComponent[] {
  const componentsDir = resolve(packageRoot, 'src/components');
  const found: DiscoveredComponent[] = [];

  const groups = readdirSync(componentsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

  for (const group of groups) {
    const indexPath = join(componentsDir, group, 'index.ts');

    if (!existsSync(indexPath))
      continue;

    const source = readFileSync(indexPath, 'utf8');

    for (const match of source.matchAll(EXPORT_RE)) {
      const [, name, specifier] = match;
      const path = resolve(componentsDir, group, specifier);

      if (!existsSync(path))
        continue;

      found.push({
        name,
        group,
        path,
        file: relative(packageRoot, path),
        story: findStory(componentsDir, group, path, packageRoot),
      });
    }
  }

  return found.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Stories live in `<group>/stories/<component>.stories.ts`. They are the only
 * source of real usage examples, so the registry records which components have
 * one — and, by omission, which do not.
 */
function findStory(
  componentsDir: string,
  group: string,
  componentPath: string,
  packageRoot: string,
): string | undefined {
  const stem = basename(componentPath, '.vue');
  const storyPath = join(componentsDir, group, 'stories', `${stem}.stories.ts`);

  return existsSync(storyPath) ? relative(packageRoot, storyPath) : undefined;
}
