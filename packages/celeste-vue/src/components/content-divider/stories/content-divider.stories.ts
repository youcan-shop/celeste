import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from '../../button/button.vue';
import ContentDivider from '../content-divider.vue';

const meta: Meta<typeof ContentDivider> = {
  title: 'Components/Content Divider',
  component: ContentDivider,
};

export default meta;

type Story = StoryObj<typeof ContentDivider>;

export const Default: Story = {
  args: {
    text: 'Content divider',
  },

  render: args => ({
    components: { ContentDivider, Button },
    setup() {
      return { args };
    },
    template: `
    <ContentDivider v-bind="args">
  <template #groupButtons>
    <Button size="xxs">
      <i class="i-celeste-arrow-left-s-line"></i>
    </Button>
    <Button size="xxs">
      <i class="i-celeste-arrow-right-s-line"></i>
    </Button>
  </template>
</ContentDivider>
    `,
  }),
};
