/* eslint-disable antfu/no-top-level-await */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

const dist = `${resolve(import.meta.dirname, '..', 'dist')}/`;

register(StyleDictionary);

// TODO: use a custom fonts cdn

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
`;

function prependFonts(path: string): void {
  const data = readFileSync(path, 'utf8');
  writeFileSync(path, fonts + data, 'utf8');
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

prependFonts(resolve(dist, 'tokens.css'));
prependFonts(resolve(dist, 'tokens.scss'));
