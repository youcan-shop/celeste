<script setup lang="ts">
import type { Gradient, GradientType } from '@/utils/gradient';
import { computed } from 'vue';
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
  addStopLabel?: string;
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
  addStopLabel: 'Add stop',
  clearLabel: 'Clear',
  colorSwatchLabel: 'Recommended Colors',
});

const emit = defineEmits<GradientPickerEmits>();

const DEFAULT: Gradient = { type: 'linear', angle: 180, stops: [{ color: '#FFFFFF', position: 0 }, { color: '#000000', position: 100 }] };

const gradient = computed(() => parseGradient(props.modelValue) ?? DEFAULT);
const css = computed(() => stringifyGradient(gradient.value));

function update(changes: Partial<Gradient>) {
  emit('update:modelValue', stringifyGradient({ ...gradient.value, ...changes }));
}

function updateStop(index: number, changes: Partial<Gradient['stops'][number]>) {
  update({ stops: gradient.value.stops.map((stop, i) => (i === index ? { ...stop, ...changes } : stop)) });
}

function addStop() {
  const [first, last] = [gradient.value.stops[0], gradient.value.stops.at(-1)!];

  update({ stops: [...gradient.value.stops, { color: last.color, position: Math.round((first.position + last.position) / 2) }] });
}

const clamp = (value: string, min: number, max: number) => Math.min(max, Math.max(min, Number(value) || 0));
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button
        class="celeste-gradient-picker-trigger"
        intent="neutral"
        variant="stroke"
      >
        <span class="celeste-selected-gradient" :style="{ background: modelValue ? css : undefined }" />
        <span class="celeste-gradient-label">{{ modelValue || label }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent :dismissible="false">
      <div class="celeste-gradient-picker">
        <SegmentedControl :model-value="gradient.type" @update:model-value="type => update({ type: type as GradientType })">
          <SegmentedControlItem value="linear">
            {{ linearLabel }}
          </SegmentedControlItem>
          <SegmentedControlItem value="radial">
            {{ radialLabel }}
          </SegmentedControlItem>
        </SegmentedControl>
        <div class="celeste-gradient-preview" :style="{ background: css }" />
        <label v-if="gradient.type === 'linear'" class="celeste-gradient-angle">
          <span>{{ angleLabel }}</span>
          <TextInput
            :model-value="String(gradient.angle)"
            inputmode="numeric"
            size="xs"
            @update:model-value="value => update({ angle: clamp(String(value), 0, 360) })"
          />
        </label>
        <ul class="celeste-gradient-stops">
          <li
            v-for="(stop, index) in gradient.stops"
            :key="index"
            class="celeste-gradient-stop"
          >
            <ColorPicker
              :model-value="stop.color"
              :label="stop.color"
              :color-swatch-label="colorSwatchLabel"
              @update:model-value="color => updateStop(index, { color })"
            />
            <TextInput
              :model-value="String(stop.position)"
              inputmode="numeric"
              size="xs"
              class="celeste-gradient-position"
              @update:model-value="value => updateStop(index, { position: clamp(String(value), 0, 100) })"
            />
            <Button
              v-if="gradient.stops.length > 2"
              intent="neutral"
              variant="ghost"
              size="xxs"
              :aria-label="clearLabel"
              @click="update({ stops: gradient.stops.filter((_, i) => i !== index) })"
            >
              <i class="i-celeste-close-line" />
            </Button>
          </li>
        </ul>
        <div class="celeste-gradient-actions">
          <Button
            intent="neutral"
            variant="ghost"
            size="xs"
            @click="addStop"
          >
            <i class="i-celeste-add-line" />
            {{ addStopLabel }}
          </Button>
          <Button
            v-if="modelValue"
            intent="neutral"
            variant="ghost"
            size="xs"
            @click="emit('update:modelValue', '')"
          >
            {{ clearLabel }}
          </Button>
        </div>
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
    border: 1px dashed var(--color-stroke-sub-300);
    border-radius: var(--radius-4);
  }

  .celeste-gradient-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.celeste-gradient-picker {
  display: grid;
  box-sizing: border-box;
  width: 272px;
  padding: var(--spacing-16);
  gap: var(--spacing-12);

  .celeste-gradient-preview {
    height: 32px;
    border: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--radius-8);
  }

  .celeste-gradient-angle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-text-sub-600);
    font: var(--label-sm);
    gap: var(--spacing-8);
  }

  .celeste-gradient-stops {
    display: grid;
    margin: 0;
    padding: 0;
    gap: var(--spacing-8);
    list-style: none;
  }

  .celeste-gradient-stop {
    display: flex;
    align-items: center;
    gap: var(--spacing-8);

    & > :first-child {
      flex: 1;
      min-width: 0;
    }
  }

  .celeste-gradient-position {
    width: 72px;
  }

  .celeste-gradient-actions {
    display: flex;
    justify-content: space-between;
  }
}
</style>
