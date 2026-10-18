<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'reka-ui';

export interface ButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  size?: 'xxs' | 'xs' | 'sm' | 'md';
  intent?: 'primary' | 'neutral' | 'error';
  variant?: 'fill' | 'stroke' | 'lighter' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  variant: 'fill',
  intent: 'primary',
  as: 'button',
});
</script>

<template>
  <Primitive
    :as
    :as-child
    :disabled="disabled || loading || undefined"
    :aria-busy="loading || undefined"
    :class="clsx(
      'celeste-button',
      `celeste-button-intent-${intent}`,
      `celeste-button-size-${size}`,
      `celeste-button-variant-${variant}`,
      loading && 'celeste-button-loading',
      props.class,
    )"
  >
    <slot />
    <i v-if="loading" class="celeste-button-spinner i-celeste-loader-4-line" />
  </Primitive>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use 'sass:list';

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
      fg: var(--color-static-white),
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
      fg: var(--color-static-white),
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
      fg: var(--color-static-white),
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
      fg: var(--color-static-white),
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
  position: relative;
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
  white-space: nowrap;
  cursor: pointer;

  &:disabled:not(&-loading) {
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

      &:has(> :only-child:is(i)),
      &:has(> i:first-child + .celeste-button-spinner:last-child) {
        padding: list.nth(map.get($v, padding), 1);
      }
    }
  }

  @each $intent, $sub in $intent-map {
    @each $variant, $values in $sub {
      &-intent-#{$intent}.celeste-button-variant-#{$variant}:not(:disabled:not(.celeste-button-loading)) {
        --celeste-button-fg: #{map.get($values, fg)};

        border-color: map.get($values, border);
        background-color: map.get($values, bg);
        box-shadow: map.get($values, shadow);
        color: var(--celeste-button-fg);

        &.celeste-button-loading {
          color: transparent;
        }

        &:hover:not(:disabled) {
          $hover-values: map.get(map.get($hover-map, $intent), $variant);

          border-color: map.get($hover-values, border);
          background-color: map.get($hover-values, bg);
          color: map.get($hover-values, fg);
        }

        &:focus-visible:not(:disabled) {
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

.celeste-button-loading {
  animation: celeste-button-label-out 200ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
  pointer-events: none;
}

.celeste-button-loading :deep(i:not(.celeste-button-spinner)) {
  animation: celeste-button-icon-out 200ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.celeste-button-spinner {
  position: absolute;
  margin: auto;
  animation:
    celeste-button-spinner-in 200ms cubic-bezier(0.23, 1, 0.32, 1) 50ms backwards,
    celeste-button-spin 800ms linear infinite;
  color: var(--celeste-button-fg);
  inset: 0;
}

@media (prefers-reduced-motion: reduce) {
  .celeste-button-loading,
  .celeste-button-loading :deep(i:not(.celeste-button-spinner)) {
    animation: none;
  }

  .celeste-button-spinner {
    animation: celeste-button-spin 1600ms linear infinite;
  }
}

@keyframes celeste-button-label-out {
  0% {
    color: var(--celeste-button-fg);
    text-shadow: 0 0 0 var(--celeste-button-fg);
  }

  40% {
    color: transparent;
    text-shadow: 0 0 3px color-mix(in srgb, var(--celeste-button-fg) 60%, transparent);
  }

  100% {
    color: transparent;
    text-shadow: 0 0 8px transparent;
  }
}

@keyframes celeste-button-icon-out {
  100% {
    filter: blur(4px);
    scale: 0.8;
  }
}

@keyframes celeste-button-spinner-in {
  0% {
    filter: blur(4px);
    opacity: 0;
    scale: 0.6;
  }
}

@keyframes celeste-button-spin {
  100% {
    rotate: 360deg;
  }
}
</style>
