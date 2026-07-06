<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

export interface TableHeaderProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<TableHeaderProps>();
</script>

<template>
  <thead :class="clsx('celeste-table-header', props.class)">
    <slot />
  </thead>
</template>
