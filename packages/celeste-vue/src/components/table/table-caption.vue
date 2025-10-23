<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<TableCaptionProps>();
</script>

<script lang="ts">
export interface TableCaptionProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <caption :class="clsx('celeste-table-caption', props.class)">
    <slot />
  </caption>
</template>

<style scoped>
.celeste-table-caption {
  font: var(--paragraph-sm);
}
</style>
