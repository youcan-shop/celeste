<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'radix-vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = useDelegatedProps(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="clsx(
      'celeste-dropdown-menu-item',
      props.class,
    )"
  >
    <div v-if="$slots.prefix" class="celeste-dropdown-menu-item-prefix">
      <slot name="prefix" />
    </div>
    <div class="celeste-dropdown-menu-item-body">
      <slot />
    </div>
    <div v-if="$slots.suffix" class="celeste-dropdown-menu-item-suffix">
      <slot name="suffix" />
    </div>
  </DropdownMenuItem>
</template>

<style lang="scss" scoped>
.celeste-dropdown-menu-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-8);
  transition: background-color var(--animation-fast) ease-out;
  border-radius: var(--radius-8);
  background: var(--color-bg-white-0);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  text-decoration: none;
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

  .celeste-dropdown-menu-item-body {
    display: flex;
    flex: 1;
    align-items: center;
    gap: var(--spacing-4);
  }

  .celeste-dropdown-menu-item-prefix,
  .celeste-dropdown-menu-item-suffix {
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
    color: var(--color-icon-sub-600);

    &:deep(i) {
      color: var(--color-icon-sub-600);
    }
  }

  &[data-disabled] {
    color: var(--color-text-disabled-300);
    pointer-events: none;

    .celeste-dropdown-menu-item-prefix,
    .celeste-dropdown-menu-item-suffix {
      color: var(--color-text-disabled-300);

      :deep(i) {
        color: var(--color-icon-disabled-300);
      }
    }
  }
}
</style>
