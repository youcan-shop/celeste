import type { Meta, StoryObj } from '@storybook/vue3';
import Checkbox from '../checkbox.vue';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
  },

  render: args => ({
    components: { Checkbox },
    setup() {
      return { args };
    },
    template: `
      <Checkbox v-bind="args">
      </Checkbox>
    `,
  }),
};
