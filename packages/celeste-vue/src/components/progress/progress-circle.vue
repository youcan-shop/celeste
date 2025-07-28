<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'radix-vue';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<
    ProgressRootProps & {
      class?: HTMLAttributes['class'];
      size?: 80 | 72 | 64 | 56 | 48;
    }
  >(),
  {
    modelValue: 0,
    size: 80,
    max: 100,
  },
);

const delegatedProps = useDelegatedProps(props, 'class');

const STROKE_WIDTH = 6.4;
const radius = computed(() => (props.size - STROKE_WIDTH) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);

const progress = computed(() => {
  if (props.max === 0)
    return 0;

  const value = Math.min(Math.max(props.modelValue ?? 0, 0), props.max);

  return Math.round((value / props.max) * 100);
});

const offset = computed(() => {
  return circumference.value * (1 - progress.value / 100);
});

const circleSize = computed(() => `${props.size}px`);
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :value="props.modelValue"
    :class="clsx('celeste-progress-circle', props.class)"
    as="div"
  >
    <ProgressIndicator as-child>
      <svg
        class="celeste-progress-circle-svg"
        :width="props.size"
        :height="props.size"
      >
        <circle
          class="celeste-progress-circle-track"
          :cx="props.size / 2"
          :cy="props.size / 2"
          :r="radius"
          :stroke-width="STROKE_WIDTH"
          fill="transparent"
        />
        <circle
          class="celeste-progress-circle-indicator"
          :cx="props.size / 2"
          :cy="props.size / 2"
          :r="radius"
          :stroke-width="STROKE_WIDTH"
          fill="transparent"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="offset"
        />
      </svg>
    </ProgressIndicator>
    <div
      v-if="props.size !== 48"
      class="celeste-progress-circle-label"
    >
      <slot>
        {{ progress }}%
      </slot>
    </div>
  </ProgressRoot>
</template>

<style scoped lang="scss">
.celeste-progress-circle {
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: v-bind('circleSize');
  height: v-bind('circleSize');
}

.celeste-progress-circle-svg {
  transform: rotate(-90deg);
}

.celeste-progress-circle-track {
  stroke: var(--color-bg-soft-200);
}

.celeste-progress-circle-indicator {
  transition: stroke-dashoffset 0.3s ease;
  stroke: var(--color-primary-base);
}

.celeste-progress-circle-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-text-strong-950);
  font: var(--label-sm);
  text-align: center;
  pointer-events: none;
  user-select: none;
}
</style>
