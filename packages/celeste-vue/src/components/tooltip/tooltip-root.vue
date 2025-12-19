<script setup lang="ts">
import { type TooltipRootProps as PrimitiveProps, TooltipRoot, type TooltipRootEmits, useForwardPropsEmits } from 'radix-vue';
import { ref } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<TooltipRootProps>();
const emits = defineEmits<TooltipRootEmits>();

const delegatedProps = useDelegatedProps(props, 'open');
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const open = ref(false);
</script>

<script lang="ts">
export interface TooltipRootProps extends PrimitiveProps {}
</script>

<template>
  <TooltipRoot v-bind="forwarded" v-model:open="open">
    <slot />
  </TooltipRoot>
</template>
