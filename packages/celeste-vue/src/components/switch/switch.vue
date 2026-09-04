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
    <SwitchThumb class="celeste-switch-thumb" />
  </SwitchRoot>
</template>

<style lang="scss">
.celeste-switch {
  --width: 26px;
  --height: 16px;
  --thumb-size: 12px;
  --thumb-inset: 1px;
  --travel: calc(var(--width) - var(--thumb-size) - var(--thumb-inset) * 2 - 2px);
  --bg-color: var(--color-bg-soft-200);

  position: relative;
  box-sizing: border-box;
  width: var(--width);
  height: var(--height);
  transition: background-color var(--animation-fast) ease-out;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  background-color: var(--bg-color);
  cursor: pointer;

  .celeste-switch-thumb {
    --thumb-hole: 4px;
    --direction: 1;

    display: block;
    position: absolute;
    box-sizing: border-box;
    width: var(--thumb-size);
    height: var(--thumb-size);
    transform: translateY(-50%) scale(var(--thumb-scale, 1));
    transition: transform var(--animation-fast) ease-out;
    border-radius: var(--radius-full);
    background-color: var(--color-static-white);
    box-shadow: var(--shadow-toggle-switch);
    inset-block-start: 50%;
    inset-inline-start: var(--thumb-inset);
    pointer-events: none;

    &[data-state='checked'] {
      transform: translateY(-50%) translateX(calc(var(--travel) * var(--direction))) scale(var(--thumb-scale, 1));
    }

    &::before {
      content: '';
      position: absolute;
      width: var(--thumb-hole);
      height: var(--thumb-hole);
      margin: auto;
      transition: background-color var(--animation-fast) ease-out;
      border-radius: var(--radius-full);
      background-color: var(--bg-color);
      inset: var(--spacing-0);
    }

    :dir(rtl) & {
      --direction: -1;
    }
  }

  &[aria-checked='true'] {
    --bg-color: var(--color-primary-base);
  }

  &:disabled {
    --bg-color: var(--color-bg-white-0);
    --thumb-inset: var(--spacing-2);
    --travel: calc(var(--width) - var(--thumb-size) - var(--thumb-inset) - 2px);

    border-color: var(--color-stroke-soft-200);
    background-color: var(--bg-color);
    pointer-events: none;

    .celeste-switch-thumb {
      border-color: var(--color-bg-soft-200);
      background-color: var(--color-bg-soft-200);
      box-shadow: none;
    }
  }

  &:active:not(:disabled) {
    --thumb-scale: 0.833;
  }

  &:hover:not(:active, :disabled) {
    --bg-color: var(--color-bg-sub-300);

    &[aria-checked='true'] {
      --bg-color: var(--color-primary-darker);
    }
  }
}
</style>
