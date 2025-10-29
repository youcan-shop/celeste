import type { PathLike } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

function getAbsolutePath(value): PathLike {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx|vue)'],

  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    'storybook-vue-addon',
  ],

  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {
      docgen: 'vue-component-meta',
    },
  },

  async viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, '../src'),
      'vue': `${getAbsolutePath('vue')}/dist/vue.runtime.esm-bundler.js`,
      '@vue/runtime-dom': `${getAbsolutePath('@vue/runtime-dom')}/dist/runtime-dom.esm-bundler.js`,
      '@vue/runtime-core': `${getAbsolutePath('@vue/runtime-core')}/dist/runtime-core.esm-bundler.js`,
    };

    config.plugins = config.plugins || [];
    config.plugins.push(await import('unocss/vite'));

    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include || []), 'vue'],
    };

    return config;
  },
};

export default config;
