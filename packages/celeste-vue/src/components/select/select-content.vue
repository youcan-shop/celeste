<script setup lang="ts">
import clsx from 'clsx';
import { SelectContent, type SelectContentEmits, type SelectContentProps, SelectPortal, SelectViewport, useForwardPropsEmits } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<SelectContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<SelectContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="forwarded"
      position="popper"
      :class="clsx('celeste-select-content', props.class)"
    >
      <SelectViewport class="celeste-select-view-port">
        <slot />
      </SelectViewport>
    </SelectContent>
  </SelectPortal>
</template>

<style>
.celeste-select-content {
  width: var(--radix-select-trigger-width);
  scale: 0.98;
  margin-block-start: var(--spacing-4);
  animation: open var(--animation-fast) forwards;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-16);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
  gap: var(--spacing-4);

  .celeste-select-view-port {
    padding: var(--spacing-8);
  }
}

@keyframes open {
  to {
    scale: 1;
    margin-block-start: var(--spacing-8);
  }
}
</style>
