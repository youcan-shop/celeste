import type { Meta, StoryObj } from '@storybook/vue3';
import LinkButton from '../link-button.vue';

const meta: Meta<typeof LinkButton> = {
  title: 'Components/LinkButton',
  component: LinkButton,
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  render: args => ({
    components: { LinkButton },
    setup() {
      return { args };
    },
    template: `
      <LinkButton target="self" href="https://google.com" v-bind="args">
        Link Button Text
        <i i-celeste-arrow-right-s-line />
      </LinkButton>
    `,
  }),
};
