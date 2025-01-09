<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { ref, watchEffect } from 'vue';

const props = withDefaults(
  defineProps<AlertProps>(),
  { size: 'xs', variant: 'fill', state: 'information' },
);

// TODO: find a better way of doing this bs, maybe iconify
const ICON_MAP: Record<NonNullable<AlertProps['state']>, string> = {
  error: 'IconAlertFill',
  feature: 'IconMagicFill',
  warning: 'IconErrorWarningFill',
  success: 'IconCheckboxCircleFill',
  information: 'IconInformationFill',
};

const icon = ref();

watchEffect(async () => {
  icon.value = (await import('@youcan/celeste-icons'))[ICON_MAP[props.state]];
});
</script>

<script lang="ts">
interface AlertProps {
  class?: HTMLAttributes['class'];
  size?: 'xs' | 'sm' | 'lg';
  variant?: 'fill' | 'light' | 'lighter' | 'stroke';
  state?: 'information' | 'success' | 'warning' | 'error' | 'feature';
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
    <component
      :is="icon"
      class="celeste-alert-icon"
      :class="`celeste-alert-icon--${variant}--${state}`"
    />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

$alert-sizes: (
  'xs': (
    height: 32px,
    padding: 8px,
    gap: 8px,
  ),
  'sm': (
    height: 36px,
    padding: 8px 10px,
    gap: 8px,
  ),
  'lg': (
    height: fit-content,
    padding: 14px,
    gap: 12px,
  ),
);

$alert-styles: (
  'fill': 'base',
  'light': 'light',
  'lighter': 'lighter',
);

$alert-states: ('error' 'feature' 'warning' 'success' 'information');

@mixin alert-size($size) {
  $size-props: map.get($alert-sizes, $size);
  height: map.get($size-props, height);
  padding: map.get($size-props, padding);
  gap: map.get($size-props, gap);
}

@mixin alert-style($style, $state) {
  @if $style == 'stroke' {
    border: 1px solid var(--color-stroke-soft-200);
    background-color: var(--color-bg-white-0);
    color: var(--color-text-strong-950);
    box-shadow: var(--shadow-regular-md);
  } @else {
    border: none;
    background-color: var(--color-state-#{$state}-#{map.get($alert-styles, $style)});
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

.celeste-alert {
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: var(--radius-8);
  font: var(--paragraph-xs);
  box-sizing: border-box;

  &-icon {
    height: 16px;
    width: 16px;

    @each $style in ('fill', 'light', 'lighter', 'stroke') {
      @each $state, $icon in $alert-states {
        &--#{$style}--#{$state} {
          @include icon-style($style, $state);
        }
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
