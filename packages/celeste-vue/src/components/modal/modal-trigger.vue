<script setup lang="ts">
import type { DialogTriggerProps } from 'radix-vue';
import { DialogTrigger as ModalTrigger } from 'radix-vue';

const props = defineProps<DialogTriggerProps>();
</script>

<template>
  <ModalTrigger v-bind="props" as-child>
    <slot />
  </ModalTrigger>
</template>
