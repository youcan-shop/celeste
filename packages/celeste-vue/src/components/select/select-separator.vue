<script setup lang="ts">
import clsx from 'clsx';
import { SelectSeparator, type SelectSeparatorProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <SelectSeparator
    v-bind="delegatedProps"
    :class="clsx('celeste-select-separator', props.class)"
  />
</template>

<style scoped>
.celeste-select-separator {
  width: 100%;
  height: 1px;
  margin-block: calc(var(--spacing-6) * 0.5);
  background-color: var(--color-stroke-soft-200);
}
</style>
