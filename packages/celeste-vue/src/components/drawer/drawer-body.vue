<script setup lang="ts">
import type { DrawerViewportProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import { DrawerViewport } from 'reka-ui';

const props = defineProps<DrawerViewportProps & { class?: HTMLAttributes['class'] }>();

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
