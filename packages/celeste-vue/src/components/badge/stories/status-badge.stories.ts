import type { Meta, StoryObj } from '@storybook/vue3';
import StatusBadge from '../status-badge.vue';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {
  args: {
    label: 'Badge',
    state: 'faded',
    variant: 'stroke',
    dotted: false,
  },

  render: args => ({
    components: { StatusBadge },
    setup() {
      return { args };
    },
    template: `
      <StatusBadge v-bind="args">
      </StatusBadge>
    `,
  }),
};
