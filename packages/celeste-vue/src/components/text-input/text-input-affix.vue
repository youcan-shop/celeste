<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  inline?: boolean;
  asKbd?: boolean;
}>();

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
  flex-shrink: 0;
  align-items: center;
  color: var(--celeste-text-input-affix-color);
  unicode-bidi: plaintext;

  &[inline='false'] {
    padding-inline: var(--input-affix-padding);
    background-color: var(--celeste-text-input-affix-background-color);
  }

  &[askbd='true'] {
    box-sizing: border-box;
    width: fit-content;
    height: 20px;
    padding-inline: var(--spacing-6);
    border: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--radius-4);
    background-color: var(--color-bg-white-0);
    color: var(--color-text-soft-400);
    font: var(--subheading-xs);
  }
}
</style>
