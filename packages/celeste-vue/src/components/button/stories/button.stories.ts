import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Button from '../button.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    size: 'md',
    intent: 'primary',
  },

  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        Continue
        <i class="i-celeste-arrow-right-s-line"></i>
      </Button>
    `,
  }),
};

export const IconOnly: Story = {
  args: {
    size: 'sm',
    intent: 'neutral',
    variant: 'stroke',
  },

  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        <i class="i-celeste-translate"></i>
      </Button>
    `,
  }),
};

export const Loading: Story = {
  args: {
    size: 'md',
    intent: 'primary',
  },

  render: args => ({
    components: { Button },
    setup() {
      const loading = ref(false);

      function save(): void {
        loading.value = true;
        setTimeout(() => loading.value = false, 3000);
      }

      return { args, loading, save };
    },
    template: `
      <Button v-bind="args" :loading="loading" @click="save">
        Save changes
        <i class="i-celeste-check-line"></i>
      </Button>
    `,
  }),
};
