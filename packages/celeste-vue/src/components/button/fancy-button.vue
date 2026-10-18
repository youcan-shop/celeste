<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'reka-ui';

export interface FancyButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  size?: 'xs' | 'sm' | 'md';
  intent?: 'primary' | 'neutral' | 'error' | 'basic';
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<FancyButtonProps>(), {
  size: 'md',
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
      'celeste-fbutton',
      `celeste-fbutton-${intent}`,
      `celeste-fbutton-${size}`,
      loading && !asChild && 'celeste-fbutton-loading',
      props.class,
    )"
  >
    <slot v-if="asChild" />
    <template v-else>
      <slot />
      <i v-if="loading" class="celeste-fbutton-spinner i-celeste-loader-4-line" />
    </template>
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
$intent-map: (
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
  position: relative;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  transition-property:
    --celeste-fbutton-bg-start, --celeste-fbutton-bg-end, background-color, color, border-color, box-shadow;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: none;
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

  &:focus-visible {
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

  @each $k, $v in $intent-map {
    &-#{$k}:not(&-basic, :disabled:not(&-loading)) {
      --celeste-fbutton-fg: #{if($k == 'neutral', var(--color-text-white-0), var(--color-static-white))};
      --celeste-fbutton-bg-start: rgb(255 255 255 / 16%);
      --celeste-fbutton-bg-end: rgb(255 255 255 / 0%);

      background:
        linear-gradient(180deg, var(--celeste-fbutton-bg-start) 0%, var(--celeste-fbutton-bg-end) 100%),
        #{map.get($v, bg)};
      box-shadow: var(--shadow-fancy-buttons-#{$k});
      color: var(--celeste-fbutton-fg);

      &.celeste-fbutton-loading {
        color: transparent;
      }

      &::before {
        content: '';
        position: absolute;
        padding: 1px;
        border-radius: inherit;
        background: linear-gradient(180deg, rgb(255 255 255 / 12%) 0%, rgb(255 255 255 / 0%) 100%);
        mask-image: linear-gradient(#fff 0 0), linear-gradient(#fff 0 0);
        mask-clip: content-box, border-box;
        mask-composite: exclude;
        inset: 0;
      }

      &:hover {
        --celeste-fbutton-bg-start: rgb(255 255 255 / 24%);
        --celeste-fbutton-bg-end: rgb(255 255 255 / 0%);
      }

      &:focus-visible {
        --celeste-fbutton-bg-start: rgb(255 255 255 / 24%);
        --celeste-fbutton-bg-end: rgb(255 255 255 / 0%);

        box-shadow:
          var(--shadow-fancy-buttons-#{$k}),
          if($k == 'neutral', var(--shadow-buttons-important-focus), var(--shadow-buttons-#{$k}-focus));
      }
    }
  }

  &-basic {
    --celeste-fbutton-fg: var(--color-text-sub-600);

    background: var(--color-bg-white-0);
    box-shadow: var(--shadow-fancy-buttons-stroke);
    color: var(--celeste-fbutton-fg);

    &.celeste-fbutton-loading {
      color: transparent;
    }

    &:hover {
      background: var(--color-bg-weak-50);
      box-shadow: none;
      color: var(--color-text-strong-950);
    }

    &:focus-visible {
      background: var(--color-bg-weak-50);
      box-shadow: var(--shadow-buttons-important-focus);
      color: var(--color-text-strong-950);
    }
  }
}

.celeste-fbutton-loading {
  animation: celeste-fbutton-label-out 200ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
  pointer-events: none;
}

.celeste-fbutton-loading :deep(i:not(.celeste-fbutton-spinner)) {
  animation: celeste-fbutton-icon-out 200ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.celeste-fbutton-spinner {
  position: absolute;
  margin: auto;
  animation:
    celeste-fbutton-spinner-in 200ms cubic-bezier(0.23, 1, 0.32, 1) 50ms backwards,
    celeste-fbutton-spin 800ms linear infinite;
  color: var(--celeste-fbutton-fg);
  inset: 0;
}

@media (prefers-reduced-motion: reduce) {
  .celeste-fbutton-loading,
  .celeste-fbutton-loading :deep(i:not(.celeste-fbutton-spinner)) {
    animation: none;
  }

  .celeste-fbutton-spinner {
    animation: celeste-fbutton-spin 1600ms linear infinite;
  }
}

@keyframes celeste-fbutton-label-out {
  0% {
    color: var(--celeste-fbutton-fg);
    text-shadow: 0 0 0 var(--celeste-fbutton-fg);
  }

  40% {
    color: transparent;
    text-shadow: 0 0 3px color-mix(in srgb, var(--celeste-fbutton-fg) 60%, transparent);
  }

  100% {
    color: transparent;
    text-shadow: 0 0 8px transparent;
  }
}

@keyframes celeste-fbutton-icon-out {
  100% {
    filter: blur(4px);
    scale: 0.8;
  }
}

@keyframes celeste-fbutton-spinner-in {
  0% {
    filter: blur(4px);
    opacity: 0;
    scale: 0.6;
  }
}

@keyframes celeste-fbutton-spin {
  100% {
    rotate: 360deg;
  }
}
</style>
