<script setup lang="ts">
import type { DrawerViewportProps as RekaDrawerViewportProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import { DrawerViewport } from 'reka-ui';

export interface DrawerBodyProps extends RekaDrawerViewportProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<DrawerBodyProps>();

const delegated = reactiveOmit(props, 'class');
</script>

<template>
  <DrawerViewport :class="clsx('celeste-drawer-body', props.class)" v-bind="delegated">
    <slot />
  </DrawerViewport>
</template>

<style scoped>
.celeste-drawer-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
}
</style>
