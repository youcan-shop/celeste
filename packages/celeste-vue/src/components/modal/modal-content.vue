<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { injectDialogRootContext, DialogContent as ModalContent, DialogOverlay as ModalOverlay, DialogPortal as ModalPortal, useForwardPropsEmits } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<DialogContentProps & {
  class?: HTMLAttributes['class'];
  style: HTMLAttributes['style'];
}>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
const root = injectDialogRootContext();
</script>

<template>
  <ModalPortal>
    <component :is="root.modal.value ? ModalOverlay : 'div'" :class="root.modal.value ? 'celeste-modal-overlay' : 'celeste-modal-viewport'">
      <Transition name="fade">
        <ModalContent
          v-bind="forwarded"
          :class="clsx('celeste-modal-content', props.class)"
        >
          <slot />
        </ModalContent>
      </Transition>
    </component>
  </ModalPortal>
</template>

<style scoped lang="scss">
.celeste-modal-overlay,
.celeste-modal-viewport {
  display: flex;
  position: fixed;
  z-index: 50;
  flex-direction: column;
  padding: var(--spacing-16);
  overflow-y: auto;
  inset: 0;
}

.celeste-modal-overlay {
  background: var(--color-overlay-overlay);
  backdrop-filter: blur(5px);

  &[data-state='open'] {
    animation: celeste-fade-in var(--animation-fast) ease-out;
  }

  &[data-state='closed'] {
    animation: celeste-fade-out var(--animation-fast) ease-in;
  }
}

.celeste-modal-viewport {
  pointer-events: none;

  .celeste-modal-content {
    pointer-events: auto;
  }
}

.celeste-modal-content {
  position: relative;
  max-width: 100%;
  margin: auto;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-20);
  background: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
}

.fade-enter-active,
.fade-leave-active {
  transition: all var(--animation-fast) cubic-bezier(0.18, 0.89, 0.43, 1.19);
}

.fade-enter-from,
.fade-leave-to {
  visibility: hidden;
  opacity: 0;
  scale: 0.95;
}
</style>
