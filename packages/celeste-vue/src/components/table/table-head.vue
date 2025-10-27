<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<TableHeadProps>();
</script>

<script lang="ts">
export interface TableHeadProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <th :class="clsx('celeste-table-head', props.class)">
    <slot />
  </th>
</template>

<style scoped>
.celeste-table-head {
  padding: var(--spacing-8) var(--spacing-12);
  background: var(--color-bg-weak-50);
  color: var(--color-text-sub-600);
  font: var(--paragraph-sm);
}

.celeste-table-head:first-child {
  border-start-start-radius: var(--radius-8);
  border-end-start-radius: var(--radius-8);
}

.celeste-table-head:last-child {
  border-start-end-radius: var(--radius-8);
  border-end-end-radius: var(--radius-8);
}
</style>
