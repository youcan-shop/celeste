import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TextInput from '@/components/text-input/text-input.vue';
import {
  PopoverClose,
} from 'radix-vue';
import Button from '../../button/button.vue';
import PopoverContent from '../popover-content.vue';
import PopoverTrigger from '../popover-trigger.vue';
import Popover from '../popover.vue';

const meta: Meta<typeof PopoverContent> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The preferred side of the trigger to render against when open.',
    },
    sideOffset: {
      control: { type: 'number' },
      description: 'The distance in pixels from the trigger.',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'The preferred alignment against the trigger. May change when collisions occur.',
    },
    alignOffset: {
      control: { type: 'number' },
      description: 'An offset in pixels from the start or end alignment options.',
    },
    title: {
      control: { type: 'text' },
      description: 'The title text for the popover',
    },
    description: {
      control: { type: 'text' },
      description: 'The description text for the popover',
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon class name to display',
    },
    iconSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Size of the icon',
    },
    showTail: {
      control: { type: 'boolean' },
      description: 'Whether to show the arrow/tail',
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Whether to show the close button',
    },
  },
  args: {
    side: 'bottom',
    title: 'Popover Title',
    description: 'This is the popover description text.',
    align: 'center',
    alignOffset: 0,
    showTail: true,
    dismissible: true,
    iconSize: 'lg',
    icon: 'i-celeste-search-eye-line',
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {},
  render: args => ({
    components: { Popover, PopoverContent, PopoverTrigger, Button },
    setup() {
      return { args };
    },
    template: `
      <Popover>
        <PopoverTrigger>
          <Button variant="stroke" intent="neutral">
            Open Popover
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          v-bind="args"
        />
      </Popover>
    `,
  }),
};

export const WithIcon: Story = {
  args: {},
  render: args => ({
    components: { Popover, PopoverContent, PopoverTrigger, Button },
    setup() {
      return { args };
    },
    template: `
      <Popover v-bind="args">
        <PopoverTrigger>
          <Button variant="stroke" intent="neutral">
            Show Info
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          icon="i-celeste-star-line"
          title="Information" 
          description="This popover includes an icon to provide visual context for the message."
        />
      </Popover>
    `,
  }),
};

export const IconSizes: Story = {
  args: {},
  render: args => ({
    components: { Popover, PopoverContent, PopoverTrigger, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <Popover v-bind="args">
          <PopoverTrigger>
            <Button variant="stroke" intent="neutral">
              Small Icon
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            icon="i-celeste-star-line"
            icon-size="sm"
            title="Small Icon" 
            description="This popover has a small icon size."
          />
        </Popover>

        <Popover v-bind="args">
          <PopoverTrigger>
            <Button variant="stroke" intent="neutral">
              Medium Icon
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            icon="i-celeste-star-line"
            icon-size="md"
            title="Medium Icon" 
            description="This popover has a medium icon size."
          />
        </Popover>

        <Popover v-bind="args">
          <PopoverTrigger>
            <Button variant="stroke" intent="neutral">
              Large Icon
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            icon="i-celeste-star-line"
            icon-size="lg"
            title="Large Icon" 
            description="This popover has a large icon size."
          />
        </Popover>

        <Popover v-bind="args">
          <PopoverTrigger>
            <Button variant="stroke" intent="neutral">
              Extra Large
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            icon="i-celeste-star-line"
            icon-size="xl"
            title="Extra Large Icon" 
            description="This popover has an extra large icon size."
          />
        </Popover>

        <Popover v-bind="args">
          <PopoverTrigger>
            <Button variant="stroke" intent="neutral">
              Extra Extra Large
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            icon="i-celeste-star-line"
            icon-size="xxl"
            title="Extra Large Icon" 
            description="This popover has an extra large icon size."
          />
        </Popover>
      </div>
    `,
  }),
};

export const WithFooter: Story = {
  args: {},
  render: args => ({
    components: { Popover, PopoverContent, PopoverTrigger, Button },
    setup() {
      return { args };
    },
    template: `
      <Popover v-bind="args">
        <PopoverTrigger>
          <Button variant="stroke" intent="neutral">
            Show Actions
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          icon="i-celeste-error-warning-line"
          title="Confirm Action" 
          description="Are you sure you want to proceed with this action? This cannot be undone."
        >
          <template #footer>
            <div style="display: flex; gap: 8px; justify-content: flex-end; width: 100%;">
              <Button variant="stroke" intent="neutral">
                Cancel
              </Button>
              <Button variant="fill" intent="primary" type="button">
                Confirm
              </Button>
            </div>
          </template>
        </PopoverContent>
      </Popover>
    `,
  }),
};

export const NotDismissible: Story = {
  args: {},
  render: args => ({
    components: { Popover, PopoverContent, PopoverTrigger, Button },
    setup() {
      return { args };
    },
    template: `
      <Popover v-bind="args">
        <PopoverTrigger>
          <Button variant="stroke" intent="neutral">
            No Close Button
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          :dismissible="false"
          icon="i-celeste-search-line"
          title="Non-dismissible" 
          description="This popover doesn't have a close button. Click outside to close."
        />
      </Popover>
    `,
  }),
};

export const NoTail: Story = {
  args: {},
  render: args => ({
    components: { Popover, PopoverContent, PopoverTrigger, Button },
    setup() {
      return { args };
    },
    template: `
      <Popover v-bind="args">
        <PopoverTrigger>
          <Button variant="stroke" intent="neutral">
            No Tail
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          :show-tail="false"
          icon="i-celeste-notification-line"
          title="Clean Look" 
          description="This popover has no arrow/tail for a cleaner appearance."
        />
      </Popover>
    `,
  }),
};

export const Positioning: Story = {
  args: {},
  render: args => ({
    components: { Popover, PopoverContent, PopoverTrigger, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); place-items: center; grid-column-gap: 0px; grid-gap: var(--spacing-8)">
        <div />
        <Popover v-bind="args" style="grid-column-start: 2;">
          <PopoverTrigger>
            <Button variant="stroke" intent="neutral" style="width: 100%;">
              Top
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            side="top"
            title="Top Position" 
            description="This popover appears above the trigger."
          />
        </Popover>

        <div />
        <Popover v-bind="args" style="grid-column-start: 3; grid-row-start: 2;">
          <PopoverTrigger>
            <Button variant="stroke" intent="neutral" style="width: 100%;">
              Left
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            side="left"
            title="Left Position" 
            description="This popover appears to the left of the trigger."
          />
        </Popover>

        <div />
        <Popover v-bind="args" style="grid-column-start: 2; grid-row-start: 3;">
          <PopoverTrigger>
            <Button variant="stroke" intent="neutral" style="width: 100%;">
              Right
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            side="right"
            title="Right Position" 
            description="This popover appears to the right of the trigger."
          />
        </Popover>

        <div />
        <Popover v-bind="args" style="grid-column-start: 1; grid-row-start: 2;">
          <PopoverTrigger>
            <Button variant="stroke" intent="neutral" style="width: 100%;">
              Bottom
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            side="bottom"
            title="Bottom Position" 
            description="This popover appears below the trigger (default)."
          />
        </Popover>
      </div>
    `,
  }),
};

export const CustomContent: Story = {
  args: {},
  render: args => ({
    components: { Popover, PopoverContent, PopoverTrigger, Button, TextInput, PopoverClose },
    setup() {
      return { args };
    },
    template: `
      <Popover>
        <PopoverTrigger>
          <Button variant="stroke" intent="neutral">
            Custom Form
          </Button>
        </PopoverTrigger>
        <PopoverContent :dismissible="false">
          <div style="padding: var(--spacing-16)">
            <h3 style="margin: var(--spacing-0) var(--spacing-0) var(--spacing-8); font: var(--title-h6-title)">
              Subscribe to Newsletter
            </h3>
            <p style="margin: var(--spacing-0) var(--spacing-0) var(--spacing-8); font: var(--paragraph-sm); color: var(--color-text-sub-600);">
              Get the latest updates delivered to your inbox.
            </p>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-12);">
              <TextInput placeholder="hey@email.com" type="email" size="sm" id="email" style="width: 100%; margin-block: var(--spacing-8);" />
              <div style="display: flex; gap: var(--spacing-8);">
                <Button variant="fill" intent="primary" style="flex: 1;">
                  Subscribe
                </Button>
                <PopoverClose as="div">
                  <Button variant="stroke" intent="neutral" style="flex: 1;">
                    Maybe Later
                  </Button>
                </PopoverClose>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    `,
  }),
};
