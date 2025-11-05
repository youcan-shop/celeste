<script setup lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'radix-vue';
import { CollapsibleRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<CollapsibleProps>();
const emits = defineEmits<CollapsibleRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<script lang="ts">
export interface CollapsibleProps extends CollapsibleRootProps {}
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="forwarded">
    <slot :open="open" />
  </CollapsibleRoot>
</template>
