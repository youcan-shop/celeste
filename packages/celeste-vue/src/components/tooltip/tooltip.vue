<script setup lang="ts">
import clsx from 'clsx';
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'radix-vue';
import { ref } from 'vue';

const props = withDefaults(defineProps<TooltipProps>(), {
  size: 'xs',
  icon: 'i-celeste-information-line',
  position: 'left',
});

const isOpen = ref(true);
</script>

<script lang="ts">
export interface TooltipProps {
  class?: string;
  size?: 'xxs' | 'xs' | 'lg';
  position: 'top' | 'right' | 'bottom' | 'left';
  text: string;
  icon?: string;
  description?: string;
  dismissable: boolean;
}
</script>

<template>
  <TooltipProvider>
    <TooltipRoot :open="isOpen" @update:open="(val) => isOpen = val">
      <TooltipTrigger
        :class="clsx('celeste-tooltip-trigger', props.class)"
      >
        <slot name="tooltip-trigger" class="celeste-tooltip-trigger" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          aria-label="tooltip"
          :aria-hidden="isOpen"
          :class="clsx(
            'celeste-tooltip-content',
            `celeste-tooltip-size-${size}`,
          )"
          :side="props.position"
          :arrow-padding="15"
          :align="size === 'lg' ? 'start' : 'center'"
          force-mount
        >
          <div v-if="size === 'lg'" class="celeste-tooltip-large">
            <i v-if="icon" :class="icon" />
            <div class="celeste-tooltip-large-content">
              <div class="celeste-tooltip-large-title">
                {{ text }}
              </div>
              <div
                v-if="description"
                class="celeste-tooltip-large-description"
              >
                {{ description }}
              </div>
            </div>
            <button
              v-if="dismissable"
              aria-label="close tooltip"
              type="button"
              @click="() => isOpen = false"
            >
              <i class="i-celeste-close-line" />
            </button>
          </div>
          <div v-else>
            {{ text }}
          </div>
          <TooltipArrow
            as-child
            :width="12"
            :height="6"
          >
            <span class="celeste-tooltip-arrow" />
          </TooltipArrow>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<style lang="scss">
@use 'sass:map';

.celeste-tooltip {
  $sizes-map: (
    'xxs': (
      'padding': (
        2px 6px,
      ),
      'border-radius': var(--radius-4),
      'justify-content': center,
      'align-items': center,
    ),
    'xs': (
      'padding': (
        4px 10px,
      ),
      'border-radius': var(--radius-4),
      'justify-content': center,
      'align-items': center,
    ),
    'lg': (
      'padding': 12px,
      'border-radius': var(--radius-12),
      'align-items': flex-start,
      'justify-content': flex-start,
    ),
  );

  @each $size, $values in $sizes-map {
    &-size-#{$size} {
      align-items: map.get($values, 'align-items');
      justify-content: map.get($values, 'justify-content');
      padding: map.get($values, 'padding');
      border-radius: map.get($values, 'border-radius');
    }
  }
}

.celeste-tooltip-trigger {
  border: none;
  background: none;
}

.celeste-tooltip-content {
  display: flex;
  position: relative;
  transition-property: opacity;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: 1px solid var(--color-stroke-soft-200);
  opacity: 0;
  background: var(--color-bg-white-0);
  box-shadow:
    0 12px 24px 0 rgb(14 18 27 / 6%),
    0 1px 2px 0 rgb(14 18 27 / 3%);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  will-change: opacity;

  &[data-state='delayed-open'] {
    opacity: 1;
  }

  &[data-state='closed'] {
    opacity: 0;
  }

  .celeste-tooltip-arrow {
    position: relative;
    top: -1px;
    width: 0;
    height: 0;
    border-top: 6px solid var(--color-bg-white-0);
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;

    &::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: -4.8px;
      left: -6px;
      width: 0;
      height: 0;
      border-top: 6px solid var(--color-stroke-soft-200);
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
    }
  }
}

.celeste-tooltip-large {
  display: flex;
  gap: var(--spacing-12);
  max-width: 250px;

  i {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: var(--color-icon-sub-600);
  }

  button {
    width: fit-content;
    height: fit-content;
    border: none;
    background: none;
    cursor: pointer;
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }

  &-title {
    color: var(--color-text-strong-950);
    font: var(--label-sm);
  }

  &-description {
    color: var(--color-text-sub-600);
    font: var(--paragraph-xs);
  }
}
</style>
