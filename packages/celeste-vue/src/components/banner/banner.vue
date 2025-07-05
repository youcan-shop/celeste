<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

const props = withDefaults(defineProps<BannerProps>(), {
  variant: 'fill',
  state: 'information',
  dismissible: true,
});

const emit = defineEmits<{
  dismiss: [];
  action: [];
}>();

const handleDismiss = () => {
  emit('dismiss');
};

const handleAction = () => {
  emit('action');
};
</script>

<script lang="ts">
export interface BannerProps {
  variant?: 'fill' | 'light' | 'lighter' | 'stroke';
  state?: 'information' | 'warning' | 'error' | 'success' | 'faded';
  title: string;
  description: string;
  actionText: string;
  dismissible?: boolean;
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <div
    :class="clsx(
      'celeste-banner',
      `celeste-banner-${variant}`,
      `celeste-banner-${state}`,
      props.class,
    )"
    role="banner"
  >
    <!-- Icon -->
    <i 
      :class="clsx(
        'celeste-banner-icon',
        state === 'information' && 'i-celeste-information-circle-fill',
        state === 'warning' && 'i-celeste-alert-triangle-fill',
        state === 'error' && 'i-celeste-error-warning-fill',
        state === 'success' && 'i-celeste-checkbox-circle-fill',
        state === 'faded' && 'i-celeste-star-fill',
      )"
    />

    <!-- Content - inline text -->
    <span class="celeste-banner-content">
      <strong class="celeste-banner-title">{{ title }}</strong>
      {{ description }}
    </span>

    <!-- Action Link -->
    <button 
      class="celeste-banner-action"
      @click="handleAction"
      type="button"
    >
      {{ actionText }}
    </button>

    <!-- Dismiss Button -->
    <button 
      v-if="dismissible"
      class="celeste-banner-dismiss"
      @click="handleDismiss"
      type="button"
      aria-label="Dismiss banner"
    >
      <i class="i-celeste-close" />
    </button>
  </div>
</template>

<style scoped lang="scss">
$states: information, warning, error, success, faded;

.celeste-banner {
  display: flex;
  align-items: center;
  padding: var(--spacing-12) var(--spacing-16);
  border-radius: var(--radius-8);
  transition-property: background-color, color, border-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: 1px solid transparent;
  gap: var(--spacing-8);
  min-height: 48px;

  &-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  &-content {
    flex: 1;
    font: var(--paragraph-sm);
    line-height: 1.4;
  }

  &-title {
    font-weight: 600;
  }

  &-action {
    flex-shrink: 0;
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
  }

  &-dismiss {
    flex-shrink: 0;
    background: none;
    border: none;
    padding: var(--spacing-4);
    margin: calc(var(--spacing-4) * -1);
    cursor: pointer;
    border-radius: var(--radius-4);
    transition: background-color var(--animation-fast) ease-out;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      width: 16px;
      height: 16px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &:focus {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }

  // State variants
  @each $state in $states {
    &-fill.celeste-banner-#{$state} {
      background-color: var(--color-state-#{$state}-base);
      color: var(--color-text-white-0);

      .celeste-banner-action {
        color: var(--color-text-white-0);
      }

      .celeste-banner-dismiss:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    &-light.celeste-banner-#{$state} {
      background-color: var(--color-state-#{$state}-light);
      color: var(--color-state-#{$state}-dark);

      .celeste-banner-icon {
        color: var(--color-state-#{$state}-base);
      }

      .celeste-banner-action {
        color: var(--color-state-#{$state}-dark);
      }
    }

    &-lighter.celeste-banner-#{$state} {
      background-color: var(--color-state-#{$state}-lighter);
      color: var(--color-state-#{$state}-base);

      .celeste-banner-icon {
        color: var(--color-state-#{$state}-base);
      }

      .celeste-banner-action {
        color: var(--color-state-#{$state}-base);
      }
    }

    &-stroke.celeste-banner-#{$state} {
      border-color: var(--color-state-#{$state}-base);
      background-color: var(--color-bg-white-0);
      color: var(--color-text-strong-950);

      .celeste-banner-icon {
        color: var(--color-state-#{$state}-base);
      }

      .celeste-banner-action {
        color: var(--color-state-#{$state}-base);
      }
    }
  }
}
</style>