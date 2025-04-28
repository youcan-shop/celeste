<script setup lang="ts">
import type { ComboboxAnchorProps } from 'radix-vue';
import clsx from 'clsx';
import { ComboboxAnchor, useForwardProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ComboboxAnchorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxAnchor
    v-bind="forwarded"
    :class="clsx(props.class)"
  >
    <slot />
  </ComboboxAnchor>
</template>
