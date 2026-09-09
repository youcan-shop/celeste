<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui';
import { ComboboxRoot, ConfigProvider, useForwardPropsEmits } from 'reka-ui';
import { useDirection } from '@/composables/use-direction';

const props = defineProps<ComboboxRootProps>();
const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const direction = useDirection();
</script>

<template>
  <ConfigProvider :dir="props.dir ?? direction">
    <ComboboxRoot class="celeste-combobox-root" v-bind="forwarded">
      <slot />
    </ComboboxRoot>
  </ConfigProvider>
</template>

<style lang="scss" scoped>
.celeste-combobox-root {
  flex-shrink: 0;
}
</style>
