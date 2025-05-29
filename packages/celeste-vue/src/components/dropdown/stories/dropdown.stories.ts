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
    multiple: false,

    options: [
      { value: 1, label: 'Option 1', icon: 'i-celeste-globe-line' },
      { value: 2, label: 'Option 2', image: 'https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg' },
      { value: 3, label: 'Option 3', icon: 'i-celeste-information-line' },
    ],

    searchable: true,
    disabled: false,
    size: 'sm',

    badgeProps: {
      size: 'sm',
      variant: 'light',
      label: '3',
      state: 'information',
      type: 'basic',
    },

    type: 'compact-input',
    error: false,
  },

  render: args => ({
    components: { Dropdown },
    setup() {
      return { args };
    },
    template: `
    <div style="height: 50vh; width: 90vw; display: flex; align-items: center; justify-content: center;">
      <Dropdown v-model="" v-bind="args">
         <template #prefix>
           <i class="i-celeste-global-line" />
         </template>
      </Dropdown>
    </div>
    `,
  }),
};
