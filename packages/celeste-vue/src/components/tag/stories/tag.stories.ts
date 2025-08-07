import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Tag from '../tag.vue';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['stroke', 'gray'],
      description: 'Visual variant of the tag',
    },
    dismissable: {
      control: { type: 'boolean' },
      description: 'Whether the tag can be dismissed with a close button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the tag is in a disabled state',
    },
    class: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply',
    },
    onDismiss: {
      action: 'dismiss',
      description: 'Event emitted when the dismiss button is clicked',
    },
  },
  args: {
    variant: 'stroke',
    dismissable: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {},
  render: args => ({
    components: { Tag },
    setup() {
      return { args };
    },
    template: `
      <Tag v-bind="args">
        Tag
      </Tag>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <Tag variant="stroke">Stroke Variant</Tag>
        <Tag variant="gray">Gray Variant</Tag>
      </div>
    `,
  }),
};

export const Dismissable: Story = {
  render: args => ({
    components: { Tag },
    setup() {
      function handleDismiss(): void {};
      return { args, handleDismiss };
    },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <Tag variant="stroke" dismissable @dismiss="handleDismiss">Dismissable Stroke</Tag>
        <Tag variant="gray" dismissable @dismiss="handleDismiss">Dismissable Gray</Tag>
      </div>
    `,
  }),
  args: {
    dismissable: true,
  },
};

export const Disabled: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <Tag disabled variant="stroke">Disabled Stroke</Tag>
        <Tag disabled variant="gray">Disabled Gray</Tag>
        <Tag disabled dismissable variant="stroke">Disabled Dismissable</Tag>
      </div>
    `,
  }),
};

export const TagList: Story = {
  render: () => ({
    components: { Tag },
    setup() {
      const tags = ref([
        { id: 1, text: 'Facebook' },
        { id: 2, text: 'Google Analytics' },
        { id: 3, text: 'Snap' },
        { id: 4, text: 'TikTok' },
      ]);

      const removeTag = (id: number): void => {
        tags.value = tags.value.filter(tag => tag.id !== id);
      };

      return { tags, removeTag };
    },
    template: `
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; min-height: 32px;">
        <Tag
          v-for="tag in tags"
          :key="tag.id"
          :variant="tag.variant"
          dismissable
          @dismiss="removeTag(tag.id)"
        >
          {{ tag.text }}
        </Tag>
      </div>
    `,
  }),
};
