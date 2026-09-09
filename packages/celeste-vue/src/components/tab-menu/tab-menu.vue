<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'reka-ui';
import { TabsRoot, useForwardPropsEmits } from 'reka-ui';
import { useDirection } from '@/composables/use-direction';

const props = defineProps<TabsRootProps>();
const emits = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const dir = useDirection(() => props.dir);
</script>

<template>
  <TabsRoot
    v-bind="forwarded"
    class="celeste-tab-menu-root"
    :dir="dir"
  >
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
