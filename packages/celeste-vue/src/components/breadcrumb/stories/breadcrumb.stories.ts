import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BreadcrumbArrow from '../breadcrumb-arrow.vue';
import BreadcrumbItem from '../breadcrumb-item.vue';
import Breadcrumb from '../breadcrumb.vue';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => ({
    components: { Breadcrumb, BreadcrumbItem, BreadcrumbArrow },
    template: `
      <Breadcrumb>
        <BreadcrumbItem>
          <i class="i-celeste-home-6-line" />
        </BreadcrumbItem>
        <BreadcrumbArrow />
        <BreadcrumbItem>Blogs</BreadcrumbItem>
        <BreadcrumbArrow />
        <BreadcrumbItem active>The Power of Minimalism in Design</BreadcrumbItem>
      </Breadcrumb>
    `,
  }),
};

export const AsLink: Story = {
  render: () => ({
    components: { Breadcrumb, BreadcrumbItem, BreadcrumbArrow },
    template: `
      <Breadcrumb>
        <BreadcrumbItem as="a" href="#">
          <i class="i-celeste-settings-2-line" />
          Settings
        </BreadcrumbItem>
        <BreadcrumbArrow />
        <BreadcrumbItem as="a" href="#">
          <i class="i-celeste-notification-3-line" />
          Notifications
        </BreadcrumbItem>
        <BreadcrumbArrow />
        <BreadcrumbItem as="a" href="#" active>
          <i class="i-celeste-mail-open-line" />
          Email Notifications
        </BreadcrumbItem>
      </Breadcrumb>
    `,
  }),
};

export const SlashSeparator: Story = {
  render: () => ({
    components: { Breadcrumb, BreadcrumbItem, BreadcrumbArrow },
    template: `
      <Breadcrumb>
        <BreadcrumbItem as="a" href="#">
          <i class="i-celeste-settings-2-line" />
          Settings
        </BreadcrumbItem>
        <BreadcrumbArrow>/</BreadcrumbArrow>
        <BreadcrumbItem as="a" href="#">
          <i class="i-celeste-notification-3-line" />
          Notifications
        </BreadcrumbItem>
        <BreadcrumbArrow>/</BreadcrumbArrow>
        <BreadcrumbItem as="a" href="#" active>
          <i class="i-celeste-mail-open-line" />
          Email Notifications
        </BreadcrumbItem>
      </Breadcrumb>
    `,
  }),
};
