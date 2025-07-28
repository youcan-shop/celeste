import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Badge from '@/components/badge/badge.vue';
import LinkButton from '@/components/button/link-button.vue';
import CheckboxLabel from '../checkbox-label.vue';
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

export const WithCheckboxLabel: Story = {
  args: {},

  render: args => ({
    components: { Checkbox, CheckboxLabel, Badge, LinkButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <CheckboxLabel>
            <Checkbox v-bind="args" />

            <template #label>
              Label
            </template>

            <template #badge>
              <Badge 
                label="NEW" 
                state="information" 
                variant="light" 
                size="sm" 
              />
            </template>
            <template #sublabel>
                (Sublabel)
            </template>
            <template #description>
                Insert the checkbox description here.
            </template>
            <template #linkButton>
              <LinkButton 
                href="#" 
                intent="primary" 
                size="sm"
              >
                Learn More
              </LinkButton>
            </template>
          </CheckboxLabel>
        </div>
      </div>
    `,
  }),
};
