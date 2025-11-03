<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div
    data-sidebar="group-content"
    :class="clsx('celeste-sidebar-group-content', props.class)"
  >
    <slot />
  </div>
</template>

<style scoped lang="css">
.celeste-sidebar-group-content {
  width: 100%;
  font: var(--paragraph-sm);
}
</style>
