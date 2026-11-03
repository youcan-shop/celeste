<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import Badge from '@/components/badge/badge.vue';

export interface SidebarMenuBadgeProps {
  class?: HTMLAttributes['class'];
  variant?: 'fill' | 'light' | 'lighter' | 'stroke';
  state?: 'faded' | 'information' | 'warning' | 'error' | 'success' | 'away' | 'feature' | 'verified' | 'highlighted' | 'stable';
  size?: 'sm' | 'md';
  label?: string;
}

const props = withDefaults(defineProps<SidebarMenuBadgeProps>(), {
  variant: 'lighter',
  state: 'faded',
  size: 'sm',
});
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

<style lang="scss">
.celeste-sidebar-menu-badge {
  --celeste-sidebar-badge-offset: 0px;

  position: absolute;
  pointer-events: none;
  user-select: none;
  font-variant-numeric: tabular-nums;
  inset-inline-end: calc(var(--spacing-8) + var(--celeste-sidebar-badge-offset));
}

.celeste-sidebar-menu-item > .celeste-sidebar-menu-badge.celeste-badge-sm {
  inset-block-start: 7px;
}

.celeste-sidebar-menu-item > .celeste-sidebar-menu-badge.celeste-badge-md {
  inset-block-start: 5px;
}

.celeste-sidebar-menu-sub-item > .celeste-sidebar-menu-badge.celeste-badge-sm {
  inset-block-start: var(--spacing-6);
}

.celeste-sidebar-menu-sub-item > .celeste-sidebar-menu-badge.celeste-badge-md {
  inset-block-start: var(--spacing-4);
}

[data-collapsible='icon'] .celeste-sidebar-menu-badge {
  display: none;
}

.celeste-sidebar-menu-item:has([data-sidebar='menu-action']) > .celeste-sidebar-menu-badge,
.celeste-sidebar-menu-sub-item:has([data-sidebar='menu-action']) > .celeste-sidebar-menu-badge {
  --celeste-sidebar-badge-offset: 20px;
}

$active-row-shades: (
  faded: neutral-200,
  information: blue-300,
  warning: orange-300,
  error: red-300,
  success: green-300,
  away: yellow-300,
  feature: purple-300,
  verified: sky-300,
  highlighted: pink-300,
  stable: teal-300,
);

@mixin active-row-shades {
  :is(.celeste-sidebar-menu-item, .celeste-sidebar-menu-sub-item):has(> [data-active='true'])
    > .celeste-sidebar-menu-badge {
    @each $state, $shade in $active-row-shades {
      --color-state-#{$state}-dark: var(--color-#{$shade});
    }
  }
}

// The active row's background is lighter than the sidebar, so dark mode text needs one shade brighter to keep its contrast.
[data-theme='dark'] {
  @include active-row-shades;
}

@media (prefers-color-scheme: dark) {
  [data-theme='system'] {
    @include active-row-shades;
  }
}
</style>
