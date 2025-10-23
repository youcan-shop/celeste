<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<TableCellProps>();
</script>

<script lang="ts">
export interface TableCellProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <td :class="clsx('celeste-table-cell', props.class)">
    <slot />
  </td>
</template>

<style scoped>
.celeste-table-cell {
  padding: var(--spacing-8) var(--spacing-12);
}
</style>
