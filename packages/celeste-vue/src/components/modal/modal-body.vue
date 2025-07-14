<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div
    :class="clsx('celeste-modal-body', props.class)"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.celeste-modal-body {
  padding: var(--spacing-16);

  & + :deep(.celeste-modal-footer) {
    border-block-start: 1px solid var(--color-stroke-soft-200);
  }
}
</style>
