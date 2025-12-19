<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { ToggleGroupItem as SegmentedControlItem, type ToggleGroupItemProps } from 'radix-vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<ToggleGroupItemProps & { class?: HTMLAttributes['class'] }>();
const delegatedProps = useDelegatedProps(props, 'class');

function onKeydown(e: KeyboardEvent) {
  const item = e.currentTarget as HTMLButtonElement;

  if ((e.key === 'Enter' || e.key === ' ') && item.getAttribute('data-state') === 'on') {
    e.preventDefault();
  }
}
</script>

<template>
  <SegmentedControlItem
    v-bind="delegatedProps"
    :class="clsx('celeste-segmented-control-item', props.class)"
    @keydown="onKeydown"
  >
    <slot />
  </SegmentedControlItem>
</template>

<style scoped>
.celeste-segmented-control-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-6);
  justify-content: center;
  width: 100%;
  padding: var(--spacing-4);
  transition: all var(--animation-fast) ease-out;
  border: none;
  border-radius: var(--radius-6);
  background-color: transparent;
  color: var(--color-text-soft-400);
  font: var(--label-sm);
  cursor: pointer;

  &[data-state='on'] {
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-toggle-switch);
    color: var(--color-text-strong-950);
    pointer-events: none;
  }

  &[data-state='off']:hover {
    color: var(--color-text-sub-600);
  }

  &:disabled {
    color: var(--color-text-disabled-300);
    pointer-events: none;
    user-select: none;
  }
}
</style>
