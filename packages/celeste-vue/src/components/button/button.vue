<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive, type PrimitiveProps } from 'radix-vue';

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  variant: 'fill',
  intent: 'primary',
  as: 'button',
});
</script>

<script lang="ts">
export interface ButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  size?: 'xxs' | 'xs' | 'sm' | 'md';
  intent?: 'primary' | 'neutral' | 'error';
  variant?: 'fill' | 'stroke' | 'lighter' | 'ghost';
}
</script>

<template>
  <Primitive
    :as
    :as-child
    :class="clsx(
      'celeste-button',
      `celeste-button-intent-${intent}`,
      `celeste-button-size-${size}`,
      `celeste-button-variant-${variant}`,
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss" scoped>
@use 'sass:map';

$size-map: (
  'xxs': (
    height: 28px,
    border-radius: var(--radius-8),
    padding: var(--spacing-4) var(--spacing-6),
    gap: var(--spacing-4),
  ),
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
$intent-map: (
  'primary': (
    'fill': (
      fg: var(--color-text-white-0),
      bg: var(--color-primary-base),
      border: var(--color-primary-base),
      shadow: none,
    ),
    'stroke': (
      fg: var(--color-primary-base),
      bg: transparent,
      border: var(--color-primary-base),
      shadow: none,
    ),
    'lighter': (
      fg: var(--color-primary-base),
      bg: var(--color-primary-alpha-10),
      border: transparent,
      shadow: none,
    ),
    'ghost': (
      fg: var(--color-primary-base),
      bg: transparent,
      border: transparent,
      shadow: none,
    ),
  ),
  'neutral': (
    'fill': (
      fg: var(--color-text-white-0),
      bg: var(--color-bg-strong-950),
      border: var(--color-bg-strong-950),
      shadow: none,
    ),
    'stroke': (
      fg: var(--color-text-sub-600),
      bg: transparent,
      border: var(--color-bg-soft-200),
      shadow: var(--shadow-regular-xs),
    ),
    'lighter': (
      fg: var(--color-text-sub-600),
      bg: var(--color-bg-weak-50),
      border: var(--color-bg-weak-50),
      shadow: none,
    ),
    'ghost': (
      fg: var(--color-text-sub-600),
      bg: transparent,
      border: transparent,
      shadow: none,
    ),
  ),
  'error': (
    'fill': (
      fg: var(--color-text-white-0),
      bg: var(--color-state-error-base),
      border: var(--color-state-error-base),
      shadow: none,
    ),
    'stroke': (
      fg: var(--color-state-error-base),
      bg: transparent,
      border: var(--color-state-error-base),
      shadow: none,
    ),
    'lighter': (
      fg: var(--color-state-error-base),
      bg: var(--color-red-alpha-10),
      border: transparent,
      shadow: none,
    ),
    'ghost': (
      fg: var(--color-state-error-base),
      bg: transparent,
      border: transparent,
      shadow: none,
    ),
  ),
);
$hover-map: (
  'primary': (
    'fill': (
      fg: var(--color-text-white-0),
      bg: var(--color-primary-darker),
      border: var(--color-primary-darker),
    ),
    'stroke': (
      fg: var(--color-primary-base),
      bg: var(--color-primary-alpha-10),
      border: transparent,
    ),
    'lighter': (
      fg: var(--color-primary-base),
      bg: transparent,
      border: var(--color-primary-base),
    ),
    'ghost': (
      fg: var(--color-primary-base),
      bg: var(--color-primary-alpha-10),
      border: transparent,
    ),
  ),
  'neutral': (
    'fill': (
      fg: var(--color-text-white-0),
      bg: var(--color-bg-surface-800),
      border: transparent,
    ),
    'stroke': (
      fg: var(--color-text-strong-950),
      bg: var(--color-bg-weak-50),
      border: transparent,
    ),
    'lighter': (
      fg: var(--color-text-strong-950),
      bg: transparent,
      border: var(--color-bg-soft-200),
    ),
    'ghost': (
      fg: var(--color-text-strong-950),
      bg: var(--color-bg-weak-50),
      border: transparent,
    ),
  ),
  'error': (
    'fill': (
      fg: var(--color-text-white-0),
      bg: var(--color-red-700),
      border: var(--color-red-700),
    ),
    'stroke': (
      fg: var(--color-state-error-base),
      bg: var(--color-red-alpha-10),
      border: transparent,
    ),
    'lighter': (
      fg: var(--color-state-error-base),
      bg: transparent,
      border: var(--color-state-error-base),
    ),
    'ghost': (
      fg: var(--color-state-error-base),
      bg: var(--color-red-alpha-10),
      border: transparent,
    ),
  ),
);

.celeste-button {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  transition-property: background-color, color, border-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: none;
  border: 1px solid transparent;
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

  @each $k, $v in $size-map {
    &-size-#{$k} {
      gap: map.get($v, gap);
      height: map.get($v, height);
      padding: map.get($v, padding);
      border-radius: map.get($v, border-radius);
    }
  }

  @each $intent, $sub in $intent-map {
    @each $variant, $values in $sub {
      &-intent-#{$intent}:not(:disabled).celeste-button-variant-#{$variant}:not(:disabled) {
        border-color: map.get($values, border);
        background-color: map.get($values, bg);
        box-shadow: map.get($values, shadow);
        color: map.get($values, fg);

        &:hover:not(:disabled) {
          $hover-values: map.get(map.get($hover-map, $intent), $variant);

          border-color: map.get($hover-values, border);
          background-color: map.get($hover-values, bg);
          color: map.get($hover-values, fg);
        }

        &:focus:not(:disabled) {
          outline: none;
          box-shadow: if(
            $intent == 'neutral',
            var(--shadow-buttons-important-focus),
            var(--shadow-buttons-#{$intent}-focus)
          );
        }
      }
    }
  }
}
</style>
