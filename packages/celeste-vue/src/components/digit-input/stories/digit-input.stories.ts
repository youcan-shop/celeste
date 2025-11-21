import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import DigitInputGroup from '../digit-input-group.vue';
import DigitInputSlot from '../digit-input-slot.vue';
import DigitInput from '../digit-input.vue';

const meta: Meta<typeof DigitInput> = {
  title: 'Components/Input/Digit Input',
  component: DigitInput,
  argTypes: {
    modelValue: {
      control: { type: 'object' },
      description: 'Array of string values for each input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder character for empty slots',
      defaultValue: '●',
    },
    mask: {
      control: { type: 'boolean' },
      description: 'Whether to mask the input (for passwords)',
    },
    otp: {
      control: { type: 'boolean' },
      description: 'Whether this is for OTP input',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'number'],
      description: 'Input type',
    },
    hasError: {
      control: { type: 'boolean' },
      description: 'Whether the input has an error state',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DigitInput>;

export const Default: Story = {
  args: {
    placeholder: '●',
  },

  render: args => ({
    components: { DigitInput, DigitInputSlot, DigitInputGroup },
    setup() {
      const value = ref(['', '', '', '']);
      return { args, value };
    },
    template: `
      <DigitInput v-bind="args" v-model="value" style="max-width: 640px;">
        <DigitInputGroup>
          <DigitInputSlot v-for="(item, index) in 4" :key="index" :index="index" />
        </DigitInputGroup>
      </DigitInput>
    `,
  }),
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: '●',
  },

  render: args => ({
    components: { DigitInput, DigitInputSlot, DigitInputGroup },
    setup() {
      const value = ref(['', '', '', '', '', '']);
      return { args, value };
    },
    template: `
      <DigitInput v-bind="args" v-model="value" style="max-width: 640px;">
        <DigitInputGroup>
          <DigitInputSlot v-for="(item, index) in 6" :key="index" :index="index" />
        </DigitInputGroup>
      </DigitInput>
    `,
  }),
};

export const OTPInput: Story = {
  args: {
    otp: true,
    placeholder: '●',
    type: 'number',
  },

  render: args => ({
    components: { DigitInput, DigitInputSlot, DigitInputGroup },
    setup() {
      const value = ref(['', '', '', '', '', '']);
      return { args, value };
    },
    template: `
      <DigitInput v-bind="args" v-model="value" style="max-width: 640px;">
        <DigitInputGroup>
          <DigitInputSlot v-for="(item, index) in 6" :key="index" :index="index" />
        </DigitInputGroup>
      </DigitInput>
    `,
  }),
};

export const PasswordInput: Story = {
  args: {
    mask: true,
    type: 'number',
    placeholder: '●',
  },

  render: args => ({
    components: { DigitInput, DigitInputSlot, DigitInputGroup },
    setup() {
      const value = ref(['', '', '', '']);
      return { args, value };
    },
    template: `
      <DigitInput v-bind="args" v-model="value" style="max-width: 640px;">
        <DigitInputGroup>
          <DigitInputSlot v-for="(item, index) in 4" :key="index" :index="index" />
        </DigitInputGroup>
      </DigitInput>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '●',
  },

  render: args => ({
    components: { DigitInput, DigitInputSlot, DigitInputGroup },
    setup() {
      const value = ref(['1', '2', '3', '']);
      return { args, value };
    },
    template: `
      <DigitInput v-bind="args" v-model="value" style="max-width: 640px;">
        <DigitInputGroup>
          <DigitInputSlot v-for="(item, index) in 4" :key="index" :index="index" />
        </DigitInputGroup>
      </DigitInput>
    `,
  }),
};

export const LongerInput: Story = {
  args: {
    placeholder: '●',
  },

  render: args => ({
    components: { DigitInput, DigitInputSlot, DigitInputGroup },
    setup() {
      const value = ref(['', '', '', '', '', '', '', '']);
      return { args, value };
    },
    template: `
      <DigitInput v-bind="args" v-model="value" style="max-width: 640px;">
        <DigitInputGroup>
          <DigitInputSlot v-for="(item, index) in 8" :key="index" :index="index" />
        </DigitInputGroup>
      </DigitInput>
    `,
  }),
};

export const PrefilledValue: Story = {
  args: {
    placeholder: '●',
  },

  render: args => ({
    components: { DigitInput, DigitInputSlot, DigitInputGroup },
    setup() {
      const value = ref(['1', '2', '3', '4']);
      return { args, value };
    },
    template: `
      <DigitInput v-bind="args" v-model="value" style="max-width: 640px;">
        <DigitInputGroup>
          <DigitInputSlot v-for="(item, index) in 4" :key="index" :index="index" />
        </DigitInputGroup>
      </DigitInput>
    `,
  }),
};

export const ErrorState: Story = {
  args: {
    placeholder: '●',
    hasError: true,
  },

  render: args => ({
    components: { DigitInput, DigitInputSlot, DigitInputGroup },
    setup() {
      const value = ref(['1', '2', '', '']);
      return { args, value };
    },
    template: `
      <DigitInput v-bind="args" v-model="value" style="max-width: 640px;">
        <DigitInputGroup>
          <DigitInputSlot v-for="(item, index) in 4" :key="index" :index="index" />
        </DigitInputGroup>
      </DigitInput>
    `,
  }),
};

export const Responsive: Story = {
  args: {
    otp: true,
    placeholder: '●',
    type: 'number',
  },

  render: args => ({
    components: { DigitInput, DigitInputSlot, DigitInputGroup },
    setup() {
      const value = ref(['', '', '', '', '', '']);
      return { args, value };
    },
    template: `
      <div style="max-width: 320px; border: 1px dashed #ccc; padding: 16px;">
        <p style="margin-bottom: 12px; font-size: 12px; color: #666;">Container width: 320px (small mobile)</p>
        <DigitInput v-bind="args" v-model="value">
          <DigitInputGroup>
            <DigitInputSlot v-for="(id, idx) in 3" :key="id" :index="idx" />
            <i class="i-celeste-subtract-line" style="width: 16px; flex-shrink: 0;" />
            <DigitInputSlot v-for="(id, idx) in 3" :key="id + 3" :index="idx + 3" />
          </DigitInputGroup>
        </DigitInput>
      </div>
    `,
  }),
};
