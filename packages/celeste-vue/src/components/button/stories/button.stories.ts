import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '../button.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Button',
    icon: '',
    size: 'md',
    type: 'primary',
  },

  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args"></Button>
    `,
  }),

};
