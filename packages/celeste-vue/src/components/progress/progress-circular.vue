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
      strokeWidth?: number;
      showLabel?: boolean;
    }
  >(),
  {
    modelValue: 0,
    size: 80,
    strokeWidth: 6.4,
    showLabel: true,
  },
);

const delegatedProps = useDelegatedProps(props, 'class');

const radius = computed(() => (props.size - props.strokeWidth) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const offset = computed(() => {
  const value = Math.min(Math.max(props.modelValue ?? 0, 0), 100);
  return circumference.value * (1 - value / 100);
});
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :value="props.modelValue"
    :class="clsx('celeste-progress-circular', props.class)"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
    as="div"
  >
    <ProgressIndicator as-child>
      <svg
        class="celeste-progress-circular-svg"
        :width="props.size"
        :height="props.size"
      >
        <circle
          class="celeste-progress-circular-track"
          :cx="props.size / 2"
          :cy="props.size / 2"
          :r="radius"
          :stroke-width="props.strokeWidth"
          fill="transparent"
        />
        <circle
          class="celeste-progress-circular-indicator"
          :cx="props.size / 2"
          :cy="props.size / 2"
          :r="radius"
          :stroke-width="props.strokeWidth"
          fill="transparent"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="offset"
        />
      </svg>
    </ProgressIndicator>

    <!-- Label -->
    <div
      v-if="props.showLabel && props.size !== 48"
      class="celeste-progress-circular-label"
    >
      {{ Math.round(props.modelValue ?? 0) }}%
    </div>
  </ProgressRoot>
</template>

<style scoped lang="scss">
.celeste-progress-circular {
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
}

.celeste-progress-circular-svg {
  transform: rotate(-90deg);
}

.celeste-progress-circular-track {
  stroke: var(--color-bg-soft-200);
}

.celeste-progress-circular-indicator {
  transition: stroke-dashoffset 0.3s ease;
  stroke: var(--color-primary-base);
}

.celeste-progress-circular-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-text-strong-950);
  font: var(--label-sm);
  pointer-events: none;
  user-select: none;
}
</style>
