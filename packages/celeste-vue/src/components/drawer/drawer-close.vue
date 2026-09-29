<script setup lang="ts">
import type { DrawerCloseProps as RekaDrawerCloseProps } from 'reka-ui';
import { DrawerClose } from 'reka-ui';

export interface DrawerCloseProps extends RekaDrawerCloseProps {}

const props = defineProps<DrawerCloseProps>();
</script>

<template>
  <DrawerClose v-bind="props">
    <slot />
  </DrawerClose>
</template>
