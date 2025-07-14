<script setup lang="ts">
import { type DialogCloseProps, DialogClose as ModalClose } from 'radix-vue';

const props = defineProps<DialogCloseProps>();
</script>

<template>
  <ModalClose v-bind="props" as-child>
    <slot />
  </ModalClose>
</template>
