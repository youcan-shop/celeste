<script setup lang="ts">
import { uid } from '@/utils/crypto';
import clsx from 'clsx';
import { Primitive } from 'radix-vue';
import { computed, type InputHTMLAttributes } from 'vue';
import TextInputButton from './text-input-button.vue';

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

<script lang="ts">
export interface TextInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
  size?: 'xs' | 'sm' | 'md';
  hasError?: boolean;
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

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    background-clip: text;
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

    .celeste-text-input-clear-button {
      color: var(--color-text-disabled-300);
      pointer-events: none;
    }
  }

  &:has(.celeste-text-input:hover:not(:focus, :disabled)) {
    &:not(:has(.celeste-text-input-node)) {
      --celeste-text-input-border-color: transparent;
    }

    &:not(:has(.celeste-text-input-node:hover)) {
      --celeste-text-input-icon-color: var(--color-text-sub-600);
      --celeste-text-input-placeholder-color: var(--color-text-sub-600);

      background-color: var(--color-bg-weak-50);
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
    height: calc(var(--input-height) - var(--spacing-2)) !important;
  }

  [dir='ltr'] & {
    :deep(.celeste-text-input-node.celeste-text-input-leading-node) {
      border-right: 1px solid var(--color-stroke-soft-200) !important;
      border-radius: var(--input-radius) 0 0 var(--input-radius) !important;
    }

    :deep(.celeste-text-input-node.celeste-text-input-trailing-node) {
      border-left: 1px solid var(--color-stroke-soft-200) !important;
      border-radius: 0 var(--input-radius) var(--input-radius) 0 !important;
    }
  }

  [dir='rtl'] & {
    :deep(.celeste-text-input-node.celeste-text-input-leading-node) {
      border-left: 1px solid var(--color-stroke-soft-200) !important;
      border-radius: 0 var(--input-radius) var(--input-radius) 0 !important;
    }

    :deep(.celeste-text-input-node.celeste-text-input-trailing-node) {
      border-right: 1px solid var(--color-stroke-soft-200) !important;
      border-radius: var(--input-radius) 0 0 var(--input-radius) !important;
    }
  }

  :deep(.celeste-text-input-node.celeste-text-input-leading-node) {
    border-right: 1px solid var(--color-stroke-soft-200) !important;
    border-radius: var(--input-radius) 0 0 var(--input-radius) !important;
  }

  :deep(.celeste-text-input-node.celeste-text-input-trailing-node) {
    border-left: 1px solid var(--color-stroke-soft-200) !important;
    border-radius: 0 var(--input-radius) var(--input-radius) 0 !important;
  }
}
</style>
