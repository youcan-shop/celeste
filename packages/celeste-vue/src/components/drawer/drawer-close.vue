<script setup lang="ts">
import type { DrawerCloseProps } from 'reka-ui';
import { DrawerClose } from 'reka-ui';

const props = defineProps<DrawerCloseProps>();
</script>

<template>
  <DrawerClose v-bind="props">
    <slot />
  </DrawerClose>
</template>
