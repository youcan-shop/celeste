<script setup lang="ts">
import clsx from 'clsx';
import { Primitive } from 'radix-vue';

const props = withDefaults(defineProps<SocialButtonProps>(), {
  variant: 'stroke',
});
</script>

<script lang="ts">
export interface SocialButtonProps {
  brand: 'apple' | 'twitter' | 'google' | 'facebook' | 'linkedin' | 'github';
  variant?: 'fill' | 'stroke';
  class?: string;
  label?: string;
}
</script>

<template>
  <Primitive
    :aria-label="label"
    role="button"
    :class="clsx(
      'celeste-social-button',
      `celeste-social-button-${brand}`,
      `celeste-social-button-${variant}`,
      props.class,
    )"
    as="button"
  >
    <i :class="`i-celeste-brand-${brand}-${variant === 'fill' ? 'white' : 'original'}`" />
    <span v-if="label" role="presentation">{{ label }}</span>
  </Primitive>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use 'sass:string';

@property --celeste-social-button-bg {
  syntax: '<color>';
  initial-value: rgb(0 0 0 / 0%);
  inherits: false;
}

$brand-map: (
  'google': (
    bg: #f14336,
    hover: rgb(0 0 0 / 16%),
  ),
  'apple': (
    bg: #000,
    hover: rgb(255 255 255 / 16%),
  ),
  'twitter': (
    bg: #000,
    hover: rgb(255 255 255 / 16%),
  ),
  'facebook': (
    bg: #1977f3,
    hover: rgb(0 0 0 / 16%),
  ),
  'linkedin': (
    bg: #0077b5,
    hover: rgb(0 0 0 / 16%),
  ),
  'github': (
    bg: #24292f,
    hover: rgb(255 255 255 / 16%),
  ),
);

.celeste-social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-10);
  transition-property: --celeste-social-button-bg, background-color, border-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: 1px solid transparent;
  border-radius: var(--radius-10);
  font: var(--label-sm);
  gap: var(--spacing-8);
  cursor: pointer;

  span {
    padding-inline-end: var(--spacing-6);
  }

  &:focus {
    outline: none;
    box-shadow: var(--shadow-buttons-important-focus);
  }

  &-fill {
    color: var(--color-text-white-0);
  }

  &-stroke {
    border-color: var(--color-stroke-soft-200);
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-regular-xs);
    color: var(--text-strong-950);

    &:hover {
      border-color: transparent;
      background: var(--color-bg-weak-50);
    }
  }

  i {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  @each $k, $v in $brand-map {
    &-#{$k}:not(&-stroke) {
      background:
        linear-gradient(0deg, var(--celeste-social-button-bg) 0%, var(--celeste-social-button-bg) 100%),
        #{map.get($v, bg)};

      &:hover {
        --celeste-social-button-bg: #{map.get($v, hover)};
      }
    }
  }
}
</style>
