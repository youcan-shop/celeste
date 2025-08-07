<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = withDefaults(defineProps<TagProps>(), {
  variant: 'stroke',
  dismissable: true,
});
</script>

<script lang="ts">
export interface TagProps {
  variant?: 'stroke' | 'gray';
  class?: HTMLAttributes['class'];
  dismissable?: boolean;
}
</script>

<template>
  <div :class="clsx('celeste-tag', props.class)" :data-tag-variant="variant">
    <slot />
    <button v-if="dismissable" class="celeste-tag-dismiss-button">
      <i class="i-celeste-close-line" />
    </button>
  </div>
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

  &[data-tag-variant='stroke'] {
    border-color: var(--color-stroke-soft-200);
    background-color: var(--color-bg-white-0);

    &:hover {
      border-color: transparent;
      background-color: var(--color-bg-weak-50);
    }
  }

  &[data-tag-variant='gray'] {
    border-color: transparent;
    background-color: var(--color-bg-weak-50);

    &:hover {
      border-color: var(--color-stroke-soft-200);
      background-color: var(--color-bg-white-0);
    }
  }

  .celeste-tag-dismiss-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-inline-end: calc(var(--spacing-4) * -1);
    padding: 0;
    border: none;
    border-radius: calc(var(--radius-4) / 2);
    background-color: transparent;
    cursor: pointer;

    &:focus:not(:disabled) {
      outline: none;
      box-shadow: var(--shadow-buttons-important-focus);
    }

    i {
      transition: background-color var(--animation-fast) ease-out;
      background-color: var(--color-icon-soft-400);
    }

    &:hover {
      i {
        background-color: var(--color-icon-sub-600);
      }
    }
  }
}
</style>
