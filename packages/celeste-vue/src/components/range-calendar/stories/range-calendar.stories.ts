import type { Meta, StoryObj } from '@storybook/vue3-vite';
import type { DateRange } from 'reka-ui';
import { CalendarDate } from '@internationalized/date';
import { ref } from 'vue';
import RangeCalendar from '../range-calendar.vue';

const meta: Meta<typeof RangeCalendar> = {
  title: 'Components/Range Calendar',
  component: RangeCalendar,
  parameters: { layout: 'centered' },
  argTypes: {
    numberOfMonths: {
      control: { type: 'number' },
      description: 'How many months to render side by side.',
    },
    weekStartsOn: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'First day of the week (0 = Sunday, 1 = Monday).',
    },
    locale: { control: { type: 'text' } },
  },
  args: {
    numberOfMonths: 2,
    weekStartsOn: 1,
    locale: 'en-US',
  },
};

export default meta;
type Story = StoryObj<typeof RangeCalendar>;

export const Default: Story = {
  render: args => ({
    components: { RangeCalendar },
    setup() {
      const value = ref<DateRange>({
        start: new CalendarDate(2023, 12, 18),
        end: new CalendarDate(2024, 1, 7),
      });
      const markedDates = [new CalendarDate(2023, 12, 8), new CalendarDate(2024, 1, 11)];
      return { args, value, markedDates };
    },
    template: `<RangeCalendar v-model="value" v-bind="args" :marked-dates="markedDates" />`,
  }),
};
