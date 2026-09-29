<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { DialogTitle, DrawerTitle } from 'reka-ui';
import { injectDialogContext } from './context';

export interface DialogTitleProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<DialogTitleProps>();

const { drawer } = injectDialogContext();
</script>

<template>
  <component :is="drawer ? DrawerTitle : DialogTitle" :class="clsx('celeste-dialog-title', props.class)">
    <slot />
  </component>
</template>

<style scoped>
.celeste-dialog-title {
  margin: 0;
  color: var(--color-text-strong-950);
  font: var(--label-lg);
}
</style>
