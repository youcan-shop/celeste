<script setup lang="ts">
import type { ComboboxEmptyProps } from 'radix-vue';
import clsx from 'clsx';
import { ComboboxEmpty } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ComboboxEmpty v-bind="delegatedProps" :class="clsx('celeste-dropdown-empty-list', props.class)">
    <slot />
  </ComboboxEmpty>
</template>

<style lang="scss" scoped>
.celeste-dropdown-empty-list {
  display: flex;
  align-items: center;
  padding: var(--spacing-8);
  color: var(--color-text-sub-600);
  font: var(--paragraph-sm);
}
</style>
