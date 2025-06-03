<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'radix-vue';

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes['class']; label: string; sublabel?: string; description?: string }>();

const delegatedProps = useDelegatedProps(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="clsx(
      'celeste-dropdown-menu-item',
      props.class,
    )"
  >
    <div class="celeste-dropdown-menu-item-prefix">
      <slot name="prefix" />
    </div>

    <div class="celeste-dropdown-menu-item-body">
      <div class="celeste-dropdown-menu-item-text">
        <span class="celeste-dropdown-menu-item-label" :title="label">{{ label }}</span>
        <span
          v-if="sublabel"
          :title="sublabel"
          class="celeste-dropdown-menu-item-sublabel"
        >{{ sublabel }}</span>
      </div>
      <div v-if="description" class="celeste-dropdown-menu-item-description">
        {{ description }}
      </div>
    </div>

    <div class="celeste-dropdown-menu-item-suffix">
      <slot name="suffix" />
    </div>
  </DropdownMenuItem>
</template>

<style lang="scss" scoped>
.celeste-dropdown-menu-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-8);
  transition-property: background-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border-radius: var(--radius-8);
  background: var(--color-bg-white-0);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  cursor: pointer;
  gap: var(--spacing-8);

  i {
    color: var(--color-icon-sub-600);
  }

  &:focus-visible,
  &:not([data-disabled]):hover,
  &[data-highlighted] {
    outline: none;
    background: var(--color-bg-weak-50);
  }

  &-body {
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-4);
    width: fit-content;
    max-width: 400px;
    overflow: hidden;
    white-space: nowrap;
  }

  &-text {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    max-width: 65%;
  }

  &-label,
  &-sublabel {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    overflow: hidden;
    color: var(--color-text-sub-600);
    font: var(--paragraph-xs);
    text-overflow: ellipsis;
  }

  .celeste-dropdown-menu-item-prefix,
  .celeste-dropdown-menu-item-suffix {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 50%;
    height: fit-content;
    color: var(--color-icon-sub-600);

    &:deep(i) {
      color: var(--color-icon-sub-600);
    }
  }

  &[data-disabled] {
    color: var(--color-text-disabled-300);
    cursor: auto;

    .celeste-dropdown-menu-item-label,
    .celeste-dropdown-menu-item-sublabel,
    .celeste-dropdown-menu-item-prefix,
    .celeste-dropdown-menu-item-suffix,
    .celeste-dropdown-menu-item-description {
      color: var(--color-text-disabled-300);

      :deep(i) {
        color: var(--color-icon-disabled-300);
      }
    }
  }
}
</style>
