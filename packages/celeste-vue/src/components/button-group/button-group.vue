<script setup lang="ts">
import clsx from 'clsx';
import { ToggleGroupRoot, type ToggleGroupRootProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ButtonGroupProps>();

const modelValue = defineModel<string | string[]>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<script lang="ts">
export interface ButtonGroupProps extends Omit<ToggleGroupRootProps, 'orientation'> {
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <ToggleGroupRoot
    v-bind="delegatedProps"
    v-model="modelValue"
    :class="clsx(props.class)"
  >
    <slot />
  </ToggleGroupRoot>
</template>
