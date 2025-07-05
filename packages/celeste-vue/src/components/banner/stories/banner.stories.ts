import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Banner from '../banner.vue';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    variant: 'fill',
    state: 'error',
    title: 'Insert your alert title here!',
    description: 'Insert your description here.',
    actionText: 'Upgrade',
    dismissible: true,
  },
  render: args => ({
    components: { Banner },
    setup() {
      return { args };
    },
    template: `
      <Banner v-bind="args">
      </Banner>
    `,
  }),
};