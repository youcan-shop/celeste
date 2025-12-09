import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ScrollBar from '@/components/scroll-area/scroll-bar.vue';
import ScrollArea from '../scroll-area.vue';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  args: {},

  render: args => ({
    components: { ScrollArea },
    setup() {
      return { args };
    },
    template: `
      <ScrollArea v-bind="args" style="height: 200px; width: 350px; border: 1px solid #e5e7eb; border-radius: 6px; padding: 8px;">
        <div style="padding-right: 16px;">
          <h4 style="margin-bottom: 16px; font-size: 14px; font-weight: 500;">Tags</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div v-for="tag in tags" :key="tag" style="font-size: 14px;">
              {{ tag }}
            </div>
          </div>
        </div>
      </ScrollArea>
    `,
    data() {
      return {
        tags: Array.from({ length: 50 }).map(
          (_, i, a) => `v1.2.0-beta.${a.length - i}`,
        ),
      };
    },
  }),
};

export const VerticalScroll: Story = {
  args: {},

  render: args => ({
    components: { ScrollArea },
    setup() {
      return { args };
    },
    template: `
      <ScrollArea v-bind="args" style="height: 300px; width: 450px; border: 1px solid #e5e7eb; border-radius: 6px; padding: 8px;">
        <div style="display: flex; flex-direction: column; gap: 16px; padding-right: 16px;">
          <div v-for="item in items" :key="item.id" style="border-radius: 8px; background-color: #f9fafb; padding: 8px;">
            <h3 style="font-weight: 600; font-size: 14px; margin-bottom: 8px;">{{ item.title }}</h3>
            <p style="font-size: 14px; color: #6b7280;">{{ item.description }}</p>
          </div>
        </div>
      </ScrollArea>
    `,
    data() {
      return {
        items: Array.from({ length: 20 }).map((_, i) => ({
          id: i + 1,
          title: `Item ${i + 1}`,
          description: 'This is a sample description for the scroll area item. It demonstrates vertical scrolling.',
        })),
      };
    },
  }),
};

export const HorizontalScroll: Story = {
  args: {},

  render: args => ({
    components: { ScrollArea },
    setup() {
      return { args };
    },
    template: `
      <ScrollArea v-bind="args" style="width: 600px; white-space: nowrap; border: 1px solid #e5e7eb; border-radius: 6px;">
        <div style="display: flex; width: max-content; gap: 16px; padding: 8px;">
          <div v-for="item in items" :key="item" style="flex-shrink: 0;">
            <div style="height: 150px; width: 150px; border-radius: 6px; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 14px; font-weight: 500;">{{ item }}</span>
            </div>
          </div>
        </div>
      </ScrollArea>
    `,
    data() {
      return {
        items: Array.from({ length: 15 }).map((_, i) => `Card ${i + 1}`),
      };
    },
  }),
};

export const BothDirections: Story = {
  args: {},

  render: args => ({
    components: { ScrollArea },
    setup() {
      return { args };
    },
    template: `
      <ScrollArea v-bind="args" style="height: 400px; width: 500px; border: 1px solid #e5e7eb; border-radius: 6px;">
        <div style="padding: 8px;">
          <table style="width: max-content;">
            <thead>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <th v-for="col in columns" :key="col" style="padding: 8px 16px; text-align: left; font-size: 14px; font-weight: 500;">
                  {{ col }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rows" :key="row" style="border-bottom: 1px solid #e5e7eb;">
                <td v-for="col in columns" :key="col" style="padding: 8px 16px; font-size: 14px;">
                  Cell {{ row }}-{{ col }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollArea>
    `,
    data() {
      return {
        columns: Array.from({ length: 10 }).map((_, i) => `Column ${i + 1}`),
        rows: Array.from({ length: 30 }).map((_, i) => i + 1),
      };
    },
  }),
};

export const LongContent: Story = {
  args: {},

  render: args => ({
    components: { ScrollArea },
    setup() {
      return { args };
    },
    template: `
      <ScrollArea v-bind="args" style="height: 500px; width: 700px; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px;">
        <div style="padding-right: 16px;">
          <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Lorem Ipsum</h1>
          <p v-for="i in 15" :key="i" style="margin-bottom: 16px; line-height: 1.6;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
        </div>
      </ScrollArea>
    `,
  }),
};

export const CustomStyling: Story = {
  args: {},

  render: args => ({
    components: { ScrollArea, ScrollBar },
    setup() {
      return { args };
    },
    template: `
      <ScrollArea v-bind="args" style="height: 250px; width: 400px; border-radius: 8px; border: 2px solid #c7d2fe; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 12px; background: linear-gradient(to bottom right, #eff6ff, #eef2ff);">
        <div style="display: flex; flex-direction: column; gap: 12px; padding-right: 16px;">
          <div v-for="n in 20" :key="n" style="border-radius: 6px; background-color: white; padding: 12px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);">
            <p style="font-size: 14px; font-weight: 500; color: #312e81;">Custom styled item {{ n }}</p>
          </div>
        </div>
      </ScrollArea>
    `,
  }),
};
