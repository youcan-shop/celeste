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
    <SwitchThumb class="celeste-switch-thumb" />
  </SwitchRoot>
</template>

<style lang="scss">
.celeste-switch {
  --width: 26px;
  --height: 16px;
  --bg-color: var(--color-bg-soft-200);
  --animation-function: cubic-bezier(0.18, 0.89, 0.43, 1.19);

  position: relative;
  width: var(--width);
  height: var(--height);
  transition: background var(--animation-fast) ease-out;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  background-color: var(--bg-color);
  cursor: pointer;

  .celeste-switch-thumb {
    --thumb-size: 12px;
    --thumb-hole: 4px;

    position: absolute;
    box-sizing: border-box;
    width: var(--thumb-size);
    height: var(--thumb-size);
    transform: translateY(-50%);
    transition-property: inset-inline-start, width, height;
    transition-duration: var(--animation-fast);
    transition-timing-function: var(--animation-function), ease-out, ease-out;
    border-radius: var(--radius-full);
    background-color: var(--color-static-white);
    box-shadow: var(--shadow-toggle-switch);
    inset-block-start: 50%;
    inset-inline-start: 1px;
    will-change: transform;

    &[data-state='checked'] {
      inset-inline-start: calc(100% - var(--thumb-size) - 1px);
    }

    &::before {
      content: '';
      position: absolute;
      width: var(--thumb-hole);
      height: var(--thumb-hole);
      margin: auto;
      transition: background var(--animation-fast) ease-out;
      border-radius: var(--radius-full);
      background-color: var(--bg-color);
      inset: var(--spacing-0);
    }
  }

  &[aria-checked='true'] {
    --bg-color: var(--color-primary-base);
  }

  &:disabled {
    --bg-color: var(--color-bg-white-0);

    border-color: var(--color-stroke-soft-200);
    background-color: var(--bg-color);
    pointer-events: none;

    .celeste-switch-thumb {
      inset-inline-start: var(--spacing-2);
      border-color: var(--color-bg-soft-200);
      background-color: var(--color-bg-soft-200);
      box-shadow: none;

      &[data-state='checked'] {
        inset-inline-start: calc(100% - var(--thumb-size));
      }
    }
  }

  &:active:not(:disabled) .celeste-switch-thumb {
    --thumb-size: 10px;
  }

  &:hover:not(:active, :disabled) {
    --bg-color: var(--color-bg-sub-300);

    &[aria-checked='true'] {
      --bg-color: var(--color-primary-darker);
    }
  }
}
</style>
