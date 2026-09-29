<script setup lang="ts">
import type { DrawerTriggerProps as RekaDrawerTriggerProps } from 'reka-ui';
import { DrawerTrigger } from 'reka-ui';

export interface DrawerTriggerProps extends RekaDrawerTriggerProps {}

const props = defineProps<DrawerTriggerProps>();
</script>

<template>
  <DrawerTrigger v-bind="props">
    <slot />
  </DrawerTrigger>
</template>
