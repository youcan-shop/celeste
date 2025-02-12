<script setup lang="ts">
import type { BadgeProps } from '../badge/badge.vue';
import type { LinkButtonProps } from '../button/link-button.vue';
import clsx from 'clsx';
import { CheckboxIndicator, CheckboxRoot, type CheckboxRootEmits, type CheckboxRootProps, useForwardPropsEmits } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import Badge from '../badge/badge.vue';
import LinkButton from '../button/link-button.vue';

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
});
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, checked: __, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
const modelValue = defineModel<boolean | 'indeterminate'>('checked', { required: false });
</script>

<script lang="ts">
export interface CheckboxProps extends CheckboxRootProps {
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  label: string;
  description?: string;
  flip?: boolean;
  sublabel?: string;
  badgeProps?: BadgeProps;
  linkButtonProps?: LinkButtonProps;
  link?: string;
  linkText?: string;
}
</script>

<template>
  <label class="celeste-input-wrapper" :class="{ flipped: flip }">
    <CheckboxRoot
      v-bind="forwarded"
      v-model:checked="modelValue"
      :class="clsx('celeste-checkbox', props.class)"
      :aria-checked="modelValue"
      :aria-disabled="disabled"
      role="checkbox"
    >
      <CheckboxIndicator class="celeste-checkbox-indicator">
        <slot>
          <i :class="checked === 'indeterminate' ? 'i-celeste-indeterminate' : 'i-celeste-check'" />
        </slot>
      </CheckboxIndicator>
    </CheckboxRoot>

    <!-- Label & Extras -->
    <div class="celeste-input-info">
      <div class="celeste-input-header">
        <span class="celeste-input-title">{{ label }}</span>
        <span v-if="sublabel" class="celeste-input-sublabel">({{ sublabel }})</span>
        <span v-if="badgeProps" class="celeste-input-badge">
          <Badge v-bind="badgeProps" />
        </span>
      </div>
      <div v-if="description" class="celeste-input-description">{{ description }}</div>
      <div v-if="linkButtonProps && link" class="celeste-input-action">
        <LinkButton :href="link" v-bind="linkButtonProps">
          {{ linkText }}
        </LinkButton>
      </div>
    </div>
  </label>
</template>

<style lang="scss">
.celeste-checkbox {
  --celeste-checkbox-border: var(--color-stroke-soft-200);

  box-sizing: border-box;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  padding: 0;
  transition-property: box-shadow, background-color;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: none;
  border-radius: var(--radius-4);
  background-color: var(--color-bg-white-0);
  box-shadow:
    inset 0 0 0 1.5px var(--celeste-checkbox-border),
    var(--shadow-regular-xs);

  &:hover {
    --celeste-checkbox-border: var(--color-stroke-sub-300);
  }

  &:focus {
    --celeste-checkbox-border: var(--color-primary-base);

    outline: none;
  }

  &:disabled {
    background-color: var(--color-bg-soft-200);
    pointer-events: none;
  }

  &[data-state='checked']:not(:disabled),
  &[data-state='indeterminate']:not(:disabled) {
    --celeste-checkbox-border: transparent;

    background-color: var(--color-primary-base);

    &:hover,
    &:focus {
      background-color: var(--color-primary-darker);
    }
  }
}

.celeste-checkbox-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--color-static-white);

  i {
    width: 10px;
  }

  &[data-state='indeterminate'] {
    i {
      width: 8px;
    }
  }
}

.celeste-input-wrapper {
  display: flex;
  gap: var(--spacing-8);
  align-items: flex-start;
  cursor: pointer;

  &.flipped {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
}

.celeste-input-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-4);
}

.celeste-input-header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4);
}

.celeste-input-title {
  font: var(--label-md);
  line-height: var(--line-heights-8);
}

.celeste-input-sublabel {
  color: var(--color-text-sub-600);
  font: var(--label-sm);
  font-weight: var(--font-weights-sans-0);
  line-height: var(--line-heights-8);
}

.celeste-input-badge {
  line-height: var(--line-heights-9);
}

.celeste-input-description {
  color: var(--color-text-sub-600);
  font: var(--paragraph-xs);
}

.celeste-input-action {
  margin-top: var(--spacing-4);
  pointer-events: auto;
}
</style>
