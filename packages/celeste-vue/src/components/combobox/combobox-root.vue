<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui';
import { ComboboxRoot, ConfigProvider, useForwardPropsEmits } from 'reka-ui';
import { useDirection } from '@/composables/use-direction';

const props = defineProps<ComboboxRootProps>();
const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const dir = useDirection(() => props.dir);
</script>

<template>
  <ComboboxRoot
    class="celeste-combobox-root"
    v-bind="forwarded"
    :dir="dir"
  >
    <ConfigProvider :dir="dir">
      <slot />
    </ConfigProvider>
  </ComboboxRoot>
</template>

<style lang="scss" scoped>
.celeste-combobox-root {
  flex-shrink: 0;
}
</style>
