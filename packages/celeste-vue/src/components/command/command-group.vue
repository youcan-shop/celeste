<script setup lang="ts">
import type { ComboboxGroupProps } from 'radix-vue';
import { ComboboxGroup, ComboboxLabel } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ComboboxGroupProps & {
  class?: HTMLAttributes['class'];
  heading?: string;
}>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ComboboxGroup
    v-bind="delegatedProps"
    class="celeste-command-group"
    :class="props.class"
  >
    <ComboboxLabel v-if="heading" class="celeste-command-label">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>

<style scoped>
.celeste-command-group {
  overflow: hidden;
}

.celeste-command-label {
  text-transform: uppercase;
  font: var(--subheading-latin-xs);
  color: var(--color-text-soft-400);
  padding: var(--spacing-4) var(--spacing-8);
}
</style>
