import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import autoprefixer from 'autoprefixer';
import { glob } from 'glob';
import nesting from 'postcss-nesting';
import uno from 'unocss/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';
import vue from './plugins/vue';

function createEntries() {
  const entries = new Map<string, string>();
  const excludeExtensions = ['.spec.ts', '.stories.ts', '.stories.vue'];

  for (const file of glob.sync(['src/**/*.{ts,vue}'])) {
    const fileName = file.split('/').at(-1)?.split('.')[0];

    if (excludeExtensions.some(excludeFile => file.endsWith(excludeFile))) {
      continue;
    }

    if (!fileName) {
      continue;
    }

    entries.set(`${fileName}`, fileURLToPath(new URL(file, import.meta.url)));
  }

  entries.set('index', fileURLToPath(new URL('src/index.ts', import.meta.url)));

  const res = Object.fromEntries(entries);

  return res;
}

export default defineConfig({
  plugins: [
    uno(),
    vue(),
    dts({
      cleanVueFileName: true,
      tsconfigPath: 'tsconfig.build.json',
      exclude: ['src/test/**', 'src/**/stories/**', 'src/**/*.stories.vue'],
    }),
  ],
  css: {
    postcss: { plugins: [nesting, autoprefixer] },
    preprocessorOptions: { scss: { api: 'modern-compiler' } },
  },
  resolve: {
    alias: { '@': resolve(import.meta.dirname, 'src') },
    dedupe: ['vue'],
  },
  build: {
    minify: false,
    copyPublicDir: false,
    emptyOutDir: false,
    lib: {
      name: 'celeste',
      formats: ['es', 'cjs'],
      entry: createEntries(),
    },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies), 'unocss'],
      output: {
        assetFileNames: '[name][extname]',
        entryFileNames: '[format]/[name].js',
        chunkFileNames: (assetInfo) => {
          const suffixToRemove = '.vue_vue_type_script_setup_true_lang';

          if (assetInfo.name?.endsWith(suffixToRemove)) {
            return `[format]/chunks/${assetInfo.name.slice(0, -suffixToRemove.length)}.js`;
          }

          return '[format]/chunks/[name].js';
        },
      },
    },
  },
});
