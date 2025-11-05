import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CompactButton from '@/components/button/compact-button.vue';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/dropdown-menu';
import SidebarMenuBadge from '@/components/sidebar/sidebar-menu-badge.vue';
import { ref } from 'vue';
import { Sidebar, SidebarContent, SidebarElement, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarSeparator, SidebarTrigger } from '..';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Simple: Story = {
  parameters: {
    layout: 'fullscreen',
  },

  args: {},

  render: args => ({
    components: {
      CompactButton,
      Collapsible,
      CollapsibleContent,
      CollapsibleTrigger,
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuGroup,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
      Sidebar,
      SidebarContent,
      SidebarElement,
      SidebarFooter,
      SidebarGroup,
      SidebarGroupLabel,
      SidebarHeader,
      SidebarMenu,
      SidebarMenuAction,
      SidebarMenuButton,
      SidebarMenuItem,
      SidebarMenuSub,
      SidebarMenuSubButton,
      SidebarMenuSubItem,
      SidebarProvider,
      SidebarSeparator,
      SidebarMenuBadge,
      SidebarTrigger,
    },
    setup() {
      // Track which items are expanded
      const expandedItems = ref<Record<string, boolean>>({
        Orders: true,
        Products: false,
        Upsells: false,
        Coupons: false,
        Customers: false,
        Store: true,
        Insights: false,
        Invoices: false,
      });

      const sidebarItems = [
        {
          title: 'Dashboard',
          link: '#',
          icon: 'i-celeste-dashboard-line',
        },
        {
          title: 'Orders',
          link: '#',
          icon: 'i-celeste-shopping-bag-line',
          children: [
            { title: 'All orders', link: '#' },
            { title: 'New order', link: '#' },
            { title: 'Abandoned carts', link: '#' },
          ],
        },
        {
          title: 'Products',
          link: '#',
          icon: 'i-celeste-shopping-cart-line',
          children: [
            { title: 'All products', link: '#' },
            { title: 'New product', link: '#' },
            { title: 'Categories', link: '#' },
            { title: 'Reviews', link: '#' },
            { title: 'Inventory', link: '#' },
          ],
        },
        {
          title: 'Upsells',
          link: '#',
          icon: 'i-celeste-arrow-up-line',
          children: [
            { title: 'All upsells', link: '#' },
            { title: 'New upsell', link: '#' },
          ],
        },
        {
          title: 'Coupons',
          link: '#',
          icon: 'i-celeste-coupon-line',
          children: [
            { title: 'All coupons', link: '#' },
            { title: 'New coupon', link: '#' },
          ],
        },
        {
          title: 'Customers',
          link: '#',
          icon: 'i-celeste-group-line',
          children: [
            { title: 'All customers', link: '#' },
            { title: 'New customer', link: '#' },
          ],
        },
        {
          title: 'Store',
          link: '#',
          icon: 'i-celeste-store-line',
          children: [
            { title: 'Theme', link: '#' },
            { title: 'Themes', link: '#' },
            { title: 'Menus', link: '#' },
            { title: 'Languages', link: '#' },
            { title: 'Pages', link: '#' },
            { title: 'Funnels', link: '#' },
            { title: 'Domains', link: '#' },
          ],
        },
        {
          title: 'Insights',
          link: '#',
          icon: 'i-celeste-bar-chart-line',
        },
        {
          title: 'Invoices',
          link: '#',
          icon: 'i-celeste-file-list-line',
        },
        {
          title: 'Apps',
          link: '#',
          icon: 'i-celeste-apps-line',
        },
      ];

      const footerItems = [
        {
          title: 'Affiliate',
          link: '#',
          icon: 'i-celeste-service-line',
        },
        {
          title: 'Support',
          link: '#',
          icon: 'i-celeste-question-line',
        },
        {
          title: 'Settings',
          link: '#',
          icon: 'i-celeste-settings-line',
        },
      ];

      return {
        expandedItems,
        sidebarItems,
        footerItems,
        args,
      };
    },
    template: `
      <SidebarProvider>
        <Sidebar collapsible="icon" side="end" v-bind="args">
          <SidebarHeader>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarElement>
                  <i class="i-celeste-apps-line" />
                  <div class="flex flex-col">
                    <div style="color: var(--color-text-strong-950);font: var(--label-sm)">
                      Ageeba
                    </div>
                    <div style="color: var(--color-text-sub-600);font: var(--paragraph-xs)">
                      ageeba.dotshop.com
                    </div>
                  </div>
                  <CompactButton
                    style="margin-inline-start: auto;"
                    variant="stroke"
                    size="md"
                    icon="i-celeste-expand-up-down-line"
                  />
                </SidebarElement>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Stores</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Dotshop
                    <template #prefix>
                      <i class="i-celeste-building-line" />
                    </template>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Dawg
                    <template #prefix>
                      <i class="i-celeste-building-line" />
                    </template>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Create a new store
                  <template #prefix>
                    <i class="i-celeste-add-line" />
                  </template>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarHeader>

          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarMenu>
                <template v-for="item in sidebarItems" :key="item.title">
                  <SidebarMenuItem v-if="!item.children">
                    <SidebarMenuButton
                      as="a"
                      :href="item.link"
                    >
                      <i :class="item.icon" />
                      <span>{{ item.title }}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <Collapsible
                    v-else
                    v-model:open="expandedItems[item.title]"
                    as-child
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger as-child>
                        <SidebarMenuButton :is-active="item.title === 'Store'">
                          <i :class="item.icon" />
                          <span>{{ item.title }}</span>
                          </SidebarMenuButton>
                          <SidebarMenuBadge size="sm" v-if="item.title === 'Store'" label="New" state="information" />
                      </CollapsibleTrigger>
                      <SidebarMenuAction>
                        <i class="i-celeste-arrow-right-s-line"/>
                      </SidebarMenuAction>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem v-for="child in item.children" :key="child.title">
                            <SidebarMenuSubButton
                              as="a"
                              :href="child.link"
                              :is-active="child.title === 'Themes'"
                            >
                              <span>{{ child.title }}</span>
                              </SidebarMenuSubButton>
                              <SidebarMenuBadge size="sm" v-if="child.title === 'Themes'" label="New" state="information" />
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </template>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup style="margin-block-start: auto;">
              <SidebarGroupLabel>Other</SidebarGroupLabel>
              <SidebarMenu>
                <template v-for="item in footerItems" :key="item.title">
                  <SidebarMenuButton
                    as="a"
                    :href="item.link"
                  >
                    <i :class="item.icon" />
                    <span>{{ item.title }}</span>
                  </SidebarMenuButton>
                </template>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />

          <SidebarFooter>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarElement>
                  <i class="i-celeste-user-line" />
                  <div class="flex flex-col">
                    <div style="color: var(--color-text-strong-950);font: var(--label-sm)">
                      Dara
                    </div>
                  </div>
                  <CompactButton
                    style="margin-inline-start: auto;"
                    variant="stroke"
                    size="md"
                    icon="i-celeste-more-2-fill"
                  />
                </SidebarElement>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                    <template #prefix>
                      <i class="i-celeste-user-line" />
                    </template>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <template #prefix>
                      <i class="i-celeste-settings-line" />
                    </template>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Billing
                    <template #prefix>
                      <i class="i-celeste-bank-card-line" />
                    </template>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                  <template #prefix>
                    <i class="i-celeste-logout-box-line" />
                  </template>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <div style="padding: 24px;">
          <SidebarTrigger />
        <div>
      </SidebarProvider>
    `,
  }),
};
