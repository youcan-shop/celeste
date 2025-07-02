<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';

const props = withDefaults(defineProps<{
  icon: string;
  position?: 'start' | 'end';
  class?: HTMLAttributes['class'];
}>(), {
  position: 'start',
});
const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <div v-bind="delegatedProps" :class="clsx('celeste-text-input-icon', props.class)">
    <i :class="icon" />
  </div>
</template>

<style scoped lang="scss">
.celeste-text-input-icon {
  display: flex;
  align-items: center;
  color: var(--color-text-sub-600);

  &[position='start'] {
    order: -1;
  }

  & > i {
    width: 20px;
    height: 20px;
  }
}
</style>
