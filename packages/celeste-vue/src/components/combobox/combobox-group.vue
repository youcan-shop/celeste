<script setup lang="ts">
import type { ComboboxGroupProps } from 'radix-vue';
import clsx from 'clsx';
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
    :class="clsx(props.class)"
  >
    <ComboboxLabel v-if="heading" class="">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
