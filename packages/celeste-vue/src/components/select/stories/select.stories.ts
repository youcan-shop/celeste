import type { Meta, StoryObj } from '@storybook/vue3';
import SelectContent from '../select-content.vue';
import SelectGroup from '../select-group.vue';
import SelectItemIcon from '../select-item-icon.vue';
import SelectItem from '../select-item.vue';
import SelectLabel from '../select-label.vue';
import SelectSeparator from '../select-separator.vue';
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
    components: { Select, SelectValue, SelectTrigger, SelectSeparator, SelectLabel, SelectGroup, SelectItem, SelectItemIcon, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger style="width: 300px;">
          <SelectValue placeholder="Select">
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Products</SelectLabel>
            <SelectItem value="rent">
              <SelectItemIcon>
                <i class="i-celeste-home-4-line" />
              </SelectItemIcon>
              Rent Payment
            </SelectItem>
            <SelectItem value="utility">
              <SelectItemIcon>
                <i class="i-celeste-flashlight-line" />
              </SelectItemIcon>
              Utility Payment
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="Donation">
            <SelectItemIcon>
              <i class="i-celeste-hand-coin-line" />
            </SelectItemIcon>
            Donation
          </SelectItem>
          <SelectItem value="tax" disabled>
            <SelectItemIcon>
              <i class="i-celeste-file-list-2-line" />
            </SelectItemIcon>
            Tax Payment
          </SelectItem>
          <SelectItem value="tuition">
            <SelectItemIcon>
              <i class="i-celeste-building-line" />
            </SelectItemIcon>
            Tuition Fee
          </SelectItem>
          <SelectSeparator />
          <SelectItem value="phone">
            <SelectItemIcon>
              <i class="i-celeste-smartphone-line" />
            </SelectItemIcon>
            Phone Bill
          </SelectItem>
        </SelectContent>
      </Select>
    `,
  }),
};
