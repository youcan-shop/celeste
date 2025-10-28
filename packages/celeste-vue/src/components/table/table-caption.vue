<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<TableCaptionProps>();
</script>

<script lang="ts">
export interface TableCaptionProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <caption :class="clsx('celeste-table-caption', props.class)">
    <slot />
  </caption>
</template>

<style scoped>
.celeste-table-caption {
  padding-block: var(--spacing-16);
  color: var(--color-text-soft-400);
  font: var(--paragraph-sm);
}
</style>
