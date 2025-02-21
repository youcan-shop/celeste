<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = withDefaults(defineProps<HintTextProps>(), {
  state: 'default',
});
</script>

<script lang="ts">
export interface HintTextProps {
  text?: string;
  icon?: string;
  class?: HTMLAttributes['class'];
  state?: 'default' | 'disabled' | 'error';
}
</script>

<template>
  <div
    :role="props.state === 'error' ? 'alert' : 'note'"
    :class="clsx(
      'celeste-hint-text',
      `celeste-hint-text-${state}`,
      props.class,
    )"
  >
    <i v-if="icon" :class="icon" />
    <p v-if="text">
      {{ text }}
    </p>
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
