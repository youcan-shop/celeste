<script setup lang="ts">
import clsx from 'clsx';
import Button, { type ButtonProps } from '@/components/button/button.vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = withDefaults(
  defineProps<Omit</* @vue-ignore */ButtonProps, 'type' | 'size' | 'variant'> & {
    inline?: boolean;
  }>(),
  { inline: false },
);
const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <Button
    tabindex="-1"
    v-bind="delegatedProps"
    size="sm"
    intent="neutral"
    variant="stroke"
    :class="clsx('celeste-text-input-button', props.class)"
  >
    <slot />
  </Button>
</template>

<style scoped lang="scss">
.celeste-text-input-button {
  border: none;

  &:focus,
  &:hover,
  &:active {
    box-shadow: none !important;
  }

  &[inline='false'] {
    padding: var(--spacing-10);
    border-end-start-radius: 0;
    border-start-start-radius: 0;

    &:is(.celeste-button-intent-neutral, .celeste-button-variant-stroke):not(:disabled) {
      background-color: var(--color-bg-white-0);

      &:hover {
        background-color: var(--color-bg-weak-50);
      }
    }
  }

  &[inline='true'] {
    width: 20px;
    height: 20px;
    color: var(--celeste-text-input-icon-color) !important;

    &:hover {
      background-color: transparent !important;
    }
  }
}
</style>
