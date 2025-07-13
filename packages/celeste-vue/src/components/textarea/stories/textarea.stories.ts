import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Textarea from '../textarea.vue';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Your Message',
  },

  render: args => ({
    components: { Textarea },
    setup() {
      return { args };
    },
    template: `
      <Textarea v-bind="args" rows="10" />
    `,
  }),
};
