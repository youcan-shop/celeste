<script setup lang="ts">
import clsx from 'clsx';
import { SelectRoot, type SelectRootEmits, type SelectRootProps, useForwardPropsEmits } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<SelectRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<SelectRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SelectRoot v-bind="forwarded" :class="clsx('celeste-select', props.class)">
    <slot />
  </SelectRoot>
</template>
