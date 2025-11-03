<script setup lang="ts">
import type { DialogCloseProps } from 'radix-vue';
import { DialogClose } from 'radix-vue';

const props = defineProps<SheetCloseProps>();
</script>

<script lang="ts">
export interface SheetCloseProps extends DialogCloseProps {}
</script>

<template>
  <DialogClose v-bind="props">
    <slot />
  </DialogClose>
</template>
