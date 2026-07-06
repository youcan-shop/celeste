<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

export interface SheetFooterProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<SheetFooterProps>();
</script>

<template>
  <div
    :class="
      clsx(
        'celeste-sheet-footer',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.celeste-sheet-footer {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--spacing-8);
}

@media (width >= 640px) {
  .celeste-sheet-footer {
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
