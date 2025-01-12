<script setup lang="ts">
import clsx from 'clsx';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<StatusBadgeProps>(), {
  size: 'md',
  variant: 'light',
  state: 'faded',
});

const ICON_MAP: Record<NonNullable<StatusBadgeProps['state']>, string> = {
  success: 'i-celeste-checkbox-circle-fill',
  warning: 'i-celeste-alert-fill',
  error: 'i-celeste-error-warning-fill',
  faded: 'i-celeste-forbid-fill',
};

const icon = computed(() => ICON_MAP[props.state]);
</script>

<script lang="ts">
export interface StatusBadgeProps {
  variant?: 'stroke' | 'light';
  dotted?: boolean;
  state?: 'success' | 'warning' | 'error' | 'faded';
  label: string;
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <div
    :class="clsx(
      'celeste-badge',
      `celeste-badge-${state}`,
      `celeste-badge-${variant}`,
      props.class,
    )"
    :aria-label="label"
    role="status"
  >
    <i v-if="dotted" class="dot i-celeste-dot" />
    <i v-else :class="icon" />
    <span>{{ label }}</span>
  </div>
</template>

<style scoped lang="scss">
$states: success, warning, error, faded;

.celeste-badge {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: var(--spacing-4) var(--spacing-8) var(--spacing-4) var(--spacing-4);
  transition-property: background-color, color, border-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: 1px solid transparent;
  border-radius: var(--radius-6);
  font: var(--label-xs);
  pointer-events: none;
  user-select: none;
  gap: 4px;

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

  &:has(i.dot) {
    gap: 0;
    padding-inline-start: var(--spacing-2);
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

  @each $state in $states {
    &-light.celeste-badge-#{$state}:not(&-disabled) {
      background-color: var(--color-state-#{$state}-lighter);
      color: if($state == 'faded', var(--color-text-sub-600), var(--color-state-#{$state}-base));
    }

    &-stroke.celeste-badge-#{$state}:not(&-disabled) {
      border-color: var(--color-stroke-soft-200);
      background-color: var(--color-bg-white-0);
      color: var(--color-state-#{$state}-base);
    }
  }
}
</style>
