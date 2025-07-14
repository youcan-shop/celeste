import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ProgressCircular from '../progress-circular.vue';

const meta: Meta<typeof ProgressCircular> = {
  title: 'Components/Progress Circular',
  component: ProgressCircular,
};

export default meta;

type Story = StoryObj<typeof ProgressCircular>;

export const Default: Story = {
  args: {
    modelValue: 45,
  },

  render: args => ({
    components: { ProgressCircular },
    setup() {
      return { args };
    },
    template: `
      <ProgressCircular v-bind="args" />
    `,
  }),
};
