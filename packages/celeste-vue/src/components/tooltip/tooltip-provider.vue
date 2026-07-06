<script setup lang="ts">
import type { TooltipProviderProps as PrimitiveProps } from 'reka-ui';
import { TooltipProvider } from 'reka-ui';

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  delayDuration: 0,
});
</script>

<script lang="ts">
export interface TooltipProviderProps extends PrimitiveProps {}
</script>

<template>
  <TooltipProvider v-bind="props">
    <slot />
  </TooltipProvider>
</template>
