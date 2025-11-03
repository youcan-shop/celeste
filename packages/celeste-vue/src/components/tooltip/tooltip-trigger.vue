<script setup lang="ts">
import { type TooltipTriggerProps as PrimitiveProps, TooltipTrigger, useForwardProps } from 'radix-vue';

const props = defineProps<TooltipTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<script lang="ts">
export interface TooltipTriggerProps extends PrimitiveProps {}
</script>

<template>
  <TooltipTrigger v-bind="forwardedProps" as-child>
    <slot />
  </TooltipTrigger>
</template>
