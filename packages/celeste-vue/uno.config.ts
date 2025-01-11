import process from 'node:process';
import icons from '@youcan/celeste-icons/icons.json';
import info from '@youcan/celeste-icons/info.json';
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';

const safelist = process.env.NODE_ENV === 'dev'
  ? Object.keys(icons.icons).map(k => `i-${info.prefix}-${k}`)
  : [];

export default defineConfig({
  safelist,
  presets: [
    presetUno(),
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
  ],
});
