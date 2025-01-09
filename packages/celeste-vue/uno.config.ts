import icons from '@youcan/celeste-icons';
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
        celeste: () => icons.icons,
      },
    }),
  ],
});
