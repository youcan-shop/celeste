<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'reka-ui';

export interface BreadcrumbItemProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  active?: boolean;
}

const props = withDefaults(defineProps<BreadcrumbItemProps>(), { as: 'div' });
</script>

<template>
  <Primitive
    :as
    :as-child
    :aria-current="active ? 'page' : undefined"
    data-slot="breadcrumb-item"
    :class="clsx('celeste-breadcrumb-item', active && 'celeste-breadcrumb-item-active', props.class)"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss" scoped>
.celeste-breadcrumb-item {
  display: flex;
  align-items: center;
  transition-property: color, text-decoration-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  color: var(--color-text-sub-600);
  font: var(--label-sm);
  text-decoration: underline transparent;
  gap: var(--spacing-6);

  &:deep(i) {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: var(--color-text-strong-950);
    text-decoration-color: currentcolor;
  }

  &-active,
  &-active:hover {
    color: var(--color-text-strong-950);
    text-decoration-color: transparent;
  }
}
</style>
