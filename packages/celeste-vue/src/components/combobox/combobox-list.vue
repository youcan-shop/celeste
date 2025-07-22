<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from 'radix-vue';
import clsx from 'clsx';
import { ComboboxContent, ComboboxPortal, ComboboxViewport, useForwardPropsEmits } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>(), {
  position: 'popper',
  align: 'center',
  sideOffset: 4,
});
const emits = defineEmits<ComboboxContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent
      v-bind="forwarded"
      :class="clsx('celeste-dropdown-content', props.class)"
    >
      <ComboboxViewport class="celeste-dropdown-items-viewport">
        <slot />
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxPortal>
</template>

<style lang="scss" scoped>
.celeste-dropdown-content,
div:deep(.celeste-dropdown-content) {
  --dropdown-width: 100%;
  --dropdown-height: 300px;

  display: flex;
  z-index: 50;
  box-sizing: border-box;
  flex-direction: column;
  width: var(--dropdown-width);
  min-width: 300px;
  max-height: var(--dropdown-height);
  margin-top: var(--spacing-10);
  padding: var(--spacing-8);
  overflow: visible;
  transform-origin: var(--radix-combobox-content-transform-origin);
  animation-duration: var(--animation-fast);
  animation-timing-function: ease-out;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-16);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-md);
  gap: var(--spacing-4);

  &[data-state='open'] {
    animation-name: slide-up-and-fade;
  }

  &[data-state='closed'] {
    animation-name: slide-down-and-fade;
  }
}

div:deep(.celeste-dropdown-items-viewport) {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

@keyframes slide-up-and-fade {
  from {
    transform: translateY(10px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-down-and-fade {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(10px);
    opacity: 0;
  }
}
</style>
