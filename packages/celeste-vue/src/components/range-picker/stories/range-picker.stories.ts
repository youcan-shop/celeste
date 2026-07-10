import type { Meta, StoryObj } from '@storybook/vue3-vite';
import type { DateRange } from 'reka-ui';
import { CalendarDate } from '@internationalized/date';
import { ref } from 'vue';
import Button from '@/components/button/button.vue';
import PopoverContent from '@/components/popover/popover-content.vue';
import PopoverTrigger from '@/components/popover/popover-trigger.vue';
import Popover from '@/components/popover/popover.vue';
import RangePicker from '../range-picker.vue';

const meta: Meta<typeof RangePicker> = {
  title: 'Components/Range Picker',
  component: RangePicker,
  parameters: { layout: 'centered' },
  argTypes: {
    showPresets: {
      control: { type: 'boolean' },
      description: 'Toggles the left-hand preset (time filter) sidebar.',
    },
    footer: {
      control: { type: 'boolean' },
      description: 'Toggles the footer with the range hint and Cancel / Apply actions.',
    },
    numberOfMonths: {
      control: { type: 'number' },
      description: 'How many months to render side by side.',
    },
    weekStartsOn: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6],
    },
    locale: { control: { type: 'text' } },
    rangeLabel: { control: { type: 'text' } },
  },
  args: {
    showPresets: true,
    footer: true,
    numberOfMonths: 2,
    weekStartsOn: 1,
    locale: 'en-US',
    rangeLabel: 'Range:',
  },
};

export default meta;
type Story = StoryObj<typeof RangePicker>;

export const Default: Story = {
  render: args => ({
    components: { RangePicker },
    setup() {
      const value = ref<DateRange>({
        start: new CalendarDate(2023, 12, 18),
        end: new CalendarDate(2024, 1, 7),
      });
      const markedDates = [new CalendarDate(2023, 12, 8), new CalendarDate(2024, 1, 11)];
      return { args, value, markedDates };
    },
    template: `<RangePicker v-model="value" v-bind="args" :marked-dates="markedDates" />`,
  }),
};

export const NoPresets: Story = {
  args: { showPresets: false },
  render: args => ({
    components: { RangePicker },
    setup() {
      const value = ref<DateRange>({ start: undefined, end: undefined });
      return { args, value };
    },
    template: `<RangePicker v-model="value" v-bind="args" />`,
  }),
};

export const InPopover: Story = {
  render: args => ({
    components: { RangePicker, Popover, PopoverContent, PopoverTrigger, Button },
    setup() {
      const value = ref<DateRange>({ start: undefined, end: undefined });
      const open = ref(false);
      return { args, value, open };
    },
    template: `
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button variant="stroke" intent="neutral">
            <i class="i-celeste-calendar-line" />
            Select date range
          </Button>
        </PopoverTrigger>
        <PopoverContent :show-tail="false" :dismissible="false" style="padding: 0; border: none; box-shadow: none; max-width: none;">
          <RangePicker v-model="value" v-bind="args" @apply="open = false" @cancel="open = false" />
        </PopoverContent>
      </Popover>
    `,
  }),
};
