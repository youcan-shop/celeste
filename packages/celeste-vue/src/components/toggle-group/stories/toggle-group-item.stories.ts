import type { Meta, StoryObj } from '@storybook/vue3';
import ToggleGroupItem from '../toggle-group-item.vue';
import ToggleGroup from '../toggle-group.vue';

const meta: Meta<typeof ToggleGroupItem> = {
  title: 'Components/Toggle Group Item',
  component: ToggleGroupItem,
};

export default meta;

type Story = StoryObj<typeof ToggleGroupItem>;

export const Default: Story = {
  args: {
    value: 'light',
  },

  render: args => ({
    components: { ToggleGroup, ToggleGroupItem },
    setup() {
      return { args };
    },
    template: `
      <ToggleGroup>
        <ToggleGroupItem v-bind="args">Light</ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
};
