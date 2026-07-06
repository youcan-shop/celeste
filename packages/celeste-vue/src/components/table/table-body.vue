<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

export interface TableBodyProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<TableBodyProps>();
</script>

<template>
  <tbody :class="clsx('celeste-table-body', props.class)">
    <slot />
  </tbody>
</template>

<style scoped>
.celeste-table-body {
  font: var(--paragraph-sm);
}
</style>
