<script setup lang="ts">
import type { TooltipTriggerProps as PrimitiveProps } from 'reka-ui';
import { TooltipTrigger, useForwardProps } from 'reka-ui';

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
