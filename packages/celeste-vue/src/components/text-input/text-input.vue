<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'radix-vue';

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
  <label
    :size="size"
    role="presentation"
    :has-error="hasError"
    :class="clsx('celeste-text-input-wrapper', props.class)"
  >
    <Primitive as-child class="celeste-text-input-icon celeste-text-input-leading-icon">
      <slot name="leadingIcon" />
    </Primitive>

    <Primitive as-child class="celeste-text-input-node celeste-text-input-leading-node">
      <slot name="leadingNode" />
    </Primitive>

    <Primitive as-child class="celeste-text-input-inline-node celeste-text-input-leading-inline-node">
      <slot name="leadingInlineNode" />
    </Primitive>

    <input
      v-model="modelValue"
      v-bind="$attrs"
      :type="type"
      class="celeste-text-input"
    >

    <Primitive as-child class="celeste-text-input-icon celeste-text-input-trailing-icon">
      <slot name="trailingIcon" />
    </Primitive>

    <Primitive as-child class="celeste-text-input-node celeste-text-input-trailing-node">
      <slot name="trailingNode" />
    </Primitive>

    <Primitive as-child class="celeste-text-input-inline-node celeste-text-input-trailing-inline-node">
      <slot name="trailingInlineNode" />
    </Primitive>
  </label>
</template>

<style scoped lang="scss">
/* stylelint-disable no-descending-specificity */

.celeste-text-input-wrapper {
  --celeste-text-input-border-color: var(--color-stroke-soft-200);
  --celeste-text-input-drop-shadow: var(--shadow-regular-xs);
  --celeste-text-input-icon-color: var(--color-text-soft-400);
  --celeste-text-input-affix-color: var(--color-text-soft-400);
  --celeste-text-input-placeholder-color: var(--color-text-soft-400);
  --celeste-text-input-affix-background-color: var(--color-bg-white-0);

  display: flex;
  box-sizing: border-box;
  align-items: center;
  height: var(--input-height);
  padding-inline: calc(var(--input-padding) + var(--spacing-2)) var(--input-padding);
  transition: all var(--animation-fast) ease-out;
  border: 1px solid var(--celeste-text-input-border-color);
  border-radius: var(--input-radius);
  outline: 2px solid transparent;
  outline-offset: 2px;
  background-color: var(--color-bg-white-0);
  box-shadow: var(--celeste-text-input-drop-shadow);
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
    --celeste-text-input-border-color: var(--color-state-error-base);
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
      color: var(--celeste-text-input-placeholder-color);
    }
  }

  &:has(.celeste-text-input-leading-node) {
    padding-inline-start: 0;
  }

  &:has(.celeste-text-input-trailing-node) {
    padding-inline-end: 0;
  }

  &:has(.celeste-text-input:focus) {
    --celeste-text-input-border-color: var(--color-stroke-strong-950);
    --celeste-text-input-placeholder-color: var(--color-text-sub-600);
    --celeste-text-input-icon-color: var(--color-text-sub-600);
    --celeste-text-input-affix-color: var(--color-text-sub-600);

    outline-color: var(--color-stroke-soft-200);

    &[has-error='true'] {
      --celeste-text-input-border-color: var(--color-state-error-base);

      outline-color: var(--color-state-error-lighter);
    }
  }

  &:has(.celeste-text-input:disabled) {
    --celeste-text-input-border-color: transparent;
    --celeste-text-input-drop-shadow: none;
    --celeste-text-input-affix-background-color: var(--color-bg-weak-50);
    --celeste-text-input-affix-color: var(--color-text-disabled-300);
    --celeste-text-input-placeholder-color: var(--color-text-disabled-300);
    --celeste-text-input-icon-color: var(--color-text-disabled-300);

    background-color: var(--color-bg-weak-50);
    box-shadow: none;
    color: var(--color-text-disabled-300);
    pointer-events: none;

    .celeste-text-input::placeholder {
      color: currentcolor;
    }
  }

  &:has(.celeste-text-input:hover:not(:focus, :disabled)) {
    &:not(:has(.celeste-text-input-node)) {
      --celeste-text-input-border-color: transparent;
    }

    --celeste-text-input-icon-color: var(--color-text-sub-600);
    --celeste-text-input-placeholder-color: var(--color-text-sub-600);

    background-color: var(--color-bg-weak-50);
  }

  .celeste-text-input-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    transition: all var(--animation-fast) ease-out;
    color: var(--celeste-text-input-icon-color);
  }

  .celeste-text-input-node {
    border-radius: var(--input-radius);
  }

  .celeste-text-input-leading-node {
    border-end-end-radius: 0;
    border-start-end-radius: 0;
    border-inline-end: 1px solid var(--color-stroke-soft-200);
  }

  .celeste-text-input-trailing-node {
    border-inline-start: 1px solid var(--color-stroke-soft-200);
    border-end-start-radius: 0;
    border-start-start-radius: 0;
  }
}
</style>
