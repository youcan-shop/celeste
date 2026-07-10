import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { CalendarDate } from '@internationalized/date';
import { ref } from 'vue';
import Calendar from '../calendar.vue';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  argTypes: {
    weekStartsOn: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'First day of the week (0 = Sunday, 1 = Monday).',
    },
    weekdayFormat: {
      control: { type: 'select' },
      options: ['narrow', 'short', 'long'],
      description: 'Formatting used to derive the weekday labels.',
    },
    fixedWeeks: {
      control: { type: 'boolean' },
      description: 'Always render 6 weeks so the calendar height stays stable.',
    },
    locale: {
      control: { type: 'text' },
      description: 'BCP-47 locale used for the heading and weekday labels.',
    },
  },
  args: {
    weekStartsOn: 1,
    weekdayFormat: 'short',
    fixedWeeks: true,
    locale: 'en-US',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: args => ({
    components: { Calendar },
    setup() {
      const value = ref(new CalendarDate(2024, 1, 11));
      const markedDates = [new CalendarDate(2024, 1, 16)];
      return { args, value, markedDates };
    },
    template: `
      <div style="width: 328px;">
        <Calendar v-model="value" v-bind="args" :marked-dates="markedDates" />
      </div>
    `,
  }),
};

export const Arabic: Story = {
  args: {
    locale: 'ar',
    dir: 'rtl',
    weekStartsOn: 2,
  },
  render: args => ({
    components: { Calendar },
    setup() {
      const value = ref(new CalendarDate(2024, 1, 11));
      const markedDates = [new CalendarDate(2024, 1, 16)];
      return { args, value, markedDates };
    },
    template: `
      <div dir="rtl" style="width: 328px;">
        <Calendar v-model="value" v-bind="args" :marked-dates="markedDates" />
      </div>
    `,
  }),
};
