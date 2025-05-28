<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'radix-vue';

const props = defineProps<DropdownMenuTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuTrigger class="celeste-dropdown-menu-trigger" v-bind="forwardedProps">
    <slot />
  </DropdownMenuTrigger>
</template>

<style lang="scss" scoped>
.celeste-dropdown-menu-trigger {
  display: flex;
  align-items: center;
  padding: var(--spacing-8);
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-8);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  color: var(--color-text-sub-600);
  cursor: pointer;
  gap: var(--spacing-8);

  :deep(i) {
    color: var(--color-icon-soft-400);
  }

  &:hover {
    background: var(--color-bg-weak-50);
  }

  &[data-state='open'] {
    border: 1px solid var(--color-stroke-strong-950);
    box-shadow: var(--shadow-buttons-important-focus);
    color: var(--color-text-strong-950);
  }
}
</style>
