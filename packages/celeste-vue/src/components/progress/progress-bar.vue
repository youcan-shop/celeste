<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'radix-vue';

const props = withDefaults(
  defineProps<
    ProgressRootProps & {
      class?: HTMLAttributes['class'];
      color: 'blue' | 'red' | 'orange' | 'green' | 'primary';
      percentage?: boolean;
      title?: string;
      layout?: 'default' | 'no-description' | 'inline' | 'bare';
    }
  >(),
  {
    modelValue: 0,
    color: 'primary',
    layout: 'bare',
  },
);

const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <div :class="clsx('celeste-progress-bar-wrapper', `celeste-progress-bar-wrapper-${layout}`)">
    <!-- Label -->
    <div v-if="layout !== 'bare'" class="celeste-progress-bar-label">
      <span v-if="props.title && layout !== 'inline'" class="celeste-progress-bar-label-title">{{ title }}</span>
      <span
        v-if="props.percentage"
        class="celeste-progress-bar-label-percentage"
      >
        {{ Math.round(props.modelValue ?? 0) }}%
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
        :class="clsx('celeste-progress-bar-indicator', `celeste-progress-bar-indicator-${color}`)"
        :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
      />
    </ProgressRoot>

    <div v-if="$slots.description && layout === 'default'" class="celeste-progress-bar-description">
      <slot name="description" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.celeste-progress-bar-wrapper {
  display: flex;
  width: 100%;
  max-width: 24rem;
  gap: 6px;

  .celeste-progress-bar {
    height: 6px;
    overflow: hidden;
    border-radius: var(--radius-full);
    background: var(--color-bg-soft-200);
  }

  .celeste-progress-bar-indicator {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-full);
    background: var(--color-primary-base);

    &-orange {
      background: var(--color-state-warning-base);
    }

    &-red {
      background: var(--color-state-error-base);
    }

    &-blue {
      background: var(--color-state-information-base);
    }

    &-green {
      background: var(--color-state-success-base);
    }
  }

  .celeste-progress-bar-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;

    &-title {
      color: var(--color-text-strong-950);
      font: var(--label-sm);
    }

    &-percentage {
      color: var(--color-text-sub-600);
      font: var(--paragraph-sm);
    }
  }

  .celeste-progress-bar-description {
    color: var(--color-text-sub-600);
    font: var(--paragraph-xs);
  }

  &-default,
  &-no-description {
    flex-direction: column;

    &:deep(.celeste-progress-bar) {
      width: 100%;
    }
  }

  &-inline,
  &-bare {
    flex-direction: row-reverse;
    align-items: center;
    gap: var(--spacing-8);

    &:deep(.celeste-progress-bar) {
      flex: 1 0 0;
    }
  }
}
</style>
