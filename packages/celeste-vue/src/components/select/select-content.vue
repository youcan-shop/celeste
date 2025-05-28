<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { SelectContent, type SelectContentEmits, type SelectContentProps, SelectPortal, SelectViewport, useForwardPropsEmits } from 'radix-vue';

const props = withDefaults(defineProps<SelectContentProps & {
  class?: HTMLAttributes['class'];
  width?: 'full' | 'fit';
}>(), { width: 'full' });
const emits = defineEmits<SelectContentEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="forwarded"
      position="popper"
      :data-width="width"
      :class="clsx('celeste-select-content', props.class)"
    >
      <SelectViewport class="celeste-select-view-port">
        <slot />
      </SelectViewport>
    </SelectContent>
  </SelectPortal>
</template>

<style scoped lang="scss">
:deep(.celeste-select-content) {
  max-height: var(--radix-select-content-available-height);
  overflow-y: scroll;
  animation: var(--animation-fast) forwards;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-16);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
  scale: 0.98;
  gap: var(--spacing-4);

  &[data-side='top'] {
    margin-block-start: var(--spacing-4);
    animation-name: open-top;
  }

  &[data-side='bottom'] {
    margin-block-end: var(--spacing-4);
    animation-name: open-bottom;
  }

  &[width='full'] {
    width: var(--radix-select-trigger-width);
  }

  .celeste-select-view-port {
    padding: var(--spacing-8);
  }
}

@keyframes open-bottom {
  to {
    scale: 1;
    margin-block-start: var(--spacing-8);
  }
}

@keyframes open-top {
  to {
    scale: 1;
    margin-block-end: var(--spacing-8);
  }
}
</style>
