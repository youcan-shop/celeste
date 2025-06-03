<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import {
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
} from 'radix-vue';

const props = defineProps<DropdownMenuSeparatorProps & {
  class?: HTMLAttributes['class'];
}>();

const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <DropdownMenuSeparator v-bind="delegatedProps" :class="clsx('celeste-dropdown-menu-separator', props.class)" />
</template>

<style lang="scss" scoped>
.celeste-dropdown-menu-separator {
  width: 100%;
  height: 1px;
  background-color: var(--color-stroke-soft-200);
}
</style>
