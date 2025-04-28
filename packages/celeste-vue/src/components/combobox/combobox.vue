<script setup lang="ts">
import { ComboboxRoot, type ComboboxRootEmits, type ComboboxRootProps, useForwardPropsEmits } from 'radix-vue';
import ComboboxAnchor from './combobox-anchor.vue';
import ComboboxGroup from './combobox-group.vue';
import ComboboxItem from './combobox-item.vue';
import ComboboxList from './combobox-list.vue';
import ComboboxTrigger from './combobox-trigger.vue';

const props = defineProps<ComboboxRootProps>();
const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
// const v = ref('');
</script>

<script>
</script>

<template>
  <div class="root">
    <ComboboxRoot v-bind="forwarded">
      <ComboboxAnchor>
        <ComboboxTrigger>
          trigger
        </ComboboxTrigger>
      </ComboboxAnchor>
      <ComboboxList>
        <ComboboxGroup>
          <ComboboxItem
            :value="{
              label: 'Label',
              sublabel: '(optional)',
              description: 'Descriptions',
            }"
          />
        </ComboboxGroup>
      </ComboboxList>
    </ComboboxRoot>
  </div>
</template>

<style lang="scss" scoped>
</style>
