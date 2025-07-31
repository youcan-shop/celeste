import type { PathLike } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

function getAbsolutePath(value): PathLike {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-knobs'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('storybook-rtl-addon'),
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
