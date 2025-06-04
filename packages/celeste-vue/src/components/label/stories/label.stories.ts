import type { Meta, StoryObj } from '@storybook/vue3';
import TextInput from '@/components/input/text-input.vue';
import LabelButton from '../label-button.vue';
import Label from '../label.vue';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    for: 'email',
  },

  render: args => ({
    components: { Label, TextInput },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 4px; width: 300px; justify-center: center;">
        <Label v-bind="args">Email Address</Label>
        <TextInput placeholder="hello@live.fr" type="email" size="sm" id="email" />
      </div>
    `,
  }),
};

export const Required: Story = {
  args: {
    for: 'date',
    required: true,
  },

  render: args => ({
    components: { Label, TextInput },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 4px; width: 300px; justify-center: center;">
        <Label v-bind="args">Date</Label>
        <TextInput placeholder="DD / MM / YYYY" type="text" size="sm" id="date" />
      </div>
    `,
  }),
};

export const Sublabel: Story = {
  args: {
    for: 'number',
    sublabel: '(Optional)',
  },

  render: args => ({
    components: { Label, TextInput },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 4px; width: 300px; justify-center: center;">
        <Label v-bind="args">Phone Number</Label>
        <TextInput placeholder="+1 (555) 000-000" type="text" size="sm" id="number" />
      </div>
    `,
  }),
};

export const Information: Story = {
  args: {
    for: 'amount',
    required: true,
    information: 'Rates may apply',
  },

  render: args => ({
    components: { Label, TextInput },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 4px; width: 300px; justify-center: center;">
        <Label v-bind="args">Amount</Label>
        <TextInput placeholder="€ 0.00" type="text" size="sm" id="amount" />
      </div>
    `,
  }),
};

export const Button: Story = {
  args: {
    for: 'search',
  },

  render: args => ({
    components: { Label, LabelButton, TextInput },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 4px; width: 300px; justify-center: center;">
        <Label v-bind="args">
          Search
          <LabelButton href="https://l9aleb-editor.netlify.app/celeste" target="_blank">
            Help?
          </LabelButton>
        </Label>
        <TextInput placeholder="Search.." type="text" size="sm" id="search" />
      </div>
    `,
  }),
};
