<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import { PaginationLast, type PaginationLastProps as PrimitivePaginationLastProps, useForwardProps } from 'radix-vue';

const props = defineProps<PaginationLastProps>();

const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardProps(delegated);
</script>

<script lang="ts">
export interface PaginationLastProps extends PrimitivePaginationLastProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <PaginationLast
    :class="clsx('celeste-pagination-element', 'celeste-pagination-last', props.class)"
    data-slot="pagination-last"
    v-bind="forwarded"
  >
    <slot>
      <i class="i-celeste-arrow-right-double-line" />
    </slot>
  </PaginationLast>
</template>
