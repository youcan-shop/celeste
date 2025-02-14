<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = withDefaults(defineProps<TextInputProps>(), {
  disabled: false,
  placeholder: 'Placeholder',
  size: 'sm',
});

const modelValue = defineModel<string>();
</script>

<script lang="ts">
export interface TextInputProps {
  class?: InputHTMLAttributes['class'];
  disabled?: boolean;
  type: 'basic' | 'email' | 'password' | 'search' | 'tel' | 'url';
  size: 'xs' | 'sm' | 'md';
  placeholder: string;
  error?: boolean;
}
</script>

<template>
  <div
    :class="clsx(
      'celeste-input-wrapper',
      `celeste-input-wrapper-type-${type}`,
      `celeste-input-wrapper-size-${size}`,
      { 'celeste-input-wrapper-error': error },
      { 'celeste-input-wrapper-disabled': disabled },
      props.class,
    )"
  >
    <!-- Prefix Slot -->
    <div v-if="$slots.prefix" class="celeste-input-prefix">
      <slot name="prefix" />
    </div>

    <input
      v-model="modelValue"
      v-bind="$attrs"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      :aria-disabled="disabled"
      class="celeste-input"
    >

    <!-- Suffix Slot -->
    <div v-if="$slots.suffix" class="celeste-input-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

@mixin transition-default {
  transition-property: background-color, border-color, box-shadow, text-decoration-color, color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
}

.celeste-input-wrapper {
  @include transition-default;
  --input-gap: var(--spacing-8);

  display: flex;
  align-items: center;
  gap: var(--input-gap);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  background: var(--color-bg-white-0);
  border: 1px solid var(--color-stroke-soft-200);
  box-shadow: var(--shadow-regular-xs);

  &:focus-within {
    outline: none;
    border: 1px solid var(--color-stroke-strong-950);
    box-shadow: var(--shadow-buttons-important-focus);
  }

  &:hover {
    background: var(--color-bg-weak-50);
    color: var(--color-text-sub-600);
    box-shadow: none;
    border-color: var(--color-bg-weak-50);
  }

  &-disabled {
    background: var(--color-bg-weak-50);
    cursor: not-allowed;
    border: none;
  }

  &-error,
  &-error:hover {
    border: 1px solid var(--color-state-error-base);
  }

  $sizes-map: (
    'xs': (
      'padding': var(--spacing-6),
      'border-radius': var(--radius-8),
    ),
    'sm': (
      'padding': var(--spacing-8),
      'border-radius': var(--radius-8),
    ),
    'md': (
      'padding': var(--spacing-10),
      'border-radius': var(--radius-10),
    ),
  );

  @each $size, $values in $sizes-map {
    &-size-#{$size} {
      padding: map.get($values, 'padding');
      border-radius: map.get($values, 'border-radius');
    }
  }

  .celeste-input {
    @include transition-default;
    border: none;
    width: 100%;
    background: transparent;
    color: inherit;

    &::placeholder {
      @include transition-default;
      color: var(--color-text-soft-400);
    }

    &:hover {
      &::placeholder {
        color: var(--color-text-sub-600);
      }
    }

    &:focus-visible,
    &:focus {
      outline: none;
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--color-text-disabled-300);

      &::placeholder {
        color: var(--color-text-disabled-300);
      }
    }

    &[type='password'] {
      letter-spacing: var(--spacing-4);
      text-security: disc;
      -webkit-text-security: disc;
    }

    &[type='search']::-webkit-search-cancel-button {
      display: none;
    }
  }
}
</style>
