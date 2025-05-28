import type { Meta, StoryObj } from '@storybook/vue3';
import PopoverContent from '../popover-content.vue';
import PopoverTrigger from '../popover-trigger.vue';
import Popover from '../popover.vue';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {},

  render: args => ({
    components: { Popover, PopoverContent, PopoverTrigger },
    setup() {
      return { args };
    },
    template: `
      <Popover v-bind="args" style="margin: 0 auto;">
        <PopoverTrigger>
          Trigger
        </PopoverTrigger>
        <PopoverContent title="Hello" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, corporis ex. Atque nihil ipsum ratione aspernatur excepturi consequuntur laboriosam minus, dignissimos iure voluptatum. Quam nisi explicabo assumenda quia. Facilis, error.">
          
        </PopoverContent>
      </Popover>
    `,
  }),
};
