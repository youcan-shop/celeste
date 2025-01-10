import icons from '@youcan/celeste-icons/icons.json';
import info from '@youcan/celeste-icons/info.json';
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
      extraProperties: {
        width: '16px',
        height: '16px',
        display: 'block',
      },
      collections: {
        [info.prefix]: () => icons,
      },
    }),
  ],
});
