<script setup lang="ts">
import type { TabsListProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { TabsList } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { useTabObserver } from '@/composables/use-tab-observer';

export interface TabMenuListProps extends TabsListProps {
  class?: HTMLAttributes['class'];
  bordered?: boolean;
  scrollable?: boolean;
  fill?: boolean;
  align?: 'start' | 'center';
}

const props = withDefaults(defineProps<TabMenuListProps>(), {
  bordered: true,
  scrollable: false,
  fill: false,
  align: 'start',
});

const delegatedProps = useDelegatedProps(props, ['class', 'bordered', 'scrollable', 'fill', 'align']);

const { listRef, indicator, ready } = useTabObserver('[data-state="active"]');
</script>

<template>
  <TabsList
    ref="listRef"
    v-bind="delegatedProps"
    :data-bordered="bordered"
    :data-scrollable="scrollable"
    :data-fill="fill"
    :data-align="align"
    :class="clsx(
      'celeste-tab-menu-list',
      props.class,
    )"
  >
    <slot />
    <div
      class="celeste-tab-menu-indicator"
      :data-ready="ready"
      :style="{
        width: `${indicator.width}px`,
        transform: `translate3d(${indicator.left}px, 0, 0)`,
      }"
    />
  </TabsList>
</template>

<style scoped>
.celeste-tab-menu-list {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: var(--spacing-10);
  gap: var(--spacing-8);

  &[data-orientation='horizontal'] {
    position: relative;
    flex-direction: row;
    padding: var(--spacing-0);
    gap: 24px;

    &[data-bordered='true'] {
      border-block: 1px solid var(--color-stroke-soft-200);
    }
  }

  &[data-orientation='vertical'] {
    flex-direction: column;
  }

  &[data-scrollable='true'] {
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &[data-fill='true'] :deep(.celeste-tab-menu-item) {
    flex: 1 1 0;
    width: auto;
  }

  &[data-align='center'] :deep(.celeste-tab-menu-item) {
    justify-content: center;
  }

  &[data-align='center'] :deep(.celeste-tab-menu-item-label) {
    flex: 0 1 auto;
  }
}

.celeste-tab-menu-indicator {
  position: absolute;
  bottom: -1px;
  left: 0;
  height: 2px;
  transition-property: transform, width;
  transition-duration: 0s;
  transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  opacity: 0;
  background-color: var(--color-primary-base);
  pointer-events: none;

  .celeste-tab-menu-list[data-scrollable='true'] > & {
    bottom: 0;
  }

  &[data-ready='true'] {
    transition-duration: var(--animation-normal);
    opacity: 1;
  }

  .celeste-tab-menu-list[data-orientation='vertical'] > & {
    display: none;
  }
}
</style>
