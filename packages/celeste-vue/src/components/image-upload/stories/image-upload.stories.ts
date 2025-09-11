import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ImageUpload from '../image-upload.vue';

const meta: Meta<typeof ImageUpload> = {
  title: 'Components/ImageUpload',
  component: ImageUpload,
};

export default meta;

type Story = StoryObj<typeof ImageUpload>;

export const Default: Story = {
  args: {
  },

  render: args => ({
    components: { ImageUpload },
    setup() {
      return { args };
    },
    template: `
      <ImageUpload v-bind="args">
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
      </ImageUpload>
    `,
  }),
};
