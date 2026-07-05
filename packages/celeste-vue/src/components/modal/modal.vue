<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'reka-ui';
import { DialogRoot as ModalRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ModalRoot v-bind="forwarded">
    <slot />
  </ModalRoot>
</template>
