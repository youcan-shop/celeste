<script setup lang="ts">
import type { ComboboxSeparatorProps } from 'radix-vue';
import clsx from 'clsx';
import { ComboboxSeparator } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ComboboxSeparator
    v-bind="delegatedProps"
    :class="clsx('celeste-command-separator', props.class)"
  >
    <slot />
  </ComboboxSeparator>
</template>

<style scoped>
.celeste-command-separator {
  width: 100%;
  height: 1px;
  background: var(--color-bg-soft-200);
}
</style>
