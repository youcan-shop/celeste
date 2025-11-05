<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import { Primitive } from 'radix-vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class'];
  variant?: 'default' | 'outline';
  isActive?: boolean;
}>(), {
  as: 'button',
  variant: 'default',
  isActive: false,
});

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'isActive');
</script>

<template>
  <Primitive
    data-sidebar="menu-button"
    :data-active="isActive"
    :class="clsx(
      'celeste-sidebar-menu-button',
      `celeste-sidebar-menu-button-variant-${variant}`,
      props.class,
    )"
    v-bind="{ ...delegatedProps, ...$attrs }"
  >
    <slot />
  </Primitive>
</template>

<style lang="css">
.celeste-sidebar-menu-button {
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 36px;
  padding: var(--spacing-8);
  overflow: hidden;
  transition:
    width var(--animation-fast) linear,
    height var(--animation-fast) linear,
    padding var(--animation-fast) linear,
    background-color var(--animation-fast);
  border-radius: var(--radius-8);
  outline: none;
  font: var(--label-sm);
  text-align: start;
  gap: var(--spacing-8);
}

.celeste-sidebar-menu-button:hover {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.celeste-sidebar-menu-button:focus-visible {
  box-shadow: var(--sidebar-ring);
}

.celeste-sidebar-menu-button:active {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.celeste-sidebar-menu-button:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.celeste-sidebar-menu-button[aria-disabled='true'] {
  opacity: 0.5;
  pointer-events: none;
}

.celeste-sidebar-menu-button[data-active='true'] {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.celeste-sidebar-menu-button[data-active='true'] :is(i, svg) {
  color: var(--sidebar-primary);
}

.celeste-sidebar-menu-button[data-state='open']:hover {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

[data-collapsible='icon'] .celeste-sidebar-menu-button {
  width: 34px;
  height: 34px;
  padding: var(--spacing-8);
}

.celeste-sidebar-menu-button > span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.celeste-sidebar-menu-button svg,
.celeste-sidebar-menu-button i {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

.celeste-sidebar-menu-button-variant-outline {
  background-color: var(--sidebar-background);
  box-shadow: 0 0 0 1px var(--sidebar-border);
}

.celeste-sidebar-menu-button-variant-outline:hover {
  background-color: var(--sidebar-accent);
  box-shadow: var(--sidebar-ring);
  color: var(--sidebar-accent-foreground);
}

.celeste-sidebar-menu-button-size-md {
  height: 36px;
  font: var(--label-sm);
}

[data-collapsible='icon'] .celeste-sidebar-menu-button-size-lg {
  padding: 0;
}

.celeste-sidebar-menu-item:has([data-sidebar='menu-action']) .celeste-sidebar-menu-button {
  padding-inline-end: 32px;
}
</style>
