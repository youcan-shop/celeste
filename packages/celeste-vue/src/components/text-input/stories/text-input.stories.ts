import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TextInputAffix from '../text-input-affix.vue';
import TextInputButton from '../text-input-button.vue';
import TextInputIcon from '../text-input-icon.vue';
import TextInput from '../text-input.vue';

const meta: Meta<typeof TextInput> = {
  title: 'Components/Text Input',
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder text...',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputIcon, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 10px; width: 300px;">
        <TextInput v-bind="args" style="width: 100%" />
      </div>
    `,
  }),
};

export const Icon: Story = {
  args: {
    placeholder: 'Placeholder text...',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputIcon, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px">
          <template #leadingIcon>
            <i class="i-celeste-user-6-line" />
          </template>
        </TextInput>

        <TextInput v-bind="args" style="width: 300px">
          <template #trailingIcon>
            <i class="i-celeste-user-6-line" />
          </template>
        </TextInput>
      </div>
    `,
  }),
};

export const Size: Story = {
  args: {
    placeholder: 'Placeholder text...',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputIcon, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px" size="md">
          <TextInputIcon icon="i-celeste-user-6-line" />
        </TextInput>

        <TextInput v-bind="args" style="width: 300px" size="sm">
          <TextInputIcon icon="i-celeste-user-6-line" />
        </TextInput>
        
        <TextInput v-bind="args" style="width: 300px" size="xs">
          <TextInputIcon icon="i-celeste-user-6-line" />
        </TextInput>
      </div>
    `,
  }),
};

export const Affix: Story = {
  args: {
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputIcon, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" placeholder="www.example.com">
          <template #leadingNode>
           <TextInputAffix>https://</TextInputAffix>
          </template>
        </TextInput>

        <TextInput v-bind="args" placeholder="example">
          <template #trailingNode>
            <TextInputAffix>@gmail.com</TextInputAffix>
          </template>
        </TextInput>
      </div>
    `,
  }),
};

export const InlineAffix: Story = {
  args: {
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputIcon, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px" placeholder="0.00">
          <template #leadingInlineNode>
            <TextInputAffix inline>
              €
            </TextInputAffix>
          </template>
        </TextInput>
        <TextInput v-bind="args" style="width: 300px" placeholder="0.00">
          <template #trailingInlineNode>
            <TextInputAffix variant="suffix" inline>
              €
            </TextInputAffix>
          </template>
        </TextInput>
      </div>
    `,
  }),
};

export const WithKbd: Story = {
  args: {
    placeholder: 'Search...',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputIcon, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px">
          <TextInputIcon icon="i-celeste-search-2-line" />
          <TextInputAffix variant="suffix" asKbd>
            ⌘1
          </TextInputAffix>
        </TextInput>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Placeholder text...',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputIcon, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px">
          <TextInputIcon icon="i-celeste-user-6-line" />
        </TextInput>
      </div>
    `,
  }),
};

export const HasError: Story = {
  args: {
    hasError: true,
    placeholder: 'Placeholder text...',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputIcon, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px">
          <TextInputIcon icon="i-celeste-user-6-line" />
        </TextInput>
      </div>
    `,
  }),
};

export const WithButton: Story = {
  args: {
    placeholder: 'www.facebook.com',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputIcon, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px">
          <TextInputIcon icon="i-celeste-links-line" />
          <TextInputButton>
            <i class="i-celeste-file-copy-line" />
          </TextInputButton>
        </TextInput>
      </div>
    `,
  }),
};

export const WithInlineButton: Story = {
  args: {
    type: 'password',
    placeholder: '••••••••••',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputIcon, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px">
          <TextInputIcon icon="i-celeste-lock-2-line" />
          <TextInputButton inline>
            <i class="i-celeste-eye-line" />
          </TextInputButton>
        </TextInput>
      </div>
    `,
  }),
};
