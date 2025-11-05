<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import Badge from '@/components/badge/badge.vue';
import clsx from 'clsx';

const props = withDefaults(defineProps<SidebarMenuBadgeProps>(), {
  variant: 'lighter',
  state: 'faded',
  size: 'sm',
});
</script>

<script lang="ts">
export interface SidebarMenuBadgeProps {
  class?: HTMLAttributes['class'];
  variant?: 'fill' | 'light' | 'lighter' | 'stroke';
  state?: 'faded' | 'information' | 'warning' | 'error' | 'success' | 'away' | 'feature' | 'verified' | 'highlighted' | 'stable';
  size?: 'sm' | 'md';
  label?: string;
}
</script>

<template>
  <Badge
    data-sidebar="menu-badge"
    :class="clsx('celeste-sidebar-menu-badge', props.class)"
    :variant="variant"
    :state="state"
    :size="size"
    :label="label"
    type="basic"
  />
</template>

<style lang="css">
.celeste-sidebar-menu-badge {
  --celeste-sidebar-badge-offset: 0px;

  position: absolute;
  pointer-events: none;
  user-select: none;
  font-variant-numeric: tabular-nums;
  inset-inline-end: calc(var(--spacing-8) + var(--celeste-sidebar-badge-offset));
}

.celeste-sidebar-menu-item > .celeste-sidebar-menu-badge.celeste-badge-sm {
  inset-block-start: var(--spacing-10);
}

.celeste-sidebar-menu-item > .celeste-sidebar-menu-badge.celeste-badge-md {
  inset-block-start: var(--spacing-8);
}

.celeste-sidebar-menu-sub-item > .celeste-sidebar-menu-badge.celeste-badge-sm {
  inset-block-start: var(--spacing-8);
}

.celeste-sidebar-menu-sub-item > .celeste-sidebar-menu-badge.celeste-badge-md {
  inset-block-start: var(--spacing-6);
}

[data-collapsible='icon'] .celeste-sidebar-menu-badge {
  display: none;
}

.celeste-sidebar-menu-item:has([data-sidebar='menu-action']) > .celeste-sidebar-menu-badge,
.celeste-sidebar-menu-sub-item:has([data-sidebar='menu-action']) > .celeste-sidebar-menu-badge {
  --celeste-sidebar-badge-offset: 20px;
}
</style>
