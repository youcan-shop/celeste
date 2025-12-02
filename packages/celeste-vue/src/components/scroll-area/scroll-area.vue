<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables';
import clsx from 'clsx';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'radix-vue';
import ScrollBar from './scroll-bar.vue';

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
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
