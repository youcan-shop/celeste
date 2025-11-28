<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables';
import clsx from 'clsx';
import { ScrollAreaScrollbar, type ScrollAreaScrollbarProps, ScrollAreaThumb } from 'radix-vue';

const props = withDefaults(defineProps<ScrollAreaScrollbarProps & { class?: HTMLAttributes['class'] }>(), {
  orientation: 'vertical',
});

const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="delegatedProps"
    :class="clsx('celeste-scroll-bar', props.class)"
  >
    <ScrollAreaThumb class="celeste-scroll-bar-thumb" />
  </ScrollAreaScrollbar>
</template>

<style scoped lang="scss">
.celeste-scroll-bar {
  --bar-size: 8px;

  display: flex;
  user-select: none;
  touch-action: none;

  &[data-orientation='vertical'] {
    width: var(--bar-size);
    height: 100%;
    padding: var(--spacing-2);
    border-inline-start: 1px solid transparent;
  }

  &[data-orientation='horizontal'] {
    flex-direction: column;
    height: var(--thumb-size);
    padding: var(--spacing-2);
    border-block-start: 1px solid transparent;
  }
}

.celeste-scroll-bar-thumb {
  position: relative;
  flex: 1;
  border-radius: calc(infinity * 1px);
  background-color: var(--color-bg-sub-300);
}
</style>
