<script setup lang="ts">
import clsx from 'clsx';
import { ComboboxInput, type ComboboxInputProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import TextInputIcon from '../text-input/text-input-icon.vue';
import TextInput, { type TextInputProps } from '../text-input/text-input.vue';

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class'];
  textInputProps?: Partial<TextInputProps>;
  searchable?: boolean;
}>();

const model = defineModel<string | undefined>();

const comboboxInputProps = computed(() => {
  const { class: _class, textInputProps: _textInputProps, ...rest } = props;
  return rest;
});

const textInputProps = computed((): TextInputProps => {
  return {
    type: 'search',
    size: 'sm',
    placeholder: 'Search',
    ...props.textInputProps,
  };
});
</script>

<template>
  <ComboboxInput
    v-bind="comboboxInputProps"
    :class="clsx('celeste-dropdown-input', props.class)"
    :readonly="!props.searchable"
    as="div"
  >
    <TextInput
      v-bind="textInputProps"
      v-model="model"
      :readonly="!props.searchable"
      :style="!props.searchable ? 'opacity: 0; height: 1px; padding: 0; border: none;' : ''"
    >
      <TextInputIcon v-if="props.searchable" icon="i-celeste-search-2-line" />
    </TextInput>
  </ComboboxInput>
</template>

<style lang="scss" scoped>
.celeste-dropdown-input {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  background-color: var(--color-bg-white-0);

  &:deep(.celeste-text-input-wrapper) {
    width: 100%;
    border: none;
    border-radius: var(--radius-8) var(--radius-8) 0 0;
    outline: none;
    box-shadow: none;
  }
}
</style>
