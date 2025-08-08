<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive, type PrimitiveProps } from 'radix-vue';

const props = withDefaults(defineProps<TagProps>(), {
  variant: 'stroke',
  dismissable: false,
  as: 'div',
});

defineEmits<TagEmits>();
</script>

<script lang="ts">
export interface TagProps extends PrimitiveProps {
  variant?: 'stroke' | 'gray';
  class?: HTMLAttributes['class'];
  dismissable?: boolean;
  disabled?: boolean;
}

export interface TagEmits {
  dismiss: [];
}
</script>

<template>
  <Primitive
    :as
    :as-child
    :class="clsx('celeste-tag', props.class)"
    :data-tag-variant="variant"
    :aria-disabled="disabled"
  >
    <slot />
    <button
      v-if="dismissable"
      :disabled="disabled"
      class="celeste-tag-dismiss-button"
      aria-label="dismiss"
      @click.prevent.stop="$emit('dismiss')"
    >
      <i class="i-celeste-close-line" />
    </button>
  </Primitive>
</template>

<style scoped lang="scss">
.celeste-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4) var(--spacing-8);
  transition: background-color, border-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: 1px solid transparent;
  border-radius: var(--radius-6);
  color: var(--color-text-sub-600);
  font: var(--label-xs);
  gap: var(--spacing-4);

  &[data-tag-variant='stroke']:not([aria-disabled='true']) {
    border-color: var(--color-stroke-soft-200);
    background-color: var(--color-bg-white-0);

    &:hover {
      border-color: transparent;
      background-color: var(--color-bg-weak-50);
    }
  }

  &[data-tag-variant='gray']:not([aria-disabled='true']) {
    border-color: transparent;
    background-color: var(--color-bg-weak-50);

    &:hover {
      border-color: var(--color-stroke-soft-200);
      background-color: var(--color-bg-white-0);
    }
  }

  .celeste-tag-dismiss-button {
    --size: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size);
    height: var(--size);
    margin-inline-end: calc(var(--spacing-4) * -1);
    padding: var(--spacing-0);
    border: none;
    border-radius: calc(var(--radius-4) / 2);
    background-color: transparent;
    cursor: pointer;

    i {
      transition: background-color var(--animation-fast) ease-out;
      background-color: var(--color-icon-soft-400);
    }

    &:disabled {
      cursor: auto;

      i {
        background-color: var(--color-icon-disabled-300);
      }
    }

    &:focus:not([aria-disabled='true']) {
      outline: none;
      box-shadow: var(--shadow-buttons-important-focus);
    }

    &:not(:disabled):hover {
      i {
        background-color: var(--color-icon-sub-600);
      }
    }
  }

  &[aria-disabled='true'] {
    background-color: var(--color-bg-weak-50);
    color: var(--color-text-disabled-300);
  }
}
</style>
