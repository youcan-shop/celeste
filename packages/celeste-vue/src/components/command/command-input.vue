<script setup lang="ts">
import { IconSearchLine } from '@youcan/celeste-icons';
import clsx from 'clsx';
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class'];
}>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <div class="celeste-command-input" cmdk-input-wrapper>
    <IconSearchLine class="celeste-command-input-icon" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      :class="clsx('celeste-command-input-primitive', props.class)"
    />
  </div>
</template>

<style scoped>
.celeste-command-input {
  --icon-color: var(--color-icon-soft-400);
  --placeholder-color: var(--color-text-soft-400);

  padding: var(--spacing-8);
  gap: var(--spacing-8);
  display: flex;
  align-items: center;
  font: var(--paragraph-latin-sm);
  transition:
    color,
    background-color var(--animation-normal) ease;
}

.celeste-command-input:hover {
  --icon-color: var(--color-icon-sub-600);
  --placeholder-color: var(--color-text-sub-600);

  background: var(--color-bg-weak-50);
}

.celeste-command-input-primitive {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  transition: color var(--animation-normal) ease;
}

.celeste-command-input-icon {
  color: var(--icon-color);
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transition: color var(--animation-normal) ease;
}

.celeste-command-input-primitive::placeholder {
  color: var(--placeholder-color);
  transition: color var(--animation-normal) ease;
}
</style>
