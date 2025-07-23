<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class'];
  variant?: 'prefix' | 'suffix';
  inline?: boolean;
  asKbd?: boolean;
}>(), {
  variant: 'prefix',
});
const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <span
    v-bind="delegatedProps"
    :class="clsx('celeste-text-input-affix', props.class)"
  >
    <slot />
  </span>
</template>

<style scoped lang="scss">
.celeste-text-input-affix {
  display: flex;
  align-items: center;
  height: calc(var(--input-height) - var(--spacing-2));
  color: var(--celeste-text-input-affix-color);

  &[inline='false'] {
    padding-inline: var(--spacing-10);
    background-color: var(--celeste-text-input-affix-background-color);
  }

  &[askbd='true'] {
    width: fit-content;
    height: fit-content;
    padding: var(--spacing-2) calc(var(--spacing-8) - var(--spacing-2));
    border: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--radius-4);
    font: var(--subheading-xs);
  }
}
</style>
