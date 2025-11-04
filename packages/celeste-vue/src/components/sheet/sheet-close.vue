<script setup lang="ts">
import type { DialogCloseProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { DialogClose } from 'radix-vue';

const props = defineProps<SheetCloseProps>();
</script>

<script lang="ts">
export interface SheetCloseProps extends DialogCloseProps {
  class?: HTMLAttributes['class'];
}
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
