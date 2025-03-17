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

    options: [
      { value: 1, label: 'Option 1', icon: 'i-celeste-globe-line' },
      { value: 2, label: 'Option 2', image: 'https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg' },
      { value: 3, label: 'Option 3', icon: 'i-celeste-information-line' },
    ],

    searchable: false,
    disabled: false,
    size: 'sm',
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
