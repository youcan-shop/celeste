import type { Meta, StoryObj } from '@storybook/vue3';
import Switch from '../switch.vue';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    defaultChecked: true,
  },

  render: args => ({
    components: { Switch },
    setup() {
      return { args };
    },
    template: `
      <Switch v-bind="args" />
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },

  render: args => ({
    components: { Switch },
    setup() {
      return { args };
    },
    template: `
      <Switch v-bind="args" />
    `,
  }),
};

export const WithLabel: Story = {
  args: {},

  render: args => ({
    components: { Switch },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 1em;">
        <label style="display: flex; align-items: center; gap: 0.5em; font: var(--paragraph-sm); cursor: pointer; user-select: none;">
          <Switch v-bind="args" :default-checked="true" />
          SMS Verification
        </label>
        <label style="display: flex; align-items: center; gap: 0.5em; font: var(--paragraph-sm); cursor: pointer; user-select: none;">
          <Switch v-bind="args" />
          Authenticator App
        </label>
        <label style="display: flex; align-items: center; gap: 0.5em; font: var(--paragraph-sm); cursor: pointer; user-select: none;">
          <Switch v-bind="args" disabled />
          Disabled
        </label>
        <label style="display: flex; align-items: center; gap: 0.5em; font: var(--paragraph-sm); cursor: pointer; user-select: none;">
          <Switch v-bind="args" :default-checked="true" disabled />
          Disabled but default checked
        </label>
      </div>
    `,
  }),
};
