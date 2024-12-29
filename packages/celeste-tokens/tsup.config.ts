import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/preset.ts'],
  format: ['esm'],
  sourcemap: true,
  target: 'esnext',
  outDir: 'dist',
});
