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
  },

  render: args => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `
      <Alert v-bind="args">
        This is an alert.
      </Alert>
    `,
  }),
};
