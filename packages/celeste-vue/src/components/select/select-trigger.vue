<script setup lang="ts">
import clsx from 'clsx';
import { SelectIcon, SelectTrigger, type SelectTriggerProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
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
  width: 300px;
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

  &:hover {
    border-color: transparent;
    background-color: var(--color-bg-weak-50);
  }

  &:focus {
    border-color: var(--color-stroke-strong-950);
    outline-color: var(--color-stroke-soft-200);
  }

  &[data-placeholder] {
    &:deep(.celeste-select-value) {
      color: var(--color-text-sub-600);

      & ~ i {
        color: var(--color-icon-soft-400);
      }
    }
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
}
</style>
