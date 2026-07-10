<script setup lang="ts">
import type { CalendarRootEmits, CalendarRootProps, DateValue } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { isEqualDay } from '@internationalized/date';
import clsx from 'clsx';
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
  useForwardPropsEmits,
} from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';

export interface CalendarProps extends CalendarRootProps {
  class?: HTMLAttributes['class'];
  markedDates?: DateValue[];
}

const props = withDefaults(defineProps<CalendarProps>(), {
  weekStartsOn: 1,
  weekdayFormat: 'short',
  fixedWeeks: true,
});

const emits = defineEmits<CalendarRootEmits>();

const delegatedProps = useDelegatedProps(props, ['class', 'markedDates']);
const forwarded = useForwardPropsEmits(delegatedProps, emits);

function isMarked(date: DateValue): boolean {
  return props.markedDates?.some(marked => isEqualDay(marked, date)) ?? false;
}

function weekdayLabel(day: string): string {
  return /^[a-z]/i.test(day.trim()) ? day.slice(0, 2) : day;
}
</script>

<template>
  <CalendarRoot
    v-slot="{ weekDays, grid }"
    v-bind="forwarded"
    :class="clsx('celeste-calendar', props.class)"
  >
    <div class="celeste-calendar-header">
      <CalendarPrev as-child>
        <button type="button" class="celeste-calendar-nav">
          <i class="i-celeste-arrow-left-s-line" />
        </button>
      </CalendarPrev>
      <CalendarHeading class="celeste-calendar-heading" />
      <CalendarNext as-child>
        <button type="button" class="celeste-calendar-nav">
          <i class="i-celeste-arrow-right-s-line" />
        </button>
      </CalendarNext>
    </div>

    <div class="celeste-calendar-months">
      <CalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="celeste-calendar-grid"
      >
        <CalendarGridHead>
          <CalendarGridRow class="celeste-calendar-week">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="celeste-calendar-weekday"
            >
              {{ weekdayLabel(day) }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody class="celeste-calendar-body">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`week-${index}`"
            class="celeste-calendar-week"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              class="celeste-calendar-cell"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="celeste-calendar-day"
                :data-marked="isMarked(weekDate) ? '' : undefined"
              >
                <span class="celeste-calendar-day-number">{{ weekDate.day }}</span>
              </CalendarCellTrigger>
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>

<style scoped lang="scss">
.celeste-calendar {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  color: var(--color-text-sub-600);
  gap: var(--spacing-8);
}

.celeste-calendar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-6);
  gap: var(--spacing-6);
  border-radius: var(--radius-8);
  background-color: var(--color-bg-weak-50);
}

.celeste-calendar-heading {
  flex: 1;
  color: var(--color-text-sub-600);
  font: var(--label-sm);
  text-align: center;
}

.celeste-calendar-nav {
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

.celeste-calendar-months {
  display: flex;
  gap: var(--spacing-16);
}

.celeste-calendar-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  width: 100%;
  border-collapse: collapse;
}

.celeste-calendar-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.celeste-calendar-week {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.celeste-calendar-weekday {
  flex: 1;
  padding-block: var(--spacing-10);
  color: var(--color-text-soft-400);
  font: var(--label-sm);
  text-align: center;
  text-transform: uppercase;
}

.celeste-calendar-cell {
  position: relative;
  flex: 1;
  min-width: 0;
}

.celeste-calendar-day {
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-block: var(--spacing-10);
  transition-property: background-color, color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border-radius: var(--radius-8);
  background-color: var(--color-bg-white-0);
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
      background-color: var(--color-bg-white-0);
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

  &[data-selected] {
    background-color: var(--color-primary-base);
    color: var(--color-text-white-0);

    &:hover {
      background-color: var(--color-primary-base);
      color: var(--color-text-white-0);
    }
  }
}

.celeste-calendar-day-number {
  position: relative;
}

.celeste-calendar-day[data-today]::after,
.celeste-calendar-day[data-marked]::after {
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

.celeste-calendar-day[data-selected][data-today]::after,
.celeste-calendar-day[data-selected][data-marked]::after {
  background-color: var(--color-text-white-0);
}
</style>
