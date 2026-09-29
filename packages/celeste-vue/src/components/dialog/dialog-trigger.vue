<script setup lang="ts">
import DrawerTrigger from '@/components/drawer/drawer-trigger.vue';
import ModalTrigger from '@/components/modal/modal-trigger.vue';
import { injectDialogContext } from './context';

const { drawer } = injectDialogContext();
</script>

<template>
  <DrawerTrigger v-if="drawer" as-child>
    <slot />
  </DrawerTrigger>
  <ModalTrigger v-else>
    <slot />
  </ModalTrigger>
</template>
