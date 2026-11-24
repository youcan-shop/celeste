<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<SwitchRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="clsx('celeste-switch', props.class)"
  >
    <span class="celeste-switch-track">
      <SwitchThumb class="celeste-switch-thumb" />
    </span>
  </SwitchRoot>
</template>

<style lang="scss">
.celeste-switch {
  --bg-color: var(--color-bg-soft-200);
  --direction: 1;

  display: block;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 32px;
  height: 20px;
  padding: var(--spacing-2);
  border: none;
  outline: none;
  background: none;
  cursor: pointer;

  :dir(rtl) & {
    --direction: -1;
  }

  .celeste-switch-track {
    display: block;
    box-sizing: border-box;
    width: 28px;
    height: 16px;
    padding: var(--spacing-2);
    transition: background-color var(--animation-fast) ease-out;
    border-radius: var(--radius-full);
    background-color: var(--bg-color);
  }

  .celeste-switch-thumb {
    display: block;
    position: relative;
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    transition:
      transform var(--animation-fast) ease-out,
      scale var(--animation-fast) ease-out;
    border-radius: var(--radius-full);
    background-color: var(--color-static-white);
    box-shadow: var(--shadow-toggle-switch);
    pointer-events: none;

    &[data-state='checked'] {
      transform: translateX(calc(12px * var(--direction)));
    }

    &::before {
      content: '';
      position: absolute;
      width: 4px;
      height: 4px;
      margin: auto;
      transition: background-color var(--animation-fast) ease-out;
      border-radius: var(--radius-full);
      background-color: var(--bg-color);
      inset: var(--spacing-0);
    }
  }

  &[data-state='checked'] {
    --bg-color: var(--color-primary-base);
  }

  &:not(:disabled) {
    &:hover,
    &:focus-visible {
      --bg-color: var(--color-bg-sub-300);
    }

    &:hover[data-state='checked'] {
      --bg-color: var(--color-primary-darker);
    }

    &:focus-visible[data-state='checked'] {
      --bg-color: var(--color-primary-base);
    }

    &:active {
      --bg-color: var(--color-bg-soft-200);

      .celeste-switch-thumb {
        scale: 0.833;
      }
    }

    &:active[data-state='checked'] {
      --bg-color: var(--color-primary-base);
    }
  }

  &:disabled {
    cursor: not-allowed;

    .celeste-switch-track {
      padding: 3px;
      background-color: var(--color-bg-white-0);
      box-shadow: inset 0 0 0 1px var(--color-stroke-soft-200);
    }

    .celeste-switch-thumb {
      width: 10px;
      height: 10px;
      background-color: var(--color-bg-soft-200);
      box-shadow: none;

      &::before {
        content: none;
      }
    }
  }
}
</style>
