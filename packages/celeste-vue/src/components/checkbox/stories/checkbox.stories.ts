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
    checked: 'indeterminate',
    flip: true,
    label: 'Label',
    sublabel: 'Sublabel',
    description: 'Insert the checkbox description here.',
    badgeProps: {
      size: 'sm',
      variant: 'light',
      label: 'Badge',
      state: 'information',
      type: 'basic',
    },
    linkButtonProps: {
      size: 'sm',
      as: 'a',
      type: 'primary',
    },
    link: 'https://google.com',
    linkText: 'Link button',
  },

  render: args => ({
    components: { Checkbox },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 30%">
        <Checkbox v-bind="args" />
      </div>
    `,
  }),
};
