<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

export interface SidebarHeaderProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<SidebarHeaderProps>();
</script>

<template>
  <div
    data-sidebar="header"
    :class="clsx('celeste-sidebar-header', props.class)"
  >
    <slot />
  </div>
</template>

<style lang="css">
.celeste-sidebar-header {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-10);
  gap: var(--spacing-8);
}

[data-collapsible='icon'] .celeste-sidebar-header {
  padding: var(--spacing-8) var(--spacing-4);
}
</style>
