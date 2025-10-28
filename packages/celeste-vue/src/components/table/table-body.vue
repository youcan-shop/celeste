<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<TableBodyProps>();
</script>

<script lang="ts">
export interface TableBodyProps {
  class?: HTMLAttributes['class'];
}
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
