<script setup lang="ts">
import clsx from 'clsx';
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxItem, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from 'radix-vue';
import { computed, ref, watch } from 'vue';
import TextInput from '../input/text-input.vue';
import DropdownItem from './dropdown-item.vue';

const props = withDefaults(defineProps<Dropdown>(), {
  disabled: false,
  placeholder: 'Placeholder',
  size: 'sm',
  type: 'normal',
  multiple: false,
  searchable: false,
  emptyLabel: 'No options available',
});

const emit = defineEmits(['update:modelValue']);

const selected = ref<SelectedType | SelectedType[] | null>(props.multiple ? [] : null);
const searched = ref<string>('');
const isFocused = ref(false);

watch(selected, (newValue) => {
  emit('update:modelValue', newValue);
});

// Filter options based on search input
const filteredOptions = computed(() => {
  if (!props.searchable || !searched.value)
    return props.options;
  return props.options.filter(option =>
    option.label.toLowerCase().includes(searched.value.toLowerCase()),
  );
});

// Check if an option is selected
function optionIsSelected(option: SelectedType): boolean {
  if (!props.multiple) {
    return selected.value && !Array.isArray(selected.value)
      ? option.value === selected.value.value
      : false;
  }

  return Array.isArray(selected.value)
    ? selected.value.some(selectedOption => selectedOption.value === option.value)
    : false;
}
</script>

<script lang="ts">
export interface Dropdown {
  disabled?: boolean;
  icon?: string;
  placeholder: string;
  error?: boolean;
  size?: 'xs' | 'sm' | 'md';
  multiple?: boolean;
  emptyLabel?: string;
  searchable?: boolean;
  options: SelectedType[];
}

export interface SelectedType {
  value: any;
  label: string;
  icon?: string;
  image?: string;
  [key: string]: any;
}
</script>

<template>
  <div class="celeste-dropdown-wrapper">
    <ComboboxRoot
      v-model="selected"
      :disabled="disabled"
      :multiple="props.multiple"
      class="celeste-dropdown-root"
    >
      <ComboboxAnchor
        :class="clsx(
          'celeste-dropdown-anchor',
          `celeste-dropdown-anchor-size-${props.size}`,
          { 'celeste-dropdown-anchor-error': props.error },
          { 'celeste-dropdown-anchor-disabled': props.disabled },
          { 'celeste-dropdown-anchor-focused': isFocused },
          { 'celeste-dropdown-anchor-filled': selected },
        )"
        tabindex="0"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
        <div v-if="$slots.prefix" class="celeste-dropdown-anchor-prefix">
          <div v-if="selected && !Array.isArray(selected)" class="celeste-dropdown-anchor-prefix-selected">
            <i v-if="selected.icon" :class="selected.icon" />
            <div v-if="selected.image">
              <slot name="image" v-bind="{ selected }">
                <img
                  :src="selected.image"
                  alt="Selected option"
                  class="selected-dropdown-image"
                >
              </slot>
            </div>
          </div>
          <slot
            v-else
            name="prefix"
            class="celeste-dropdown-anchor-prefix-default"
          />
        </div>
        <ComboboxTrigger
          as="span"
          :disabled="disabled"
          class="celeste-dropdown-input"
          @focus="isFocused = true"
          @blur="isFocused = false"
        >
          <span v-if="multiple">{{ placeholder }}</span>
          <span v-else>
            {{ selected && !Array.isArray(selected) ? selected.label : props.placeholder }}
          </span>
        </ComboboxTrigger>
        <ComboboxTrigger
          :disabled="disabled"
          class="celeste-dropdown-trigger"
          @focus="isFocused = true"
          @blur="isFocused = false"
        >
          <i class="i-celeste-arrow-down-s-line" />
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxContent force-mount class="celeste-dropdown-content">
        <ComboboxViewport class="celeste-dropdown-items-viewport">
          <div v-if="searchable" class="celeste-dropdown-search">
            <TextInput
              v-model="searched"
              type="search"
              size="sm"
              placeholder="Search"
              @focus="isFocused = true"
              @blur="isFocused = false"
            >
              <template #prefix>
                <i class="i-celeste-search-2-line" />
              </template>
              <template v-if="isFocused" #suffix>
                <div
                  @click="() => searched = ''"
                >
                  <i class="i-celeste-close-line" />
                </div>
              </template>
            </TextInput>
            <ComboboxSeparator class="celeste-dropdown-separator" />
          </div>
          <ComboboxEmpty class="celeste-dropdown-empty-list" />

          <ComboboxGroup class="celeste-dropdown-items-group">
            <ComboboxItem
              v-for="option in filteredOptions"
              :key="option.value"
              class="celeste-dropdown-item"
              :value="option"
            >
              <div>
                <DropdownItem
                  :label="option.label"
                  :checkbox="props.multiple"
                  :selected="optionIsSelected(option)"
                  :disabled="props.disabled"
                />
              </div>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxRoot>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

@mixin icon-size {
  width: 20px;
  height: 20px;
}

@mixin transition-default {
  transition-property: background-color, transform, opacity;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
}

* {
  box-sizing: border-box;
}

.celeste-dropdown-wrapper {
  --dropdown-width: 100%;
  --dropdown-height: 300px;

  position: relative;

  &:deep(.celeste-dropdown-root) {
    display: flex;
    position: relative;
    flex-direction: column;
    width: var(--dropdown-width);
    padding-top: var(--spacing-4);
    gap: var(--spacing-10);
  }

  .celeste-dropdown-anchor {
    @include transition-default;

    display: flex;
    align-items: center;
    border: 1px solid var(--color-stroke-soft-200);
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-regular-xs);
    gap: var(--spacing-8);

    :deep(i) {
      @include icon-size;

      color: var(--color-icon-soft-400);
    }

    .celeste-dropdown-anchor-prefix {
      display: flex;
      align-items: center;
      justify-content: center;

      &-selected {
        display: flex;
        align-items: center;
        justify-content: center;

        .selected-dropdown-image {
          @include icon-size;

          display: flex;
          align-items: center;
          justify-content: center;
          object-fit: cover;
          border-radius: var(--radius-full);
        }
      }
    }

    .celeste-dropdown-input {
      flex: 1 0 0;
      background: inherit;
      color: var(--color-text-sub-600);
      font: var(--paragraph-sm);
      cursor: pointer;
    }

    .celeste-dropdown-trigger {
      @include transition-default;

      display: flex;
      place-items: center center;
      border: none;
      background: none;
      color: var(--color-icon-soft-400);
      cursor: pointer;

      &[data-state='open'] {
        transform: rotate(180deg);
      }
    }

    &:hover {
      background: var(--color-bg-weak-50);
    }

    &-error {
      border: 1px solid var(--color-state-error-base);
    }

    &-disabled {
      background: var(--color-bg-weak-50);
      color: var(--color-text-disabled-300);

      .celeste-dropdown-input {
        color: var(--color-text-disabled-300);
      }

      i,
      .celeste-dropdown-trigger {
        color: var(--color-icon-disabled-300);
      }
    }

    &-focused {
      border: 1px solid var(--color-stroke-strong-950);
      box-shadow: var(--shadow-buttons-important-focus);
      color: var(--color-text-strong-950);

      .celeste-dropdown-input {
        color: var(--color-text-strong-950);
      }

      i {
        color: var(--color-icon-strong-950);
      }
    }

    &-filled {
      color: var(--color-text-strong-950);
    }

    $sizes-map: (
      'xs': (
        'padding': var(--spacing-6),
        'border-radius': var(--radius-8),
      ),
      'sm': (
        'padding': var(--spacing-8),
        'border-radius': var(--radius-8),
      ),
      'md': (
        'padding': var(--spacing-10),
        'border-radius': var(--radius-10),
      ),
    );

    @each $size, $values in $sizes-map {
      &-size-#{$size} {
        padding: map.get($values, 'padding');
        border-radius: map.get($values, 'border-radius');
      }
    }
  }

  .celeste-dropdown-content {
    @include transition-default;

    display: flex;
    position: absolute;
    z-index: 99;
    top: calc(var(--dropdown-width) + var(--spacing-4));
    left: 0;
    flex-direction: column;
    width: var(--dropdown-width);
    max-height: var(--dropdown-height);
    margin-top: var(--spacing-10);
    padding: var(--spacing-8);
    overflow: hidden;
    border: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--radius-16);
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-regular-md);
    gap: var(--spacing-4);

    &[data-state='closed'] {
      transform: translateY(10px);
      opacity: 0;
    }

    &[data-state='open'] {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &:deep(.celeste-input-wrapper .celeste-input-prefix) {
    @include icon-size;

    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    color: var(--color-icon-sub-600);
  }

  &:deep(.celeste-input-wrapper) {
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  &:deep(.celeste-input-wrapper:focus-within) {
    border: none;
    box-shadow: none;
  }

  &:deep(.celeste-dropdown-items-viewport) {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: var(--spacing-4);
  }

  .celeste-dropdown-empty-list {
    display: flex;
    align-items: center;
    padding: var(--spacing-8);
    color: var(--color-text-sub-600);
    font: var(--paragraph-sm);
  }

  &:deep(.celeste-input-wrapper .celeste-input-suffix) {
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    cursor: pointer;

    i {
      @include icon-size;

      color: var(--color-icon-soft-400);
    }
  }

  .celeste-dropdown-search {
    display: flex;
    position: sticky;
    top: 0;
    flex-direction: column;
    gap: var(--spacing-4);
  }

  .celeste-dropdown-separator {
    width: 100%;
    height: 1px;
    background-color: var(--color-stroke-soft-200);
  }
}
</style>
