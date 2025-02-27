<script setup lang="ts">
import clsx from 'clsx';
import { ToggleGroupItem, type ToggleGroupItemProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<ButtonGroupItemProps>(), {
  size: 'sm',
});

const delegatedProps = computed(() => {
  const { class: _, size: __, ...delegated } = props;

  return delegated;
});
</script>

<script lang="ts">
export interface ButtonGroupItemProps extends ToggleGroupItemProps {
  class?: HTMLAttributes['class'];
  size?: 'xxs' | 'xs' | 'sm';
}
</script>

<template>
  <ToggleGroupItem
    :class="clsx(
      'celeste-button-group-item',
      `celeste-button-group-item-size-${size}`,
      props.class,
    )"
    v-bind="delegatedProps"
  >
    <slot />
  </ToggleGroupItem>
</template>

<style lang="scss" scoped>
@use 'sass:map';

$size-map: (
  'xxs': (
    height: 24px,
    padding: var(--spacing-4) var(--spacing-12),
    font: var(--label-xs),
  ),
  'xs': (
    height: 32px,
    padding: var(--spacing-6) var(--spacing-14),
    font: var(--label-sm),
  ),
  'sm': (
    height: 36px,
    padding: var(--spacing-8) var(--spacing-16),
    font: var(--label-sm),
  ),
);

.celeste-button-group-item {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  transition-property: background-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: 1px solid var(--color-stroke-soft-200);
  outline: none;
  background-color: var(--color-bg-white-0);
  color: var(--color-text-sub-600);
  cursor: pointer;
  gap: 8px;

  @each $k, $v in $size-map {
    &-size-#{$k} {
      height: map.get($v, height);
      padding: map.get($v, padding);
      font: map.get($v, font);
    }
  }

  :slotted(i) {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  &:not(:last-child) {
    border-right: none;
  }

  &:last-of-type {
    border-end-end-radius: var(--radius-8);
    border-start-end-radius: var(--radius-8);
  }

  &:first-of-type {
    border-end-start-radius: var(--radius-8);
    border-start-start-radius: var(--radius-8);
  }

  &:hover,
  &:focus-visible {
    background-color: var(--color-bg-weak-50);
  }

  &[data-state='on'] {
    color: var(--color-text-strong-950);
  }

  &:disabled {
    background-color: var(--color-bg-weak-50);
    color: var(--color-text-disabled-300);
  }
}
</style>
