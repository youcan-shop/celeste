<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import uniqid from 'uniqid';

const props = withDefaults(
  defineProps<BannerProps>(),
  { variant: 'fill', state: 'information', dismissible: true },
);

defineEmits(['dismiss', 'action']);

const labelledby = uniqid();
const describedby = uniqid();

const ICON_MAP: Record<NonNullable<BannerProps['state']>, string> = {
  warning: 'i-celeste-alert-triangle-fill',
  error: 'i-celeste-error-warning-fill',
  success: 'i-celeste-checkbox-circle-fill',
  information: 'i-celeste-information-circle-fill',
  faded: 'i-celeste-star-fill',
};
</script>

<script lang="ts">
export interface BannerProps {
  class?: HTMLAttributes['class'];
  variant?: 'fill' | 'light' | 'lighter' | 'stroke';
  state?: 'information' | 'success' | 'warning' | 'error' | 'faded';
  dismissible?: boolean;
}
</script>

<template>
  <div
    :aria-labelledby="labelledby"
    :aria-describedby="describedby"
    role="banner"
    class="celeste-banner"
    :class="clsx(
      `celeste-banner--${variant}--${state}`,
      props.class,
    )"
  >
    <i
      class="celeste-banner-icon"
      :class="[`celeste-banner-icon--${variant}--${state}`, ICON_MAP[props.state]]"
    />
    
    <div class="celeste-banner-inner" role="presentation">
      <div role="presentation" class="celeste-banner-content">
        <span :id="labelledby" class="celeste-banner-title">
          <slot name="title" />
        </span>
        <span :id="describedby" class="celeste-banner-description">
          <slot name="description" />
        </span>
      </div>
      
      <div v-if="$slots.action" class="celeste-banner-actions" role="presentation">
        <button 
          class="celeste-banner-action"
          :class="[`celeste-banner-action--${variant}--${state}`]"
          @click="$emit('action')"
          type="button"
        >
          <slot name="action" />
        </button>
      </div>
    </div>
    
    <button
      v-if="dismissible"
      aria-label="close"
      class="celeste-banner-close"
      :class="[`celeste-banner-close--${variant}`]"
      @click="$emit('dismiss')"
      type="button"
    >
      <i class="i-celeste-close" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

$banner-style-map: (
  'fill': 'base',
  'light': 'light',
  'lighter': 'lighter',
);

$banner-styles: ('fill', 'light', 'lighter', 'stroke');
$banner-states: ('error', 'faded', 'warning', 'success', 'information');

@mixin banner-style($style, $state) {
  @if $style == 'stroke' {
    border: 1px solid var(--color-stroke-soft-200);
    background-color: var(--color-bg-white-0);
    color: var(--color-text-strong-950);
    
    & .celeste-banner-description {
      color: var(--color-text-sub-600);
    }
  } @else {
    border: 1px solid transparent;
    background-color: var(--color-state-#{$state}-#{map.get($banner-style-map, $style)});
    color: if($style == 'fill', var(--color-static-white), var(--color-text-strong-950));
    
    & .celeste-banner-description {
      opacity: if($style == 'fill', 0.9, 0.8);
      color: if($style == 'fill', var(--color-static-white), var(--color-text-strong-950));
    }
  }
}

@mixin icon-style($style, $state) {
  @if $style == 'fill' {
    color: var(--color-static-white);
  } @else {
    color: var(--color-state-#{$state}-base);
  }
}

@mixin action-style($style, $state) {
  @if $style == 'fill' {
    color: var(--color-static-white);
  } @else {
    color: var(--color-state-#{$state}-base);
  }
}

@mixin close-style($style) {
  @if $style == 'fill' {
    opacity: 0.8;
    color: var(--color-static-white);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  } @else {
    opacity: 0.6;
    color: var(--color-icon-strong-950);
    
    &:hover {
      background-color: var(--color-bg-soft-200);
    }
  }
}

.celeste-banner {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  padding: var(--spacing-12) var(--spacing-16);
  border-radius: var(--radius-8);
  gap: var(--spacing-8);
  min-height: 48px;

  &-inner {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    min-width: 0;
    gap: var(--spacing-12);
  }

  &-content {
    flex: 1;
    min-width: 0;
    font: var(--paragraph-sm);
    line-height: 1.4;
  }

  &-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    
    @each $style in $banner-styles {
      @each $state in $banner-states {
        &--#{$style}--#{$state} {
          @include icon-style($style, $state);
        }
      }
    }
  }

  &-title {
    font-weight: 600;
    margin-right: var(--spacing-4);
  }

  &-description {
    font-weight: 400;
  }

  &-actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }

  &-action {
    background: none;
    border: none;
    padding: 0;
    font: var(--paragraph-sm);
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
    transition: opacity var(--animation-fast) ease-out;

    &:hover {
      opacity: 0.8;
    }

    &:focus {
      outline: 2px solid currentColor;
      outline-offset: 2px;
      border-radius: var(--radius-4);
    }

    @each $style in $banner-styles {
      @each $state in $banner-states {
        &--#{$style}--#{$state} {
          @include action-style($style, $state);
        }
      }
    }
  }

  &-close {
    flex-shrink: 0;
    background: none;
    border: none;
    padding: var(--spacing-4);
    margin: calc(var(--spacing-4) * -1);
    cursor: pointer;
    border-radius: var(--radius-4);
    transition: all var(--animation-fast) ease-out;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      width: 16px;
      height: 16px;
    }

    &:focus {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    @each $style in $banner-styles {
      &--#{$style} {
        @include close-style($style);
      }
    }
  }

  // Generate all style combinations
  @each $style in ('fill', 'light', 'lighter', 'stroke') {
    @each $state in $banner-states {
      &--#{$style}--#{$state} {
        @include banner-style($style, $state);
      }
    }
  }
}
</style>
