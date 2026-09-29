<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import DrawerBody from '@/components/drawer/drawer-body.vue';
import ModalBody from '@/components/modal/modal-body.vue';
import { injectDialogContext } from './context';

export interface DialogBodyProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<DialogBodyProps>();

const { drawer } = injectDialogContext();
</script>

<template>
  <DrawerBody v-if="drawer" :class="clsx('celeste-dialog-body', props.class)">
    <slot />
  </DrawerBody>
  <ModalBody v-else :class="props.class">
    <slot />
  </ModalBody>
</template>

<style scoped>
.celeste-dialog-body {
  padding: var(--spacing-16);
}
</style>
