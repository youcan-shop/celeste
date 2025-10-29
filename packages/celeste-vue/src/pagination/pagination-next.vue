<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import { PaginationNext, type PaginationNextProps as PrimitivePaginationNextProps, useForwardProps } from 'radix-vue';

const props = defineProps<PaginationNextProps>();

const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardProps(delegated);
</script>

<script lang="ts">
export interface PaginationNextProps extends PrimitivePaginationNextProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <PaginationNext
    :class="clsx('celeste-pagination-element', 'celeste-pagination-next', props.class)"
    data-slot="pagination-next"
    v-bind="forwarded"
  >
    <slot>
      <i class="i-celeste-arrow-right-s-line" />
    </slot>
  </PaginationNext>
</template>
