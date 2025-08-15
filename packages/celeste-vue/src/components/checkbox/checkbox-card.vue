<script setup lang="ts">
import type { LabelProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import clsx from 'clsx';
import { Label, Primitive } from 'radix-vue';

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
    :class="
      clsx('celeste-checkbox-card', props.class, {
        'celeste-checkbox-card-disabled': disabled,
      })
    "
  >

    <div
      v-if="$slots.image || $slots.icon"
      role="presentation"
      class="celeste-checkbox-card-preview"
      :class="[$slots.image ? 'celeste-checkbox-card-preview-image' : 'celeste-checkbox-card-preview-icon']"
    >
      <template v-if="$slots.image">
        <i class="celeste-checkbox-card-preview-fallback" i-celeste-image-circle-fill />
        <slot class="i-celeste-image-circle-fill?bg" name="image" />
      </template>

      <template v-else-if="$slots.icon">
        <slot name="icon" />
      </template>
    </div>

    <div class="celeste-checkbox-card-content">
      <div role="presentation">
        <div role="presentation" class="celeste-checkbox-card-row">
          <Primitive as="span" class="celeste-checkbox-card-label">
            <slot name="label" />
          </Primitive>

          <Primitive
            v-if="$slots.sublabel"
            as="span"
            class="celeste-checkbox-card-sublabel"
          >
            <slot name="sublabel" />
          </Primitive>
          <Primitive
            v-if="$slots.badge"
            as-child
            class="celeste-checkbox-card-badge"
          >
            <slot :disabled="disabled" name="badge" />
          </Primitive>
        </div>
      </div>

      <Primitive
        v-if="$slots.description"
        as="span"
        class="celeste-checkbox-card-description"
      >
        <slot name="description" />
      </Primitive>
    </div>

    <Primitive
      :disabled="disabled"
      as-child
      class="celeste-checkbox-card-checkbox"
    >
      <slot />
    </Primitive>

  </Label>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.celeste-checkbox-card {
  display: flex;
  align-items: flex-start;
  padding: var(--spacing-16);
  transition: all var(--animation-fast) ease-out;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-12);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  color: var(--color-text-strong-950);
  font: var(--paragraph-sm);
  gap: var(--spacing-14);

  &:not(.celeste-checkbox-card-disabled) {
    cursor: pointer;
  }

  &:has([data-state='checked']):not(.celeste-checkbox-card-disabled) {
    border-color: var(--color-primary-base);
    box-shadow: none;
  }

  &:hover:not(.celeste-checkbox-card-disabled),
  &:focus-visible:not(.celeste-checkbox-card-disabled) {
    background-color: var(--color-bg-weak-50);
    box-shadow: none;

    &:not(:has([data-state='checked'])) {
      border-color: transparent;
    }
  }
}

.celeste-checkbox-card-preview {
  display: flex;
  position: relative;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-full);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
}

.celeste-checkbox-card-preview-icon {
  i {
    width: 20px;
    height: 20px;
    color: var(--color-icon-sub-600);
  }
}

.celeste-checkbox-card-preview-image {
  i {
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%);
    color: var(--color-icon-sub-600);
  }

  :deep(img) {
    z-index: 1000;
  }

  :has(img) {
    border: none;

    i {
      display: none;
    }
  }
}

.celeste-checkbox-card-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.celeste-checkbox-card-row {
  display: flex;
  flex-shrink: 1;
  align-items: center;
  gap: var(--spacing-8);
}

.celeste-checkbox-card-label {
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
  color: var(--color-text-strong-950);
  font: var(--label-sm);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.celeste-checkbox-card-sublabel {
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.celeste-checkbox-card-description {
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);
}

.celeste-checkbox-card-disabled {
  cursor: not-allowed;

  .celeste-checkbox-card-label {
    color: var(--color-text-sub-600);
  }

  .celeste-checkbox-card-sublabel {
    color: var(--color-text-soft-400);
  }

  .celeste-checkbox-card-description {
    color: var(--color-text-soft-400);
  }
}
</style>
