<script setup lang="ts">
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { ToggleGroupRoot as SegmentedControlRoot, useForwardPropsEmits } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { useTabObserver } from '@/composables/use-tab-observer';

const props = defineProps<Omit<ToggleGroupRootProps, 'type'> & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<ToggleGroupRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const { listRef, indicator, ready } = useTabObserver('[data-state="on"]');
</script>

<template>
  <SegmentedControlRoot
    ref="listRef"
    :class="clsx('celeste-segmented-control', props.class)"
    v-bind="forwarded"
    type="single"
  >
    <slot />
    <div
      :hidden="!ready"
      class="celeste-segmented-control-indicator"
      :style="{
        width: `${indicator.width}px`,
        height: `${indicator.height}px`,
        transform: `translate3d(${indicator.left}px, ${indicator.top}px, 0)`,
      }"
    />
  </SegmentedControlRoot>
</template>

<style scoped>
.celeste-segmented-control {
  display: flex;
  position: relative;
  gap: var(--spacing-4);
  isolation: isolate;
  align-items: center;
  width: 100%;
  padding: var(--spacing-4);
  border-radius: var(--radius-10);
  background-color: var(--color-bg-weak-50);

  &[data-orientation='vertical'] {
    flex-direction: column;
  }
}

.celeste-segmented-control-indicator {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  transition-property: transform, width, height;
  transition-duration: var(--animation-normal);
  transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  border-radius: var(--radius-6);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-toggle-switch);
  pointer-events: none;
}
</style>
