import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from '@/components/button/button.vue';
import Tooltip from '../tooltip.vue';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    title: 'Tooltip content.',
  },

  render: args => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; justify-content: center;">
        <Tooltip v-bind="args">
          <Button type="neutral" variant="stroke" size="xs">Hover or focus</Button>
        </Tooltip>
      </div>
    `,
  }),
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    title: 'Tooltip content.',
  },

  render: args => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; justify-content: center;">
        <Tooltip v-bind="args">
          <Button type="neutral" variant="stroke" size="xs">Hover or focus</Button>
        </Tooltip>
      </div>
    `,
  }),
};

export const Size: Story = {
  args: {
    title: 'Tooltip content.',
    disableHoverableContent: true,
  },

  render: args => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; justify-content: center;">
        <div style="display: flex; gap: 1em; width: fit-content;">
          <Tooltip v-bind="args" size="md">
            <Button type="neutral" variant="stroke" size="xs">Medium</Button>
          </Tooltip>
          <Tooltip v-bind="args">
            <Button type="neutral" variant="stroke" size="xs">Small (default)</Button>
          </Tooltip>
          <Tooltip v-bind="args" size="xs">
            <Button type="neutral" variant="stroke" size="xs">XSmall</Button>
          </Tooltip>
        </div>
      </div>
    `,
  }),
};

export const Position: Story = {
  args: {
    title: 'Tooltip content.',
    disableHoverableContent: true,
  },

  render: args => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; justify-content: center;">
        <div style="display: grid; gap: 1em; grid-template-columns: repeat(2, 1fr); width: fit-content;">
          <Tooltip v-bind="args" side="left">
            <Button type="neutral" variant="stroke" size="xs">Left</Button>
          </Tooltip>
          <Tooltip v-bind="args">
            <Button type="neutral" variant="stroke" size="xs">Top</Button>
          </Tooltip>
          <Tooltip v-bind="args" side="bottom">
            <Button type="neutral" variant="stroke" size="xs">Bottom</Button>
          </Tooltip>
          <Tooltip v-bind="args" side="right">
            <Button type="neutral" variant="stroke" size="xs">Right</Button>
          </Tooltip>
        </div>
      </div>
    `,
  }),
};

export const Description: Story = {
  args: {
    size: 'md',
    dismissible: true,
    icon: 'i-celeste-global-line',
    title: 'Content Title',
    description: 'Insert tooltip description here. It would look much better as three lines of text.',
  },

  render: args => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; justify-content: center;">
        <Tooltip v-bind="args" style="width: 270px;">
          <Button type="neutral" variant="stroke" size="xs">Hover or focus</Button>
        </Tooltip>
      </div>
    `,
  }),
};
