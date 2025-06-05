<script setup lang="ts">
import clsx from 'clsx';
import { ComboboxInput, type ComboboxInputProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import TextInput, { type TextInputProps } from '../input/text-input.vue';

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class'];
  textInputProps?: Partial<TextInputProps>;
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
    as="div"
  >
    <slot v-if="$slots.default" />
    <TextInput
      v-else
      v-bind="textInputProps"
      v-model="model"
    >
      <template #prefix>
        <i class="i-celeste-search-2-line" />
      </template>
      <template #suffix>
        <div
          @click="() => model = ''"
        >
          <i class="i-celeste-close-line" />
        </div>
      </template>
    </TextInput>
  </ComboboxInput>
</template>

<style lang="scss" scoped>
.celeste-dropdown-input {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  background-color: var(--color-bg-white-0);

  &:deep(.celeste-input-wrapper) {
    width: 100%;
    border: none;
    border-radius: 0;
    box-shadow: none;

    .celeste-input-prefix,
    .celeste-input-suffix > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: none;
      background: none;
      color: var(--color-icon-sub-600);
    }

    .celeste-input-suffix {
      cursor: pointer;
    }
  }

  &:deep(.celeste-input-wrapper-type-search) {
    border-top-left-radius: var(--radius-8);
    border-top-right-radius: var(--radius-8);
  }

  &:deep(.celeste-input-wrapper:focus-within) {
    border: none;
    box-shadow: none;
  }
}
</style>
