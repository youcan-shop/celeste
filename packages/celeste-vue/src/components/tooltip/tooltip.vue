<script setup lang="ts">
import clsx from 'clsx';
import { TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'radix-vue';
import { ref } from 'vue';

const props = withDefaults(defineProps<TooltipProps>(), {
  size: 'xs',
  icon: 'i-celeste-information-line',
  position: 'left',
});

const tooltipState = ref(true);
</script>

<script lang="ts">
export interface TooltipProps {
  class?: string;
  size?: 'xxs' | 'xs' | 'lg';
  position: 'top' | 'right' | 'bottom' | 'left';
  text: string;
  icon?: string;
  description?: string;
  dismissIcon: boolean;
}
</script>

<template>
  <TooltipProvider :delay-duration="200">
    <TooltipRoot :open="tooltipState" @update:open="(val) => tooltipState = val">
      <TooltipTrigger
        :class="clsx('celeste-tooltip-trigger', props.class)"
      >
        <slot name="tooltip-trigger" class="celeste-tooltip-trigger" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          aria-label="tooltip"
          :aria-hidden="tooltipState"
          :class="clsx(
            'celeste-tooltip-content',
            `celeste-tooltip-size-${size}`,
          )"
          :side-offset="1"
          :side="props.position"
          :arrow-padding="2"
          :align="size === 'lg' ? 'start' : 'center'"
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
              v-if="dismissIcon"
              aria-label="close tooltip"
              type="button"
              @click="() => tooltipState = false"
            >
              <i v-if="icon" class="i-celeste-close-line" />
            </button>
          </div>
          <div v-else>
            {{ text }}
          </div>
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

  &[data-state='delayed-open'] {
    opacity: 1;
  }

  &[data-state='closed'] {
    opacity: 0;
  }
}

.celeste-tooltip-large {
  display: flex;
  gap: var(--spacing-12);
  max-width: 250px;

  i {
    flex-shrink: 0;
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
