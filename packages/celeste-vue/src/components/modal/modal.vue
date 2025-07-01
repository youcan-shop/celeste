<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'radix-vue';
import { DialogRoot as ModalRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ModalRoot v-bind="forwarded">
    <slot />
  </ModalRoot>
</template>
