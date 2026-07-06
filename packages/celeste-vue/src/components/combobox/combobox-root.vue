<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui';
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<ComboboxRootProps>();
const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxRoot class="celeste-combobox-root" v-bind="forwarded">
    <slot />
  </ComboboxRoot>
</template>

<style lang="scss" scoped>
.celeste-combobox-root {
  flex-shrink: 0;
}
</style>
