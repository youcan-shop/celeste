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
    tabindex="0"
    @click="$el.querySelector('input')?.focus()"
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
  border: 1px solid var(--color-stroke-soft-200);
  background: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  gap: var(--input-gap);
  cursor: text;

  &:focus-within {
    border: 1px solid var(--color-stroke-strong-950);
    outline: none;
    box-shadow: var(--shadow-buttons-important-focus);
  }

  &:hover {
    border-color: var(--color-bg-weak-50);
    background: var(--color-bg-weak-50);
    box-shadow: none;
    color: var(--color-text-sub-600);
  }

  &-disabled {
    border: none;
    background: var(--color-bg-weak-50);
    cursor: not-allowed;
  }

  &-disabled:deep(i) {
    background: var(--color-icon-disabled-300);
    color: var(--color-icon-disabled-300);
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

    width: 100%;
    border: none;
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
      color: var(--color-text-disabled-300);
      cursor: not-allowed;

      &::placeholder {
        color: var(--color-text-disabled-300);
      }
    }

    &[type='password'] {
      letter-spacing: var(--spacing-4);
      -webkit-text-security: disc;

      &::placeholder {
        letter-spacing: normal;
      }
    }

    &[type='search']::-webkit-search-cancel-button {
      display: none;
    }
  }

  .celeste-input-prefix,
  .celeste-input-suffix {
    cursor: auto;
  }
}
</style>
