<script setup lang="ts">
import clsx from 'clsx';
import { SelectItem, SelectItemIndicator, type SelectItemProps, SelectItemText } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SelectItem v-bind="delegatedProps" :class="clsx('celeste-select-item', props.class)">
    <SelectItemText> <slot /></SelectItemText>
    <SelectItemIndicator>
      <i class="i-celeste-check-line" />
    </SelectItemIndicator>
  </SelectItem>
</template>

<style scoped>
.celeste-select-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-8);
  gap: var(--spacing-4);
  border-radius: var(--radius-8);
  outline: 2px solid transparent;
  outline-offset: 2px;
  background-color: var(--color-bg-white-0);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  cursor: pointer;

  &:deep(i) {
    color: var(--color-icon-sub-600);
  }

  &:hover,
  &:focus {
    background-color: var(--color-bg-weak-50);
  }

  &:deep(> span) {
    display: flex;
    align-items: center;
    gap: var(--spacing-8);
  }

  &[data-disabled] {
    color: var(--color-text-disabled-300);
    pointer-events: none;

    &:deep(i) {
      color: var(--color-icon-disabled-300);
    }

    &:deep(.celeste-select-item-icon > img) {
      opacity: 0.3;
    }
  }
}
</style>
