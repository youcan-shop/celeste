<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import CompactButton from '@/components/button/compact-button.vue';
import { useSidebar } from '@/composables/use-sidebar';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const { toggleSidebar } = useSidebar();
</script>

<template>
  <CompactButton
    data-sidebar="trigger"
    variant="ghost"
    size="lg"
    icon="i-celeste-side-bar-line"
    :class="clsx('celeste-sidebar-trigger', props.class)"
    @click="toggleSidebar"
  >
    <span class="celeste-sidebar-trigger-label">Toggle Sidebar</span>
  </CompactButton>
</template>

<style scoped lang="css">
.celeste-sidebar-trigger-label {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border-width: 0;
  white-space: nowrap;
}
</style>
