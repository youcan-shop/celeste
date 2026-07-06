<script setup lang="ts">
import type { ComboboxGroupProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { ComboboxGroup, ComboboxLabel } from 'reka-ui';
import { computed } from 'vue';

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
    :class="clsx(props.class, 'celeste-dropdown-items-group')"
  >
    <ComboboxLabel v-if="heading" class="">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>

<style lang="scss" scoped>
 .celeste-dropdown-items-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);

  &:deep([data-reka-collection-item]) {
    width: auto;
    height: auto;
  }
}
</style>
