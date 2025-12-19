<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { computed } from 'vue';
import { DEFAULT_SWATCH } from '@/utils/color';
import { defineColorModel } from './composable/use-color-model';

const props = withDefaults(defineProps<ColorSwatchProps>(), {
  swatch: () => DEFAULT_SWATCH,
});
const emit = defineEmits<ColorSwatchEmits>();

const tinyColorRef = defineColorModel(props, emit);

const activeSwatchColorBg = computed(() => {
  return `0 0 0 2px var(--color-bg-white-0), 0 0 0 4px ${tinyColorRef.value.toRgbString()}`;
});

function handleSwatchColorClick(newColor: string) {
  tinyColorRef.value = tinycolor(newColor);
}

function isSwatchColorSelected(color: string) {
  return tinyColorRef.value.toHex8String().toLocaleLowerCase() === tinycolor(color).toHex8String().toLocaleLowerCase();
}
</script>

<script lang="ts">
export interface ColorSwatchProps {
  modelValue: tinycolor.Instance;
  label: string;
  swatch?: string[];
  defaultColor?: string;
}

export interface ColorSwatchEmits {
  'update:modelValue': [value: string];
}
</script>

<template>
  <div class="celeste-color-swatch">
    <span class="swatch-label">
      {{ label }}
    </span>
    <div class="color-palette">
      <div
        v-for="swatchColor in swatch"
        :key="swatchColor"
        class="palette-color"
        :style="{ background: swatchColor }"
        :aria-selected="isSwatchColorSelected(swatchColor.toLowerCase())"
        :title="swatchColor"
        :aria-label="`Color:${swatchColor}`"
        role="option"
        tabindex="0"
        @click="handleSwatchColorClick(swatchColor)"
        @keydown.space="handleSwatchColorClick(swatchColor)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.celeste-color-swatch {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);

  .swatch-label {
    color: var(--color-text-sub-600);
    font: var(--paragraph-xs);
  }

  .color-palette {
    display: flex;
    gap: var(--spacing-4);
    align-items: center;

    .palette-color {
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      margin: var(--spacing-4);
      padding: var(--spacing-4);
      border-radius: 50%;

      &[aria-selected='true'] {
        box-shadow: v-bind('activeSwatchColorBg');
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
