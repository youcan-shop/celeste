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
