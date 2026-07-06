<script setup lang="ts">
import type { PopoverTriggerProps } from 'reka-ui';
import { PopoverTrigger } from 'reka-ui';

const props = defineProps<PopoverTriggerProps>();
</script>

<template>
  <PopoverTrigger
    class="celeste-popover-trigger"
    v-bind="props"
    as="div"
  >
    <slot />
  </PopoverTrigger>
</template>

<style scoped lang="scss">
.celeste-popover-trigger {
  width: fit-content;
  cursor: pointer;
}
</style>
