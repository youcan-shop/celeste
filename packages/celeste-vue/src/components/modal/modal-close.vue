<script setup lang="ts">
import type { DialogCloseProps } from 'reka-ui';
import { DialogClose as ModalClose } from 'reka-ui';

const props = defineProps<DialogCloseProps>();
</script>

<template>
  <ModalClose v-bind="props" as-child>
    <slot />
  </ModalClose>
</template>
