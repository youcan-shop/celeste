<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import { PaginationFirst, type PaginationFirstProps as PrimitivePaginationFirstProps, useForwardProps } from 'radix-vue';

const props = defineProps<PaginationFirstProps>();

const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardProps(delegated);
</script>

<script lang="ts">
export interface PaginationFirstProps extends PrimitivePaginationFirstProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <PaginationFirst
    :class="clsx('celeste-pagination-element', 'celeste-pagination-first', props.class)"
    data-slot="pagination-first"
    v-bind="forwarded"
  >
    <slot>
      <i class="i-celeste-arrow-left-double-line" />
    </slot>
  </PaginationFirst>
</template>
