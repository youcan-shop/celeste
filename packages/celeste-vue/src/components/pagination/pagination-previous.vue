<script setup lang="ts">
import type { PaginationPrevProps as PrimitivePaginationPreviousProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import {
  PaginationPrev as PaginationPrevious,

  useForwardProps,
} from 'reka-ui';

export interface PaginationPreviousProps extends PrimitivePaginationPreviousProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<PaginationPreviousProps>();

const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardProps(delegated);
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
