<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { DialogContent as ModalContent, DialogOverlay as ModalOverlay, DialogPortal as ModalPortal, useForwardPropsEmits } from 'radix-vue';
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
    <ModalOverlay class="celeste-modal-overlay" />
    <Transition name="fade">
      <ModalContent
        v-bind="forwarded"
        :class="clsx('celeste-modal-content', props.class)"
      >
        <slot />
      </ModalContent>
    </Transition>
  </ModalPortal>
</template>

<style scoped lang="scss">
.celeste-modal-overlay {
  position: fixed;
  z-index: 50;
  background: var(--color-overlay-overlay);
  backdrop-filter: blur(5px);
  inset: 0;
}

.celeste-modal-content {
  position: fixed;
  z-index: 51;
  top: 50%;
  left: 50%;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-20);
  background: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
  translate: -50% -50%;
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
