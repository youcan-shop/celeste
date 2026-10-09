<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'reka-ui';
import { computed } from 'vue';
import { uid } from '@/utils/crypto';
import TextInputButton from './text-input-button.vue';

export interface TextInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'date';
  size?: 'xs' | 'sm' | 'md';
  hasError?: boolean;
  autocomplete?: string;
}

const props = withDefaults(defineProps<TextInputProps>(), {
  type: 'text',
  size: 'md',
  hasError: false,
});

const id = computed(() => props.id || uid());

const modelValue = defineModel<string | number>();

const showClearButton = computed(() => {
  return props.type === 'search' && modelValue.value && String(modelValue.value).length > 0;
});

function clearInput() {
  modelValue.value = '';
}
</script>

<template>
  <label
    :for="id"
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

    <Primitive
      inline
      as-child
      class="celeste-text-input-inline-node celeste-text-input-leading-inline-node"
    >
      <slot name="leadingInlineNode" />
    </Primitive>

    <input
      :id="id"
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

    <Primitive
      inline
      as-child
      class="celeste-text-input-inline-node celeste-text-input-trailing-inline-node"
    >
      <TextInputButton
        v-if="showClearButton"
        inline
        type="button"
        aria-label="Clear search"
        @click="clearInput"
      >
        <i class="i-celeste-close-line" />
      </TextInputButton>
      <slot v-else name="trailingInlineNode" />
    </Primitive>
  </label>
</template>

<style scoped lang="scss">
/* stylelint-disable no-descending-specificity */

.celeste-text-input-wrapper {
  --celeste-text-input-border-color: var(--color-stroke-soft-200);
  --celeste-text-input-drop-shadow: var(--shadow-regular-xs);
  --celeste-text-input-icon-color: var(--color-text-sub-600);
  --celeste-text-input-affix-color: var(--color-text-sub-600);
  --celeste-text-input-muted-color: var(--color-text-soft-400);
  --celeste-text-input-placeholder-color: var(--color-text-soft-400);
  --celeste-text-input-affix-background-color: var(--color-bg-white-0);

  display: flex;
  box-sizing: border-box;
  align-items: center;
  height: var(--input-height);
  padding-inline: var(--input-padding);
  transition: all var(--animation-fast) ease-out;
  border: 1px solid var(--celeste-text-input-border-color);
  border-radius: var(--input-radius);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--celeste-text-input-drop-shadow);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  gap: var(--input-gap);

  &[size='xs'] {
    --input-gap: var(--spacing-6);
    --input-height: 32px;
    --input-radius: var(--radius-8);
    --input-padding: var(--spacing-8);
    --input-affix-padding: var(--spacing-10);
  }

  &[size='sm'] {
    --input-gap: var(--spacing-8);
    --input-height: 36px;
    --input-radius: var(--radius-8);
    --input-padding: var(--spacing-10);
    --input-affix-padding: var(--spacing-10);
  }

  &[size='md'] {
    --input-gap: var(--spacing-8);
    --input-height: 40px;
    --input-radius: var(--radius-10);
    --input-padding: var(--spacing-12);
    --input-affix-padding: var(--spacing-12);
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

    &[type='tel'] {
      direction: ltr;
      text-align: -webkit-match-parent;
      text-align: match-parent;
    }

    // Hide default webkit search cancel button
    &[type='search'] {
      &::-webkit-search-cancel-button {
        display: none;
        appearance: none;
      }

      &::-webkit-search-decoration {
        display: none;
        appearance: none;
      }
    }

    // Hide default browser date UI (calendar icon, clear button, spinner)
    &[type='date'] {
      &::-webkit-calendar-picker-indicator {
        display: none;
        appearance: none;
      }

      &::-webkit-clear-button,
      &::-webkit-inner-spin-button {
        display: none;
        appearance: none;
      }

      &::-ms-clear,
      &::-ms-expand {
        display: none;
      }
    }
  }

  &:has(.celeste-text-input-leading-node) {
    padding-inline-start: 0;
  }

  &:has(.celeste-text-input-trailing-node) {
    padding-inline-end: 0;
  }

  &:has(.celeste-text-input:placeholder-shown) {
    --celeste-text-input-icon-color: var(--color-text-soft-400);
    --celeste-text-input-affix-color: var(--color-text-soft-400);
  }

  &:hover:not(:has(.celeste-text-input:focus)) {
    --celeste-text-input-drop-shadow: none;

    &:not([has-error='true'], :has(.celeste-text-input-node)) {
      --celeste-text-input-border-color: transparent;
    }

    &:not(:has(.celeste-text-input-node:hover)) {
      --celeste-text-input-icon-color: var(--color-text-sub-600);
      --celeste-text-input-placeholder-color: var(--color-text-sub-600);

      background-color: var(--color-bg-weak-50);
    }
  }

  &:has(.celeste-text-input:focus) {
    --celeste-text-input-border-color: var(--color-stroke-strong-950);
    --celeste-text-input-drop-shadow: var(--shadow-buttons-important-focus);
    --celeste-text-input-placeholder-color: var(--color-text-sub-600);
    --celeste-text-input-icon-color: var(--color-text-sub-600);
    --celeste-text-input-affix-color: var(--color-text-sub-600);

    &[has-error='true'] {
      --celeste-text-input-border-color: var(--color-state-error-base);
      --celeste-text-input-drop-shadow: var(--shadow-buttons-error-focus);
    }
  }

  :deep(
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active
  ) {
    transition: background-color 5000s ease-in-out 0s;
    background-clip: text;
  }

  &:has(.celeste-text-input:disabled) {
    --celeste-text-input-border-color: transparent;
    --celeste-text-input-drop-shadow: none;
    --celeste-text-input-affix-background-color: var(--color-bg-weak-50);
    --celeste-text-input-affix-color: var(--color-text-disabled-300);
    --celeste-text-input-muted-color: var(--color-text-disabled-300);
    --celeste-text-input-placeholder-color: var(--color-text-disabled-300);
    --celeste-text-input-icon-color: var(--color-text-disabled-300);

    background-color: var(--color-bg-weak-50);
    color: var(--color-text-disabled-300);
    pointer-events: none;

    .celeste-text-input::placeholder {
      color: currentcolor;
    }
  }

  .celeste-text-input-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    transition: all var(--animation-fast) ease-out;
    color: var(--celeste-text-input-icon-color);
  }

  :deep(.celeste-text-input-node.celeste-text-input-leading-node),
  :deep(.celeste-text-input-node.celeste-text-input-trailing-node) {
    height: calc(var(--input-height) - var(--spacing-2));
  }

  :deep(.celeste-text-input-node.celeste-text-input-leading-node) {
    margin-inline-end: calc(var(--input-padding) - var(--input-gap));
    border-inline-end: 1px solid var(--color-stroke-soft-200);
    border-start-start-radius: var(--input-radius);
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    border-end-start-radius: var(--input-radius);
  }

  :deep(.celeste-text-input-node.celeste-text-input-trailing-node) {
    margin-inline-start: calc(var(--input-padding) - var(--input-gap));
    border-inline-start: 1px solid var(--color-stroke-soft-200);
    border-start-start-radius: 0;
    border-start-end-radius: var(--input-radius);
    border-end-end-radius: var(--input-radius);
    border-end-start-radius: 0;
  }
}
</style>
