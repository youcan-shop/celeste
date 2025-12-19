<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps } from 'radix-vue';
import { useForwardPropsEmits } from 'radix-vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<DropdownMenuRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DropdownMenuRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuRoot
    v-bind="forwarded"
    :class="clsx('celeste-dropdown-menu', props.class)"
  >
    <slot />
  </DropdownMenuRoot>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
</style>
