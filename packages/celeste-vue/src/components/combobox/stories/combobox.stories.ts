import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Combobox from '../combobox.vue';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const OPTIONS = [
  { value: { id: 1 }, label: 'Durward Reynolds', sublabel: 'Teacher' },
  { value: { id: 2 }, label: 'Kenton Towne', icon: 'i-celeste-globe-line' },
  { value: { id: 3 }, label: 'Therese Wunsch', sublabel: 'Engineer' },
  { value: { id: 4 }, label: 'Benedict Kessler', image: 'https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg' },
  { value: { id: 5 }, label: 'Katelyn Rohan' },
  { value: { id: 6 }, label: 'Lily Marissa', icon: 'i-celeste-globe-line' },
  { value: { id: 7 }, label: 'Maya San Eleine', sublabel: 'Writer', icon: 'i-celeste-bookmark-fill' },
  { value: { id: 8 }, label: 'Rami Kent' },
  { value: { id: 9 }, label: 'Goerge Dan', icon: 'i-celeste-sticky-note-line' },
  { value: { id: 10 }, label: 'Remus Down' },
];

export const Default: Story = {
  args: {
    options: OPTIONS,
    valueBy: 'id',
    placeholder: 'Select a person',
  },

  render: args => ({
    components: { Combobox },
    setup() {
      const selectedValue = ref();

      return { args, selectedValue };
    },
    template: `
      <div>
        <Combobox v-bind="args" v-model="selectedValue" />
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
          <strong>Selected:</strong> {{ selectedValue ? selectedValue.label : 'None' }}
          <br>
          <strong>Value:</strong> {{ selectedValue ? JSON.stringify(selectedValue.value) : 'None' }}
        </div>
      </div>
    `,
  }),
};

export const Multiple: Story = {
  args: {
    options: OPTIONS,
    valueBy: 'id',
    placeholder: 'Select multiple people',
    multiple: true,
  },

  render: args => ({
    components: { Combobox },
    setup() {
      const selectedValues = ref([]);

      return { args, selectedValues };
    },
    template: `
      <div>
        <Combobox v-bind="args" v-model="selectedValues" />
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
          <strong>Selected ({{ selectedValues.length }}):</strong>
          <ul v-if="selectedValues.length > 0" style="margin: 4px 0; padding-left: 20px;">
            <li v-for="item in selectedValues" :key="item.value.id">
              {{ item.label }} (ID: {{ item.value.id }})
            </li>
          </ul>
          <span v-else>None</span>
        </div>
      </div>
    `,
  }),
};

export const Searchable: Story = {
  args: {
    options: OPTIONS,
    valueBy: 'id',
    placeholder: 'Search and select',
    searchable: true,
  },

  render: args => ({
    components: { Combobox },
    setup() {
      const selectedValue = ref();

      return { args, selectedValue };
    },
    template: `
      <div>
        <Combobox v-bind="args" v-model="selectedValue" />
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
          <strong>Selected:</strong> {{ selectedValue ? selectedValue.label : 'None' }}
        </div>
      </div>
    `,
  }),
};

export const Inline: Story = {
  args: {
    options: OPTIONS,
    valueBy: 'id',
    type: 'inline',
    placeholder: 'Inline style',
  },

  render: args => ({
    components: { Combobox },
    setup() {
      const selectedValue = ref();

      return { args, selectedValue };
    },
    template: `
      <div>
        <Combobox v-bind="args" v-model="selectedValue" />
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
          <strong>Selected:</strong> {{ selectedValue ? selectedValue.label : 'None' }}
        </div>
      </div>
    `,
  }),
};

export const Compact: Story = {
  args: {
    options: OPTIONS,
    valueBy: 'id',
    type: 'compact',
    placeholder: 'Compact style',
  },

  render: args => ({
    components: { Combobox },
    setup() {
      const selectedValue = ref();

      return { args, selectedValue };
    },
    template: `
      <div>
        <Combobox v-bind="args" v-model="selectedValue" />
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
          <strong>Selected:</strong> {{ selectedValue ? selectedValue.label : 'None' }}
        </div>
      </div>
    `,
  }),
};

export const CompactInput: Story = {
  args: {
    options: OPTIONS,
    valueBy: 'id',
    type: 'compact-input',
    placeholder: 'Compact input style',
  },

  render: args => ({
    components: { Combobox },
    setup() {
      const selectedValue = ref();

      return { args, selectedValue };
    },
    template: `
      <div>
        <Combobox v-bind="args" v-model="selectedValue" />
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
          <strong>Selected:</strong> {{ selectedValue ? selectedValue.label : 'None' }}
        </div>
      </div>
    `,
  }),
};

export const WithBadge: Story = {
  args: {
    options: OPTIONS,
    valueBy: 'id',
    placeholder: 'Select with badge',
    badgeProps: {
      label: 'New',
      variant: 'fill',
    },
  },

  render: args => ({
    components: { Combobox },
    setup() {
      const selectedValue = ref();

      return { args, selectedValue };
    },
    template: `
      <div>
        <Combobox v-bind="args" v-model="selectedValue" />
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
          <strong>Selected:</strong> {{ selectedValue ? selectedValue.label : 'None' }}
        </div>
      </div>
    `,
  }),
};

export const Preselected: Story = {
  args: {
    options: OPTIONS,
    valueBy: 'id',
    placeholder: 'Preselected option',
  },

  render: args => ({
    components: { Combobox },
    setup() {
      const selectedValue = ref(OPTIONS[2]);

      return { args, selectedValue };
    },
    template: `
      <div>
        <Combobox v-bind="args" v-model="selectedValue" />
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
          <strong>Selected:</strong> {{ selectedValue ? selectedValue.label : 'None' }}
        </div>
      </div>
    `,
  }),
};
