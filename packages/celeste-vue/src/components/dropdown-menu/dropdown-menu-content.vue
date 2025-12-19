<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import {
  DropdownMenuContent,
  type DropdownMenuContentEmits,
  type DropdownMenuContentProps,
  DropdownMenuPortal,
  useForwardPropsEmits,
} from 'radix-vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = withDefaults(
  defineProps<DropdownMenuContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    sideOffset: 4,
  },
);
const emits = defineEmits<DropdownMenuContentEmits>();

const delegatedProps = useDelegatedProps(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      v-bind="forwarded"
      :class="clsx('celeste-dropdown-menu-content', props.class)"
      :side-offset="8"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>

<style lang="scss" scoped>
:deep(.celeste-dropdown-menu-content) {
  --dropdown-min-width: 250px;
  --dropdown-max-width: 350px;

  display: flex;
  z-index: 50;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-width: var(--dropdown-min-width);
  max-width: var(--dropdown-max-width);
  padding: var(--spacing-8);
  overflow: hidden;
  transform-origin: var(--radix-popper-transform-origin);
  animation: var(--animation-fast) ease-out forwards;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-16);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
  transition-behavior: allow-discrete;
  gap: var(--spacing-4);
  scale: 0.95;

  &[data-state='open'] {
    animation-name: open;
  }

  &[data-state='closed'] {
    animation-name: close;
  }
}

@keyframes open {
  to {
    opacity: 1;
    scale: 1;
  }
}

@keyframes close {
  from {
    opacity: 1;
    scale: 1;
  }

  to {
    scale: 0.95;
    opacity: 0;
  }
}
</style>
