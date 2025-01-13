<script setup lang="ts">
import clsx from 'clsx';
import { CheckboxIndicator, CheckboxRoot, type CheckboxRootEmits, type CheckboxRootProps, useForwardPropsEmits } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<CheckboxProps>();
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<script lang="ts">
export interface CheckboxProps extends CheckboxRootProps {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="clsx('celeste-checkbox', props.class)"
  >
    <CheckboxIndicator class="celeste-checkbox-indicator">
      <slot>
        <i :class="checked === 'indeterminate' ? 'i-celeste-indeterminate' : 'i-celeste-check'" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style lang="scss">
.celeste-checkbox {
  box-sizing: border-box;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  padding: 0;
  transition-property: border-color, background-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: 1.5px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-4);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);

  &:hover {
    border-color: var(--color-stroke-sub-300);
  }

  &:focus {
    border-color: var(--color-primary-base);
    outline: none;
  }

  &:disabled {
    background-color: var(--color-bg-soft-200);
    pointer-events: none;
  }

  &[data-state='checked']:not(:disabled),
  &[data-state='indeterminate']:not(:disabled) {
    border-color: transparent;
    background-color: var(--color-primary-base);

    &:hover,
    &:focus {
      background-color: var(--color-primary-darker);
    }
  }
}

.celeste-checkbox-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--color-static-white);

  i {
    width: 10px;
  }

  &[data-state='indeterminate'] {
    i {
      width: 8px;
    }
  }
}
</style>
