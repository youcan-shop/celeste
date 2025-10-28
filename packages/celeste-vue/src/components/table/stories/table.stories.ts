import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Badge from '../../badge/badge.vue';
import TableBody from '../table-body.vue';
import TableCaption from '../table-caption.vue';
import TableCell from '../table-cell.vue';
import TableEmpty from '../table-empty.vue';
import TableFooter from '../table-footer.vue';
import TableHead from '../table-head.vue';
import TableHeader from '../table-header.vue';
import TableRow from '../table-row.vue';
import Table from '../table.vue';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

export const Default: Story = {
  render: args => ({
    components: {
      Table,
      TableBody,
      TableCaption,
      TableCell,
      TableFooter,
      TableHead,
      TableHeader,
      TableRow,
      Badge,
    },
    setup() {
      return { args, invoices };
    },
    template: `
      <Table v-bind="args">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead end>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow hoverable v-for="invoice in invoices" :key="invoice.invoice">
            <TableCell>{{ invoice.invoice }}</TableCell>
            <TableCell>{{ invoice.paymentStatus }}</TableCell>
            <TableCell>{{ invoice.paymentMethod }}</TableCell>
            <TableCell end>{{ invoice.totalAmount }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    `,
  }),
};

export const Empty: Story = {
  render: args => ({
    components: {
      Table,
      TableBody,
      TableEmpty,
      TableHead,
      TableHeader,
      TableRow,
    },
    setup() {
      return { args };
    },
    template: `
      <Table v-bind="args">
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableEmpty colspan="4">
            No results found.
          </TableEmpty>
        </TableBody>
      </Table>
    `,
  }),
};
