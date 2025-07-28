import type { Meta, StoryObj } from '@storybook/vue3-vite';
import RichEditor from '../rich-editor.vue';

const meta: Meta<typeof RichEditor> = {
  title: 'Components/RichEditor',
  component: RichEditor,

  argTypes: {
    customToolbar: {
      description: `An array of toolbar item slugs that defines the order and visibility of editor actions.
        * item_slugs: [
          'heading',
          'fontSize',
          'color',
          'bold',
          'italic',
          'underline',
          'strike',
          'bulletList',
          'orderedList',
          'align',
          'link',
          'undo',
          'redo',
          'clear',
        ]

        * 'divider': use it for separation.

        Example: ['bold', 'divider', 'color']
      `,
    },
    showExtraSettings: {
      description: 'Controls the visibility of the dropdown menu containing options like copy, cut, delete, and duplicate.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof RichEditor>;

export const Default: Story = {
  args: {
    modelValue: '',
    customToolbar: [],
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
    modelValue: '',
    placeholder: 'Write something...',
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
