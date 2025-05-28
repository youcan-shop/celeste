<script setup lang="ts">
import type { TextareaHTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = withDefaults(defineProps<TextAreaProps>(), {
  disabled: false,
  placeholder: 'Placeholder',
  showCount: true,
});

const modelValue = defineModel<string>();
</script>

<script lang="ts">
export interface TextAreaProps {
  class?: TextareaHTMLAttributes['class'];
  placeholder: string;
  showCount?: boolean;
  disabled?: boolean;
  maxLength?: TextareaHTMLAttributes['maxlength'];
}
</script>

<template>
  <div
    :class="clsx(
      'celeste-textarea-wrapper',
      props.class,
    )"
    :aria-disabled="disabled"
    @click="$el.querySelector('textarea')?.focus()"
  >
    <textarea
      v-model="modelValue"
      v-bind="$attrs"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :disabled="disabled"
      class="celeste-textarea"
    />
    <span v-if="showCount && Number(maxLength)" class="celeste-textarea-count">
      {{ `${modelValue?.length || 0}/${maxLength}` }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@mixin transition-default {
  transition-property: background-color, border-color, box-shadow, text-decoration-color, color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
}

.celeste-textarea-wrapper {
  @include transition-default;

  --spacing: var(--spacing-10);

  display: flex;
  position: relative;
  align-items: center;
  padding: var(--spacing);
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-10);
  background: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  cursor: text;
  gap: var(--spacing-8);

  &:hover:not(:focus-within) {
    border-color: var(--color-bg-weak-50);
    background: var(--color-bg-weak-50);
    box-shadow: none;
    color: var(--color-text-sub-600);
  }

  &:focus-within {
    &:not([aria-disabled='true']) {
      outline: none;
      box-shadow: var(--shadow-buttons-important-focus);

      &:not([error='true']) {
        border: 1px solid var(--color-stroke-strong-950);
      }
    }
  }

  .celeste-textarea-count {
    --resize-handle-offset: 16px;

    display: flex;
    position: absolute;
    color: var(--color-text-soft-400);
    font: var(--subheading-2xs);
    inset-block-end: var(--spacing);
    inset-inline-end: calc(var(--spacing) + var(--resize-handle-offset));
  }

  &[aria-disabled='true'] {
    border-color: transparent;
    background: var(--color-bg-weak-50);
    box-shadow: none;
    cursor: not-allowed;

    .celeste-textarea-count {
      color: var(--color-icon-disabled-300);
    }
  }

  &[error='true'] {
    .celeste-textarea-count {
      color: var(--color-state-error-base);
    }
  }

  &[error='true'],
  &[error='true']:hover {
    border: 1px solid var(--color-state-error-base);
  }

  .celeste-textarea {
    @include transition-default;

    width: 100%;
    border: none;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: var(--font-size-2);
    resize: vertical;

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
      pointer-events: none;

      &::placeholder {
        color: var(--color-text-disabled-300);
      }
    }
  }
}
</style>
