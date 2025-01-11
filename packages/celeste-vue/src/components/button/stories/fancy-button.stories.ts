import type { Meta, StoryObj } from '@storybook/vue3';
import FancyButton from '../fancy-button.vue';

const meta: Meta<typeof FancyButton> = {
  title: 'Components/FancyButton',
  component: FancyButton,
};

export default meta;

type Story = StoryObj<typeof FancyButton>;

export const Default: Story = {
  args: {
    size: 'md',
    type: 'primary',
  },

  render: args => ({
    components: { FancyButton },
    setup() {
      return { args };
    },
    template: `
      <FancyButton v-bind="args">
        Continue
        <i class="i-celeste-arrow-right-s-line"></i>
      </FancyButton>
    `,
  }),
};
