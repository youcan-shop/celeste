import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import ContextMenuItem from '../context-menu-item.vue';

const meta: Meta<typeof ContextMenuItem> = {
  title: 'Components/Context Menu Item',
  component: ContextMenuItem,
};

export default meta;

type Story = StoryObj<typeof ContextMenuItem>;

export const Default: Story = {
  args: {
    label: 'Label',
    sublabel: '(Sublabel)',
    description: 'Descriptions',
    size: 'lg',
    badgeProps: {
      size: 'md',
      variant: 'light',
      label: 'Badge',
      state: 'information',
      type: 'basic',
    },
    buttonProps: {
      type: 'primary',
    },
    shortcut: '⌘ ⇧ Z',
    rightIcon: 'i-celeste-arrow-right-s-line',
  },

  render: args => ({
    components: { ContextMenuItem },
    setup() {
      const selected = ref(false);
      return { args, selected };
    },
    template: `
      <ContextMenuItem v-bind="args" v-model:selected="selected">
         <template #prefix>
           <i class="i-celeste-global-line" />
         </template>
         <template #button-label>
           Button
         </template>
      </ContextMenuItem>
    `,
  }),
};
