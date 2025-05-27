import type { Meta, StoryObj } from '@storybook/vue3';
import TextArea from '../textarea.vue';

const meta: Meta<typeof TextArea> = {
  title: 'Components/Text Area',
  component: TextArea,
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Your Message',
  },

  render: args => ({
    components: { TextArea },
    setup() {
      return { args };
    },
    template: `
      <TextArea v-bind="args" rows="10" />
    `,
  }),
};
