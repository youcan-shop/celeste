<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <li
    data-sidebar="menu-item"
    :class="clsx('celeste-sidebar-menu-item', props.class)"
  >
    <slot />
  </li>
</template>

<style lang="css">
.celeste-sidebar-menu-item {
  position: relative;
}
</style>
