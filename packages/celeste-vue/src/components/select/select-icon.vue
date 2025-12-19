<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <span v-bind="delegatedProps" :class="clsx('celeste-select-icon', props.class)">
    <slot />
  </span>
</template>

<style scoped lang="scss">
.celeste-select-icon {
  --select-icon-size: 20px;

  width: var(--select-icon-size);
  height: var(--select-icon-size);
  transition: color var(--animation-fast) ease-out;

  & > :where(i, svg, img) {
    width: 100%;
    height: 100%;
  }
}
</style>
