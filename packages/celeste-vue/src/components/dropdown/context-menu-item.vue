<script setup lang="ts">
import clsx from 'clsx';
import { SwitchRoot, SwitchThumb } from 'radix-vue';
import { computed } from 'vue';
import Badge, { type BadgeProps } from '../badge/badge.vue';
import Button, { type ButtonProps } from '../button/button.vue';

const props = withDefaults(defineProps<ContextMenuItem>(), {
  disabled: false,
  focused: false,
  size: 'sm',
});

const selectedModel = defineModel<boolean>('selected');

const mergedBadgeProps = computed(() => ({
  ...props.badgeProps,
  disabled: props.disabled,
}));

const mergedButtonProps = computed<ButtonProps | null>(() => {
  return props.buttonProps
    ? {
        size: props.size === 'sm' ? 'xxs' : 'xs',
        variant: props.size === 'sm' ? 'ghost' : 'lighter',
        disabled: props.disabled,
        ...props.buttonProps,
      }
    : null;
});
</script>

<script lang="ts">
export interface ContextMenuItem {
  size: 'sm' | 'lg';
  class?: string;
  label: string;
  sublabel?: string;
  description?: string;
  disabled?: boolean;
  focused?: boolean;
  badgeProps?: BadgeProps;
  shortcut?: string;
  toggle?: boolean;
  selected: boolean;
  buttonProps?: ButtonProps;
  rightIcon?: string;
}
</script>

<template>
  <div
    tabindex="0"
    :aria-disabled="disabled"
    :class="clsx(
      'celeste-context-menu-item',
      `celeste-context-menu-item-size-${size}`,
      { 'celeste-context-menu-item-disabled': disabled },
      { 'celeste-context-menu-item-selected': selected },
      { 'celeste-context-menu-item-focused': focused },
    )"
  >
    <div
      v-if="$slots.prefix"
      :class="clsx(
        'celeste-context-menu-item-prefix',
        `celeste-context-menu-item-prefix-${size}`,
      )"
    >
      <slot name="prefix" />
    </div>
    <div class="celeste-context-menu-item-info">
      <div
        :class="clsx(
          'celeste-context-menu-item-header',
          `celeste-context-menu-item-header-${size}`,
        )"
      >
        <span class="celeste-context-menu-item-label" v-html="label" />
        <span v-if="sublabel" class="celeste-context-menu-item-sublabel">{{ sublabel }}</span>
      </div>
      <p v-if="props.description && props.size === 'lg'" class="celeste-context-menu-item-description">
        {{ description }}
      </p>
    </div>
    <Badge
      v-if="mergedBadgeProps"
      v-bind="mergedBadgeProps"
      class="celeste-context-menu-item-badge"
    />
    <span v-if="shortcut" class="celeste-context-menu-item-shortcut">
      {{ shortcut }}
    </span>
    <span class="celeste-context-menu-item-switch">
      <SwitchRoot
        v-model:checked="selectedModel"
        :disabled="disabled"
        class="celeste-switch-root"
      >
        <SwitchThumb class="celeste-switch-thumb" />
      </SwitchRoot>
    </span>
    <span class="celeste-context-menu-item-button">
      <Button
        v-if="mergedButtonProps"
        v-bind="mergedButtonProps"
      >
        <slot name="button-label" />
      </Button>
    </span>
    <span v-if="rightIcon" class="celeste-context-menu-item-suffix">
      <i :class="rightIcon" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.celeste-context-menu-item {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  min-height: 36px;
  padding: var(--spacing-8);
  transition-property: background-color, transform;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border-radius: var(--radius-8);
  background: var(--color-bg-white-0);
  cursor: pointer;
  gap: var(--spacing-8);

  i {
    color: var(--color-icon-sub-600);
  }

  .celeste-context-menu-item-shortcut {
    padding: var(--spacing-2) var(--spacing-6);
    border: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--spacing-4);
    background: var(--color-bg-white-0);
    color: var(--color-text-sub-600);
    font: var(--subheading-xs);
  }

  .celeste-context-menu-item-switch {
    :deep(.celeste-switch-root) {
      display: flex;
      position: relative;
      flex-shrink: 0;
      align-items: center;
      width: 30px;
      height: 18px;
      padding-inline: 7px;
      border: none;
      border-radius: var(--radius-full);
      background: var(--color-bg-soft-200);
      cursor: pointer;

      .celeste-switch-thumb {
        display: block;
        position: absolute;
        width: 4px;
        height: 4px;
        transition-property: background-color, box-shadow, transform;
        transition-duration: var(--animation-fast);
        transition-timing-function: ease-out;
        border-radius: var(--radius-full);
        outline: 4px solid var(--color-bg-white-0);
        background: var(--color-bg-soft-200);
      }

      &[data-state='checked'] {
        background: var(--color-primary-base);

        .celeste-switch-thumb {
          transform: translateX(12px);
          background: var(--color-primary-base);
        }
      }

      &[data-state='checked']:has([data-disabled]),
      &[data-state='unchecked']:has([data-disabled]) {
        border: 1px solid var(--color-bg-soft-200);
        background: var(--color-bg-white-0);
        cursor: not-allowed;

        .celeste-switch-thumb {
          outline-color: var(--color-bg-soft-200);
          background: var(--color-stroke-soft-200);
        }
      }
    }
  }

  &:hover:not(.celeste-context-menu-item-disabled) {
    background: var(--color-bg-weak-50);

    .celeste-context-menu-item-switch {
      :deep(.celeste-switch-root) {
        &[data-state='checked']:not([data-disabled]) {
          background: var(--color-primary-dark);

          .celeste-switch-thumb {
            background: var(--color-primary-dark);
          }
        }

        &[data-state='unchecked']:not([data-disabled]) {
          background: var(--color-bg-sub-300);

          .celeste-switch-thumb {
            background: var(--color-bg-sub-300);
          }
        }
      }
    }
  }

  &-focused {
    background: var(--color-bg-weak-50);
  }

  :deep(.celeste-input-wrapper) {
    gap: 0;
  }

  &-size-sm {
    height: 36px;
  }

  &-size-lg {
    height: 56px;
  }

  &-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
  }

  &-label {
    color: var(--color-text-strong-950);
    font: var(--paragraph-sm);
  }

  &-sublabel {
    color: var(--color-text-soft-400);
    font: var(--paragraph-xs);
  }

  &-description {
    margin: var(--spacing-0);
    color: var(--color-text-sub-600);
    font: var(--paragraph-xs);
  }

  .celeste-context-menu-item-prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-icon-sub-600);

    &-lg {
      padding: var(--spacing-10);
      border: 1px solid var(--color-stroke-soft-200);
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-regular-xs);
      gap: var(--spacing-10);
    }
  }

  .celeste-context-menu-item-suffix {
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
    color: var(--color-icon-sub-600);
  }

  &-disabled {
    background: var(--color-bg-white-0);
    color: var(--color-text-disabled-300);
    cursor: not-allowed;

    :deep(i) {
      color: var(--color-text-disabled-300);
    }

    .celeste-context-menu-item-label,
    .celeste-context-menu-item-sublabel,
    .celeste-context-menu-item-description,
    .celeste-context-menu-item-shortcut {
      color: var(--color-text-disabled-300);
    }
  }

  &-selected {
    background: var(--color-bg-weak-50);
  }

  .celeste-context-menu-item-info {
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-4);
  }

  .celeste-context-menu-item-header-lg {
    .celeste-context-menu-item-label {
      font-weight: var(--font-weights-display-0);
    }
  }
}
</style>
