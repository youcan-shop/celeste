<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CompactButton from '@/components/button/compact-button.vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import {
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  type PopoverContentEmits,
  type PopoverContentProps,
  PopoverPortal,
  useForwardPropsEmits,
} from 'radix-vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<PopoverProps>(),
  {
    sideOffset: 4,
    showTail: true,
    side: 'bottom',
    dismissible: true,
    iconSize: 'lg',
  },
);
const emits = defineEmits<PopoverContentEmits>();

const delegatedProps = useDelegatedProps(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<script lang="ts">
export interface PopoverProps {
  class?: HTMLAttributes['class'];
  side?: PopoverContentProps['side'];
  title?: string;
  description?: string;
  showTail?: boolean;
  dismissible?: boolean;
  icon?: string;
  iconSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      data-slot="popover-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        clsx(
          'celeste-popover-content-wrapper',
          props.class,
        )
      "
    >
      <div class="celeste-popover-content">
        <template v-if="!$slots.default">
          <span
            v-if="icon"
            class="celeste-popover-icon"
            :data-icon-size="iconSize"
          >
            <i
              :class="icon"
            />
          </span>
          <p class="celeste-popover-title">
            {{ title }}
          </p>
          <p class="celeste-popover-description">
            {{ description }}
          </p>
        </template>
        <slot v-else />
      </div>
      <PopoverArrow
        v-if="showTail"
        as-child
        :width="16"
        :height="8"
      >
        <span class="celeste-popover-arrow" />
      </PopoverArrow>
      <PopoverClose
        v-if="dismissible"
        as-child
        class="PopoverClose"
        aria-label="Close"
      >
        <CompactButton
          icon="i-celeste-close-line"
          class="celeste-popover-close-button"
        />
      </PopoverClose>
    </PopoverContent>
  </PopoverPortal>
</template>

<style scoped lang="scss">
@use 'sass:map';

$icon-size-map: (
  'sm': (
    size: 32px,
    padding: var(--spacing-6),
  ),
  'md': (
    size: 40px,
    padding: var(--spacing-6),
  ),
  'lg': (
    size: 48px,
    padding: var(--spacing-12),
  ),
  'xl': (
    size: 56px,
    padding: var(--spacing-14),
  ),
  'xxl': (
    size: 64px,
    padding: var(--spacing-16),
  ),
);

:deep(.celeste-popover-content-wrapper) {
  min-width: 320px;
  max-width: 400px;
  padding: var(--spacing-16);
  transform-origin: var(--radix-popover-content-transform-origin);
  animation: var(--animation-fast) ease-out forwards;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-16);
  opacity: 0;
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
  scale: 0.95;

  &[data-state='open'] {
    animation-name: open;
  }

  &[data-state='closed'] {
    animation-name: close;
  }

  .celeste-popover-arrow {
    display: block;
    position: relative;
    width: 16px;
    height: 8px;
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: -1px;
      left: -1px;
      width: 16px;
      height: 16px;
      transform: translate(-50%, -50%);
      border: 1px solid var(--color-stroke-soft-200);
      border-radius: 2px;
      background-color: var(--color-bg-white-0);
      rotate: 45deg;
    }
  }

  .celeste-popover-close-button {
    position: absolute;
    inset-inline-end: var(--spacing-16);
    inset-block-start: var(--spacing-16);
  }

  .celeste-popover-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);

    .celeste-popover-title,
    .celeste-popover-description {
      margin: 0;
    }

    .celeste-popover-title {
      color: var(--color-text-strong-950);
      font: var(--label-md);
    }

    .celeste-popover-description {
      color: var(--color-text-sub-600);
      font: var(--paragraph-sm);
    }

    .celeste-popover-icon {
      box-sizing: border-box;
      margin-block-end: var(--spacing-16);
      border: 1px solid var(--color-stroke-soft-200);
      border-radius: 50%;

      @each $key, $value in $icon-size-map {
        &[data-icon-size='#{$key}'] {
          width: map.get($value, size);
          height: map.get($value, size);
          padding: map.get($value, padding);
        }
      }

      i {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@keyframes open {
  to {
    opacity: 1;
    scale: 1;
  }
}

@keyframes close {
  from {
    opacity: 1;
    scale: 1;
  }

  to {
    scale: 0.95;
    opacity: 0;
  }
}
</style>
