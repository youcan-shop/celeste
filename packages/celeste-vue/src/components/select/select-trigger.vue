<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { SelectIcon, SelectTrigger, type SelectTriggerProps } from 'radix-vue';

const props = withDefaults(defineProps<SelectTriggerProps & {
  class?: HTMLAttributes['class'];
  variant?: 'default' | 'compact' | 'inline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
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

<style scoped>
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

  &[size='xs'] {
    height: 32px;
  }

  &[size='sm'] {
    height: 36px;
  }

  &[size='md'] {
    height: 40px;
  }

  &[size='lg'] {
    height: 56px;
  }

  &[variant='compact'] {
    width: fit-content;
  }

  &[variant='inline'] {
    width: fit-content;
    height: fit-content;
    padding: var(--spacing-0);
    border-color: transparent;
    background-color: transparent;
    box-shadow: none;
  }

  &[haserror='true'] {
    border-color: var(--color-state-error-base);
  }

  &:disabled {
    border-color: transparent;
    background-color: var(--color-bg-weak-50);

    &:deep(.celeste-select-value) {
      color: var(--color-text-disabled-300);

      & ~ i {
        color: var(--color-icon-disabled-400);
      }
    }
  }

  &:not([data-variant='inline']) {
    &:hover {
      border-color: transparent;
      background-color: var(--color-bg-weak-50);
    }

    &:focus {
      border-color: var(--color-stroke-strong-950);
      outline-color: var(--color-stroke-soft-200);
    }
  }

  &[data-placeholder] {
    &:deep(.celeste-select-value) {
      color: var(--color-text-sub-600);

      & ~ i {
        color: var(--color-icon-soft-400);
      }
    }
  }
}
</style>
