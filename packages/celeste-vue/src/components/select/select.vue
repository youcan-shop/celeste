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

const direction = useDirection();
</script>

<template>
  <ConfigProvider :dir="props.dir ?? direction">
    <SelectRoot
      v-bind="forwarded"
      :class="clsx('celeste-select', props.class)"
    >
      <slot />
    </SelectRoot>
  </ConfigProvider>
</template>
