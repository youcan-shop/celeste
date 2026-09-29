<script setup lang="ts">
import DrawerClose from '@/components/drawer/drawer-close.vue';
import ModalClose from '@/components/modal/modal-close.vue';
import { injectDialogContext } from './context';

const { drawer } = injectDialogContext();
</script>

<template>
  <DrawerClose v-if="drawer" as-child>
    <slot />
  </DrawerClose>
  <ModalClose v-else>
    <slot />
  </ModalClose>
</template>
