<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <span v-bind="delegatedProps" :class="clsx('celeste-select-item-icon', props.class)">
    <slot />
  </span>
</template>

<style scoped>
.celeste-select-item-icon {
  --select-icon-size: 20px;

  width: var(--select-icon-size);
  height: var(--select-icon-size);

  & > :where(i, svg, img) {
    width: 100%;
    height: 100%;
  }
}
</style>
