<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'radix-vue';

const props = withDefaults(defineProps<SidebarElementProps>(), {
  as: 'div',
});
</script>

<script lang="ts">
export interface SidebarElementProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <Primitive
    data-sidebar="element"
    :class="clsx('celeste-sidebar-element', props.class)"
    :as="as"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
</template>

<style lang="css">
.celeste-sidebar-element {
  display: flex;
  align-items: center;
  width: 100%;
  gap: var(--spacing-8);
  padding: var(--spacing-8);
  transition: background-color var(--animation-fast);
  border-radius: var(--radius-8);
  outline: none;
}

.celeste-sidebar-element :is(svg, i) {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.celeste-sidebar-element > :is(span, div):not(:first-child) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.celeste-sidebar-desktop[data-state='collapsed'][data-collapsible='icon'] .celeste-sidebar-element {
  justify-content: center;
  padding: var(--spacing-8) var(--spacing-4);
}

.celeste-sidebar-desktop[data-state='collapsed'][data-collapsible='icon']
  .celeste-sidebar-element
  > *:not(:first-child) {
  display: none;
}

.celeste-sidebar-desktop[data-state='collapsed'][data-collapsible='icon'] .celeste-sidebar-element > *:first-child {
  width: 16px;
  height: 16px;
}
</style>
