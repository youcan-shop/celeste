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
  padding: var(--spacing-4) var(--spacing-8);
  color: var(--color-text-soft-400);
  font: var(--subheading-xs);
  text-transform: uppercase;
}
</style>
