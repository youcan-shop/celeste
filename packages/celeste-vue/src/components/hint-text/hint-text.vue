<script setup lang="ts">
import clsx from 'clsx';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<HintTextProps>(), {
  disabled: false,
});

const message = computed(() => props.error || props.text);
</script>

<script lang="ts">
export interface HintTextProps {
  text?: string;
  icon?: string;
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  error?: string;
}
</script>

<template>
  <div
    :role="error ? 'alert' : 'note'"
    :class="clsx(
      'celeste-hint-text',
      { 'celeste-hint-text-disabled': disabled },
      { 'celeste-hint-text-error': error },
      props.class,
    )"
  >
    <i v-if="icon" :class="icon" />
    <p>{{ message }}</p>
  </div>
</template>

<style lang="scss" scoped>
.celeste-hint-text {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);

  i {
    color: var(--color-icon-soft-400);
  }

  &-disabled {
    color: var(--color-text-disabled-300);

    i {
      color: var(--color-icon-disabled-300);
    }
  }

  &-error {
    color: var(--color-state-error-base);

    i {
      color: var(--color-state-error-base);
    }
  }
}
</style>
