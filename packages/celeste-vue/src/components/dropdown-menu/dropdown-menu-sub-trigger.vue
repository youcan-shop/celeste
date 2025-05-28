<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import {
  DropdownMenuSubTrigger,
  type DropdownMenuSubTriggerProps,
  useForwardProps,
} from 'radix-vue';

const props = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = useDelegatedProps(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    :class="clsx(props.class, 'celeste-dropdown-menu-sub-trigger')"
  >
    <slot />
    <i class="i-celeste-arrow-right-s-line" />
  </DropdownMenuSubTrigger>
</template>

<style>
.celeste-dropdown-menu-sub-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-8);
  transition-property: background-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border-radius: var(--radius-8);
  background: var(--color-bg-white-0);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  cursor: pointer;
  gap: var(--spacing-8);

  i {
    color: var(--color-icon-sub-600);
  }

  &:focus-visible,
  &:not([data-disabled]):hover,
  &[data-highlighted] {
    outline: none;
    background: var(--color-bg-weak-50);
  }

  &[data-disabled] {
    color: var(--color-text-disabled-300);
    cursor: auto;

    :deep(i) {
      color: var(--color-text-disabled-300);
    }
  }
}
</style>
