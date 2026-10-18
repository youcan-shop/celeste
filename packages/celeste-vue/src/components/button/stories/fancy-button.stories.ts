import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import FancyButton from '../fancy-button.vue';

const meta: Meta<typeof FancyButton> = {
  title: 'Components/FancyButton',
  component: FancyButton,
};

export default meta;

type Story = StoryObj<typeof FancyButton>;

export const Default: Story = {
  args: {
    size: 'md',
    intent: 'primary',
  },

  render: args => ({
    components: { FancyButton },
    setup() {
      return { args };
    },
    template: `
      <FancyButton v-bind="args">
        Continue
        <i class="i-celeste-arrow-right-s-line"></i>
      </FancyButton>
    `,
  }),
};

export const Loading: Story = {
  args: {
    size: 'md',
    intent: 'primary',
  },

  render: args => ({
    components: { FancyButton },
    setup() {
      const loading = ref(false);

      function save(): void {
        loading.value = true;
        setTimeout(() => loading.value = false, 3000);
      }

      return { args, loading, save };
    },
    template: `
      <FancyButton v-bind="args" :loading="loading" @click="save">
        Save changes
        <i class="i-celeste-check-line"></i>
      </FancyButton>
    `,
  }),
};
