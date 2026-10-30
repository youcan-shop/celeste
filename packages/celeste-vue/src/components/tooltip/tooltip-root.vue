<script setup lang="ts">
import type { TooltipRootProps as PrimitiveProps, TooltipRootEmits } from 'reka-ui';
import { TooltipRoot, useForwardPropsEmits } from 'reka-ui';

export interface TooltipRootProps extends PrimitiveProps {}

const props = defineProps<TooltipRootProps>();
const emits = defineEmits<TooltipRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TooltipRoot v-bind="forwarded">
    <slot />
  </TooltipRoot>
</template>
