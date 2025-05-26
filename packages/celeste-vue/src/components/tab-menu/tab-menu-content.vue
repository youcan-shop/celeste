<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/delegatedProps';
import clsx from 'clsx';
import { TabsContent, type TabsContentProps } from 'radix-vue';

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
  flex: 1;
}
</style>
