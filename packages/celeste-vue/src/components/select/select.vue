<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { ConfigProvider, SelectRoot, useForwardPropsEmits } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { useDirection } from '@/composables/use-direction';

const props = defineProps<SelectRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<SelectRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const dir = useDirection(() => props.dir);
</script>

<template>
  <SelectRoot
    v-bind="forwarded"
    :class="clsx('celeste-select', props.class)"
    :dir="dir"
  >
    <ConfigProvider :dir="dir">
      <slot />
    </ConfigProvider>
  </SelectRoot>
</template>
