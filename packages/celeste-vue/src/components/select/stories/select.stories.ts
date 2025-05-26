import type { Meta, StoryObj } from '@storybook/vue3';
import SelectContent from '../select-content.vue';
import SelectItem from '../select-item.vue';
import SelectTrigger from '../select-trigger.vue';
import SelectValue from '../select-value.vue';
import Select from '../select.vue';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {

  },

  render: args => ({
    components: { Select, SelectValue, SelectTrigger, SelectItem, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger>
          <SelectValue placeholder="Select your favorite fruit.." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="kiwi">Kiwi</SelectItem>
        </SelectContent>
      </Select>
    `,
  }),
};
