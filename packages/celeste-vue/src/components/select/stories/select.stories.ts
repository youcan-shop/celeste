import type { Meta, StoryObj } from '@storybook/vue3';
import SelectContent from '../select-content.vue';
import SelectItemIcon from '../select-item-icon.vue';
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
    components: { Select, SelectValue, SelectTrigger, SelectItem, SelectItemIcon, SelectContent },
    setup() {
      return { args };
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger style="width: 300px;">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rent" disabled>
            <SelectItemIcon>
              <img src="https://images.icon-icons.com/2699/PNG/512/slack_tile_logo_icon_168820.png" alt="Slack" />
            </SelectItemIcon>
            Rent Payment
          </SelectItem>
          <SelectItem value="utility">
            <SelectItemIcon>
              <i class="i-celeste-flashlight-line" />
            </SelectItemIcon>
            Utility Payment</SelectItem>
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
