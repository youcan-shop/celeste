<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { ToggleGroupRoot as SegmentedControlRoot, type ToggleGroupRootEmits, type ToggleGroupRootProps, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<Omit<ToggleGroupRootProps, 'type'> & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<ToggleGroupRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SegmentedControlRoot
    :class="clsx('celeste-segmented-control', props.class)"
    v-bind="forwarded"
    type="single"
  >
    <slot />
  </SegmentedControlRoot>
</template>

<style scoped>
.celeste-segmented-control {
  display: flex;
  gap: var(--spacing-4);
  align-items: center;
  width: 100%;
  padding: var(--spacing-4);
  border-radius: var(--radius-10);
  background-color: var(--color-bg-weak-50);

  &[data-orientation='vertical'] {
    flex-direction: column;
  }
}
</style>
