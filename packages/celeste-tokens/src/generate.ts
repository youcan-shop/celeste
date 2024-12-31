import { join, resolve } from 'node:path';
import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

const dist = `${resolve(import.meta.dirname, '..', 'dist')}/`;

register(StyleDictionary);

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

sd.cleanAllPlatforms();
sd.buildAllPlatforms();
