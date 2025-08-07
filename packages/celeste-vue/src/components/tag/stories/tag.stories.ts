import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Tag from '../tag.vue';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: args => ({
    components: { Tag },
    setup() {
      return { args };
    },
    template: `
      <Tag v-bind="args">
      Hi
      </Tag>
    `,
  }),
};
