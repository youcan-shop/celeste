<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { TableCell, TableRow } from '@/components/table';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';

const props = withDefaults(
  defineProps<TableEmptyProps>(),
  { colspan: 1 },
);

const delegated = useDelegatedProps(props, 'class');
</script>

<script lang="ts">
export interface TableEmptyProps {
  colspan?: number;
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <TableRow>
    <TableCell v-bind="delegated" :class="clsx('celeste-table-empty', props.class)">
      <div class="celeste-table-empty-content">
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>

<style scoped>
.celeste-table-empty {
  align-self: middle;
  white-space: nowrap;
}

.celeste-table-empty-content {
  display: flex;
  place-items: center;
  justify-content: center;
}
</style>
