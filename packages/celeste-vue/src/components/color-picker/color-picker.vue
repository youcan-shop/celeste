<script setup lang="ts">
import AlphaSlider from '@/components/color-picker/alpha-slider.vue';
import ColorSwatch from '@/components/color-picker/color-swatch.vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { useForwardPropsEmits } from 'radix-vue';
import tinycolor from 'tinycolor2';
import { computed, type HTMLAttributes, ref, watch } from 'vue';
import ColorArea from './color-area.vue';
import { defineColorModel } from './composable/use-color-model';
import HueSlider from './hue-slider.vue';

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: 'hsl(240, 100%, 50%)',
});

const emit = defineEmits<ColorPickerEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emit);

const tinyColorRef = defineColorModel(props, emit);

const hueRef = ref(tinyColorRef.value.toHsl().h);

watch(tinyColorRef, (tinyColorInstance) => {
  const newHue = tinyColorInstance.toHsl().h;

  // Preserve hue when color becomes grayscale
  if (newHue === 0 && hueRef.value !== 0) {
    return;
  }

  hueRef.value = newHue;
}, { immediate: true });

// ALTERNATIVE

const HSVA = computed({
  get: () => tinyColorRef.value.toHsv(),
  set: (newValue: tinycolor.ColorFormats.HSVA) => {
    hue.value = newValue.h;
    saturation.value = newValue.s;
    value.value = newValue.v;
    alpha.value = newValue.a;
  },
});

const hue = ref(HSVA.value.h);
const saturation = ref(HSVA.value.s);
const value = ref(HSVA.value.v);
const alpha = ref(HSVA.value.a);

watch([hue, saturation, value, alpha], () => {
  tinyColorRef.value = tinycolor({
    h: hue.value,
    s: saturation.value,
    v: value.value,
    a: alpha.value,
  });
});
</script>

<script lang="ts">
export interface ColorPickerProps {
  class?: HTMLAttributes['class'];
  modelValue: string | tinycolor.ColorInput;
}

export interface ColorPickerEmits {
  'update:modelValue': [value: string];
}
</script>

<template>
  <div class="celeste-color-picker-wrapper" v-bind="forwarded">
    <div class="celeste-color-picker">
      <ColorArea
        v-model="HSVA"
        :hue="hue"
      />
      <HueSlider v-model="hue" />
      <AlphaSlider v-model="alpha" :color="HSVA" />
      <div class="celeste-color-code">
        Color Inputs
      </div>
    </div>
    <div class="celeste-color-swatches">
      <ColorSwatch v-model="HSVA" :hue="hueRef" />
    </div>
    <!-- <div v-if="$slots.swatches" class="celeste-color-swatches">
      <slot name="swatches" />
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.celeste-color-picker-wrapper {
  display: grid;
  box-sizing: border-box;
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

:deep(.celeste-color-thumb) {
  position: absolute;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--color-bg-white-0);
}

:deep(.celeste-color-slider) {
  --track-height: 8px;

  width: 100%;
  padding-block: var(--spacing-4);

  .slider-track {
    position: relative;
    width: 100%;
    height: var(--track-height);
    border-radius: calc(var(--track-height) / 2);

    .celeste-color-thumb {
      top: calc(var(--track-height) / 2);
    }
  }
}
</style>
