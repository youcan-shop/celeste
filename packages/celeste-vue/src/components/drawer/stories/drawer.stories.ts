import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from '@/components/button/button.vue';
import DrawerBody from '../drawer-body.vue';
import DrawerClose from '../drawer-close.vue';
import DrawerContent from '../drawer-content.vue';
import DrawerFooter from '../drawer-footer.vue';
import DrawerHeader from '../drawer-header.vue';
import DrawerTrigger from '../drawer-trigger.vue';
import Drawer from '../drawer.vue';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    side: { control: 'select', options: ['right', 'left', 'bottom', 'top'] },
  },
  args: { side: 'right' },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

const render: Story['render'] = args => ({
  components: { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerClose, Button },
  setup() {
    return { args, items: Array.from({ length: 24 }, (_, i) => `Item ${i + 1}`) };
  },
  template: `
    <Drawer v-bind="args">
      <DrawerTrigger as-child>
        <Button variant="stroke" intent="neutral">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader title="Virtual card" description="Manage the card and its recent transactions." icon="i-celeste-history-line" divider />
        <DrawerBody>
          <ul style="margin: 0; padding: 20px; display: grid; gap: 12px; list-style: none;">
            <li v-for="item in items" :key="item">{{ item }}</li>
          </ul>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose as-child>
            <Button intent="neutral" variant="stroke" style="flex: 1">Cancel</Button>
          </DrawerClose>
          <Button style="flex: 1">Continue</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  `,
});

export const Right: Story = { render };

export const Left: Story = { render, args: { side: 'left' } };

export const Bottom: Story = { render, args: { side: 'bottom' } };

export const Top: Story = { render, args: { side: 'top' } };

export const SmallHeader: Story = {
  render: args => ({
    components: { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerBody, Button },
    setup() {
      return { args };
    },
    template: `
      <Drawer v-bind="args">
        <DrawerTrigger as-child>
          <Button variant="stroke" intent="neutral">Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader title="Insert title here" icon="i-celeste-history-line" />
          <DrawerBody />
        </DrawerContent>
      </Drawer>
    `,
  }),
};
