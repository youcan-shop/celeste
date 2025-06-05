<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { computed, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import { ColorPickerEmits } from './composable/use-color-model.ts';
import { useUserPageSelection } from './composable/use-user-select.ts';
import { clamp, getAbsolutePosition, getPageXYFromEvent, resolveArrowDirection } from './utils.ts';

const props = defineProps<ColorAreaProps>();
const emit = defineEmits(['change'].concat(ColorPickerEmits));

const pointerRef = ref(0);

const containerRef = useTemplateRef('color-area');

const { preventPageUserSelect, allowPageUserSelect } = useUserPageSelection();

const color = computed({
  get: () => props.modelValue,
  set: newColor => emit('update:modelValue', newColor),
});

const hue = computed(() => {
  return props.hue ?? color.value.h; ;
});

const colorAreaBG = computed(() => {
  return `hsl(${hue.value}, 100%, 50%)`;
});

const colorAreaThumbBG = computed(() => {
  return tinycolor(color.value).toRgbString();
});

const pointerTop = computed(() => {
  const newColor = tinycolor(color.value).toHsv();
  return `${(-(newColor.v * 100)) + 100}%`;
});

const pointerLeft = computed(() => {
  const newColor = tinycolor(color.value).toHsv();

  if (newColor.v <= 0.01) {
    return `${(pointerRef.value * 100)}%`;
  }

  return `${newColor.s * 100}%`;
});

watch(() => props.hue, (newHue, oldHue) => {
  if (newHue !== oldHue) {
    const currentHsv = color.value;

    onChange({
      h: newHue,
      s: Math.round(currentHsv.s * 100),
      v: Math.round(currentHsv.v * 100),
      a: currentHsv.a,
    });
  }
});

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
    a: color.value.a,
  });
}

function onChange(newColor: tinycolor.ColorFormats.HSVA) {
  const currentHsv = color.value;
  const preserveHue = newColor.v <= 0.1 || newColor.s <= 0.1;

  const finalColor = {
    h: preserveHue ? (currentHsv.h || hue.value) : newColor.h,
    s: newColor.s,
    v: newColor.v,
    a: newColor.a,
  };

  color.value = finalColor;
}

function handleMouseDown() {
  preventPageUserSelect();

  window.addEventListener('mousemove', handleChange);
  window.addEventListener('mouseup', handleChange);
  window.addEventListener('mouseup', handleMouseUp);
}

function handleMouseUp() {
  allowPageUserSelect();
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
      const newSaturation = color.value.s - 0.01;
      onChange({
        ...color.value,
        s: newSaturation >= 0 ? newSaturation : 0,
      });
      break;
    }
    case 'right': {
      const newSaturation = color.value.s + 0.01;
      onChange({
        ...color.value,
        s: newSaturation > 1 ? 1 : newSaturation,
      });
      break;
    }
    case 'up': {
      const newBrightness = color.value.v + 0.01;
      onChange({
        ...color.value,
        v: newBrightness > 1 ? 1 : newBrightness,
      });
      break;
    }
    case 'down': {
      const newBrightness = color.value.v - 0.01;
      onChange({
        ...color.value,
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
  modelValue: tinycolor.ColorFormats.HSVA;
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
      @keydown="handleKeyDown"
    />
  </div>
</template>

<style scoped lang="scss">
.celeste-color-area {
  position: relative;
  width: 240px;
  height: 232px;
  border-radius: var(--radius-8);
  background: linear-gradient(to top, black, transparent), linear-gradient(to right, white, transparent),
    v-bind(colorAreaBG);
}
</style>
