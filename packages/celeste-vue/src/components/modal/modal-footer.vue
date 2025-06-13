<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div
    :class="clsx('celeste-modal-footer', props.class)"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.celeste-modal-footer {
  padding: var(--spacing-16);
}
</style>
