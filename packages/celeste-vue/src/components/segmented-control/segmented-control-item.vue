<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { ToggleGroupItem as SegmentedControlItem, type ToggleGroupItemProps } from 'radix-vue';

const props = defineProps<ToggleGroupItemProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <SegmentedControlItem
    v-bind="delegatedProps"
    :class="clsx('celeste-segmented-control-item', props.class)"
  >
    <slot />
  </SegmentedControlItem>
</template>

<style scoped lang="scss">
.celeste-segmented-control-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-6);
  justify-content: center;
  width: 100%;
  padding: var(--spacing-4);
  transition: color var(--animation-fast) ease-out;
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
