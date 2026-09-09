<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'reka-ui';
import { ConfigProvider, TabsRoot, useForwardPropsEmits } from 'reka-ui';
import { useDirection } from '@/composables/use-direction';

const props = defineProps<TabsRootProps>();
const emits = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const direction = useDirection();
</script>

<template>
  <ConfigProvider :dir="props.dir ?? direction">
    <TabsRoot
      v-bind="forwarded"
      class="celeste-tab-menu-root"
    >
      <slot />
    </TabsRoot>
  </ConfigProvider>
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
