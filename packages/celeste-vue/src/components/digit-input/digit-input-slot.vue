<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import { PinInputInput, type PinInputInputProps, useForwardProps } from 'radix-vue';

const props = defineProps<PinInputInputProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <PinInputInput v-bind="forwardedProps" :class="clsx('celeste-digit-input-slot', props.class)" />
</template>

<style scoped lang="scss">
.celeste-digit-input-slot {
  --celeste-digit-input-border-color: var(--color-stroke-soft-200);
  --celeste-digit-input-drop-shadow: var(--shadow-regular-xs);
  --celeste-digit-input-placeholder-color: var(--color-text-soft-400);

  display: flex;
  box-sizing: border-box;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  padding: 0;
  transition: all var(--animation-fast) ease-out;
  border: 1px solid var(--celeste-digit-input-border-color);
  border-radius: var(--radius-10);
  outline: 2px solid transparent;
  outline-offset: 2px;
  background-color: var(--color-bg-white-0);
  box-shadow: var(--celeste-digit-input-drop-shadow);
  color: var(--color-text-strong-950);
  font: var(--title-h5-title);
  text-align: center;

  &::placeholder {
    transition: color var(--animation-fast) ease-out;
    color: var(--celeste-digit-input-placeholder-color);
  }

  &:focus {
    --celeste-digit-input-border-color: var(--color-stroke-strong-950);
    --celeste-digit-input-placeholder-color: var(--color-text-sub-600);

    outline-color: var(--color-stroke-soft-200);
  }

  &:disabled {
    --celeste-digit-input-border-color: transparent;
    --celeste-digit-input-drop-shadow: none;
    --celeste-digit-input-placeholder-color: var(--color-text-disabled-300);

    background-color: var(--color-bg-weak-50);
    box-shadow: none;
    color: var(--color-text-disabled-300);
    pointer-events: none;

    &::placeholder {
      color: currentcolor;
    }
  }

  [data-error='true'] & {
    --celeste-digit-input-border-color: var(--color-state-error-base);

    &:focus {
      --celeste-digit-input-border-color: var(--color-state-error-base);

      outline-color: var(--color-state-error-lighter);
    }
  }

  &:hover:not(:focus, :disabled) {
    --celeste-digit-input-border-color: transparent;
    --celeste-digit-input-placeholder-color: var(--color-text-sub-600);

    background-color: var(--color-bg-weak-50);
  }
}
</style>
