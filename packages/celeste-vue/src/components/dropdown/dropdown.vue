<script setup lang="ts">
import type { BadgeProps } from '../badge/badge.vue';
import clsx from 'clsx';
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxItem, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from 'radix-vue';
import { computed, ref, watch } from 'vue';
import Badge from '../badge/badge.vue';
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

const selected = ref<SelectedType | SelectedType[] | undefined>(props.multiple ? [] : undefined);
const searched = ref<string>('');
const isFocused = ref(false);
const isOpen = ref<boolean>(false);

function toggleDropdown() {
  isOpen.value = true;
  // reset focused index when opening
  focusedItemIndex.value = -1;
}

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

function toggleSelection(isSelected: boolean, option: SelectedType) {
  if (props.multiple && Array.isArray(selected.value)) {
    selected.value = isSelected
      ? selected.value.filter(o => o.value !== option.value)
      : [...selected.value, option];

    return;
  }

  selected.value = option;
}

const mergedBadgeProps = computed(() => ({
  ...props.badgeProps,
  disabled: props.disabled,
}));

const focusedItemIndex = ref<number>(-1);

// Add keydown handler for arrow navigation
function handleKeydown(event: KeyboardEvent) {
  if (!isOpen.value)
    return;

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (focusedItemIndex.value < filteredOptions.value.length - 1) {
        focusedItemIndex.value++;
      }
      else {
        focusedItemIndex.value = 0;
      }
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (focusedItemIndex.value > 0) {
        focusedItemIndex.value--;
      }
      else {
        focusedItemIndex.value = filteredOptions.value.length - 1;
      }

      break;
    case 'Enter':
      event.preventDefault();
      if (focusedItemIndex.value >= 0 && focusedItemIndex.value < filteredOptions.value.length) {
        const option = filteredOptions.value[focusedItemIndex.value];
        toggleSelection(optionIsSelected(option), option);
      }
      break;
  }
}

// Watch for changes in filtered options to reset focus if needed
watch(filteredOptions, () => {
  if (focusedItemIndex.value >= filteredOptions.value.length) {
    focusedItemIndex.value = filteredOptions.value.length - 1;
  }
});
</script>

<script lang="ts">
export interface Dropdown {
  disabled?: boolean;
  icon?: string;
  placeholder: string;
  error?: boolean;
  size?: 'xs' | 'sm' | 'md';
  type?: 'normal' | 'compact' | 'inline' | 'compact-input';
  multiple?: boolean;
  emptyLabel?: string;
  searchable?: boolean;
  options: SelectedType[];
  badgeProps?: BadgeProps;
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
  <div
    class="celeste-dropdown-wrapper"
    tabindex="0"
    @keydown.enter="toggleDropdown"
    @keydown.space="toggleDropdown"
  >
    <ComboboxRoot
      v-model="selected"
      :open="isOpen"
      :disabled="disabled"
      :multiple="props.multiple"
      class="celeste-dropdown-root"
      :display-value="(v) => v.label"
      @update:open="(val) => isOpen = val"
      @keydown="handleKeydown"
    >
      <ComboboxAnchor
        tabindex="0"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
        <ComboboxTrigger
          :class="clsx(
            'celeste-dropdown-anchor-trigger',
            `celeste-dropdown-anchor-trigger-size-${props.size}`,
            `celeste-dropdown-anchor-trigger-type-${props.type}`,
            { 'celeste-dropdown-anchor-trigger-error': props.error },
            { 'celeste-dropdown-anchor-trigger-disabled': props.disabled },
            { 'celeste-dropdown-anchor-trigger-focused': isFocused },
            { 'celeste-dropdown-anchor-trigger-filled': selected },
          )"
          as="div"
          :disabled="disabled"
          @focus="isFocused = true"
          @blur="isFocused = false"
        >
          <div class="celeste-dropdown-anchor-trigger-prefix">
            <div v-if="selected && !Array.isArray(selected)" class="celeste-dropdown-anchor-trigger-prefix-selected">
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
              class="celeste-dropdown-anchor-trigger-prefix-default"
            />
          </div>
          <div
            v-if="type !== 'inline'"
            class="celeste-dropdown-input"
          >
            <span v-if="multiple">{{ placeholder }}</span>
            <span v-else>
              {{ selected && !Array.isArray(selected) ? selected.label : props.placeholder }}
            </span>
            <span v-if="mergedBadgeProps" class="celeste-input-badge">
              <Badge v-bind="mergedBadgeProps" />
            </span>
          </div>
          <div class="celeste-dropdown-trigger">
            <i class="i-celeste-arrow-down-s-line" />
          </div>
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxContent
        v-if="!disabled"
        force-mount
        class="celeste-dropdown-content"
      >
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
              v-for="option, index in filteredOptions"
              :key="option.value"
              :value="option"
              :disabled="disabled"
              class="celeste-dropdown-item"
              tabindex="0"
            >
              <DropdownItem
                :label="option.label"
                :checkbox="props.multiple"
                :selected="optionIsSelected(option)"
                :disabled="props.disabled"
                :focused="index === focusedItemIndex"
                @update:selected="(isSelected) => toggleSelection(isSelected, option)"
              />
              <ComboboxSeparator />
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

  &:focus,
  &:focus-visible,
  &:focus-within {
    border: none;
    outline: none;
  }

  &:deep(.celeste-dropdown-root) {
    display: flex;
    position: relative;
    flex-direction: column;
    width: var(--dropdown-width);
    padding-top: var(--spacing-4);
    gap: var(--spacing-10);
  }

  .celeste-dropdown-anchor-trigger {
    @include transition-default;

    display: flex;
    align-items: center;
    border: 1px solid var(--color-stroke-soft-200);
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-regular-xs);
    gap: var(--spacing-8);
    cursor: pointer;

    :deep(i) {
      @include icon-size;

      color: var(--color-icon-soft-400);
    }

    &:focus,
    &:focus-visible,
    &:focus-within {
      outline: none;
    }

    .celeste-dropdown-anchor-trigger-prefix {
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
      display: flex;
      flex: 1 0 0;
      align-items: center;
      justify-content: space-between;
      background: inherit;
      color: var(--color-text-sub-600);
      font: var(--paragraph-sm);
      cursor: pointer;
      gap: var(--spacing-8);
    }

    .celeste-dropdown-trigger {
      @include transition-default;

      display: flex;
      place-items: center center;
      border: none;
      background: none;
      color: var(--color-icon-soft-400);
      cursor: pointer;

      &[data-state='open']:not([data-disabled]) {
        transform: rotate(180deg);
      }
    }

    &:hover {
      background: var(--color-bg-weak-50);
    }

    &-error:not(.celeste-dropdown-anchor-trigger-type-compact) {
      border: 1px solid var(--color-state-error-base);
    }

    &-disabled {
      background: var(--color-bg-weak-50);
      color: var(--color-text-disabled-300);
      cursor: not-allowed;

      .celeste-dropdown-input {
        color: var(--color-text-disabled-300);
        cursor: not-allowed;
      }

      &:deep(i),
      .celeste-dropdown-trigger {
        color: var(--color-icon-disabled-300);
        cursor: not-allowed;
      }
    }

    &-focused:not(.celeste-dropdown-anchor-trigger-disabled, .celeste-dropdown-anchor-trigger-type-compact) {
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

    &.celeste-dropdown-anchor-trigger-type-compact {
      width: fit-content;
      background: transparent;
      box-shadow: none;

      .celeste-dropdown-input {
        flex: inherit;
      }

      &:hover:not(.celeste-dropdown-anchor-trigger-disabled),
      &.celeste-dropdown-anchor-trigger-focused:not(.celeste-dropdown-anchor-trigger-disabled) {
        .celeste-dropdown-input {
          color: var(--color-text-strong-950);
        }

        &:deep(i) {
          color: var(--color-icon-strong-950);
        }
      }
    }

    &.celeste-dropdown-anchor-trigger-type-compact-input {
      width: fit-content;
      border-radius: var(--radius-0);

      &:deep(.celeste-dropdown-input) {
        flex: inherit;
      }

      &.celeste-dropdown-anchor-trigger-focused {
        border: 1px solid var(--color-stroke-soft-200);
        box-shadow: none;
      }
    }

    &.celeste-dropdown-anchor-trigger-type-inline {
      width: fit-content;
      gap: var(--spacing-4);

      &:deep(.celeste-dropdown-input) {
        flex: inherit;
      }
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
    z-index: 9999;
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
      pointer-events: none;
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

    &:deep(i) {
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

  .celeste-dropdown-items-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }
}
</style>
