<script setup lang="ts">
import { useUserPageSelection } from '@/components/color-picker/composable/use-user-select';
import { getAbsolutePosition, getPageXYFromEvent, resolveArrowDirection } from '@/components/color-picker/utils';
import tinycolor from 'tinycolor2';
import { computed, type HTMLAttributes, onUnmounted, useTemplateRef } from 'vue';

const props = defineProps<AlphaSliderProps>();

const { preventPageUserSelect, allowPageUserSelect } = useUserPageSelection();

const alpha = defineModel({
  default: 1,
});

const tinyColorRef = computed(() => tinycolor(props.color));

const containerRef = useTemplateRef('slider-track');

const alphaSliderBG = computed(() => {
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

const trackThumbBG = computed(() => {
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
    alpha.value = a;
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
  e.preventDefault();
  const keyDirection = resolveArrowDirection(e);
  const currentValue = alpha.value;
  let newValue;
  switch (keyDirection) {
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
    alpha.value = newValue;
  }
}

onUnmounted(() => {
  unbindEventListeners();
});
</script>

<script lang="ts">
export interface AlphaSliderProps {
  class?: HTMLAttributes['class'];
  modelValue: number;
  color: tinycolor.ColorFormats.HSVA;
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
      :style="{ background: alphaSliderBG }"
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
      <div class="celeste-color-thumb" :style="{ left: `${alpha * 100}%`, background: trackThumbBG }" />
    </div>
  </div>
</template>
