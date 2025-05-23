import type { Meta, StoryObj } from '@storybook/vue3';
import SegmentedControlItem from '../segmented-control-item.vue';
import SegmentedControl from '../segmented-control.vue';

const meta: Meta<typeof SegmentedControlItem> = {
  title: 'Components/Segmented Control Item',
  component: SegmentedControlItem,
};

export default meta;

type Story = StoryObj<typeof SegmentedControlItem>;

export const Default: Story = {
  args: {
    value: 'light',
    disabled: false,
  },

  render: args => ({
    components: { SegmentedControl, SegmentedControlItem },
    setup() {
      return { args };
    },
    template: `
      <SegmentedControl>
        <SegmentedControlItem v-bind="args">Light</SegmentedControlItem>
      </SegmentedControl>
    `,
  }),
};
