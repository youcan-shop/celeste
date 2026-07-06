<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';

const props = withDefaults(defineProps<ComboboxRootProps & { class?: HTMLAttributes['class'] }>(), {
  open: true,
  modelValue: '',
});

const emits = defineEmits<ComboboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxRoot
    v-bind="forwarded"
    class="celeste-command-root"
    :class="props.class"
  >
    <slot />
  </ComboboxRoot>
</template>

<style>
.celeste-command-root {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: var(--spacing-8);
  overflow: hidden;
  border-radius: var(--radius-16);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
  gap: var(--spacing-4);
}
</style>
