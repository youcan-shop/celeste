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
  position: absolute;
  inset-block-start: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  user-select: none;
  font-variant-numeric: tabular-nums;
}

[data-collapsible='icon'] .celeste-sidebar-menu-badge {
  display: none;
}

.celeste-sidebar-menu-item:has([data-sidebar='menu-action']) .celeste-sidebar-menu-badge {
  --offset: 20px;

  inset-inline-end: calc(var(--offset) + var(--spacing-8));
}

.celeste-sidebar-menu-item:has([data-sidebar='menu-action'])
  .celeste-sidebar-menu-sub-button
  .celeste-sidebar-menu-badge {
  inset-inline-end: var(--spacing-8);
}
</style>
