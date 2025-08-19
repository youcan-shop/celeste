import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CounterInput from '../counter-input.vue';

const meta: Meta<typeof CounterInput> = {
  title: 'Components/Counter Input',
  component: CounterInput,
};

export default meta;

type Story = StoryObj<typeof CounterInput>;

export const Default: Story = {
  args: {
    defaultValue: 0,
    max: 10,
  },

  render: args => ({
    components: { CounterInput },
    setup() {
      return { args };
    },
    template: `
      <CounterInput />
    `,
  }),
};
