<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div
    data-sidebar="content"
    :class="clsx('celeste-sidebar-content', props.class)"
  >
    <slot />
  </div>
</template>

<style lang="css">
.celeste-sidebar-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  gap: var(--spacing-8);
  overflow: auto;
}

[data-collapsible='icon'] .celeste-sidebar-content {
  overflow: hidden;
}
</style>
