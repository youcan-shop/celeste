import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Checkbox from '../checkbox.vue';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    defaultChecked: true,
  },

  render: args => ({
    components: { Checkbox },
    setup() {
      return { args };
    },
    template: `
      <div>
        <Checkbox v-bind="args" />
      </div>
    `,
  }),
};

export const Indeterminate: Story = {
  args: {
    defaultChecked: true,
    checked: 'indeterminate',
  },

  render: args => ({
    components: { Checkbox },
    setup() {
      return { args };
    },
    template: `
      <div>
        <Checkbox v-bind="args" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },

  render: args => ({
    components: { Checkbox },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 1em;">
        <Checkbox v-bind="args" />
        <Checkbox v-bind="args" checked />
        <Checkbox v-bind="args" checked="indeterminate" />
      </div>
    `,
  }),
};

export const WithLabel: Story = {
  args: {
  },

  render: args => ({
    components: { Checkbox },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="display: grid; gap: 1em;">
          <label style="display: flex; align-items: center; gap: 0.5em; font: var(--paragraph-sm); cursor: pointer; user-select: none;">
            <Checkbox v-bind="args" />
            SMS Verification
          </label>
          <label style="display: flex; align-items: center; gap: 0.5em; font: var(--paragraph-sm); cursor: pointer; user-select: none;">
            <Checkbox v-bind="args" />
            Authenticator App
          </label>
          <label style="display: flex; align-items: center; gap: 0.5em; font: var(--paragraph-sm); cursor: pointer; user-select: none;">
            <Checkbox v-bind="args" disabled />
            Disabled
          </label>
         <label style="display: flex; align-items: center; gap: 0.5em; font: var(--paragraph-sm); cursor: pointer; user-select: none;">
            <Checkbox v-bind="args" checked disabled />
            Disabled but default checked
          </label>
        </div>
      </div>
    `,
  }),
};
