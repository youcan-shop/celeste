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
    dismissable: {
      control: { type: 'boolean' },
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
  },
  render: args => ({
    components: { Banner },
    setup() {
      return { args };
    },
    template: `
      <Banner v-bind="args">
        <template #title>Alert Error!</template>
        <template #description>Something went wrong. Please try again.</template>
        <template #action>
          <a href="#">Upgrade</a>
        </template>
      </Banner>
    `,
  }),
};

export const Information: Story = {
  args: {
    dismissable: true,
    state: 'information',
    variant: 'fill',
  },
  render: args => ({
    components: { Banner },
    setup() {
      return { args };
    },
    template: `
      <Banner v-bind="args">
        <template #title>Insert your alert title here!</template>
        <template #description>Insert your description here.</template>
        <template #action>
          <a href="#">Upgrade</a>
        </template>
      </Banner>
    `,
  }),
};

export const Warning: Story = {
  args: {
    dismissable: true,
    state: 'warning',
    variant: 'fill',
  },
  render: args => ({
    components: { Banner },
    setup() {
      return { args };
    },
    template: `
      <Banner v-bind="args">
        <template #title>Insert your alert title here!</template>
        <template #description>Insert your description here.</template>
        <template #action>
          <a href="#">Upgrade</a>
        </template>
      </Banner>
    `,
  }),
};

export const Success: Story = {
  args: {
    dismissable: true,
    state: 'success',
    variant: 'fill',
  },
  render: args => ({
    components: { Banner },
    setup() {
      return { args };
    },
    template: `
      <Banner v-bind="args">
        <template #title>Insert your alert title here!</template>
        <template #description>Insert your description here.</template>
        <template #action>
          <a href="#">Upgrade</a>
        </template>
      </Banner>
    `,
  }),
};

export const Faded: Story = {
  args: {
    dismissable: true,
    state: 'faded',
    variant: 'fill',
  },
  render: args => ({
    components: { Banner },
    setup() {
      return { args };
    },
    template: `
      <Banner v-bind="args">
        <template #title>Insert your alert title here!</template>
        <template #description>Insert your description here.</template>
        <template #action>
          <a href="#">Upgrade</a>
        </template>
      </Banner>
    `,
  }),
};

export const LightVariants: Story = {
  render: () => ({
    components: { Banner },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Banner state="error" variant="light" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="warning" variant="light" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="success" variant="light" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="information" variant="light" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="faded" variant="light" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
      </div>
    `,
  }),
};

export const LighterVariants: Story = {
  render: () => ({
    components: { Banner },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Banner state="error" variant="lighter" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="warning" variant="lighter" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="success" variant="lighter" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="information" variant="lighter" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="faded" variant="lighter" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
      </div>
    `,
  }),
};

export const StrokeVariants: Story = {
  render: () => ({
    components: { Banner },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Banner state="error" variant="stroke" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="warning" variant="stroke" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="success" variant="stroke" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="information" variant="stroke" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
        
        <Banner state="faded" variant="stroke" :dismissable="true">
          <template #title>Insert your alert title here!</template>
          <template #description>Insert your description here.</template>
          <template #action>
            <a href="#">Upgrade</a>
          </template>
        </Banner>
      </div>
    `,
  }),
};

export const WithoutAction: Story = {
  args: {
    dismissable: true,
    state: 'information',
    variant: 'fill',
  },
  render: args => ({
    components: { Banner },
    setup() {
      return { args };
    },
    template: `
      <Banner v-bind="args">
        <template #title>Insert your alert title here!</template>
        <template #description>Insert your description here.</template>
      </Banner>
    `,
  }),
};

export const NotDismissable: Story = {
  args: {
    dismissable: false,
    state: 'warning',
    variant: 'fill',
  },
  render: args => ({
    components: { Banner },
    setup() {
      return { args };
    },
    template: `
      <Banner v-bind="args">
        <template #title>Insert your alert title here!</template>
        <template #description>Insert your description here.</template>
        <template #action>
          <a href="#">Upgrade</a>
        </template>
      </Banner>
    `,
  }),
};
