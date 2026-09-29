<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import DrawerFooter from '@/components/drawer/drawer-footer.vue';
import ModalFooter from '@/components/modal/modal-footer.vue';
import { injectDialogContext } from './context';

export interface DialogFooterProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<DialogFooterProps>();

const { drawer } = injectDialogContext();
</script>

<template>
  <DrawerFooter v-if="drawer" :class="props.class">
    <slot />
  </DrawerFooter>
  <ModalFooter v-else :class="clsx('celeste-dialog-footer', props.class)">
    <slot />
  </ModalFooter>
</template>

<style scoped>
.celeste-dialog-footer {
  display: flex;
  align-items: center;
  gap: var(--spacing-12);
}
</style>
