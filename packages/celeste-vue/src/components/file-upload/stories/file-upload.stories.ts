import type { Meta, StoryObj } from '@storybook/vue3-vite';
import FileUploadInput from '../file-upload-input.vue';
import FileUploadOutput from '../file-upload-output.vue';
import FileUpload from '../file-upload.vue';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
  },

  render: args => ({
    components: { FileUpload, FileUploadInput },
    setup() {
      return { args };
    },
    template: `
      <FileUpload v-bind="args">
        <FileUploadInput>
          <template #icon>
            <i class="i-celeste-upload-cloud-2-line" />
          </template>
          <template #trigger>
            Select image
          </template>
          <template #description>
            JPEG, PNG, PDF, and MP4 formats, up to 2 MB.
          </template>
          <template #changeButton>
            Change image
          </template>
        </FileUploadInput>
      </FileUpload>
    `,
  }),
};

export const OutputSmall: Story = {
  args: {
  },

  render: args => ({
    components: { FileUpload, FileUploadInput, FileUploadOutput },
    setup() {
      return { args };
    },
    template: `
      <FileUpload v-bind="args">
        <FileUploadInput>
          <template #icon>
            <i class="i-celeste-upload-cloud-2-line" />
          </template>
          <template #trigger>
            Select image
          </template>
          <template #description>
            JPEG, PNG, PDF, and MP4 formats, up to 2 MB.
          </template>
          <template #changeButton>
            Change image
          </template>
        </FileUploadInput>
      </FileUpload>
    `,
  }),
};

export const OutputXSmall: Story = {
  args: {
  },

  render: args => ({
    components: { FileUpload, FileUploadInput, FileUploadOutput },
    setup() {
      return { args };
    },
    template: `
      <FileUpload v-bind="args">
        <FileUploadInput>
          <template #icon>
            <i class="i-celeste-upload-cloud-2-line" />
          </template>
          <template #trigger>
            Select image
          </template>
          <template #description>
            JPEG, PNG, PDF, and MP4 formats, up to 2 MB.
          </template>
          <template #changeButton>
            Change image
          </template>
        </FileUploadInput>
      </FileUpload>
    `,
  }),
};
