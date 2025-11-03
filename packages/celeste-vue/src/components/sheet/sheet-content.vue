<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import CompactButton from '@/components/button/compact-button.vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: 'right',
});

const emits = defineEmits<DialogContentEmits>();

const delegated = reactiveOmit(props, 'class', 'side');
const forwarded = useForwardPropsEmits(delegated, emits);
</script>

<script lang="ts">
export interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class'];
  side?: 'top' | 'bottom' | 'left' | 'right';
}
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="celeste-sheet-overlay" />
    <DialogContent
      :class="clsx('celeste-sheet-content', `celeste-sheet-side-${side}`, props.class)"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />

      <DialogClose as-child class="celeste-sheet-close">
        <CompactButton
          size="lg"
          variant="ghost"
          icon="i-celeste-close-line"
        />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<style scoped lang="css">
.celeste-sheet-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgb(0 0 0 / 80%);
}

.celeste-sheet-overlay[data-state='open'] {
  animation: celeste-fade-in var(--animation-fast) ease-in;
}

.celeste-sheet-overlay[data-state='closed'] {
  animation: celeste-fade-out var(--animation-fast) ease-out;
}

.celeste-sheet-content {
  position: fixed;
  z-index: 50;
  padding: 24px;
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-lg);
  gap: var(--spacing-16);
}

.celeste-sheet-side-top {
  top: 0;
  right: 0;
  left: 0;
  border-bottom: 1px solid var(--color-stroke-soft-200);
}

.celeste-sheet-side-top[data-state='open'] {
  animation: celeste-slide-in-from-top var(--animation-extra-slow) ease-in-out;
}

.celeste-sheet-side-top[data-state='closed'] {
  animation: celeste-slide-out-to-top var(--animation-normal) ease-in-out;
}

.celeste-sheet-side-bottom {
  right: 0;
  bottom: 0;
  left: 0;
  border-top: 1px solid var(--color-stroke-soft-200);
}

.celeste-sheet-side-bottom[data-state='open'] {
  animation: celeste-slide-in-from-bottom var(--animation-extra-slow) ease-in-out;
}

.celeste-sheet-side-bottom[data-state='closed'] {
  animation: celeste-slide-out-to-bottom var(--animation-normal) ease-in-out;
}

.celeste-sheet-side-left {
  top: 0;
  bottom: 0;
  left: 0;
  width: 75%;
  height: 100%;
  border-right: 1px solid var(--color-stroke-soft-200);
}

.celeste-sheet-side-left[data-state='open'] {
  animation: celeste-slide-in-from-left var(--animation-extra-slow) ease-in-out;
}

.celeste-sheet-side-left[data-state='closed'] {
  animation: celeste-slide-out-to-left var(--animation-normal) ease-in-out;
}

@media (width >= 640px) {
  .celeste-sheet-side-left {
    max-width: 384px;
  }
}

.celeste-sheet-side-right {
  top: 0;
  right: 0;
  bottom: 0;
  width: 75%;
  height: 100%;
  border-left: 1px solid var(--color-stroke-soft-200);
}

.celeste-sheet-side-right[data-state='open'] {
  animation: celeste-slide-in-from-right var(--animation-extra-slow) ease-in-out;
}

.celeste-sheet-side-right[data-state='closed'] {
  animation: celeste-slide-out-to-right var(--animation-normal) ease-in-out;
}

@media (width >= 640px) {
  .celeste-sheet-side-right {
    max-width: 384px;
  }
}

.celeste-sheet-close {
  position: absolute;
  inset-inline-end: var(--spacing-16);
  inset-block-start: var(--spacing-16);
}

.celeste-sheet-close[data-state='open'] {
  background-color: var(--color-bg-weak-50);
}
</style>
