<script setup lang="ts">
import { useMediaQuery, useVModel } from '@vueuse/core';
import { breakpoint as breakpoints } from '@youcan/celeste-tokens/json/breakpoint';
import Drawer from '@/components/drawer/drawer.vue';
import Modal from '@/components/modal/modal.vue';
import { provideDialogContext } from './context';

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  breakpoint?: keyof typeof breakpoints;
}

const props = withDefaults(defineProps<DialogProps>(), {
  open: undefined,
  breakpoint: 'sm',
});

const emits = defineEmits<{ 'update:open': [value: boolean] }>();

const open = useVModel(props, 'open', emits, { passive: true, defaultValue: props.defaultOpen });
const drawer = useMediaQuery(() => `(width < ${breakpoints[props.breakpoint].$value}px)`);

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
