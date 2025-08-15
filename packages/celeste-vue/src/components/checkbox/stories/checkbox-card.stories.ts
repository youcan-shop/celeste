// @unocss-include

import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Badge from '@/components/badge/badge.vue';
import CheckboxCard from '../checkbox-card.vue';
import Checkbox from '../checkbox.vue';

const meta: Meta<typeof CheckboxCard> = {
  title: 'Components/Checkbox/CheckboxCard',
  component: CheckboxCard,
};

export default meta;

type Story = StoryObj<typeof CheckboxCard>;

export const Default: Story = {
  args: {},

  render: args => ({
    components: { CheckboxCard, Checkbox },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <CheckboxCard v-bind="args">
            <Checkbox />

            <template #label>
              Basic Label
            </template>
          </CheckboxCard>
        </div>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  args: {},

  render: args => ({
    components: { CheckboxCard, Checkbox },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <CheckboxCard v-bind="args">
            <Checkbox />

            <template #icon>
              <i i-celeste-user-6-line />
            </template>

            <template #label>
              Settings
            </template>

            <template #sublabel>
              (Configure options)
            </template>

            <template #description>
              Customize your application settings and preferences.
            </template>
          </CheckboxCard>
        </div>
      </div>
    `,
  }),
};

export const WithImage: Story = {
  args: {},

  render: args => ({
    components: { CheckboxCard, Checkbox },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <CheckboxCard v-bind="args">
            <Checkbox />

            <template #image>
              <img src="https://placehold.co/48" alt="Preview" />
            </template>

            <template #label>
              Image Option
            </template>

            <template #description>
              An option with an image preview.
            </template>
          </CheckboxCard>
        </div>
      </div>
    `,
  }),
};

export const WithBadge: Story = {
  args: {},

  render: args => ({
    components: { CheckboxCard, Checkbox, Badge },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <CheckboxCard v-bind="args">
            <Checkbox />

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
              Access premium features with advanced capabilities.
            </template>
          </CheckboxCard>
        </div>
      </div>
    `,
  }),
};

export const Complete: Story = {
  args: {},

  render: args => ({
    components: { CheckboxCard, Checkbox, Badge },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <CheckboxCard v-bind="args">
            <Checkbox />

            <template #icon>
              <i i-celeste-user-6-line />
            </template>

            <template #label>
              Complete
            </template>

            <template #sublabel>
              (All features)
            </template>

            <template #badge>
              <Badge 
                label="FEATURED" 
                state="success" 
                variant="light" 
                size="sm" 
              />
            </template>

            <template #description>
              This example showcases all available slots and features of the checkbox card component.
            </template>
          </CheckboxCard>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },

  render: args => ({
    components: { CheckboxCard, Checkbox, Badge },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <CheckboxCard v-bind="args">
            <Checkbox disabled />

            <template #icon>
              <i i-celeste-lock-line />
            </template>

            <template #label>
              Disabled Option
            </template>

            <template #description>
              This option is currently disabled and cannot be selected.
            </template>
          </CheckboxCard>
        </div>
      </div>
    `,
  }),
};

export const Multiple: Story = {
  args: {},

  render: args => ({
    components: { CheckboxCard, Checkbox, Badge },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px; display: flex; flex-direction: column; gap: 1rem;">
          <CheckboxCard v-bind="args">
            <Checkbox />

            <template #icon>
              <i i-celeste-mail-line />
            </template>

            <template #label>
              Email Notifications
            </template>

            <template #description>
              Receive updates via email.
            </template>
          </CheckboxCard>

          <CheckboxCard v-bind="args">
            <Checkbox checked />

            <template #icon>
              <i i-celeste-notification-line />
            </template>

            <template #label>
              Push Notifications
            </template>

            <template #badge>
              <Badge 
                label="RECOMMENDED" 
                state="success" 
                variant="light" 
                size="sm" 
              />
            </template>

            <template #description>
              Get instant push notifications on your device.
            </template>
          </CheckboxCard>

          <CheckboxCard v-bind="args">
            <Checkbox />

            <template #icon>
              <i i-celeste-message-line />
            </template>

            <template #label>
              SMS Notifications
            </template>

            <template #sublabel>
              (Required)
            </template>

            <template #description>
              Receive notifications via SMS text messages.
            </template>
          </CheckboxCard>
        </div>
      </div>
    `,
  }),
};
