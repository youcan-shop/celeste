<script setup lang="ts">
import clsx from 'clsx';
import { SelectLabel, type SelectLabelProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <SelectLabel
    v-bind="delegatedProps"
    :class="clsx('celeste-select-label', props.class)"
  >
    <slot />
  </SelectLabel>
</template>

<style scoped>
.celeste-select-label {
  padding: var(--spacing-4) var(--spacing-8);
  color: var(--color-text-soft-400);
  font: var(--subheading-xs);
  text-transform: uppercase;
}
</style>
