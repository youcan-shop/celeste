import type { Meta, StoryObj } from '@storybook/vue3';
import ButtonGroup from '../button-group.vue';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    type: 'single',
  },

  render: args => ({
    components: { ButtonGroup },
    setup() {
      return { args };
    },
    template: `
      <ButtonGroup v-bind="args" />
    `,
  }),
};
