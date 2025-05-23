<script setup lang="ts">
import clsx from 'clsx';
import { ToggleGroupItem, type ToggleGroupItemProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ToggleGroupItemProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ToggleGroupItem
    v-bind="delegatedProps"
    :class="clsx('celeste-toggle-group-item', props.class)"
  >
    <slot />
  </ToggleGroupItem>
</template>

<style scoped lang="scss">
.celeste-toggle-group-item {
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
