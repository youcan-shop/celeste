<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = withDefaults(defineProps<TextInputProps>(), {
  type: 'text',
  size: 'md',
  hasError: false,
});

const modelValue = defineModel<string | number>();
</script>

<script lang="ts">
export interface TextInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
  size?: 'xs' | 'sm' | 'md';
  hasError?: boolean;
}
</script>

<template>
  <div
    :size="size"
    role="presentation"
    :has-error="hasError"
    :class="clsx('celeste-text-input-wrapper', props.class)"
  >
    <input
      v-model="modelValue"
      v-bind="$attrs"
      :type="type"
      class="celeste-text-input"
    >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.celeste-text-input-wrapper {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  height: var(--input-height);
  padding-inline: calc(var(--input-padding) + var(--spacing-2)) var(--input-padding);
  transition: all var(--animation-fast) ease-out;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--input-radius);
  outline: 2px solid transparent;
  outline-offset: 2px;
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  gap: var(--input-gap);

  &[size='xs'] {
    --input-gap: 8px;
    --input-height: 32px;
    --input-radius: var(--radius-8);
    --input-padding: calc(var(--spacing-8) - var(--spacing-2));
  }

  &[size='sm'] {
    --input-gap: 6px;
    --input-height: 36px;
    --input-radius: var(--radius-8);
    --input-padding: var(--spacing-8);
  }

  &[size='md'] {
    --input-gap: 6px;
    --input-height: 40px;
    --input-radius: var(--radius-10);
    --input-padding: var(--spacing-10);
  }

  &[has-error='true'] {
    border-color: var(--color-state-error-base);
  }

  .celeste-text-input {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    font: inherit;

    &::placeholder {
      transition: color var(--animation-fast) ease-out;
      color: var(--color-text-soft-400);
    }
  }

  &:has(.celeste-text-input:focus) {
    border-color: var(--color-stroke-strong-950);
    outline-color: var(--color-stroke-soft-200);

    &[has-error='true'] {
      border-color: var(--color-state-error-base);
      outline-color: var(--color-state-error-lighter);
    }
  }

  &:has(.celeste-text-input:disabled) {
    border-color: transparent;
    background-color: var(--color-bg-weak-50);
    box-shadow: none;
    color: var(--color-text-disabled-300);
    pointer-events: none;

    .celeste-text-input::placeholder {
      color: currentcolor;
    }

    &:deep(.celeste-text-input-icon) {
      color: var(--color-icon-disabled-300);
    }

    &:deep(.celeste-text-input-affix),
    &:deep(.celeste-text-input-button) {
      background-color: var(--color-bg-weak-50) !important;
      color: var(--color-text-disabled-300);
    }
  }

  &:has(.celeste-text-input-button, .celeste-text-input-affix[inline='false'][askbd='false']) {
    gap: var(--spacing-0);
    padding-inline-end: var(--spacing-0);

    &:has(.celeste-text-input-button[inline='false'], .celeste-text-input-affix[variant='suffix']) {
      .celeste-text-input {
        padding-inline-end: var(--input-padding);
        border-inline-end: 1px solid var(--color-stroke-soft-200);
      }
    }

    &:has(.celeste-text-input-affix[variant='prefix']) {
      padding-inline: var(--spacing-0) var(--input-padding);

      .celeste-text-input {
        padding-inline-start: var(--input-padding);
        border-inline-start: 1px solid var(--color-stroke-soft-200);
      }
    }

    &:deep(.celeste-text-input-icon) {
      &[position='start'] {
        margin-inline-end: var(--input-gap);
      }

      &[position='end'] {
        margin-inline-start: var(--input-gap);
      }
    }
  }

  &:has(.celeste-text-input:hover:not(:focus, :disabled)) {
    /* stylelint-disable-next-line no-descending-specificity */
    &:not(:has(.celeste-text-input-button, .celeste-text-input-affix)) {
      border-color: transparent;
      background-color: var(--color-bg-weak-50);
    }

    &:has(.celeste-text-input-button:not(:hover), .celeste-text-input-affix:not(:hover)) {
      background-color: var(--color-bg-weak-50);
    }

    &:not(:has(.celeste-text-input-button:hover)) {
      .celeste-text-input::placeholder {
        color: var(--color-text-sub-600);
      }
    }
  }

  &:has(.celeste-text-input:placeholder-shown:not(:disabled)) {
    /* stylelint-disable-next-line no-descending-specificity */
    &:deep(.celeste-text-input-icon),
    &:deep(.celeste-text-input-affix) {
      color: var(--color-text-soft-400);
    }
  }
}
</style>
