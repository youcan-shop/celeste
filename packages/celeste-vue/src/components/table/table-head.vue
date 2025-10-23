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
  font: var(--paragraph-sm);
}
</style>
