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

export const RichTable: Story = {
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
      const members = [
        {
          name: 'James Brown',
          email: 'james@example.com',
          title: 'Marketing Manager',
          since: 'Aug, 2021',
          project: 'Campaign Strategy',
          projectIcon: 'i-celeste-briefcase-fill',
          fileName: 'brown-james.pdf',
          fileSize: '2.4 MB',
          status: 'Active',
        },
        {
          name: 'Sophia Williams',
          email: 'sophia@example.com',
          title: 'HR Assistant',
          since: 'Aug, 2021',
          project: 'Employee Survey',
          projectIcon: 'i-celeste-user-fill',
          fileName: 'williams-sophia.pdf',
          fileSize: '2.4 MB',
          status: 'Active',
        },
        {
          name: 'Arthur Taylor',
          email: 'arthur@example.com',
          title: 'Entrepreneur / CEO',
          since: 'May, 2022',
          project: 'Vision and Goals',
          projectIcon: 'i-celeste-flag-fill',
          fileName: 'taylor-arthur.pdf',
          fileSize: '2.4 MB',
          status: 'Absent',
        },
        {
          name: 'Emma Wright',
          email: 'emma@example.com',
          title: 'Front-end Developer',
          since: 'Sep, 2022',
          project: 'User Feedback',
          projectIcon: 'i-celeste-chat-fill',
          fileName: 'wright-emma.pdf',
          fileSize: '1.9 MB',
          status: 'Active',
        },
        {
          name: 'Matthew Johnson',
          email: 'matthew@example.com',
          title: 'Data Software Engineer',
          since: 'Feb, 2022',
          project: 'Data Analysis',
          projectIcon: 'i-celeste-bar-chart-fill',
          fileName: 'johnson-matthew.pdf',
          fileSize: '2.9 MB',
          status: 'Active',
        },
        {
          name: 'Laura Perez',
          email: 'laura@example.com',
          title: 'Fashion Designer',
          since: 'Mar, 2022',
          project: 'Design Trends',
          projectIcon: 'i-celeste-palette-fill',
          fileName: 'perez-laura.pdf',
          fileSize: '2.5 MB',
          status: 'Absent',
        },
        {
          name: 'Wei Chen',
          email: 'wei@example.com',
          title: 'Operations Manager',
          since: 'July, 2021',
          project: 'Process Optimization',
          projectIcon: 'i-celeste-settings-fill',
          fileName: 'chen-wei.pdf',
          fileSize: '2.6 MB',
          status: 'Active',
        },
      ];

      const getStatusBadgeProps = (status: string): { state: string; label: string } => {
        return status === 'Active'
          ? { state: 'success', label: 'Active' }
          : { state: 'error', label: 'Absent' };
      };

      return { args, members, getStatusBadgeProps };
    },
    template: `
      <Table v-bind="args">
        <TableHeader>
          <TableRow>
            <TableHead>Member Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Projects</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="member in members" :key="member.email">
            <TableCell>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary-100); color: var(--color-primary-600);">
                  <i class="i-celeste-user-fill" style="font-size: 20px;" />
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <div style="font-weight: 500; color: var(--color-text-strong-950);">{{ member.name }}</div>
                  <div style="font-size: 14px; color: var(--color-text-sub-600);">{{ member.email }}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div style="display: flex; flex-direction: column; gap: 2px;">
                <div style="font-weight: 500; color: var(--color-text-strong-950);">{{ member.title }}</div>
                <div style="font-size: 14px; color: var(--color-text-sub-600);">Since {{ member.since }}</div>
              </div>
            </TableCell>
            <TableCell>
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 6px; background: var(--color-bg-weak-50);">
                  <i :class="member.projectIcon" style="font-size: 16px; color: var(--color-icon-sub-600);" />
                </div>
                <span style="color: var(--color-text-strong-950);">{{ member.project }}</span>
              </div>
            </TableCell>
            <TableCell>
              <div style="display: flex; align-items: center; gap: 8px;">
                <i class="i-celeste-file-text-fill" style="font-size: 16px; color: var(--color-icon-soft-400);" />
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <div style="font-weight: 500; color: var(--color-text-strong-950);">{{ member.fileName }}</div>
                  <div style="font-size: 14px; color: var(--color-text-sub-600);">{{ member.fileSize }}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge 
                v-bind="getStatusBadgeProps(member.status)"
                size="sm"
                variant="fill"
                type="label"
              />
            </dTableCell>
          </TableRow>
        </TableBody>
      </Table>
    `,
  }),
};
