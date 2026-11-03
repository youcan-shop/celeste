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
  margin: 0;
  padding-block: var(--spacing-4);
  padding-inline: 0;
  gap: var(--spacing-2);
  list-style: none;
}

[data-collapsible='icon'] .celeste-sidebar-menu-sub {
  display: none;
}
</style>
