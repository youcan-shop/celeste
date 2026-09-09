<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { RadioGroupRoot, useForwardPropsEmits } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { useDirection } from '@/composables/use-direction';

const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<RadioGroupRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const dir = useDirection(() => props.dir);
</script>

<template>
  <RadioGroupRoot
    :class="clsx('celeste-radio-wrapper', props.class)"
    v-bind="forwarded"
    :dir="dir"
  >
    <slot />
  </RadioGroupRoot>
</template>

<style lang="scss">
  .celeste-radio-wrapper {
  &[data-orientation='vertical'] {
    display: flex;
    flex-direction: column;
  }
}
</style>
