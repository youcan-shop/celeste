<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = withDefaults(
  defineProps<TableRowProps>(),
  { hoverable: true },
);
</script>

<script lang="ts">
export interface TableRowProps {
  class?: HTMLAttributes['class'];
  hoverable?: boolean;
}
</script>

<template>
  <tr :class="clsx('celeste-table-row', props.class, { 'celeste-table-row-hoverable': props.hoverable })">
    <slot />
  </tr>
  <tr aria-hidden="true" class="celeste-table-row-divider">
    <td colspan="100" />
  </tr>
</template>

<style scoped>
.celeste-table-row {
  transition:
    color,
    background-color var(--animation-fast) ease;
}

.celeste-table-row-divider {
  height: 0;
}

.celeste-table-row-divider td {
  height: 0;
  padding: var(--spacing-0);
  border-bottom: 1px solid var(--color-stroke-soft-200);
  line-height: 0;
}

.celeste-table-row-divider:last-child {
  display: none;
}

.celeste-table-row-hoverable:hover :deep(.celeste-table-cell) {
  background-color: var(--color-bg-weak-50);
}
</style>
