<script setup lang="ts">
import type { DrawerTriggerProps } from 'reka-ui';
import { DrawerTrigger } from 'reka-ui';

const props = defineProps<DrawerTriggerProps>();
</script>

<template>
  <DrawerTrigger v-bind="props">
    <slot />
  </DrawerTrigger>
</template>
