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
@property --celeste-sidebar-fade-top {
  syntax: '<length>';
  inherits: false;
  initial-value: 0;
}

@property --celeste-sidebar-fade-bottom {
  syntax: '<length>';
  inherits: false;
  initial-value: 0;
}

.celeste-sidebar-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  gap: var(--spacing-8);
  overflow: auto;
  scrollbar-color: var(--color-stroke-soft-200) transparent;
  scrollbar-width: thin;
}

.celeste-sidebar-content:hover {
  scrollbar-color: var(--color-stroke-sub-300) transparent;
}

@supports (animation-timeline: scroll()) {
  .celeste-sidebar-content {
    mask-image: linear-gradient(
      to bottom,
      transparent,
      #000 var(--celeste-sidebar-fade-top),
      #000 calc(100% - var(--celeste-sidebar-fade-bottom)),
      transparent
    );
    animation:
      celeste-sidebar-fade-top linear both,
      celeste-sidebar-fade-bottom linear both;
    animation-range:
      0 24px,
      calc(100% - 24px) 100%;
    animation-timeline: scroll(self), scroll(self);
  }
}

@keyframes celeste-sidebar-fade-top {
  from {
    --celeste-sidebar-fade-top: 0;
  }

  to {
    --celeste-sidebar-fade-top: 24px;
  }
}

@keyframes celeste-sidebar-fade-bottom {
  from {
    --celeste-sidebar-fade-bottom: 24px;
  }

  to {
    --celeste-sidebar-fade-bottom: 0;
  }
}

[data-collapsible='icon'] .celeste-sidebar-content {
  overflow: hidden;
}
</style>
