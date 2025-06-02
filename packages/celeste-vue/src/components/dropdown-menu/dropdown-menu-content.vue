<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import {
  DropdownMenuContent,
  type DropdownMenuContentEmits,
  type DropdownMenuContentProps,
  DropdownMenuPortal,
  useForwardPropsEmits,
} from 'radix-vue';

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
      force-mount
      :class="clsx('celeste-dropdown-menu-content', props.class)"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>

<style lang="scss">
.celeste-dropdown-menu-content {
  --dropdown-width: 100%;
  --dropdown-max-width: 600px;

  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: var(--dropdown-width);
  min-width: 300px;
  max-width: var(--dropdown-max-width);
  margin-top: var(--spacing-10);
  padding: var(--spacing-8);
  overflow: hidden;
  transition-property: display, transform, opacity;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  transition-behavior: allow-discrete;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-16);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
  gap: var(--spacing-4);

  &[data-state='closed'] {
    display: none;
    transform: translateY(10px);
    opacity: 0;
  }

  &[data-state='open'] {
    display: block;
    transform: translateY(0);
    opacity: 1;

    @starting-style {
      transform: translateY(10px);
      opacity: 0;
    }
  }
}
</style>
