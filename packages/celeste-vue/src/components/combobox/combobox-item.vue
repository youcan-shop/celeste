<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'radix-vue';
import clsx from 'clsx';
import { ComboboxItem, useForwardPropsEmits } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import Checkbox from '../checkbox/checkbox.vue';

const props = defineProps<ComboboxItemProps<DropdownItemProps> & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<ComboboxItemEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<script lang="ts">
export interface DropdownItemProps {
  class?: HTMLAttributes['class'];
  label: string;
  size?: 'sm' | 'lg';
  checkbox?: boolean;
  sublabel?: string;
  description?: string;
  selected?: boolean | 'indeterminate';
  focused?: boolean;
}
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    :disabled="disabled"
  >
    <div
      tabindex="0"
      :aria-disabled="disabled"
      :class="clsx(
        props.class,
        'celeste-dropdown-item',
        { 'celeste-dropdown-item-disabled': disabled },
        { 'celeste-dropdown-item-selected': value.selected },
        { 'celeste-dropdown-item-focused': value.focused },
      )"
    >
      <Checkbox
        v-if="value.checkbox && value.size === 'sm'"
        v-model:checked="value.selected"
        :disabled="disabled"
      />
      <div
        v-if="$slots.prefix"
        :class="clsx(
          'celeste-dropdown-item-prefix',
          `celeste-dropdown-item-prefix-${value.size}`,
        )"
      >
        <slot name="prefix" />
      </div>
      <div class="celeste-dropdown-item-info">
        <div
          :class="clsx(
            'celeste-dropdown-item-header',
            `celeste-dropdown-item-header-${value.size}`,
          )"
        >
          <span class="celeste-dropdown-item-label" v-html="value.label" />
          <span v-if="value.sublabel" class="celeste-dropdown-item-sublabel">{{ value.sublabel }}</span>
        </div>
        <p v-if="value.description && value.size === 'lg'" class="celeste-dropdown-item-description">
          {{ value.description }}
        </p>
      </div>
      <div v-if="$slots.suffix" class="celeste-dropdown-item-suffix">
        <slot name="suffix" />
      </div>
      <i v-if="value.selected" class="i-celeste-check-fill" />
    </div>
  </ComboboxItem>
</template>

<style lang="scss" scoped>
.celeste-dropdown-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-8);
  transition-property: background-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border-radius: var(--radius-8);
  background: var(--color-bg-white-0);
  cursor: pointer;
  gap: var(--spacing-8);

  i {
    color: var(--color-icon-sub-600);
  }

  &:hover,
  &-focused {
    background: var(--color-bg-weak-50);
  }

  :deep(.celeste-input-wrapper) {
    gap: 0;
  }

  &-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
  }

  &-label {
    color: var(--color-text-strong-950);
    font: var(--paragraph-sm);
  }

  &-sublabel {
    color: var(--color-text-soft-400);
    font: var(--paragraph-xs);
  }

  &-description {
    margin: var(--spacing-0);
    color: var(--color-text-sub-600);
    font: var(--paragraph-xs);
  }

  .celeste-dropdown-item-prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-icon-sub-600);

    &-lg {
      padding: var(--spacing-10);
      border: 1px solid var(--color-stroke-soft-200);
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-regular-xs);
      gap: var(--spacing-10);
    }
  }

  .celeste-dropdown-item-suffix {
    color: var(--color-icon-sub-600);
  }

  &-disabled {
    color: var(--color-text-disabled-300);
    cursor: not-allowed;

    :deep(i) {
      color: var(--color-text-disabled-300);
    }

    .celeste-dropdown-item-label,
    .celeste-dropdown-item-sublabel,
    .celeste-dropdown-item-description {
      color: var(--color-text-disabled-300);
    }
  }

  &-selected {
    background: var(--color-bg-weak-50);
  }

  .celeste-dropdown-item-info {
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-4);
  }

  .celeste-dropdown-item-header-lg {
    .celeste-dropdown-item-label {
      font-weight: var(--font-weights-display-0);
    }
  }
}
</style>
