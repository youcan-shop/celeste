import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Button from '@/components/button/button.vue';
import Combobox from '@/components/combobox/combobox.vue';
import TextInputAffix from '../text-input-affix.vue';
import TextInputButton from '../text-input-button.vue';
import TextInput from '../text-input.vue';

const meta: Meta<typeof TextInput> = {
  title: 'Components/Input/Text Input',
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder text...',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputButton },
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
    components: { TextInput, TextInputAffix, TextInputButton },
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
    components: { TextInput, TextInputAffix, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px" size="md">
          <i class="i-celeste-user-6-line" />
        </TextInput>

        <TextInput v-bind="args" style="width: 300px" size="sm">
          <i class="i-celeste-user-6-line" />
        </TextInput>
        
        <TextInput v-bind="args" style="width: 300px" size="xs">
          <i class="i-celeste-user-6-line" />
        </TextInput>
      </div>
    `,
  }),
};

export const Affix: Story = {
  args: {
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputButton },
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
    components: { TextInput, TextInputAffix, TextInputButton },
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
            <TextInputAffix inline>
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
    components: { TextInput, TextInputAffix, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px">
          <template #leadingIcon>
            <i class="i-celeste-search-2-line"/>
          </template>

          <template #trailingInlineNode>
            <TextInputAffix asKbd>
              ⌘1
            </TextInputAffix>
          </template>
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
    components: { TextInput, TextInputAffix, TextInputButton },
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
    components: { TextInput, TextInputAffix, TextInputButton },
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
      </div>
    `,
  }),
};

export const WithButton: Story = {
  args: {
    placeholder: 'www.facebook.com',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputButton, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px">
          <template #leadingIcon>
            <i class="i-celeste-links-line" />
          </template>

          <template #trailingNode>
            <TextInputButton>
              <i class="i-celeste-file-copy-line" />
            </TextInputButton>
          </template>
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
    components: { TextInput, TextInputAffix, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px">
          <template #leadingIcon>
            <i class="i-celeste-lock-2-line" />
          </template>

          <template #trailingInlineNode>
            <TextInputButton>
              <i class="i-celeste-eye-line" />
            </TextInputButton>
          </template>
        </TextInput>
      </div>
    `,
  }),
};

export const Date: Story = {
  args: {
    type: 'date',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args" style="width: 300px">
          <template #leadingIcon>
            <i class="i-celeste-calendar-line" />
          </template>
        </TextInput>
      </div>
    `,
  }),
};

const OPTIONS = [
  { value: { id: 1 }, label: 'MAD', icon: 'i-celeste-bank-card-2-line' },
  { value: { id: 2 }, label: 'EUR', icon: 'i-celeste-bank-card-2-line' },
  { value: { id: 3 }, label: 'USD', icon: 'i-celeste-bank-card-2-line' },
];

export const WithLeadingCombobox: Story = {
  args: {
    placeholder: 'Search...',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputButton, Combobox },
    setup() {
      const model = ref();

      return { args, OPTIONS, model };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args">
          <template #trailingNode>
            <Combobox
              v-model="model"
              type="compact-input"
              :options="OPTIONS"
              value-by="id"
            />
          </template>
        </TextInput>
      </div>
    `,
  }),
};

export const WithTrailingCombobox: Story = {
  args: {
    placeholder: 'Search...',
  },

  render: args => ({
    components: { TextInput, TextInputAffix, TextInputButton, Combobox },
    setup() {
      const model = ref();

      return { args, OPTIONS, model };
    },
    template: `
      <div style="display: grid; gap: 20px; justify-content: center;">
        <TextInput v-bind="args">
          <template #leadingNode>
            <Combobox
              v-model="model"
              type="compact-input"
              :options="OPTIONS"
              value-by="id"
            />
          </template>
        </TextInput>
      </div>
    `,
  }),
};

function flag(color: string): string {
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="${color}"/></svg>`)}`;
}

const COUNTRIES = [
  { value: 'MA', label: 'Morocco (+212)', shortLabel: '+212', image: flag('#c1272d') },
  { value: 'FR', label: 'France (+33)', shortLabel: '+33', image: flag('#002654') },
  { value: 'US', label: 'United States (+1)', shortLabel: '+1', image: flag('#3c3b6e') },
];

export const Phone: Story = {
  args: {
    type: 'tel',
    placeholder: '610-101010',
  },

  render: args => ({
    components: { TextInput, Combobox },
    setup() {
      const country = ref(COUNTRIES[0]);
      const phone = ref('+212610101010');

      return { args, COUNTRIES, country, phone };
    },
    template: `
      <div style="display: grid; gap: 20px; width: 360px;">
        <TextInput v-for="size in ['md', 'sm', 'xs']" :key="size" v-bind="args" v-model="phone" :size="size">
          <template #leadingNode>
            <Combobox
              v-model="country"
              searchable
              :options="COUNTRIES"
              :size="size"
              value-by="value"
              label-by="shortLabel"
              type="compact-input"
            />
          </template>
        </TextInput>
      </div>
    `,
  }),
};
