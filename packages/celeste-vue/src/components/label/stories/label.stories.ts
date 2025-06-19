import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Label from '../label.vue';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    linkButtonLink: 'https://google.com',
    linkButtonText: 'Help?',
    sublabel: '(Optional)',
    labelText: 'Label',
    linkButtonProps: {
      size: 'sm',
      as: 'a',
      intent: 'gray',
    },
  },

  render: args => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: `
      <Label v-bind="args" />
    `,
  }),
};
