<script setup lang="ts">
import { getAbsolutePosition, getPageXYFromEvent, resolveArrowDirection } from '@/utils/color.ts';
import { computed, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import { useUserPageSelection } from './composable/use-user-select.ts';

const hue = defineModel({
  default: 0,
});

const pullDirection = ref<'right' | 'left'>();

const containerRef = useTemplateRef('slider-track');

const { preventPageUserSelect, allowPageUserSelect } = useUserPageSelection();

watch(hue, (newHue: number, oldHue: number) => {
  if (newHue !== 0 && newHue - oldHue > 0)
    pullDirection.value = 'right';
  if (newHue !== 0 && newHue - oldHue < 0)
    pullDirection.value = 'left';
});

const pointerLeft = computed(() => {
  if (hue.value === 0 && pullDirection.value === 'right')
    return '100%';

  return `${(hue.value * 100) / 360}%`;
},
);

const trackThumbBg = computed(() => {
  return `hsl(${hue.value}, 100%, 50%)`;
});

function handleChange(e: MouseEvent | TouchEvent, skip?: boolean) {
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

  let h;
  let percent;

  if (left < 0) {
    h = 0;
  }
  else if (left > containerWidth) {
    h = 360;
  }
  else {
    percent = left * 100 / containerWidth;
    h = Math.round(360 * percent / 100);
  }
  if (hue.value !== h) {
    emitChange(h);
  }
}

function emitChange(h: number) {
  hue.value = h;
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

function handleKeyDown(e: KeyboardEvent) {
  e.preventDefault();
  const keyDirection = resolveArrowDirection(e);
  const currentValue = hue.value;
  let newValue;

  switch (keyDirection) {
    case 'left': {
      newValue = currentValue - 1 < 0 ? 0 : Math.floor(currentValue - 1);
      break;
    }
    case 'right': {
      newValue = currentValue + 1 > 360 ? 360 : Math.ceil(currentValue + 1);
      break;
    }
  }
  if (typeof newValue !== 'undefined') {
    emitChange(newValue);
  }
}

onUnmounted(() => {
  unbindEventListeners();
});
</script>

<template>
  <div class="celeste-color-slider">
    <div
      ref="slider-track"
      class="slider-track"
      role="slider"
      :aria-valuenow="hue"
      aria-valuemin="0"
      aria-valuemax="360"
      aria-label="Hue"
      tabindex="0"
      @mousedown="handleMouseDown"
      @touchmove.passive="handleChange"
      @touchstart.passive="handleChange"
      @keydown="handleKeyDown"
    >
      <div
        class="celeste-color-thumb"
        :style="{ left: pointerLeft, background: trackThumbBg }"
        role="presentation"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.celeste-color-slider {
  .slider-track {
    background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
  }
}
</style>
