<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { SliderRange, SliderRoot, type SliderRootEmits, type SliderRootProps, SliderThumb, SliderTrack, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<Omit<SliderRootProps, 'orientation'> & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<SliderRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SliderRoot
    v-bind="forwarded"
    :class="clsx('celeste-slider', props.class)"
  >
    <SliderTrack class="celeste-slider-track">
      <SliderRange class="celeste-slider-range" />
    </SliderTrack>

    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      class="celeste-slider-thumb"
    />
  </SliderRoot>
</template>

<style lang="scss">
.celeste-slider {
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
  touch-action: none;

  .celeste-slider-track {
    position: relative;
    flex-grow: 1;
    width: 100%;
    height: 6px;
    overflow: hidden;
    border-radius: var(--radius-full);
    background-color: var(--color-bg-soft-200);

    .celeste-slider-range {
      position: absolute;
      height: 100%;
      border-radius: var(--radius-full) 0 0 var(--radius-full);
      background-color: var(--color-primary-base);
    }
  }

  .celeste-slider-thumb {
    display: block;
    width: 6px;
    height: 6px;
    border: 5px solid var(--color-static-white);
    border-radius: var(--radius-full);
    outline: none;
    background: var(--color-primary-base) content-box;
    cursor: pointer;
    filter: drop-shadow(0 2px 4px rgb(14 18 27 / 3%)) drop-shadow(0 6px 10px rgb(14 18 27 / 6%));

    &[style*='left: calc(0%'],
    &[style*='right: calc(0%'] {
      background-color: var(--color-bg-soft-200);
    }

    &:hover {
      cursor: grab;
    }

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
