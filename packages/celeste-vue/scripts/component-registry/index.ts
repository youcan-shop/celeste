/**
 * Celeste component registry generator.
 *
 * Emits machine- and agent-readable descriptions of Celeste's public API into
 * `ai/`, for coding agents working in product apps.
 *
 *   Run:    pnpm --filter @youcan/celeste codegen:registry
 *   Output: ai/component-registry.json   full API, for tools
 *           ai/component-registry.md     the same, for agents to read
 *           ai/tokens.md                 every CSS custom property
 *           ai/icons.md                  every icon name
 *
 * The output is gitignored and regenerated on every build, so it cannot drift
 * from source and never conflicts in review. It ships to consumers through the
 * package tarball (`files` includes `ai`), which means an app always reads the
 * API of the exact Celeste version it has installed.
 *
 * Requires `@youcan/celeste-tokens` and `@youcan/celeste-icons` to be built
 * first — the token names and icon list are read from their `dist/` output.
 */

import type { ComponentEntry, ComponentRegistry } from './types.ts';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { discoverComponents } from './discovery.ts';
import { createComponentChecker, extractComponent } from './extract.ts';
import { buildIconIndex, renderIconsMarkdown } from './icons.ts';
import { renderRegistryMarkdown } from './markdown.ts';
import { buildTokenIndex, renderTokensMarkdown } from './tokens.ts';
import { REGISTRY_SCHEMA_VERSION } from './types.ts';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const workspaceRoot = resolve(packageRoot, '../..');
const tokensRoot = join(workspaceRoot, 'packages/celeste-tokens');
const iconsRoot = join(workspaceRoot, 'packages/celeste-icons');
const outputDir = join(packageRoot, 'ai');

function readVersion(packageDir: string): string {
  return JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8')).version;
}

function requireBuilt(path: string, packageName: string): void {
  if (!existsSync(path)) {
    console.error(
      `\n✗ Missing ${path}\n`
      + `  Build ${packageName} first: pnpm --filter ${packageName} build\n`,
    );
    process.exit(1);
  }
}

function buildComponentRegistry(): ComponentRegistry {
  const discovered = discoverComponents(packageRoot);
  const checker = createComponentChecker(packageRoot);

  // Siblings are the other public components in the same folder — how compound
  // components (Select, Table, Sidebar) advertise the parts they compose with.
  const byGroup = new Map<string, string[]>();

  for (const component of discovered) {
    const existing = byGroup.get(component.group) ?? [];
    existing.push(component.name);
    byGroup.set(component.group, existing);
  }

  const components: Record<string, ComponentEntry> = {};
  const failures: string[] = [];

  for (const component of discovered) {
    const siblings = (byGroup.get(component.group) ?? []).filter(name => name !== component.name);

    try {
      components[component.name] = extractComponent(checker, component, siblings);
    }
    catch (error) {
      failures.push(`${component.name} (${component.file}): ${(error as Error).message}`);
    }
  }

  if (failures.length) {
    console.error(`\n✗ Failed to extract ${failures.length} component(s):`);
    for (const failure of failures)
      console.error(`  ${failure}`);
    console.error('\n  The registry must describe the whole public API to be trustworthy.\n');
    process.exit(1);
  }

  return {
    schemaVersion: REGISTRY_SCHEMA_VERSION,
    version: readVersion(packageRoot),
    generatedAt: new Date().toISOString(),
    components,
  };
}

function main(): void {
  const started = Date.now();

  const tokensCss = join(tokensRoot, 'dist/tokens.css');
  const iconsJson = join(iconsRoot, 'dist/icons.json');

  requireBuilt(tokensCss, '@youcan/celeste-tokens');
  requireBuilt(iconsJson, '@youcan/celeste-icons');

  mkdirSync(outputDir, { recursive: true });

  const registry = buildComponentRegistry();
  writeFileSync(join(outputDir, 'component-registry.json'), `${JSON.stringify(registry, null, 2)}\n`);
  writeFileSync(join(outputDir, 'component-registry.md'), renderRegistryMarkdown(registry));

  const tokens = buildTokenIndex(tokensCss);
  writeFileSync(join(outputDir, 'tokens.md'), renderTokensMarkdown(tokens, readVersion(tokensRoot)));

  const { prefix, icons } = buildIconIndex(iconsRoot);
  writeFileSync(join(outputDir, 'icons.md'), renderIconsMarkdown(prefix, icons, readVersion(iconsRoot)));

  const componentCount = Object.keys(registry.components).length;
  const withStories = Object.values(registry.components).filter(component => component.hasStory).length;
  const semantic = tokens.filter(token => token.semantic).length;

  console.log(
    `\n✔ Registry generated in ${((Date.now() - started) / 1000).toFixed(1)}s\n`
    + `  ${componentCount} components (${withStories} with a story, ${componentCount - withStories} without)\n`
    + `  ${tokens.length} tokens (${semantic} semantic)\n`
    + `  ${icons.length} icons\n`
    + `  → ${join('packages/celeste-vue/ai')}\n`,
  );
}

main();
