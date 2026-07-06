<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

export interface TableFooterProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<TableFooterProps>();
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
