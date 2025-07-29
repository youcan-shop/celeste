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
      <div style="display: flex; align-items: center; justify-content: center;">
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
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Integration
                  <template #prefix>
                    <i class="i-celeste-layout-grid-line" />
                  </template>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem  as="a" href="https://github.com" target="_blank">
                    Github
                    <template #prefix>
                      <i class="i-celeste-github-line" />
                    </template>
                  </DropdownMenuItem>  
                  <DropdownMenuItem  as="a" href="https://google.com" target="_blank">
                    Google Sheets
                    <template #prefix>
                      <i class="i-celeste-google-line" />
                    </template>
                  </DropdownMenuItem>  
                  <DropdownMenuItem as="a" href="https://slack.com" target="_blank">
                    Slack
                    <template #prefix>
                      <i class="i-celeste-slack-line" />
                    </template>
                  </DropdownMenuItem>  
                  <DropdownMenuItem  as="a" href="https://whatsapp.com" target="_blank">
                    WhatsApp
                    <template #prefix>
                      <i class="i-celeste-whatsapp-line" />
                    </template>
                  </DropdownMenuItem>  
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>
                Settings
                <template #prefix>
                  <i class="i-celeste-settings-3-line" />
                </template>
              </DropdownMenuItem>
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

export const WithSuffix: Story = {
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
      const badgeProps = {
        size: 'md',
        variant: 'lighter',
        label: '1.0.0',
        state: 'feature',
        type: 'basic',
      };

      return { args, badgeProps };
    },
    template: `
      <div style="display: flex; align-items: center; justify-content: center; padding-bottom: 300px;">
        <DropdownMenu v-bind="args">
          <DropdownMenuTrigger>
            <Button intent="neutral" variant="stroke">
              <i class="i-celeste-more-line" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Origins
                <template #suffix>
                  <Badge v-bind="badgeProps" />
                </template>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Help
                <template #prefix>
                  <i class="i-celeste-question-line" />
                </template>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Gallery Manager
                <template #prefix>
                  <i class="i-celeste-multi-image-line" />
                </template>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard Shortcuts
                <template #prefix>
                  <i class="i-celeste-keyboard-line" />
                </template>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Edit Theme Content
                <template #prefix>
                  <i class="i-celeste-global-line" />
                </template>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    `,
  }),
};
