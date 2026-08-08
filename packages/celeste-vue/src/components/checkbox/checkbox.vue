<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="clsx('celeste-checkbox', props.class)"
  >
    <CheckboxIndicator force-mount class="celeste-checkbox-indicator">
      <svg
        class="celeste-checkbox-check"
        viewBox="0 0 10 8"
        aria-hidden="true"
      >
        <path d="M1 3.5L4 6.5L9 1.5" />
      </svg>
      <svg
        class="celeste-checkbox-dash"
        viewBox="0 0 8 2"
        aria-hidden="true"
      >
        <path d="M0 1H8" />
      </svg>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style lang="scss">
.celeste-checkbox {
  --checkbox-size: 16px;
  --checkbox-checkmark-size: 8px;
  --checkbox-indeterminate-size: 8px;

  display: flex;
  position: relative;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  transition: background var(--animation-fast) ease-out;
  border: none;
  border-radius: var(--radius-4);
  background-color: var(--color-bg-soft-200);
  color: var(--color-static-white);
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    width: calc(var(--checkbox-size) - 3px);
    height: calc(var(--checkbox-size) - 3px);
    transition: background var(--animation-fast) ease-out;
    border-radius: calc(var(--radius-4) / 1.5);
    background-color: var(--color-bg-white-0);
    box-shadow: 0 2px 2px 0 rgb(27 28 29 / 12%);
    inset: 1.5px;
  }

  .celeste-checkbox-indicator {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;

    svg {
      position: absolute;
      transition: opacity var(--animation-fast) ease-out;
      stroke-width: 1.5;
      stroke: currentcolor;
      opacity: 0;
      fill: none;
    }

    path {
      transition: stroke-dashoffset var(--animation-normal) ease-out;
      stroke-dasharray: var(--mark-length);
      stroke-dashoffset: var(--mark-length);
    }

    &[data-state='checked'] .celeste-checkbox-check,
    &[data-state='indeterminate'] .celeste-checkbox-dash {
      opacity: 1;

      path {
        stroke-dashoffset: 0;
      }
    }
  }

  .celeste-checkbox-check {
    --mark-length: 11.32;

    width: calc(var(--checkbox-checkmark-size) * 1.25);
    height: var(--checkbox-checkmark-size);
  }

  .celeste-checkbox-dash {
    --mark-length: 8;

    width: var(--checkbox-indeterminate-size);
    height: 2px;
  }

  &[data-state='checked']:not(:disabled),
  &[data-state='indeterminate']:not(:disabled) {
    background-color: var(--color-primary-base);

    &::before {
      background-color: var(--color-primary-base);
      box-shadow: none;
    }
  }

  &:focus {
    &[data-state='unchecked'] {
      background-color: var(--color-primary-base);
    }
  }

  &:hover:not(:disabled, :focus) {
    &[data-state='unchecked'] {
      background-color: var(--color-bg-sub-300);
    }

    &[data-state='checked'],
    &[data-state='indeterminate'] {
      background-color: var(--color-primary-darker);

      &::before {
        background-color: var(--color-primary-darker);
      }
    }
  }

  &:disabled {
    pointer-events: none;

    &::before {
      background-color: var(--color-bg-soft-200);
      box-shadow: none;
    }
  }
}
</style>
