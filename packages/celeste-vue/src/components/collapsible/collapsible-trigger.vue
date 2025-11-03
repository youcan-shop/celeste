<script setup lang="ts">
import type { CollapsibleTriggerProps as PrimitiveProps } from 'radix-vue';
import { CollapsibleTrigger } from 'radix-vue';

const props = defineProps<CollapsibleTriggerProps>();
</script>

<script lang="ts">
export interface CollapsibleTriggerProps extends PrimitiveProps {}
</script>

<template>
  <CollapsibleTrigger v-bind="props">
    <slot />
  </CollapsibleTrigger>
</template>
