import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Badge from '@/components/badge/badge.vue';
import { Button } from '@/components/button';
import DropdownMenuContent from '../dropdown-menu-content.vue';
import DropdownMenuGroup from '../dropdown-menu-group.vue';
import DropdownMenuItem from '../dropdown-menu-item.vue';
import DropdownMenuLabel from '../dropdown-menu-label.vue';
import DropdownMenuSeparator from '../dropdown-menu-separator.vue';
import DropdownMenuSubContent from '../dropdown-menu-sub-content.vue';
import DropdownMenuSubTrigger from '../dropdown-menu-sub-trigger.vue';
import DropdownMenuSub from '../dropdown-menu-sub.vue';
import DropdownMenuTrigger from '../dropdown-menu-trigger.vue';
import DropdownMenu from '../dropdown-menu.vue';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown Menu',
  component: DropdownMenu,
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  args: {
  },

  render: args => ({
    components: {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuGroup,
      DropdownMenuItem,
      DropdownMenuSub,
      DropdownMenuSeparator,
      DropdownMenuSubTrigger,
      DropdownMenuTrigger,
      DropdownMenuSubContent,
      DropdownMenuLabel,
      Badge,
      Button,
    },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; align-items: center; justify-content: center; padding-top: 400px;">
        <DropdownMenu v-bind="args">
          <DropdownMenuTrigger>
            <Button intent="neutral" variant="stroke">
              <i class="i-celeste-more-line" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Activity
                <template #prefix>
                  <i class="i-celeste-pulse-line" />
                </template>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Integration
                <template #prefix>
                  <i class="i-celeste-layout-grid-line" />
                </template>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Settings
                  <template #prefix>
                    <i class="i-celeste-settings-3-line" />
                  </template>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    General
                    <template #prefix>
                      <i class="i-celeste-settings-3-line" />
                    </template>
                  </DropdownMenuItem>  
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                Account
              </DropdownMenuLabel>
              <DropdownMenuItem>
                Add Account
                <template #prefix>
                  <i class="i-celeste-add-line" />
                </template>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Logout
                <template #prefix>
                  <i class="i-celeste-logout-box-line" />
                </template>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    `,
  }),
};
