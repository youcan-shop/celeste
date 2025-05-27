import type { Meta, StoryObj } from '@storybook/vue3';
import TextArea from '../textarea.vue';

const meta: Meta<typeof TextArea> = {
  title: 'Components/Text Area',
  component: TextArea,
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
  },

  render: args => ({
    components: { TextArea },
    setup() {
      return { args };
    },
    template: `
      <TextArea v-bind="args">
         <template #prefix>
           <i style="display: flex; align-items: center; justify-content: center; color: inherit" class="i-celeste-user-6-line" />
         </template>
         <template #suffix>
           <i style="display: flex; align-items: center; justify-content: center; color: inherit" class="i-celeste-information-line" />
         </template>
      </TextArea>
    `,
  }),
};
