import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { toast } from '../../../utils/sonner';
import Button from '../../button/button.vue';
import Sonner from '../sonner.vue';
import 'vue-sonner/style.css';

const meta: Meta<typeof Sonner> = {
  title: 'Components/Sonner',
  component: Sonner,
};

export default meta;

type Story = StoryObj<typeof Sonner>;

export const Default: Story = {
  args: {
    position: 'top-center',
  },

  render: args => ({
    components: { Sonner, Button },
    setup() {
      const showBasicToast = (): void => {
        toast('Event has been created', { dismissable: false });
      };

      const showToastWithDescription = (): void => {
        toast('Event has been created', {
          description: 'Monday, January 3rd at 6:00pm',
        });
      };

      const showSuccessToast = (): void => {
        toast.success('Changes saved!', {
          description: 'Your changes have been saved successfully.',
        });
      };

      const showErrorToast = (): void => {
        toast.error('Something went wrong!', {
          description: 'Please try again later.',
        });
      };

      const showWarningToast = (): void => {
        toast.warning('Please review!', {
          description: 'Please review your changes before proceeding.',
        });
      };

      const showInfoToast = (): void => {
        toast.info('Information', {
          description: 'Here is some helpful information.',
        });
      };

      const showFeatureToast = (): void => {
        toast.feature('New Feature!', {
          description: 'Check out this amazing new feature.',
        });
      };

      const showFillVariant = (): void => {
        toast.success('Success with fill!', {
          description: 'This uses the fill variant style.',
          variant: 'fill',
        });
      };

      const showLightVariant = (): void => {
        toast.info('Info with light variant', {
          description: 'This uses the light variant style.',
          variant: 'light',
        });
      };

      const showDismissExample = (): void => {
        const toastId = toast('This toast can be dismissed', {
          description: 'Click the dismiss button to remove this toast.',
          duration: Infinity,
        });

        setTimeout(() => {
          toast.dismiss(toastId);
          toast.success('Toast dismissed!', {
            description: 'The previous toast was programmatically dismissed.',
          });
        }, 3000);
      };

      const showCustomSizing = (): void => {
        toast('Custom sized toast', {
          description: 'This toast uses a smaller size.',
          size: 'sm',
        });
      };

      return {
        args,
        showBasicToast,
        showToastWithDescription,
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast,
        showFeatureToast,
        showFillVariant,
        showLightVariant,
        showDismissExample,
        showCustomSizing,
      };
    },
    template: `
      <div class="sonner-story-container">
        <Sonner v-bind="args" />
        
        <div class="space-y-6">
          <div>
            <h3 class="story-heading">Basic Toasts</h3>
            <p class="story-description">
              Default: success state, stroke variant, large size, dismissable
            </p>
            <div class="button-grid">
              <Button @click="showBasicToast" size="sm" intent="primary">
                Basic Toast
              </Button>
              
              <Button @click="showToastWithDescription" size="sm" intent="primary">
                With Description
              </Button>

              <Button @click="showCustomSizing" size="sm" intent="neutral">
                Custom Size (sm)
              </Button>
            </div>
          </div>

          <div>
            <h3 class="story-heading">Helper Functions</h3>
            <div class="button-grid">
              <Button @click="showSuccessToast" size="sm" intent="primary">
                toast.success()
              </Button>
              
              <Button @click="showErrorToast" size="sm" intent="error">
                toast.error()
              </Button>
              
              <Button @click="showWarningToast" size="sm" intent="neutral">
                toast.warning()
              </Button>
              
              <Button @click="showInfoToast" size="sm" intent="neutral">
                toast.info()
              </Button>
              
              <Button @click="showFeatureToast" size="sm" intent="primary">
                toast.feature()
              </Button>
            </div>
          </div>

          <div>
            <h3 class="story-heading">Variant Examples</h3>
            <div class="button-grid">
              <Button @click="showFillVariant" size="sm" intent="primary">
                Success + Fill
              </Button>
              
              <Button @click="showLightVariant" size="sm" intent="neutral">
                Info + Light
              </Button>
            </div>
          </div>

          <div>
            <h3 class="story-heading">Advanced Features</h3>
            <div class="button-grid">
              <Button @click="showDismissExample" size="sm" intent="neutral">
                Auto-dismiss Demo
              </Button>
            </div>
          </div>
        </div>
        
        <p class="story-description mt-6">
          All toasts are 360px wide when space allows, but shrink responsively on narrow viewports. They appear in the {{ args.position }} position.
          Default styling: success state, stroke variant, large size, dismissable.
        </p>
      </div>
    `,
  }),
};
