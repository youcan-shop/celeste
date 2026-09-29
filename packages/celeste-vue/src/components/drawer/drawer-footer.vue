<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
  <div :class="clsx('celeste-drawer-footer', props.class)">
    <slot />
  </div>
</template>

<style scoped>
.celeste-drawer-footer {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  padding: var(--spacing-20);
  border-top: 1px solid var(--color-stroke-soft-200);
  gap: var(--spacing-16);
}
</style>
