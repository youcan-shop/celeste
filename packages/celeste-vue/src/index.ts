import type { App } from 'vue';
import * as components from '@/components';
import 'virtual:uno.css';

export const Celeste = {
  install(vue: App) {
    Object.entries(components).forEach(([name, component]) => {
      vue.component(name, component);
    });
  },
};

export * from '@/components';
export * from '@/composables';
export * from '@/utils';
