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
    class="celeste-command-item"
    :class="props.class"
  >
    <slot />
  </ComboboxItem>
</template>

<style>
.celeste-command-item {
  padding: var(--spacing-8);
  border-radius: var(--radius-8);
  font: var(--paragraph-sm);
  color: var(--color-text-strong-950);
  background: var(--color-bg-white-0);
}

.celeste-command-item[data-highlighted] {
  background: var(--color-bg-weak-50);
}

.celeste-command-item[data-disabled] {
  color: var(--color-icon-disabled-300);
  pointer-events: none;
}
</style>
