<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { RadioGroupIndicator, RadioGroupItem, type RadioGroupItemProps, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>();
const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps);
</script>

<template>
  <RadioGroupItem
    v-bind="forwarded"
    :class="clsx('celeste-radio-item', props.class)"
  >
    <RadioGroupIndicator class="celeste-radio-indicator" />
  </RadioGroupItem>
</template>

<style lang="scss">
.celeste-radio-item {
  --celeste-radio-border: var(--color-stroke-soft-200);

  all: unset;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  transition-property: box-shadow, background-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border-radius: 50%;
  background-color: var(--color-bg-white-0);
  box-shadow:
    inset 0 0 0 1.5px var(--celeste-radio-border),
    var(--shadow-regular-xs);

  &:hover:not([data-disabled]) {
    --celeste-radio-border: var(--color-stroke-sub-300);
  }

  &:focus:not([data-disabled]) {
    --celeste-radio-border: var(--color-primary-base);

    outline: none;
  }

  &[data-disabled] {
    background-color: var(--color-bg-soft-200);
    pointer-events: none;
  }

  &[data-state='checked']:not([data-disabled]) {
    --celeste-radio-border: transparent;

    background-color: var(--color-primary-base);

    &:hover,
    &:focus {
      background-color: var(--color-primary-darker);
    }
  }
}

.celeste-radio-indicator {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color-static-white);
  }
}
</style>
