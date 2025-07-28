<script setup lang="ts">
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
    <i class="celeste-command-input-icon i-celeste-search-line" />
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

  display: flex;
  align-items: center;
  padding: var(--spacing-8);
  transition:
    color,
    background-color var(--animation-normal) ease;
  font: var(--paragraph-sm);
  gap: var(--spacing-8);
}

.celeste-command-input:hover {
  --icon-color: var(--color-icon-sub-600);
  --placeholder-color: var(--color-text-sub-600);

  background: var(--color-bg-weak-50);
}

.celeste-command-input-primitive {
  width: 100%;
  transition: color var(--animation-normal) ease;
  border: none;
  outline: none;
  background: transparent;
  font: inherit;
}

.celeste-command-input-icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  transition: color var(--animation-normal) ease;
  color: var(--icon-color);
}

.celeste-command-input-primitive::placeholder {
  transition: color var(--animation-normal) ease;
  color: var(--placeholder-color);
}
</style>
