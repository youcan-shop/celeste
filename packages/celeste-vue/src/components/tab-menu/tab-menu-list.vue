<script setup lang="ts">
import type { TabsListProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { TabsList } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { useTabObserver } from '@/composables/use-tab-observer';

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>();
const delegatedProps = useDelegatedProps(props, 'class');

const { listRef, indicator, ready } = useTabObserver('[data-state="active"]');
</script>

<template>
  <TabsList
    ref="listRef"
    v-bind="delegatedProps"
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
    border-block: 1px solid var(--color-stroke-soft-200);
    gap: 24px;
  }

  &[data-orientation='vertical'] {
    flex-direction: column;
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

  &[data-ready='true'] {
    transition-duration: var(--animation-normal);
    opacity: 1;
  }

  .celeste-tab-menu-list[data-orientation='vertical'] > & {
    display: none;
  }
}
</style>
