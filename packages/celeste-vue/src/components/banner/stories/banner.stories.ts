import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Banner from '../banner.vue';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['fill', 'light', 'lighter', 'stroke'],
    },
    state: {
      control: { type: 'select' },
      options: ['information', 'success', 'warning', 'error', 'faded'],
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    dismissable: {
      control: { type: 'boolean' },
    },
    actionUnderline: {
      control: { type: 'boolean' },
    },
    rounded: {
      control: { type: 'boolean' },
    },
    title: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    actionText: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    dismissable: true,
    state: 'error',
    variant: 'fill',
    alignment: 'center',
    actionUnderline: true,
    rounded: true,
    title: 'Alert Error!',
    description: 'Something went wrong. Please try again.',
    actionText: 'Upgrade',
  },
};

export const Information: Story = {
  args: {
    dismissable: true,
    state: 'information',
    variant: 'fill',
    alignment: 'center',
    actionUnderline: true,
    rounded: true,
    title: 'Insert your alert title here!',
    description: 'Insert your description here.',
    actionText: 'Upgrade',
  },
};

export const Warning: Story = {
  args: {
    dismissable: true,
    state: 'warning',
    variant: 'fill',
    alignment: 'center',
    actionUnderline: true,
    rounded: true,
    title: 'Insert your alert title here!',
    description: 'Insert your description here.',
    actionText: 'Upgrade',
  },
};

export const Success: Story = {
  args: {
    dismissable: true,
    state: 'success',
    variant: 'fill',
    alignment: 'center',
    actionUnderline: true,
    rounded: true,
    title: 'Insert your alert title here!',
    description: 'Insert your description here.',
    actionText: 'Upgrade',
  },
};

export const Faded: Story = {
  args: {
    dismissable: true,
    state: 'faded',
    variant: 'fill',
    alignment: 'center',
    actionUnderline: true,
    rounded: true,
    title: 'Insert your alert title here!',
    description: 'Insert your description here.',
    actionText: 'Upgrade',
  },
};

export const LightVariants: Story = {
  render: () => ({
    components: { Banner },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Banner state="error" variant="light" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="warning" variant="light" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="success" variant="light" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="information" variant="light" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="faded" variant="light" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
      </div>
    `,
  }),
};

export const LighterVariants: Story = {
  render: () => ({
    components: { Banner },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Banner state="error" variant="lighter" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="warning" variant="lighter" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="success" variant="lighter" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="information" variant="lighter" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="faded" variant="lighter" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
      </div>
    `,
  }),
};

export const StrokeVariants: Story = {
  render: () => ({
    components: { Banner },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Banner state="error" variant="stroke" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="warning" variant="stroke" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="success" variant="stroke" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="information" variant="stroke" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
        <Banner state="faded" variant="stroke" :dismissable="true" title="Insert your alert title here!" description="Insert your description here." actionText="Upgrade" />
      </div>
    `,
  }),
};

export const AlignmentVariants: Story = {
  render: () => ({
    components: { Banner },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Banner state="information" variant="fill" alignment="left" :dismissable="true" :rounded="true" title="Left Aligned" description="This banner is aligned to the left." actionText="Action" />
        <Banner state="success" variant="fill" alignment="center" :dismissable="true" :rounded="true" title="Center Aligned" description="This banner is centered." actionText="Action" />
        <Banner state="warning" variant="fill" alignment="right" :dismissable="true" :rounded="true" title="Right Aligned" description="This banner is aligned to the right." actionText="Action" />
      </div>
    `,
  }),
};

export const RoundedVariants: Story = {
  render: () => ({
    components: { Banner },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Banner state="error" variant="fill" :dismissable="true" :rounded="true" title="Rounded Banner" description="This banner has rounded corners." actionText="Upgrade" />
        <Banner state="warning" variant="fill" :dismissable="true" :rounded="false" title="Square Banner" description="This banner has square corners." actionText="Upgrade" />
      </div>
    `,
  }),
};

export const WithoutAction: Story = {
  args: {
    dismissable: true,
    state: 'information',
    variant: 'fill',
    alignment: 'center',
    rounded: true,
    title: 'Insert your alert title here!',
    description: 'Insert your description here.',
    actionText: '',
  },
};

export const NotDismissable: Story = {
  args: {
    dismissable: false,
    state: 'warning',
    variant: 'fill',
    alignment: 'center',
    actionUnderline: true,
    rounded: true,
    title: 'Insert your alert title here!',
    description: 'Insert your description here.',
    actionText: 'Upgrade',
  },
};

export const NoUnderline: Story = {
  args: {
    dismissable: true,
    state: 'error',
    variant: 'fill',
    alignment: 'center',
    actionUnderline: false,
    rounded: true,
    title: 'No Underline Action',
    description: 'The action link has no underline by default.',
    actionText: 'Upgrade',
  },
};
