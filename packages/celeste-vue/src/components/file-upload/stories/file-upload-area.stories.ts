import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, watch } from 'vue';
import FileUploadArea, { type FileError } from '../file-upload-area.vue';

const meta: Meta<typeof FileUploadArea> = {
  title: 'Components/File Upload',
  component: FileUploadArea,
};

export default meta;

type Story = StoryObj<typeof FileUploadArea>;

export const Default: Story = {
  args: {
    multiple: true,
  },

  render: args => ({
    components: { FileUploadArea },
    setup() {
      const files = ref([]);

      watch(files, (newValue) => {
        // eslint-disable-next-line no-console
        console.log('v-model changed:', newValue);
      });
      function handleError(error: FileError): void {
        console.error(error);
      };

      return { args, files, handleError };
    },
    template: `
      <FileUploadArea v-bind="args" v-model="files" @error="handleError" />
    `,
  }),
};
