import type { Meta, StoryObj } from '@storybook/vue3';
import TabMenuItem from '../tab-menu-item.vue';
import TabMenuList from '../tab-menu-list.vue';
import TabMenu from '../tab-menu.vue';

const meta: Meta<typeof TabMenuItem> = {
  title: 'Components/TabMenuItem',
  component: TabMenuItem,
};

export default meta;

type Story = StoryObj<typeof TabMenuItem>;

export const Default: Story = {
  args: {
  },

  render: args => ({
    components: { TabMenu, TabMenuList, TabMenuItem },
    setup() {
      return { args };
    },
    template: `
    <div style="width: 240px; margin: 0 auto;">
      <TabMenu orientation="vertical" default-value="tab1">
        <TabMenuList>
          <TabMenuItem v-bind="args" value="tab1">
            <template #prefix>
              <i class="i-celeste-user-line" />
            </template>
            Profile Settings
          </TabMenuItem>
          <TabMenuItem v-bind="args" value="tab2">
            <template #prefix>
              <i class="i-celeste-contacts-book-line" />
            </template>
            Contact Information
          </TabMenuItem>
          <TabMenuItem v-bind="args" value="tab3">
            <template #prefix>
              <i class="i-celeste-share-line" />
            </template>
            Social Links
          </TabMenuItem>
        </TabMenuList>
      </TabMenu>
    </div>
    `,
  }),
};
