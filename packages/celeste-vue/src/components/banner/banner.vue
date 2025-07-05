<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import uniqid from 'uniqid';

const props = withDefaults(
  defineProps<BannerProps>(),
  {
    variant: 'fill',
    state: 'information',
    dismissable: true,
    alignment: 'left',
    actionUnderline: true,
    title: 'Insert your alert title here!',
    description: 'Insert your description here.',
    actionText: 'Upgrade',
  },
);

defineEmits(['dismiss']);

const labelledby = uniqid();
const describedby = uniqid();

const ICON_MAP: Record<NonNullable<BannerProps['state']>, string> = {
  warning: 'i-celeste-alert-fill',
  error: 'i-celeste-error-warning-fill',
  success: 'i-celeste-checkbox-circle-fill',
  information: 'i-celeste-information-fill',
  faded: 'i-celeste-star-fill',
};
</script>

<script lang="ts">
export interface BannerProps {
  class?: HTMLAttributes['class'];
  variant?: 'fill' | 'light' | 'lighter' | 'stroke';
  state?: 'information' | 'success' | 'warning' | 'error' | 'faded';
  dismissable?: boolean;
  alignment?: 'left' | 'center' | 'right';
  actionUnderline?: boolean;
  title?: string;
  description?: string;
  actionText?: string;
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
      `celeste-banner--align-${alignment}`,
      props.class,
    )"
  >
    <i
      class="celeste-banner-icon"
      :class="[`celeste-banner-icon--${variant}--${state}`, ICON_MAP[props.state]]"
    />

    <div class="celeste-banner-content" role="presentation">
      <div :id="labelledby" class="celeste-banner-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>

      <div class="celeste-banner-separator">
        ·
      </div>

      <div :id="describedby" class="celeste-banner-description">
        <slot name="description">
          {{ description }}
        </slot>
      </div>

      <div v-if="$slots.action || actionText" class="celeste-banner-action">
        <slot name="action">
          <a
            href="#"
            :class="{ underline: actionUnderline }"
            @click.prevent
          >
            {{ actionText }}
          </a>
        </slot>
      </div>
    </div>

    <a
      v-if="dismissable"
      href="#"
      aria-label="close"
      class="celeste-banner-close"
      :class="[`celeste-banner-close--${variant}`]"
      @click.prevent="$emit('dismiss')"
    >
      <i i-celeste-close-line />
    </a>
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
$banner-states: ('error' 'warning' 'success' 'information' 'faded');

@mixin banner-style($style, $state) {
  @if $style == 'stroke' {
    border: 1px solid var(--color-stroke-soft-200);
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-regular-md);
    color: var(--color-text-strong-950);

    & .celeste-banner-description {
      color: var(--color-text-sub-600);
    }

    & .celeste-banner-separator {
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

    & .celeste-banner-separator {
      opacity: if($style == 'fill', 0.7, 0.6);
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

@mixin close-style($style) {
  @if $style == 'fill' {
    opacity: 0.8;
    color: var(--color-static-white);
  } @else {
    opacity: 0.6;
    color: var(--color-icon-strong-950);
  }

  &:hover {
    opacity: 1;
  }
}

.celeste-banner {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  padding: var(--spacing-12) var(--spacing-48);
  gap: var(--spacing-12);
  border-radius: var(--radius-10);

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

  &-content {
    display: flex;
    flex: 1;
    align-items: center;
    gap: var(--spacing-8);
    min-width: 0;
  }

  &-title {
    flex-shrink: 0;
    font: var(--label-sm);
    white-space: nowrap;
  }

  &-separator {
    flex-shrink: 0;
    font: var(--paragraph-sm);
  }

  &-description {
    flex-shrink: 0;
    font: var(--paragraph-sm);
    white-space: nowrap;
  }

  &-action {
    flex-shrink: 0;
    margin-inline-start: var(--spacing-8);

    :deep(a) {
      color: inherit;
      font: var(--label-sm);
      text-decoration: none;

      &.underline {
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      &:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
    }
  }

  &-close {
    flex-shrink: 0;
    margin-inline-start: auto;
    transition: opacity var(--animation-fast) ease-out;

    i {
      width: 20px;
      height: 20px;
    }

    @each $style in $banner-styles {
      &--#{$style} {
        @include close-style($style);
      }
    }
  }

  // Alignment variants
  &--align-left {
    justify-content: flex-start;
  }

  &--align-center {
    justify-content: center;
  }

  &--align-right {
    justify-content: flex-end;
  }

  @each $style in ('fill', 'light', 'lighter', 'stroke') {
    @each $state in $banner-states {
      &--#{$style}--#{$state} {
        @include banner-style($style, $state);
      }
    }
  }
}
</style>
