<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<TableProps>();
</script>

<script lang="ts">
export interface TableProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <div class="celeste-table-wrapper">
    <table :class="clsx('celeste-table', props.class)">
      <slot />
    </table>
  </div>
</template>

<style scoped>
.celeste-table-wrapper {
  position: relative;
  width: 100%;
  overflow: auto;
}

.celeste-table-wrapper .celeste-table {
  width: 100%;
  caption-side: bottom;
  border-spacing: 0 var(--spacing-4);
  border-collapse: separate;
  font: var(--paragraph-sm);
}
</style>
