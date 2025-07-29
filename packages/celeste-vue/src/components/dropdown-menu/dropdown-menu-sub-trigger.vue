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
    <div v-if="$slots.prefix" class="celeste-dropdown-menu-sub-prefix">
      <slot name="prefix" />
    </div>
    <div class="celeste-dropdown-menu-sub-body">
      <slot />
    </div>
    <i class="i-celeste-arrow-right-s-line" />
  </DropdownMenuSubTrigger>
</template>

<style lang="scss" scoped>
.celeste-dropdown-menu-sub-trigger {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-8);
  transition: background-color var(--animation-fast) ease-out;
  border-radius: var(--radius-8);
  background: var(--color-bg-white-0);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  cursor: pointer;
  gap: var(--spacing-8);

  i {
    color: var(--color-icon-sub-600);

    &:dir(rtl) {
      transform: rotate(180deg);
    }
  }

  &:focus-visible,
  &:not([data-disabled]):hover,
  &[data-state='open'],
  &[data-highlighted] {
    outline: none;
    background: var(--color-bg-weak-50);
  }

  .celeste-dropdown-menu-sub-prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 50%;
    height: fit-content;
    color: var(--color-icon-sub-600);

    &:deep(i) {
      color: var(--color-icon-sub-600);
    }
  }

  &[data-disabled] {
    color: var(--color-text-disabled-300);
    cursor: auto;

    .celeste-dropdown-menu-sub-prefix {
      color: var(--color-text-disabled-300);

      :deep(i) {
        color: var(--color-icon-disabled-300);
      }
    }
  }

  .celeste-dropdown-menu-sub-body {
    flex: 1;
  }
}
</style>
