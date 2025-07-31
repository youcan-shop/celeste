<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import { Primitive, type PrimitiveProps, useForwardProps } from 'radix-vue';

const props = defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>();
const delegatedProps = reactiveOmit(props, 'class');
const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <Primitive v-bind="forwardedProps" :class="clsx('celeste-digit-input-group', props.class)">
    <slot />
  </Primitive>
</template>

<style scoped lang="scss">
.celeste-digit-input-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-10);
}
</style>
