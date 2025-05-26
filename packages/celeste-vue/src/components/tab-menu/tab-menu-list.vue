<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/delegatedProps';
import clsx from 'clsx';
import { TabsList, type TabsListProps } from 'radix-vue';

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <TabsList
    v-bind="delegatedProps"
    :class="clsx(
      'celeste-tab-menu-list',
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>

<style scoped>
.celeste-tab-menu-list {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--spacing-10);
  gap: var(--spacing-8);

  &[data-orientation='horizontal'] {
    flex-direction: row;
    padding: 0;
    padding-inline: 0;
    border-block: 1px solid var(--color-stroke-soft-200);
    gap: var(--spacing-16);
  }

  &[data-orientation='vertical'] {
    flex-direction: column;
  }
}
</style>
