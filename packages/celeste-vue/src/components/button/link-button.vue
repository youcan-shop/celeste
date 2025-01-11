<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive, type PrimitiveProps } from 'radix-vue';

const props = withDefaults(defineProps<LinkButtonProps>(), {
  size: 'sm',
  type: 'primary',
  as: 'a',
});
</script>

<script lang="ts">
export interface LinkButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  size?: 'sm' | 'md';
  type?: 'primary' | 'black' | 'gray' | 'error';
  underline?: boolean;
  disabled?: boolean;
}
</script>

<template>
  <Primitive
    :as
    :disabled
    :as-child
    :class="clsx(
      'celeste-link-button',
      `celeste-link-button-${type}`,
      `celeste-link-button-${size}`,
      disabled && 'celeste-link-button-disabled',
      underline && 'celeste-link-button-underline',
      props.class,
    )"
    :role="as === 'a' ? 'link' : 'button'"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss" scoped>
.celeste-link-button {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  justify-content: center;
  transition-property: color, text-decoration-color;
  transition-timing-function: ease-out;
  transition-duration: var(--animation-fast);
  cursor: pointer;

  &:disabled,
  &-disabled {
    cursor: default;
    pointer-events: none;
    color: var(--color-text-disabled-300);
  }

  &:hover,
  &:focus {
    outline: none;
    text-decoration: underline;
  }

  &-underline {
    text-decoration: underline;
  }

  &-md {
    height: 20px;
    font: var(--label-sm);

    i {
      height: 20px;
      width: 20px;
    }
  }

  &-sm {
    height: 16px;
    font: var(--label-xs);

    i {
      height: 16px;
      width: 16px;
    }
  }

  &-primary:not(&-disabled) {
    color: var(--color-primary-base);

    &:hover,
    &:focus {
      color: var(--color-primary-darker);
    }
  }

  &-black:not(&-disabled) {
    color: var(--color-text-strong-950);

    &:hover,
    &:focus {
      color: var(--color-text-strong-950);
    }
  }

  &-gray:not(&-disabled) {
    color: var(--color-text-sub-600);

    &:hover,
    &:focus {
      color: var(--color-text-sub-600);
    }
  }

  &-error:not(&-disabled) {
    color: var(--color-state-error-base);

    &:hover,
    &:focus {
      color: var(--color-red-700);
    }
  }
}
</style>
