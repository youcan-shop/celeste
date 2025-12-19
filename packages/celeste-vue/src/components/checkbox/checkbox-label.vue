<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { Label, type LabelProps, Primitive } from 'radix-vue';
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
    :aria-disabcled="disabled"
    :class="clsx('celeste-checkbox-label', props.class)"
  >

    <Primitive as-child class="celeste-checkbox-label-checkbox">
      <slot />
    </Primitive>

    <div role="presentation">
      <div role="presentation" class="celeste-checkbox-label-row">
        <div>
          <Primitive as="span" class="celeste-checkbox-label-label">
            <slot name="label" />
          </Primitive>

          <Primitive
            v-if="$slots.sublabel"
            as="span"
            class="celeste-checkbox-label-sublabel"
          >
            <slot name="sublabel" />
          </Primitive>
        </div>

        <Primitive
          v-if="$slots.badge"
          as-child
          class="celeste-checkbox-label-badge"
        >
          <slot name="badge" />
        </Primitive>
      </div>

      <div role="presentation" class="celeste-checkbox-label-content">
        <Primitive
          v-if="$slots.description"
          as="span"
          class="celeste-checkbox-label-description"
        >
          <slot name="description" />
        </Primitive>

        <Primitive
          v-if="$slots.linkButton"
          as-child
          class="celeste-checkbox-label-link-button"
        >
          <slot name="linkButton" />
        </Primitive>
      </div>
    </div>
  </Label>
</template>

<style scoped lang="scss">
.celeste-checkbox-label {
  display: flex;
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  gap: var(--spacing-8);
}

:deep(.celeste-checkbox-label-checkbox) {
  margin-top: var(--spacing-2);
}

.celeste-checkbox-label-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.celeste-checkbox-label-sublabel {
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);
}

.celeste-checkbox-label-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: var(--spacing-4);
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);
}

.celeste-checkbox-label-link-button {
  margin-top: var(--spacing-10);
}
</style>
