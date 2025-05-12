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
    options: [
      { value: { id: 1 }, label: 'Durward Reynolds', sublabel: 'Teacher' },
      { value: { id: 2 }, label: 'Kenton Towne', icon: 'i-celeste-globe-line' },
      { value: { id: 3 }, label: 'Therese Wunsch', sublabel: 'Engineer' },
      { value: { id: 4 }, label: 'Benedict Kessler', image: 'https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg' },
      { value: { id: 5 }, label: 'Katelyn Rohan' },
      { value: { id: 6 }, label: 'Kenton Towne', icon: 'i-celeste-globe-line' },
      { value: { id: 7 }, label: 'Kenton Towne', icon: 'i-celeste-globe-line' },
      { value: { id: 8 }, label: 'Kenton Towne', icon: 'i-celeste-globe-line' },
      { value: { id: 9 }, label: 'Kenton Towne', icon: 'i-celeste-globe-line' },
      { value: { id: 10 }, label: 'Kenton Towne', icon: 'i-celeste-globe-line' },
      { value: { id: 11 }, label: 'Kenton Towne', icon: 'i-celeste-globe-line' },
      { value: { id: 12 }, label: 'Kenton Towne', icon: 'i-celeste-globe-line' },
    ],
    valueBy: 'id',
  },

  render: args => ({
    components: { Combobox },
    setup() {
      return { args };
    },
    template: `
      <Combobox v-bind="args">
         
      </Combobox>
    `,
  }),
};
