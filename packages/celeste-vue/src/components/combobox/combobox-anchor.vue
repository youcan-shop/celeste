<script setup lang="ts">
import type { ComboboxAnchorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { ComboboxAnchor, useForwardProps } from 'reka-ui';
import { computed } from 'vue';

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
    :class="clsx(props.class, 'celeste-dropdown-anchor')"
  >
    <slot />
  </ComboboxAnchor>
</template>
