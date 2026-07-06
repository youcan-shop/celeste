<script setup lang="ts">
import type { CollapsibleContentProps as PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { CollapsibleContent } from 'reka-ui';

export interface CollapsibleContentProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<CollapsibleContentProps>();
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
