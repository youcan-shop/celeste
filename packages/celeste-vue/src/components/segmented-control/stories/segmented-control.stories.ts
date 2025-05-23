import type { Meta, StoryObj } from '@storybook/vue3';
import SegmentedControlItem from '../segmented-control-item.vue';
import SegmentedControl from '../segmented-control.vue';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  args: {
    defaultValue: 'light',
    type: 'single',
    orientation: 'horizontal',
    loop: true,
    rovingFocus: true,
    disabled: false,
    dir: 'ltr',
  },

  render: args => ({
    components: { SegmentedControl, SegmentedControlItem },
    setup() {
      return { args };
    },
    template: `
      <SegmentedControl v-bind="args">
        <SegmentedControlItem value="light">Light</SegmentedControlItem>
        <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
        <SegmentedControlItem value="system" disabled>System</SegmentedControlItem>
      </SegmentedControl>`,
  }),
};
