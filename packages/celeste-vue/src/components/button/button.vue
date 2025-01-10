<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'radix-vue';

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  variant: 'fill',
  type: 'primary',
  iconPosition: 'trailing',
});
</script>

<script lang="ts">
export interface ButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  size?: 'xxs' | 'xs' | 'sm' | 'md';
  type?: 'primary' | 'neutral' | 'error';
  variant?: 'fill' | 'stroke' | 'lighter' | 'ghost';
  iconPosition?: 'leading' | 'trailing';
  icon?: string;
  label: string;
}
</script>

<template>
  <Primitive
    as="button"
    :class="clsx(
      'celeste-button',
      `celeste-button-type-${type}`,
      `celeste-button-size-${size}`,
      `celeste-button-variant-${variant}`,
      props.class,
    )"
  >
    <i v-if="icon && iconPosition === 'leading'" :class="icon" />
    <span role="presentation">{{ label }}</span>
    <i v-if="icon && iconPosition === 'trailing'" :class="icon" />
  </Primitive>
</template>

<style lang="scss" scoped>
@use 'sass:map';

$size-map: (
  'xxs': (
    height: 28px,
    border-radius: var(--radius-8),
    padding: var(--spacing-4) var(--spacing-6),
    gap: 2px,
  ),
  'xs': (
    height: 32px,
    border-radius: var(--radius-8),
    padding: var(--spacing-6),
    gap: 2px,
  ),
  'sm': (
    height: 36px,
    border-radius: var(--radius-8),
    padding: var(--spacing-8),
    gap: 4px,
  ),
  'md': (
    height: 40px,
    border-radius: var(--radius-10),
    padding: var(--spacing-10),
    gap: 4px,
  ),
);

$type-map: (
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
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid transparent;
  transition-timing-function: ease-out;
  transition-duration: var(--animation-fast);
  transition-property: background-color color border-color;

  &:disabled {
    cursor: default;
    color: var(--color-text-disabled-300);
    background-color: var(--color-bg-weak-50);
  }

  span {
    font: var(--label-sm);
    padding: 0 4px;
  }

  i {
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

  @each $type, $subtypes in $type-map {
    @each $variant, $values in $subtypes {
      &-type-#{$type}:not(:disabled).celeste-button-variant-#{$variant}:not(:disabled) {
        color: map.get($values, fg);
        border-color: map.get($values, border);
        background-color: map.get($values, bg);
        box-shadow: map.get($values, shadow);

        &:hover:not(:disabled) {
          $hover-values: map.get(map.get($hover-map, $type), $variant);
          color: map.get($hover-values, fg);
          border-color: map.get($hover-values, border);
          background-color: map.get($hover-values, bg);
        }

        &:focus:not(:disabled) {
          box-shadow: if(
            $type == 'neutral',
            var(--shadow-buttons-important-focus),
            var(--shadow-buttons-#{$type}-focus)
          );

          outline: none;
        }
      }
    }
  }
}
</style>
