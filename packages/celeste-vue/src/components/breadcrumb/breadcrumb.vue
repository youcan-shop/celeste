<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Primitive } from 'reka-ui';

export interface BreadcrumbProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<BreadcrumbProps>(), { as: 'nav' });
</script>

<template>
  <Primitive
    :as
    :as-child
    aria-label="Breadcrumb"
    data-slot="breadcrumb"
    :class="clsx('celeste-breadcrumb', props.class)"
  >
    <slot />
  </Primitive>
</template>

<style scoped>
.celeste-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-6);
}
</style>
