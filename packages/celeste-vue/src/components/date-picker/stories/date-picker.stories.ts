import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { CalendarDate } from '@internationalized/date';
import { ref } from 'vue';
import Button from '@/components/button/button.vue';
import PopoverContent from '@/components/popover/popover-content.vue';
import PopoverTrigger from '@/components/popover/popover-trigger.vue';
import Popover from '@/components/popover/popover.vue';
import DatePicker from '../date-picker.vue';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Date Picker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  argTypes: {
    footer: {
      control: { type: 'boolean' },
      description: 'Toggles the Cancel / Apply footer.',
    },
    weekStartsOn: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'First day of the week (0 = Sunday, 1 = Monday).',
    },
    locale: {
      control: { type: 'text' },
      description: 'BCP-47 locale used for the heading and weekday labels.',
    },
    cancelLabel: { control: { type: 'text' } },
    applyLabel: { control: { type: 'text' } },
  },
  args: {
    footer: true,
    weekStartsOn: 1,
    locale: 'en-US',
    cancelLabel: 'Cancel',
    applyLabel: 'Apply',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: args => ({
    components: { DatePicker },
    setup() {
      const value = ref(new CalendarDate(2024, 1, 11));
      const markedDates = [new CalendarDate(2024, 1, 16)];
      return { args, value, markedDates };
    },
    template: `<DatePicker v-model="value" v-bind="args" :marked-dates="markedDates" />`,
  }),
};

export const NoFooter: Story = {
  args: { footer: false },
  render: args => ({
    components: { DatePicker },
    setup() {
      const value = ref(new CalendarDate(2024, 1, 11));
      return { args, value };
    },
    template: `<DatePicker v-model="value" v-bind="args" />`,
  }),
};

export const InPopover: Story = {
  render: args => ({
    components: { DatePicker, Popover, PopoverContent, PopoverTrigger, Button },
    setup() {
      const value = ref<CalendarDate>();
      const open = ref(false);
      function onApply(): void {
        open.value = false;
      }
      return { args, value, open, onApply };
    },
    template: `
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button variant="stroke" intent="neutral">
            <i class="i-celeste-calendar-line" />
            {{ value ? value.toString() : 'Pick a date' }}
          </Button>
        </PopoverTrigger>
        <PopoverContent :show-tail="false" :dismissible="false" style="padding: 0; border: none; box-shadow: none;">
          <DatePicker v-model="value" v-bind="args" @apply="onApply" @cancel="open = false" />
        </PopoverContent>
      </Popover>
    `,
  }),
};
