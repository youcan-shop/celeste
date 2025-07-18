import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ProgressCircle from '../progress-circle.vue';

const meta: Meta<typeof ProgressCircle> = {
  title: 'Components/Progress Circle',
  component: ProgressCircle,
};

export default meta;

type Story = StoryObj<typeof ProgressCircle>;

export const Default: Story = {
  args: {
    modelValue: 45,
  },
  render: args => ({
    components: { ProgressCircle },
    setup() {
      return { args };
    },
    template: `
      <ProgressCircle v-bind="args" />
    `,
  }),
};

export const ZeroProgress: Story = {
  args: {
    modelValue: 0,
  },
  render: args => ({
    components: { ProgressCircle },
    setup() {
      return { args };
    },
    template: `<ProgressCircle v-bind="args" />`,
  }),
};

export const FullProgress: Story = {
  args: {
    modelValue: 100,
  },
  render: args => ({
    components: { ProgressCircle },
    setup() {
      return { args };
    },
    template: `<ProgressCircle v-bind="args" />`,
  }),
};

export const WithValueAndMax: Story = {
  name: 'With Custom Max Value',
  args: {
    modelValue: 256,
    max: 1024,
  },
  render: args => ({
    components: { ProgressCircle },
    setup() {
      return { args };
    },
    template: `<ProgressCircle v-bind="args" />`,
  }),
};

export const WithCustomLabelInSlot: Story = {
  name: 'With Custom Label (Slot)',
  args: {
    modelValue: 5,
    max: 10,
    size: 80,
  },
  render: args => ({
    components: { ProgressCircle },
    setup() {
      return { args };
    },
    template: `
      <ProgressCircle v-bind="args">
        5/10 Done
      </ProgressCircle>
    `,
  }),
};

export const WithCustomIconInSlot: Story = {
  name: 'With Custom Icon (Slot)',
  args: {
    modelValue: 100,
    max: 100,
    size: 80,
  },
  render: args => ({
    components: { ProgressCircle },
    setup() {
      return { args };
    },
    template: `
      <ProgressCircle v-bind="args">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </ProgressCircle>
    `,
  }),
};

export const DifferentSizes: Story = {
  args: {
    modelValue: 75,
  },
  render: args => ({
    components: { ProgressCircle },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <ProgressCircle v-bind="args" :size="80" />
        <ProgressCircle v-bind="args" :size="72" />
        <ProgressCircle v-bind="args" :size="64" />
        <ProgressCircle v-bind="args" :size="56" />
        <ProgressCircle v-bind="args" :size="48" />
      </div>
    `,
  }),
};

export const EdgeCases: Story = {
  render: () => ({
    components: { ProgressCircle },
    template: `
      <div style="display: flex; align-items: center; gap: 24px;">
        <div>
          <p style="text-align: center; margin-bottom: 8px;">Over Max</p>
          <ProgressCircle :modelValue="150" :max="100" />
        </div>
        <div>
          <p style="text-align: center; margin-bottom: 8px;">Negative Value</p>
          <ProgressCircle :modelValue="-50" />
        </div>
        <div>
          <p style="text-align: center; margin-bottom: 8px;">Max is Zero</p>
          <ProgressCircle :modelValue="0" :max="0" />
        </div>
      </div>
    `,
  }),
};
