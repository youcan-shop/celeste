<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Separator } from 'radix-vue';

const props = withDefaults(defineProps<ContentDividerProps>(), {
  type: 'line',
});
</script>

<script lang="ts">
export interface ContentDividerProps {
  class?: HTMLAttributes['class'] ;
  type: 'line' | 'text' | 'text-line' | 'solid-text' | 'group-buttons';
  text?: string;
}
</script>

<template>
  <Separator
    aria-label="divider"
    :class="clsx('celeste-celecte-content-divider', props.class)"
    class="celecte-content-divider"
  >
    <div
      v-if="type === 'line'"
      class="celecte-content-divider-type-line"
    />
    <div
      v-if="type === 'text' && text"
      class="celecte-content-divider-type-text"
    >
      {{ text }}
    </div>
    <div
      v-if="type === 'text-line' && text"
      class="celecte-content-divider-type-text-line"
    >
      <hr> <span>{{ text }}</span> <hr>
    </div>
    <div
      v-if="type === 'solid-text' && text"
      class="celecte-content-divider-type-solid-text"
    >
      {{ text }}
    </div>
  </Separator>
</template>

<style lang="scss">
.celecte-content-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-soft-400);
  font: var(--subheading-xs);
  text-transform: var(--text-case-uppercase);
  word-break: keep-all;

  &-type-line {
    flex: 1 0 0;
    width: 100%;
    height: 1px;
    padding-block: var(--spacing-1);
    background: var(--color-stroke-soft-200);
    gap: var(--spacing-8);
  }

  &-type-text {
    display: flex;
    align-items: center;
    width: 100%;
    height: 24px;
    gap: var(--spacing-8);
    padding: var(--spacing-4) var(--spacing-8);
    white-space: nowrap;
  }

  &-type-text-line {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    width: 100%;
    height: var(--spacing-12);
    font: var(--subheading-xs);
    gap: var(--spacing-10);
    white-space: nowrap;

    hr {
      width: 100%;
      height: 1px;
      border: none;
      background: var(--color-stroke-soft-200);
    }
  }

  &-type-solid-text {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    align-self: stretch;
    width: 100%;
    padding: var(--spacing-6) 20px;
    background: var(--color-bg-weak-50);
    gap: var(--spacing-6);
  }
}
</style>
