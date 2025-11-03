<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <ul
    data-sidebar="menu"
    :class="clsx('celeste-sidebar-menu', props.class)"
  >
    <slot />
  </ul>
</template>

<style lang="css">
.celeste-sidebar-menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  gap: var(--spacing-4);
}
</style>
