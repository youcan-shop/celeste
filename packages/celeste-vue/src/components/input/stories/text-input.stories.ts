import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TextInput from '../text-input.vue';

const meta: Meta<typeof TextInput> = {
  title: 'Components/Text input',
  component: TextInput,
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    type: 'basic',
  },

  render: args => ({
    components: { TextInput },
    setup() {
      return { args };
    },
    template: `
      <TextInput v-bind="args">
         <template #prefix>
           <i style="display: flex; align-items: center; justify-content: center; color: inherit" class="i-celeste-user-6-line" />
         </template>
         <template #suffix>
           <i style="display: flex; align-items: center; justify-content: center; color: inherit" class="i-celeste-information-line" />
         </template>
      </TextInput>
    `,
  }),
};
