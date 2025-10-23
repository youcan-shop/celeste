<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<TableRowProps>();
</script>

<script lang="ts">
export interface TableRowProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <tr :class="clsx('celeste-table-row', props.class)">
    <slot />
  </tr>
</template>

<style scoped>
.celeste-table-row {
  transition:
    color,
    background-color var(--animation-fast) ease;
}
</style>
