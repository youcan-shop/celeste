import icons from '@youcan/celeste-icons/icons.json';
import info from '@youcan/celeste-icons/info.json';
import { defineConfig, presetIcons } from 'unocss';

const dynamicIconsSafeList = Object.keys(icons.icons).map(k => `i-${info.prefix}-${k}`);
const brandIconsSafelist = Object.keys(icons.icons)
  .filter(k => k.startsWith('brand-'))
  .map(k => `i-${info.prefix}-${k}`);

const iconsSafeList = [...dynamicIconsSafeList, ...brandIconsSafelist];

export default defineConfig({
  safelist: iconsSafeList,
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
