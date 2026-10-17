<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'reka-ui';

export interface BreadcrumbArrowProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<BreadcrumbArrowProps>();
</script>

<template>
  <Primitive
    :as
    :as-child
    aria-hidden="true"
    data-slot="breadcrumb-arrow"
    :class="clsx('celeste-breadcrumb-arrow', props.class)"
  >
    <slot>
      <i class="i-celeste-arrow-right-s-line" />
    </slot>
  </Primitive>
</template>

<style lang="scss" scoped>
.celeste-breadcrumb-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--color-text-disabled-300);
  font: var(--paragraph-md);
  user-select: none;

  &:deep(i) {
    width: 20px;
    height: 20px;
  }

  &:dir(rtl):deep(i) {
    transform: scaleX(-1);
  }
}
</style>
