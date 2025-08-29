import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import RadioGroupItem from '../radio-group-item.vue';
import RadioGroupLabel from '../radio-group-label.vue';
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
    components: { RadioGroup, RadioGroupItem, RadioGroupLabel },
    setup() {
      const selectedValue = ref();
      return { args, selectedValue };
    },
    template: `
      <div>
        <RadioGroup v-bind="args" v-model="selectedValue" style="display: flex; gap: 8px;">
          <RadioGroupLabel>
            <RadioGroupItem id="r1" value="option1" />
            <template #label>Option 1</template>
          </RadioGroupLabel>

          <RadioGroupLabel>
            <RadioGroupItem id="r2" value="option2" />
            <template #label>Option 2</template>
          </RadioGroupLabel>

          <RadioGroupLabel>
            <RadioGroupItem id="r3" value="option3" />
            <template #label>Option 3</template>
          </RadioGroupLabel>
        </RadioGroup>
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
          <strong>Selected:</strong> {{ selectedValue ? selectedValue : 'None' }}
        </div>
      </div>
    `,
  }),
};
