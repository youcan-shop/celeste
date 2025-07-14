import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Slider from '../slider.vue';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    max: 100,
    step: 1,
  },

  render: args => ({
    components: { Slider },
    setup() {
      const value = ref([50]);
      return { args, value };
    },
    template: `
      <Slider v-model="value" v-bind="args" />
    `,
  }),
};
