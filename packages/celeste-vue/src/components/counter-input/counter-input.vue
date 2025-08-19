<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot, type NumberFieldRootEmits, type NumberFieldRootProps, useForwardPropsEmits } from 'radix-vue';
import CompactButton from '../button/compact-button.vue';

const props = defineProps<NumberFieldRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<NumberFieldRootEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <label for="">djdjd</label>
  <NumberFieldRoot
    v-bind="forwarded"
    :class="clsx('celeste-counter-input', props.class)"
  >
    <NumberFieldDecrement as-child>
      <CompactButton variant="ghost" icon="i-celeste-subtract-line" />
    </NumberFieldDecrement>
    <NumberFieldInput id="piw" />
    <NumberFieldIncrement as-child>
      <CompactButton variant="ghost" icon="i-celeste-add-line" />
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>

<style scoped lang="scss">
label {
  background-color: rebeccapurple;
}

:deep(.celeste-counter-input) {
  background-color: red;

  &[size='xs'] {
    --input-gap: 8px;
    --input-height: 32px;
    --input-radius: var(--radius-8);
    --input-padding: calc(var(--spacing-8) - var(--spacing-2));
  }

  &[size='sm'] {
    --input-gap: 6px;
    --input-height: 36px;
    --input-radius: var(--radius-8);
    --input-padding: var(--spacing-8);
  }

  &[size='md'] {
    --input-gap: 6px;
    --input-height: 40px;
    --input-radius: var(--radius-10);
    --input-padding: var(--spacing-10);
  }
}
</style>
