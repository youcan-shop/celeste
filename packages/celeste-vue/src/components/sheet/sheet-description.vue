<script setup lang="ts">
import type { DialogDescriptionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import { DialogDescription } from 'reka-ui';

export interface SheetDescriptionProps extends DialogDescriptionProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<SheetDescriptionProps>();

const delegated = reactiveOmit(props, 'class');
</script>

<template>
  <DialogDescription
    :class="clsx('celeste-sheet-description', props.class)"
    v-bind="delegated"
  >
    <slot />
  </DialogDescription>
</template>

<style scoped lang="scss">
.celeste-sheet-description {
  color: var(--color-text-sub-600);
  font: var(--paragraph-sm);
}
</style>
