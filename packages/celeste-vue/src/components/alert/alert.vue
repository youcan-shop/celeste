<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { IconCloseLine } from '@youcan/celeste-icons/vue';
import clsx from 'clsx';

const props = withDefaults(
  defineProps<AlertProps>(),
  { size: 'xs', variant: 'fill', state: 'information', dismissable: false },
);

defineEmits(['dismiss']);

const ICON_MAP: Record<NonNullable<AlertProps['state']>, string> = {
  error: 'i-celeste-alert-fill',
  feature: 'i-celeste-magic-fill',
  warning: 'i-celeste-error-warning-fill',
  success: 'i-celeste-checkbox-circle-fill',
  information: 'i-celeste-information-fill',
};
</script>

<script lang="ts">
interface AlertProps {
  class?: HTMLAttributes['class'];
  size?: 'xs' | 'sm' | 'lg';
  variant?: 'fill' | 'light' | 'lighter' | 'stroke';
  state?: 'information' | 'success' | 'warning' | 'error' | 'feature';
  dismissable?: boolean;
}
</script>

<template>
  <div
    role="alert"
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
    <div role="presentation">
      <slot />
    </div>

    <a
      href="#"
      aria-label="close"
      class="celeste-alert-close"
      :class="[`celeste-alert-close--${variant}`]"
      @click.prevent="$emit('dismiss')"
    >
      <IconCloseLine
        v-if="dismissable"
      />
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
  ),
  'sm': (
    height: 36px,
    padding: var(--spacing-8) var(--spacing-10),
    gap: var(--spacing-8),
    border-radius: var(--radius-8),
  ),
  'lg': (
    height: fit-content,
    padding: 14px,
    gap: var(--spacing-12),
    border-radius: var(--radius-12),
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
    color: var(--color-text-strong-950);
    box-shadow: var(--shadow-regular-md);
  } @else {
    border: none;
    background-color: var(--color-state-#{$state}-#{map.get($alert-style-map, $style)});
    color: if($style == 'fill', var(--color-static-white), var(--color-text-strong-950));
  }
}

@mixin icon-style($style, $state) {
  @if $style == 'fill' {
    color: var(--color-static-white);
  } @else {
    color: var(--color-state-#{$state}-base);
  }
}

@mixin close-style($style) {
  @if $style == 'fill' {
    color: var(--color-static-white);
    opacity: 0.72;
  } @else {
    color: var(--color-icon-strong-950);
    opacity: 0.4;
  }
}

.celeste-alert {
  width: 100%;
  display: flex;
  align-items: center;
  font: var(--paragraph-xs);
  box-sizing: border-box;

  &-icon {
    height: 16px;
    width: 16px;
    flex-shrink: 0;

    @each $style in $alert-styles {
      @each $state in $alert-states {
        &--#{$style}--#{$state} {
          @include icon-style($style, $state);
        }
      }
    }
  }

  &-close {
    height: 16px;
    width: 16px;
    flex-shrink: 0;
    margin-inline-start: auto;

    @each $style in $alert-styles {
      &--#{$style} {
        @include close-style($style);
      }
    }
  }

  &--xs {
    @include alert-size('xs');
  }

  &--sm {
    @include alert-size('sm');
  }

  &--lg {
    @include alert-size('lg');
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
