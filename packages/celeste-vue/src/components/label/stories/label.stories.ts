import type { Meta, StoryObj } from '@storybook/vue3';
import Label from '../label.vue';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    buttonLink: 'https://google.com',
    buttonLinkText: 'Help?',
    sublabel: '(Optional)',
    labelText: 'Label',
    linkButtonProps: {
      size: 'sm',
      as: 'a',
      type: 'gray',
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
