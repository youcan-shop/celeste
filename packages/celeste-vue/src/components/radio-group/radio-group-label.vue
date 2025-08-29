<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { Label, type LabelProps, Primitive } from 'radix-vue';

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
    :class="clsx('celeste-radio-label', props.class)"
  >
    <Primitive as-child class="celeste-radio-label-radio">
      <slot />
    </Primitive>

    <div role="presentation">
      <div role="presentation" class="celeste-radio-label-row">
        <div>
          <Primitive as="span" class="celeste-radio-label-label">
            <slot name="label" />
          </Primitive>

          <Primitive
            v-if="$slots.sublabel"
            as="span"
            class="celeste-radio-label-sublabel"
          >
            <slot name="sublabel" />
          </Primitive>
        </div>

        <Primitive
          v-if="$slots.badge"
          as-child
          class="celeste-radio-label-badge"
        >
          <slot name="badge" />
        </Primitive>
      </div>

      <div role="presentation" class="celeste-radio-label-content">
        <Primitive
          v-if="$slots.description"
          as="span"
          class="celeste-radio-label-description"
        >
          <slot name="description" />
        </Primitive>

        <Primitive
          v-if="$slots.linkButton"
          as-child
          class="celeste-radio-label-link-button"
        >
          <slot name="linkButton" />
        </Primitive>
      </div>
    </div>
  </Label>
</template>

<style scoped lang="scss">
.celeste-radio-label {
  display: flex;
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  gap: var(--spacing-8);
}

:deep(.celeste-radio-label-radio) {
  margin-top: var(--spacing-2);
}

.celeste-radio-label-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.celeste-radio-label-sublabel {
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);
}

.celeste-radio-label-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: var(--spacing-4);
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);
}

.celeste-radio-label-link-button {
  margin-top: var(--spacing-10);
}
</style>
