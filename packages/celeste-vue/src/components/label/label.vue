<script setup lang="ts">
import type { LinkButtonProps } from '../button/link-button.vue';
import LinkButton from '@/components/button/link-button.vue';
import clsx from 'clsx';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<LabelProps>(), {
  disabled: false,
  labelText: 'Label',
  required: false,
});

const mergedLinkButtonProps = computed(() => ({
  ...props.linkButtonProps,
  disabled: props.disabled,
}));
</script>

<script lang="ts">
export interface LabelProps {
  labelText: string;
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  sublabel?: string;
  required?: boolean;
  tooltip?: string;
  linkButtonLink?: string;
  linkButtonText?: string;
  linkButtonProps?: LinkButtonProps;
}
</script>

<template>
  <div
    :class="clsx(
      'celeste-label-wrapper',
      { 'celeste-label-wrapper-disabled': disabled },
      props.class,
    )"
  >
    <label
      :class="clsx(
        'celeste-label',
        { 'celeste-label-required': required },
      )"
      v-bind="$attrs"
    >
      {{ labelText }}
    </label>
    <span v-if="required" class="celeste-label-required-indicator">*</span>
    <span
      v-if="sublabel"
      class="celeste-sublabel"
    >
      {{ sublabel }}
    </span>
    <span v-if="tooltip" />
    <span v-if="linkButtonLink && linkButtonText" class="celeste-label-button">
      <LinkButton :href="linkButtonLink" v-bind="mergedLinkButtonProps">
        {{ linkButtonText }}
      </LinkButton>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.celeste-label-wrapper {
  --label-wrapper-sapcing: 1px;

  display: flex;
  align-items: center;
  align-self: stretch;
  gap: var(--label-wrapper-sapcing);

  .celeste-label {
    color: var(--color-text-strong-950);
    font: var(--label-sm);
  }

  .celeste-label-required-indicator {
    color: var(--color-primary-base);
    font: var(--label-sm);
  }

  .celeste-sublabel {
    color: var(--color-text-sub-600);
    font: var(--paragraph-sm);
  }

  .celeste-label-button {
    display: flex;
    flex: 1 0 0;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-4);
  }

  &-disabled {
    color: var(--color-text-disabled-300);

    .celeste-label,
    .celeste-sublabel,
    .celeste-label-required-indicator,
    .celeste-tooltip {
      color: inherit;
    }
  }
}
</style>
