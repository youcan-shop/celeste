<script setup lang="ts">
import type { DialogCloseProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { DialogClose } from 'reka-ui';

export interface SheetCloseProps extends DialogCloseProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<SheetCloseProps>();
</script>

<template>
  <DialogClose :class="clsx('celeste-sheet-close', props.class)" v-bind="props">
    <slot />
  </DialogClose>
</template>

<style scoped lang="css">
.celeste-sheet-close {
  position: absolute;
}
</style>
