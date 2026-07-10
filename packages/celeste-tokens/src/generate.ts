/* eslint-disable antfu/no-top-level-await */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { register } from '@tokens-studio/sd-transforms';
import { minify as csso } from 'csso';
import StyleDictionary from 'style-dictionary';
import { unocssFormat } from './unocss-formatter.ts';

const dist = `${resolve(import.meta.dirname, '..', 'dist')}/`;

register(StyleDictionary);

const fonts = readFileSync(
  resolve(import.meta.dirname, 'stubs/fonts.css'),
  'utf-8',
);

const animations = readFileSync(
  resolve(import.meta.dirname, 'stubs/animations.css'),
  'utf-8',
);

function prependStubs(path: string): void {
  const data = readFileSync(path, 'utf8');
  writeFileSync(path, fonts + animations + data, 'utf8');
}

function minify(path: string): void {
  writeFileSync(path, csso(readFileSync(path, 'utf8')).css, 'utf8');
}

const darkTokensDir = resolve(import.meta.dirname, 'tokens-dark');

function collectOverridePaths(node: any, prefix: string[] = []): string[] {
  const paths: string[] = [];
  for (const [key, value] of Object.entries(node)) {
    if (value && typeof value === 'object') {
      if ('$value' in value)
        paths.push([...prefix, key].join('.'));
      else
        paths.push(...collectOverridePaths(value, [...prefix, key]));
    }
  }
  return paths;
}

async function buildDarkMode(): Promise<void> {
  if (!existsSync(darkTokensDir) || !readdirSync(darkTokensDir).some((f: string) => f.endsWith('.json')))
    return;

  const overridePaths = new Set(
    readdirSync(darkTokensDir)
      .filter((f: string) => f.endsWith('.json'))
      .flatMap((f: string) => collectOverridePaths(JSON.parse(readFileSync(join(darkTokensDir, f), 'utf8')))),
  );

  const darkSd = new StyleDictionary({
    source: [
      join(import.meta.dirname, 'tokens/**/*.json'),
      join(darkTokensDir, '**/*.json'),
    ],
    preprocessors: ['tokens-studio'],
    hooks: {
      formats: {
        'css/dark': ({ dictionary }) => {
          const decls = dictionary.allTokens.map(
            (t: any) => `  --${t.name}: ${t.$value ?? t.value};`,
          );
          const body = decls.join('\n');
          const nested = decls.map((l: string) => `  ${l}`).join('\n');

          return `[data-theme="dark"] {\n${body}\n}\n\n`
            + `@media (prefers-color-scheme: dark) {\n  [data-theme="system"] {\n${nested}\n  }\n}\n`;
        },
      },
    },
    platforms: {
      cssDark: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        buildPath: dist,
        files: [
          {
            destination: 'tokens.dark.css',
            format: 'css/dark',
            filter: (token: any) => overridePaths.has(token.path.join('.')),
          },
        ],
      },
    },
  });

  await darkSd.buildAllPlatforms();

  const darkCss = readFileSync(resolve(dist, 'tokens.dark.css'), 'utf8');
  rmSync(resolve(dist, 'tokens.dark.css'));

  for (const file of ['tokens.css', 'tokens.scss']) {
    const path = resolve(dist, file);
    writeFileSync(path, `${readFileSync(path, 'utf8')}\n${darkCss}`, 'utf8');
  }
}

const sd = new StyleDictionary({
  source: [join(import.meta.dirname, 'tokens/**/*.json')],
  log: {
    verbosity: 'verbose',
  },
  preprocessors: [
    'tokens-studio',
  ],
  hooks: {
    formats: {
      unocss: ({ dictionary }) => unocssFormat({
        dictionary,
        animations,
      }),
    },
  },
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: [
        'name/kebab',
      ],
      buildPath: dist,
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
    scss: {
      transformGroup: 'tokens-studio',
      transforms: [
        'name/kebab',
      ],
      buildPath: dist,
      files: [
        {
          destination: 'tokens.scss',
          format: 'scss/variables',
        },
      ],
    },
    unocss: {
      transformGroup: 'tokens-studio',
      transforms: [
        'name/kebab',
      ],
      buildPath: dist,
      files: [
        {
          destination: 'preset.ts',
          format: 'unocss',
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();

await buildDarkMode();

prependStubs(resolve(dist, 'tokens.css'));
prependStubs(resolve(dist, 'tokens.scss'));

minify(resolve(dist, 'tokens.css'));

const tokensSrc = resolve(import.meta.dirname, 'tokens');
const tokensDist = resolve(dist, 'json');

mkdirSync(tokensDist, { recursive: true });

for (const file of readdirSync(tokensSrc).filter((f: string) => f.endsWith('.json'))) {
  copyFileSync(`${tokensSrc}/${file}`, `${tokensDist}/${file}`);
}
