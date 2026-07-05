<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui';
import { DialogTrigger as ModalTrigger } from 'reka-ui';

const props = defineProps<DialogTriggerProps>();
</script>

<template>
  <ModalTrigger v-bind="props" as-child>
    <slot />
  </ModalTrigger>
</template>
