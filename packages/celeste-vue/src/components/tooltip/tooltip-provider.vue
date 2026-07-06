<script setup lang="ts">
import type { TooltipProviderProps as PrimitiveProps } from 'reka-ui';
import { TooltipProvider } from 'reka-ui';

export interface TooltipProviderProps extends PrimitiveProps {}

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  delayDuration: 0,
});
</script>

<template>
  <TooltipProvider v-bind="props">
    <slot />
  </TooltipProvider>
</template>
