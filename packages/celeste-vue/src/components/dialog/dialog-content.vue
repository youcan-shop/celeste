<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import DrawerContent from '@/components/drawer/drawer-content.vue';
import ModalContent from '@/components/modal/modal-content.vue';
import { injectDialogContext } from './context';

export interface DialogContentProps {
  class?: HTMLAttributes['class'];
  style?: HTMLAttributes['style'];
}

const props = defineProps<DialogContentProps>();

const { drawer } = injectDialogContext();
</script>

<template>
  <DrawerContent v-if="drawer" :class="props.class">
    <slot />
  </DrawerContent>
  <ModalContent
    v-else
    :class="props.class"
    :style="props.style"
  >
    <slot />
  </ModalContent>
</template>
