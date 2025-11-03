<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <li
    data-sidebar="menu-sub-item"
    :class="clsx('celeste-sidebar-menu-sub-item', props.class)"
  >
    <slot />
  </li>
</template>
