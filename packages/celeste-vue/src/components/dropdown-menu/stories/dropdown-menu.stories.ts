import type { Meta, StoryObj } from '@storybook/vue3';
import Badge from '@/components/badge/badge.vue';
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
    },
    setup() {
      const badgeProps = {
        size: 'md',
        variant: 'light',
        label: 'Info',
        state: 'information',
        type: 'basic',
      };

      return { args, badgeProps };
    },
    template: `
      <DropdownMenu v-bind="args">
         <DropdownMenuTrigger>
      trigger
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuGroup>
        <DropdownMenuItem label="Item 1" sublabel="(sublabel)" description="wei@alignui.com">
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem label="Item 2">
        <template #prefix>
        <i class="i-celeste-home-4-line" />
        </template>
        </DropdownMenuItem>
        <DropdownMenuItem label="Item 3" disabled>
          <template #prefix>
             <i class="i-celeste-global-line" />
          </template>
        </DropdownMenuItem>
        <DropdownMenuItem label="Item 4">
        <template #suffix>
           <Badge v-bind="badgeProps" />
        </template>
        </DropdownMenuItem label="Item 4">
        
        <DropdownMenuSeparator />

        <DropdownMenuLabel>
        Label
        </DropdownMenuLabel>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Item 5
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem label="Sub Item 1" sublabel="(sublabel)">
              Sub Item 1
            </DropdownMenuItem>
            <DropdownMenuItem label="Sub Item 2">
              Sub Item 2
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuGroup>
    </DropdownMenuContent>
      </DropdownMenu>
    `,
  }),
};
