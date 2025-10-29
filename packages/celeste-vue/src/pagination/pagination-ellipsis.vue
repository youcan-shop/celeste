<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import { PaginationEllipsis, type PaginationEllipsisProps as PrimitivePaginationEllipsisProps } from 'radix-vue';

const props = defineProps<PaginationEllipsisProps>();

const delegated = reactiveOmit(props, 'class');
</script>

<script lang="ts">
export interface PaginationEllipsisProps extends PrimitivePaginationEllipsisProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <PaginationEllipsis
    v-bind="delegated"
    :class="clsx('celeste-pagination-element', 'celeste-pagination-ellipsis', props.class)"
    data-slot="pagination-ellipsis"
  >
    <slot>
      <span class="celeste-pagination-ellipsis-dots">...</span>
      <span class="celeste-pagination-ellipsis-sr">More pages</span>
    </slot>
  </PaginationEllipsis>
</template>

<style lang="scss" scoped>
.celeste-pagination-ellipsis {
  user-select: none;
}

.celeste-pagination-ellipsis .celeste-pagination-ellipsis-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border-width: 0;
  white-space: nowrap;
}
</style>
