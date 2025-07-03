import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import RichEditor from '../rich-editor.vue';

const meta: Meta<typeof RichEditor> = {
  title: 'Components/RichEditor',
  component: RichEditor,
};

export default meta;

type Story = StoryObj<typeof RichEditor>;

const content = ref('<p>Hello Tiptap 👋</p>');

export const Default: Story = {
  args: {
    modelValue: content.value,
    maxLimit: 200,
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
