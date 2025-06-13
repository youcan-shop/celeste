<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { RadioGroupRoot, type RadioGroupRootEmits, type RadioGroupRootProps, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<RadioGroupRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <RadioGroupRoot
    :class="clsx('celeste-radio-wrapper', props.class)"
    v-bind="forwarded"
  >
    <slot />
  </RadioGroupRoot>
</template>

<style lang="scss">
  .celeste-radio-wrapper[data-orientation='vertical'] {
  display: flex;
  flex-direction: column;
}
</style>
