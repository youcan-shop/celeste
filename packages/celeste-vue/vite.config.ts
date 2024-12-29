import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import uno from 'unocss/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const root = resolve(__dirname);

export default defineConfig({
  plugins: [
    uno(),
    vue(),
    dts({
      cleanVueFileName: true,
      tsconfigPath: 'tsconfig.build.json',
      exclude: ['src/test/**', 'src/**/story/**', 'src/**/*.story.vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(root, 'src'),
    },
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
  },
  build: {
    lib: {
      name: 'celeste',
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'umd.cjs'}`,
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
