import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Mochi from '../mochi.vue';

const meta: Meta<typeof Mochi> = {
  title: 'Components/Mochi',
  component: Mochi,
  argTypes: {
    size: { control: { type: 'number', min: 16, max: 240, step: 4 } },
  },
};

export default meta;

type Story = StoryObj<typeof Mochi>;

export const Default: Story = {
  args: {
    size: 80,
    animate: true,
  },
  render: args => ({
    components: { Mochi },
    setup() {
      return { args };
    },
    template: `<Mochi v-bind="args" />`,
  }),
};

export const Static: Story = {
  name: 'Static (Motionless)',
  args: {
    size: 80,
    animate: false,
  },
  render: args => ({
    components: { Mochi },
    setup() {
      return { args };
    },
    template: `<Mochi v-bind="args" />`,
  }),
};

export const Sizes: Story = {
  args: {
    animate: true,
  },
  render: args => ({
    components: { Mochi },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <Mochi v-bind="args" :size="28" />
        <Mochi v-bind="args" :size="40" />
        <Mochi v-bind="args" :size="80" />
        <Mochi v-bind="args" :size="120" />
      </div>
    `,
  }),
};

export const Thinking: Story = {
  args: {
    size: 80,
    thinking: true,
  },
  render: args => ({
    components: { Mochi },
    setup() {
      return { args };
    },
    template: `<Mochi v-bind="args" />`,
  }),
};

export const Idle: Story = {
  name: 'Idle (Peek-a-boo)',
  args: {
    size: 80,
    animate: true,
  },
  render: args => ({
    components: { Mochi },
    setup() {
      const idle = ref(false);

      return { args, idle };
    },
    template: `
      <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px;">
        <Mochi v-bind="args" v-model:idle="idle" />
        <p style="font: var(--paragraph-sm); color: var(--color-text-sub-600);">
          idle: {{ idle }} — click Mochi to start peeking, then click again to make it hop.
        </p>
        <button type="button" style="font: var(--label-sm);" @click="idle = !idle">
          Toggle idle
        </button>
      </div>
    `,
  }),
};
