<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import {
  DropdownMenuPortal,
  DropdownMenuSubContent,
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
  useForwardPropsEmits,
} from 'radix-vue';

const props = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DropdownMenuSubContentEmits>();

const delegatedProps = useDelegatedProps(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuSubContent
      v-bind="forwarded"
      :class="clsx(props.class, 'celeste-dropdown-menu-sub-content')"
    >
      <slot />
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</template>

<style lang="scss" scoped>
:deep(.celeste-dropdown-menu-sub-content) {
  --dropdown-min-width: 250px;
  --dropdown-max-width: 350px;

  display: flex;
  z-index: 50;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-width: var(--dropdown-min-width);
  max-width: var(--dropdown-max-width);
  margin-block-start: var(--spacing-10);
  padding: var(--spacing-8);
  overflow: hidden;
  transform-origin: var(--radix-popper-transform-origin);
  animation: var(--animation-fast) ease-out forwards;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-16);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
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
