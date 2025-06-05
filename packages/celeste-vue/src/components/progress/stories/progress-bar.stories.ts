import type { Meta, StoryObj } from '@storybook/vue3';
import ProgressBar from '../progress-bar.vue';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Progress Bar',
  component: ProgressBar,
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    percentage: true,
    layout: 'default',
    title: 'Data Storage',
    modelValue: 60,
  },

  render: args => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <ProgressBar v-bind="args">
         <template #description>
            Upgrade to unlock unlimited date storage.
         <template>
      </ProgressBar>
    `,
  }),
};
