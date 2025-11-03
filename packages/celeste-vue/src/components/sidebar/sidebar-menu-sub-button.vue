<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'radix-vue';

const props = withDefaults(defineProps<SidebarMenuSubButtonProps>(), {
  as: 'a',
  size: 'md',
  isActive: false,
});
</script>

<script lang="ts">
export interface SidebarMenuSubButtonProps extends PrimitiveProps {
  size?: 'sm' | 'md';
  isActive?: boolean;
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <Primitive
    data-sidebar="menu-sub-button"
    :as="as"
    :as-child="asChild"
    :data-size="size"
    :data-active="isActive"
    :class="clsx(
      'celeste-sidebar-menu-sub-button',
      `celeste-sidebar-menu-sub-button-size-${size}`,
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
</template>

<style lang="css">
.celeste-sidebar-menu-sub-button {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: 28px;
  padding: var(--spacing-8);
  overflow: hidden;
  transform: translateX(-1px);
  transition: background-color var(--animation-fast);
  border-radius: var(--radius-8);
  outline: none;
  color: var(--sidebar-foreground);
  gap: var(--spacing-8);
}

.celeste-sidebar-menu-sub-button:hover {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.celeste-sidebar-menu-sub-button:focus-visible {
  box-shadow: 0 0 0 2px var(--sidebar-ring);
}

.celeste-sidebar-menu-sub-button:active {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.celeste-sidebar-menu-sub-button:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.celeste-sidebar-menu-sub-button[aria-disabled='true'] {
  opacity: 0.5;
  pointer-events: none;
}

.celeste-sidebar-menu-sub-button[data-active='true'] {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.celeste-sidebar-menu-sub-button > span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.celeste-sidebar-menu-sub-button :is(svg, i) {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--sidebar-accent-foreground);
}

.celeste-sidebar-menu-sub-button-size-sm {
  font: var(--paragraph-xs);
}

.celeste-sidebar-menu-sub-button-size-md {
  font: var(--paragraph-sm);
}

[data-collapsible='icon'] .celeste-sidebar-menu-sub-button {
  display: none;
}
</style>
