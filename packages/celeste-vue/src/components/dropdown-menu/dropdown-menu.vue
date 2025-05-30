<script setup lang="ts">
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { DropdownMenuRoot, type DropdownMenuRootProps } from 'radix-vue';
import { ref } from 'vue';

const props = defineProps<DropdownMenuRootProps>();

const delegatedProps = useDelegatedProps(props, 'open');

const open = ref(false);
</script>

<template>
  <DropdownMenuRoot v-bind="delegatedProps" v-model:open="open">
    <slot />
  </DropdownMenuRoot>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
</style>
