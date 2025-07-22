import icons from '@youcan/celeste-icons/icons.json';
import info from '@youcan/celeste-icons/info.json';
import { defineConfig, presetIcons } from 'unocss';

// Always include all icons in safelist to ensure dynamic class names are detected
const allIconsSafelist = Object.keys(icons.icons).map(k => `i-${info.prefix}-${k}`);

// Add specific patterns for dynamic brand icon classes used in components
const brandIconPatterns = [
  // Social button brand icons with variants
  'i-celeste-brand-apple-white',
  'i-celeste-brand-apple-original',
  'i-celeste-brand-twitter-white',
  'i-celeste-brand-twitter-original',
  'i-celeste-brand-google-white',
  'i-celeste-brand-google-original',
  'i-celeste-brand-facebook-white',
  'i-celeste-brand-facebook-original',
  'i-celeste-brand-linkedin-white',
  'i-celeste-brand-linkedin-original',
  'i-celeste-brand-github-white',
  'i-celeste-brand-github-original',
];

const safelist = [...allIconsSafelist, ...brandIconPatterns];

export default defineConfig({
  safelist,
  presets: [
    presetIcons({
      warn: true,
      extraProperties: {
        width: '16px',
        height: '16px',
        display: 'inline-block',
      },
      collections: {
        [info.prefix]: () => icons,
      },
    }),
  ],
});
