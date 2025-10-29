<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import {
  PaginationPrev as PaginationPrevious,
  type PaginationPrevProps as PrimitivePaginationPreviousProps,
  useForwardProps,
} from 'radix-vue';

const props = defineProps<PaginationPreviousProps>();

const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardProps(delegated);
</script>

<script lang="ts">
export interface PaginationPreviousProps extends PrimitivePaginationPreviousProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <PaginationPrevious
    :class="clsx('celeste-pagination-element', 'celeste-pagination-previous', props.class)"
    data-slot="pagination-previous"
    v-bind="forwarded"
  >
    <slot>
      <i class="i-celeste-arrow-left-s-line" />
    </slot>
  </PaginationPrevious>
</template>
