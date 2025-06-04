<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import Tooltip from '@/components/tooltip/tooltip.vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { Label, type LabelProps } from 'radix-vue';

const props = defineProps<LabelProps & {
  sublabel?: string;
  information?: string;
  required?: boolean;
  disabled?: boolean;
  class?: HTMLAttributes['class'];
}>();

const delegatedProps = useDelegatedProps(props, 'class');
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :aria-required="required"
    :aria-disabled="disabled"
    :class="clsx('celeste-label', props.class)"
  >
    <slot />
    <span v-if="sublabel" class="celeste-sublabel">{{ sublabel }}</span>
    <Tooltip
      v-if="information"
      :title="information"
    >
      <button class="celeste-label-info">
        <i class="i-celeste-information-2-fill" />
      </button>
    </Tooltip>
  </Label>
</template>

<style scoped lang="scss">
.celeste-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--color-text-strong-950);
  font: var(--label-sm);

  &:has(> a) > *:last-child {
    flex: 2;
  }

  &[aria-required='true']::after {
    content: '*';
    order: 2;
    color: var(--color-primary-base);
  }

  &:not(:has(> .celeste-sublabel, > .celeste-label-info, &[aria-required='true'])) {
    & > * {
      flex: none;
    }

    &[aria-required='false'] {
      justify-content: space-between;
    }

    &[aria-required='true']::after {
      flex: 2;
    }
  }

  .celeste-sublabel {
    order: 3;
    color: var(--color-text-sub-600);
    font: var(--paragraph-sm);
  }

  .celeste-label-info {
    display: flex;
    align-items: center;
    order: 4;
    padding: 0;
    border: none;
    background-color: transparent;
    color: var(--color-icon-disabled-300);
  }

  &[aria-disabled='true'] {
    color: var(--color-text-disabled-300);
    pointer-events: none;

    &::after,
    & > :deep(a),
    .celeste-sublabel {
      color: inherit;
    }
  }
}
</style>
