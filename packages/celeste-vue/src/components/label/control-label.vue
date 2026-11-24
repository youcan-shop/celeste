<script setup lang="ts">
import type { LabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Label, Primitive } from 'reka-ui';
import { useDelegatedProps } from '@/composables/use-delegated-props';

const props = defineProps<LabelProps & {
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
    :class="clsx('celeste-control-label', props.class)"
  >
    <span role="presentation" class="celeste-control-label-control">
      <slot />
    </span>

    <div role="presentation">
      <div role="presentation" class="celeste-control-label-row">
        <div>
          <Primitive as="span" class="celeste-control-label-label">
            <slot name="label" />
          </Primitive>

          <Primitive
            v-if="$slots.sublabel"
            as="span"
            class="celeste-control-label-sublabel"
          >
            <slot name="sublabel" />
          </Primitive>
        </div>

        <Primitive
          v-if="$slots.badge"
          as-child
          class="celeste-control-label-badge"
        >
          <slot name="badge" />
        </Primitive>
      </div>

      <div
        v-if="$slots.description || $slots.linkButton"
        role="presentation"
        class="celeste-control-label-content"
      >
        <Primitive
          v-if="$slots.description"
          as="span"
          class="celeste-control-label-description"
        >
          <slot name="description" />
        </Primitive>

        <Primitive
          v-if="$slots.linkButton"
          as-child
          class="celeste-control-label-link-button"
        >
          <slot name="linkButton" />
        </Primitive>
      </div>
    </div>
  </Label>
</template>

<style scoped lang="scss">
.celeste-control-label {
  display: flex;
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  cursor: pointer;
  user-select: none;
  gap: var(--spacing-8);

  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
}

.celeste-control-label-control {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 1lh;
}

.celeste-control-label-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.celeste-control-label-sublabel {
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);
}

.celeste-control-label-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: var(--spacing-4);
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);
}

.celeste-control-label-link-button {
  margin-top: var(--spacing-10);
}
</style>
