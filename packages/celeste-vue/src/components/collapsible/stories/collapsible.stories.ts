import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CompactButton from '@/components/button/compact-button.vue';
import { ref } from 'vue';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Simple: Story = {
  render: args => ({
    components: {
      Collapsible,
      CollapsibleContent,
      CollapsibleTrigger,
      CompactButton,
    },
    setup() {
      const isOpen = ref(false);

      return { args, isOpen };
    },
    template: `
      <div style="max-width: 450px;">
        <Collapsible v-model:open="isOpen" v-bind="args">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--spacing-16);">
            <h4 style="font: var(--label-md); color: var(--color-text-strong-950);">
              @azuradara starred 3 repositories
            </h4>
            <CollapsibleTrigger as-child>
              <CompactButton 
                variant="ghost" 
                size="sm" 
                :icon="isOpen ? 'i-celeste-arrow-up-s-line' : 'i-celeste-arrow-down-s-line'"
              />
            </CollapsibleTrigger>
          </div>
          
          <div style="padding: 0 var(--spacing-16) var(--spacing-16) var(--spacing-16);">
            <div style="display: flex; align-items: center; gap: var(--spacing-8); padding: var(--spacing-8); border-radius: var(--radius-8); border: 1px solid var(--color-stroke-soft-200);">
              <i class="i-celeste-github-fill" style="width: 16px; height: 16px;"></i>
              <span style="font: var(--label-sm); color: var(--color-text-strong-950);">@radix-ui/primitives</span>
            </div>
          </div>
          
          <CollapsibleContent>
            <div style="padding: 0 var(--spacing-16) var(--spacing-16) var(--spacing-16); display: flex; flex-direction: column; gap: var(--spacing-8);">
              <div style="display: flex; align-items: center; gap: var(--spacing-8); padding: var(--spacing-8); border-radius: var(--radius-8); border: 1px solid var(--color-stroke-soft-200);">
                <i class="i-celeste-github-fill" style="width: 16px; height: 16px;"></i>
                <span style="font: var(--label-sm); color: var(--color-text-strong-950);">@radix-ui/colors</span>
              </div>
              <div style="display: flex; align-items: center; gap: var(--spacing-8); padding: var(--spacing-8); border-radius: var(--radius-8); border: 1px solid var(--color-stroke-soft-200);">
                <i class="i-celeste-github-fill" style="width: 16px; height: 16px;"></i>
                <span style="font: var(--label-sm); color: var(--color-text-strong-950);">@youcan-shop/egg</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    `,
  }),
};
