import type { Meta, StoryObj } from '@storybook/vue3-vite';
import RadioGroupItem from '../radio-group-item.vue';
import RadioGroup from '../radio-group.vue';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio Group',
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    defaultValue: 'option2',
    orientation: 'vertical',
    disabled: false,
    name: 'radio-group',
    modelValue: '',
    dir: 'ltr',
    loop: true,
    required: true,
  },

  render: args => ({
    components: { RadioGroup, RadioGroupItem },
    setup() {
      return { args };
    },
    template: `
      <RadioGroup v-bind="args" v-model="option2" style="display: flex; gap: 20px;">
        <div style="display: flex; align-items: center;">
          <RadioGroupItem id="r1" value="option1"></RadioGroupItem>
          <label for="r1" style="padding-inline-start: 10px;">Option 1</label>
        </div>
        <div style="display: flex; align-items: center;">
          <RadioGroupItem id="r2" value="option2"></RadioGroupItem>
          <label for="r2" style="padding-inline-start: 10px;">Option 2</label>
        </div>
        <div style="display: flex; align-items: center;">
          <RadioGroupItem id="r3" value="option3"></RadioGroupItem>
          <label for="r3" style="padding-inline-start: 10px;">Option 3</label>
        </div>
      </RadioGroup>
    `,
  }),
};
