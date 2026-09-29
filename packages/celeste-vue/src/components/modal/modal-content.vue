<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { DialogContent as ModalContent, DialogOverlay as ModalOverlay, DialogPortal as ModalPortal, useForwardPropsEmits } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<DialogContentProps & {
  class?: HTMLAttributes['class'];
  style: HTMLAttributes['style'];
}>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ModalPortal>
    <ModalOverlay class="celeste-modal-overlay">
      <Transition name="fade">
        <ModalContent
          v-bind="forwarded"
          :class="clsx('celeste-modal-content', props.class)"
        >
          <slot />
        </ModalContent>
      </Transition>
    </ModalOverlay>
  </ModalPortal>
</template>

<style scoped lang="scss">
.celeste-modal-overlay {
  display: flex;
  position: fixed;
  z-index: 50;
  flex-direction: column;
  padding: var(--spacing-16);
  overflow-y: auto;
  background: var(--color-overlay-overlay);
  backdrop-filter: blur(5px);
  inset: 0;
}

.celeste-modal-content {
  position: relative;
  z-index: 51;
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
