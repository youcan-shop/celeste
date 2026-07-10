<script setup lang="ts">
import type { DateValue, RangeCalendarRootEmits, RangeCalendarRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { DateFormatter, getLocalTimeZone, isEqualDay } from '@internationalized/date';
import clsx from 'clsx';
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

export interface RangeCalendarProps extends RangeCalendarRootProps {
  class?: HTMLAttributes['class'];
  markedDates?: DateValue[];
}

const props = withDefaults(defineProps<RangeCalendarProps>(), {
  weekStartsOn: 1,
  weekdayFormat: 'short',
  fixedWeeks: true,
  numberOfMonths: 2,
});

const emits = defineEmits<RangeCalendarRootEmits>();

const delegatedProps = useDelegatedProps(props, ['class', 'markedDates']);
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const monthFormatter = computed(
  () => new DateFormatter(props.locale ?? 'en-US', { month: 'long', year: 'numeric' }),
);

function formatMonth(date: DateValue): string {
  return monthFormatter.value.format(date.toDate(getLocalTimeZone()));
}

function isMarked(date: DateValue): boolean {
  return props.markedDates?.some(marked => isEqualDay(marked, date)) ?? false;
}

function weekdayLabel(day: string): string {
  return /^[a-z]/i.test(day.trim()) ? day.slice(0, 2) : day;
}
</script>

<template>
  <RangeCalendarRoot
    v-slot="{ weekDays, grid }"
    v-bind="forwarded"
    :class="clsx('celeste-range-calendar', props.class)"
  >
    <div class="celeste-range-calendar-months">
      <div
        v-for="month in grid"
        :key="month.value.toString()"
        class="celeste-range-calendar-month"
      >
        <div class="celeste-range-calendar-header">
          <RangeCalendarPrev as-child>
            <button type="button" class="celeste-range-calendar-nav">
              <i class="i-celeste-arrow-left-s-line" />
            </button>
          </RangeCalendarPrev>
          <span class="celeste-range-calendar-heading">{{ formatMonth(month.value) }}</span>
          <RangeCalendarNext as-child>
            <button type="button" class="celeste-range-calendar-nav">
              <i class="i-celeste-arrow-right-s-line" />
            </button>
          </RangeCalendarNext>
        </div>

        <RangeCalendarGrid class="celeste-range-calendar-grid">
          <RangeCalendarGridHead>
            <RangeCalendarGridRow class="celeste-range-calendar-week">
              <RangeCalendarHeadCell
                v-for="day in weekDays"
                :key="day"
                class="celeste-range-calendar-weekday"
              >
                {{ weekdayLabel(day) }}
              </RangeCalendarHeadCell>
            </RangeCalendarGridRow>
          </RangeCalendarGridHead>
          <RangeCalendarGridBody class="celeste-range-calendar-body">
            <RangeCalendarGridRow
              v-for="(weekDates, index) in month.rows"
              :key="`week-${index}`"
              class="celeste-range-calendar-week"
            >
              <RangeCalendarCell
                v-for="weekDate in weekDates"
                :key="weekDate.toString()"
                :date="weekDate"
                class="celeste-range-calendar-cell"
              >
                <RangeCalendarCellTrigger
                  :day="weekDate"
                  :month="month.value"
                  class="celeste-range-calendar-day"
                  :data-marked="isMarked(weekDate) ? '' : undefined"
                >
                  <span class="celeste-range-calendar-day-number">{{ weekDate.day }}</span>
                </RangeCalendarCellTrigger>
              </RangeCalendarCell>
            </RangeCalendarGridRow>
          </RangeCalendarGridBody>
        </RangeCalendarGrid>
      </div>
    </div>
  </RangeCalendarRoot>
</template>

<style scoped lang="scss">
.celeste-range-calendar {
  display: flex;
  box-sizing: border-box;
  color: var(--color-text-sub-600);
}

.celeste-range-calendar-months {
  display: flex;
  align-items: stretch;
}

.celeste-range-calendar-month {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-8);
  min-width: 0;
  padding: 20px;

  &:not(:last-child) {
    border-inline-end: 1px solid var(--color-stroke-soft-200);
  }
}

.celeste-range-calendar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-6);
  gap: var(--spacing-6);
  border-radius: var(--radius-8);
  background-color: var(--color-bg-weak-50);
}

.celeste-range-calendar-heading {
  flex: 1;
  color: var(--color-text-sub-600);
  font: var(--label-sm);
  text-align: center;
}

.celeste-range-calendar-nav {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 2px;
  transition-property: background-color, color, box-shadow;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: none;
  border-radius: var(--radius-6);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  color: var(--color-icon-sub-600);
  cursor: pointer;

  i {
    width: 20px;
    height: 20px;
  }

  &:dir(rtl) i {
    transform: scaleX(-1);
  }

  &:hover {
    color: var(--color-icon-strong-950);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-buttons-important-focus);
  }

  &[data-disabled] {
    background-color: transparent;
    box-shadow: none;
    color: var(--color-icon-disabled-300);
    cursor: default;
    pointer-events: none;
  }
}

.celeste-range-calendar-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  width: 100%;
  border-collapse: collapse;
}

.celeste-range-calendar-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.celeste-range-calendar-week {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  align-items: center;
}

.celeste-range-calendar-weekday {
  padding-block: var(--spacing-10);
  color: var(--color-text-soft-400);
  font: var(--label-sm);
  text-align: center;
  text-transform: uppercase;
}

.celeste-range-calendar-cell {
  position: relative;
  min-width: 0;
}

.celeste-range-calendar-cell:has(.celeste-range-calendar-day[data-selected]),
.celeste-range-calendar-cell:has(.celeste-range-calendar-day[data-highlighted]) {
  background-color: var(--color-primary-alpha-10);
}

.celeste-range-calendar-cell:has(.celeste-range-calendar-day[data-selection-start]),
.celeste-range-calendar-cell:has(.celeste-range-calendar-day[data-highlighted-start]),
.celeste-range-calendar-week > .celeste-range-calendar-cell:first-child:has(.celeste-range-calendar-day[data-selected]),
.celeste-range-calendar-week
  > .celeste-range-calendar-cell:first-child:has(.celeste-range-calendar-day[data-highlighted]) {
  border-start-start-radius: var(--radius-8);
  border-end-start-radius: var(--radius-8);
}

.celeste-range-calendar-cell:has(.celeste-range-calendar-day[data-selection-end]),
.celeste-range-calendar-cell:has(.celeste-range-calendar-day[data-highlighted-end]),
.celeste-range-calendar-week > .celeste-range-calendar-cell:last-child:has(.celeste-range-calendar-day[data-selected]),
.celeste-range-calendar-week
  > .celeste-range-calendar-cell:last-child:has(.celeste-range-calendar-day[data-highlighted]) {
  border-start-end-radius: var(--radius-8);
  border-end-end-radius: var(--radius-8);
}

.celeste-range-calendar-day {
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  width: 40px;
  max-width: 100%;
  margin-inline: auto;
  padding-block: var(--spacing-10);
  transition-property: background-color, color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border-radius: var(--radius-8);
  background-color: transparent;
  color: var(--color-text-sub-600);
  font: var(--label-sm);
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: var(--color-bg-weak-50);
    color: var(--color-text-strong-950);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-buttons-important-focus);
  }

  &[data-outside-view],
  &[data-outside-visible-view] {
    color: var(--color-text-disabled-300);

    &:hover {
      background-color: transparent;
      color: var(--color-text-disabled-300);
    }
  }

  &[data-disabled] {
    color: var(--color-text-disabled-300);
    cursor: default;
    pointer-events: none;
  }

  &[data-unavailable] {
    color: var(--color-text-disabled-300);
    text-decoration: line-through;
    pointer-events: none;
  }

  &[data-selected],
  &[data-highlighted] {
    color: var(--color-primary-base);

    &:hover {
      background-color: transparent;
      color: var(--color-primary-base);
    }
  }

  &[data-selection-start],
  &[data-selection-end] {
    background-color: var(--color-primary-base);
    color: var(--color-text-white-0);

    &:hover {
      background-color: var(--color-primary-base);
      color: var(--color-text-white-0);
    }
  }
}

.celeste-range-calendar-day-number {
  position: relative;
}

.celeste-range-calendar-day[data-today]::after,
.celeste-range-calendar-day[data-marked]::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  width: 3px;
  height: 3px;
  transform: translateX(-50%);
  border-radius: var(--radius-full);
  background-color: var(--color-primary-base);
}

.celeste-range-calendar-day[data-selection-start][data-today]::after,
.celeste-range-calendar-day[data-selection-end][data-today]::after,
.celeste-range-calendar-day[data-selection-start][data-marked]::after,
.celeste-range-calendar-day[data-selection-end][data-marked]::after {
  background-color: var(--color-text-white-0);
}
</style>
