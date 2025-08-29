// @unocss-include

import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Badge from '@/components/badge/badge.vue';
import { ref } from 'vue';
import RadioGroupCard from '../radio-group-card.vue';
import RadioGroupItem from '../radio-group-item.vue';
import RadioGroup from '../radio-group.vue';

const meta: Meta<typeof RadioGroupCard> = {
  title: 'Components/Radio Group/RadioGroupCard',
  component: RadioGroupCard,
};

export default meta;

type Story = StoryObj<typeof RadioGroupCard>;

export const Default: Story = {
  args: {},

  render: args => ({
    components: { RadioGroup, RadioGroupCard, RadioGroupItem },
    setup() {
      const selectedValue = ref();
      return { args, selectedValue };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <RadioGroup v-model="selectedValue">
            <RadioGroupCard v-bind="args">
              <RadioGroupItem value="option1" />

              <template #label>
                Basic Label
              </template>
            </RadioGroupCard>
          </RadioGroup>
          <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
            <strong>Selected:</strong> {{ selectedValue ? selectedValue : 'None' }}
          </div>
        </div>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  args: {},

  render: args => ({
    components: { RadioGroup, RadioGroupCard, RadioGroupItem },
    setup() {
      const selectedValue = ref();
      return { args, selectedValue };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <RadioGroup v-model="selectedValue">
            <RadioGroupCard v-bind="args">
              <RadioGroupItem value="option1" />

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
            </RadioGroupCard>
          </RadioGroup>
          <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
            <strong>Selected:</strong> {{ selectedValue ? selectedValue : 'None' }}
          </div>
        </div>
      </div>
    `,
  }),
};

export const WithImage: Story = {
  args: {},

  render: args => ({
    components: { RadioGroup, RadioGroupCard, RadioGroupItem },
    setup() {
      const selectedValue = ref();
      return { args, selectedValue };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <RadioGroup v-model="selectedValue">
            <RadioGroupCard v-bind="args">
              <RadioGroupItem value="option1" />

              <template #image>
                <img src="https://placehold.co/48" alt="Preview" />
              </template>

              <template #label>
                Image Option
              </template>

              <template #description>
                An option with an image preview.
              </template>
            </RadioGroupCard>
          </RadioGroup>
          <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
            <strong>Selected:</strong> {{ selectedValue ? selectedValue : 'None' }}
          </div>
        </div>
      </div>
    `,
  }),
};

export const WithBadge: Story = {
  args: {},

  render: args => ({
    components: { RadioGroup, RadioGroupCard, RadioGroupItem, Badge },
    setup() {
      const selectedValue = ref();
      return { args, selectedValue };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <RadioGroup v-model="selectedValue">
            <RadioGroupCard v-bind="args">
              <RadioGroupItem value="option1" />

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
            </RadioGroupCard>
          </RadioGroup>
          <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
            <strong>Selected:</strong> {{ selectedValue ? selectedValue : 'None' }}
          </div>
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
    components: { RadioGroup, RadioGroupCard, RadioGroupItem, Badge },
    setup() {
      const selectedValue = ref();
      return { args, selectedValue };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px;">
          <RadioGroup v-model="selectedValue">
            <RadioGroupCard v-bind="args">
              <RadioGroupItem value="option1" disabled />

              <template #icon>
                <i i-celeste-lock-line />
              </template>

              <template #label>
                Disabled Option
              </template>

              <template #description>
                This option is currently disabled and cannot be selected.
              </template>
            </RadioGroupCard>
          </RadioGroup>
          <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
            <strong>Selected:</strong> {{ selectedValue ? selectedValue : 'None' }}
          </div>
        </div>
      </div>
    `,
  }),
};

export const Multiple: Story = {
  args: {},

  render: args => ({
    components: { RadioGroup, RadioGroupCard, RadioGroupItem, Badge },
    setup() {
      const selectedValue = ref();
      return { args, selectedValue };
    },
    template: `
      <div style="display: flex; justify-content: center;">
        <div style="max-width: 400px; display: flex; flex-direction: column; gap: 1rem;">
          <RadioGroup v-model="selectedValue">
            <RadioGroupCard v-bind="args">
              <RadioGroupItem value="email" />

              <template #icon>
                <i i-celeste-mail-line />
              </template>

              <template #label>
                Email Notifications
              </template>

              <template #description>
                Receive updates via email.
              </template>
            </RadioGroupCard>

            <RadioGroupCard v-bind="args">
              <RadioGroupItem value="push" />

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
            </RadioGroupCard>

            <RadioGroupCard v-bind="args">
              <RadioGroupItem value="sms" />

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
            </RadioGroupCard>
          </RadioGroup>
          <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
            <strong>Selected:</strong> {{ selectedValue ? selectedValue : 'None' }}
          </div>
        </div>
      </div>
    `,
  }),
};
