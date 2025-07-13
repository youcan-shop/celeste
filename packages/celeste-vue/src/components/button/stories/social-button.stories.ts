import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SocialButton from '../social-button.vue';

const meta: Meta<typeof SocialButton> = {
  title: 'Components/SocialButton',
  component: SocialButton,
};

export default meta;

type Story = StoryObj<typeof SocialButton>;

export const Default: Story = {
  args: {
    brand: 'google',
    variant: 'fill',
  },

  render: args => ({
    components: { SocialButton },
    setup() {
      return { args };
    },
    template: `
      <SocialButton v-bind="args">
      </SocialButton>
    `,
  }),
};
