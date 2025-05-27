<script setup lang="ts">
import clsx from 'clsx';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <span v-bind="delegatedProps" :class="clsx('celeste-select-item-icon', props.class)">
    <slot />
  </span>
</template>

<style scoped>
.celeste-select-item-icon {
  --select-icon-size: 20px;

  width: var(--select-icon-size);
  height: var(--select-icon-size);

  & > :where(i, svg, img) {
    width: 100%;
    height: 100%;
  }
}
</style>
