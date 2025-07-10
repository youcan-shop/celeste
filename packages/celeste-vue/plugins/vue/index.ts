import type { ElementNode, Node } from '@vue/compiler-core';
import type { Plugin } from 'vite';
import process from 'node:process';

/*
This plugin adds additional config to the Vue Vite plugin so that it strips data-testid attributes from the production build.
Reference: https://github.com/vitejs/vite/issues/636#issuecomment-665545551
*/
import vue from '@vitejs/plugin-vue';

const isProd = process.env.NODE_ENV === 'production';

const attrsToStrip = ['test-id', 'data-testid', 'data-testclass'];

function stripAttrs(node: Node): void {
  // If the node is an element node
  if (node.type === 1) {
    const elementNode = node as ElementNode;

    elementNode.props = elementNode.props.filter((prop) => {
      // If the prop is an attr
      if (prop.type === 6) {
        return !attrsToStrip.includes(prop.name);
      }

      return true;
    });
  }
}

export default function vuePlugin(): Plugin {
  return vue({
    template: {
      compilerOptions: {
        nodeTransforms: isProd ? [stripAttrs] : [],
      },
    },
  });
}
