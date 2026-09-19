#!/usr/bin/env node
// Prints the app's Celeste setup in a few lines, so an agent starts from what
// is already in place instead of rediscovering it with ls and cat.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import process from 'node:process';

const SOURCE_EXTENSIONS = /\.(?:vue|[cm]?[jt]sx?|s?css)$/;
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', '.git', '.nuxt', '.output', 'coverage']);
const FILE_LIMIT = 3000;

function findRoot() {
  let dir = process.cwd();

  for (;;) {
    if (existsSync(join(dir, 'package.json')))
      return dir;

    const parent = dirname(dir);

    if (parent === dir)
      return null;

    dir = parent;
  }
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  }
  catch {
    return null;
  }
}

function installedVersion(root, name) {
  return readJson(join(root, 'node_modules', name, 'package.json'))?.version ?? null;
}

function sourceFiles(root) {
  const files = [];
  const pending = [root];

  while (pending.length && files.length < FILE_LIMIT) {
    const dir = pending.pop();

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name) && !entry.name.startsWith('.'))
          pending.push(join(dir, entry.name));
      }
      else if (SOURCE_EXTENSIONS.test(entry.name) || entry.name === 'index.html') {
        files.push(join(dir, entry.name));
      }
    }
  }

  return files;
}

const root = findRoot();

if (!root) {
  console.log('No package.json above the working directory — not inside an app.');
  process.exit(0);
}

const pkg = readJson(join(root, 'package.json')) ?? {};

function packageManager() {
  if (existsSync(join(root, 'pnpm-lock.yaml')))
    return { add: 'pnpm add', dev: 'pnpm add -D' };
  if (existsSync(join(root, 'yarn.lock')))
    return { add: 'yarn add', dev: 'yarn add -D' };
  if (existsSync(join(root, 'bun.lock')) || existsSync(join(root, 'bun.lockb')))
    return { add: 'bun add', dev: 'bun add -d' };

  return { add: 'npm install', dev: 'npm install -D' };
}

const pm = packageManager();
const declared = { ...pkg.dependencies, ...pkg.devDependencies };
const celeste = installedVersion(root, '@youcan/celeste');

if (!celeste) {
  console.log('@youcan/celeste is not installed in this app. See rules/setup.md.');
  process.exit(0);
}

const texts = new Map(sourceFiles(root).map(file => [relative(root, file), readFileSync(file, 'utf8')]));

function filesMatching(pattern) {
  return [...texts].filter(([, text]) => pattern.test(text)).map(([file]) => file);
}

const lines = [];
function check(ok, text, fix = []) {
  lines.push(`  ${ok ? '✓' : '✗'} ${text}`);

  if (!ok)
    lines.push(...fix.map(step => `      ${step}`));
}

const packages = ['@youcan/celeste-tokens', '@youcan/celeste-icons']
  .map(name => `${name.replace('@youcan/celeste-', '')} ${installedVersion(root, name) ?? 'missing'}`);
const undeclared = ['@youcan/celeste-tokens', '@youcan/celeste-icons'].filter(name => !declared[name]);

lines.push(`@youcan/celeste ${celeste} (${packages.join(', ')})`);

if (undeclared.length)
  check(false, `not declared in package.json: ${undeclared.join(', ')} — you import from both. To fix:`, [`${pm.add} ${undeclared.join(' ')}`]);

const tokensCss = filesMatching(/@youcan\/celeste-tokens\/tokens\.s?css/);
const celesteCss = filesMatching(/@youcan\/celeste\/assets\/celeste\.css/);
const cssOrdered = tokensCss.some((file) => {
  const text = texts.get(file);
  const tokensAt = text.search(/@youcan\/celeste-tokens\/tokens/);
  const celesteAt = text.search(/@youcan\/celeste\/assets\/celeste\.css/);

  return celesteAt === -1 || tokensAt < celesteAt;
});

const cssFix = ['main.ts, tokens first:', '  import \'@youcan/celeste-tokens/tokens.css\';', '  import \'@youcan/celeste/assets/celeste.css\';'];

const missingCss = [tokensCss.length ? null : 'tokens.css', celesteCss.length ? null : 'celeste.css'].filter(Boolean);

check(!missingCss.length, missingCss.length
  ? `${missingCss.join(' and ')} not imported — components render unstyled. To fix:`
  : `tokens.css and celeste.css imported (${tokensCss[0]})`, cssFix);

if (tokensCss.length && celesteCss.length && !cssOrdered)
  check(false, 'celeste.css is imported before tokens.css — import tokens first');

const unoConfig = [...texts.keys()].find(file => /(?:^|\/)uno\.config\.[cm]?[jt]s$/.test(file));
const unoIcons = unoConfig && /celeste-icons/.test(texts.get(unoConfig));

check(Boolean(unoIcons), unoIcons
  ? `UnoCSS has the celeste icon collection (${unoConfig}) — any icon renders`
  : 'no UnoCSS icon collection — only the 134 icons Celeste\'s own components use will render. To fix:', [
  `${pm.dev} unocss`,
  'vite.config: import UnoCSS from \'unocss/vite\' and add UnoCSS() to plugins',
  'main.ts: import \'virtual:uno.css\'',
  'uno.config.ts, which builds as-is in a TypeScript project:',
  '  import icons from \'@youcan/celeste-icons/icons.json\';',
  '  import info from \'@youcan/celeste-icons/info.json\';',
  '  import { defineConfig, presetIcons } from \'unocss\';',
  '  export default defineConfig({ presets: [presetIcons({',
  '    collections: { [info.prefix]: () => icons },',
  '    extraProperties: { width: \'16px\', height: \'16px\', display: \'inline-block\' },',
  '  })] });',
]);

const sonnerMounted = filesMatching(/<Sonner[\s/>]/).length > 0;
const sonnerCss = filesMatching(/vue-sonner\/style\.css/).length > 0;

check(sonnerMounted && sonnerCss, sonnerMounted && sonnerCss
  ? 'toasts ready: <Sonner /> mounted, vue-sonner/style.css imported'
  : 'toasts not set up. To fix:', [
  ...(declared['vue-sonner'] ? [] : [`${pm.add} vue-sonner`]),
  ...(sonnerCss ? [] : ['main.ts: import \'vue-sonner/style.css\'']),
  ...(sonnerMounted ? [] : ['App.vue: render <Sonner /> once (import { Sonner } from \'@youcan/celeste\')']),
  'then call toast.success(\'…\') — API: node scripts/component.mjs toast',
]);

if (!declared['@internationalized/date'])
  lines.push(`  · date pickers take @internationalized/date values — ${pm.add} @internationalized/date before importing it`);

const theme = texts.get('index.html')?.match(/<html[^>]*data-theme="([^"]+)"/)?.[1];

lines.push(`  · data-theme: ${theme ?? 'not set, so light only — data-theme="system" on <html> follows the OS'}`);

const users = filesMatching(/from\s+['"]@youcan\/celeste['"]/);

lines.push(`  · ${users.length} file(s) import from @youcan/celeste${users.length ? ` — follow their patterns, e.g. ${users.slice(0, 3).join(', ')}` : ''}`);

console.log(lines.join('\n'));
