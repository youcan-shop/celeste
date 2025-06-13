import type { Meta, StoryObj } from '@storybook/vue3-vite';
import LinkButton from '../../button/link-button.vue';
import Alert from '../alert.vue';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    dismissable: true,
    size: 'lg',
    state: 'success',
    variant: 'stroke',
  },

  render: args => ({
    components: { Alert, LinkButton },
    setup() {
      return { args };
    },
    template: `
      <Alert v-bind="args">
        <template #title>Payment received</template>
        <template #description>You have received a new payment from your-mom@gmail.com, don't spend it all in one place.</template>
        <template #primary>
          <LinkButton :underline="true" type="black" size="md">View transaction</LinkButton>
        </template>
        <template #secondary>
          <LinkButton type="gray" size="md">Ignore</LinkButton>
        </template>
      </Alert>
    `,
  }),
};

export const Information: Story = {
  args: {
    size: 'sm',
    state: 'information',
    variant: 'fill',
  },

  render: args => ({
    components: { Alert, LinkButton },
    setup() {
      return { args };
    },
    template: `
      <Alert v-bind="args">
        <template #title>Information</template>
        <template #primary>
          <LinkButton type="white" size="md">Got it</LinkButton>
        </template>
      </Alert>
    `,
  }),
};

export const Error: Story = {
  args: {
    dismissable: true,
    size: 'lg',
    state: 'error',
    variant: 'lighter',
  },

  render: args => ({
    components: { Alert, LinkButton },
    setup() {
      return { args };
    },
    template: `
      <Alert v-bind="args">
        <template #title>Error occurred</template>
        <template #description>Something went wrong while processing your request. Please try again.</template>
        <template #primary>
          <LinkButton type="error" size="md">Retry</LinkButton>
        </template>
        <template #secondary>
          <LinkButton type="gray" size="md">Cancel</LinkButton>
        </template>
      </Alert>
    `,
  }),
};
