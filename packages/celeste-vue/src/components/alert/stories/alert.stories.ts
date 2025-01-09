import type { Meta, StoryObj } from '@storybook/vue3';
import Alert from '../alert.vue';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    dismissable: true,
    title: 'Payment received',
    description: 'You have received a new payment from your-mom@gmail.com, don\'t spend it all in one place.',
    primary: 'View transaction',
    secondary: 'Ignore',
    size: 'lg',
    state: 'success',
    variant: 'stroke',
  },

  render: args => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `
      <Alert v-bind="args"/>
    `,
  }),
};
