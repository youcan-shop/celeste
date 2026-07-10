<script setup lang="ts">
import type { DateValue } from 'reka-ui';
import type { CalendarProps } from '@/components/calendar/calendar.vue';
import clsx from 'clsx';
import { computed } from 'vue';
import Button from '@/components/button/button.vue';
import Calendar from '@/components/calendar/calendar.vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

export interface DatePickerProps extends Omit<CalendarProps, 'modelValue'> {
  footer?: boolean;
  cancelLabel?: string;
  applyLabel?: string;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  footer: true,
  cancelLabel: 'Cancel',
  applyLabel: 'Apply',
});

const emits = defineEmits<{
  apply: [value: DateValue | undefined];
  cancel: [];
}>();

const modelValue = defineModel<DateValue>();

const calendarProps = useDelegatedProps(props, ['class', 'footer', 'cancelLabel', 'applyLabel']);

const cardClass = computed(() => clsx('celeste-date-picker', props.class));
</script>

<template>
  <div :class="cardClass">
    <div class="celeste-date-picker-body">
      <Calendar v-model="modelValue" v-bind="calendarProps" />
    </div>

    <div v-if="footer" class="celeste-date-picker-footer">
      <Button
        class="celeste-date-picker-action"
        variant="stroke"
        intent="neutral"
        @click="emits('cancel')"
      >
        {{ cancelLabel }}
      </Button>
      <Button
        class="celeste-date-picker-action"
        variant="fill"
        intent="primary"
        @click="emits('apply', modelValue)"
      >
        {{ applyLabel }}
      </Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.celeste-date-picker {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 368px;
  max-width: 100%;
  overflow: hidden;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-20);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
}

.celeste-date-picker-body {
  padding: 20px;
  border-block-end: 1px solid var(--color-stroke-soft-200);
}

.celeste-date-picker-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-16);
  gap: var(--spacing-16);
}

.celeste-date-picker-action {
  flex: 1;
}
</style>
