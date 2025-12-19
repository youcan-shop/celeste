<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { SelectLabel, type SelectLabelProps } from 'radix-vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>();
const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <SelectLabel
    v-bind="delegatedProps"
    :class="clsx('celeste-select-label', props.class)"
  >
    <slot />
  </SelectLabel>
</template>

<style scoped lang="scss">
.celeste-select-label {
  padding: var(--spacing-4) var(--spacing-8);
  color: var(--color-text-soft-400);
  font: var(--subheading-xs);
  text-transform: uppercase;
}
</style>
