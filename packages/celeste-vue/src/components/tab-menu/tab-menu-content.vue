<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { TabsContent, type TabsContentProps } from 'radix-vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<TabsContentProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <TabsContent
    :class="clsx('celeste-tab-menu-content', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </TabsContent>
</template>

<style scoped>
.celeste-tab-menu-content {
  &[data-orientation='vertical'] {
    flex: 1;
  }
}
</style>
