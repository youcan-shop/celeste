import type { Meta, StoryObj } from '@storybook/vue3-vite';
import HintText from '../hint-text.vue';

const meta: Meta<typeof HintText> = {
  title: 'Components/Hint Text',
  component: HintText,
};

export default meta;

type Story = StoryObj<typeof HintText>;

export const Default: Story = {
  args: {
    text: 'This is a hint text to help user.',
    icon: 'i-celeste-information-fill',
  },

  render: args => ({
    components: { HintText },
    setup() {
      return { args };
    },
    template: `
      <HintText v-bind="args" />
    `,
  }),
};
