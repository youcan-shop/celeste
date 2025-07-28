<script setup lang="ts">
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(
  defineProps<
    ProgressRootProps & {
      class?: HTMLAttributes['class'];
      color?: 'blue' | 'red' | 'orange' | 'green' | 'primary';
      title?: string;
      layout?: 'default' | 'no-description' | 'inline' | 'bare';
    }
  >(),
  {
    modelValue: 0,
    color: 'primary',
    layout: 'bare',
    max: 100,
  },
);

const delegatedProps = useDelegatedProps(props, 'class');

const progress = computed(() => {
  if (props.max === 0)
    return 0;

  const value = Math.min(Math.max(props.modelValue ?? 0, 0), props.max);

  return Math.round((value / props.max) * 100);
});

const progressIndicator = computed(() => {
  return 100 - (props.modelValue ?? 0) / props.max * 100;
});
</script>

<template>
  <div class="celeste-progress-bar-wrapper" :data-layout="layout">
    <div v-if="layout !== 'bare'" class="celeste-progress-bar-label">
      <span
        v-if="props.title && layout !== 'inline'"
        class="celeste-progress-bar-label-title"
      >
        {{ title }}
      </span>
      <span
        class="celeste-progress-bar-label"
      >
        <slot name="label">
          {{ progress }}%
        </slot>
      </span>
    </div>

    <ProgressRoot
      v-bind="delegatedProps"
      :class="
        clsx(
          'celeste-progress-bar',
          props.class,
        )
      "
    >
      <ProgressIndicator
        class="celeste-progress-bar-indicator"
        :data-color="color"
      />
    </ProgressRoot>

    <div v-if="$slots.description && layout === 'default'" class="celeste-progress-bar-description">
      <slot name="description" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.celeste-progress-bar-wrapper {
  --bar-height: 6px;

  display: flex;
  width: 100%;
  gap: var(--spacing-6);

  .celeste-progress-bar {
    height: var(--bar-height);
    overflow: hidden;
    border-radius: var(--radius-full);
    background: var(--color-bg-soft-200);
  }

  .celeste-progress-bar-indicator {
    --progress: v-bind('progressIndicator');

    width: 100%;
    height: 100%;
    transform: translateX(calc(var(--progress) * -1%));
    border-radius: var(--radius-full);
    background: var(--color-primary-base);

    :dir(rtl) & {
      transform: translateX(calc(var(--progress) * 1%));
    }

    &[data-color='orange'] {
      background: var(--color-state-warning-base);
    }

    &[data-color='red'] {
      background: var(--color-state-error-base);
    }

    &[data-color='blue'] {
      background: var(--color-state-information-base);
    }

    &[data-color='green'] {
      background: var(--color-state-success-base);
    }
  }

  .celeste-progress-bar-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-6);
    color: var(--color-text-sub-600);
    font: var(--paragraph-sm);

    &.celeste-progress-bar-title {
      color: var(--color-text-strong-950);
      font: var(--label-sm);
    }
  }

  .celeste-progress-bar-description {
    color: var(--color-text-sub-600);
    font: var(--paragraph-xs);
  }

  &[data-layout='default'],
  &[data-layout='no-description'] {
    flex-direction: column;

    &:deep(.celeste-progress-bar) {
      width: 100%;
    }
  }

  &[data-layout='inline'],
  &[data-layout='bare'] {
    flex-direction: row-reverse;
    align-items: center;
    gap: var(--spacing-8);

    &:deep(.celeste-progress-bar) {
      flex: 1;
    }
  }
}
</style>
