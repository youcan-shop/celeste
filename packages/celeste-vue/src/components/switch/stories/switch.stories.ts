import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Badge from '@/components/badge/badge.vue';
import LinkButton from '@/components/button/link-button.vue';
import SwitchLabel from '../switch-label.vue';
import Switch from '../switch.vue';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    defaultValue: true,
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

export const States: Story = {
  render: () => ({
    components: { Switch },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, max-content); gap: 1em;">
        <Switch />
        <Switch :default-value="true" />
        <Switch disabled />
        <Switch :default-value="true" disabled />
      </div>
    `,
  }),
};

export const WithLabel: Story = {
  args: {},

  render: args => ({
    components: { Switch, SwitchLabel, Badge, LinkButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 1.5em; max-width: 400px;">
        <SwitchLabel>
          <Switch v-bind="args" :default-value="true" />
          <template #label>SMS verification</template>
        </SwitchLabel>

        <SwitchLabel disabled>
          <Switch v-bind="args" disabled />
          <template #label>Disabled</template>
        </SwitchLabel>

        <SwitchLabel>
          <Switch v-bind="args" />

          <template #label>
            Label
          </template>
          <template #sublabel>
            (Sublabel)
          </template>
          <template #badge>
            <Badge
              label="NEW"
              state="information"
              variant="light"
              size="sm"
            />
          </template>
          <template #description>
            Insert the switch description here.
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
        </SwitchLabel>
      </div>
    `,
  }),
};
