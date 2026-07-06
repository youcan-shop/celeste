<script setup lang="ts">
import type { DialogTitleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import { DialogTitle } from 'reka-ui';

export interface SheetTitleProps extends DialogTitleProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<SheetTitleProps>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <DialogTitle
    :class="clsx('celeste-sheet-title', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogTitle>
</template>

<style scoped>
.celeste-sheet-title {
  color: var(--color-text-strong-950);
  font: var(--label-md);
}
</style>
