import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from '@/components/button/button.vue';
import LinkButton from '@/components/button/link-button.vue';
import TextInput from '@/components/input/text-input.vue';
import Label from '@/components/label/label.vue';
import ModalBody from '../modal-body.vue';
import ModalClose from '../modal-close.vue';
import ModalContent from '../modal-content.vue';
import ModalFooter from '../modal-footer.vue';
import ModalHeader from '../modal-header.vue';
import ModalTrigger from '../modal-trigger.vue';
import Modal from '../modal.vue';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
  },

  render: args => ({
    components: { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalClose, TextInput, Label, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <ModalTrigger>
          <Button variant="stroke" intent="neutral">Click to open</Button>
        </ModalTrigger>
        <ModalContent style="width: 400px">
          <ModalHeader
            icon="i-celeste-settings-2-line"
            title="Email Verification"
            description="Enter your email to get a verification code."
          />
          <ModalBody>
            <div style="display: grid; gap: 4px;">
              <Label label-text="Email address" sublabel="(Optional)" required />
              <TextInput type="email" placeholder="hello@live.fr" size="md" />
            </div>
          </ModalBody>
          <ModalFooter style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            <ModalClose>
              <Button intent="neutral" variant="stroke" size="sm">Cancel</Button>
            </ModalClose>
            <Button size="sm">Send Code</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    `,
  }),
};

export const WithoutDescription: Story = {
  args: {
  },

  render: args => ({
    components: { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalClose, TextInput, Label, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <ModalTrigger>
          <Button variant="stroke" intent="neutral">Click to open</Button>
        </ModalTrigger>
        <ModalContent style="width: 400px">
          <ModalHeader
            icon="i-celeste-settings-2-line"
            title="Email Verification"
          />
          <ModalBody>
            <div style="display: grid; gap: 4px;">
              <Label label-text="Email address" sublabel="(Optional)" required />
              <TextInput type="email" placeholder="hello@live.fr" size="md" />
            </div>
          </ModalBody>
          <ModalFooter style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            <ModalClose>
              <Button intent="neutral" variant="stroke" size="sm">Cancel</Button>
            </ModalClose>
            <Button size="sm">Send Code</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    `,
  }),
};

export const WithoutIcon: Story = {
  args: {
  },

  render: args => ({
    components: { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalClose, TextInput, Label, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <ModalTrigger>
          <Button variant="stroke" intent="neutral">Click to open</Button>
        </ModalTrigger>
        <ModalContent style="width: 400px">
          <ModalHeader title="Email Verification"/>
          <ModalBody>
            <div style="display: grid; gap: 4px;">
              <Label label-text="Email address" sublabel="(Optional)" required />
              <TextInput type="email" placeholder="hello@live.fr" size="md" />
            </div>
          </ModalBody>
          <ModalFooter style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            <ModalClose>
              <Button intent="neutral" variant="stroke" size="sm">Cancel</Button>
            </ModalClose>
            <Button size="sm">Send Code</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    `,
  }),
};

export const Alignment: Story = {
  args: {
  },

  render: args => ({
    components: { Modal, ModalTrigger, ModalContent, ModalHeader, ModalFooter, ModalClose, TextInput, Label, LinkButton, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
        <Modal v-bind="args">
          <ModalTrigger>
            <Button variant="stroke" intent="neutral">Horizontal</Button>
          </ModalTrigger>
          <ModalContent style="width: 440px">
            <ModalHeader
              :dismissible="false"
              alignment="horizontal"
              type="error"
              icon="i-celeste-error-warning-fill"
              title="Delete account?"
              description="If you delete your account, you will not be able to log in again. Are you sure?"
            />
            <ModalFooter style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
              <ModalClose>
                <Button intent="neutral" variant="stroke" size="sm">No, thanks</Button>
              </ModalClose>
              <Button intent="error" size="sm">Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal v-bind="args">
          <ModalTrigger>
            <Button variant="stroke" intent="neutral">Vertical</Button>
          </ModalTrigger>
          <ModalContent style="width: 440px">
            <ModalHeader
              :dismissible="false"
              alignment="vertical"
              type="error"
              icon="i-celeste-error-warning-fill"
              title="Delete account?"
              description="If you delete your account, you will not be able to log in again. Are you sure?"
            />
            <ModalFooter style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
              <ModalClose>
                <Button intent="neutral" variant="stroke" size="sm">No, thanks</Button>
              </ModalClose>
              <Button intent="error" size="sm">Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    `,
  }),
};

export const Status: Story = {
  args: {
  },

  render: args => ({
    components: { Modal, ModalTrigger, ModalContent, ModalHeader, ModalFooter, ModalClose, TextInput, Label, LinkButton, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
        <Modal v-bind="args">
          <ModalTrigger>
            <Button variant="stroke" intent="neutral">Success</Button>
          </ModalTrigger>
          <ModalContent style="width: 440px">
            <ModalHeader
              :dismissible="false"
              type="success"
              icon="i-celeste-checkbox-circle-fill"
              title="Payment Received"
              description="Your payment has been successfully received. You have unlocked premium services now."
            />
            <ModalFooter style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
              <ModalClose>
                <Button intent="neutral" variant="stroke" size="sm">Cancel</Button>
              </ModalClose>
              <Button size="sm">View Receipt</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal v-bind="args">
          <ModalTrigger>
            <Button variant="stroke" intent="neutral">Information</Button>
          </ModalTrigger>
          <ModalContent style="width: 440px">
            <ModalHeader
              :dismissible="false"
              type="information"
              icon="i-celeste-information-fill"
              title="New Feature Announcement"
              description="We are excited to introduce a new feature that allows you to collaborate seamlessly with team members."
            />
            <ModalFooter style="display: flex; justify-content: space-between; align-items: center;">
              <LinkButton type="gray">I'm not interested</LinkButton>
              <div style="display: flex; gap: 12px; justify-content: end;">
                <ModalClose>
                  <Button intent="neutral" variant="stroke" size="sm">Cancel</Button>
                </ModalClose>
                <Button size="sm">Learn More</Button>
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal v-bind="args">
          <ModalTrigger>
            <Button variant="stroke" intent="neutral">Warning</Button>
          </ModalTrigger>
          <ModalContent style="width: 440px">
            <ModalHeader
              :dismissible="false"
              type="warning"
              icon="i-celeste-alert-fill"
              title="Server Maintenance"
              description="Our servers will go undergo maintenance on May 20, 2023, from 10:00 PM to 2:00 AM UTC."
            />
            <ModalFooter style="display: flex; justify-content: space-between; align-items: center;">
              <ModalClose>
                <LinkButton type="gray">Don't show it again</LinkButton>
              </ModalClose>
              <Button intent="neutral" size="sm">Learn More</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal v-bind="args">
          <ModalTrigger>
            <Button variant="stroke" intent="neutral">Error</Button>
          </ModalTrigger>
          <ModalContent style="width: 440px">
            <ModalHeader
              :dismissible="false"
              type="error"
              icon="i-celeste-error-warning-fill"
              title="Delete account?"
              description="If you delete your account, you will not be able to log in again. Are you sure?"
            />
            <ModalFooter style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
              <ModalClose>
                <Button intent="neutral" variant="stroke" size="sm">No, thanks</Button>
              </ModalClose>
              <Button intent="error" size="sm">Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    `,
  }),
};
