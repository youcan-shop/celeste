<script setup lang="ts">
import type { SelectGroupProps } from 'reka-ui';
import { SelectGroup } from 'reka-ui';

const props = defineProps<SelectGroupProps>();
</script>

<template>
  <SelectGroup v-bind="props">
    <slot />
  </SelectGroup>
</template>
