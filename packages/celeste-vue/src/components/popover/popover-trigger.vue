<script setup lang="ts">
import { PopoverTrigger, type PopoverTriggerProps } from 'radix-vue';

const props = defineProps<PopoverTriggerProps>();
</script>

<template>
  <PopoverTrigger
    data-slot="popover-trigger"
    v-bind="props"
  >
    <slot />
  </PopoverTrigger>
</template>
