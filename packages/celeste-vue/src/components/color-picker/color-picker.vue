<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { useForwardPropsEmits } from 'radix-vue';
import ColorArea from './color-area.vue';
import { defineColorModel } from './composable/use-color-model';
import { useHueRef } from './composable/use-hue';

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: 'hsl(240, 100%, 50%)',
});

const emit = defineEmits<ColorPickerEmits>();

const delegatedProps = useDelegatedProps(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const colorModel = defineColorModel(props, emit);

const { hueRef } = useHueRef(colorModel);
</script>

<script lang="ts">
export interface ColorPickerProps {
  class?: HTMLAttributes['class'];
  modelValue: string;
}

export interface ColorPickerEmits {
  'update:modelValue': [value: string];
}
</script>

<template>
  <div class="celeste-color-picker-wrapper" v-bind="forwarded">
    <div class="celeste-color-picker">
      <ColorArea v-model="colorModel" :hue="hueRef" />
      <div class="celeste-color-slider">
        <input
          id=""
          type="range"
          name=""
        >
      </div>
      <div class="celeste-color-slider">
        <input
          id=""
          type="range"
          name=""
        >
      </div>
      <div class="celeste-color-code">
        Color control
      </div>
    </div>
    <div class="celeste-color-swatches">
      Swatches
    </div>
  </div>
</template>

<style scoped lang="scss">
.celeste-color-picker-wrapper {
  display: grid;
  width: 272px;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-16);

  .celeste-color-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-16);
    gap: var(--spacing-12);

    & > * {
      box-sizing: border-box;
    }

    .celeste-color-slider {
      width: 100%;

      input {
        width: 100%;
      }
    }

    .celeste-color-code {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }
  }

  .celeste-color-swatches {
    display: flex;
    flex-direction: column;
    padding: var(--radius-16);
    border-block-start: 1px solid var(--color-stroke-soft-200);
  }
}
</style>
