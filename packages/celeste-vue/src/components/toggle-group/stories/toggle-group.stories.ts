import type { Meta, StoryObj } from '@storybook/vue3';
import ToggleGroupItem from '../toggle-group-item.vue';
import ToggleGroup from '../toggle-group.vue';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/Toggle Group',
  component: ToggleGroup,
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    defaultValue: 'light',
    type: 'single',
    orientation: 'horizontal',
  },

  render: args => ({
    components: { ToggleGroup, ToggleGroupItem },
    setup() {
      return { args };
    },
    template: `
      <ToggleGroup v-bind="args">
        <ToggleGroupItem value="light">Light</ToggleGroupItem>
        <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
        <ToggleGroupItem value="system" disabled>System</ToggleGroupItem>
      </ToggleGroup>`,
  }),
};
