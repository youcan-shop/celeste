<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import { PaginationList, type PaginationListProps } from 'radix-vue';

const props = defineProps<PaginationContentProps>();

const delegated = reactiveOmit(props, 'class');
</script>

<script lang="ts">
export interface PaginationContentProps extends PaginationListProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <PaginationList
    v-slot="sprops"
    data-slot="pagination-content"
    v-bind="delegated"
    :class="clsx('celeste-pagination-content', props.class)"
  >
    <slot v-bind="sprops" />
  </PaginationList>
</template>

<style scoped>
.celeste-pagination-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-8);
}
</style>
