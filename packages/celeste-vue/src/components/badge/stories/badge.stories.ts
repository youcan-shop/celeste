import type { Meta, StoryObj } from '@storybook/vue3';
import Badge from '../badge.vue';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'fill',
    label: 'Badge',
    color: 'information',
    type: 'leading-icon',
    icon: 'i-celeste-contrast-2-line',
  },

  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: `
      <Badge v-bind="args">
      </Badge>
    `,
  }),
};
