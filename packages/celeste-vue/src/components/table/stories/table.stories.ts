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
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="invoice in invoices" :key="invoice.invoice">
            <TableCell>{{ invoice.invoice }}</TableCell>
            <TableCell>{{ invoice.paymentStatus }}</TableCell>
            <TableCell>{{ invoice.paymentMethod }}</TableCell>
            <TableCell>{{ invoice.totalAmount }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    `,
  }),
};

export const WithFooter: Story = {
  render: args => ({
    components: {
      Table,
      TableBody,
      TableCell,
      TableFooter,
      TableHead,
      TableHeader,
      TableRow,
    },
    setup() {
      return { args, invoices };
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
          <TableRow v-for="invoice in invoices" :key="invoice.invoice">
            <TableCell>{{ invoice.invoice }}</TableCell>
            <TableCell>{{ invoice.paymentStatus }}</TableCell>
            <TableCell>{{ invoice.paymentMethod }}</TableCell>
            <TableCell>{{ invoice.totalAmount }}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colspan="3">Total</TableCell>
            <TableCell>$2,250.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    `,
  }),
};

export const WithBadges: Story = {
  render: args => ({
    components: {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
      Badge,
    },
    setup() {
      const getStatusBadgeProps = (status: string): { state: string; label: string } => {
        switch (status) {
          case 'Paid':
            return { state: 'success', label: 'Paid' };
          case 'Pending':
            return { state: 'warning', label: 'Pending' };
          case 'Unpaid':
            return { state: 'error', label: 'Unpaid' };
          default:
            return { state: 'information', label: status };
        }
      };

      return { args, invoices, getStatusBadgeProps };
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
          <TableRow v-for="invoice in invoices" :key="invoice.invoice">
            <TableCell>{{ invoice.invoice }}</TableCell>
            <TableCell>
              <Badge 
                v-bind="getStatusBadgeProps(invoice.paymentStatus)"
                size="sm"
                variant="fill"
                type="label"
              />
            </TableCell>
            <TableCell>{{ invoice.paymentMethod }}</TableCell>
            <TableCell>{{ invoice.totalAmount }}</TableCell>
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

export const Simple: Story = {
  render: args => ({
    components: {
      Table,
      TableBody,
      TableCell,
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
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    `,
  }),
};
