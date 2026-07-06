<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

export interface SheetHeaderProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<SheetHeaderProps>();
</script>

<template>
  <div
    :class="clsx('celeste-sheet-header', props.class)"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.celeste-sheet-header {
  display: flex;
  flex-direction: column;
  font: var(--label-md);
  row-gap: var(--spacing-2);
  text-align: center;
}

@media (width >= 640px) {
  .celeste-sheet-header {
    text-align: start;
  }
}
</style>
