<script setup lang="ts">
import { DropdownMenuGroup, type DropdownMenuGroupProps } from 'radix-vue';

const props = defineProps<DropdownMenuGroupProps>();
</script>

<template>
  <DropdownMenuGroup class="celeste-dropdown-menu-group" v-bind="props">
    <slot />
  </DropdownMenuGroup>
</template>

<style lang="scss" scoped>
.celeste-dropdown-menu-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}
</style>
