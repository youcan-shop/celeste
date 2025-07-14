<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { SelectRoot, type SelectRootEmits, type SelectRootProps, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<SelectRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<SelectRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SelectRoot
    v-bind="forwarded"
    :class="clsx('celeste-select', props.class)"
  >
    <slot />
  </SelectRoot>
</template>
