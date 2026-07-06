<script setup lang="ts">
import type { ToasterProps } from 'vue-sonner';
import { Toaster } from 'vue-sonner';

export interface SonnerProps extends ToasterProps {}

const props = defineProps<SonnerProps>();
</script>

<template>
  <Toaster v-bind="props" />
</template>
