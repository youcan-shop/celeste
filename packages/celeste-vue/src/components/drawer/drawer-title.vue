<script setup lang="ts">
import type { DrawerTitleProps as RekaDrawerTitleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import { DrawerTitle } from 'reka-ui';

export interface DrawerTitleProps extends RekaDrawerTitleProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<DrawerTitleProps>();

const delegated = reactiveOmit(props, 'class');
</script>

<template>
  <DrawerTitle :class="clsx('celeste-drawer-title', props.class)" v-bind="delegated">
    <slot />
  </DrawerTitle>
</template>

<style scoped>
.celeste-drawer-title {
  margin: 0;
  color: var(--color-text-strong-950);
  font: var(--label-lg);
}
</style>
