import type { Meta, StoryObj } from '@storybook/vue3';
import CompactButton from '../compact-button.vue';

const meta: Meta<typeof CompactButton> = {
  title: 'Components/CompactButton',
  component: CompactButton,
};

export default meta;

type Story = StoryObj<typeof CompactButton>;

export const Default: Story = {
  args: {
    variant: 'stroke',
    icon: 'i-celeste-close-line',
    size: 'lg',
    rounded: false,
  },

  render: args => ({
    components: { CompactButton },
    setup() {
      return { args };
    },
    template: `
      <CompactButton v-bind="args">
      </CompactButton>
    `,
  }),
};
