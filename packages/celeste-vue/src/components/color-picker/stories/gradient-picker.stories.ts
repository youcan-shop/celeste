import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import GradientPicker from '../gradient-picker.vue';

const meta: Meta<typeof GradientPicker> = {
  title: 'Components/Gradient Picker',
  component: GradientPicker,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof GradientPicker>;

export const Default: Story = {
  render: () => ({
    components: { GradientPicker },
    setup() {
      const gradient = ref('linear-gradient(135deg, #3B82F6 0%, #EC4899 100%)');
      return { gradient };
    },
    template: `<div style="display: grid; width: 280px; gap: 8px;"><GradientPicker v-model="gradient" /><code>{{ gradient }}</code></div>`,
  }),
};

export const Empty: Story = {
  render: () => ({
    components: { GradientPicker },
    setup() {
      const gradient = ref('');
      return { gradient };
    },
    template: `<div style="display: grid; width: 280px; gap: 8px;"><GradientPicker v-model="gradient" /><code>{{ gradient }}</code></div>`,
  }),
};
