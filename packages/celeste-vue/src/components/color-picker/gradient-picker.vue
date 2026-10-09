<script setup lang="ts">
import type { Gradient, GradientStop, GradientType } from '@/utils/gradient';
import tinycolor from 'tinycolor2';
import { computed, ref } from 'vue';
import { parseGradient, stringifyGradient } from '@/utils/gradient';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { SegmentedControl, SegmentedControlItem } from '../segmented-control';
import { TextInput } from '../text-input';
import ColorPicker from './color-picker.vue';

export interface GradientPickerProps {
  modelValue?: string;
  label?: string;
  linearLabel?: string;
  radialLabel?: string;
  angleLabel?: string;
  positionLabel?: string;
  removeStopLabel?: string;
  clearLabel?: string;
  colorSwatchLabel?: string;
}

export interface GradientPickerEmits {
  'update:modelValue': [value: string];
}

const props = withDefaults(defineProps<GradientPickerProps>(), {
  modelValue: '',
  label: 'Pick gradient',
  linearLabel: 'Linear',
  radialLabel: 'Radial',
  angleLabel: 'Angle',
  positionLabel: 'Position',
  removeStopLabel: 'Remove stop',
  clearLabel: 'Clear',
  colorSwatchLabel: 'Recommended Colors',
});

const emit = defineEmits<GradientPickerEmits>();

const DEFAULT: Gradient = { type: 'linear', angle: 180, stops: [{ color: '#FFFFFF', position: 0 }, { color: '#000000', position: 100 }] };

const gradient = computed(() => parseGradient(props.modelValue) ?? DEFAULT);
const css = computed(() => stringifyGradient(gradient.value));
const bar = computed(() => stringifyGradient({ ...gradient.value, type: 'linear', angle: 90 }));
const selected = ref(0);
const stop = computed(() => gradient.value.stops[Math.min(selected.value, gradient.value.stops.length - 1)]);
const summary = computed(() => gradient.value.type === 'linear' ? `${props.linearLabel} · ${gradient.value.angle}°` : props.radialLabel);
const track = ref<HTMLElement>();
const dial = ref<HTMLElement>();

const clamp = (value: number, min: number, max: number) => Math.round(Math.min(max, Math.max(min, value)));

function update(changes: Partial<Gradient>) {
  emit('update:modelValue', stringifyGradient({ ...gradient.value, ...changes }));
}

function updateStop(index: number, changes: Partial<GradientStop>) {
  update({ stops: gradient.value.stops.map((item, i) => (i === index ? { ...item, ...changes } : item)) });
}

function removeStop(index: number) {
  if (gradient.value.stops.length > 2) {
    update({ stops: gradient.value.stops.filter((_, i) => i !== index) });
    selected.value = Math.max(0, index - 1);
  }
}

function colorAt(position: number) {
  const sorted = [...gradient.value.stops].sort((a, b) => a.position - b.position);
  const after = sorted.find(item => item.position >= position) ?? sorted.at(-1)!;
  const before = [...sorted].reverse().find(item => item.position <= position) ?? sorted[0];
  const ratio = after.position === before.position ? 0 : ((position - before.position) / (after.position - before.position)) * 100;

  return tinycolor.mix(before.color, after.color, ratio).toHexString().toUpperCase();
}

function positionFrom(event: PointerEvent) {
  const rect = track.value!.getBoundingClientRect();

  return clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
}

function addStop(event: PointerEvent) {
  const position = positionFrom(event);

  update({ stops: [...gradient.value.stops, { color: colorAt(position), position }] });
  selected.value = gradient.value.stops.length;
}

function drag(index: number, event: PointerEvent) {
  selected.value = index;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);

  const move = (moved: PointerEvent) => updateStop(index, { position: positionFrom(moved) });
  const up = () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
  };

  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
}

function nudge(index: number, event: KeyboardEvent) {
  const step = event.shiftKey ? 10 : 1;
  const delta = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step }[event.key];

  if (delta) {
    event.preventDefault();
    updateStop(index, { position: clamp(gradient.value.stops[index].position + delta, 0, 100) });
  }
  else if (event.key === 'Delete' || event.key === 'Backspace') {
    event.preventDefault();
    removeStop(index);
  }
}

function turn(event: PointerEvent) {
  const rect = dial.value!.getBoundingClientRect();
  const angle = (Math.atan2(event.clientX - rect.left - rect.width / 2, rect.top + rect.height / 2 - event.clientY) * 180) / Math.PI;

  update({ angle: (Math.round(angle) + 360) % 360 });
}

function startTurn(event: PointerEvent) {
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  turn(event);

  const up = () => {
    window.removeEventListener('pointermove', turn);
    window.removeEventListener('pointerup', up);
  };

  window.addEventListener('pointermove', turn);
  window.addEventListener('pointerup', up);
}
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button
        class="celeste-gradient-picker-trigger"
        intent="neutral"
        variant="stroke"
      >
        <span
          class="celeste-selected-gradient"
          :data-empty="!modelValue"
          :style="modelValue ? { background: css } : undefined"
        />
        <span class="celeste-gradient-summary">{{ modelValue ? summary : label }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent :dismissible="false">
      <div class="celeste-gradient-picker">
        <SegmentedControl :model-value="gradient.type" @update:model-value="type => type && update({ type: type as GradientType })">
          <SegmentedControlItem value="linear">
            {{ linearLabel }}
          </SegmentedControlItem>
          <SegmentedControlItem value="radial">
            {{ radialLabel }}
          </SegmentedControlItem>
        </SegmentedControl>

        <div class="celeste-gradient-preview" :style="{ background: css }" />

        <div
          ref="track"
          class="celeste-gradient-track"
          :style="{ background: bar }"
          @pointerdown.self="addStop"
        >
          <button
            v-for="(item, index) in gradient.stops"
            :key="index"
            type="button"
            class="celeste-gradient-handle"
            :style="{ left: `${item.position}%`, background: item.color }"
            :data-active="item === stop"
            :aria-label="`${item.color} ${item.position}%`"
            @pointerdown.stop="drag(index, $event)"
            @keydown="nudge(index, $event)"
            @focus="selected = index"
          />
        </div>

        <div v-if="stop" class="celeste-gradient-stop">
          <ColorPicker
            :model-value="stop.color"
            :label="stop.color"
            :color-swatch-label="colorSwatchLabel"
            @update:model-value="color => updateStop(gradient.stops.indexOf(stop!), { color })"
          />
          <TextInput
            :model-value="String(stop.position)"
            inputmode="numeric"
            size="md"
            :aria-label="positionLabel"
            class="celeste-gradient-number"
            @update:model-value="value => updateStop(gradient.stops.indexOf(stop!), { position: clamp(Number(value) || 0, 0, 100) })"
          >
            <template #trailingNode>
              %
            </template>
          </TextInput>
          <Button
            v-if="gradient.stops.length > 2"
            intent="neutral"
            variant="ghost"
            size="xxs"
            :aria-label="removeStopLabel"
            @click="removeStop(gradient.stops.indexOf(stop!))"
          >
            <i class="i-celeste-delete-bin-line" />
          </Button>
        </div>

        <div v-if="gradient.type === 'linear'" class="celeste-gradient-angle">
          <span class="celeste-gradient-angle-label">{{ angleLabel }}</span>
          <div
            ref="dial"
            class="celeste-gradient-dial"
            @pointerdown="startTurn"
          >
            <span class="celeste-gradient-dial-hand" :style="{ rotate: `${gradient.angle}deg` }" />
          </div>
          <TextInput
            :model-value="String(gradient.angle)"
            inputmode="numeric"
            size="md"
            :aria-label="angleLabel"
            class="celeste-gradient-number"
            @update:model-value="value => update({ angle: clamp(Number(value) || 0, 0, 360) })"
          >
            <template #trailingNode>
              °
            </template>
          </TextInput>
        </div>

        <Button
          v-if="modelValue"
          intent="neutral"
          variant="ghost"
          size="xs"
          class="celeste-gradient-clear"
          @click="emit('update:modelValue', '')"
        >
          {{ clearLabel }}
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style scoped lang="scss">
.celeste-gradient-picker-trigger {
  gap: var(--spacing-12);
  min-width: 0;

  .celeste-selected-gradient {
    display: block;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--radius-4);

    &[data-empty='true'] {
      border-style: dashed;
      border-color: var(--color-stroke-sub-300);
    }
  }

  .celeste-gradient-summary {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.celeste-gradient-picker {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 272px;
  padding: var(--spacing-16);
  gap: var(--spacing-12);

  & > * {
    min-width: 0;
  }

  .celeste-gradient-preview {
    height: 72px;
    border: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--radius-8);
  }

  .celeste-gradient-track {
    position: relative;
    height: 12px;
    margin-inline: var(--spacing-8);
    border-radius: var(--radius-full);
    cursor: copy;
  }

  .celeste-gradient-handle {
    position: absolute;
    top: 50%;
    width: 18px;
    height: 18px;
    padding: 0;
    transform: translate(-50%, -50%);
    border: 2px solid var(--color-static-white);
    border-radius: var(--radius-full);
    outline: none;
    box-shadow:
      var(--shadow-regular-xs),
      0 0 0 1px var(--color-stroke-soft-200);
    cursor: grab;
    touch-action: none;

    &[data-active='true'],
    &:focus-visible {
      box-shadow: 0 0 0 2px var(--color-primary-base);
    }
  }

  .celeste-gradient-stop,
  .celeste-gradient-angle {
    display: flex;
    align-items: center;
    gap: var(--spacing-8);
  }

  .celeste-gradient-stop > :first-child {
    flex: 1;
    min-width: 0;

    :deep(.celeste-picker-trigger) {
      justify-content: start;
      width: 100%;
    }
  }

  .celeste-gradient-number {
    flex-shrink: 0;
    width: 72px;
  }

  .celeste-gradient-angle-label {
    flex: 1;
    color: var(--color-text-sub-600);
    font: var(--label-sm);
  }

  .celeste-gradient-dial {
    position: relative;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--radius-full);
    cursor: grab;
    touch-action: none;
  }

  .celeste-gradient-dial-hand {
    position: absolute;
    top: 5px;
    left: calc(50% - 1px);
    width: 2px;
    height: calc(50% - 5px);
    transform-origin: bottom center;
    border-radius: var(--radius-full);
    background: var(--color-text-strong-950);
  }

  .celeste-gradient-clear {
    align-self: flex-start;
  }
}
</style>
