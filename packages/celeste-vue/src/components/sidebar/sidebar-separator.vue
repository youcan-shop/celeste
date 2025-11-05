<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { ContentDivider } from '@/components';
import clsx from 'clsx';

const props = defineProps<SidebarSeparatorProps>();
</script>

<script lang="ts">
export interface SidebarSeparatorProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <ContentDivider
    :class="clsx('celeste-sidebar-separator', props.class)"
    type="line"
  />
</template>

<style lang="css">
.celeste-sidebar-separator {
  margin-inline: var(--spacing-16);
  background-color: var(--sidebar-border);
}

[data-collapsible='icon'] .celeste-sidebar-separator {
  margin-inline: var(--spacing-4);
}
</style>
