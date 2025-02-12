<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive, type PrimitiveProps } from 'radix-vue';

const props = withDefaults(defineProps<FancyButtonProps>(), {
  size: 'md',
  type: 'primary',
  as: 'button',
});
</script>

<script lang="ts">
export interface FancyButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  size?: 'xs' | 'sm' | 'md';
  type?: 'primary' | 'neutral' | 'error' | 'basic';
}
</script>

<template>
  <Primitive
    :as
    :as-child
    :class="clsx(
      'celeste-fbutton',
      `celeste-fbutton-${type}`,
      `celeste-fbutton-${size}`,
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>

<style scoped lang="scss">
@use 'sass:map';

@property --celeste-fbutton-bg-start {
  syntax: '<color>';
  initial-value: rgb(0 0 0 / 0%);
  inherits: false;
}

@property --celeste-fbutton-bg-end {
  syntax: '<color>';
  initial-value: rgb(0 0 0 / 0%);
  inherits: false;
}

$size-map: (
  'xs': (
    height: 32px,
    border-radius: var(--radius-8),
    padding: var(--spacing-6) var(--spacing-8),
    gap: var(--spacing-4),
  ),
  'sm': (
    height: 36px,
    border-radius: var(--radius-8),
    padding: var(--spacing-8) var(--spacing-10),
    gap: var(--spacing-6),
  ),
  'md': (
    height: 40px,
    border-radius: var(--radius-10),
    padding: var(--spacing-10) var(--spacing-12),
    gap: var(--spacing-6),
  ),
);
$type-map: (
  'primary': (
    bg: var(--color-primary-base),
  ),
  'neutral': (
    bg: var(--color-bg-strong-950),
  ),
  'error': (
    bg: var(--color-state-error-base),
  ),
);

.celeste-fbutton {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  transition-property: --celeste-fbutton-bg-start, --celeste-fbutton-bg-end, background-color, color, border-color,
    box-shadow;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: none;
  background-color: transparent;
  font: var(--label-sm);
  text-decoration: none;
  cursor: pointer;

  &:disabled {
    background-color: var(--color-bg-weak-50);
    color: var(--color-text-disabled-300);
    cursor: default;
  }

  :deep(i) {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  &:focus {
    outline: none;
  }

  @each $k, $v in $size-map {
    &-#{$k} {
      gap: map.get($v, gap);
      height: map.get($v, height);
      padding: map.get($v, padding);
      border-radius: map.get($v, border-radius);
    }
  }

  @each $k, $v in $type-map {
    &-#{$k}:not(&-basic, :disabled) {
      --celeste-fbutton-bg-start: rgb(255 255 255 / 16%);
      --celeste-fbutton-bg-end: rgb(255 255 255 / 0%);

      background:
        linear-gradient(180deg, var(--celeste-fbutton-bg-start) 0%, var(--celeste-fbutton-bg-end) 100%),
        #{map.get($v, bg)};
      box-shadow:
        inset 0 1px 0.5px 0.5px hsl(0deg 0% 100% / 12%),
        var(--shadow-fancy-buttons-#{$k});
      color: var(--color-text-white-0);

      &:hover {
        --celeste-fbutton-bg-start: rgb(255 255 255 / 24%);
        --celeste-fbutton-bg-end: rgb(255 255 255 / 0%);
      }

      &:focus {
        --celeste-fbutton-bg-start: rgb(255 255 255 / 24%);
        --celeste-fbutton-bg-end: rgb(255 255 255 / 0%);

        box-shadow:
          inset 0 1px 0.5px 0.5px hsl(0deg 0% 100% / 12%),
          var(--shadow-fancy-buttons-#{$k}),
          if($k == 'neutral', var(--shadow-buttons-important-focus), var(--shadow-buttons-#{$k}-focus));
      }
    }
  }

  &-basic {
    background: var(--color-bg-white-0);
    box-shadow: var(--shadow-fancy-buttons-stroke);
    color: var(--color-text-sub-600);

    &:hover {
      background: var(--color-bg-weak-50);
      box-shadow: none;
      color: var(--text-strong-950);
    }

    &:focus {
      background: var(--color-bg-weak-50);
      box-shadow: var(--shadow-buttons-important-focus);
      color: var(--text-strong-950);
    }
  }
}
</style>
