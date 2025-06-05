<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { SelectIcon, SelectTrigger, type SelectTriggerProps } from 'radix-vue';

const props = withDefaults(defineProps<SelectTriggerProps & {
  class?: HTMLAttributes['class'];
  variant?: 'default' | 'compact' | 'inline';
  size?: 'xs' | 'sm' | 'md';
  hasError?: boolean;
}>(), {
  variant: 'default',
  size: 'md',
});

const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <SelectTrigger
    v-bind="delegatedProps"
    :class="clsx('celeste-select-trigger', props.class)"
  >
    <slot />
    <SelectIcon as-child>
      <i class="i-celeste-arrow-down-s-line" />
    </SelectIcon>
  </SelectTrigger>
</template>

<style scoped lang="scss">
.celeste-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-10);
  transition: all var(--animation-fast) ease-out;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-10);
  outline: 2px solid transparent;
  outline-offset: 2px;
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  cursor: pointer;
  gap: var(--spacing-8);

  & > i {
    transition: rotate var(--animation-fast) ease-out;
  }

  &:deep(.celeste-select-value) {
    flex: 2;
  }

  &[size='xs'] {
    height: 32px;
  }

  &[size='sm'] {
    height: 36px;
  }

  &[size='md'] {
    height: 40px;
  }

  &[variant='compact'] {
    width: fit-content;
  }

  &[variant='inline'] {
    width: fit-content;
    height: fit-content;
    padding: var(--spacing-0);
    border-radius: 0;
    border-color: transparent;
    background-color: transparent;
    box-shadow: none;
  }

  &[haserror='true'] {
    border-color: var(--color-state-error-base);
  }

  &[aria-expanded='true'] {
    & > i {
      rotate: 180deg;
    }
  }

  &:focus > i {
    color: var(--color-icon-strong-950);
  }

  &[data-placeholder] {
    &:deep(.celeste-select-value) {
      color: var(--color-text-sub-600);

      & ~ i {
        color: var(--color-icon-soft-400);
      }
    }

    &:deep(.celeste-select-icon) {
      color: var(--color-icon-soft-400);
    }
  }

  &:disabled {
    border-color: transparent;
    background-color: var(--color-bg-weak-50);
    pointer-events: none;

    &:deep(.celeste-select-value) {
      color: var(--color-text-disabled-300);

      & i,
      & ~ i {
        color: var(--color-icon-disabled-400);
      }

      .celeste-select-icon > img {
        opacity: 0.3;
      }
    }

    &:deep(.celeste-select-icon) {
      color: var(--color-icon-disabled-400);
    }
  }

  &:not([data-placeholder]) {
    &:deep(> :first-child.celeste-select-icon) {
      display: none;
    }
  }

  &:hover {
    &[variant='inline'] {
      & > i,
      &:deep(.celeste-select-icon),
      &:deep(.celeste-select-value) {
        color: var(--color-text-strong-950);
      }
    }

    &:not([variant='inline']) {
      border-color: transparent;
      background-color: var(--color-bg-weak-50);
    }
  }

  &:focus {
    &:not([variant='inline']) {
      border-color: var(--color-stroke-strong-950);
      outline-color: var(--color-stroke-soft-200);
    }
  }
}
</style>
