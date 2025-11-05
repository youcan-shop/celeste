<script setup lang="ts">
import type { DialogTriggerProps } from 'radix-vue';
import { DialogTrigger } from 'radix-vue';

const props = defineProps<SheetTriggerProps>();
</script>

<script lang="ts">
export interface SheetTriggerProps extends DialogTriggerProps {}
</script>

<template>
  <DialogTrigger v-bind="props">
    <slot />
  </DialogTrigger>
</template>
