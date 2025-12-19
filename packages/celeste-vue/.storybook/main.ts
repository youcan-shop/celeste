import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';

const require = createRequire(import.meta.url);

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {
      docgen: 'vue-component-meta',
    },
  },

  async viteFinal(config: any) {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(dirname(new URL(import.meta.url).pathname), '../src'),
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
