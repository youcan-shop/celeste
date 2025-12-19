<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot, type NumberFieldRootEmits, type NumberFieldRootProps, useForwardPropsEmits } from 'radix-vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import CompactButton from '../button/compact-button.vue';

const props = withDefaults(
  defineProps<NumberFieldRootProps & {
    class?: HTMLAttributes['class'];
    size?: 'xs' | 'sm' | 'md';
    hasError?: boolean;
  }>(),
  {
    size: 'md',
    defaultValue: 0,
    hasError: false,
  },
);
const emits = defineEmits<NumberFieldRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <NumberFieldRoot
    v-bind="forwarded"
    :has-error="hasError"
    :class="clsx('celeste-counter-input-wrapper', props.class)"
  >
    <NumberFieldDecrement as-child class="celeste-counter-input-decrement">
      <CompactButton variant="ghost" icon="i-celeste-subtract-line" />
    </NumberFieldDecrement>
    <NumberFieldInput class="celeste-counter-input" />
    <NumberFieldIncrement as-child class="celeste-counter-input-increment">
      <CompactButton variant="ghost" icon="i-celeste-add-line" />
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>

<style lang="scss">
.celeste-counter-input-wrapper {
  --celeste-counter-input-bg-color: var(--color-bg-white-0);
  --celeste-counter-input-text-color: var(--color-text-strong-950);
  --celeste-counter-input-drop-shadow: var(--shadow-regular-xs);
  --celeste-counter-input-outline-color: transparent;
  --celeste-counter-input-border-color: var(--color-stroke-soft-200);

  display: flex;
  align-items: center;
  width: 100%;
  height: var(--celeste-counter-input-height);
  padding-inline: var(--celeste-counter-input-gap);
  transition: all var(--animation-fast) ease-out;
  border: 1px solid var(--celeste-counter-input-border-color);
  border-radius: var(--celeste-counter-input-radius);
  outline: 2px solid var(--celeste-counter-input-outline-color);
  outline-offset: 2px;
  background-color: var(--celeste-counter-input-bg-color);
  box-shadow: var(--celeste-counter-input-drop-shadow);
  color: var(--celeste-counter-input-text-color);
  font: var(--paragraph-sm);
  gap: var(--celeste-counter-input-gap);

  &[size='xs'] {
    --celeste-counter-input-gap: var(--spacing-4);
    --celeste-counter-input-height: 30px;
    --celeste-counter-input-radius: var(--radius-8);
    --celeste-counter-input-padding: calc(var(--spacing-8) - var(--spacing-2));
  }

  &[size='sm'] {
    --celeste-counter-input-gap: var(--spacing-6);
    --celeste-counter-input-height: 34px;
    --celeste-counter-input-radius: var(--radius-8);
    --celeste-counter-input-padding: var(--spacing-8);
  }

  &[size='md'] {
    --celeste-counter-input-gap: var(--spacing-8);
    --celeste-counter-input-height: 38px;
    --celeste-counter-input-radius: var(--radius-10);
    --celeste-counter-input-padding: var(--spacing-8);
  }

  &[has-error='true'] {
    --celeste-counter-input-border-color: var(--color-state-error-base);
  }

  & > .celeste-counter-input {
    flex: 2;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    text-align: center;
  }

  .celeste-counter-input-decrement:active,
  .celeste-counter-input-increment:active {
    background-color: var(--color-bg-weak-50);
    color: var(--color-icon-strong-950);
  }

  &:has(.celeste-counter-input:focus) {
    --celeste-counter-input-outline-color: var(--color-stroke-soft-200);
    --celeste-counter-input-border-color: var(--color-stroke-strong-950);

    &[has-error='true'] {
      --celeste-counter-input-border-color: var(--color-state-error-base);
      --celeste-counter-input-outline-color: var(--color-state-error-lighter);
    }
  }

  &:has(.celeste-counter-input:disabled) {
    --celeste-counter-input-bg-color: var(--color-bg-weak-50);
    --celeste-counter-input-text-color: var(--color-text-disabled-300);
    --celeste-counter-input-drop-shadow: none;
    --celeste-counter-input-border-color: transparent;

    pointer-events: none;
  }

  &:has(.celeste-counter-input:hover:not(:focus, :disabled)) {
    --celeste-counter-input-border-color: transparent;
    --celeste-counter-input-bg-color: var(--color-bg-weak-50);
  }
}
</style>
