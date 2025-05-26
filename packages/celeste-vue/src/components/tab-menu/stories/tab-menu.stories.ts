// TabMenu.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import TabMenuContent from '../tab-menu-content.vue';
import TabMenuItem from '../tab-menu-item.vue';
import TabMenuList from '../tab-menu-list.vue';
import TabMenu from '../tab-menu.vue';

const meta: Meta<typeof TabMenu> = {
  title: 'Components/Tab Menu',
  component: TabMenu,
};

export default meta;
type Story = StoryObj<typeof TabMenu>;

export const Horizontal: Story = {
  render: () => ({
    components: { TabMenu, TabMenuList, TabMenuItem, TabMenuContent },
    template: `
      <TabMenu default-value="tab1" orientation="horizontal">
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
        
        <TabMenuContent value="tab1">
          <div style="padding: 20px;">Profile content here...</div>
        </TabMenuContent>
        <TabMenuContent value="tab2">
          <div style="padding: 20px;">Contact content here...</div>
        </TabMenuContent>
        <TabMenuContent value="tab3">
          <div style="padding: 20px;">Links content here...</div>
        </TabMenuContent>
      </TabMenu>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    components: { TabMenu, TabMenuList, TabMenuItem, TabMenuContent },
    template: `
      <TabMenu default-value="tab1" orientation="vertical" style="height: 300px;">
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
        
        <TabMenuContent value="tab1">
          <div style="padding: 20px;">Dashboard content...</div>
        </TabMenuContent>
        <TabMenuContent value="tab2">
          <div style="padding: 20px;">Settings content...</div>
        </TabMenuContent>
      </TabMenu>
    `,
  }),
};

export const WithPrefixAndPostfix: Story = {
  render: () => ({
    components: { TabMenu, TabMenuList, TabMenuItem, TabMenuContent },
    template: `
      <TabMenu default-value="tab1">
        <TabMenuList>
          <TabMenuItem value="tab1">
            <template #prefix><i class="i-celeste-home" /></template>
            Dashboard
            <template #postfix><span style="font-size: 12px; opacity: 0.6;">⌘1</span></template>
          </TabMenuItem>
          <TabMenuItem value="tab2">
            <template #prefix><i class="i-celeste-settings" /></template>
            Settings
            <template #postfix><i class="i-celeste-close" style="width: 14px; height: 14px;" /></template>
          </TabMenuItem>
        </TabMenuList>
        
        <TabMenuContent value="tab1">Dashboard content</TabMenuContent>
        <TabMenuContent value="tab2">Settings content</TabMenuContent>
      </TabMenu>
    `,
  }),
};
