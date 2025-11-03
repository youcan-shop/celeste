<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div
    data-sidebar="group"
    :class="clsx('celeste-sidebar-group', props.class)"
  >
    <slot />
  </div>
</template>

<style lang="css">
.celeste-sidebar-group {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  padding: var(--spacing-8);
}
</style>
