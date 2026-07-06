<script setup lang="ts">
import type { TooltipRootProps as PrimitiveProps, TooltipRootEmits } from 'reka-ui';
import { TooltipRoot, useForwardPropsEmits } from 'reka-ui';
import { ref } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

export interface TooltipRootProps extends PrimitiveProps {}

const props = defineProps<TooltipRootProps>();
const emits = defineEmits<TooltipRootEmits>();

const delegatedProps = useDelegatedProps(props, 'open');
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const open = ref(false);
</script>

<template>
  <TooltipRoot v-bind="forwarded" v-model:open="open">
    <slot />
  </TooltipRoot>
</template>
