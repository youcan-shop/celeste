<script setup lang="ts">
import type { CollapsibleContentProps as PrimitiveProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { CollapsibleContent } from 'radix-vue';

const props = defineProps<CollapsibleContentProps>();
</script>

<script lang="ts">
export interface CollapsibleContentProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <CollapsibleContent
    v-bind="props"
    :class="clsx('celeste-collapsible-content', props.class)"
  >
    <slot />
  </CollapsibleContent>
</template>

<style lang="css">
.celeste-collapsible-content {
  overflow: hidden;
  transition: all var(--animation-normal);
}

.celeste-collapsible-content[data-state='closed'] {
  animation: celeste-collapsible-up var(--animation-normal);
}

.celeste-collapsible-content[data-state='open'] {
  animation: celeste-collapsible-down var(--animation-normal);
}
</style>
