<script setup lang="ts">
import type tinycolor from 'tinycolor2';
import { computed, onUnmounted, useTemplateRef } from 'vue';
import { useUserPageSelection } from '@/components/color-picker/composable/use-user-select';
import { getAbsolutePosition, getPageXYFromEvent, resolveArrowDirection } from '@/utils/color';
import { defineColorModel } from './composable/use-color-model';

const props = defineProps<AlphaSliderProps>();
const emit = defineEmits<AlphaSliderEmits>();

const tinyColorRef = defineColorModel(props, emit);

const { preventPageUserSelect, allowPageUserSelect } = useUserPageSelection();

const containerRef = useTemplateRef('slider-track');

const alpha = computed(() => tinyColorRef.value.getAlpha());
const alphaSliderBg = computed(() => {
  const { r, g, b } = tinyColorRef.value.toRgb();

  return `
    linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0), rgba(${r}, ${g}, ${b}, 1)),
      repeating-conic-gradient(
        #ffffff 0deg,
        #ffffff 90deg,
        rgba(0, 0, 0, 0.3) 90deg,
        rgba(0, 0, 0, 0.3) 180deg
      ) 0% -25% / 6px 6px
  `;
});

const trackThumbBg = computed(() => {
  const { r, g, b, a } = tinyColorRef.value.toRgb();
  const rgbaString = [r, g, b, a].join(',');

  return `rgba(${rgbaString})`;
});

function handleChange(e: MouseEvent | TouchEvent, skip = false) {
  if (!skip) {
    e.preventDefault();
  }

  const container = containerRef.value;
  if (!container) {
    return;
  }
  const containerWidth = container.clientWidth;

  const { x: xOffset } = getAbsolutePosition(container);
  const { x: pageX } = getPageXYFromEvent(e);
  const left = pageX - xOffset;

  let a;
  if (left < 0) {
    a = 0;
  }
  else if (left > containerWidth) {
    a = 1;
  }
  else {
    a = Math.round(left * 100 / containerWidth) / 100;
  }

  if (alpha.value !== a) {
    tinyColorRef.value = tinyColorRef.value.setAlpha(a).clone();
  }
}

function handleMouseDown(e: MouseEvent) {
  handleChange(e, true);
  preventPageUserSelect();

  window.addEventListener('mousemove', handleChange);
  window.addEventListener('mouseup', handleMouseUp);
}

function handleMouseUp() {
  allowPageUserSelect();
  unbindEventListeners();
}

function unbindEventListeners() {
  window.removeEventListener('mousemove', handleChange);
  window.removeEventListener('mouseup', handleMouseUp);
}

function handleKeydown(e: KeyboardEvent) {
  const direction = resolveArrowDirection(e);

  if (!direction) {
    return;
  }

  e.preventDefault();

  const currentValue = alpha.value;
  let newValue;
  switch (direction) {
    case 'left': {
      newValue = currentValue - 0.1 < 0 ? 0 : currentValue - 0.1;
      break;
    }
    case 'right': {
      newValue = currentValue + 0.1 > 1 ? 1 : currentValue + 0.1;
      break;
    }
  }
  if (typeof newValue !== 'undefined') {
    tinyColorRef.value = tinyColorRef.value.setAlpha(newValue).clone();
  }
}

onUnmounted(() => {
  unbindEventListeners();
});
</script>

<script lang="ts">
export interface AlphaSliderProps {
  modelValue: tinycolor.Instance;
}

export interface AlphaSliderEmits {
  'update:modelValue': [value: string];
}
</script>

<template>
  <div class="celeste-color-slider">
    <div
      ref="slider-track"
      class="slider-track"
      :style="{ background: alphaSliderBg }"
      role="slider"
      aria-label="Transparency"
      aria-valuemax="1"
      aria-valuemin="0"
      :aria-valuenow="alpha.toFixed(1)"
      tabindex="0"
      @mousedown="handleMouseDown"
      @touchmove.passive="handleChange"
      @touchstart.passive="handleChange"
      @keydown="handleKeydown"
    >
      <div class="celeste-color-thumb" :style="{ left: `${alpha * 100}%`, background: trackThumbBg }" />
    </div>
  </div>
</template>
