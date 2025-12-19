<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="clsx(
      'celeste-tab-menu-item',
      props.class,
    )"
  >
    <slot name="prefix" />
    <span v-if="$slots.default" class="celeste-tab-menu-item-label">
      <slot />
    </span>
    <slot name="postfix" />
  </TabsTrigger>
</template>

<style scoped>
.celeste-tab-menu-item {
  --animation-function: cubic-bezier(0, 0, 0.2, 1);

  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: var(--spacing-8);
  transition: all var(--animation-fast) var(--animation-function);
  border: none;
  border-radius: var(--radius-8);
  color: var(--color-text-sub-600);
  font-size: var(--font-size-10);
  cursor: pointer;
  gap: var(--spacing-6);

  &:deep(i) {
    width: 20px;
    height: 20px;
  }

  &:focus {
    outline: none;
  }

  &[data-orientation='horizontal'] {
    position: relative;
    padding-block: var(--spacing-14);
    padding-inline: var(--spacing-0);

    &::after {
      content: '';
      display: block;
      position: absolute;
      inset-inline: 0;
      inset-block-end: 0;
      width: 100%;
      height: 2px;
      transition: all var(--animation-fast) var(--animation-function);
      background-color: transparent;
    }
  }

  &[data-orientation='vertical'][data-state='active'] {
    background-color: var(--color-bg-weak-50);
  }

  &[data-orientation='horizontal'][data-state='active'] {
    background-color: var(--color-bg-white-0);

    &::after {
      background-color: var(--color-primary-base);
    }
  }

  &[data-state='active'] {
    &:deep(i) {
      color: var(--color-primary-base);
    }

    span {
      color: var(--color-text-strong-950);
    }
  }

  &[data-state='inactive'] {
    background-color: var(--color-bg-white-0);
  }

  .celeste-tab-menu-item-label {
    flex: 1;
    overflow: hidden;
    font-size: var(--font-size-2);
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
