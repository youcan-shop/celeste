import process from 'node:process';
import icons from '@youcan/celeste-icons/icons.json';
import info from '@youcan/celeste-icons/info.json';
import { defineConfig, presetAttributify, presetIcons, presetMini } from 'unocss';

const safelist = process.env.NODE_ENV === 'dev'
  ? Object.keys(icons.icons).map(k => `i-${info.prefix}-${k}`)
  : Object.keys(icons.icons).filter(k => k.startsWith('brand')).map(k => `i-${info.prefix}-${k}`);

const presets = [
  presetAttributify(),
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
];

// not bundled, only for storybooks
if (process.env.NODE_ENV === 'dev') {
  presets.unshift(presetMini());
}

export default defineConfig({
  safelist,
  presets,
});
