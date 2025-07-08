import type { Meta, StoryObj } from '@storybook/vue3-vite';
import RichEditor from '../rich-editor.vue';

const meta: Meta<typeof RichEditor> = {
  title: 'Components/RichEditor',
  component: RichEditor,
};

export default meta;

type Story = StoryObj<typeof RichEditor>;

export const Default: Story = {
  args: {
    modelValue: '',
  },

  render: args => ({
    components: { RichEditor },
    setup() {
      return { args };
    },
    template: `
      <RichEditor v-bind="args" />
    `,
  }),
};

export const CustomToolbar: Story = {
  args: {
    modelValue: 'Hello world 👋',
    customToolbar: [
      'heading',
      'divider',
      'fontSize',
      'divider',
      'bold',
      'underline',
      'divider',
      'align',
    ],
    maxLimit: 200,
    showExtraSettings: false,
  },

  render: args => ({
    components: { RichEditor },
    setup() {
      return { args };
    },
    template: `
      <RichEditor v-bind="args" />
    `,
  }),
};
