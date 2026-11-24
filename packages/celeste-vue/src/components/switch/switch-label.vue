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
    :class="clsx('celeste-switch-label', props.class)"
  >
    <slot />

    <div role="presentation">
      <div role="presentation" class="celeste-switch-label-row">
        <div>
          <Primitive as="span" class="celeste-switch-label-label">
            <slot name="label" />
          </Primitive>

          <Primitive
            v-if="$slots.sublabel"
            as="span"
            class="celeste-switch-label-sublabel"
          >
            <slot name="sublabel" />
          </Primitive>
        </div>

        <Primitive
          v-if="$slots.badge"
          as-child
          class="celeste-switch-label-badge"
        >
          <slot name="badge" />
        </Primitive>
      </div>

      <div
        v-if="$slots.description || $slots.linkButton"
        role="presentation"
        class="celeste-switch-label-content"
      >
        <Primitive
          v-if="$slots.description"
          as="span"
          class="celeste-switch-label-description"
        >
          <slot name="description" />
        </Primitive>

        <Primitive
          v-if="$slots.linkButton"
          as-child
          class="celeste-switch-label-link-button"
        >
          <slot name="linkButton" />
        </Primitive>
      </div>
    </div>
  </Label>
</template>

<style scoped lang="scss">
.celeste-switch-label {
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

.celeste-switch-label-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.celeste-switch-label-sublabel {
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);
}

.celeste-switch-label-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: var(--spacing-4);
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);
}

.celeste-switch-label-link-button {
  margin-top: var(--spacing-10);
}
</style>
