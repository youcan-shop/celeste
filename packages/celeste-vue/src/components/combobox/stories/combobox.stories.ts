import type { Meta, StoryObj } from '@storybook/vue3';
import Combobox from '../combobox.vue';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  args: {
  },

  render: args => ({
    components: { Combobox },
    setup() {
      return { args };
    },
    template: `
      <Combobox v-bind="args">
         <template #prefix>
           <i class="i-celeste-information-line" />
         </template>
      </Combobox>
    `,
  }),
};
