<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'radix-vue';
import { ComboboxItem, useForwardPropsEmits } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<ComboboxItemEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    class="dropdown-item"
  >
    <slot />
  </ComboboxItem>
</template>

<style>
.dropdown-item {
  padding: var(--spacing-8);
  border-radius: var(--radius-8);
  font: var(--typo-paragraph-latin-small);
  color: var(--color-text-strong-950);
  background: var(--color-bg-white-0);
}

.dropdown-item[data-highlighted] {
  background: var(--color-bg-weak-50);
}

.dropdown-item[data-disabled] {
  color: var(--color-icon-disabled-300);
  pointer-events: none;
}
</style>
