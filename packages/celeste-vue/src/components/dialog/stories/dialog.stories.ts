import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from '@/components/button/button.vue';
import DialogBody from '../dialog-body.vue';
import DialogClose from '../dialog-close.vue';
import DialogContent from '../dialog-content.vue';
import DialogDescription from '../dialog-description.vue';
import DialogFooter from '../dialog-footer.vue';
import DialogHeader from '../dialog-header.vue';
import DialogTitle from '../dialog-title.vue';
import DialogTrigger from '../dialog-trigger.vue';
import Dialog from '../dialog.vue';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    breakpoint: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl'] },
  },
  args: { breakpoint: 'sm' },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: args => ({
    components: { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogClose, Button },
    setup() {
      return { args };
    },
    template: `
      <Dialog v-bind="args">
        <DialogTrigger>
          <Button variant="stroke" intent="neutral">Open dialog</Button>
        </DialogTrigger>
        <DialogContent style="width: 440px">
          <DialogHeader title="Virtual card" description="Manage the card and its recent transactions." icon="i-celeste-history-line" />
          <DialogBody>
            Below the breakpoint this is a bottom drawer. The content style applies to the modal only.
          </DialogBody>
          <DialogFooter>
            <DialogClose>
              <Button intent="neutral" variant="stroke" style="flex: 1">Cancel</Button>
            </DialogClose>
            <Button style="flex: 1">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
};

export const CustomHeader: Story = {
  render: args => ({
    components: { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogBody, Button },
    setup() {
      return { args };
    },
    template: `
      <Dialog v-bind="args">
        <DialogTrigger>
          <Button variant="stroke" intent="neutral">Open dialog</Button>
        </DialogTrigger>
        <DialogContent style="width: 440px">
          <DialogBody>
            <DialogTitle>Delete the card?</DialogTitle>
            <DialogDescription>The card stops working at once.</DialogDescription>
          </DialogBody>
        </DialogContent>
      </Dialog>
    `,
  }),
};
