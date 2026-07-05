<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui';
import { DialogTrigger } from 'reka-ui';

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
