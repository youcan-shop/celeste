<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { SwitchRoot, type SwitchRootEmits, type SwitchRootProps, SwitchThumb, useForwardPropsEmits } from 'radix-vue';

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
    <SwitchThumb class="celeste-switch-thumb">
      <slot name="thumb" />
    </SwitchThumb>
  </SwitchRoot>
</template>

<style lang="scss">
.celeste-switch {
  --switch-w: 26px;
  --switch-h: 16px;
  --animation-function: cubic-bezier(0.18, 0.89, 0.43, 1.19);

  position: relative;
  width: var(--switch-w);
  height: var(--switch-h);
  transition: background var(--animation-fast) ease-out;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  background-color: var(--color-bg-soft-200);
  cursor: pointer;

  .celeste-switch-thumb {
    --switch-thumb-size: 12px;

    position: absolute;
    width: calc(var(--switch-thumb-size) / 3);
    height: calc(var(--switch-thumb-size) / 3);
    transform: translateY(-50%);
    transition:
      inset-inline-start,
      var(--animation-fast) var(--animation-function);
    border: calc(var(--switch-thumb-size) / 4) solid var(--color-static-white);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-toggle-switch);
    inset-block-start: 50%;
    inset-inline-start: 1px;

    &[data-state='checked'] {
      inset-inline-start: calc(100% - (var(--switch-thumb-size) - 1px));
    }
  }

  &[aria-checked='true'] {
    background-color: var(--color-primary-base);
  }

  &:disabled {
    border-color: var(--color-stroke-soft-200);
    background-color: var(--color-bg-white-0);
    pointer-events: none;

    .celeste-switch-thumb {
      inset-inline-start: var(--spacing-2);
      border-color: var(--color-bg-soft-200);
      background-color: var(--color-bg-soft-200);
      box-shadow: none;

      &[data-state='checked'] {
        inset-inline-start: calc(100% - var(--switch-thumb-size));
      }
    }
  }

  &:active:not(:disabled) .celeste-switch-thumb {
    --switch-thumb-size: 10px;
  }

  &:hover:not(:active, :disabled) {
    background-color: var(--color-bg-sub-300);

    &[aria-checked='true'] {
      background-color: var(--color-primary-darker);
    }
  }
}
</style>
