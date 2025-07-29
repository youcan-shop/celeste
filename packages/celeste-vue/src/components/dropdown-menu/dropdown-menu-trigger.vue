<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'radix-vue';

const props = defineProps<DropdownMenuTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuTrigger

    class="celeste-dropdown-menu-trigger"
    v-bind="forwardedProps"
    as="div"
  >
    <slot />
  </DropdownMenuTrigger>
</template>

<style lang="scss" scoped>
.celeste-dropdown-menu-trigger {
  display: flex;
  align-items: center;
  border-radius: var(--radius-8);
  cursor: pointer;
  gap: var(--spacing-8);

  &[data-disabled] {
    background: var(--color-bg-weak-50);
    color: var(--color-text-disabled-300);
    cursor: auto;

    &:deep(i) {
      color: var(--color-icon-disabled-300);
    }
  }
}
</style>
