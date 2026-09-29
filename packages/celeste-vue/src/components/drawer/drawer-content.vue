<script setup lang="ts">
import type { DrawerContentEmits, DrawerContentProps as RekaDrawerContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import {
  DrawerContent,
  DrawerHandle,
  DrawerOverlay,
  DrawerPortal,
  useForwardPropsEmits,
} from 'reka-ui';

export interface DrawerContentProps extends RekaDrawerContentProps {
  class?: HTMLAttributes['class'];
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<DrawerContentProps>();

const emits = defineEmits<DrawerContentEmits>();

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'class'), emits);
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay class="celeste-drawer-overlay" />
    <DrawerContent
      :class="clsx('celeste-drawer-content', props.class)"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <DrawerHandle class="celeste-drawer-handle" />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>

<style scoped>
.celeste-drawer-overlay {
  position: fixed;
  z-index: 50;
  transition: opacity 450ms cubic-bezier(0.32, 0.72, 0, 1);
  opacity: calc(1 - var(--drawer-swipe-progress, 0));
  background: var(--color-overlay-overlay);
  inset: 0;
  backdrop-filter: blur(10px);

  &[data-state='open'] {
    animation: celeste-drawer-fade-in 450ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  &[data-state='closed'] {
    animation: celeste-drawer-fade-out 300ms cubic-bezier(0.32, 0.72, 0, 1) forwards;
  }

  &[data-swiping] {
    transition-duration: 0ms;
  }
}

.celeste-drawer-content {
  --drawer-duration: 450ms;
  --drawer-ease: cubic-bezier(0.32, 0.72, 0, 1);

  display: flex;
  position: fixed;
  z-index: 50;
  flex-direction: column;
  transition: transform var(--drawer-duration) var(--drawer-ease);
  outline: none;
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);

  &[data-swiping] {
    transition-duration: 0ms;
  }

  &[data-swipe-direction='right'],
  &[data-swipe-direction='left'] {
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 400px;
    transform: translateX(var(--drawer-swipe-movement-x, 0%));
  }

  &[data-swipe-direction='right'] {
    right: 0;
    border-left: 1px solid var(--color-stroke-soft-200);

    &[data-state='open'] {
      animation: celeste-drawer-in-right var(--drawer-duration) var(--drawer-ease);
    }

    &[data-state='closed'] {
      animation: celeste-drawer-out-right 300ms var(--drawer-ease) forwards;
    }
  }

  &[data-swipe-direction='left'] {
    left: 0;
    border-right: 1px solid var(--color-stroke-soft-200);

    &[data-state='open'] {
      animation: celeste-drawer-in-left var(--drawer-duration) var(--drawer-ease);
    }

    &[data-state='closed'] {
      animation: celeste-drawer-out-left 300ms var(--drawer-ease) forwards;
    }
  }

  &[data-swipe-direction='down'],
  &[data-swipe-direction='up'] {
    right: 0;
    left: 0;
    max-height: calc(100dvh - var(--spacing-48));
    transform: translateY(calc(var(--drawer-snap-point-offset, 0%) + var(--drawer-swipe-movement-y, 0%)));
  }

  &[data-swipe-direction='down'] {
    bottom: 0;
    border-top: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--radius-20) var(--radius-20) 0 0;

    &[data-state='open'] {
      animation: celeste-drawer-in-down var(--drawer-duration) var(--drawer-ease);
    }

    &[data-state='closed'] {
      animation: celeste-drawer-out-down 300ms var(--drawer-ease) forwards;
    }
  }

  &[data-swipe-direction='up'] {
    top: 0;
    border-bottom: 1px solid var(--color-stroke-soft-200);
    border-radius: 0 0 var(--radius-20) var(--radius-20);

    &[data-state='open'] {
      animation: celeste-drawer-in-up var(--drawer-duration) var(--drawer-ease);
    }

    &[data-state='closed'] {
      animation: celeste-drawer-out-up 300ms var(--drawer-ease) forwards;
    }
  }
}

.celeste-drawer-handle {
  display: none;
  flex-shrink: 0;
  align-self: center;
  width: 32px;
  height: 4px;
  margin: var(--spacing-8) 0 0;
  border-radius: var(--radius-full);
  background-color: var(--color-bg-soft-200);
  cursor: grab;
}

.celeste-drawer-content[data-swipe-direction='down'] .celeste-drawer-handle {
  display: block;
}

.celeste-drawer-content[data-swipe-direction='up'] .celeste-drawer-handle {
  display: block;
  order: 1;
  margin: 0 0 var(--spacing-8);
}

@media (prefers-reduced-motion: reduce) {
  .celeste-drawer-overlay,
  .celeste-drawer-content {
    transition-duration: 0ms;
    animation-duration: 1ms !important;
  }
}

@keyframes celeste-drawer-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes celeste-drawer-fade-out {
  to {
    opacity: 0;
  }
}

@keyframes celeste-drawer-in-right {
  from {
    transform: translateX(100%);
  }
}

@keyframes celeste-drawer-out-right {
  from {
    transform: translateX(var(--drawer-swipe-movement-x, 0%));
  }

  to {
    transform: translateX(100%);
  }
}

@keyframes celeste-drawer-in-left {
  from {
    transform: translateX(-100%);
  }
}

@keyframes celeste-drawer-out-left {
  from {
    transform: translateX(var(--drawer-swipe-movement-x, 0%));
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes celeste-drawer-in-down {
  from {
    transform: translateY(100%);
  }
}

@keyframes celeste-drawer-out-down {
  from {
    transform: translateY(calc(var(--drawer-snap-point-offset, 0%) + var(--drawer-swipe-movement-y, 0%)));
  }

  to {
    transform: translateY(100%);
  }
}

@keyframes celeste-drawer-in-up {
  from {
    transform: translateY(-100%);
  }
}

@keyframes celeste-drawer-out-up {
  from {
    transform: translateY(calc(var(--drawer-snap-point-offset, 0%) + var(--drawer-swipe-movement-y, 0%)));
  }

  to {
    transform: translateY(-100%);
  }
}
</style>
