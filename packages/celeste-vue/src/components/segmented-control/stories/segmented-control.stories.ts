import type { Meta, StoryObj } from '@storybook/vue3-vite';
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
        <SegmentedControlItem value="light">
          <i class="i-celeste-sun-line" /> Light
        </SegmentedControlItem>
        <SegmentedControlItem value="dark">
          <i class="i-celeste-moon-line" /> Dark
        </SegmentedControlItem>
        <SegmentedControlItem value="system" disabled>
          <i class="i-celeste-settings-line" /> System
        </SegmentedControlItem>
      </SegmentedControl>`,
  }),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    defaultValue: 'light',
  },
  render: args => ({
    components: { SegmentedControl, SegmentedControlItem },
    setup() {
      return { args };
    },
    template: `
      <SegmentedControl v-bind="args">
        <SegmentedControlItem value="light">
          <i class="i-celeste-sun-line" /> Light
        </SegmentedControlItem>
        <SegmentedControlItem value="dark">
          <i class="i-celeste-moon-line" /> Dark
        </SegmentedControlItem>
        <SegmentedControlItem value="system" disabled>
          <i class="i-celeste-settings-line" /> System
        </SegmentedControlItem>
      </SegmentedControl>
    `,
  }),
};

export const LabelsOnly: Story = {
  args: {
    orientation: 'horizontal',
    defaultValue: 'light',
  },
  render: args => ({
    components: { SegmentedControl, SegmentedControlItem },
    setup() {
      return { args };
    },
    template: `
      <SegmentedControl v-bind="args">
        <SegmentedControlItem value="light">
          Light
        </SegmentedControlItem>
        <SegmentedControlItem value="dark">
          Dark
        </SegmentedControlItem>
        <SegmentedControlItem value="system">
          System
        </SegmentedControlItem>
      </SegmentedControl>
    `,
  }),
};

export const IconsOnly: Story = {
  args: {
    orientation: 'horizontal',
    defaultValue: 'light',
  },
  render: args => ({
    components: { SegmentedControl, SegmentedControlItem },
    setup() {
      return { args };
    },
    template: `
      <SegmentedControl v-bind="args">
        <SegmentedControlItem value="light">
          <i class="i-celeste-sun-line" />
        </SegmentedControlItem>
        <SegmentedControlItem value="dark">
          <i class="i-celeste-moon-line" />
        </SegmentedControlItem>
        <SegmentedControlItem value="system">
          <i class="i-celeste-settings-line" />
        </SegmentedControlItem>
      </SegmentedControl>
    `,
  }),
};
