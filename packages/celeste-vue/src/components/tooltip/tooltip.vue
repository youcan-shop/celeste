<script setup lang="ts">
import type { TooltipContentProps, TooltipRootEmits, TooltipRootProps } from 'radix-vue';
import CompactButton from '@/components/button/compact-button.vue';
import clsx from 'clsx';
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger, useForwardPropsEmits } from 'radix-vue';
import { type HTMLAttributes, ref } from 'vue';

const props = withDefaults(defineProps<TooltipProps>(), {
  delayDuration: 0,
  sideOffset: 12,
  variant: 'light',
  size: 'sm',
});

const emits = defineEmits<TooltipRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const isOpen = ref(props.defaultOpen);

function close() {
  isOpen.value = false;
}
</script>

<script lang="ts">
export interface TooltipProps extends TooltipRootProps, TooltipContentProps {
  class?: HTMLAttributes['class'];
  size?: 'xs' | 'sm' | 'md';
  variant?: 'light' | 'dark';
  icon?: string;
  title?: string;
  description?: string;
  dismissible?: boolean;
}
</script>

<template>
  <TooltipProvider>
    <TooltipRoot
      v-bind="forwarded"
      :open="props.open || isOpen"
      @update:open="(state) => isOpen = state"
    >
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal class="celeste-tooltip-portal">
        <TooltipContent
          v-bind="{ ...forwarded, ...$attrs }"
          :size="size"
          :variant="variant"
          :class="clsx('celeste-tooltip-content', props.class)"
        >
          <i v-if="icon" :class="`celeste-tooltip-content-icon ${icon}`" />
          <div class="celeste-tooltip-content-box">
            <span v-if="title" class="celeste-tooltip-content-title">{{ title }}</span>
            <span v-if="description" class="celeste-tooltip-content-description">
              {{ description }}
            </span>
          </div>
          <CompactButton
            v-if="dismissible"
            variant="ghost"
            icon="i-celeste-close-line"
            @click="close"
          />
          <TooltipArrow as-child>
            <span class="celeste-tooltip-content-arrow" />
          </TooltipArrow>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<style scoped lang="scss">
:deep(.celeste-tooltip-content) {
  display: flex;
  position: relative;
  align-items: flex-start;
  width: auto;
  max-width: calc(var(--radix-tooltip-content-available-width) / 1.5);
  height: auto;
  animation: var(--animation-fast) ease-out forwards;
  border: 1px solid transparent;
  opacity: 0;
  background-color: var(--color-bg-white-0);
  box-shadow:
    0 12px 24px 0 rgb(14 18 27 / 6%),
    0 1px 2px 0 rgb(14 18 27 / 3%);
  gap: var(--spacing-12);
  scale: 0.98;

  &[data-state='delayed-open'] {
    animation-name: open;
  }

  &[data-state='closed'] {
    &[data-side='left'] {
      animation-name: close-left;
    }

    &[data-side='right'] {
      animation-name: close-right;
    }

    &[data-side='top'] {
      animation-name: close-top;
    }

    &[data-side='bottom'] {
      animation-name: close-bottom;
    }
  }

  .celeste-tooltip-content-box {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);

    .celeste-tooltip-content-description {
      font: var(--paragraph-xs);
    }
  }

  .celeste-tooltip-content-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  .celeste-tooltip-content-arrow {
    --tooltip-arrow-size: 8px;

    position: absolute;
    width: var(--tooltip-arrow-size);
    border: 1px solid transparent;
    border-bottom-left-radius: calc(var(--radius-6) / 2);
    background-color: var(--color-bg-white-0);
    rotate: -45deg;
    aspect-ratio: 1;
    clip-path: polygon(0 0, 100% 100%, 0 100%);
    inset-inline-start: calc(var(--tooltip-arrow-size) / 2 * -1);
    inset-block-start: calc((var(--tooltip-arrow-size) / 2 + 1px) * -1);
  }

  &[variant='light'] {
    border-color: var(--color-stroke-soft-200);

    .celeste-tooltip-content-icon {
      color: var(--color-icon-sub-600);
    }

    .celeste-tooltip-content-title {
      color: var(--color-text-strong-950);
    }

    .celeste-tooltip-content-description {
      color: var(--color-text-sub-600);
    }

    .celeste-tooltip-content-arrow {
      border-color: var(--color-stroke-soft-200);
    }
  }

  &[variant='dark'] {
    background-color: var(--color-bg-strong-950);

    .celeste-tooltip-content-icon {
      color: var(--color-icon-soft-400);
    }

    .celeste-tooltip-content-title {
      color: var(--color-text-white-0);
    }

    .celeste-tooltip-content-description {
      color: var(--color-text-soft-400);
    }

    .celeste-tooltip-content-arrow {
      background-color: var(--color-bg-strong-950);
    }
  }

  &[size='xs'] {
    padding: var(--spacing-2) var(--spacing-6);
    border-radius: var(--radius-4);

    .celeste-tooltip-content-title {
      font: var(--paragraph-xs);
    }
  }

  &[size='sm'] {
    padding: var(--spacing-4) var(--spacing-10);
    border-radius: var(--radius-6);

    .celeste-tooltip-content-title {
      font: var(--paragraph-sm);
    }
  }

  &[size='md'] {
    padding: var(--spacing-12);
    border-radius: var(--radius-12);

    .celeste-tooltip-content-title {
      font: var(--label-sm);
    }
  }

  &[data-side='left'],
  &[data-side='right'] {
    .celeste-tooltip-content-arrow {
      translate: calc(var(--tooltip-arrow-size) / 4 * -1) 0;
    }
  }

  &:has(button):not(:has(.celeste-tooltip-content-description)) {
    align-items: center;
  }
}

@keyframes open {
  to {
    translate: 0;
    opacity: 1;
    scale: 1;
  }
}

$directions: (
  left: calc(var(--spacing-4) * -1) 0,
  right: var(--spacing-4) 0,
  top: 0 calc(var(--spacing-4) * -1),
  bottom: 0 var(--spacing-4),
);

@each $dir, $position in $directions {
  @keyframes close-#{$dir} {
    from {
      translate: 0;
      opacity: 1;
      scale: 1;
    }

    to {
      translate: #{$position};
      scale: 0.98;
      opacity: 0;
    }
  }
}
</style>
