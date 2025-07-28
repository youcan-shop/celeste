import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ProgressBar from '../progress-bar.vue';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Progress Bar',
  component: ProgressBar,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'blue', 'red', 'orange', 'green'],
    },
    layout: {
      control: { type: 'select' },
      options: ['default', 'no-description', 'inline', 'bare'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    layout: 'default',
    title: 'Data Storage',
    modelValue: 60,
    color: 'primary',
  },
  render: args => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <ProgressBar v-bind="args">
         <template #description>
            Upgrade to unlock unlimited data storage.
         </template>
      </ProgressBar>
    `,
  }),
};

export const ZeroProgress: Story = {
  args: {
    layout: 'default',
    title: 'Download Progress',
    modelValue: 0,
  },
  render: args => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <ProgressBar v-bind="args">
        <template #description>
          Waiting to start download...
        </template>
      </ProgressBar>
    `,
  }),
};

export const FullProgress: Story = {
  args: {
    layout: 'default',
    title: 'Upload Complete',
    modelValue: 100,
    color: 'green',
  },
  render: args => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <ProgressBar v-bind="args">
        <template #description>
          All files have been uploaded successfully.
        </template>
      </ProgressBar>
    `,
  }),
};

export const WithCustomMax: Story = {
  name: 'With Custom Max Value',
  args: {
    layout: 'default',
    title: 'Memory Usage',
    modelValue: 6144,
    max: 8192,
  },
  render: args => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <ProgressBar v-bind="args">
        <template #label>
          {{ args.modelValue }}MB / {{ args.max }}MB
        </template>
        <template #description>
          System memory utilization is within normal range.
        </template>
      </ProgressBar>
    `,
  }),
};

export const DifferentLayouts: Story = {
  render: () => ({
    components: { ProgressBar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h3 style="margin-bottom: 16px; font: var(--label-md);">Default Layout</h3>
          <ProgressBar layout="default" title="Project Progress" :modelValue="75">
            <template #description>
              3 of 4 milestones completed
            </template>
          </ProgressBar>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; font: var(--label-md);">No Description Layout</h3>
          <ProgressBar layout="no-description" title="Sync Status" :modelValue="45" />
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; font: var(--label-md);">Inline Layout</h3>
          <ProgressBar layout="inline" :modelValue="80" />
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; font: var(--label-md);">Bare Layout</h3>
          <ProgressBar layout="bare" :modelValue="30" />
        </div>
      </div>
    `,
  }),
};

export const DifferentColors: Story = {
  render: () => ({
    components: { ProgressBar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <p style="margin-bottom: 8px; font: var(--label-sm);">Primary</p>
          <ProgressBar layout="inline" color="primary" :modelValue="60" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font: var(--label-sm);">Blue (Information)</p>
          <ProgressBar layout="inline" color="blue" :modelValue="40" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font: var(--label-sm);">Green (Success)</p>
          <ProgressBar layout="inline" color="green" :modelValue="85" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font: var(--label-sm);">Orange (Warning)</p>
          <ProgressBar layout="inline" color="orange" :modelValue="25" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font: var(--label-sm);">Red (Error)</p>
          <ProgressBar layout="inline" color="red" :modelValue="15" />
        </div>
      </div>
    `,
  }),
};

export const WithCustomLabel: Story = {
  name: 'With Custom Label (Slot)',
  args: {
    layout: 'default',
    title: 'File Transfer',
    modelValue: 1024,
    max: 2048,
  },
  render: args => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <ProgressBar v-bind="args">
        <template #label>
          {{ Math.round(args.modelValue / 1024 * 10) / 10 }}GB of {{ args.max / 1024 }}GB
        </template>
        <template #description>
          Transfer speed: 25 MB/s • Time remaining: 2 minutes
        </template>
      </ProgressBar>
    `,
  }),
};

export const InlineWithTitle: Story = {
  name: 'Inline Layout with Title',
  args: {
    layout: 'inline',
    title: 'CPU Usage',
    modelValue: 68,
    color: 'orange',
  },
  render: args => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <ProgressBar v-bind="args" />
    `,
  }),
};

export const LoadingStates: Story = {
  name: 'Loading States Example',
  render: () => ({
    components: { ProgressBar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin-bottom: 12px; font: var(--label-sm);">Initializing</h4>
          <ProgressBar layout="default" title="Setup" :modelValue="5" color="blue">
            <template #description>
              Preparing environment...
            </template>
          </ProgressBar>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font: var(--label-sm);">In Progress</h4>
          <ProgressBar layout="default" title="Installation" :modelValue="47" color="primary">
            <template #description>
              Installing dependencies (23 of 49)
            </template>
          </ProgressBar>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font: var(--label-sm);">Nearly Complete</h4>
          <ProgressBar layout="default" title="Finalizing" :modelValue="92" color="green">
            <template #description>
              Running final checks...
            </template>
          </ProgressBar>
        </div>
      </div>
    `,
  }),
};

export const EdgeCases: Story = {
  render: () => ({
    components: { ProgressBar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <p style="margin-bottom: 8px; font: var(--label-sm);">Over Max Value</p>
          <ProgressBar layout="inline" :modelValue="150" :max="100" color="red" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font: var(--label-sm);">Negative Value</p>
          <ProgressBar layout="inline" :modelValue="-20" color="red" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font: var(--label-sm);">Max is Zero</p>
          <ProgressBar layout="inline" :modelValue="0" :max="0" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font: var(--label-sm);">Very Small Progress</p>
          <ProgressBar layout="inline" :modelValue="0.5" :max="100" />
        </div>
      </div>
    `,
  }),
};

export const RealWorldExamples: Story = {
  name: 'Real World Use Cases',
  render: () => ({
    components: { ProgressBar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 16px; font: var(--label-md);">Storage Quota</h4>
          <ProgressBar layout="default" title="Cloud Storage" :modelValue="1847" :max="2000" color="orange">
            <template #label>
              1.8GB of 2GB used
            </template>
            <template #description>
              You're running low on storage space. Consider upgrading your plan.
            </template>
          </ProgressBar>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font: var(--label-md);">Profile Completion</h4>
          <ProgressBar layout="default" title="Profile Setup" :modelValue="6" :max="8" color="blue">
            <template #label>
              6 of 8 steps completed
            </template>
            <template #description>
              Complete your profile to unlock all features.
            </template>
          </ProgressBar>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font: var(--label-md);">System Health</h4>
          <ProgressBar layout="no-description" title="CPU Usage" :modelValue="23" color="green" />
          <div style="margin-top: 8px;">
            <ProgressBar layout="no-description" title="Memory" :modelValue="67" color="primary" />
          </div>
          <div style="margin-top: 8px;">
            <ProgressBar layout="no-description" title="Disk Space" :modelValue="89" color="orange" />
          </div>
        </div>
      </div>
    `,
  }),
};
