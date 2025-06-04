<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import LinkButton, { type LinkButtonProps } from '@/components/button/link-button.vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';

const props = withDefaults(defineProps<LabelButtonProps>(), {
  type: 'gray',
});
const delegatedProps = useDelegatedProps(props, 'class');
</script>

<script lang="ts">
interface LabelButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  size?: LinkButtonProps['size'];
  type?: LinkButtonProps['type'];
  underline?: LinkButtonProps['underline'];
  disabled?: LinkButtonProps['disabled'];
}
</script>

<template>
  <LinkButton
    v-bind="delegatedProps"
    :class="clsx('celeste-label-button', props.class)"
  >
    <slot />
  </LinkButton>
</template>

<style scoped lang="scss">
.celeste-label-button {
  order: 5;
}
</style>
