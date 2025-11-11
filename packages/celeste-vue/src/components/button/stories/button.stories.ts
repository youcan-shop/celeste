import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from '../button.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    size: 'md',
    intent: 'primary',
  },

  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        Continue
        <i class="i-celeste-arrow-right-s-line"></i>
      </Button>
    `,
  }),
};

export const IconOnly: Story = {
  args: {
    size: 'sm',
    intent: 'neutral',
    variant: 'stroke',
  },

  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        <i class="i-celeste-translate"></i>
      </Button>
    `,
  }),
};
