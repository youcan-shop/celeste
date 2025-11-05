import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from '@/components/button/button.vue';
import ContentDivider from '@/components/content-divider/content-divider.vue';
import Label from '@/components/label/label.vue';
import TextInput from '@/components/text-input/text-input.vue';
import SheetClose from '../sheet-close.vue';
import SheetContent from '../sheet-content.vue';
import SheetDescription from '../sheet-description.vue';
import SheetFooter from '../sheet-footer.vue';
import SheetHeader from '../sheet-header.vue';
import SheetTitle from '../sheet-title.vue';
import SheetTrigger from '../sheet-trigger.vue';
import Sheet from '../sheet.vue';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
};

export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  args: {},

  render: args => ({
    components: {
      Sheet,
      SheetTrigger,
      SheetContent,
      SheetHeader,
      SheetTitle,
      SheetDescription,
      SheetFooter,
      SheetClose,
      Button,
      Label,
      TextInput,
      ContentDivider,
    },
    setup() {
      return { args };
    },
    template: `
      <Sheet v-bind="args">
        <SheetTrigger as-child>
          <Button variant="stroke" intent="neutral">
            <i class="i-celeste-user-settings-line" />
            Edit Profile
          </Button>
        </SheetTrigger>
        <SheetContent>
        
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          
          <ContentDivider />
          
          <div style="display: grid; gap: 16px; margin-top: 16px;">
            <div>
              <Label style="margin-bottom: 4px;">Name</Label>
              <TextInput placeholder="Dara" />
            </div>
            <div>
              <Label style="margin-bottom: 4px;">Email</Label>
              <TextInput type="email" placeholder="dara-@outlook.jp" />
            </div>
          </div>

          
          <SheetFooter style="margin-top: 16px;">
            <SheetClose as-child>
              <Button intent="neutral" variant="stroke">Cancel</Button>
            </SheetClose>
            <SheetClose as-child>
              <Button>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    `,
  }),
};
