<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive, type PrimitiveProps } from 'radix-vue';

const props = withDefaults(defineProps<CompactButtonProps>(), {
  size: 'lg',
  as: 'button',
  variant: 'stroke',
});
</script>

<script lang="ts">
export interface CompactButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  icon: string;
  size?: 'lg' | 'md';
  rounded?: boolean;
  variant?: 'stroke' | 'white' | 'ghost';
}
</script>

<template>
  <Primitive
    :as
    :as-child
    :class="clsx(
      'celeste-cbutton',
      `celeste-cbutton-${size}`,
      `celeste-cbutton-${variant}`,
      rounded && `celeste-cbutton-rounded`,
      props.class,
    )"
  >
    <i :class="icon" />
  </Primitive>
</template>

<style scoped lang="scss">
.celeste-cbutton {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  transition-property: background-color, color, border-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: 1px solid transparent;
  border-radius: var(--radius-6);
  background-color: transparent;
  color: var(--color-icon-sub-600);
  font: var(--label-sm);
  text-decoration: none;
  cursor: pointer;
  gap: var(--spacing-2);

  &:disabled {
    border-color: transparent;
    background-color: transparent;
    box-shadow: none;
    color: var(--color-icon-disabled-300);
    cursor: default;
    pointer-events: none;
  }

  &-rounded {
    border-radius: var(--radius-full);
  }

  &:hover {
    border-color: transparent;
    background-color: var(--color-bg-weak-50);
    box-shadow: none;
    color: var(--color-icon-strong-950);
  }

  &:active {
    border-color: transparent;
    outline: none;
    background-color: var(--color-bg-strong-950);
    box-shadow: none;
    color: var(--color-icon-white-0);
  }

  &-lg {
    width: 24px;
    height: 24px;
    padding: 2px;

    :deep(i) {
      width: 20px;
      height: 20px;
    }
  }

  &-md {
    width: 20px;
    height: 20px;
    padding: 1px;

    :deep(i) {
      width: 18px;
      height: 18px;
    }
  }

  &-stroke {
    border-color: var(--color-stroke-soft-200);
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-regular-xs);
  }

  &-white {
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-regular-xs);
  }
}
</style>
