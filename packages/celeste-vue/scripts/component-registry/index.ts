import type { ComponentEntry, ComponentRegistry, IconIndex, TokenIndex } from './types';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { discoverComponents } from './discovery';
import { createComponentChecker, extractComponent } from './extract';
import { buildIconIndex } from './icons';
import { syncSkillCounts } from './skill';
import { buildTokenIndex } from './tokens';
import { REGISTRY_SCHEMA_VERSION } from './types';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const workspaceRoot = resolve(packageRoot, '../..');
const tokensRoot = join(workspaceRoot, 'packages/celeste-tokens');
const iconsRoot = join(workspaceRoot, 'packages/celeste-icons');
const skillRoot = join(workspaceRoot, 'skills/celeste-ui');
const outputDir = join(packageRoot, 'ai');

function readVersion(packageDir: string): string {
  return JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8')).version;
}

function writeJson(name: string, data: IconIndex | ComponentRegistry | TokenIndex): void {
  writeFileSync(join(outputDir, name), `${JSON.stringify(data, null, 2)}\n`);
}

function readme(version: string, iconCount: number): string {
  return `# Celeste agent indexes

Generated from source for \`@youcan/celeste@${version}\`. Do not edit.

- \`component-registry.json\` — every component's props, events, slots and story
- \`tokens.json\` — every design token, with its dark-mode value where it has one
- \`icons.json\` — every icon name and category

Read them with the \`celeste-ui\` skill's scripts, which return only what was
asked for:

\`\`\`bash
node scripts/search.mjs <query>      # which component to use
node scripts/component.mjs <Name>    # its props, events and slots
node scripts/token.mjs <pattern>     # matching design tokens
node scripts/icon.mjs <pattern>      # matching icon names
\`\`\`

Parsing these files directly, or reading one whole, costs far more than the
answer is worth — \`icons.json\` alone describes ${iconCount.toLocaleString('en-US')} icons.
`;
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

  const generatedAt = new Date().toISOString();

  const registry = buildComponentRegistry();
  writeJson('component-registry.json', registry);

  const tokensVersion = readVersion(tokensRoot);
  const tokens = buildTokenIndex(tokensCss);
  writeJson('tokens.json', { schemaVersion: REGISTRY_SCHEMA_VERSION, version: tokensVersion, generatedAt, tokens });

  const iconsVersion = readVersion(iconsRoot);
  const { prefix, icons } = buildIconIndex(iconsRoot);
  writeJson('icons.json', { schemaVersion: REGISTRY_SCHEMA_VERSION, version: iconsVersion, generatedAt, prefix, icons });

  writeFileSync(join(outputDir, 'README.md'), readme(registry.version, icons.length));

  const componentCount = Object.keys(registry.components).length;
  const withStories = Object.values(registry.components).filter(component => component.hasStory).length;
  const semantic = tokens.filter(token => token.semantic).length;

  let skillChanges: string[];

  try {
    skillChanges = syncSkillCounts(skillRoot, {
      components: componentCount,
      tokens: tokens.length,
      themed: semantic,
      icons: icons.length,
    });
  }
  catch (error) {
    console.error(`\n✗ ${(error as Error).message}\n`);
    process.exit(1);
  }

  console.log(
    `\n✔ Registry generated in ${((Date.now() - started) / 1000).toFixed(1)}s\n`
    + `  ${componentCount} components (${withStories} with a story, ${componentCount - withStories} without)\n`
    + `  ${tokens.length} tokens (${semantic} semantic)\n`
    + `  ${icons.length} icons\n`
    + `  → ${join('packages/celeste-vue/ai')}\n`
    + `  skill counts ${skillChanges.length ? `updated in ${skillChanges.join(', ')}` : 'already up to date'}\n`,
  );
}

main();
