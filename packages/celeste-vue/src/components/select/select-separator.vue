<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { SelectSeparator, type SelectSeparatorProps } from 'radix-vue';

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>();
const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <SelectSeparator
    v-bind="delegatedProps"
    :class="clsx('celeste-select-separator', props.class)"
  />
</template>

<style scoped lang="scss">
.celeste-select-separator {
  width: 100%;
  height: 1px;
  margin-block: calc(var(--spacing-6) * 0.5);
  background-color: var(--color-stroke-soft-200);
}
</style>
