<script setup lang="ts">
import type { DropdownMenuLabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { DropdownMenuLabel, useForwardProps } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<DropdownMenuLabelProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = useDelegatedProps(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuLabel
    v-bind="forwardedProps"
    :class="clsx('celeste-dropdown-menu-label', props.class)"
  >
    <slot />
  </DropdownMenuLabel>
</template>

<style lang="scss" scoped>
.celeste-dropdown-menu-label {
  display: flex;
  align-items: center;
  align-self: stretch;
  padding: var(--spacing-8);
  color: var(--color-text-soft-400);
  font: var(--paragraph-sm);
  gap: var(--spacing-8);
}
</style>
