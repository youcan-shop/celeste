import presetStyledict from '@youcan/celeste-tokens/preset';
import tokens from '@youcan/celeste-tokens/tokens';
import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetStyledict({
      divider: '-',
      tokens,
    }),
  ],
});
