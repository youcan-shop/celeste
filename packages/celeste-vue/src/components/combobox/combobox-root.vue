<script setup lang="ts">
import { ComboboxRoot, type ComboboxRootEmits, type ComboboxRootProps, useForwardPropsEmits } from 'radix-vue';

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
