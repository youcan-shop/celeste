import type { Meta, StoryObj } from '@storybook/vue3-vite';
import FileUploadArea from '../file-upload-area.vue';

const meta: Meta<typeof FileUploadArea> = {
  title: 'Components/File Upload / File Upload Area',
  component: FileUploadArea,
};

export default meta;

type Story = StoryObj<typeof FileUploadArea>;

export const Default: Story = {
  args: {
  },

  render: args => ({
    components: { FileUploadArea },
    setup() {
      return { args };
    },
    template: `
      <FileUploadArea v-bind="args" />
    `,
  }),
};
