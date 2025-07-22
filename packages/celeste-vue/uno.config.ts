import icons from '@youcan/celeste-icons/icons.json';
import info from '@youcan/celeste-icons/info.json';
import { defineConfig, presetIcons } from 'unocss';

const brandIconsSafelist = Object.keys(icons.icons)
  .filter(k => k.startsWith('brand-'))
  .map(k => `i-${info.prefix}-${k}`);

export default defineConfig({
  safelist: brandIconsSafelist,
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
