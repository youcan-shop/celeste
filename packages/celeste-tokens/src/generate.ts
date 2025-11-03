/* eslint-disable antfu/no-top-level-await */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { register } from '@tokens-studio/sd-transforms';
import { minify as csso } from 'csso';
import StyleDictionary from 'style-dictionary';

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

const sd = new StyleDictionary({
  source: [join(import.meta.dirname, 'tokens/**/*.json')],
  log: {
    verbosity: 'verbose',
  },
  preprocessors: [
    'tokens-studio',
  ],
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
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();

prependStubs(resolve(dist, 'tokens.css'));
prependStubs(resolve(dist, 'tokens.scss'));

minify(resolve(dist, 'tokens.css'));
