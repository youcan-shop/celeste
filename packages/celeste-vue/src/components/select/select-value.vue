<script setup lang="ts">
import clsx from 'clsx';
import { SelectValue, type SelectValueProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<SelectValueProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SelectValue v-bind="delegatedProps" :class="clsx('celeste-select-value', props.class)">
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
