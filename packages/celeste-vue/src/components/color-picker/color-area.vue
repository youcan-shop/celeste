<script setup lang="ts">
import { computed, onUnmounted, ref, useTemplateRef } from 'vue';
import { ColorPickerEmits, defineColorModel } from './composable/colorModel';

import { clamp, getAbsolutePosition, getPageXYFromEvent, resolveArrowDirection } from './utils.ts';

const props = defineProps<ColorAreaProps>();
const emit = defineEmits(['change'].concat(ColorPickerEmits));

const pointerRef = ref(0);
const tinyColorRef = defineColorModel(props, emit);

const hsv = computed(() => {
  return tinyColorRef.value.toHsv();
});

const rgb = computed(() => {
  return tinyColorRef.value.toRgb();
});

const hue = computed(() => {
  return props.hue ?? hsv.value.h;
});

const colorAreaBG = computed(() => {
  return `hsl(${hue.value}, 100%, 50%)`;
});

const colorAreaThumbBG = computed(() => {
  const { r, g, b } = rgb.value;

  return `rgb(${r}, ${g}, ${b})`;
});

const pointerTop = computed(() => {
  return `${(-(hsv.value.v * 100) + 1) + 100}%`;
});

const pointerLeft = computed(() => {
  if (hsv.value.v <= 0.01) {
    return `${pointerRef.value * 100}%`;
  }
  return `${hsv.value.s * 100}%`;
});

const containerRef = useTemplateRef('color-area');

function handleChange(e: MouseEvent | TouchEvent, skip = false) {
  e.preventDefault();

  const container = containerRef.value;
  if (!container) {
    return;
  }

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const { x: xOffset, y: yOffset } = getAbsolutePosition(container);
  const { x: pageX, y: pageY } = getPageXYFromEvent(e);

  const left = clamp(pageX - xOffset, 0, containerWidth);
  const top = clamp(pageY - yOffset, 0, containerHeight);

  const saturation = left / containerWidth;
  const brightness = clamp(1 - (top / containerHeight), 0, 1);

  pointerRef.value = saturation;

  let s = Math.round(saturation * 100);
  let v = Math.round(brightness * 100);

  if (s === 1) {
    s = 0.01;
  }
  if (v === 1) {
    v = 0.01;
  }

  onChange({
    h: hue.value,
    s,
    v,
    a: hsv.value.a,
  });
}

function onChange(param: { h: number; s: number; v: number; a: number }) {
  tinyColorRef.value = param;
}

function handleMouseDown() {
  window.addEventListener('mousemove', handleChange);
  window.addEventListener('mouseup', handleChange);
  window.addEventListener('mouseup', handleMouseUp);
}

function handleMouseUp() {
  unbindEventListeners();
}

function unbindEventListeners() {
  window.removeEventListener('mousemove', handleChange);
  window.removeEventListener('mouseup', handleChange);
  window.removeEventListener('mouseup', handleMouseUp);
}

function handleKeyDown(e: KeyboardEvent) {
  e.preventDefault();
  const direction = resolveArrowDirection(e);
  switch (direction) {
    case 'left': {
      const newSaturation = hsv.value.s - 0.01;
      onChange({
        ...hsv.value,
        s: newSaturation >= 0 ? newSaturation : 0,
      });
      break;
    }
    case 'right': {
      const newSaturation = hsv.value.s + 0.01;
      onChange({
        ...hsv.value,
        s: newSaturation > 1 ? 1 : newSaturation,
      });
      break;
    }
    case 'up': {
      const newBrightness = hsv.value.v + 0.01;
      onChange({
        ...hsv.value,
        v: newBrightness > 1 ? 1 : newBrightness,
      });
      break;
    }
    case 'down': {
      const newBrightness = hsv.value.v - 0.01;
      onChange({
        ...hsv.value,
        v: newBrightness < 0 ? 0 : newBrightness,
      });
      break;
    };
  }
}

onUnmounted(() => {
  unbindEventListeners();
});
</script>

<script lang="ts">
export interface ColorAreaProps {
  hue: number;
  modelValue: tinycolor.ColorInput;
}
</script>

<template>
  <div
    ref="color-area"
    class="celeste-color-area"
    role="application"
    aria-label="Saturation and brightness picker"
    @mousedown="handleMouseDown"
    @touchmove.passive="handleChange"
    @touchstart.passive="handleChange"
  >
    <div
      class="celeste-color-thumb"
      :style="{ top: pointerTop, left: pointerLeft, background: colorAreaThumbBG }"
      role="slider"
      tabindex="0"
      aria-valuemin="0"
      aria-valuemax="1"
      aria-label="press arrow to change saturation or brightness"
      aria-valuenow="?"
      :aria-valuetext="`saturation: ${hsv.s.toFixed(0)}%, brightness: ${hsv.v.toFixed(0)}%`"
      @keydown="handleKeyDown"
    />
  </div>
</template>

<style scoped lang="scss">
.celeste-color-area {
  position: relative;
  width: 100%;
  height: 232px;
  border-radius: var(--radius-8);
  background: linear-gradient(to top, black, transparent), linear-gradient(to right, white, transparent),
    v-bind(colorAreaBG);

  .celeste-color-thumb {
    position: absolute;
    width: 14px;
    height: 14px;
    transform: translate(-50%, -50%);
    border: 2px solid var(--color-static-white);
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
