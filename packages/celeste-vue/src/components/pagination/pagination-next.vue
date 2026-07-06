<script setup lang="ts">
import type { PaginationNextProps as PrimitivePaginationNextProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import { PaginationNext, useForwardProps } from 'reka-ui';

export interface PaginationNextProps extends PrimitivePaginationNextProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<PaginationNextProps>();

const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardProps(delegated);
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
