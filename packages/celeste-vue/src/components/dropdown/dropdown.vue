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
  position: 'bottom',
  align: 'start',
});

const model = defineModel<SelectedType | SelectedType[] | undefined>();

const searched = ref<string>('');
const isSearchedFocused = ref(false);
const isOpen = ref<boolean>(false);

function toggleDropdown() {
  isOpen.value = true;
  // reset focused index when opening
  focusedItemIndex.value = -1;
}

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
    return model.value && !Array.isArray(model.value)
      ? option.value === model.value.value
      : false;
  }

  return Array.isArray(model.value)
    ? model.value.some(selectedOption => selectedOption.value === option.value)
    : false;
}

function toggleSelection(isSelected: boolean, option: SelectedType) {
  if (props.multiple && Array.isArray(model.value)) {
    model.value = isSelected
      ? model.value.filter(o => o.value !== option.value)
      : [...model.value, option];

    return;
  }

  model.value = isSelected ? undefined : option;
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
  position?: 'top' | 'bottom';
  align?: 'start' | 'end' | 'center';
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
      v-model="model"
      :open="isOpen"
      :disabled="disabled"
      :multiple="props.multiple"
      class="celeste-dropdown-root"
      :display-value="(v) => v.label"
      @update:open="(val) => isOpen = val"
      @keydown="handleKeydown"
    >
      <ComboboxAnchor tabindex="0">
        <ComboboxTrigger
          :class="clsx(
            'celeste-dropdown-anchor-trigger',
            `celeste-dropdown-anchor-trigger-size-${props.size}`,
            `celeste-dropdown-anchor-trigger-type-${props.type}`,
            { 'celeste-dropdown-anchor-trigger-error': props.error },
            { 'celeste-dropdown-anchor-trigger-disabled': props.disabled },
            { 'celeste-dropdown-anchor-trigger-filled': model },
            { 'celeste-dropdown-anchor-trigger-focused': isOpen },
          )"
          as="div"
          :disabled="disabled"
        >
          <div class="celeste-dropdown-anchor-trigger-prefix">
            <div v-if="model && !Array.isArray(model)" class="celeste-dropdown-anchor-trigger-prefix-selected">
              <i v-if="model.icon" :class="model.icon" />
              <div v-if="model.image">
                <slot name="image" v-bind="{ model }">
                  <img
                    :src="model.image"
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
              {{ model && !Array.isArray(model) ? model.label : props.placeholder }}
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
        dismissable
        :avoid-collisions="true"
        class="celeste-dropdown-content"
        :class="clsx(
          'celeste-dropdown-content',
          `celeste-dropdown-content-size-${position}`,
          `celeste-dropdown-content-align-${align}`,
        )"
      >
        <ComboboxViewport class="celeste-dropdown-items-viewport">
          <div v-if="searchable" class="celeste-dropdown-search">
            <TextInput
              v-model="searched"
              type="search"
              size="sm"
              placeholder="Search"
              @focus="isSearchedFocused = true"
              @blur="isSearchedFocused = false"
            >
              <template #prefix>
                <i class="i-celeste-search-2-line" />
              </template>
              <template v-if="isSearchedFocused" #suffix>
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
              >
                <template #prefix>
                  <i v-if="option.icon" :class="option.icon" />
                  <img
                    v-if="option.image"
                    :src="option.image"
                    alt="option"
                    class="celeste-dropdown-item-image"
                  >
                </template>
              </DropdownItem>
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
    width: fit-content;
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
    }

    &[data-state='open']:not([data-disabled]) {
      :deep(.celeste-dropdown-trigger) {
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
      border: none;
      background: transparent;
      box-shadow: none;

      &:deep(.celeste-dropdown-input) {
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
      border: none;
      border-radius: var(--radius-0);
      box-shadow: none;

      &:deep(.celeste-dropdown-input) {
        flex: inherit;
      }

      &.celeste-dropdown-anchor-trigger-focused {
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

    &.celeste-dropdown-anchor-trigger-type-normal {
      min-width: 300px;
    }

    $sizes-map: (
      'xs': (
        'padding': var(--spacing-6),
        'border-radius': var(--radius-8),
        'height': 32px,
      ),
      'sm': (
        'padding': var(--spacing-8),
        'border-radius': var(--radius-8),
        'height': 36px,
      ),
      'md': (
        'padding': var(--spacing-10),
        'border-radius': var(--radius-10),
        'height': 40px,
      ),
    );

    @each $size, $values in $sizes-map {
      &-size-#{$size} {
        height: map.get($values, 'height');
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
    flex-direction: column;
    width: var(--dropdown-width);
    min-width: 300px;
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

  .celeste-dropdown-content-size-top {
    bottom: calc(var(--dropdown-width) + var(--spacing-4));
  }

  .celeste-dropdown-content-size-bottom {
    top: calc(var(--dropdown-width) + var(--spacing-4));
  }

  .celeste-dropdown-content-align-start {
    left: 0;
  }

  .celeste-dropdown-content-align-end {
    right: 0;
  }

  :not(:has(.celeste-dropdown-anchor-trigger-type-normal)) {
    .celeste-dropdown-content-align-center {
      left: 50%;
      transform: translateX(-50%);
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

    &:deep(.celeste-input-wrapper-type-search) {
      border-top-left-radius: var(--radius-8);
      border-top-right-radius: var(--radius-8);
    }
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

  .celeste-dropdown-item-image,
  .selected-dropdown-image {
    @include icon-size;

    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;
    border-radius: var(--radius-full);
  }
}
</style>
