import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CompactButton from '@/components/button/compact-button.vue';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { ref } from 'vue';
import { Sidebar, SidebarContent, SidebarElement, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarSeparator, SidebarTrigger } from '../index';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Simple: Story = {
  args: {
    collapsible: 'icon',
  },

  parameters: {
    layout: 'fullscreen',
  },

  render: args => ({
    components: {
      SidebarProvider,
      Sidebar,
      SidebarHeader,
      SidebarElement,
      SidebarContent,
      SidebarGroup,
      SidebarGroupLabel,
      SidebarMenu,
      SidebarMenuItem,
      SidebarMenuButton,
      SidebarMenuAction,
      SidebarMenuBadge,
      SidebarMenuSub,
      SidebarMenuSubButton,
      SidebarMenuSubItem,
      SidebarSeparator,
      SidebarFooter,
      SidebarTrigger,
      Collapsible,
      CollapsibleContent,
      CollapsibleTrigger,
      DropdownMenu,
      DropdownMenuTrigger,
      DropdownMenuContent,
      DropdownMenuGroup,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      CompactButton,
    },
    setup() {
      const isInboxOpen = ref(true);

      return { args, isInboxOpen };
    },
    template: `
      <SidebarProvider>
        <Sidebar v-bind="args">
          <SidebarHeader>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarElement>
                  <i class="i-celeste-apps-line"></i>
                  <div class="flex flex-col">
                    <div style="font: var(--label-sm);color: var(--color-text-strong-950)">Ageeba</div>
                    <div style="font: var(--paragraph-xs);color: var(--color-text-sub-600)">ageeba.dotshop.com</div>
                  </div>
                  <CompactButton style="margin-inline-start: auto;" variant="stroke" size="md" icon="i-celeste-expand-up-down-line" />
                </SidebarElement>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
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
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Home"
                    as="a" 
                    href="#"
                  >
                    <i class="i-celeste-home-line" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <Collapsible v-model:open="isInboxOpen" as-child>
                  <SidebarMenuItem>
                    <CollapsibleTrigger as-child>
                      <SidebarMenuButton tooltip="Inbox">
                        <i class="i-celeste-inbox-line" />
                        <span>Inboxaaasasdasdasdkashduiashdoiajsasdashdiuashdiuahsdiuahsdiuhas</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge label="12" state="information" />
                      <SidebarMenuAction :show-on-hover="false"><i 
                        :class="isInboxOpen ? 'i-celeste-arrow-down-s-line' : 'i-celeste-arrow-right-s-line'" 
                        style="margin-left: auto; transition: transform var(--animation-fast);"
                      /></SidebarMenuAction>
                    </CollapsibleTrigger>
                  
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton as="a" href="#">
                            <span>All messages</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton is-active as="a" href="#">
                            <span>Unread</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton as="a" href="#">
                            <span>Important</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton as="a" href="#">
                            <span>Archived</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Another Inbox"
                    as="a" 
                    href="#"
                  >
                    <i class="i-celeste-inbox-line" />
                    <span>Another Inbox</span>
                  </SidebarMenuButton>

                  <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <SidebarMenuAction :show-on-hover="false">
                          <i class="i-celeste-more-2-fill"></i>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem>
                          Mark all as read
                          <template #prefix>
                            <i class="i-celeste-check-double-line" />
                          </template>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Archive inbox
                          <template #prefix>
                            <i class="i-celeste-archive-line" />
                          </template>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Search"
                    as="a" 
                    href="#"
                  >
                    <i class="i-celeste-search-line" />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Settings"
                    :isActive="true"
                    as="a" 
                    href="#"
                  >
                    <i class="i-celeste-settings-line" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton 
                        as="a" 
                        href="#"
                      >
                        <span>General</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton 
                        as="a" 
                        is-active
                        href="#"
                      >
                        <span>Team</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton 
                        as="a" 
                        href="#"
                      >
                        <span>Billing</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton 
                        as="a" 
                        href="#"
                      >
                        <span>Limits</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarSeparator />
          
          <SidebarFooter>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarElement>
                  <i class="i-celeste-user-line"></i>
                  <div class="flex flex-col">
                    <div style="font: var(--label-sm);color: var(--color-text-strong-950)">Dara</div>
                  </div>
                  <CompactButton style="margin-inline-start: auto;" variant="stroke" size="md" icon="i-celeste-more-2-fill" />
                </SidebarElement>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end">
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
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    `,
  }),
};
