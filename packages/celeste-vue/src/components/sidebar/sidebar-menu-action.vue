<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'radix-vue';

const props = withDefaults(defineProps<SidebarMenuActionProps>(), {
  as: 'button',
});
</script>

<script lang="ts">
export interface SidebarMenuActionProps extends PrimitiveProps {
  showOnHover?: boolean;
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <Primitive
    data-sidebar="menu-action"
    :class="clsx(
      'celeste-sidebar-menu-action',
      showOnHover && 'celeste-sidebar-menu-action-show-on-hover',
      props.class,
    )"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>

<style lang="css">
.celeste-sidebar-menu-action {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 20px;
  padding: 0;
  transition: transform var(--animation-fast) ease-in-out;
  border-radius: var(--radius-8);
  outline: none;
  color: var(--sidebar-foreground);
  inset-inline-end: var(--spacing-4);
  inset-block-start: var(--spacing-8);
  aspect-ratio: 1;
}

.celeste-sidebar-menu-action::after {
  content: '';
  position: absolute;
  inset: -8px;
}

@media (width >= 768px) {
  .celeste-sidebar-menu-action::after {
    display: none;
  }
}

.celeste-sidebar-menu-action:hover {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.celeste-sidebar-menu-action:focus-visible {
  box-shadow: 0 0 0 2px var(--sidebar-ring);
}

.celeste-sidebar-menu-action :is(svg, i) {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  transition: transform var(--animation-extra-fast) ease-out;
}

.celeste-sidebar-menu-action:dir(rtl) :is(svg, i) {
  transform: rotate(180deg);
}

[data-collapsible='icon'] .celeste-sidebar-menu-action {
  display: none;
}

.celeste-sidebar-menu-button:hover ~ .celeste-sidebar-menu-action {
  color: var(--sidebar-accent-foreground);
}

.celeste-sidebar-menu-button[data-size='sm'] ~ .celeste-sidebar-menu-action {
  inset-block-start: var(--spacing-4);
}

.celeste-sidebar-menu-button[data-size='default'] ~ .celeste-sidebar-menu-action {
  inset-block-start: var(--spacing-6);
}

.celeste-sidebar-menu-button[data-size='lg'] ~ .celeste-sidebar-menu-action {
  inset-block-start: var(--spacing-10);
}

.celeste-sidebar-menu-button[data-state='open'] + .celeste-sidebar-menu-action :is(svg, i) {
  transform: rotate(90deg);
}

.celeste-sidebar-menu-action-show-on-hover {
  opacity: 0;
}

@media (width >= 768px) {
  .celeste-sidebar-menu-action-show-on-hover {
    opacity: 0;
  }
}

.celeste-sidebar-menu-item:focus-within .celeste-sidebar-menu-action-show-on-hover,
.celeste-sidebar-menu-item:hover .celeste-sidebar-menu-action-show-on-hover,
.celeste-sidebar-menu-action-show-on-hover[data-state='open'] {
  opacity: 1;
}

.celeste-sidebar-menu-button[data-active='true'] ~ .celeste-sidebar-menu-action-show-on-hover {
  color: var(--sidebar-accent-foreground);
}
</style>
