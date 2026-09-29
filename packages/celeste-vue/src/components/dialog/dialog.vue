<script setup lang="ts">
import { useMediaQuery, useVModel } from '@vueuse/core';
import Drawer from '@/components/drawer/drawer.vue';
import Modal from '@/components/modal/modal.vue';
import { provideDialogContext } from './context';

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  breakpoint?: number;
}

const props = withDefaults(defineProps<DialogProps>(), {
  open: undefined,
  breakpoint: 640,
});

const emits = defineEmits<{ 'update:open': [value: boolean] }>();

const open = useVModel(props, 'open', emits, { passive: true, defaultValue: props.defaultOpen });
const drawer = useMediaQuery(() => `(width <= ${props.breakpoint}px)`);

provideDialogContext({ drawer });
</script>

<template>
  <Drawer
    v-if="drawer"
    v-model:open="open"
    side="bottom"
  >
    <slot />
  </Drawer>
  <Modal v-else v-model:open="open">
    <slot />
  </Modal>
</template>
