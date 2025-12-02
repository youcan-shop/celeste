<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = withDefaults(defineProps<BadgeProps>(), {
  size: 'md',
  color: 'faded',
  variant: 'fill',
  type: 'basic',
});
</script>

<script lang="ts">
export interface BadgeProps {
  size?: 'sm' | 'md';
  variant?: 'fill' | 'light' | 'lighter' | 'stroke';
  type?: 'basic' | 'dot' | 'leading-icon' | 'trailing-icon';
  state?: 'faded' | 'information' | 'warning' | 'error' | 'success' | 'away' | 'feature' | 'verified' | 'highlighted' | 'stable';
  disabled?: boolean;
  icon?: string;
  label?: string;
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <div
    :class="clsx(
      'celeste-badge',
      `celeste-badge-${size}`,
      `celeste-badge-${type}`,
      `celeste-badge-${state}`,
      `celeste-badge-${variant}`,
      disabled && 'celeste-badge-disabled',
      props.class,
    )"
    :aria-label="label"
    :aria-disabled="disabled || undefined"
    role="badge"
  >
    <i v-if="type === 'dot'" class="dot i-celeste-dot" />
    <i v-if="type === 'leading-icon'" :class="icon" />
    <span v-if="label" class="celeste-badge-label">{{ label }}</span>
    <i v-if="type === 'trailing-icon'" :class="icon" />
  </div>
</template>

<style scoped lang="scss">
$states: faded, information, warning, error, success, away, feature, verified, highlighted, stable;

.celeste-badge {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-8);
  transition-property: background-color, color, border-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  pointer-events: none;
  user-select: none;
  gap: 2px;

  i.dot {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }

  i:not(.dot) {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  &-label {
    flex-shrink: 0;
  }

  &:has(i.dot) {
    gap: 0;
    padding-inline-start: var(--spacing-2);
  }

  &-leading-icon {
    padding-inline-start: var(--spacing-2);
  }

  &-trailing-icon {
    padding-inline-end: var(--spacing-2);
  }

  &-disabled {
    border-color: var(--color-stroke-soft-200);
    background-color: transparent;
    color: var(--color-text-disabled-300);
  }

  &-sm {
    height: 16px;
    font: var(--subheading-xxs);
    text-transform: uppercase;
  }

  &-md {
    height: 20px;
    font: var(--label-xs);
  }

  @each $state in $states {
    &-fill.celeste-badge-#{$state}:not(&-disabled) {
      background-color: var(--color-state-#{$state}-base);
      color: var(--color-text-white-0);
    }

    &-light.celeste-badge-#{$state}:not(&-disabled) {
      background-color: var(--color-state-#{$state}-light);
      color: var(--color-state-#{$state}-dark);
    }

    &-lighter.celeste-badge-#{$state}:not(&-disabled) {
      background-color: var(--color-state-#{$state}-lighter);
      color: var(--color-state-#{$state}-base);
    }

    &-stroke.celeste-badge-#{$state}:not(&-disabled) {
      border-color: var(--color-state-#{$state}-base);
      background-color: var(--color-bg-white-0);
      color: var(--color-state-#{$state}-base);
    }
  }
}
</style>
