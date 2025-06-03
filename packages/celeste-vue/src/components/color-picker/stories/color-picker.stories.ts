import type { Meta, StoryObj } from '@storybook/vue3';
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
  args: {},
  render: (args: Story['args']) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('#00F');
      return { args, color };
    },
    template: `
      {{ color }}
      <ColorPicker v-model="color" />
    `,
  }),
};
