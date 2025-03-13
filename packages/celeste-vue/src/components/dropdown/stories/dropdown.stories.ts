import type { Meta, StoryObj } from '@storybook/vue3';
import Dropdown from '../dropdown.vue';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    placeholder: 'Select...',
    multiple: true,
  },

  render: args => ({
    components: { Dropdown },
    setup() {
      return { args };
    },
    template: `
      <Dropdown v-bind="args">
         <template #prefix>
           <i class="i-celeste-global-line" />
         </template>
      </Dropdown>
    `,
  }),
};
