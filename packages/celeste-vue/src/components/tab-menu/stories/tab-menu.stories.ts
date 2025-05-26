import type { Meta, StoryObj } from '@storybook/vue3';
import HintText from '../../hint-text/hint-text.vue';
import TabMenuContent from '../tab-menu-content.vue';
import TabMenuItem from '../tab-menu-item.vue';
import TabMenuList from '../tab-menu-list.vue';
import TabMenu from '../tab-menu.vue';

const meta: Meta<typeof TabMenu> = {
  title: 'Components/Tab Menu',
  component: TabMenu,
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tab menu',
    },
    defaultValue: {
      control: 'text',
      description: 'The default active tab',
    },
  },
  args: {
    orientation: 'horizontal',
    dir: 'ltr',
    defaultValue: 'tab1',
  },
};

export default meta;
type Story = StoryObj<typeof TabMenu>;

export const Default: Story = {
  render: args => ({
    components: { TabMenu, TabMenuList, TabMenuItem, TabMenuContent, HintText },
    setup() {
      return { args };
    },
    template: `
      <TabMenu v-bind="args" style="width: 600px; margin: 0 auto;">
        <TabMenuList>
          <TabMenuItem value="tab1">
            <template #prefix>
              <i class="i-celeste-user-line" />
            </template>
            Profile Settings
          </TabMenuItem>
          <TabMenuItem value="tab2">
            <template #prefix>
              <i class="i-celeste-contacts-book-line" />
            </template>
            Contact Information
          </TabMenuItem>
          <TabMenuItem value="tab3">
            <template #prefix>
              <i class="i-celeste-settings-line" />
            </template>
            Preferences
          </TabMenuItem>
        </TabMenuList>
        
        <TabMenuContent value="tab1">
          <div style="padding: 20px;">
            <HintText text="Profile Settings tab content" />
          </div>
        </TabMenuContent>
        <TabMenuContent value="tab2">
          <div style="padding: 20px;">
            <HintText text="Contact Information tab content" />
          </div>
        </TabMenuContent>
        <TabMenuContent value="tab3">
          <div style="padding: 20px;">
            <HintText text="Preferences tab content" />
          </div>
        </TabMenuContent>
      </TabMenu>
    `,
  }),
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    defaultValue: 'dashboard',
  },
  render: args => ({
    components: { TabMenu, TabMenuList, TabMenuItem, TabMenuContent, HintText },
    setup() {
      return { args };
    },
    template: `
      <TabMenu v-bind="args" style="width: 500px; margin: 0 auto;">
        <TabMenuList>
          <TabMenuItem value="dashboard">
            <template #prefix>
              <i class="i-celeste-dashboard-line" />
            </template>
            Dashboard
          </TabMenuItem>
          <TabMenuItem value="analytics">
            <template #prefix>
              <i class="i-celeste-bar-chart-line" />
            </template>
            Analytics
          </TabMenuItem>
          <TabMenuItem value="reports">
            <template #prefix>
              <i class="i-celeste-file-chart-line" />
            </template>
            Reports
          </TabMenuItem>
        </TabMenuList>
        
        <TabMenuContent value="dashboard">
          <div style="padding: 24px; text-align: center;">
            <HintText text="Dashboard tab content" />
          </div>
        </TabMenuContent>
        <TabMenuContent value="analytics">
          <div style="padding: 24px; text-align: center;">
            <HintText text="Detailed tab content" />
          </div>
        </TabMenuContent>
        <TabMenuContent value="reports">
          <div style="padding: 24px; text-align: center;">
            <HintText text="Generated tab content" />
          </div>
        </TabMenuContent>
      </TabMenu>
    `,
  }),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    defaultValue: 'general',
  },
  render: args => ({
    components: { TabMenu, TabMenuList, TabMenuItem, TabMenuContent, HintText },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; height: 300px; width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
        <TabMenu v-bind="args">
          <TabMenuList style="width: 240px; border-right: 1px solid #e0e0e0;">
            <TabMenuItem value="general">
              <template #prefix>
                <i class="i-celeste-settings-line" />
              </template>
              General
            </TabMenuItem>
            <TabMenuItem value="security">
              <template #prefix>
                <i class="i-celeste-shield-line" />
              </template>
              Security
            </TabMenuItem>
            <TabMenuItem value="notifications">
              <template #prefix>
                <i class="i-celeste-notification-line" />
              </template>
              Notifications
            </TabMenuItem>
          </TabMenuList>
          
          <TabMenuContent value="general" style="flex: 1;">
            <div style="padding: 24px;">
              <HintText text="General settings tab contents" />
            </div>
          </TabMenuContent>
          <TabMenuContent value="security" style="flex: 1;">
            <div style="padding: 24px;">
              <HintText text="Security settings tab content" />
            </div>
          </TabMenuContent>
          <TabMenuContent value="notifications" style="flex: 1;">
            <div style="padding: 24px;">
              <HintText text="Notification preferences tab content" />
            </div>
          </TabMenuContent>
        </TabMenu>
      </div>
    `,
  }),
};
