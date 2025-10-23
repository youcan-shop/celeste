import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Sonner from '@/components/sonner/sonner.vue';
import { toast } from '@/utils/sonner';
import { ref, watch } from 'vue';
import FileUploadArea, { type FileError } from '../file-upload-area.vue';
import 'vue-sonner/style.css';

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

export const CustomTriggerHandler: Story = {
  args: {
    multiple: true,
  },

  render: args => ({
    components: { FileUploadArea, Sonner },
    setup() {
      const files = ref([]);

      watch(files, (newValue) => {
        // eslint-disable-next-line no-console
        console.log('v-model changed:', newValue);
      });

      function handleTriggerClick(): void {
        toast('Upload trigger clicked!');
      };

      function handleError(error: FileError): void {
        console.error(error);
      };

      return { args, files, handleError, handleTriggerClick };
    },
    template: `
    <div class="sonner-story-container">
      <Sonner position="top-center" />
      <FileUploadArea v-bind="args" v-model="files" @error="handleError" @triggerClick="handleTriggerClick" />
    </div>
    `,
  }),
};
