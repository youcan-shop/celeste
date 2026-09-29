<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import DrawerHeader from '@/components/drawer/drawer-header.vue';
import ModalHeader from '@/components/modal/modal-header.vue';
import { injectDialogContext } from './context';

export interface DialogHeaderProps {
  title: string;
  description?: string;
  icon?: string;
  dismissible?: boolean;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<DialogHeaderProps>(), {
  dismissible: true,
});

const { drawer } = injectDialogContext();
</script>

<template>
  <DrawerHeader
    v-if="drawer"
    v-bind="props"
    divider
  />
  <ModalHeader v-else v-bind="props" />
</template>
