import type { Meta, StoryObj } from '@storybook/vue3';
import Tooltip from '../tooltip.vue';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    text: 'Tooltip text',
    position: 'right',
    size: 'lg',
    description: 'Insert tooltip description here. It would look much better as three lines of text.',
    dismissable: true,
  },

  render: args => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
    <div>
      <Tooltip v-bind="args">
         <template #tooltip-trigger>
            <i style="width: 20px; height: 20px;"  class="i-celeste-information-line" />
         </template>
      </Tooltip>
    </div>
    `,
  }),
};
