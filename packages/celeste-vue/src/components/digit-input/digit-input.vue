<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import { PinInputRoot, type PinInputRootEmits, type PinInputRootProps, useForwardPropsEmits } from 'radix-vue';

const props = withDefaults(defineProps<PinInputRootProps & {
  class?: HTMLAttributes['class'];
  hasError?: boolean;
}>(), {
  modelValue: () => [],
  hasError: false,
});
const emits = defineEmits<PinInputRootEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'hasError');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <PinInputRoot
    v-bind="forwarded"
    :class="clsx('celeste-digit-input', props.class)"
    :data-error="hasError"
  >
    <slot />
  </PinInputRoot>
</template>

<style scoped lang="scss">
.celeste-digit-input {
  display: flex;
  align-items: center;
  gap: var(--spacing-10);
}
</style>
