<script setup lang="ts">
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { ConfigProvider, DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { useDirection } from '@/composables/use-direction';

const props = defineProps<DropdownMenuRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DropdownMenuRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const direction = useDirection();
</script>

<template>
  <ConfigProvider :dir="props.dir ?? direction">
    <DropdownMenuRoot
      v-bind="forwarded"
      :class="clsx('celeste-dropdown-menu', props.class)"
    >
      <slot />
    </DropdownMenuRoot>
  </ConfigProvider>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
</style>
