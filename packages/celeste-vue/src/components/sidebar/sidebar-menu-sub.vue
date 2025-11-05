<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <ul
    data-sidebar="menu-sub"
    :class="clsx('celeste-sidebar-menu-sub', props.class)"
  >
    <slot />
  </ul>
</template>

<style lang="css">
.celeste-sidebar-menu-sub {
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-inline: var(--spacing-16);
  padding-block: var(--spacing-4);
  padding-inline: var(--spacing-10);
  transform: translateX(1px);
  gap: var(--spacing-4);
  border-inline-start: 1px solid var(--sidebar-border);
}

[data-collapsible='icon'] .celeste-sidebar-menu-sub {
  display: none;
}
</style>
