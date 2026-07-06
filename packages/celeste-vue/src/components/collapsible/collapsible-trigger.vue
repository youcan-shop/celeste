<script setup lang="ts">
import type { CollapsibleTriggerProps as PrimitiveProps } from 'reka-ui';
import { CollapsibleTrigger } from 'reka-ui';

export interface CollapsibleTriggerProps extends PrimitiveProps {}

const props = defineProps<CollapsibleTriggerProps>();
</script>

<template>
  <CollapsibleTrigger v-bind="props">
    <slot />
  </CollapsibleTrigger>
</template>
