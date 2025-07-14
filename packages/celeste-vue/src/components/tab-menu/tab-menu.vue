<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'radix-vue';
import { TabsRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<TabsRootProps>();
const emits = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TabsRoot v-bind="forwarded" class="celeste-tab-menu-root">
    <slot />
  </TabsRoot>
</template>

<style scoped>
.celeste-tab-menu-root {
  display: flex;

  &[data-orientation='vertical'] {
    flex-direction: row;
  }

  &[data-orientation='horizontal'] {
    flex-direction: column;
  }
}
</style>
