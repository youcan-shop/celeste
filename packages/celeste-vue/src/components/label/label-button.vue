<script setup lang="ts">
import LinkButton, { type LinkButtonProps } from '@/components/button/link-button.vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';

const props = defineProps</* @vue-ignore */ LinkButtonProps>();
const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <LinkButton
    v-bind="delegatedProps"
    :type="props.type || 'gray'"
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
