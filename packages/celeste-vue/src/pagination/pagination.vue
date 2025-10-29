<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import { PaginationRoot, type PaginationRootEmits, type PaginationRootProps, useForwardPropsEmits } from 'radix-vue';

const props = withDefaults(defineProps<PaginationProps>(), { variant: 'basic' });
const emits = defineEmits<PaginationRootEmits>();

const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardPropsEmits(delegated, emits);
</script>

<script lang="ts">
export interface PaginationProps extends PaginationRootProps {
  class?: HTMLAttributes['class'];
  variant: 'basic' | 'rounded' | 'group';
}
</script>

<template>
  <PaginationRoot
    v-slot="sprops"
    v-bind="forwarded"
    data-slot="pagination"
    :class="clsx('celeste-pagination', `celeste-pagination-variant-${props.variant}`, props.class)"
  >
    <div v-if="$slots.leading" class="celeste-pagination-leading">
      <slot name="leading" v-bind="sprops" />
    </div>
    <div class="celeste-pagination-center">
      <slot v-bind="sprops" />
    </div>
    <div v-if="$slots.trailing" class="celeste-pagination-trailing">
      <slot name="trailing" v-bind="sprops" />
    </div>
  </PaginationRoot>
</template>

<style scoped>
:deep(*) {
  box-sizing: border-box;
}

.celeste-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: var(--spacing-8);
}

.celeste-pagination-leading,
.celeste-pagination-trailing {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.celeste-pagination-center {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-8);
}

.celeste-pagination :deep(.celeste-pagination-element) {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  transition: all var(--animation-fast) ease;
  border: 1px solid var(--color-stroke-soft-200);
  background-color: var(--color-bg-white-0);
  color: var(--color-text-sub-600);
  font: var(--label-sm);
  cursor: pointer;
}

.celeste-pagination :deep(.celeste-pagination-element:not(.celeste-pagination-item, .celeste-pagination-ellipsis)) {
  border-color: transparent;
}

.celeste-pagination
  :deep(.celeste-pagination-element:hover:not(:disabled, [disabled], .celeste-pagination-item-active)) {
  border-color: transparent;
  background-color: var(--color-bg-weak-50);
}

.celeste-pagination :deep(.celeste-pagination-element:focus-visible:not(:disabled, [disabled])) {
  outline: none;
  color: var(--color-text-strong-950);
}

.celeste-pagination :deep(.celeste-pagination-element:is(:disabled, [disabled])) {
  color: var(--color-text-disabled-300);
  cursor: not-allowed;
}

.celeste-pagination :deep(.celeste-pagination-item-active) {
  border-color: transparent;
  background-color: var(--color-bg-weak-50);
  color: var(--color-text-strong-950);
  cursor: default;
}

.celeste-pagination :deep(.celeste-pagination-element i) {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

.celeste-pagination-variant-basic :deep(.celeste-pagination-element) {
  border-radius: var(--radius-8);
}

.celeste-pagination-variant-rounded :deep(.celeste-pagination-element) {
  border-radius: var(--radius-full);
}

.celeste-pagination-variant-group :deep(.celeste-pagination-content) {
  overflow: hidden;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-8);
  gap: var(--spacing-0);
}

.celeste-pagination-variant-group :deep(.celeste-pagination-element) {
  width: 40px;
  border: none;
  border-left: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-0);
}

.celeste-pagination-variant-group
  :deep(.celeste-pagination-element:not(.celeste-pagination-item, .celeste-pagination-ellipsis)) {
  border-left-color: var(--color-stroke-soft-200);
}

.celeste-pagination-variant-group :deep(.celeste-pagination-element:first-child) {
  border-left: none;
}

.celeste-pagination-variant-group
  :deep(.celeste-pagination-element:hover:not(:disabled, [disabled], .celeste-pagination-item-active)) {
  border-left-color: var(--color-stroke-soft-200);
}

.celeste-pagination-variant-group :deep(.celeste-pagination-item-active),
.celeste-pagination-variant-group
  :deep(.celeste-pagination-element:hover:not(:disabled, [disabled], .celeste-pagination-item-active) + *) {
  border-left-color: var(--color-stroke-soft-200);
}
</style>
