import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components';
import Button from '@/components/button/button.vue';
import { ref } from 'vue';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '..';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    total: 100,
    itemsPerPage: 10,
    page: 1,
    siblingCount: 1,
    variant: 'basic',
  },

  render: args => ({
    components: {
      Pagination,
      PaginationContent,
      PaginationEllipsis,
      PaginationFirst,
      PaginationItem,
      PaginationLast,
      PaginationNext,
      PaginationPrevious,
      Button,
    },
    setup() {
      const page = ref(args.page || 1);

      return { args, page };
    },
    template: `
      <Pagination v-slot="{ page }" v-bind="args">
        <PaginationContent v-slot="{ items }">

          <PaginationFirst />
          <PaginationPrevious />

          <template v-for="(item, index) in items" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
            >
              {{ item.value }}
            </PaginationItem>
          </template>

          <PaginationEllipsis :index="4" />

          <PaginationNext />
          <PaginationLast />
        </PaginationContent>
      </Pagination>
    `,
  }),
};

export const WithLeadingAndTrailing: Story = {
  args: {
    page: 1,
    total: 100,
    itemsPerPage: 10,
    siblingCount: 1,
    variant: 'basic',
  },

  render: args => ({
    components: {
      Pagination,
      PaginationContent,
      PaginationEllipsis,
      PaginationFirst,
      PaginationItem,
      PaginationLast,
      PaginationNext,
      PaginationPrevious,
      Button,
      Select,
      SelectTrigger,
      SelectValue,
      SelectContent,
      SelectItem,
    },
    setup() {
      const page = ref(args.page || 1);

      return { args, page };
    },
    template: `
      <Pagination v-bind="args">
        <template #leading="{ page, pageCount }">
          <span style="font:var(--paragraph-sm);color:var(--color-text-sub-600);">Page {{ page }} of {{ pageCount }}</span>
        </template>

        <template #trailing="{ page }">
          <Select>
            <SelectTrigger size="xs" variant="default">
              <SelectValue placeholder="7 / page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 / page</SelectItem>
              <SelectItem value="10">10 / page</SelectItem>
              <SelectItem value="20">20 / page</SelectItem>
              <SelectItem value="50">50 / page</SelectItem>
            </SelectContent>
          </Select>
        </template>
        
        <template #default="{ page }">
          <PaginationContent v-slot="{ items }">

            <PaginationFirst />
            <PaginationPrevious />

            <template v-for="(item, index) in items" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === page"
              >
                {{ item.value }}
              </PaginationItem>
            </template>

            <PaginationEllipsis :index="4" />

            <PaginationNext />
            <PaginationLast />
          </PaginationContent>
        </template>
      </Pagination>
    `,
  }),
};
