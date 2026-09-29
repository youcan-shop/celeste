<script setup lang="ts">
import type { DrawerDescriptionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import clsx from 'clsx';
import { DrawerDescription } from 'reka-ui';

const props = defineProps<DrawerDescriptionProps & { class?: HTMLAttributes['class'] }>();

const delegated = reactiveOmit(props, 'class');
</script>

<template>
  <DrawerDescription :class="clsx('celeste-drawer-description', props.class)" v-bind="delegated">
    <slot />
  </DrawerDescription>
</template>

<style scoped>
.celeste-drawer-description {
  margin: 0;
  color: var(--color-text-sub-600);
  font: var(--paragraph-sm);
}
</style>
