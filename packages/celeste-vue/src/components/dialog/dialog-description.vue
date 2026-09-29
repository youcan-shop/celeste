<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { DialogDescription, DrawerDescription } from 'reka-ui';
import { injectDialogContext } from './context';

export interface DialogDescriptionProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<DialogDescriptionProps>();

const { drawer } = injectDialogContext();
</script>

<template>
  <component :is="drawer ? DrawerDescription : DialogDescription" :class="clsx('celeste-dialog-description', props.class)">
    <slot />
  </component>
</template>

<style scoped>
.celeste-dialog-description {
  margin: 0;
  color: var(--color-text-sub-600);
  font: var(--paragraph-sm);
}
</style>
