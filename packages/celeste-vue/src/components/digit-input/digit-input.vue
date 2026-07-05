<script lang="ts">
</script>

<script setup lang="ts" generic="Type extends PinInputType = 'text'">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import { PinInputRoot, type PinInputRootEmits, type PinInputRootProps, useForwardPropsEmits } from 'reka-ui';

export type PinInputType = 'text' | 'number';

const props = withDefaults(defineProps<PinInputRootProps<Type> & {
  class?: HTMLAttributes['class'];
  hasError?: boolean;
}>(), {
  modelValue: () => [] as any,
  hasError: false,
});
const emits = defineEmits<PinInputRootEmits<Type>>();

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
  max-width: 100%;
  gap: var(--spacing-10);
}
</style>
