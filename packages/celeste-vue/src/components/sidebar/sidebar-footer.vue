<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

export interface SidebarFooterProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<SidebarFooterProps>();
</script>

<template>
  <div
    data-sidebar="footer"
    :class="clsx('celeste-sidebar-footer', props.class)"
  >
    <slot />
  </div>
</template>

<style lang="css">
.celeste-sidebar-footer {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-10);
  gap: var(--spacing-8);
}

[data-collapsible='icon'] .celeste-sidebar-footer {
  padding: var(--spacing-8) var(--spacing-4);
}
</style>
