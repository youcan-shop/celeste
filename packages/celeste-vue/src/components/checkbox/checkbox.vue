<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class']; modelValue?: string[] | boolean | 'indeterminate' }>();
const emits = defineEmits<CheckboxRootEmits & { 'update:modelValue': [value: string[] | boolean | 'indeterminate'] }>();

const delegatedProps = useDelegatedProps(props, ['class', 'modelValue']);
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const isArrayModel = computed(() => Array.isArray(props.modelValue) && props.value !== undefined);
const arrayModelChecked = computed<boolean | undefined>(() => {
  if (!isArrayModel.value)
    return undefined;
  const arr = (props.modelValue as string[]) || [];
  return arr.includes(props.value as string);
});

function handleCheckedUpdate(next: boolean | 'indeterminate') {
  if (!isArrayModel.value) {
    emits('update:checked', next === 'indeterminate' ? false : next);
    return;
  }

  if (typeof next !== 'boolean')
    return;

  const current = ((props.modelValue as string[]) || []).slice();
  const val = props.value as string;
  const idx = current.indexOf(val);

  if (next && idx === -1)
    current.push(val);
  if (!next && idx !== -1)
    current.splice(idx, 1);

  emits('update:modelValue', current);
}
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="clsx('celeste-checkbox', props.class)"
    :checked="arrayModelChecked"
    @update:checked="handleCheckedUpdate"
  >
    <CheckboxIndicator class="celeste-checkbox-indicator" />
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

    &::before {
      content: '';
      position: absolute;
    }

    &[data-state='checked']::before {
      width: calc(var(--checkbox-checkmark-size) / 2);
      height: var(--checkbox-checkmark-size);
      margin-block-start: -3px;
      transform: scaleY(0.5);
      animation: fade-in var(--animation-fast) linear forwards;
    }

    &[data-state='checked']::before,
    [dir='ltr'] &[data-state='checked']::before,
    [dir='rtl'] &[data-state='checked']::before {
      border-top: transparent;
      border-right: 1.8px solid currentcolor;
      border-bottom: 1.8px solid currentcolor;
      border-left: transparent;
      rotate: 45deg;
    }

    &[data-state='indeterminate']::before {
      width: var(--checkbox-indeterminate-size);
      height: 1.8px;
      background-color: var(--color-static-white);
    }

    @keyframes fade-in {
      to {
        transform: scaleY(1);
      }
    }
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
