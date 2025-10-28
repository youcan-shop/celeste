<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = withDefaults(
  defineProps<TableCellProps>(),
  { end: false },
);
</script>

<script lang="ts">
export interface TableCellProps {
  class?: HTMLAttributes['class'];
  end?: boolean;
}
</script>

<template>
  <td
    :class="clsx('celeste-table-cell', props.class, {
      'celeste-table-cell-align-end': props.end,
    })"
  >
    <slot />
  </td>
</template>

<style scoped>
.celeste-table-cell {
  padding: var(--spacing-12) var(--spacing-12);
  transition: background-color var(--animation-fast) ease;
  background-color: var(--color-bg-white-0);
}

.celeste-table-cell:first-child {
  position: relative;
  border-start-start-radius: var(--radius-12);
  border-end-start-radius: var(--radius-12);
}

.celeste-table-cell:last-child {
  border-start-end-radius: var(--radius-12);
  border-end-end-radius: var(--radius-12);
}

.celeste-table-cell-align-end {
  text-align: end;
}
</style>
