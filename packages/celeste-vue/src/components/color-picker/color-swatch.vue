<script setup lang="ts">
import type tinycolor from 'tinycolor2';
import { defineColorModel } from '@/components/color-picker/composable/use-color-model';
import { computed } from 'vue';

const props = withDefaults(defineProps<ColorSwatchProps>(), {
  label: 'Recommended Colors',
  swatch: () => DEFAULT_SWATCH,
});
const emit = defineEmits<ColorPickerEmits>();

const tinyColorRef = defineColorModel(props, emit);

const alpha = computed(() => tinyColorRef.value.getAlpha());

const hex = computed(() => {
  return alpha.value < 1
    ? tinyColorRef.value.toHex8String()
    : tinyColorRef.value.toHexString();
});

const activeSwatchColorBG = computed(() => {
  return `0 0 0 2px var(--color-bg-white-0), 0 0 0 4px ${hex.value}`;
});

function handlePreset(color: string) {
  tinyColorRef.value = color;
}
</script>

<script lang="ts">
export interface ColorSwatchProps {
  modelValue: tinycolor.ColorInput;
  label?: string;
  swatch?: string[];
}

export interface ColorPickerEmits {
  'update:modelValue': [value: string];
}

export const DEFAULT_SWATCH = [
  '#717784',
  '#335CFF',
  '#FF8447',
  '#FB3748',
  '#1FC16B',
  '#F6B51E',
  '#7D52F4',
  '#47C2FF',
];
</script>

<template>
  <div class="celeste-color-swatch">
    <span class="swatch-label">
      {{ label }}
    </span>
    <div class="color-palette">
      <div
        v-for="color in swatch"
        :key="color"
        class="palette-color"
        :style="{ background: color }"
        :aria-selected="hex.toLowerCase() === color.toLowerCase()"
        :title="color"
        :aria-label="`Color:${color}`"
        role="option"
        tabindex="0"
        @click="handlePreset(color)"
        @keydown.space="handlePreset(color)"
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
        box-shadow: v-bind('activeSwatchColorBG');
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
