<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import DrawerContent from '@/components/drawer/drawer-content.vue';
import ModalContent from '@/components/modal/modal-content.vue';
import { injectDialogContext } from './context';

export interface DialogContentProps {
  style?: HTMLAttributes['style'];
}

const props = defineProps<DialogContentProps>();

const { drawer } = injectDialogContext();
</script>

<template>
  <DrawerContent v-if="drawer">
    <slot />
  </DrawerContent>
  <ModalContent v-else :style="props.style">
    <slot />
  </ModalContent>
</template>
