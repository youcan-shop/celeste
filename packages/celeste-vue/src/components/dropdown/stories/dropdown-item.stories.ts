import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DropdownItem from '../dropdown-item.vue';

const meta: Meta<typeof DropdownItem> = {
  title: 'Components/DropdownItem Item',
  component: DropdownItem,
};

export default meta;

type Story = StoryObj<typeof DropdownItem>;

export const Default: Story = {
  args: {
    label: 'Label',
    sublabel: '(optional)',
    description: 'Descriptions',
  },

  render: args => ({
    components: { DropdownItem },
    setup() {
      return { args };
    },
    template: `
      <DropdownItem v-bind="args">
         <template #prefix>
           <i class="i-celeste-information-line" />
         </template>
      </DropdownItem>
    `,
  }),
};
