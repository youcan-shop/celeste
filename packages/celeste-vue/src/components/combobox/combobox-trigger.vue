<script setup lang="ts">
import type { ComboboxTriggerProps } from 'radix-vue';
import clsx from 'clsx';
import { ComboboxTrigger, useForwardProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<CustomComboboxTriggerProps>(), {
  type: 'normal',
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<script lang="ts">
export interface CustomComboboxTriggerProps extends ComboboxTriggerProps {
  class?: HTMLAttributes['class'];
  size?: 'xs' | 'sm' | 'md';
  filled?: boolean;
  type?: 'normal' | 'compact' | 'inline' | 'compact-input';
  error?: boolean;
}
</script>

<template>
  <ComboboxTrigger
    v-bind="forwarded"
    tabindex="0"
    :class="clsx(
      'celeste-dropdown-anchor-trigger',
      `celeste-dropdown-anchor-trigger-size-${props.size}`,
      `celeste-dropdown-anchor-trigger-type-${props.type}`,
      { 'celeste-dropdown-anchor-trigger-error': props.error },
      { 'celeste-dropdown-anchor-trigger-filled': filled },
      props.class,
    )"
  >
    <slot />
  </ComboboxTrigger>
</template>

<style lang="scss" scoped>
@use 'sass:map';

@mixin transition-default {
  transition-property: background-color, transform, opacity;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
}

.celeste-dropdown-anchor-trigger {
  @include transition-default;

  display: flex;
  align-items: center;
  border: 1px solid var(--color-stroke-soft-200);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  gap: var(--spacing-8);
  cursor: pointer;

  :deep(i) {
    width: 20px;
    height: 20px;
    color: var(--color-icon-soft-400);
  }

  &:focus,
  &:focus-visible,
  &:focus-within {
    outline: none;
  }

  .celeste-dropdown-anchor-trigger-prefix {
    display: flex;
    align-items: center;
    justify-content: center;

    &-selected {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .celeste-dropdown-input {
    display: flex;
    flex: 1 0 0;
    align-items: center;
    justify-content: space-between;
    background: inherit;
    color: var(--color-text-sub-600);
    font: var(--paragraph-sm);
    cursor: pointer;
    gap: var(--spacing-8);
  }

  .celeste-dropdown-trigger {
    @include transition-default;

    display: flex;
    place-items: center center;
    border: none;
    background: none;
    color: var(--color-icon-soft-400);
    cursor: pointer;
  }

  &[data-state='open']:not([data-disabled]) {
    :deep(.celeste-dropdown-trigger) {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background: var(--color-bg-weak-50);
  }

  &-error:not(.celeste-dropdown-anchor-trigger-type-compact) {
    border: 1px solid var(--color-state-error-base);
  }

  &[data-disabled] {
    background: var(--color-bg-weak-50);
    color: var(--color-text-disabled-300);
    cursor: not-allowed;

    .celeste-dropdown-input {
      color: var(--color-text-disabled-300);
      cursor: not-allowed;
    }

    &:deep(i),
    .celeste-dropdown-trigger {
      color: var(--color-icon-disabled-300);
      cursor: not-allowed;
    }
  }

  &[data-state='open']:not(
      [data-disabled],
      .celeste-dropdown-anchor-trigger-type-compact,
      .celeste-dropdown-anchor-trigger-type-compact-input
    ) {
    border: 1px solid var(--color-stroke-strong-950);
    box-shadow: var(--shadow-buttons-important-focus);
    color: var(--color-text-strong-950);

    .celeste-dropdown-input {
      color: var(--color-text-strong-950);
    }

    i {
      color: var(--color-icon-strong-950);
    }
  }

  &-filled {
    color: var(--color-text-strong-950);

    :deep(.celeste-dropdown-input) {
      color: var(--color-text-strong-950);
    }
  }

  &.celeste-dropdown-anchor-trigger-type-compact {
    width: fit-content;
    border: none;
    background: transparent;
    box-shadow: none;

    &:deep(.celeste-dropdown-input) {
      flex: inherit;
    }

    &:hover:not([data-disabled]),
    &[data-state='open']:not([data-disabled]) {
      .celeste-dropdown-input {
        color: var(--color-text-strong-950);
      }

      &:deep(i) {
        color: var(--color-icon-strong-950);
      }
    }
  }

  &.celeste-dropdown-anchor-trigger-type-compact-input {
    width: fit-content;
    border: none;
    border-radius: var(--radius-0);
    box-shadow: none;

    &:deep(.celeste-dropdown-input) {
      flex: inherit;
    }

    &[data-state='open'] {
      box-shadow: none;
    }
  }

  &.celeste-dropdown-anchor-trigger-type-inline {
    width: fit-content;
    gap: var(--spacing-4);

    &:deep(.celeste-dropdown-input) {
      flex: inherit;
    }
  }

  &.celeste-dropdown-anchor-trigger-type-normal {
    width: 100%;
    min-width: 300px;
  }

  $sizes-map: (
    'xs': (
      'padding': var(--spacing-6),
      'border-radius': var(--radius-8),
      'height': 32px,
    ),
    'sm': (
      'padding': var(--spacing-8),
      'border-radius': var(--radius-8),
      'height': 36px,
    ),
    'md': (
      'padding': var(--spacing-10),
      'border-radius': var(--radius-10),
      'height': 40px,
    ),
  );

  @each $size, $values in $sizes-map {
    &-size-#{$size} {
      height: map.get($values, 'height');
      padding: map.get($values, 'padding');
      border-radius: map.get($values, 'border-radius');
    }
  }
}
</style>
