<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<TableHeaderProps>();
</script>

<script lang="ts">
export interface TableHeaderProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <thead :class="clsx('celeste-table-header', props.class)">
    <slot />
  </thead>
</template>

<style scoped>
.celeste-table-header {
  background-color: var(--color-bg-weak-50);
  color: var(--color-text-sub-600);
  font: var(--paragraph-sm);
}
</style>
