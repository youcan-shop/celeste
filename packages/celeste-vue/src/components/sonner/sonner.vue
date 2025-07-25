<script setup lang="ts">
import { Toaster, type ToasterProps } from 'vue-sonner';

const props = defineProps<SonnerProps>();
</script>

<script lang="ts">
export interface SonnerProps extends ToasterProps {}
</script>

<template>
  <Toaster v-bind="props" />
</template>
