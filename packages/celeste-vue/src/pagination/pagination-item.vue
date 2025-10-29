<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import { PaginationListItem, type PaginationListItemProps } from 'radix-vue';

const props = defineProps<PaginationItemProps>();

const delegated = reactiveOmit(props, 'class', 'isActive', 'disabled');
</script>

<script lang="ts">
export interface PaginationItemProps extends PaginationListItemProps {
  class?: HTMLAttributes['class'];
  isActive?: boolean;
  disabled?: boolean;
}
</script>

<template>
  <PaginationListItem
    v-bind="delegated"
    data-slot="pagination-item"
    :class="clsx('celeste-pagination-element', 'celeste-pagination-item', props.class, { 'celeste-pagination-item-active': props.isActive }, props.disabled && 'celeste-pagination-item-disabled')"
  >
    <slot />
  </PaginationListItem>
</template>
