<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<TableFooterProps>();
</script>

<script lang="ts">
export interface TableFooterProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <tfoot :class="clsx('celeste-table-footer', props.class)">
    <slot />
  </tfoot>
</template>

<style scoped>
.celeste-table-footer {
  background-color: var(--color-bg-weak-50);
}
</style>
