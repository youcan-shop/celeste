<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { SelectValue, type SelectValueProps } from 'radix-vue';

const props = defineProps<SelectValueProps & { class?: HTMLAttributes['class'] }>();
const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <SelectValue
    v-bind="delegatedProps"
    :class="clsx('celeste-select-value', props.class)"
  >
    <slot />
  </SelectValue>
</template>

<style scoped>
.celeste-select-value {
  display: flex;
  align-items: center;
  overflow: hidden;
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  text-overflow: ellipsis;
  white-space: nowrap;
  gap: var(--spacing-8);

  &:deep(i),
  &:deep(~ i) {
    flex-shrink: 0;
    color: var(--color-icon-sub-600);
  }
}
</style>
