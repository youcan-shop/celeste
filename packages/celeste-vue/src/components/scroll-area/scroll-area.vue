<script setup lang="ts">
import type { ScrollAreaRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { ConfigProvider, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport } from 'reka-ui';
import { useDelegatedProps, useDirection } from '@/composables';
import ScrollBar from './scroll-bar.vue';

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = useDelegatedProps(props, 'class');

const direction = useDirection();
</script>

<template>
  <ConfigProvider :dir="props.dir ?? direction">
    <ScrollAreaRoot
      v-bind="delegatedProps"
      :class="clsx('celeste-scroll-area', props.class)"
    >
      <ScrollAreaViewport class="celeste-scroll-area-viewport">
        <slot />
      </ScrollAreaViewport>
      <ScrollBar />
      <ScrollBar orientation="horizontal" />
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  </ConfigProvider>
</template>

<style scoped lang="scss">
.celeste-scroll-area {
  position: relative;
  overflow: hidden;
}

:deep(.celeste-scroll-area-viewport) {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}
</style>
