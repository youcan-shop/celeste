<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { uid } from '@/utils/crypto';
import clsx from 'clsx';

const props = withDefaults(
  defineProps<AlertProps>(),
  { size: 'xs', variant: 'fill', state: 'information', dismissable: false },
);

defineEmits(['dismiss']);

const labelledby = uid();
const describedby = uid();

const ICON_MAP: Record<NonNullable<AlertProps['state']>, string> = {
  warning: 'i-celeste-alert-fill',
  feature: 'i-celeste-magic-fill',
  error: 'i-celeste-error-warning-fill',
  success: 'i-celeste-checkbox-circle-fill',
  information: 'i-celeste-information-fill',
};
</script>

<script lang="ts">
export interface AlertProps {
  class?: HTMLAttributes['class'];
  size?: 'xs' | 'sm' | 'lg';
  variant?: 'fill' | 'light' | 'lighter' | 'stroke';
  state?: 'information' | 'success' | 'warning' | 'error' | 'feature';
  dismissable?: boolean;
}
</script>

<template>
  <div
    :aria-labelledby="labelledby"
    :aria-describedby="describedby"
    :role="$slots.primary || $slots.secondary ? 'alert-dialog' : 'alert'"
    class="celeste-alert"
    :class="clsx(
      `celeste-alert--${size}`,
      `celeste-alert--${variant}--${state}`,
      props.class,
    )"
  >
    <i
      class="celeste-alert-icon"
      :class="[`celeste-alert-icon--${variant}--${state}`, ICON_MAP[props.state]]"
    />

    <div class="celeste-alert-inner" role="presentation">
      <div role="presentation" class="celeste-alert-content">
        <slot>
          <h5 :id="labelledby" class="celeste-alert-title">
            <slot name="title" />
          </h5>
          <div
            v-if="size === 'lg' && $slots.description"
            :id="describedby"
            class="celeste-alert-description"
          >
            <slot name="description" />
          </div>
        </slot>
      </div>

      <div
        v-if="$slots.primary || $slots.secondary"
        class="celeste-alert-actions"
        role="presentation"
      >
        <div v-if="$slots.primary" class="celeste-alert-action-primary">
          <slot name="primary" />
        </div>

        <div v-if="$slots.primary && $slots.secondary && size === 'lg'" class="celeste-alert-action-divider">
          ∙
        </div>

        <div v-if="$slots.secondary && size === 'lg'" class="celeste-alert-action-secondary">
          <slot name="secondary" />
        </div>
      </div>
    </div>

    <a
      v-if="dismissable"
      href="#"
      aria-label="close"
      class="celeste-alert-close"
      :class="[`celeste-alert-close--${variant}`]"
      @click.prevent="$emit('dismiss')"
    >
      <i class="i-celeste-close-line" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

$alert-sizes: (
  'xs': (
    height: 32px,
    padding: var(--spacing-8),
    gap: var(--spacing-8),
    border-radius: var(--radius-8),
    font: var(--label-xs),
  ),
  'sm': (
    height: 36px,
    padding: var(--spacing-8) var(--spacing-10),
    gap: var(--spacing-8),
    border-radius: var(--radius-8),
    font: var(--label-sm),
  ),
  'lg': (
    height: fit-content,
    padding: 14px,
    gap: var(--spacing-12),
    border-radius: var(--radius-12),
    font: var(--label-sm),
  ),
);
$alert-style-map: (
  'fill': 'base',
  'light': 'light',
  'lighter': 'lighter',
);
$alert-styles: ('fill', 'light', 'lighter', 'stroke');
$alert-states: ('error' 'feature' 'warning' 'success' 'information');

@mixin alert-size($size) {
  $size-props: map.get($alert-sizes, $size);

  height: map.get($size-props, height);
  padding: map.get($size-props, padding);
  gap: map.get($size-props, gap);
  border-radius: map.get($size-props, border-radius);
}

@mixin alert-style($style, $state) {
  @if $style == 'stroke' {
    border: 1px solid var(--color-stroke-soft-200);
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-regular-md);
    color: var(--color-text-strong-950);

    & .celeste-alert-description {
      color: var(--color-text-sub-600);
    }

    & .celeste-alert-action-primary,
    & .celeste-alert-action-secondary,
    & .celeste-alert-action-divider {
      color: var(--color-text-strong-950);
    }
  } @else {
    border: 1px solid transparent;
    background-color: var(
      --color-state-#{if($state == 'feature', 'faded', $state)}-#{map.get($alert-style-map, $style)}
    );
    color: if($style == 'fill', var(--color-static-white), var(--color-text-strong-950));

    & .celeste-alert-description {
      opacity: if($style == 'fill', 1, 0.72);
      color: if($style == 'fill', var(--color-static-white), var(--color-text-strong-950));
    }

    & .celeste-alert-action-primary,
    & .celeste-alert-action-secondary,
    & .celeste-alert-action-divider {
      color: if($style == 'fill', var(--color-static-white), var(--color-text-strong-950));
    }
  }
}

@mixin icon-style($style, $state) {
  @if $style == 'fill' {
    color: var(--color-static-white);
  } @else {
    color: var(--color-state-#{if($state == 'feature', 'faded', $state)}-base);
  }
}

@mixin close-style($style) {
  @if $style == 'fill' {
    opacity: 0.72;
    color: var(--color-static-white);
  } @else {
    opacity: 0.4;
    color: var(--color-icon-strong-950);
  }
}

.celeste-alert {
  display: flex;
  box-sizing: border-box;
  align-items: start;
  width: 100%;

  &-inner {
    display: flex;
    flex: 1;
    justify-content: space-between;
    min-width: 0;
  }

  &-content {
    flex: 1;
    min-width: 0;
  }

  &-icon {
    flex-shrink: 0;
    width: var(--icon-size);
    height: var(--icon-size);

    @each $style in $alert-styles {
      @each $state in $alert-states {
        &--#{$style}--#{$state} {
          @include icon-style($style, $state);
        }
      }
    }
  }

  &-close {
    flex-shrink: 0;
    margin-inline-start: auto;

    i {
      width: var(--icon-size);
      height: var(--icon-size);
    }

    @each $style in $alert-styles {
      &--#{$style} {
        @include close-style($style);
      }
    }
  }

  &-title {
    margin: 0;
    overflow: hidden;
    font: var(--title-font);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-description {
    font: var(--paragraph-sm);
  }

  &-actions {
    display: flex;
    flex-shrink: 0;
    align-items: flex-start;
    align-self: stretch;
    gap: var(--spacing-8);
  }

  &-action-divider {
    opacity: 0.48;
    font: var(--paragraph-sm);
    text-align: center;
  }

  &--xs {
    @include alert-size('xs');

    align-items: center;

    --icon-size: 16px;
    --action-font: var(--label-xs);
    --title-font: var(--paragraph-xs);
  }

  &--sm {
    @include alert-size('sm');

    align-items: center;

    --icon-size: 20px;
    --title-font: var(--paragraph-sm);
    --action-font: var(--label-sm);
  }

  &--lg {
    @include alert-size('lg');

    --icon-size: 20px;
    --action-font: var(--label-sm);
    --title-font: var(--label-sm);

    & .celeste-alert-inner {
      flex-direction: column;
      gap: var(--spacing-10);
    }
  }

  @each $style in ('fill', 'light', 'lighter', 'stroke') {
    @each $state in $alert-states {
      &--#{$style}--#{$state} {
        @include alert-style($style, $state);
      }
    }
  }
}
</style>
