<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'radix-vue';

const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <Primitive
    data-sidebar="group-label"
    :as="as"
    :as-child="asChild"
    :class="clsx('celeste-sidebar-group-label', props.class)"
  >
    <slot />
  </Primitive>
</template>

<style lang="css">
.celeste-sidebar-group-label {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 32px;
  padding-inline: var(--spacing-8);
  transition:
    margin var(--animation-fast) linear,
    opacity var(--animation-fast) linear;
  border-radius: var(--radius-8);
  outline: none;
  color: var(--color-text-soft-400);
  font: var(--subheading-xs);
  text-transform: uppercase;
}

.celeste-sidebar-group-label:focus-visible {
  box-shadow: 0 0 0 2px var(--sidebar-ring);
}

.celeste-sidebar-group-label svg,
.celeste-sidebar-group-label i {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

[data-collapsible='icon'] .celeste-sidebar-group-label {
  margin-top: -32px;
  opacity: 0;
}
</style>
