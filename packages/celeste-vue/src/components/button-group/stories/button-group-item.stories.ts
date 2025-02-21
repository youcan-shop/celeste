import type { Meta, StoryObj } from '@storybook/vue3';
import ButtonGroupItem from '../button-group-item.vue';
import ButtonGroup from '../button-group.vue';

const meta: Meta<typeof ButtonGroupItem> = {
  title: 'Components/ButtonGroupItem',
  component: ButtonGroupItem,
};

export default meta;

type Story = StoryObj<typeof ButtonGroupItem>;

export const Default: Story = {
  args: {
    value: 'share',
    text: 'Share',
  },

  render: args => ({
    components: { ButtonGroupItem, ButtonGroup },
    setup() {
      return { args };
    },
    template: `
      <ButtonGroup type='single'>
        <ButtonGroupItem v-bind="args">Button</ButtonGroupItem>
      </ButtonGroup>
    `,
  }),
};
