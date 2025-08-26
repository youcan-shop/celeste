import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CounterInput from '../counter-input.vue';

const meta: Meta<typeof CounterInput> = {
  title: 'Components/Counter Input',
  component: CounterInput,
};

export default meta;

type Story = StoryObj<typeof CounterInput>;

export const Default: Story = {
  args: {
    defaultValue: 5,
    max: 10,
    min: 0,
  },

  render: args => ({
    components: { CounterInput },
    setup() {
      return { args };
    },
    template: `
      <CounterInput v-bind="args" />
    `,
  }),
};

export const Size: Story = {
  args: {
    defaultValue: 5,
    max: 10,
    min: 0,
  },

  render: args => ({
    components: { CounterInput },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 12px;">
        <CounterInput v-bind="args" size="md" />
        <CounterInput v-bind="args" size="sm" />
        <CounterInput v-bind="args" size="xs" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    defaultValue: 0,
    max: 10,
    disabled: true,
  },

  render: args => ({
    components: { CounterInput },
    setup() {
      return { args };
    },
    template: `
      <CounterInput v-bind="args" />
    `,
  }),
};

export const hasError: Story = {
  args: {
    defaultValue: 5,
    max: 10,
    hasError: true,
  },

  render: args => ({
    components: { CounterInput },
    setup() {
      return { args };
    },
    template: `
      <CounterInput v-bind="args" />
    `,
  }),
};

export const Decimal: Story = {
  args: {
    defaultValue: 5,
    formatOptions: {
      signDisplay: 'negative',
      minimumFractionDigits: 1,
    },
  },

  render: args => ({
    components: { CounterInput },
    setup() {
      return { args };
    },
    template: `
      <CounterInput v-bind="args" />
    `,
  }),
};

export const Percentage: Story = {
  args: {
    defaultValue: 0.05,
    step: 0.01,
    formatOptions: {
      style: 'percent',
    },
  },

  render: args => ({
    components: { CounterInput },
    setup() {
      return { args };
    },
    template: `
      <CounterInput v-bind="args" />
    `,
  }),
};

export const Currency: Story = {
  args: {
    defaultValue: 5,
    formatOptions: {
      style: 'currency',
      currency: 'MAD',
      currencyDisplay: 'code',
      currencySign: 'accounting',
    },
  },

  render: args => ({
    components: { CounterInput },
    setup() {
      return { args };
    },
    template: `
      <CounterInput v-bind="args" />
    `,
  }),
};
