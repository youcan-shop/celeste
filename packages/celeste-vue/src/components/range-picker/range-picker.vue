<script setup lang="ts">
import type { DateRange } from 'reka-ui';
import type { RangeCalendarProps } from '@/components/range-calendar/range-calendar.vue';
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
import clsx from 'clsx';
import { computed, nextTick, ref, watch } from 'vue';
import Button from '@/components/button/button.vue';
import RangeCalendar from '@/components/range-calendar/range-calendar.vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

export interface RangePickerPreset {
  label: string;
  value: DateRange | (() => DateRange);
}

export interface RangePickerProps extends Omit<RangeCalendarProps, 'modelValue'> {
  showPresets?: boolean;
  footer?: boolean;
  presets?: RangePickerPreset[];
  rangeLabel?: string;
  placeholderLabel?: string;
  cancelLabel?: string;
  applyLabel?: string;
}

const props = withDefaults(defineProps<RangePickerProps>(), {
  showPresets: true,
  footer: true,
  rangeLabel: 'Range:',
  placeholderLabel: 'Select a range',
  cancelLabel: 'Cancel',
  applyLabel: 'Apply',
});

const emits = defineEmits<{
  apply: [value: DateRange];
  cancel: [];
}>();

function defaultPresets(): RangePickerPreset[] {
  const now = today(getLocalTimeZone());
  return [
    { label: 'Today', value: { start: now, end: now } },
    { label: 'Last 7 days', value: { start: now.subtract({ days: 6 }), end: now } },
    { label: 'Last 30 days', value: { start: now.subtract({ days: 29 }), end: now } },
    { label: 'Last 3 months', value: { start: now.subtract({ months: 3 }), end: now } },
    { label: 'Last 12 months', value: { start: now.subtract({ months: 12 }), end: now } },
    { label: 'Month to date', value: { start: now.set({ day: 1 }), end: now } },
    { label: 'Year to date', value: { start: now.set({ month: 1, day: 1 }), end: now } },
    { label: 'All time', value: { start: undefined, end: undefined } },
  ];
}

const modelValue = defineModel<DateRange>({
  default: () => ({ start: undefined, end: undefined }),
});

const presetList = computed(() => props.presets ?? defaultPresets());
const activePreset = ref<string | null>(null);

const calendarProps = useDelegatedProps(props, [
  'class',
  'showPresets',
  'footer',
  'presets',
  'rangeLabel',
  'placeholderLabel',
  'cancelLabel',
  'applyLabel',
]);

let settingFromPreset = false;

function resolvePreset(preset: RangePickerPreset): DateRange {
  return typeof preset.value === 'function' ? preset.value() : preset.value;
}

function selectPreset(preset: RangePickerPreset): void {
  settingFromPreset = true;
  modelValue.value = resolvePreset(preset);
  activePreset.value = preset.label;
  nextTick(() => {
    settingFromPreset = false;
  });
}

watch(modelValue, () => {
  if (!settingFromPreset)
    activePreset.value = null;
}, { deep: true });

const rangeFormatter = computed(
  () => new DateFormatter(props.locale ?? 'en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
);

const formattedRange = computed(() => {
  const value = modelValue.value;
  if (!value?.start || !value?.end)
    return '';

  const tz = getLocalTimeZone();
  return `${rangeFormatter.value.format(value.start.toDate(tz))} - ${rangeFormatter.value.format(value.end.toDate(tz))}`;
});
</script>

<template>
  <div :class="clsx('celeste-range-picker', props.class)">
    <aside v-if="showPresets" class="celeste-range-picker-presets">
      <button
        v-for="preset in presetList"
        :key="preset.label"
        type="button"
        class="celeste-range-picker-preset"
        :data-active="activePreset === preset.label ? '' : undefined"
        @click="selectPreset(preset)"
      >
        {{ preset.label }}
      </button>
    </aside>

    <div class="celeste-range-picker-content">
      <div class="celeste-range-picker-calendar">
        <RangeCalendar v-model="modelValue" v-bind="calendarProps" />
      </div>

      <div v-if="footer" class="celeste-range-picker-footer">
        <p class="celeste-range-picker-hint">
          <template v-if="formattedRange">
            <span class="celeste-range-picker-hint-label">{{ rangeLabel }}&nbsp;</span>
            <span class="celeste-range-picker-hint-value">{{ formattedRange }}</span>
          </template>
          <span v-else class="celeste-range-picker-hint-label">{{ placeholderLabel }}</span>
        </p>
        <Button
          variant="stroke"
          intent="neutral"
          @click="emits('cancel')"
        >
          {{ cancelLabel }}
        </Button>
        <Button
          variant="fill"
          intent="primary"
          @click="emits('apply', modelValue)"
        >
          {{ applyLabel }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.celeste-range-picker {
  display: flex;
  box-sizing: border-box;
  align-items: stretch;
  max-width: 100%;
  overflow: hidden;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-20);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
}

.celeste-range-picker-presets {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 200px;
  padding: 20px var(--spacing-16) var(--spacing-2);
  gap: var(--spacing-8);
  border-inline-end: 1px solid var(--color-stroke-soft-200);
}

.celeste-range-picker-preset {
  display: flex;
  align-items: center;
  padding: var(--spacing-8) var(--spacing-8) var(--spacing-8) var(--spacing-12);
  transition-property: background-color, color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: none;
  border-radius: var(--radius-8);
  background-color: var(--color-bg-white-0);
  color: var(--color-text-sub-600);
  font: var(--label-sm);
  text-align: start;
  cursor: pointer;

  &:hover {
    background-color: var(--color-bg-weak-50);
    color: var(--color-text-strong-950);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-buttons-important-focus);
  }

  &[data-active] {
    background-color: var(--color-bg-weak-50);
    color: var(--color-text-strong-950);
  }
}

.celeste-range-picker-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.celeste-range-picker-calendar {
  border-block-end: 1px solid var(--color-stroke-soft-200);
}

.celeste-range-picker-footer {
  display: flex;
  align-items: center;
  padding: var(--spacing-16) var(--spacing-16) var(--spacing-16) 24px;
  gap: var(--spacing-16);
}

.celeste-range-picker-hint {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: var(--color-text-sub-600);
  font: var(--paragraph-sm);
}

.celeste-range-picker-hint-value {
  color: var(--color-text-strong-950);
  font: var(--label-sm);
}
</style>
