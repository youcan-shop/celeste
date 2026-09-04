<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { TabsTrigger, useForwardProps } from 'reka-ui';
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
    <span v-if="$slots.postfix" class="celeste-tab-menu-item-postfix">
      <slot name="postfix" />
    </span>
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
  transition:
    background-color var(--animation-fast) var(--animation-function),
    color var(--animation-fast) var(--animation-function);
  border: none;
  border-radius: var(--radius-8);
  color: var(--color-text-sub-600);
  font: var(--label-sm);
  cursor: pointer;
  gap: var(--spacing-6);

  &:deep(i) {
    width: 20px;
    height: 20px;
    transition: color var(--animation-fast) var(--animation-function);
  }

  &:focus {
    outline: none;
  }

  &[data-orientation='horizontal'] {
    width: fit-content;
    padding-block: var(--spacing-14);
    padding-inline: var(--spacing-0);
    background-color: var(--color-bg-white-0);
  }

  &[data-orientation='vertical'] {
    background-color: var(--color-bg-white-0);

    &:hover,
    &[data-state='active'] {
      background-color: var(--color-bg-weak-50);
    }

    .celeste-tab-menu-item-postfix {
      display: inline-flex;
      transform: scale(0.75);
      transition:
        transform var(--animation-fast) var(--animation-function),
        opacity var(--animation-fast) var(--animation-function);
      opacity: 0;
    }

    &[data-state='active'] .celeste-tab-menu-item-postfix {
      transform: scale(1);
      opacity: 1;
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

  .celeste-tab-menu-item-label {
    flex: 1;
    overflow: hidden;
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
