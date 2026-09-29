import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from '@/components/button/button.vue';
import DialogBody from '../dialog-body.vue';
import DialogClose from '../dialog-close.vue';
import DialogContent from '../dialog-content.vue';
import DialogFooter from '../dialog-footer.vue';
import DialogHeader from '../dialog-header.vue';
import DialogTrigger from '../dialog-trigger.vue';
import Dialog from '../dialog.vue';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  args: { breakpoint: 640 },
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
            Resize the viewport below the breakpoint to get a bottom drawer.
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
