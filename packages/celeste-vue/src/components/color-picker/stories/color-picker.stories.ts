import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import ColorPicker from '../color-picker.vue';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/Color Picker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  args: {
  },
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    label: 'Pick Color',
    defaultFormat: 'hex',
    formats: ['hex', 'rgb', 'hsl', 'hsb'],
  },
  render: (args: Story['args']) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('hsla(228, 100%, 60%, 1)');
      return { args, color };
    },
    template: `
      <ColorPicker v-model="color" v-bind="args" />
    `,
  }),
};

export const WithRGBDefault: Story = {
  args: {
    label: 'Pick Color',
    defaultFormat: 'rgb',
    formats: ['hex', 'rgb', 'hsl', 'hsb'],
  },
  render: (args: Story['args']) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('rgb(255, 100, 50)');
      return { args, color };
    },
    template: `
      <ColorPicker v-model="color" v-bind="args" />
    `,
  }),
};

export const WithHSLDefault: Story = {
  args: {
    label: 'Pick Color',
    defaultFormat: 'hsl',
    formats: ['hex', 'rgb', 'hsl', 'hsb'],
  },
  render: (args: Story['args']) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('hsl(320, 70%, 60%)');
      return { args, color };
    },
    template: `
      <ColorPicker v-model="color" v-bind="args" />
    `,
  }),
};

export const HexOnly: Story = {
  args: {
    label: 'Pick Color',
    defaultFormat: 'hex',
    formats: ['hex'],
  },
  render: (args: Story['args']) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('#FF6B35');
      return { args, color };
    },
    template: `
      <ColorPicker v-model="color" v-bind="args" />
    `,
  }),
};

export const RGBAndHSL: Story = {
  args: {
    label: 'Pick Color',
    defaultFormat: 'rgb',
    formats: ['rgb', 'hsl'],
  },
  render: (args: Story['args']) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('rgb(100, 200, 150)');
      return { args, color };
    },
    template: `
      <ColorPicker v-model="color" v-bind="args" />
    `,
  }),
};

export const WithTransparentColor: Story = {
  args: {
    label: 'Pick Color',
    defaultFormat: 'hex',
    formats: ['hex', 'rgb', 'hsl', 'hsb'],
  },
  render: (args: Story['args']) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('rgba(255, 100, 50, 0.5)');
      return { args, color };
    },
    template: `
      <ColorPicker v-model="color" v-bind="args" />
    `,
  }),
};

export const CustomLabel: Story = {
  args: {
    label: 'Choose your brand color',
    defaultFormat: 'hex',
    formats: ['hex', 'rgb', 'hsl', 'hsb'],
  },
  render: (args: Story['args']) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('#007bff');
      return { args, color };
    },
    template: `
      <ColorPicker v-model="color" v-bind="args" />
    `,
  }),
};
